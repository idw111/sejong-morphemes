var Word = require('./Word');

var SentenceStructure = function(words) {
	this.words = words;
	this.phrases = [];
};

module.exports = SentenceStructure;
