//#region imports
import SignUpPage from './SignUpPage';
import {
	render,
	screen,
	waitFor,
	act,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import i18n from '../locale/il8n';
import en from '../locale/en.json';
import tr from '../locale/tr.json';
import LanguageSelector from '../components/LanguageSelector';
//#endregion
//#region globals
//#region variables
let requestBody;
let counter = 0;
let acceptLanguageHeader;
//#endregion
//#region serverMockup
const server = setupServer(
	rest.post('/api/1.0/users', (req, res, ctx) => {
		requestBody = req.body;
		counter += 1;
		acceptLanguageHeader = req.headers.get('Accept-Language');
		return res(ctx.status(200));
	})
);
//#endregion
//#region beforeAfter()
beforeEach(() => {
	counter = 0;
	server.resetHandlers();
});
beforeAll(() => server.listen());
afterAll(() => server.close());
//#endregion
//#endregion

//#region main
describe('Sign Up Page', () => {
	//#region layoutSuite
	describe('Layout', () => {
		//#region hasHeader
		it('has header', () => {
			render(<SignUpPage />);
			const header = screen.queryByRole('heading', { name: 'Sign Up' });
			expect(header).toBeInTheDocument();
		});
		//#endregion
		//#region hasUsernameInput
		it('has username input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('Username');
			expect(input).toBeInTheDocument();
		});
		//#endregion
		//#region hasEmailInput
		it('has email input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('Email');
			expect(input).toBeInTheDocument();
		});
		//#endregion
		//#region hasPasswordInput
		it('has password input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('Password');
			expect(input).toBeInTheDocument();
		});
		//#endregion
		//#region hasPasswordTypeInput
		it('has password type for password input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('Password');
			expect(input.type).toBe('password');
		});
		//#endregion
		//#region hasPasswordRepeatedInput
		it('has password repeated input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('Password Repeated');
			expect(input).toBeInTheDocument();
		});
		//#endregion
		//#region hasPasswordTypeRepeatedInput
		it('has password type for password repeated input', () => {
			render(<SignUpPage />);
			const input = screen.getByLabelText('Password Repeated');
			expect(input.type).toBe('password');
		});
		//#endregion
		//#region hasSignUpButton
		it('has sign up button', () => {
			render(<SignUpPage />);
			const button = screen.queryByRole('button', { name: 'Sign Up' });
			expect(button).toBeInTheDocument();
		});
		//#endregion
		//#region signUpButtonDisabledInitially
		it('disables button initially', () => {
			render(<SignUpPage />);
			const button = screen.queryByRole('button', { name: 'Sign Up' });
			expect(button).toBeDisabled();
		});
		//#endregion
	});
	//#endregion
	//#region interactionsSuite
	describe('Interactions', () => {
		//#region globals
		//#region formData
		let button,
			usernameInput,
			emailInput,
			passwordInput,
			passwordRepeatedInput;
		const setup = () => {
			render(<SignUpPage />);
			usernameInput = screen.getByLabelText('Username');
			emailInput = screen.getByLabelText('Email');
			passwordInput = screen.getByLabelText('Password');
			passwordRepeatedInput = screen.getByLabelText('Password Repeated');
			userEvent.type(usernameInput, 'user1');
			userEvent.type(emailInput, 'user1@mail.com');
			userEvent.type(passwordInput, 'P4ssword');
			userEvent.type(passwordRepeatedInput, 'P4ssword');
			button = screen.queryByRole('button', { name: 'Sign Up' });
		};
		//#endregion
		//#endregion
		//#region enablesButtonWhenPasswordIsAlsoRepeated
		it('enables button when password and repeated have same value', () => {
			setup();
			expect(button).toBeEnabled();
		});
		//#endregion
		//#region sendFormDataAfterButton
		it('sends username, email, and password to backend after button', async () => {
			setup();
			userEvent.click(button);

			await screen.findByText(
				'Please check your email to activate account'
			);

			expect(requestBody).toEqual({
				username: 'user1',
				email: 'user1@mail.com',
				password: 'P4ssword',
			});
		});
		//#endregion
		//#region disableButtonAPICall
		it('disables button when ongoing API call', async () => {
			setup();
			userEvent.click(button);
			userEvent.click(button);

			await screen.findByText(
				'Please check your email to activate account'
			);

			expect(counter).toBe(1);
		});
		//#endregion
		//#region displaySpinnerAPICall
		it('display spinner after click submit', async () => {
			setup();

			expect(screen.queryByRole('status')).not.toBeInTheDocument();
			userEvent.click(button);

			const spinner = screen.getByRole('status');
			expect(spinner).toBeInTheDocument();
			await screen.findByText(
				'Please check your email to activate account'
			);
		});
		//#endregion
		//#region displayActivateNotificationAfterAPICall
		it('displays account activate notification after successful API call', async () => {
			setup();

			const alertMessage = 'Please check your email to activate account';
			expect(screen.queryByText(alertMessage)).not.toBeInTheDocument();

			userEvent.click(button);
			const text = await screen.findByText(alertMessage);
			expect(text).toBeInTheDocument();
		});
		//#endregion
		//#region hideFormAfterAPICall
		it('hides signup form after successful singup API call', async () => {
			setup();
			const form = screen.getByTestId('form-signup');
			userEvent.click(button);
			await waitFor(() => {
				expect(form).not.toBeInTheDocument();
			});
		});
		//#endregion
		//#region functions
		//#region generateVaidationError()
		const generateValidationError = (field, message) => {
			return rest.post('/api/1.0/users', (req, res, ctx) => {
				return res(
					ctx.status(400),
					ctx.json({
						validationErrors: { [field]: message },
					})
				);
			});
		};
		//#endregion
		//#endregion
		//#region displayValidationMsg
		it.each`
			field         | message
			${'username'} | ${'Username cannot be null'}
			${'email'}    | ${'Email cannot be null'}
			${'password'} | ${'Password must be atleast 6 characters'}
		`('displays $message $field', async ({ field, message }) => {
			server.use(generateValidationError(field, message));

			setup();
			userEvent.click(button);
			const validationError = await screen.findByText(message);
			expect(validationError).toBeInTheDocument();
		});
		//#endregion
		//#region hiddenSpinnerEnabledBtnAfterResponse
		it('spinner hidden and button enabled after response', async () => {
			server.use(
				generateValidationError('username', 'Username cannot be null')
			);

			setup();
			userEvent.click(button);

			await screen.findByText('Username cannot be null');

			expect(screen.queryByRole('status')).not.toBeInTheDocument();
			expect(button).toBeEnabled();
		});
		//#endregion
		//#region displayMismatchMsgPasswordRepeated
		it('displays mismatch message for password repeated input', () => {
			setup();
			userEvent.type(passwordInput, 'P4ssword');
			userEvent.type(passwordRepeatedInput, 'NotP4ssword');
			const validationError = screen.queryByText('Password mismatch');
			expect(validationError).toBeInTheDocument();
		});
		//#endregion
		//#region clearErrorAfterFieldInput
		it.each`
			field         | message                      | label
			${'username'} | ${'Username cannot be null'} | ${'Username'}
			${'email'}    | ${'Email cannot be null'}    | ${'Email'}
			${'password'} | ${'Password cannot be null'} | ${'Password'}
		`(
			'clears validation error after $field is updated',
			async ({ field, message, label }) => {
				server.use(generateValidationError(field, message));

				setup();
				userEvent.click(button);

				const validationError = await screen.findByText(message);

				userEvent.type(screen.getByLabelText(label), 'updated');

				expect(validationError).not.toBeInTheDocument();
			}
		);
		//#endregion
	});
	//#endregion
	//#region internationalizationSuite
	describe('Internationalization', () => {
		//#region globals
		//#region variables
		let turkishToggle, englishToggle, passwordInput, passwordRepeatedInput;
		//#endregion
		//#region setup()
		const setup = () => {
			//#region render
			render(
				<>
					<SignUpPage />
					<LanguageSelector />
				</>
			);
			//#endregion
			//#region engToTurkToggle
			turkishToggle = screen.getByTitle('Turkce');
			//#endregion
			//#region turkToEngToggle
			englishToggle = screen.getByTitle('English');
			//#endregion
			//#region passwordData
			passwordInput = screen.getByLabelText('Password');
			passwordRepeatedInput = screen.getByLabelText('Password Repeat');
			//#endregion
		};
		//#endregion
		//#region beforeAfter()
		afterEach(() => {
			act(() => {
				i18n.changeLanguage('en');
			});
		});
		//#endregion
		//#endregion
		//#region englishTranslation
		it('initially displays all text in english', () => {
			//#region render
			setup();
			//#endregion
			//#region heading
			expect(
				screen.getByRole('heading', { name: en.signUp })
			).toBeInTheDocument();
			expect(
				screen.getByRole('button', { name: en.signUp })
			).toBeInTheDocument();
			//#endregion
			//#region labels
			expect(screen.getByLabelText(en.username)).toBeInTheDocument();
			expect(screen.getByLabelText(en.email)).toBeInTheDocument();
			expect(screen.getByLabelText(en.password)).toBeInTheDocument();
			expect(
				screen.getByLabelText(en.passwordRepeated)
			).toBeInTheDocument();
			//#endregion
		});
		//#endregion
		//#region turkishToggle
		it('displays all text in turkish after changing language', () => {
			//#region render
			setup();
			//#endregion
			//#region engToTurkToggle
			userEvent.click(turkishToggle);
			//#endregion
			//#region heading
			expect(
				screen.getByRole('heading', { name: tr.signUp })
			).toBeInTheDocument();
			expect(
				screen.getByRole('button', { name: tr.signUp })
			).toBeInTheDocument();
			//#endregion
			//#region labels
			expect(screen.getByLabelText(tr.username)).toBeInTheDocument();
			expect(screen.getByLabelText(tr.email)).toBeInTheDocument();
			expect(screen.getByLabelText(tr.password)).toBeInTheDocument();
			expect(
				screen.getByLabelText(tr.passwordRepeated)
			).toBeInTheDocument();
			//#endregion
		});
		//#endregion
		//#region englishToggle
		it('displays all text in english after changing language from turkish', () => {
			//#region render
			setup();
			//#endregion
			//#region engToTurkToggle
			userEvent.click(turkishToggle);
			//#endregion
			//#region turkToEngToggle
			userEvent.click(englishToggle);
			//#endregion
			//#region heading
			expect(
				screen.getByRole('heading', { name: en.signUp })
			).toBeInTheDocument();
			expect(
				screen.getByRole('button', { name: en.signUp })
			).toBeInTheDocument();
			//#endregion
			//#region labels
			expect(screen.getByLabelText(en.username)).toBeInTheDocument();
			expect(screen.getByLabelText(en.email)).toBeInTheDocument();
			expect(screen.getByLabelText(en.password)).toBeInTheDocument();
			expect(
				screen.getByLabelText(en.passwordRepeated)
			).toBeInTheDocument();
			//#endregion
		});
		//#endregion
		//#region passwordMismatchTurkish
		it('displays password mismatch in turkish', () => {
			//#region render
			setup();
			//#endregion
			//#region turkishToggle
			userEvent.click(turkishToggle);
			//#endregion
			//#region heading
			expect(
				screen.getByRole('heading', { name: tr.signUp })
			).toBeInTheDocument();
			expect(
				screen.getByRole('button', { name: tr.signUp })
			).toBeInTheDocument();
			//#endregion
			//#region passwordInput
			userEvent.type(passwordInput, 'P4ss');
			//#endregion
			//#region validation
			const validationMsgInTurkish = screen.queryByText(
				tr.passwordMismatchValidation
			);
			expect(validationMsgInTurkish).toBeInTheDocument();
			//#endregion
		});
		//#endregion
		//#region acceptLanguageHeaderEngReq
		it('send accept language header as en for outgoing req', async () => {
			//#region setup
			setup();
			//#endregion
			//#region passwordInput
			userEvent.type(passwordInput, 'P4ssword');
			userEvent.type(passwordRepeatedInput, 'P4ssword');
			//#endregion
			//#region variables
			const button = screen.getByRole('button', { name: en.signUp });
			const form = screen.queryByTestId('form-sign-up');
			//#endregion
			//#region waitForLanguageSwap
			userEvent.click(button);
			await waitForElementToBeRemoved(form);
			expect(acceptLanguageHeader).toBe('en');
			//#endregion
		});
		//#endregion
		//#region acceptLanguageHeaderTurkReq
		it('send accept language header as tr for outgoing req after language swap', async () => {
			//#region setup
			setup();
			//#endregion
			//#region passwordInput
			userEvent.type(passwordInput, 'P4ssword');
			userEvent.type(passwordRepeatedInput, 'P4ssword');
			//#endregion
			//#region engToTurkToggle
			const button = screen.getByRole('button', { name: en.signUp });
			userEvent.click(turkishToggle);
			const form = screen.queryByTestId('form-sign-up');
			//#endregion
			//#region waitForLanguageToggle
			userEvent.click(button);
			await waitForElementToBeRemoved(form);
			expect(acceptLanguageHeader).toBe('tr');
			//#endregion
		});
		//#endregion
	});
	//#endregion
});
//#endregion

