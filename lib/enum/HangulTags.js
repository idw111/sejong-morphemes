'use strict';

var MorphemeType = {

	'???': 'UNKNOWN',

	// 체언
	'ㅜㅜ': 'NN',
	'ㅜㅜㅎ': 'NNG',
	'ㅜㅞ': 'NNP',
	'ㅜㅜㅔ': 'NNP',
	'ㅜㅜㅠ': 'NNB',
	'ㅞ': 'NP',
	'ㅜㅔ': 'NP',
	'ㅜㄱ': 'NR',

	// 용언
	'ㅍㅍ': 'VV',
	'ㅍㅁ': 'VA',
	'ㅍㅌ': 'VX',
	'ㅍㅊ': 'VC',
	'ㅍ체': 'VCP',
	'ㅍㅊㅔ': 'VCP',
	'ㅍ추': 'VCN',
	'ㅍㅊㅜ': 'VCN',

	// 수식언
	'ㅡㅡ': 'MM',
	'ㅡㅁ': 'MA',
	'ㅡㅁㅎ': 'MAG',
	'ㅡ머': 'MAJ',
	'ㅡㅁㅓ': 'MAJ',

	// 독립언
	'ㅑㅊ': 'IC',

	// 관계언
	'ㅓㅏ': 'JK',
	'ㅓㅏㄴ': 'JKS',
	'ㅓㅏㅊ': 'JKC',
	'ㅓㅏㅎ': 'JKG',
	'ㅓㅏㅐ': 'JKO',
	'ㅓㅏㅠ': 'JKB',
	'ㅓㅏㅍ': 'JKV',
	'ㅓㅏㅂ': 'JKQ',
	'ㅓㅌ': 'JX',
	'ㅓㅊ': 'JC',

	// 의존형태
	'ㄷ': 'E',
	'데': 'EP',
	'ㄷㅔ': 'EP',
	'ㄷㄹ': 'EF',
	'ㄷㅊ': 'EC',
	'ㄷ수': 'ETN',
	'ㄷㅅㅜ': 'ETN',
	'ㄷ스': 'ETM',
	'ㄷㅅㅡ': 'ETM',
	'테': 'XP',
	'ㅌㅔ': 'XP',
	'테ㅜ': 'XPN',
	'ㅌㅔㅜ': 'XPN',
	'ㅌㄴ': 'XS',
	'ㅌ누': 'XSN',
	'ㅌㄴㅜ': 'XSN',
	'ㅌㄴㅍ': 'XSV',
	'ㅌㄴㅁ': 'XSA',
	'ㅌ뉴': 'XSB',
	'ㅌㄴㅠ': 'XSB',
	'ㅌㄱ': 'XR',

	// 기호
	'ㄴㄹ': 'SF',
	'네': 'SP',
	'ㄴㅔ': 'SP',
	'ㄴㄴ': 'SS',
	'ㄴㄷ': 'SE',
	'내': 'SO',
	'ㄴㅐ': 'SO',
	'니': 'SL',
	'ㄴㅣ': 'SL',
	'노': 'SH',
	'ㄴㅗ': 'SH',
	'ㄴㅈ': 'SW',
	'ㅜㄹ': 'NF',
	'ㅜㅍ': 'NV',
	'누': 'SN',
	'ㄴㅜ': 'SN',
	'ㅜㅁ': 'NA',

};

module.exports = MorphemeType;