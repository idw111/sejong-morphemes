var MorphemeTag = require('./enum/MorphemeTag');
var MorphemeAlias = require('./enum/MorphemeAlias');

var Morpheme = function() {
	if (arguments.length === 1 && !!arguments[0]) {
		this._decode(arguments[0]);
	}
	else if (arguments.length === 2) {
		this.text = arguments[0];
		this.type = this._decodeType(arguments[1]);
	}
};

Morpheme.setTag = function(tag, alias) {
	Morpheme.tag = tag || MorphemeTag;
	Morpheme.alias = alias || (!!tag ? {} : MorphemeAlias);
};

Morpheme.prototype._decode = function(code) {
	code = code.replace(/\s/g, '');
	var delimiter = code.lastIndexOf('/');
	if (delimiter === -1) {
		this.text = code;
		this.type = this._decodeType('???');
	}
	else {
		this.text = code.substr(0, delimiter);
		this.type = this._decodeType(code.substr(delimiter + 1));
	}
};

Morpheme.prototype._decodeType = function(code) {
	code = code.toUpperCase();
	var type = '???';
	if (this._isTag(code)) type = code;
	else if (this._isAlias(code)) type = Morpheme.alias[code];
	this.alias = Morpheme.tag[type];
	return type;
};

Morpheme.prototype._isTag = function(tag) {
	return tag in Morpheme.tag;
};

Morpheme.prototype._isAlias = function(tag) {
	return tag in Morpheme.alias;
};

Morpheme.prototype.equals = function(morpheme) {
	return this.toString() === morpheme.toString();
};

Morpheme.prototype.toString = function() {
	return this.text + '/' + this.type;
};

Morpheme.prototype.toJSON = function() {
	return {
		text: this.text,
		type: this.type,
		alias: this.alias
	}
};

module.exports = Morpheme;
