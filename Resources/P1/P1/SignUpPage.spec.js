//#region
import '../locale/il8n'
//#endregion

//#region
it.each`
field         | message                      | label
${'username'} | ${'Username cannot be null'} | ${'Username'}
${'email'} | ${'Email cannot be null'} | ${'Email'}
${'password'} | ${'Password cannot be null'} | ${'Password'}

`('clears validation error after $field is updated', async ({field, message, label}) => {
// `('clears validation error after username field is updated', async () => {
	
	server.use(generateValidationError(field, message))
	// server.use(generateValidationError('username', 'Username cannot be null'))
	
	setup()
	userEvent.click(button)
	
	const validationError = await screen.findByText(message)
	// await screen.findByText('Username cannot be null')
	// const validationError = await screen.findByText('Username cannot be null')
	
	userEvent.type(screen.getByLabelText(label), 'updated')
	
	// expect(screen.queryByText('Username cannot be null')).not.toBeInTheDocument()
	expect(validationError).not.toBeInTheDocument()
	
//#endregion