var Hangul = require('hangul-js');
var Morpheme = require('./Morpheme');

var Word = function() {
	this.morphemes = [];
	if (arguments.length === 1 && !!arguments[0] && typeof arguments[0] === 'string') {
		this._decode(arguments[0]);
	}
};

Word.prototype._decode = function(code) {
	code = code.replace(/\s/g, '');
	var morphemes = code.split('+');
	for (var i in morphemes) {
		if (!!morphemes[i]) this.morphemes.push(new Morpheme(morphemes[i]));
	}
};

Word.prototype.getText = function() {
	var morphemes = this.morphemes.map(function(morpheme) {
		return Hangul.disassemble(morpheme.text);
	});

	var letters = [];
	for (var i in morphemes) {
		letters = letters.concat(morphemes[i]);
	}
	return Hangul.assemble(letters);
};

Word.prototype.getType = function() {
	return this.morphemes.map(function(morpheme) {
		return morpheme.type;
	}).join('+');
};

Word.prototype.add = function(morpheme) {
	if (!(morpheme instanceof Morpheme)) return;
	this.morphemes.push(morpheme);
};

Word.prototype.toString = function() {
	return this.morphemes.map(function(morpheme) {
		return morpheme.toString();
	}).join('+');
};

Word.prototype.toJSON = function() {
	return {
		text: this.getText(),
		morphemes: this.morphemes.map(function(morpheme) {
			return morpheme.toJSON();
		})
	};
};

Word.prototype.toRegex = function() {
	var regex = this.morphemes.map(function(morpheme, index) {
		return morpheme.text + '[\\/\\S*]*' + (index === this.morphemes.length - 1 ? '' : '\\+');
	}.bind(this));
	return new RegExp(regex.join(''));
};

module.exports = Word;
