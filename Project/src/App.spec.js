//#region imports
//#region custom
import App from './App';
//#endregion
//#region reactTesting
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
//#endregion
//#region msw
import { setupServer } from 'msw/node';
import { rest } from 'msw';
//#endregion
//#endregion
//#region globals
//#region serverMockup
const server = setupServer(
	rest.post('/api/1.0/users/token/:token', (req, res, ctx) => {
		return res(ctx.status(200));
	})
);
//#endregion
//#region beforeAfter()
beforeEach(() => {
	server.resetHandlers();
});
beforeAll(() => server.listen());
afterAll(() => server.close());
//#endregion
//#endregion

//#region routingSuite
describe('Routing', () => {
	//#region globals
	//#region setup()
	const setup = (path) => {
		window.history.pushState({}, '', path);
		render(<App />);
	};
	//#endregion
	//#endregion
	//#region displayPathPageWhenOnPath
	//#region eachRouting
	it.each`
		path               | pageTestId
		${'/'}             | ${'home-page'}
		${'/signup'}       | ${'signup-page'}
		${'/login'}        | ${'login-page'}
		${'/user/1'}       | ${'user-page'}
		${'/user/2'}       | ${'user-page'}
		${'/activate/123'} | ${'activation-page'}
		${'/activate/456'} | ${'activation-page'}
	`(
		//#endregion
		//#region test
		'displays $pageTestId when path is $path',
		(path, pageTestId) => {
			//#region setup()
			setup(path);
			//#endregion
			//#region pageVar
			const page = screen.queryByTestId(pageTestId);
			//#endregion
			//#region findInDoc
			expect(page).toBeInTheDocument();
			//#endregion
		}
	);
	//#endregion
	//#endregion
	//#region dontDisplayOtherPagesWhenOnPath
	//#region eachRouting
	it.each`
		path               | pageTestId
		${'/'}             | ${'signup-page'}
		${'/'}             | ${'login-page'}
		${'/'}             | ${'user-page'}
		${'/'}             | ${'activation-page'}
		${'/signup'}       | ${'home-page'}
		${'/signup'}       | ${'login-page'}
		${'/signup'}       | ${'user-page'}
		${'/signup'}       | ${'activation-page'}
		${'/login'}        | ${'home-page'}
		${'/login'}        | ${'signup-page'}
		${'/login'}        | ${'user-page'}
		${'/login'}        | ${'activation-page'}
		${'/user/1'}       | ${'home-page'}
		${'/user/1'}       | ${'signup-page'}
		${'/user/1'}       | ${'login-page'}
		${'/user/1'}       | ${'activation-page'}
		${'/activate/123'} | ${'home-page'}
		${'/activate/123'} | ${'signup-page'}
		${'/activate/123'} | ${'login-page'}
		${'/activate/123'} | ${'user-page'}
	`(
		//#endregion
		//#region test
		'does not display $pageTestId when path is $path',
		(path, pageTestId) => {
			//#region setup()
			setup(path);
			//#endregion
			//#region pageVar
			const page = screen.queryByTestId(pageTestId);
			//#endregion
			//#region dontFindInDoc
			expect(page).not.toBeInTheDocument();
			//#endregion
		}
	);
	//#endregion
	//#endregion
	//#region navLinkToPage
	//#region eachRouting
	it.each`
		targetPage
		${'Home'}
		${'Sign Up'}
		${'Login'}
	`(
		//#endregion
		//#region test
		'has link to $targetPage in nav',
		({ targetPage }) => {
			//#region setup()
			setup('/');
			//#endregion
			//#region linkVar
			const link = screen.getByRole('link', { name: targetPage });
			//#endregion
			//#region findInDoc
			expect(link).toBeInTheDocument();
			//#endregion
		}
	);
	//#endregion
	//#endregion
	//#region displayPageAfterClickingPage
	//#region eachRouting
	it.each`
		initialPath  | clickingTo   | visiblePage
		${'/'}       | ${'Sign Up'} | ${'signup-page'}
		${'/signup'} | ${'Home'}    | ${'home-page'}
		${'/signup'} | ${'Login'}   | ${'login-page'}
	`(
		//#endregion
		//#region test
		'display $visiblePage after clicking %clickingTo',
		({ initialPath, clickingTo, visiblePage }) => {
			//#region setup()
			setup(initialPath);
			//#endregion
			//#region linkVar
			const link = screen.getByRole('link', { name: clickingTo });
			//#endregion
			//#region findEvent
			userEvent.click(link);
			//#endregion
			//#region findInDoc
			expect(screen.getByTestId(visiblePage)).toBeInTheDocument();
			//#endregion
		}
	);
	//#endregion
	//#endregion
	//#region
	it('displays home when clicking logo', () => {
		setup('/login');
		const logo = screen.queryByAltText('Hoaxify');
		userEvent.click(logo);
		expect(screen.getByTestId('home-page')).toBeInTheDocument();
	});
	//#endregion
});
//#endregion
//#region consoleError()
console.error = () => {};
//#endregion

