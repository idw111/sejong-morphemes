var Word = require('./Word');
var PhraseTag = require('./enum/PhraseTag');
var PhraseAlias = require('./enum/PhraseAlias');

var Phrase = function() {
	if (arguments.length !== 2) return;
	if (!(arguments[0] instanceof Word) || !(arguments[1] instanceof Word)) return;
	if (!('index' in arguments[0]) || !('index' in arguments[1])) return;
	this.words = arguments;
	this.type = this._decodeType('???');
};

Phrase.setTag = function(tag, alias) {
	Phrase.tag = tag || PhraseTag;
	Phrase.alias = alias || (!!tag ? {} : PhraseAlias);
};

Phrase.prototype._decodeType = function(code) {
	code = code.toUpperCase();
	var type = '???';
	if (this._isTag(code)) type = code;
	else if (this._isAlias(code)) type = Phrase.alias[code];
	this.alias = Phrase.tag[type];
	return type;
};

Phrase.prototype._isTag = function(tag) {
	return tag in Phrase.tag;
};

Phrase.prototype._isAlias = function(tag) {
	return tag in Phrase.alias;
};

Phrase.prototype.tag = function(code) {
	this.type = this._decodeType(code);
};

Phrase.prototype.connects = function(index1, index2) {
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
};

Phrase.prototype.connectsFrom = function(index) {
	return this.words[0].index === index;
};

Phrase.prototype.connectsTo = function(index) {
	return this.words[1].index === index;
};

Phrase.prototype.toString = function() {
	if (!this.words || this.words.length !== 2) return '';
	var result = [
		this.words[0].index,
		this.words[1].index,
		this.type,
		this.words[0].toString()
	];
	return result.join(' ');
};

module.exports = Phrase;
