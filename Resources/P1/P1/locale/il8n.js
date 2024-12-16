import il8n from 'il8next'
import { initReactIl8next } from 'react-il8next'
import en from './en.json'
import tr from './tr.json'

il8n.use(initReactIl8next).init({
	resources: { 
		en: { 
		translation: { 
			en
// 			signUp: 'Sign Up',
// 			username: 'Username',
// 			email: 'Email',
// 			password: 'Password',
// 			passwordRepeated: 'Password Repeated'
			}
		},
		tr: { 
		translation: { 
			tr
//			signUp: 'Kayit Ol',
//			username: 'Kullanici Adi',
//			email: 'Eposta'
//			password: '$ifre',
//			passwordRepeat: '$ifre Tekrari'
			}
		},
	}, 
	// lng: 'tr', 
	lng: 'en', 
	fallbacking: 'en', 
	interpolation: { 
		escapeValue: false
	}
})

export default il8n