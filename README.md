# [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> 한글 문장 및 어절을 세종계획 기반의 형태소로 태깅하기 위한 라이브러리


## Install

```sh
$ npm install --save hangul-morphemes
```


## Usage

```js
var morphemesText = '정치가/NNG 모임/NNG+이/JC 새로/MA 구성/NNG+되/XS+ㄴ다/EF+./SF';
var morphemesObj = {
	text: '정치가 모임이 새로 구성된다.',
	words: [
		{
			text: '정치가',
			morphemes: [{text: '정치가', type: 'NNG'}]
		},
		{
			text: '모임이',
			morphemes: [{text: '모임', type: 'NNG'}, {text: '이', type: 'JC'}]
		},
		{
			text: '새로',
			morphemes: [{text: '새로', type: 'MA'}]
		},
		{
			text: '구성된다',
			morphemes: [{text: '구성', type: 'NNG'}, {text: '되', type: 'XS'}, {text: 'ㄴ다', type: 'EF'}, {text: '.', type: 'SF'}]
		}
	]
};

var morphemes = require('hangul-morphemes');
morphemes.initialize();

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

var phrase = new Phrase();

// 내장된 태그셋과 다른 태그셋을 이용하고자 할 때는
// initialize 함수에 사용하고자 하는 태그셋을 인자로 넘겨준다.
// alias를 지정하면 해당 태그에 대해 alias를 이용할 수 있다.
morphemes.initialize({
	morpheme: {
		tag: {
			ABC: 'abc',
			DEF: 'def'
		},
		alias: {
			'뮻': 'ABC',
			'뮤ㅊ': 'ABC',
			'ㅁㅠㅊ': 'ABC',
			'ㅇㄷㄹ': 'DEF'
		}
	},
	phrase: {
		tag: {},
		alias: {}
	}
});

```


## License

MIT © [Dongwon Lim](./LICENSE)


[npm-image]: https://badge.fury.io/js/sejong-morphemes.svg
[npm-url]: https://npmjs.org/package/sejong-morphemes
[travis-image]: https://travis-ci.org/idw111/sejong-morphemes.svg?branch=master
[travis-url]: https://travis-ci.org/idw111/sejong-morphemes
[daviddm-image]: https://david-dm.org/idw111/sejong-morphemes.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/idw111/sejong-morphemes
[coveralls-image]: https://coveralls.io/repos/idw111/sejong-morphemes/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/idw111/sejong-morphemes?branch=master
