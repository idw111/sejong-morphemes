import Hangul from 'hangul-js';
import Morpheme from './Morpheme';

/**
 * 새로운 단어를 생성한다.
 * 단어는 한 개 이상의 형태소로 구성된다.
 * @class Word
 */
export default class Word {

	/**
	 * @constructs Word
	 * @param {string} text 형태소가 '+' 문자로 결합된 문자열
	 */
	constructor() {
		this.morphemes = [];
		if (arguments.length === 1 && !!arguments[0] && typeof arguments[0] === 'string') {
			this._decode(arguments[0]);
		}
	}

	/**
	 * 문자열을 파싱하여 형태소를 추출하여 morphemes 배열에 삽입한다.
	 * @param {string} code 형태소가 '+' 문자로 결합된 문자열
	 */
	_decode(code) {
		code = code.replace(/\s/g, '');
		var morphemes = code.split('+');
		for (var i in morphemes) {
			if (!!morphemes[i]) this.morphemes.push(new Morpheme(morphemes[i]));
		}
	}

	/**
	 * 단어를 구성하는 형태소들을 결합하여 하나의 문자열로 리턴한다.
	 * getText 함수가 리턴하는 값은 원문자와 다를 수도 있다.
	 * 예를 들어, '내게'는 '나/NNG+에게/???'로 분석되는데
	 * 이 형태소를 getText로 결합하면 '나에게'를 리턴한다.
	 * @return {string}
	 */
	getText() {
		var letters = [];
		this.morphemes
			.map(morpheme => { return Hangul.disassemble(morpheme.text); })
			.forEach(morpheme => { letters = letters.concat(morpheme); });
		return Hangul.assemble(letters);
	}

	/**
	 * 현재 단어와 인자로 받은 문자열이 얼마나 유사한지 비교하여 유사도를 리턴한다.
	 * 문자열을 단순히 순방향으로 한 번, 역방향으로 한 번 비교하여 유사도를 계산한다.
	 * @param {string} text 단어와 유사도를 비교할 문자열
	 * @return {number} 0.0 - 1.0
	 */
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

	/**
	 * 현재 객체에 형태소를 추가한다.
	 * @param {Morpheme} morpheme
	 */
	add(morpheme) {
		if (!(morpheme instanceof Morpheme)) return;
		this.morphemes.push(morpheme);
	}

	/**
	 * 동일한 단어인지 확인한다.
	 * 문장의 일부로 구성되는 단어의 경우 단어가 index 속성을 갖는데
	 * 이 경우 index까지 동일해야 같은 객체로 판별한다.
	 * @param {Word} word
	 * @return {boolean}
	 */
	equals(word) {
		if (!this.index) return this.toString() === word.toString();
		else return this.toString() === word.toString() && this.index === word.index;
	}

	/**
	 * 단어를 이루는 형태소들이 적절한 형태소 태그를 갖고 있는지 확인한다.
	 * @return {boolean}
	 */
	isTagged() {
		return this.morphemes.every(morpheme => morpheme.isTagged());
	}

	/**
	 * 형태소들을 '+' 문자로 묶어 하나의 문자열로 만들어 리턴한다.
	 * @return {string}
	 */
	toString() {
		return this.morphemes.map(morpheme => morpheme.toString()).join('+');
	}

	/**
	 * 단어를 단순 객체로 변환하여 리턴한다.
	 * @return {json}
	 */
	toJSON() {
		return {
			text: this.getText(),
			morphemes: this.morphemes.map(morpheme => morpheme.toJSON())
		};
	}

}
