//#region imports
import { render } from '@testing-library/react';
import Input from './Input';
//#endregion
//#region inputsSuite
//#region hasIsInvalidClass
it('has is-invalid class for input when help is set', () => {
	const { container } = render(<Input help="Error message" />);
	const input = container.querySelector('input');
	expect(input.classList).toContain('is-invalid');
});
//#endregion
//#region hasInvalidFeedbackClass
it('has invalid-feedback class for span when help is set', () => {
	const { container } = render(<Input help="Error message" />);
	const span = container.querySelector('span');
	expect(span.classList).toContain('invalid-feedback');
});
//#endregion
//#region !hasIsInvalidClass
it('does not have is-invalid class for input when help is not set', () => {
	const { container } = render(<Input />);
	const input = container.querySelector('span');
	expect(input.classList).not.toContain('is-invalid');
});
//#endregion
//#endregion

// -- old --
//#region prevIterations

//#endregion
