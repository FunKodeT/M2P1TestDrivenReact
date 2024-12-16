//#region
import { withTranslation } from 'react-il8next'
//#endregion

//#region
render(){
	const { t } = this.props
	let disabled = true
	const { password, passwordRepeated, apiProgress, signUpSuccess, errors } = this.state
	if(password && passwordRepeated){ disabled = password !== passwordRepeated }
	let passwordMismatch = password !== passwordRepeated ? 'Password mismatch' : ''
	//#region
	return(
		<div className='col-lg-6 offset-lg-3 col-md-8 offset-md-2'>
			{!signUpSuccess && (
				<form className='card mt-5' data-testid='form-sign-up'>
					<div className='card-header'>
						<h1 className='text-center'>
							{ t('signUp') }
						</h1>
					</div>
					<div className='card-body'>
						
						<Input id='username' label={ t('username') } onChange={ this.onChange } help={ errors.username } />
						// <Input id='username' label='Username' onChange={this.onChange} help={errors.username} />
						
						<Input id='email' label={ t('email') } onChange={ this.onChange } help={ errors.email } />
						// <Input id='email' label='Email' onChange={this.onChange} help={errors.email} />
						
						<Input id='password' label={ t('password') } onChange={ this.onChange } help={ errors.password } />
						// <Input id='password' label='Password' onChange={this.onChange} help={errors.password} />
						
						<Input id='passwordRepeated' label={ t('passwordRepeated') } onChange={ this.onChange } help={ errors.passwordRepeated } />
						// <Input id='passwordRepeated' label='Password Repeated' onChange={this.onChange} help={errors.passwordRepeated} />
						
						<div className='text-center'>
							<button className='btn btn-primary' disabled={ disabled || apiProgress } onClick={ this.submit }>
								{ apiProgress && (
									<span className='spinner-border spinner-border-sm' role='status'></span>
								)}
								
								{ t('signUp') }
								// Sign Up
								
							</button>
						</div>
					</div>
				</form>
		</div>
	//#endregion
}
//#endregion

//#region
const SignUpPageWithTranslation = withTranslation()(SignUpPage)
//#endregion

//#region

export default SignUpPageWithTranslation
// export default SignUpPage

//#endregion