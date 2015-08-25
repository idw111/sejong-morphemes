'use strict';

var PhraseTag = {

	'???': '알수없는구',

	// 구문표지
	S: '문장',
	Q: '인용절',
	NP: '체언구',
	VP: '용언구',
	VNP: '긍정지정사구',
	AP: '부사구',
	DP: '관형사구',
	IP: '감탄사구',

	// 기능표지
	SBJ: '주어',
	OBJ: '목적어',
	CMP: '보어',
	MOD: '체언수식어',
	AJT: '용언수식어',
	CNJ: '접속어',
	INT: '독립어',

};

module.exports = PhraseTag;
