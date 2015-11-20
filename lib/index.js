import Morpheme from './Morpheme';
import Word from './Word';
import Sentence from './Sentence';
import Phrase from './Phrase';
import NamedEntity from './NamedEntity';
import Relation from './Relation';
import Structure from './Structure';

const Sejong = {

	Morpheme,

	Word,

	Sentence,

	Phrase,

	NamedEntity,

	Relation,

	Structure,

	initialize: function(options) {
		options = options || {};

		var MorphemeTag = !!options.morpheme ? (options.morpheme.tag || null) : null;
		var MorphemeAlias = !!options.morpheme ? (options.morpheme.alias || null) : null;
		Morpheme.setTag(MorphemeTag, MorphemeAlias);

		var PhraseTag = !!options.phrase ? (options.phrase.tag || null) : null;
		var PhraseAlias = !!options.phrase ? (options.phrase.alias || null) : null;
		Phrase.setTag(PhraseTag, PhraseAlias);

		var NamedEntityTag = !!options.namedentity ? (options.namedentity.tag || null) : null;
		var NamedEntityAlias = !!options.namedentity ? (options.namedentity.alias || null) : null;
		NamedEntity.setTag(NamedEntityTag, NamedEntityAlias);

		var RelationTag = !!options.relation ? (options.relation.tag || null) : null;
		var RelationAlias = !!options.relation ? (options.relation.alias || null) : null;
		Relation.setTag(RelationTag, RelationAlias);
	},

	setTag: function(type, tag, alias) {
		if (type.toUpperCase() === 'MORPHEME') {
			Morpheme.setTag(tag, alias);
		}
		else if (type.toUpperCase() === 'PHRASE') {
			Phrase.setTag(tag, alias);
		}
		else if (type.toUpperCase() === 'NAMEDENTITY') {
			NamedEntity.setTag(tag, alias);
		}
		else if (type.toUpperCase() === 'RELATION') {
			Relation.setTag(tag, alias);
		}
	}

};

export default Sejong;
