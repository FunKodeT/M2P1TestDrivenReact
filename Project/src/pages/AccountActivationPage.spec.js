// #region imports
//#region testingReact
import { render, screen } from '@testing-library/react';
//#endregion
//#region activationPage
import AccountActivationPage from './AccountActivationPage';
//#endregion
//#region msw
import { setupServer } from 'msw/node';
import { rest } from 'msw';
//#endregion
//#endregion
//#region globals
//#region variables
//#region counter
let counter = 0;
//#endregion
//#endregion
//#region serverMockup
const server = setupServer(
	rest.post('/api/1.0/users/token/:token', (req, res, ctx) => {
		//#region increaseCount
		counter += 1;
		//#endregion
		//#region returnFail
		if (req.params.token === '5678') {
			return res(ctx.status(400));
		}
		//#endregion
		//#region returnSuccess
		return res(ctx.status(200));
		//#endregion
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

//#region pageSuite
describe('Account Activation Page', () => {
	//#region globals
	//#region functions
	//#region setup()
	const setup = (token) => {
		//#region tokenToCompare
		const match = { params: { token } };
		//#endregion
		//#region renderPage
		render(<AccountActivationPage match={match} />);
		//#endregion
	};
	//#endregion
	//#endregion
	//#endregion
	//#region displaySuccessMsg
	it('display success msg when token is correct', async () => {
		//#region setup()
		setup('1234');
		//#endregion
		//#region successMsg
		const msg = await screen.findByText('Account is activated');
		//#endregion
		//#region findInDoc
		expect(msg).toBeInTheDocument();
		//#endregion
	});
	//#endregion
	//#region sendReqBack
	it('sends activation req to backend', async () => {
		//#region setup()
		setup('1234');
		//#endregion
		//#region findTrigger
		await screen.findByText('Account is activated');
		//#endregion
		//#region verifyCount
		expect(counter).toBe(1);
		//#endregion
	});
	//#endregion
	//#region displayFailureMsg
	it('display failure msg when invalid token', async () => {
		//#region setup()
		setup('5678');
		//#endregion
		//#region failureMsg
		const msg = await screen.findByText('Activation failure');
		//#endregion
		//#region findInDoc
		expect(msg).toBeInTheDocument();
		//#endregion
	});
	//#endregion
	//#region sendReqAfterTokenChange
	it('sends activation request after token is changed', async () => {
		//#region match
		const match = { params: { token: '1234' } };
		//#endregion
		//#region render
		//#region renderOnSuccess
		const { rerender } = render(<AccountActivationPage match={match} />);
		await screen.findByText('Account is activated');
		match.params.token = '5678';
		//#endregion
		//#region renderOnFail
		rerender(<AccountActivationPage match={match} />);
		await screen.findByText('Activation failure');
		//#endregion
		//#endregion
		//#region verifyCount
		expect(counter).toBe(2);
		//#endregion
	});
	//#endregion
	//#region displaySpinnerDuringCall
	it('display spinner during activation api call', async () => {
		//#region setup()
		setup('5678');
		//#endregion
		//#region spinnerPresent
		const spinner = screen.queryByRole('status');
		expect(spinner).toBeInTheDocument();
		//#endregion
		//#region spinnerHidden
		await screen.findByText('Activation failure');
		expect(spinner).not.toBeInTheDocument();
		//#endregion
	});
	//#endregion
	//#region sendReqAfterTokenChange
	it('displays spinner after second api call with changed token', async () => {
		//#region match
		const match = { params: { token: '1234' } };
		//#endregion
		//#region render
		//#region renderOnSuccess
		const { rerender } = render(<AccountActivationPage match={match} />);
		await screen.findByText('Account is activated');
		match.params.token = '5678';
		//#endregion
		//#region renderOnFail
		rerender(<AccountActivationPage match={match} />);
		//#endregion
		//#endregion
		//#region spinnerPresent
		const spinner = screen.queryByRole('status');
		expect(spinner).toBeInTheDocument();
		//#endregion
		//#region spinnerHidden
		await screen.findByText('Activation failure');
		expect(spinner).not.toBeInTheDocument();
		//#endregion
	});
	//#endregion
});
//#endregion

// -- old --
// #region prevIterations
//#region imports
//#endregion
//#region globals
//#region variables
//#endregion
//#region serverMockup
// rest.post('/api/1.0/users/token/1234', (req, res, ctx) => {
//#region increaseCount
// counter += 1;
//#endregion
//#endregion
//#region beforeAfter()
//#endregion
//#region functions
//#region setup()
//#endregion
//#endregion
//#endregion
//#region pageSuite
//#region displaySuccessMsg
//#region tokenToCompare
// const match = { params: { token: '1234' } };
//#endregion
//#region renderPage
// render(<AccountActivationPage match={match} />);
//#endregion
//#region successMsg
//#endregion
//#region findInDoc
//#endregion
//#endregion
//#endregion
//#endregion
