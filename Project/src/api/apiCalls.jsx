//#region imports
import axios from 'axios';
import i18n from '../locale/il8n';
//#endregion
//#region functions
export const signUp = (body) => {
	return axios.post('/api/1.0/users', body, {
		headers: {
			'Accept-Language': this.props.i18n.language,
		},
	});
};
//#endregion

//#region exports
export const activate = (token) => {
	return axios.post('/api/1.0/users/token/' + token);
};
//#endregion

// -- old --
//#region prevIterations
//#region imports
//#endregion
//#region functions
//#endregion
//#region exports
//#endregion
//#endregion
