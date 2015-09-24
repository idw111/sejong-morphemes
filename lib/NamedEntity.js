export default class NamedEntity {

	constructor(text, type, index) {
		this.text = text;
		this.type = type;
		this.index = index;
	}

	tag(type) {
		this.type = type;
	}

	equals(entity) {
		return this.text === entity.text && this.type === entity.type && this.index === entity.index;
	}

}
