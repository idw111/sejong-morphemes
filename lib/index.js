var Morpheme = require('./Morpheme');
var Word = require('./Word');
var Sentence = require('./Sentence');
var Phrase = require('./Phrase');
var SentenceStructure = require('./SentenceStructure');

module.exports = {

	Morpheme: Morpheme,

	Word: Word,

	Sentence: Sentence,

	Phrase: Phrase,

	SentenceStructure: SentenceStructure,

	initialize: function(options) {
		options = options || {};

		var MorphemeTag = !!options.morpheme ? (options.morpheme.tag || null) : null;
		var MorphemeAlias = !!options.morpheme ? (options.morpheme.alias || null) : null;
		Morpheme.setTag(MorphemeTag, MorphemeAlias);

		var PhraseTag = !!options.phrase ? (options.phrase.tag || null) : null;
		var PhraseAlias = !!options.phrase ? (options.phrase.alias || null) : null;
		Phrase.setTag(PhraseTag, PhraseAlias);
	}

};
