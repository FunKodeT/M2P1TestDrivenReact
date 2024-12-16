//#region imports
import { useTranslation } from 'react-i18next';
//#endregion
//#region functions
const LanguageSelector = (props) => {
	//#region i18n
	const { i18n } = useTranslation();
	//#endregion
	//#region HTML
	return (
		<>
			<img
				src="https://www.countryflags.io/tr/flat/24.png"
				title="Turkce"
				onClick={() => i18n.changeLanguage('tr')}
				alt="turkey"
			/>
			<img
				src="https://www.countryflags.io/us/flat/24.png"
				title="English"
				onClick={() => i18n.changeLanguage('en')}
				alt="english"
			/>
		</>
	);
	//#endregion
};
//#endregion
//#region exports
// export default withTranslation()(LanguageSelector);
export default LanguageSelector;
//#endregion

// -- old --
//#region prevIterations
//#region imports
// import { withTranslation } from 'react-i18next';
//#endregion
//#region functions
//#region HTML
// <div>
//#region turImg
// onClick={() => this.props.i18n.changeLanguage('tr')}
//#endregion
//#region engImg
// onClick={() => this.props.i18n.changeLanguage('en')}
//#endregion
// </div>
//#endregion
//#endregion
//#endregion
