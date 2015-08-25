'use strict';

var PhraseAlias = {

	// 구문표지
	'문장': 'S',
	'인용절': 'Q',
	'체언구': 'NP',
	'용언구': 'VP',
	'긍정지정사구': 'VNP',
	'부사구': 'AP',
	'관형사구': 'DP',
	'감탄사구': 'IP',

	// 기능표지
	'주어': 'SBJ',
	'목적어': 'OBJ',
	'보어': 'CMP',
	'체언수식어': 'MOD',
	'용언수식어': 'AJT',
	'접속어': 'CNJ',
	'독립어': 'INT',

	// 구문표지
	'ㄴ': 'S',
	'ㅂ': 'Q',
	'ㅞ': 'NP',
	'ㅜㅔ': 'NP',
	'페': 'VP',
	'ㅍㅔ': 'VP',
	'풰': 'VNP',
	'푸ㅔ': 'VNP',
	'ㅍㅜㅔ': 'VNP',
	'메': 'AP',
	'ㅁㅔ': 'AP',
	'에': 'DP',
	'ㅇㅔ': 'DP',
	'ㅑㅔ': 'IP',

	// 기능표지
	'뉴ㅓ': 'SBJ',
	'ㄴㅠㅓ': 'SBJ',
	'ㅐㅠㅓ': 'OBJ',
	'츠ㅔ': 'CMP',
	'ㅊㅡㅔ': 'CMP',
	'ㅡㅐㅇ': 'MOD',
	'멋': 'AJT',
	'머ㅅ': 'AJT',
	'ㅁㅓㅅ': 'AJT',
	'춰': 'CNJ',
	'추ㅓ': 'CNJ',
	'ㅊㅝ': 'CNJ',
	'ㅊㅜㅓ': 'CNJ',
	'ㅑㅜㅅ': 'INT',

};

module.exports = PhraseAlias;