// -- old --
//#region prevIterations
//#region imports
//#region axios
/* import axios from 'axios'; */
//#endregion
//#region i18n
// import '../locale/i18n';
//#endregion
//#endregion
//#region layoutSuite
//#region hasUsernameInput
/* const input = screen.getByPlaceholderText('username'); */
//#endregion
//#region hasEmailInput
// const input = screen.getAllByPlaceholderText('email');
//#endregion
//#region sendFormDataAfterButton
//#region reqVar
// let requestBody;
//#endregion
//#region serverMockup
// const server = setupServer(
// 	rest.post('/api/1.0/users', (req, res, ctx) => {
// 		requestBody = req.body;
// 		return res(ctx.status(200));
// 	})
// );
//#region mockFn()
/* const mockFn = jest.fn(); */
/* window.fetch = mockFn; */
/* axios.post = mockFn; */
//#endregion
//#region awaitMockFn()Resolution
// await new Promise((resolve) => setTimeout(resolve, 500));
/* const firstCallOfMockFn = mockFn.mock.calls[0]; */
/* const body = JSON.parse(firstCallOfMockFn[1].body); */
//#endregion
//#endregion
//#endregion
//#region disableButtonAPICall
//#region counterVar
// let counter;
//#endregion
//#region serverMockup
// const server = setupServer(
// 	rest.post('/api/1.0/users', (req, res, ctx) => {
// 		counter += 1;
// 		return res(ctx.status(200));
// 	})
// );
// server.listen();
//#endregion
//#region awaitResolution
// await new Promise((resolve) => setTimeout(resolve, 500));
//#endregion
//#endregion
//#region displaySpinnerAPICall
//#region serverMockup
// const server = setupServer(
// 	rest.post('/api/1.0/users', (req, res, ctx) => {
// 		return res(ctx.status(200));
// 	})
// );
// server.listen();
//#endregion
//#region hideSpinner
// const spinner = screen.getByRole('status', { hidden: true });
//#endregion
//#endregion
//#region displayActivateNotificationAfterAPICall
//#region serverMockup
// const server = setupServer(
// 	rest.post('/api/1.0/users', (req, res, ctx) => {
// 		return res(ctx.status(200));
// 	})
// );
// server.listen();
//#endregion
//#endregion
//#region hideFormAfterAPICall
//#region serverMockup
// const server = setupServer(
// 	rest.post('/api/1.0/users', (req, res, ctx) => {
// 		return res(ctx.status(200));
// 	})
// );
// server.listen();
//#endregion
//#region awaitHiddenForm
// await waitForElementToBeRemoved(form);
//#endregion
//#endregion
//#endregion
//#region interactionsSuite
//#region globals
//#region variables
// let requestBody;
// let counter = 0;
//#endregion
//#region serverMockup
// const server = setupServer(
// 	rest.post('/api/1.0/users', (req, res, ctx) => {
// 		requestBody = req.body;
// 		counter += 1;
// 		return res(ctx.status(200));
// 	})
// );
//#endregion
//#region beforeAfter()
// beforeEach(() => {
// 	counter = 0;
// 	server.resetHandlers();
// });
// beforeAll(() => server.listen());
// afterAll(() => server.close());
//#endregion
//#endregion
//#region dontDisplaySpinnerAPICall
// you can skip a test via 'xit' or focus on one test via 'fit'
// it('doesnt display spinner when no API call', () => {
// 	setup();
// 	// const spinner = screen.queryByRole('status');
// 	// expect(spinner).not.toBeInTheDocument();
// });
//#endregion
//#region displayValidationMsg
//#region serverMockup
// server.use(
// 	rest.post('/api/1.0/users', (req, res, ctx) => {
// 		return res(
// 			ctx.status(400),
// 			ctx.json({
// 				validationErrors: {
// 					[field]: message,
// 				},
// 			})
// 		);
// 	})
// );
//#endregion
//#endregion
//#region displayValidationMsgUsername
// it('display validation msg for username', async () => {
// 	//#region serverMockup
// 	server.use(
// 		rest.post('/api/1.0/users', (req, res, ctx) => {
// 			return res(
// 				ctx.status(400),
// 				ctx.json({
// 					validationErrors: {
// 						username: 'Username cannot be null',
// 					},
// 				})
// 			);
// 		})
// 	);
// 	//#endregion
// 	setup();
// 	userEvent.click(button);
// 	const validationError = await screen.findByText(
// 		'Username cannot be null'
// 	);
// 	expect(validationError).toBeInTheDocument();
// });
//#endregion
//#region displayValidationMsgEmail
// it('display validation msg for email', async () => {
// 	//#region serverMockup
// 	server.use(
// 		rest.post('/api/1.0/users', (req, res, ctx) => {
// 			return res(
// 				ctx.status(400),
// 				ctx.json({
// 					validationErrors: {
// 						email: 'Email cannot be null',
// 					},
// 				})
// 			);
// 		})
// 	);
// 	//#endregion
// 	setup();
// 	userEvent.click(button);
// 	const validationError = await screen.findByText(
// 		'Email cannot be null'
// 	);
// 	expect(validationError).toBeInTheDocument();
// });
//#endregion
//#region hiddenSpinnerEnabledBtnAfterResponse
//#region serverMockup
// server.use(
// 	rest.post('/api/1.0/users', (req, res, ctx) => {
// 		return res.once(
// 			ctx.status(400),
// 			ctx.json({
// 				validationErrors: {
// 					username: 'Username cannot be null',
// 				},
// 			})
// 		);
// 	})
// );
//#endregion
//#endregion
//#region clearErrorAfterUsernameInput
// it('clears validation error after username field is updated', async () => {
// 	server.use(
// 		generateValidationError('username', 'Username cannot be null')
// 	);
// 	setup();
// 	userEvent.click(button);
// 	const validationError = await screen.findByText(
// 		'Username cannot be null'
// 	);
// 	userEvent.type(usernameInput, 'user1-updated');
// 	expect(validationError).not.toBeInTheDocument();
// });
//#endregion
//#endregion
//#region internationalizationSuite
//#region globals
//#region variables
//#endregion
//#region setup()
//#region render
//#endregion
//#region engToTurkToggle
//#region passwordInput
// passwordInput = screen.getByLabelText(tr.password);
//#endregion
//#endregion
//#region turkToEngToggle
//#region passwordInput
// passwordInput = screen.getByLabelText(en.password);
//#endregion
//#endregion
//#endregion
//#region beforeAfter()
//#endregion
//#endregion
//#region englishTranslation
//#region render
// render(<SignUpPage />);
//#endregion
//#region heading
// expect(
// 	screen.getByRole('heading', { name: 'Sign Up' })
// ).toBeInTheDocument();
// expect(
// 	screen.getByRole('button', { name: 'Sign Up' })
// ).toBeInTheDocument();
//#endregion
//#region labels
// expect(screen.getByLabelText('Username')).toBeInTheDocument();
// expect(screen.getByLabelText('Email')).toBeInTheDocument();
// expect(screen.getByLabelText('Password')).toBeInTheDocument();
// expect(
// 	screen.getByLabelText('Password Repeated')
// ).toBeInTheDocument();
//#endregion
//#endregion
//#region turkishToggle
//#region render
// render(
// 	<>
// 		<SignUpPage />
// 		<LanguageSelector />
// 	</>
// );

// render( <SignUpPage /> );
//#endregion
//#region engToTurkToggle
// const turkishToggle = screen.getByTitle('Turkce');
//#endregion
//#endregion
//#region englishToggle
//#region render
// render(
// 	<>
// 		<SignUpPage />
// 		<LanguageSelector />
// 	</>
// );

// render( <SignUpPage /> );
//#endregion
//#region engToTurkToggle
// const turkishToggle = screen.getByTitle('Turkce');
// userEvent.click(turkishToggle);
//#endregion
//#region turkToEngToggle
// const englishToggle = screen.getByTitle('English');
// userEvent.click(englishToggle);
//#endregion
//#endregion
//#region passwordMismatchTurkish
//#region render
//#endregion
//#region turkishToggle
// const turkishToggle = screen.getByTitle('Turkce');
//#endregion
//#region heading
//#endregion
//#region passwordInput
// const passwordInput = expect(
// 	screen.getByLabelText(tr.password)
// ).toBeInTheDocument();
//#endregion
//#region validation
//#endregion
//#endregion
//#region acceptLanguageHeaderEngReq
//#region setup()
//#endregion
//#endregion
//#endregion
//#endregion
