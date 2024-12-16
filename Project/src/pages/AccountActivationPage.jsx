//#region imports
//#region custom
import { activate } from '../api/apiCalls';
//#endregion
//#region react
import { useEffect, useState } from 'react';
//#endregion
//#endregion
//#region main
const AccountActivationPage = (props) => {
	//#region globals
	//#region useStates
	const [result, setResult] = useState();
	//#endregion
	//#region useEffects
	//#region setResult()
	setResult();
	//#endregion
	//#region checkToken
	useEffect(() => {
		//#region ifSuccess
		activate(props.match.params.token)
			.then(() => {
				setResult('success');
			})
			//#endregion
			//#region ifFailure
			.catch(() => {
				setResult('fail');
			});
		//#endregion
	}, [props.match.params.token]);
	//#endregion
	//#region content
	let content = <span className="spinner-border" role="status"></span>;
	//#region ifSuccess
	if (result === 'success') {
		content = (
			<div className="alert alert-success mt-3">Account is activated</div>
		);
	}
	//#endregion
	//#region ifFailure
	else if (result === 'fail') {
		content = (
			<div className="alert alert-danger mt-3">Activation failure</div>
		);
	}
	//#endregion
	//#endregion
	//#endregion
	//#region HTML
	return <div data-testid="activation-page">{content}</div>;
	//#endregion
};
//#endregion
//#endregion

//#region exports
export default AccountActivationPage;
//#endregion

// -- old --
//#region prevIterations
//#region imports
//#endregion
//#region main
// const AccountActivationPage = () => {
//#region globals
//#region useStates
//#endregion
//#region useEffects
//#region checkToken
//#region ifSuccess
// activate(props.match.params.token).then(() => {
// 	setResult('success');
// });
//#endregion
//#region ifFailure
//#endregion
// }, []);
//#endregion
//#region content
// <span className='spinner-border spinner-border' role='status'></span>
//#endregion
//#endregion
//#endregion
//#region HTML
//#region activationSuccessMsg
// {/* <div className="alert alert-success mt-3">Account is activated</div> */}

// {/* {result === 'success' && ( */}
// {/* <div className="alert alert-success mt-3"> */}
// {/* Account is activated */}
// {/* </div> */}
// {/* )} */}

// {/* <h1>Account Activation Page</h1> */}
//#endregion
//#region activationFailureMsg
// {/* {result === 'fail' && ( */}
// {/* <div className="alert alert-danger mt-3"> */}
// {/* Activation failure */}
// {/* </div> */}
// {/* )} */}
//#endregion
//#region spinner
// {/* {!result && ( */}
// {/* <span className='spinner-border spinner-border' role='status'></span> */}
// {/* )} */}

// {/* {!result && (
// <span className='spinner-border spinner-border-sm' role='status'></span>
// )} */}
//#endregion
//#endregion
//#endregion
//#region exports
//#endregion
//#endregion
