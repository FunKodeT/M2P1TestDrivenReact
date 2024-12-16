//#region imports
import Component from 'react';
import Input from '../components/Input';
import { withTranslation } from 'react-i18next';
import { signUp } from '../api/apiCalls';
//#endregion
//#region main
class SignUpPage extends Component {
	//#region states
	state = {
		username: '',
		email: '',
		password: '',
		passwordRepeated: '',
		apiProgress: false,
		signUpSuccess: false,
		errors: {},
		counter: 0,
	};
	//#endregion
	//#region globals
	interval;
	//#endregion
	//#region functions
	//#region componentDidMount()
	componentDidMount() {
		console.log('mounted');
		this.interval = setInterval(() => {
			console.log('increasing counter');
			this.setState((previousState) => {
				return {
					counter: previousState + 1,
				};
			});
		}, 1000);
	}
	//#endregion
	//#region componentDidUpdate()
	componentDidUpdate(previousProps, previousState) {
		console.log('update', previousProps, this.props);
	}
	//#endregion
	//#region onChangeFunction()
	onChange = (e) => {
		//#region getErrors
		const { id, value } = e.target;
		//#endregion
		//#region copyErrors
		const errorsCopy = { ...this.state.errors };
		delete errorsCopy[id];
		//#endregion
		//#region setErrorState
		this.setState({
			[id]: value,
			errors: errorsCopy,
		});
		//#endregion
	};
	//#endregion
	//#region submitObject
	submit = async (e) => {
		e.preventDefault();
		//#region variables
		const { username, email, password } = this.state;
		const body = {
			username,
			email,
			password,
		};
		//#endregion
		//#region submissionState
		this.setState({ apiProgress: true });
		//#region axios
		try {
			await signUp(body);
			this.setState({ signUpSuccess: true });
		} catch (err) {
			if (err.response.status === 400) {
				this.setState({ errors: err.response.data.validationErrors });
			}
		}
		//#endregion
		this.setState({ apiProgress: false });
		//#endregion
	};
	//#endregion
	//#endregion
	//#region render
	render() {
		//#region globals
		//#region props
		const { t } = this.props;
		//#endregion
		//#region disabledBool
		let disabled = true;
		//#endregion
		//#region states
		const {
			password,
			passwordRepeated,
			apiProgress,
			signUpSuccess,
			errors,
		} = this.state;
		//#endregion
		//#region checkMatching
		if (password && passwordRepeated) {
			disabled = password !== passwordRepeated;
		}
		//#region passwordMismatch
		let passwordMismatch =
			password !== passwordRepeated
				? t('passwordMismatchValidation')
				: '';
		//#endregion
		//#endregion
		//#endregion
		//#region HTML
		return (
			<div
				className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
				data-testid="signup-page">
				{!signUpSuccess && (
					<form className="card mt-5" data-testid="form-sign-up">
						<div className="card-header">
							<h1 className="text-center">{t('signUp')}</h1>
						</div>
						<div className="card-body">
							<Input
								id="username"
								label={t('username')}
								onChange={this.onChange}
								help={errors.username}
							/>
							<Input
								id="email"
								label={t('email')}
								onChange={this.onChange}
								help={errors.email}
							/>
							<Input
								id="password"
								label={t('password')}
								onChange={this.onChange}
								help={errors.password}
								type="password"
							/>
							<Input
								id="passwordRepeated"
								label={t('passwordRepeated')}
								onChange={this.onChange}
								help={passwordMismatch}
								type="password"
							/>
						</div>
						<div className="text-center">
							<button
								className="btn btn-primary"
								disabled={disabled || apiProgress}
								onClick={this.submit}>
								{apiProgress && (
									<span
										className="spinner-border spinner-border-sm"
										role="status"></span>
								)}
								{t('signUp')}
							</button>
						</div>
					</form>
				)}
				{signUpSuccess && (
					<div className="alert alert-success mt-3">
						Please check your email to activate your account
					</div>
				)}
			</div>
		);
		//#endregion
	}
	//#endregion
}
//#endregion

//#region exports
const SignUpPageWithTranslation = withTranslation()(SignUpPage);

export default SignUpPageWithTranslation;
//#endregion

// -- old --
//#region prevIterations
//#region imports
// import axios from 'axios';
// import LanguageSelector from '../components/LanguageSelector';
//#endregion
//#region main
// const SignUpPage = () => {
// 	return <h1>Sign Up</h1>;
// };
//#region states
//#region {error}Versions
// errors: {
// 	username: '',
// 	email: '',
// 	password: '',
// 	anotherObject: {
// 		anotherField: '',
// 	},
// },
//#endregion
//#endregion
//#region globals
//#endregion
//#region functions
//#region componentDidMount()
// setInterval(() => {
//#endregion
//#region componentDidUpdate()
// this.props.random > previousProps.random
// console.log('update');
//#endregion
//#region componentWillMount()
// componentWillMount() {
// 	console.log('unmount');
// 	clearInterval(this.interval)
// }
//#endregion
//#region onChangeFunction()
//#region getErrors
// const errors = this.state.errors;
//#endregion
//#region copyErrors
// delete errors[id];
// const errorsCopy = JSON.parse(JSON.stringify{ ...this.state.errors });
//#endregion
//#endregion
//#region onChangeUsername()
/* 	onChangeUsername = (event) => {
		const currentValue = event.target.value;
		this.setState({
			username: currentValue,
		});
	}; */
