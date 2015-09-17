var expect = require('expect.js');
var Sejong = require('../lib');
var Morpheme = Sejong.Morpheme;
var Word = Sejong.Word;
var Sentence = Sejong.Sentence;
var Phrase = Sejong.Phrase;
var Structure = Sejong.Structure;

describe('hangul-Sejong', function () {

    before(function() {
        Sejong.initialize();
    });

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
        expect(word.toString()).to.be('모임/NNG+이/JC');
    });

    it('텍스트를 인자로 받아 어절 객체를 생성할 수 있다.', function() {
        var word = new Word('모임/NNG+이/JC');
        expect(word.getText()).to.be('모임이');
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

    it('두 개의 단어 객체를 인자로하여 구문 객체를 생성할 수 있다.', function() {
        var sentence = new Sentence('정치가/NNG 모임/NNG+이/JC 새로/MA 구성/NNG+되/XS+ㄴ다/EF+./SF');
        var words = sentence.words.map(function(word, index) {
            word.index = index;
            return word;
        });
        var phrase = new Phrase(words[0], words[1]);
        expect(phrase.toString()).to.be('1 2 ??? 정치가/NNG');
        expect(phrase.connects(0, 1)).to.be.ok();
        phrase.tag('SUBJ');
        expect(phrase.toString()).to.be('1 2 SUBJ 정치가/NNG');
    });

    it('문장을 인자로 하여 문장구조 객체를 생성할 수 있다.', function() {
        var sentence = new Sentence('정치가/NNG 모임/NNG+이/JC 새로/MA 구성/NNG+되/XS+ㄴ다/EF+./SF');
        var structure = new Structure(sentence);
        structure.connect(0, 1);
        structure.connect(1, 2);
        structure.connect(1, 3);
        structure.connect(2, 3);
        expect(structure.getCordCount(0)).to.be(1);
        expect(structure.getCordCount(1)).to.be(3);
    });

});
