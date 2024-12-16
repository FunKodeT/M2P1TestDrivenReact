//#region functions
const Input = (props) => {
	//#region props
	const { id, label, onChange, help, type } = props;
	//#endregion
	//#region varInputField
	let inputClass = 'form-control';
	//#region validation
	if (help) {
		inputClass += ' is-invalid';
	}
	//#endregion
	//#endregion
	//#region HTML
	return (
		<div className="mb-3">
			<label htmlFor={id} className="form-label">
				{label}
			</label>
			<input
				id={id}
				className={inputClass}
				onChange={onChange}
				type={type || 'text'}
			/>
			{help && <span className="invalid-feedback">{help}</span>}
		</div>
	);
	//#endregion
};
//#endregion

//#region exports
export default Input;
//#endregion

// -- old --
//#region prevIterations
//#region HTML
//#region input
// className="form-control is-invalid"
// className="form-control"
//#endregion
//#region span
// <span className='invalid-feedback'>
//	{ help }
// </span>

// {/* <span className="invalid-feedback">{help}</span> */}
// {/* <span>{help}</span> */}
//#endregion
//#endregion
//#endregion
