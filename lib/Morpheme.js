import MorphemeTag from './enum/MorphemeTag';
import MorphemeAlias from './enum/MorphemeAlias';

/**
 * 새로운 형태소를 생성한다.
 * @class Morpheme
 */
export default class Morpheme {

	/**
	 * 생성자는 한 개(morpheme) 또는 두 개(text, type)의 인자를 받아 형태소를 생성한다.
	 * @constructs Morpheme
	 * @param {string} morpheme text/type 형태를 갖는 문자열
	 * @param {string} text
	 * @param {string} type
	 */
	constructor() {
		if (arguments.length === 1 && !!arguments[0]) {
			this._decode(arguments[0]);
		}
		else if (arguments.length === 2) {
			this.text = arguments[0];
			this.type = this._decodeType(arguments[1]);
		}
	}

	/**
	 * text/type 형태의 형태소 문자열을 파싱하여 객체의 text, type으로 저장한다.
	 * @param {string} code
	 */
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

	/**
	 * 문자열이 형태소 태그이거나 형태소 태그의 별칭이면 해당 태그를 리턴하고,
	 * 해당사항이 없으면 '???'을 리턴한다.
	 * @param {string} code
	 * @return {MorphemeTag}
	 */
	_decodeType(code) {
		code = code.toUpperCase();
		var type = '???';
		if (this._isTag(code)) type = code;
		else if (this._isAlias(code)) type = Morpheme.alias[code];
		this.alias = Morpheme.tag[type];
		return type;
	}

	/**
	 * 문자열이 형태소 태그인지 확인한다.
	 * @param {string} type
	 * @return {boolean}
	 */
	_isTag(type) {
		return type in Morpheme.tag;
	}

	/**
	 * 문자열이 형태소 별칭인지 확인한다.
	 * @param {string} type
	 * @return {boolean}
	 */
	_isAlias(type) {
		return type in Morpheme.alias;
	}

	/**
	 * 현재 객체가 인자로 받은 형태소와 동일한 객체인지 확인한다.
	 * @param {object} morpheme
	 * @return {boolean}
	 */
	equals(morpheme) {
		return this.toString() === morpheme.toString();
	}

	/**
	 * 적절한 형태소 태그를 갖고 있는지 확인한다.
	 * @return {boolean}
	 */
	isTagged() {
		return !!this.type && this.type !== '???';
	}

	/**
	 * 형태소를 문자열로 변환하여 리턴한다.
	 * @return {string}
	 */
	toString() {
		return this.text + '/' + this.type;
	}

	/**
	 * 형태소를 단순 객체로 변환하여 리턴한다.
	 * @return {json}
	 */
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
