# hangul-morphemes [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
>


## Install

```sh
$ npm install --save hangul-morphemes
```


## Usage

```js
var morphemesText = '정치가/NNG 모임/NNG+이/JC 새로/MA 구성/NNG+되/XS+ㄴ다/EF+./SF';
var morphemesObj = {
	sentence: '정치가 모임이 새로 구성된다.',
	morphemes: [
		{
			word: '정치가',
			morphemes: [{word: '정치가', type: 'NNG'}]
		},
		{
			word: '모임이',
			morphemes: [{word: '모임', type: 'NNG'}, {word: '이', type: 'JC'}]
		},
		{
			word: '새로',
			morphemes: [{word: '새로', type: 'MA'}]
		},
		{
			word: '구성된다',
			morphemes: [{word: '구성', type: 'NNG'}, {word: '되', type: 'XS'}, {word: 'ㄴ다', type: 'EF'}, {word: '.', type: 'SF'}]
		}
	]
};

var morphemes = require('hangul-morphemes');
var Morpheme = morphemes.Morpheme;
var Word = morphemes.Word;
var Phrase = morphemes.Phrase;
var Sentence = morphemes.Sentence;

var sentence1 = new Sentence(morphemesText);
// sentence1.toString() === morphemesText
// sentence1.toObject() == morphemesObj

var sentence2 = new Sentence();
var word1 = new Word('정치가/NNG');
var word2 = new Word('모임/NNG+이/JC');
var word3 = new Word('새로/MA');
var word4 = new Word('구성/NNG+되/XS+ㄴ다/EF+./SF');
sentence2.add(word1);
sentence2.add(word2);
sentence2.add(word3);
sentence2.add(word4);
// sentence2.toString() === morphemesText
// sentence2.toObject() == morphemesObj

var word = new Word();
var morpheme1 = new Morpheme('모임', 'NNG');
var morpheme2 = new Morpheme('이', 'JC');
word.add(morpheme1);
word.add(morpheme2);
// word.toString() === word2.toString();
// word.toObject() == word2.toObject();
```

## License

MIT © [Dongwon Lim](./LICENSE)


[npm-image]: https://badge.fury.io/js/hangul-morphemes.svg
[npm-url]: https://npmjs.org/package/hangul-morphemes
[travis-image]: https://travis-ci.org//hangul-morphemes.svg?branch=master
[travis-url]: https://travis-ci.org//hangul-morphemes
[daviddm-image]: https://david-dm.org//hangul-morphemes.svg?theme=shields.io
[daviddm-url]: https://david-dm.org//hangul-morphemes
[coveralls-image]: https://coveralls.io/repos//hangul-morphemes/badge.svg
[coveralls-url]: https://coveralls.io/r//hangul-morphemes
