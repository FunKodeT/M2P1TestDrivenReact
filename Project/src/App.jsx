//#region imports
//#region custom
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import AccountActivationPage from './pages/AccountActivationPage';
import LanguageSelector from './components/LanguageSelector';
import logo from '../assets/logo.png';
//#endregion
//#region i18n
import { useTranslation } from 'react-i18next';
//#endregion
//#region react
import { useState } from 'react';
//#endregion
//#region reactRouterDom
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//#endregion
//#endregion
//#region main
function App() {
	//#region globals
	//#region translation
	const { t } = useTranslation();
	//#endregion
	//#region states
	const [random, setRandom] = useState(10);
	//#endregion
	//#region functions
	//#region generateRandom()
	const generateRandom = () => {
		setRandom(Math.random() * 100);
	};
	//#endregion
	//#endregion
	//#endregion
	//#region HTML
	return (
		<Router>
			<nav className="navbar navbar-expand navbar-light bg-light shadow-sm">
				<div className="container">
					<Link className="navbar-brand" to="/" title="Home">
						<img src={logo} alt="Hoaxify" width="60" />
						Hoaxify
					</Link>
					<ul className="navbar-nav">
						<Link className="nav-link" to="/signup">
							{t('signUp')}
						</Link>
						<Link className="nav-link" to="/login">
							Login
						</Link>
					</ul>
				</div>
			</nav>
			<div className="container">
				<Route exact path="/" component={HomePage} />
				<Route path="/signup">
					<SignUpPage random={random} />
				</Route>
				<Route path="/login">
					<LoginPage random={random} />
				</Route>
				<Route path="/user/:id" component={UserPage} />
				<Route
					path="/activate/:token"
					component={AccountActivationPage}
				/>
				<LanguageSelector />
			</div>
			<button onClick={generateRandom}>Generate Random</button>
		</Router>
	);
	//#endregion
}
//#endregion

//#region exports
export default App;
//#endregion

// -- old --
//#region prevIterations
//#region imports
//#region custom
//#endregion
//#region i18n
//#endregion
//#region react
// import { useState } from 'react';
//#endregion
//#region reactRouterDom
// import { BrowserRouter, Route, Link } from 'react-router-dom';
// import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
//#endregion
//#region defaultImports
// import logo from './logo.svg';
// import './App.css';
//#endregion
//#endregion
//#region main
//#region globals
//#region translation
//#endregion
//#region useState
//#region Method 2
// const [path, setPath] = useState(window.location.pathname);
// const [path, setPath] = useState('/login');
//#endregion
//#region Method 1
// const array = useState('/login')
// const path = array[0]
// setPath = array [1]
//#endregion
//#endregion
//#region clickRouting
//#region onClickLink()
// const onClickLink = (e) => {
// 	e.preventDefault();
// 	const path = e.currentTarget.attributes.href.value;
// 	window.history.pushState({}, '', path);
// 	setPath(path);
// };
//#endregion
//#region pathTarget
// const path = e.target.attributes.href.value;
//#endregion
//#endregion
//#endregion
//#region HTML
// {/* <HashRouter> */}
// {/* <BrowserRouter> */}
// {/* <> */}
//#region navBar
//#region homePage
// {/* <a
// 	className="navbar-brand"
// 	href="/"
// 	title="Home"
// 	onClick={onClickLink}>
// 	<img src={logo} alt="Hoaxify" width="60" />
// 	Hoaxify
// </a> */}

// {/* <Route path="/" component={HomePage} /> */}

// {/* <a href="/" title="Home" onClick={onClickLink}> */}

// {/* <a href="/" title="Home"> */}

// {/* <a href="/">Home</a> */}
//#endregion
//#region signupPage
// {/* <a
// 	className="nav-link"
// 	href="/signup"
// 	onClick={onClickLink}>
// 	{t('signUp')}
// </a> */}

// {/* <a href="/signup" onClick={onClickLink}> */}

// {/* <a href="/signup">Sign Up</a> */}
//#endregion
//#region loginPage
// {/* <a
// 	className="nav-link"
// 	href="/login"
// 	onClick={onClickLink}>
// 	Login
// </a> */}

// {/* <a href="/login" onClick={onClickLink}></a> */}

// {/* <a href="/">Login</a> */}
//#endregion
//#region activationShowcase
// {/* <Link className="nav-link" to="/activate/1"> */}
// {/* Activate 1 */}
// {/* </Link> */}
// {/* <Link className="nav-link" to="/activate/2"> */}
// {/* Activate 2 */}
// {/* </Link> */}
//#endregion
//#region pageRouting
// {/* <Route path="/signup" component={SignUpPage} /> */}
// {/* <Route path="/login" component={LoginPage} /> */}

// {/* {path === '/' && <HomePage />} */}
// {/* {path === '/signup' && <SignUpPage />} */}
// {/* {path === '/login' && <LoginPage />} */}
// {/* {path.startsWith('/user/') && <UserPage />} */}

// {/* <div> */}
// {/* <a href="/" title="Home" onClick={onClickLink}> */}
// {/* Hoaxify */}
// {/* </a> */}
// {/* <a href="/signup" onClick={onClickLink}> */}
// {/* {t('signUp')} */}
// {/* </a> */}
// {/* <a href="/login" onClick={onClickLink}> */}
// {/* Login */}
// {/* </a> */}
// {/* </div> */}

// {/* {window.location.pathname === '/' && <HomePage />} */}
// {/* {window.location.pathname === '/signup' && <SignUpPage />} */}
// {/* {window.location.pathname === '/login' && <LoginPage />} */}
// {/* {window.location.pathname.startsWith('/user/') && <UserPage />} */}
//#endregion
//#endregion
//#region pageRender
// {/* <HomePage /> */}
// {/* <SignUpPage /> */}
//#endregion
//#region defaultApp
// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>
//#endregion
// </HashRouter>
// </BrowserRouter>
// {/* </> */}
//#endregion
//#endregion
//#region exports
//#endregion
//#endregion
