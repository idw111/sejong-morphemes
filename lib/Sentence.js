var Word = require('./Word');

var Sentence = function() {
	this.words = [];
	if (arguments.length === 1 && !!arguments[0] && typeof arguments[0] === 'string') {
		this._decode(arguments[0]);
	}
};

Sentence.prototype._decode = function(code) {
	code = code.replace(/\s+/, ' ');
	var words = code.split(' ');
	for (var i in words) {
		if (!!words[i]) this.add(new Word(words[i]));
	}
};

Sentence.prototype.add = function(word) {
	if (!(word instanceof Word)) return;
	word.index = this.words.length;
	this.words.push(word);
};

Sentence.prototype.getText = function() {
	return this.words.map(function(word) {
		return word.getText();
	}).join(' ');
};

Sentence.prototype.equals = function(sentence) {
	return this.toString() === sentence.toString();
};

Sentence.prototype.toString = function() {
	return this.words.map(function(word) {
		return word.toString();
	}).join(' ');
};

Sentence.prototype.toJSON = function() {
	return {
		text: this.getText(),
		words: this.words.map(function(word) {
			return word.toJSON();
		})
	}
};

module.exports = Sentence;
