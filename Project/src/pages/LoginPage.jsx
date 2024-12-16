//#region imports
import { useState, useEffect } from 'react';
//#endregion
//#region main
const LoginPage = (props) => {
	//#region globals
	//#region useState
	const [counter, setCounter] = useState(0);
	//#endregion
	//#region functions
	//#region useEffect
	//#region intervalCounter
	useEffect(() => {
		//#region mount
		let interval = setInterval(() => {
			console.log('increasing counter');
			setCounter((previousCounter) => {
				return previousCounter + 1;
			});
		}, 1000);
		//#endregion
		//#region dismount
		return () => {
			clearInterval(interval);
		};
		//#endregion
	}, []);
	//#endregion
	//#region countLog
	useEffect(() => {
		console.log(
			'this is like component did update, but it is for specified dependency'
		);
	}, [counter]);
	//#endregion
	//#region randomCount
	useEffect(() => {
		console.log('new random: ' + props.random);
	}, [props.random]);
	//#endregion
	//#endregion
	//#endregion
	//#endregion
	//#region HTML
	return (
		<div data-testid="login-page">
			<h1>Login Page</h1>
			{counter}
		</div>
	);
	//#endregion
};
//#endregion

//#region exports
export default LoginPage;
//#endregion

// -- old --
//#region prevIterations
//#region imports
//#endregion
//#region main
// const LoginPage = () => {
//#region globals
//#region useState
//#endregion
//#region functions
//#region useEffect
//#region intervalCounter
//#region mount
// console.log('This is like component did mount');
//#endregion
//#region dismount
// console.log('this is like component will unmount');
//#endregion
//#endregion
//#region countLog
//#region mount
//#endregion
//#endregion
//#region randomCount
//#region mount
//#endregion
//#endregion
//#endregion
//#endregion
//#endregion
//#region HTML
//#endregion
//#endregion
//#region exports
//#endregion
//#endregion
