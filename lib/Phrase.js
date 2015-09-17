import PhraseTag from './enum/PhraseTag';
import PhraseAlias from './enum/PhraseAlias';
import Word from './Word';

export default class Phrase {

	constructor() {
		if (arguments.length !== 2) return;
		if (!(arguments[0] instanceof Word) || !(arguments[1] instanceof Word)) return;
		if (!('index' in arguments[0]) || !('index' in arguments[1])) return;
		this.words = arguments;
		this.type = this._decodeType('???');
	}

	_decodeType(code) {
		code = code.toUpperCase();
		var type = '???';
		if (this._isTag(code)) type = code;
		else if (this._isAlias(code)) type = Phrase.alias[code];
		this.alias = Phrase.tag[type];
		return type;
	}

	_isTag(tag) {
		return tag in Phrase.tag;
	}

	_isAlias(tag) {
		return tag in Phrase.alias;
	}

	tag(code) {
		this.type = this._decodeType(code);
	}

	connects(index1, index2) {
		if (arguments.length === 0) {
			return this.words.map(function(word) {
				return word.index;
			});
		}
		else if (arguments.length === 1) {
			if (this.words[0].index === index1 || this.words[1].index === index1) return true;
			return false;
		}
		else if (arguments.length === 2) {
			if (this.words[0].index === index1 && this.words[1].index === index2) return true;
			return false;
		}
		return false;
	}

	connectsFrom(index) {
		return this.words[0].index === index;
	}

	connectsTo(index) {
		return this.words[1].index === index;
	}

	equals(phrase) {
		if (this.words.length !== 2 || phrase.words.length !== 2) return false;
		return this.words[0].equals(phrase.words[0]) && this.words[1].equals(phrase.words[1]);
	}

	getDistance() {
		return Math.abs(this.words[0].index - this.words[1].index);
	}

	toString() {
		if (!this.words || this.words.length !== 2) return '';
		var result = [
			this.words[0].index + 1,
			this.words[1].index + 1,
			this.type,
			this.words[0].toString()
		];
		return result.join(' ');
	}

}

Phrase.setTag = function(tag, alias) {
	Phrase.tag = tag || PhraseTag;
	Phrase.alias = alias || (!!tag ? {} : PhraseAlias);
};
