//#region imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './locale/i18n';
//#endregion
//#region globals
const root = ReactDOM.createRoot(document.getElementById('root'));
//#endregion
//#region functions
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
//#endregion

reportWebVitals();

// -- old --
//#region prevIterations
//#region imports
// import i18n from 'i18next'
// import { initReacti18next } from 'react-i18next'
//#endregion
//#region functions
//#region i18n
// i18n.use(initReacti18next).init({
// 	resources: {
// 		en: {
// 			translation: {
// 				signUp: 'Sign Up',
// 				username: 'Username',
// 				email: 'Email',
// 				password: 'Password',
// 				passwordRepeated: 'Password Repeated'
// 			}
// 		},
// 		tr: {
// 			translation: {
// 				signUp: 'Kayit Ol',
// 				username: 'Kullanici Adi',
// 				email: 'Eposta'
// 				password: '$ifre',
// 				passwordRepeat: '$ifre Tekrari'
// 			}
// 		},
// 	},
// 	// lng: 'tr',
// 	lng: 'en',
// 	fallbacking: 'en',
// 	interpolation: {
// 		escapeValue: false
// 	}
// })
//#endregion
//#endregion
//#endregion
