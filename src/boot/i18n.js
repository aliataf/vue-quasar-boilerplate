import VueI18n from 'vue-i18n';
import { Quasar } from 'quasar';

let i18n;
const supportedLanguages = ['en-us', 'ar', 'kur-ckb'];

export default async ({ app, Vue }) => {
	Vue.use(VueI18n);

	let locale = localStorage.getItem('locale'),
		messages = {};
	if (locale && supportedLanguages.includes(locale)) {
		try {
			await import(/* webpackChunkName: "lang-[request]" */ `quasar/lang/${locale}`).then(
				(lang) => {
					Quasar.lang.set(lang.default);
				},
			);
			await import(/* webpackChunkName: "lang-[request]" */ `../i18n/${locale}`).then((lang) => {
				messages[locale] = lang.default;
			});
		} catch (err) {
			console.log(err);
		}
	} else {
		localStorage.setItem('locale', 'en-us');
		try {
			await import(`quasar/lang/en-us`).then((lang) => {
				Quasar.lang.set(lang.default);
				messages[locale] = lang.default;
			});
		} catch (err) {
			console.log(err);
		}
	}

	app.i18n = new VueI18n({
		locale,
		fallbackLocale: 'en-us',
		messages,
	});

	// Set i18n instance on app
	i18n = app.i18n;
};

export { i18n };
