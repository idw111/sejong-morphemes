var MorphemeType = require('./enum/MorphemeType');
var HangulTags = require('./enum/HangulTags');
var AliasTags = require('./enum/AliasTags');

var Morpheme = function() {
	if (arguments.length === 1 && !!arguments[0]) {
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
		this.type = this._decodeType('UNKNOWN');
	}
	else {
		this.text = code.substr(0, delimiter);
		this.type = this._decodeType(code.substr(delimiter + 1));
	}
};

Morpheme.prototype._decodeType = function(code) {
	code = code.toUpperCase();
	var type = 'UNKNOWN';
	if (code in MorphemeType) type = code;
	else if (this._isHangulTag(code)) type = HangulTags[code];
	else if (this._isAliasTag(code)) type = AliasTags[code];
	this.alias = MorphemeType[type];
	return type;
};

Morpheme.prototype._isHangulTag = function(tag) {
	return tag in HangulTags;
};

Morpheme.prototype._isAliasTag = function(tag) {
	return tag in AliasTags;
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
