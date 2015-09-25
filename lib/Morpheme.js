import MorphemeTag from './enum/MorphemeTag';
import MorphemeAlias from './enum/MorphemeAlias';

export default class Morpheme {

	constructor() {
		if (arguments.length === 1 && !!arguments[0]) {
			this._decode(arguments[0]);
		}
		else if (arguments.length === 2) {
			this.text = arguments[0];
			this.type = this._decodeType(arguments[1]);
		}
	}

	_decode(code) {
		code = code.replace(/\s/g, '');
		var delimiter = code.lastIndexOf('/');
		if (delimiter === -1) {
			this.text = code;
			this.type = this._decodeType('???');
		}
		else {
			this.text = code.substr(0, delimiter);
			this.type = this._decodeType(code.substr(delimiter + 1));
		}
	}

	_decodeType(code) {
		code = code.toUpperCase();
		var type = '???';
		if (this._isTag(code)) type = code;
		else if (this._isAlias(code)) type = Morpheme.alias[code];
		this.alias = Morpheme.tag[type];
		return type;
	}

	_isTag(type) {
		return type in Morpheme.tag;
	}

	_isAlias(type) {
		return type in Morpheme.alias;
	}

	equals(morpheme) {
		return this.toString() === morpheme.toString();
	}

	toString() {
		return this.text + '/' + this.type;
	}

	toJSON() {
		return {
			text: this.text,
			type: this.type,
			alias: this.alias
		}
	}
}

Morpheme.tag = MorphemeTag;

Morpheme.alias = MorphemeAlias;

Morpheme.setTag = function(tag, alias) {
	Morpheme.tag = tag || MorphemeTag;
	Morpheme.alias = alias || (!!tag ? {} : MorphemeAlias);
};
