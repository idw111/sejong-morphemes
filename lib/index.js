import Morpheme from './Morpheme';
import Word from './Word';
import Sentence from './Sentence';
import Phrase from './Phrase';
import Structure from './Structure';

let Sejong = {

	Morpheme,

	Word,

	Sentence,

	Phrase,

	Structure,

	initialize: function(options) {
		options = options || {};

		var MorphemeTag = !!options.morpheme ? (options.morpheme.tag || null) : null;
		var MorphemeAlias = !!options.morpheme ? (options.morpheme.alias || null) : null;
		Morpheme.setTag(MorphemeTag, MorphemeAlias);

		var PhraseTag = !!options.phrase ? (options.phrase.tag || null) : null;
		var PhraseAlias = !!options.phrase ? (options.phrase.alias || null) : null;
		Phrase.setTag(PhraseTag, PhraseAlias);
	},

	setTag: function(type, tag, alias) {
		if (type.toUpperCase() === 'MORPHEME') {
			Morpheme.setTag(tag, alias);
		}
		else if (type.toUpperCase() === 'PHRASE') {
			Phrase.setTag(tag, alias);
		}
	}

};

export default Sejong;
