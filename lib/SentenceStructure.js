var Phrase = require('./Phrase');
var Sentence = require('./Sentence');

var SentenceStructure = function(sentence) {
	if (!(sentence instanceof Sentence)) return;

	this.words = sentence.words;
	this.phrases = [];
};

SentenceStructure.prototype.connect = function(index1, index2) {
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
	this.phrases.push(phrase);
	return true;
};

SentenceStructure.prototype.disconnect = function(phrase) {
	if (!(phrase instanceof Phrase)) return false;
	for (var i in this.phrases) {
		if (this.phrases[i].equals(phrase)) {
			this.phrases.splice(i, 1);
			return true;
		}
	}
	return false;
};

SentenceStructure.prototype.getCordCount = function(index) {
	if (index < 0 || index > this.words.length - 1) return 0;
	var count = 0;
	for (var i in this.phrases) {
		if (this.phrases[i].connects(index)) count++;
	}
	return count;
};

SentenceStructure.prototype.getStartingCordIndex = function(index1, index2) {
	if (index1 < 0 || index1 > this.words.length - 1) return -1;
	if (index2 < 0 || index2 > this.words.length - 1) return -1;
	if (index1 === index2) return -1;
	if (index1 > index2) {
		var temp = index1;
		index1 = index2;
		index2 = temp;
	}
	var index = 0;
	for (var i in this.phrases) {
		if (this.phrases[i].connectsTo(index1)) index++;
	}
	for (var i in this.phrases) {
		if (this.phrases[i].connects(index1, index2)) return index;
		if (this.phrases[i].connectsFrom(index1)) index++;
	}
	return -1;
};

SentenceStructure.prototype.getEndingCordIndex = function(index1, index2) {
	if (index1 < 0 || index1 > this.words.length - 1) return -1;
	if (index2 < 0 || index2 > this.words.length - 1) return -1;
	if (index1 === index2) return -1;
	if (index1 > index2) {
		var temp = index1;
		index1 = index2;
		index2 = temp;
	}
	var index = 0;
	for (var i in this.phrases) {
		if (this.phrases[i].connects(index1, index2)) return index;
		if (this.phrases[i].connectsTo(index2)) index++;
	}
	return -1;
};

SentenceStructure.prototype.toString = function() {
	return this.phrases.map(function(phrase) {
		return phrase.toString();
	}).join('\r\n');
};

module.exports = SentenceStructure;
