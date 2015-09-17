import Hangul from 'hangul-js';
import Morpheme from './Morpheme';

export default class Word {

	constructor() {
		this.morphemes = [];
		if (arguments.length === 1 && !!arguments[0] && typeof arguments[0] === 'string') {
			this._decode(arguments[0]);
		}
	}

	_decode(code) {
		code = code.replace(/\s/g, '');
		var morphemes = code.split('+');
		for (var i in morphemes) {
			if (!!morphemes[i]) this.morphemes.push(new Morpheme(morphemes[i]));
		}
	}

	getText() {
		var letters = [];
		this.morphemes
			.map(morpheme => { return Hangul.disassemble(morpheme.text); })
			.forEach(morpheme => { letters = letters.concat(morpheme); });
		return Hangul.assemble(letters);
	}

	getSimilarity(text) {
		var count = 0;
		var word = this.getText();
		for (var i = 0; i < word.length && i < text.length; i++) {
			if (word.charAt(i) === text.charAt(i)) count++;
		}
		for (var i = 0; i < word.length && i < text.length; i++) {
			if (word.charAt(word.length - 1 - i) === text.charAt(text.length - 1 - i)) count++;
		}
		return count / (word.length * 2);
	}

	add(morpheme) {
		if (!(morpheme instanceof Morpheme)) return;
		this.morphemes.push(morpheme);
	}

	equals(word) {
		if (!this.index) return this.toString() === word.toString();
		else return this.toString() === word.toString() && this.index === word.index;
	}

	toString() {
		return this.morphemes.map(morpheme => { return morpheme.toString(); }).join('+');
	}

	toJSON() {
		return {
			text: this.getText(),
			morphemes: this.morphemes.map(morpheme => { return morpheme.toJSON(); })
		};
	}

}
