import NamedEntity from './NamedEntity';
import RelationTag from './enum/RelationTag';
import RelationAlias from './enum/RelationAlias';

class Relation {

	constructor(entity1, entity2) {
		if (!(entity1 instanceof NamedEntity) || !(entity2 instanceof NamedEntity)) return console.log('Error: should pass NamedEntity object to Relation constructor...');
		this.entities = [entity1, entity2];
		this.type = this._decodeType('');
	}

	_decodeType(code) {
		code = code.toUpperCase();
		var type = '???';
		if (this._isTag(code)) type = code;
		else if (this._isAlias(code)) type = Relation.alias[code];
		this.alias = Relation.tag[type];
		return type;
	}

	_isTag(type) {
		return !!Relation.tag && type in Relation.tag;
	}

	_isAlias(type) {
		return !!Relation.alias && type in Relation.alias;
	}

	tag(type) {
		this.type = this._decodeType(type || '');
	}

	connects(entity1, entity2) {
		if (!entity1 || !entity2) return false;
		return (this.entities[0].equals(entity1) && this.entities[1].equals(entity2)) || (this.entities[0].equals(entity2) && this.entities[1].equals(entity1));
	}

	equals(relation) {
		if (relation.entities.length !== 2) return false;
		return this.connects(relation.entities[0], relation.entities[1]);
	}

	/**
	 * 적절한 관계 태그를 갖고 있는지 확인한다.
	 * @return {boolean}
	 */
	isTagged() {
		return !!this.type && this.type !== '???';
	}

}

Relation.setTag = function(tag, alias) {
	tag = tag || RelationTag;
	alias = alias || (!!tag ? {} : RelationAlias);

	Relation.tag = tag;
	Relation.alias = alias;
};

Relation.setTag();

export default Relation;
