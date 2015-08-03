'use strict';

import {
	SET_CURRENTUSER,
	GET_CURRENTUSER,
	SET_AVATAR,
	GET_AVATAR
} from '../constants/actionTypes';

import {
	whoami,
	getFile
} from '../server';

export function getAvatarById(id) {
	return dispatch => getFile(id, (err, res) => {
		if (err) console.warn(err);
		else dispatch({type: SET_AVATAR, data: res.data});
	});
}

export function setCurrentUser(details) {
	return dispatch => dispatch({type: SET_CURRENTUSER, data: details});
}
