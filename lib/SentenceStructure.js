var Phrase = require('./Phrase');
var Sentence = require('./Sentence');

var SentenceStructure = function(sentence) {
	if (!(sentence instanceof Sentence)) return;

	this.words = sentence.words;
	this.phrases = [];
};

SentenceStructure.prototype.connect = function(index1, index2) {
	if (index1 < 0 || index1 > this.words.length - 1) return;
	if (index2 < 0 || index2 > this.words.length - 1) return;
	if (index1 === index2) return;
	if (index1 > index2) {
		var temp = index1;
		index1 = index2;
		index2 = temp;
	}
	var phrase = new Phrase(this.words[index1], this.words[index2]);
	this.phrases.push(phrase);
};

SentenceStructure.prototype.tag = function(index1, index2, type) {
	var phrase = null;
	for (var i in this.phrases) {
		if (this.phrases[i].connects(index1, index2)) {
			phrase = this.phrases[i];
			break;
		}
	}
	if (!phrase) return;
	phrase.tag(type);
};

SentenceStructure.prototype.toString = function() {
	return this.phrases.map(function(phrase) {
		return phrase.toString();
	}).join('\r\n');
};

module.exports = SentenceStructure;