//#endregion
//#region onChangeEmail()
/* 	onChangeEmail = (event) => {
		const currentValue = event.target.value;
		this.setState({
			email: currentValue,
		});
	}; */
//#endregion
//#region onChangePassword()
/* 	onChangePassword = (event) => {
		const currentValue = event.target.value;
		this.setState({
			password: currentValue,
		});
	}; */
//#endregion
//#region onChangePasswordRepeated()
/* 	onChangePasswordRepeated = (event) => {
		const currentValue = event.target.value;
		this.setState({
			passwordRepeated: currentValue,
		});
	}; */
//#endregion
//#region submitObject
//#region variables
//#endregion
//#region submissionState
//#region axios
// await axios.post('/api/1.0/users', body);
//#endregion
//#endregion
//#region defJS
// fetch('/api/1.0/users', {
// 	method: 'POST',
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
// 	body: JSON.stringify(body),
// });
//#endregion
//#region axios
// await axios.post('/api/1.0/users', body, {
// 	headers: {
// 		'Accept-Language': this.props.i18n.language,
// 	},
// });

// axios.post('http://localhost:8080/api/1.0/users', body);

// axios.post('/api/1.0/users', body).then(() => {
// 	this.setState({ signUpSuccess: true });
// });
//#endregion
//#endregion
//#region onClickTurkish
// onClickTurkish = () => {
// 	this.props.i18n.changeLanguage('tr');
// };
//#endregion
//#endregion
//#region render
//#region globals
//#region props
//#endregion
//#region disabledBool
// let disabled = false;

// setTimeout(() => {
// 	console.log('updating disabled');
// 	this.setState({ disabled: false });
// }, 1000);
//#endregion
//#region states
//#endregion
//#region checkMatching
//#region passwordMismatch
// let passwordMismatch =
// 	password !== passwordRepeated ? 'Password mismatch' : '';
//#endregion
//#endregion
//#endregion
//#region HTML
//#region header
// {/* <h1 className="text-center">Sign Up</h1> */}
//#endregion
//#region username
// {/* <Input
// 	id="username"
// 	label="Username"
// 	onChange={this.onChange}
// 	help={errors.username}
// /> */}

// {/* <div className="mb-3">
// 	<label htmlFor="username" className="form-label">
// 		Username
// 	</label>
// 	<input
// 		id="username"
// 		className="form-control"
// 		onChange={this.onChange}
// 	/>
// 	<span>{errors.username}</span>
// </div> */}
// {/* <input placeholder='Username'/> */}
//#endregion
//#region email
// {/* <Input
// 	id="email"
// 	label="Email"
// 	onChange={this.onChange}
// 	help={errors.email}
// /> */}

// {/* <div className="mb-3">
// 	<label htmlFor="email" className="form-label">
// 		Email
// 	</label>
// 	<input
// 		id="email"
// 		className="form-control"
// 		onChange={this.onChange}
// 	/>
// </div> */}
// {/* <input placeholder='Email'/> */}
//#endregion
//#region password
// {/* <Input
// 	id="password"
// 	label="Password"
// 	onChange={this.onChange}
// 	help={errors.password}
// 	type="password"
// /> */}

// {/* <div className="mb-3">
// 	<label
// 		htmlFor="password"
// 		className="form-label">
// 		Password
// 	</label>
// 	<input
// 		id="password"
// 		type="password"
// 		className="form-control"
// 		onChange={this.onChange}
// 	/>
// </div> */}
//#endregion
//#region passwordRepeated
// {/* <Input
// 	id="passwordRepeated"
// 	label="Password Repeated"
// 	onChange={this.onChange}
// 	help={passwordMismatch}
// 	type="password"
// /> */}

// {/* <div className="mb-3">
// 	<label
// 		htmlFor="passwordRepeated"
// 		className="form-label">
// 		Password
// 	</label>
// 	<input
// 		id="passwordRepeated"
// 		type="password"
// 		className="form-control"
// 		onChange={this.onChange}
// 	/>
// </div> */}
//#endregion
//#region button
//#region state
// disabled={this.state.disabled}
//#endregion
//#region className
// {/* Sign Up */}

// {/* <span
// 	className="spinner-border spinner-border-sm"
// 	role="status"
// 	aria-hidden="true"></span>; */}
//#endregion
//#endregion
//#region transBtn
// {/* <LanguageSelector /> */}
//#endregion
//#region turkishBtn
// {/* <img
// 	src="https://www.countryflags.io/tr/flat/24.png"
// 	title="Turkce"
// 	onClick={() => this.props.i18n.changeLanguage('tr')}
// 	alt="turkey"
// /> */}

// {/* <span
// 	title="Turkce"
// 	onClick={() => this.props.i18n.changeLanguage('tr')}>
// 	TR
// </span> */}

// {/* <span title='Turkce' onClick={this.onClickTurkish}>TR</span> */}
//#endregion
//#region englishBtn
// {/* <img
// 	src="https://www.countryflags.io/us/flat/24.png"
// 	title="English"
// 	onClick={() => this.props.i18n.changeLanguage('en')}
// 	alt="english"
// /> */}

// {/* <span
// 	title="English"
// 	onClick={() => this.props.i18n.changeLanguage('en')}>
// 	TR
// </span> */}
//#endregion
//#endregion
//#endregion
//#endregion
//#region exports
// export default SignUpPage;
//#endregion
//#endregion
