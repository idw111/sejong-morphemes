import NamedEntityTag, { NamedEntityCategory } from './enum/NamedEntityTag';
import NamedEntityAlias from './enum/NamedEntityAlias';

export default class NamedEntity {

	constructor(text, index, type) {
		this.text = text;
		this.index = index;
		this.type = this._decodeType(type || '');
	}

	_decodeType(code) {
		code = code.toUpperCase();
		var type = '???';
		this.category = '';
		if (this._isTag(code)) type = code;
		else if (this._isAlias(code)) type = NamedEntity.alias[code];
		this.alias = NamedEntity.tag[type];
		return type;
	}

	_isTag(type) {
		if (type in NamedEntity.category) return true;
		return Object.keys(NamedEntity.category).some((key, index, keys) => {
			if (!(type in NamedEntity.tag[key])) return false;
			this.category = key;
			return true;
		});
	}

	_isAlias(type) {
		return type in NamedEntity.alias;
	}

	tag(type) {
		this.type = this._decodeType(type);
	}

	equals(entity) {
		return this.text === entity.text && this.index === entity.index && this.type === entity.type;
	}

}

NamedEntity.category = NamedEntityCategory;

NamedEntity.tag = NamedEntityTag;

NamedEntity.alias = NamedEntityAlias;

NamedEntity.setTag = function(tag, alias) {
	NamedEntity.tag = tag || NamedEntityTag;
	NamedEntity.alias = alias || (!!tag ? {} : NamedEntityAlias);
};
