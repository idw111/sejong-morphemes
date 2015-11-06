import Phrase from './Phrase';
import Sentence from './Sentence';

const DIRECTION_BOTH = 0;
const DIRECTION_IN = 1;
const DIRECTION_OUT = -1;

export default class Structure {

	constructor(sentence) {
		if (!(sentence instanceof Sentence)) return;
		this.words = sentence.words;
		this.phrases = [];
	}

	_arrange() {
		this.words.map(function(word, index) {
			var cordsIn = this._getCordsIn(index);
			var cordsOut = this._getCordsOut(index);
			word.cords = {in: cordsIn, out: cordsOut, total: cordsIn + cordsOut};
		}.bind(this));

		this.levels = [];
		this.phrases.map(function(phrase, index) {
			var distance = phrase.getDistance();
			this.levels[distance] = distance;
		}.bind(this));
	}

	getLevel(distance) {
		var level = 0;
		for (var i in this.levels) {
			if (i < distance) level++;
			else if (i > distance) break;
			else if (i === distance) return level;
		}
		return level;
	}

	connect(index1, index2, type) {
		if (index1 < 0 || index1 > this.words.length - 1) return false;
		if (index2 < 0 || index2 > this.words.length - 1) return false;
		if (index1 === index2) return false;
		if (index1 > index2) {
			var temp = index1;
			index1 = index2;
			index2 = temp;
		}
		for (var i in this.phrases) {
			if (this.phrases[i].connects(index1, index2)) return false;
		}
		var phrase = new Phrase(this.words[index1], this.words[index2]);
		if (!!type) phrase.tag(type);
		this.phrases.push(phrase);
		this._arrange();
		return true;
	}

	disconnect(phrase) {
		if (!(phrase instanceof Phrase)) return false;
		for (var i in this.phrases) {
			if (this.phrases[i].equals(phrase)) {
				this.phrases.splice(i, 1);
				this._arrange();
				return true;
			}
		}
		return false;
	}

	tag(phrase, type) {
		if (!(phrase instanceof Phrase)) return false;
		for (var i in this.phrases) {
			if (this.phrases[i].equals(phrase)) {
				this.phrases[i].tag(type);
				this._arrange();
				return true;
			}
		}
		return false;
	}

	// deprecated
	getCordCount(index) {
		return this._getCordsBoth(index);
	}

	_getCords(index, direction) {
		if (index < 0 || index > this.words.length - 1) return 0;
		var count = 0;
		for (var i in this.phrases) {
			switch (direction) {
			case DIRECTION_IN:
				if (this.phrases[i].connectsTo(index)) count++;
				break;
			case DIRECTION_OUT:
				if (this.phrases[i].connectsFrom(index)) count++;
				break;
			case DIRECTION_BOTH:
			default:
				if (this.phrases[i].connects(index)) count++;
				break;
			}
		}
		return count;
	}

	_getCordsBoth(index) {
		return this._getCords(index, DIRECTION_BOTH);
	}

	_getCordsIn(index) {
		return this._getCords(index, DIRECTION_IN);
	}

	_getCordsOut(index) {
		return this._getCords(index, DIRECTION_OUT);
	}

	getStartingCordIndex(phrase) {
		var index = this._getCordsIn(phrase.words[0].index);
		var distance = phrase.getDistance();
		for (var i in this.phrases) {
			if (this.phrases[i].connectsFrom(phrase.words[0].index) && this.phrases[i].getDistance() > distance) index++;
		}
		return index;
	}

	getEndingCordIndex(phrase) {
		var index = 0;
		var distance = phrase.getDistance();
		for (var i in this.phrases) {
			if (this.phrases[i].connectsTo(phrase.words[1].index) && this.phrases[i].getDistance() < distance) index++;
		}
		return index;
	}

	clear() {
		this.phrases = [];
	}

	/**
	 * 적절한 구문 태그를 갖고 있는지 확인한다.
	 * @return {boolean}
	 */
	isTagged() {
		return this.phrases.every(phrase => phrase.isTagged());
	}

	toString() {
		return this.phrases.map(phrase => phrase.toString()).join('\r\n');
	}

	toJSON() {
		return this.phrases.map(phrase => phrase.toJSON());
	}

}
