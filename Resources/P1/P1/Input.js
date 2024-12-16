//#region
return(
	<div className='mb-3'>
		<label htmlFor={ id } className='form-label'>
			{ label }
		</label>
		<input id={ id } className={ inputClass } onChange={ onChange } type={ type || 'text' } />

		// <span className='invalid-feedback'>
		//	{ help }
		// </span>
		{ help && <span className='invalid-feedback'>
			{ help }
		</span>}
		
	</div>
)
//#endregion