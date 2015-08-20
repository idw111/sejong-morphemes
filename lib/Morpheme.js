var MorphemeType = require('./enum/MorphemeType');

var Morpheme = function() {
	if (arguments.length === 1) {
		this._decode(arguments[0]);
	}
	else if (arguments.length === 2) {
		this.text = arguments[0];
		this.type = arguments[1];
	}
};

Morpheme.prototype._decode = function(code) {
	code = code.replace(/\s/g, '');
	var delimiter = code.lastIndexOf('/');
	if (delimiter === -1) {
		this.text = code;
		this.type = 'UNKNOWN';
	}
	else {
		this.text = code.substr(0, delimiter);
		this.type = code.substr(delimiter + 1);
		if (!(this.type in MorphemeType)) {
			this.type = 'UNKNOWN';
		}
	}
	this.alias = MorphemeType[this.type];
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
