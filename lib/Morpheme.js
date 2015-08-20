var MorphemeType = requrie('./enum/MorphemeType');

var Morpheme = function() {
	if (arguments.length === 1) {
		this._decode(arguments[0]);
	}
	else if (arguments.length === 2) {
		this.word = arguments[0];
		this.type = arguments[1];
	}
};

Morpheme.prototype._decode = function(code) {
	var delimiter = code.lastIndexOf('/');
	if (delimiter === -1) {
		this.word = code;
		this.type = MorphemeType.UNKNOWN;
	}
	else {
		this.word = code.substr(0, delimiter);
		this.type = code.substr(delimiter + 1);
		if (!(this.type in MorphemeType)) {
			this.type = MorphemeType.UNKNOWN;
		}
	}
};

Morpheme.prototype.toString = function() {
	return this.word + '/' + this.type;
};

Morpheme.prototype.toObject = function() {
	return {
		word: this.word,
		type: this.type
	}
};
