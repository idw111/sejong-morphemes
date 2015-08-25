var Word = require('./Word');
var PhraseTag = require('./enum/PhraseTag');
var PhraseAlias = require('./enum/PhraseAlias');

var Phrase = function() {
	if (arguments.length !== 2) return;
	if (!(arguments[0] instanceof Word) || !(arguments[1] instanceof Word)) return;
	this.words = arguments;
};

Phrase.setTag = function(tag, alias) {
	Phrase.tag = tag || PhraseTag;
	Phrase.alias = alias || (!!tag ? {} : PhraseAlias);
};

module.exports = Phrase;
