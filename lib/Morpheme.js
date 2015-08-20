var MorphemeType = require('./enum/MorphemeType');
var HangulTags = require('./enum/HangulTags');

var Morpheme = function() {
	if (arguments.length === 1) {
		this._decode(arguments[0]);
	}
	else if (arguments.length === 2) {
		this.text = arguments[0];
		this.type = this._decodeType(arguments[1]);
	}
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
	if (code in MorphemeType) type = code;
	else if (this._isHangulTag(code)) type = HangulTags[code];
	this.alias = MorphemeType[type];
	return type;
};

Morpheme.prototype._isHangulTag = function(type) {
	return type in HangulTags;
};

Morpheme.prototype.toString = function() {
	return this.text + '/' + this.type;
};

Morpheme.prototype.toObject = function() {
	return {
		text: this.text,
		type: this.type,
		alias: this.alias
	}
};

module.exports = Morpheme;
