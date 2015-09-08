var Word = require('./Word');
var SingleWordPhraseTag = require('./enum/SingleWordPhraseTag');
var SingleWordPhraseAlias = require('./enum/SingleWordPhraseAlias');

var SingleWordPhrase = function() {
	if (arguments.length !== 1) return;
	if (!(arguments[0] instanceof Word)) return;
	if (!('index' in arguments[0])) return;
	this.word = arguments[0];
	this.type = this._decodeType('???');
};

SingleWordPhrase.setTag = function(tag, alias) {
	SingleWordPhrase.tag = tag || SingleWordPhraseTag;
	SingleWordPhrase.alias = alias || (!!tag ? {} : SingleWordPhraseAlias);
};

SingleWordPhrase.prototype._decodeType = function(code) {
	code = code.toUpperCase();
	var type = '???';
	if (this._isTag(code)) type = code;
	else if (this._isAlias(code)) type = SingleWordPhrase.alias[code];
	this.alias = SingleWordPhrase.tag[type];
	return type;
};

SingleWordPhrase.prototype._isTag = function(tag) {
	return tag in SingleWordPhrase.tag;
};

SingleWordPhrase.prototype._isAlias = function(tag) {
	return tag in SingleWordPhrase.alias;
};

SingleWordPhrase.prototype.tag = function(code) {
	this.type = this._decodeType(code);
};

SingleWordPhrase.prototype.connects = function(index1, index2) {
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

SingleWordPhrase.prototype.connectsFrom = function(index) {
	return this.words[0].index === index;
};

SingleWordPhrase.prototype.connectsTo = function(index) {
	return this.words[1].index === index;
};

SingleWordPhrase.prototype.equals = function(phrase) {
	if (this.words.length !== 2 || phrase.words.length !== 2) return false;
	return this.words[0].equals(phrase.words[0]) && this.words[1].equals(phrase.words[1]);
};

SingleWordPhrase.prototype.toString = function() {
	if (!this.words || this.words.length !== 2) return '';
	var result = [
		this.word.index + 1,
		0,
		this.type,
		this.words[0].toString()
	];
	return result.join(' ');
};

module.exports = Phrase;
