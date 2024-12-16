//#region imports
import i18n from 'i18next';
import { initReacti18next } from 'react-i18next';
import en from './en.json';
import tr from './tr.json';
//#endregion
//#region functions
i18n.use(initReacti18next).init({
	resources: {
		en: {
			translation: {
				en,
			},
		},
		tr: {
			translation: {
				tr,
			},
		},
	},
	lng: 'en',
	fallbacking: 'en',
	interpolation: {
		escapeValue: false,
	},
});
//#endregion

//#region exports
export default i18n;
//#endregion

// -- old --
//#region prevIterations
//#region resources
//#region translation
// en: {
// translation: {
//		signUp: 'Sign Up',
//		username: 'Username',
//		email: 'Email',
//		password: 'Password',
//		passwordRepeated: 'Password Repeated'
// }},
// tr: {
// translation: {
//		signUp: 'Kayit Ol',
//		username: 'Kullanici Adi',
//		email: 'Eposta'
//		password: '$ifre',
//		passwordRepeat: '$ifre Tekrari'
// }},
//#endregion
//#region lng
// lng: 'tr',
//#endregion
//#endregion
//#endregion
