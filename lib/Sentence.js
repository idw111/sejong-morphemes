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
		return this.words.map(word => word.getText()).join(' ');
	}

	equals(sentence) {
		return this.toString() === sentence.toString();
	}

	/**
	 * 문장을 이루는 형태소들이 적절한 형태소 태그를 갖고 있는지 확인한다.
	 * @return {boolean}
	 */
	isTagged() {
		return this.words.every(word => word.isTagged());
	}

	toString() {
		return this.words.map(word => word.toString()).join(' ');
	}

	toJSON() {
		return {
			text: this.getText(),
			words: this.words.map(word => word.toJSON())
		};
	}

}
