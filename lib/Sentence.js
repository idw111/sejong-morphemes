import Word from './Word';

export default class Sentence {

	constructor() {
		this.words = [];
		if (arguments.length === 1 && !!arguments[0] && typeof arguments[0] === 'string') {
			this._decode(arguments[0]);
		}
	}

	_decode(code) {
		code = code.replace(/\s+/, ' ');
		var words = code.split(' ');
		for (var i in words) {
			if (!!words[i]) this.add(new Word(words[i]));
		}
	}

	add(word) {
		if (!(word instanceof Word)) return;
		word.index = this.words.length;
		this.words.push(word);
	}

	getText() {
		return this.words.map(word => { return word.getText(); }).join(' ');
	}

	equals(sentence) {
		return this.toString() === sentence.toString();
	}

	toString() {
		return this.words.map(word => { return word.toString(); }).join(' ');
	}

	toJSON() {
		return {
			text: this.getText(),
			words: this.words.map(word => { return word.toJSON(); })
		}
	}

}
