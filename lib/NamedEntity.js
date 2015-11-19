import NamedEntityTag from './enum/NamedEntityTag';
import NamedEntityAlias from './enum/NamedEntityAlias';

export default class NamedEntity {

	constructor(text, index, type) {
		this.text = text;
		this.index = index;
		// this.category = '';
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
		this.type = this._decodeType(type || '');
	}

	equals(entity) {
		return this.text === entity.text && this.index === entity.index && this.type === entity.type;
	}

	/**
	 * 적절한 개체명 태그를 갖고 있는지 확인한다.
	 * @return {boolean}
	 */
	isTagged() {
		return !!this.type && this.type !== '???';
	}

}

NamedEntity.setTag = function(tag, alias) {
	tag = tag || NamedEntityTag;
	alias = alias || (!!tag ? {} : NamedEntityAlias);

	const categoryKeys = Object.keys(tag).filter((singleTag) => singleTag.search(/\./) === -1);
	const tagKeys = Object.keys(tag).filter((singleTag) => singleTag.search(/\./) !== -1);

	NamedEntity.category = {};
	NamedEntity.tag = {};
	categoryKeys.forEach((key) => {
		NamedEntity.category[key] = tag[key];
		NamedEntity.tag[key] = {};
	});

	tagKeys.forEach((key) => {
		const item = key.split('.');
		const category = item[0];
		const name = item[1];
		NamedEntity.tag[category][name] = tag[key];
	});
	NamedEntity.alias = alias || (!!tag ? {} : NamedEntityAlias);

};
