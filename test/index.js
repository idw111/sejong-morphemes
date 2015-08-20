var expect = require('expect.js');
var morphemes = require('../lib');
var MorphemeType = morphemes.Type;
var Morpheme = morphemes.Morpheme;
var Word = morphemes.Word;
var Sentence = morphemes.Sentence;

describe('hangul-morphemes', function () {

    it('형태소 객체를 생성할 수 있다.', function() {
        var morpheme = new Morpheme('가나다', 'NNG');
        expect(morpheme.text).to.be('가나다');
        expect(morpheme.type).to.be('NNG');
        expect(morpheme.toString()).to.be('가나다/NNG');
    });

    it('텍스트를 인자로 받아 형태소 객체를 생성할 수 있다.', function() {
        var morpheme = new Morpheme('가나다/NNG');
        expect(morpheme.text).to.be('가나다');
        expect(morpheme.type).to.be('NNG');
        expect(morpheme.toString()).to.be('가나다/NNG');
    });

    it('어절 객체를 생성할 수 있다.', function() {
        var word = new Word();
        word.add(new Morpheme('모임/NNG'));
        word.add(new Morpheme('이/JC'));
        expect(word.getText()).to.be('모임이');
        expect(word.getType()).to.be('NNG+JC');
        expect(word.toString()).to.be('모임/NNG+이/JC');
    });

    it('텍스트를 인자로 받아 어절 객체를 생성할 수 있다.', function() {
        var word = new Word('모임/NNG+이/JC');
        expect(word.getText()).to.be('모임이');
        expect(word.getType()).to.be('NNG+JC');
        expect(word.toString()).to.be('모임/NNG+이/JC');
    });

    it('문장 객체를 생성할 수 있다.', function() {
        var sentence = new Sentence();
        sentence.add(new Word('정치가/NNG'));
        sentence.add(new Word('모임/NNG+이/JC'));
        sentence.add(new Word('새로/MA'));
        sentence.add(new Word('구성된다.'));
        expect(sentence.getText()).to.be('정치가 모임이 새로 구성된다.');
    });

    it('텍스트를 인자로 받아 문장 객체를 생성할 수 있다.', function() {
        var sentence = new Sentence('정치가/NNG 모임/NNG+이/JC 새로/MA 구성/NNG+되/XS+ㄴ다/EF+./SF');
        expect(sentence.getText()).to.be('정치가 모임이 새로 구성된다.');
    });

});
