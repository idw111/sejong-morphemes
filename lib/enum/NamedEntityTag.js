'use strict';

const NamedEntityCategory = {
	HUMAN: '인물',
	BLDG: '건물',
};

export { NamedEntityCategory };

const HUMAN = {
	CELEBRITY: '유명인',
	GREAT_MAN: '위인',
};

const BLDG = {
	HIST: '역사적건물',
	HOUSE: '주택'
};

const NamedEntityTag = {
	'???': '알수없는개체',
	HUMAN,
	BLDG
};

export default NamedEntityTag;