// -- old --
//#region prevIterations
//#region imports
// import { render, screen } from '@testing-library/react';
// import App from './App';
//#endregion
//#region routingSuite
//#region globals
//#region setup()
//#endregion
//#endregion
//#region displayPathPageWhenOnPath
//#region eachRouting
//#endregion
//#region test
//#region setup()
//#endregion
//#region findRoute
// window.history.pushState({}, '', path);
//#endregion
//#region render
// render(<App />);
//#endregion
//#region pageVar
//#endregion
//#region findInDoc
//#endregion
//#endregion
//#region -- old --
//#region displayHome
// it('displays homepage at /', () => {
//#region render
// render(<App />);
//#endregion
//#region homePageVar
// const homePage = screen.getByTestId('home-page');
//#endregion
//#region findInDoc
// expect(homePage).toBeInTheDocument();
//#endregion
// });
//#endregion
//#region displaySignUp
// it('displays signup page at /signup', () => {
//#region routing
// 	window.history.pushState({}, '', '/signup');
//#endregion
//#region render
// 	render(<App />);
//#endregion
//#region pageVar
// 	const page = screen.queryByTestId('signup-page');
//#endregion
//#region findInDoc
// 	expect(page).toBeInTheDocument();
//#endregion
// });
//#endregion
//#endregion
//#endregion
//#region dontDisplayOtherPagesWhenOnPath
//#region eachRouting
//#endregion
//#region test
//#region setup()
//#endregion
//#region findRoute
// window.history.pushState({}, '', path);
//#endregion
//#region render
// render(<App />);
//#endregion
//#region pageVar
//#endregion
//#region dontFindInDoc
//#endregion
//#endregion
//#region -- old --
//#region noSignUpPageDisplayOnHomePage
// it('does not display signUpPage when at /', () => {
//#region render
// render(<App />);
//#endregion
//#region grabId
// const page = screen.queryByTestId('signup-page');
//#endregion
//#region pageNotPresent
// expect(page).not.toBeInTheDocument();
//#endregion
// });
//#endregion
//#region noHomePageDisplayOnSignup
// it('does not display homePage when at /signup', () => {
//#region onSignupPage
// window.history.pushState({}, '', '/signup');
//#endregion
//#region render
// render(<App />);
//#endregion
//#region grabId
// const page = screen.queryByTestId('home-page');
//#endregion
//#region pageNotPresent
// expect(page).not.toBeInTheDocument();
//#endregion
// });
//#endregion
//#endregion
//#endregion
//#region navLinkToPage
//#region eachRouting
//#endregion
//#region test
// it('has link to homepage in nav', () => {
//#region setup()
//#endregion
//#region linkVar
// const link = screen.getByRole('link', { name: 'Home' });
//#endregion
//#region findInDoc
//#endregion
// });
//#endregion
//#endregion
//#region displayPageAfterClickingPage
//#region eachRouting
//#endregion
//#region test
// 'display sign up page after clickin sign in',
//#region setup()
// setup('/');
//#endregion
//#region linkVar
// const link = screen.getByRole('link', { name: 'Sign Up' });
//#endregion
//#region findEvent
//#endregion
//#region findInDoc
// expect(screen.getByTestId('signup-page')).toBeInTheDocument();
//#endregion
//#endregion
//#endregion
//#endregion
//#region defaultSuite
//#region renderReactLink
// test('renders learn react link', () => {
//#region render
//   render(<App />);
//#endregion
//#region linkVar
//   const linkElement = screen.getByText(/learn react/i);
//#endregion
//#region checkForInDoc
//   expect(linkElement).toBeInTheDocument();
//#endregion
// });
//#endregion
//#endregion
//#endregion
