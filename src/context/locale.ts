
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import de from 'javascript-time-ago/locale/de.json'
import fr from 'javascript-time-ago/locale/fr.json'
import es from 'javascript-time-ago/locale/es.json'
import pt from 'javascript-time-ago/locale/pt.json'
import zh from 'javascript-time-ago/locale/zh.json'

import enUS from './locales/en-US.json'
// import deDE from './locales/de-DE.json'
// import frFR from './locales/fr-FR.json'
// import esES from './locales/es-ES.json'
// import ptPT from './locales/pt-PT.json'
// import zhCN from './locales/zh-CN.json'
interface KeyValueType {
	[key: string]: string|string[]
}
export interface UILangType {
	ui: KeyValueType
	app: KeyValueType
	home: KeyValueType
	service: KeyValueType
	freelancer: KeyValueType
	job: KeyValueType
	blog: KeyValueType
	aboutus: KeyValueType
	account: KeyValueType
	category:  {
		[rootkey: string]: {
			label: string[]
			items: {
				[key: string]: string[]
			}
		}
	},
	categoryMeta: {
		[rootkey: string]: string[]
	}
	categoryScope: KeyValueType
	categoryExtra: KeyValueType
	countries: KeyValueType
	languages: {[code: string]: string[]}
	languageProficiency: string[]
	monthname: string[]
	certifications: string[]
	fiats: KeyValueType
	timezones: Array<string[]>
	
	error: {[code: string]: string}
}

const locales = {
	"en-US": enUS,
} as {[lang: string]: UILangType};

TimeAgo.addLocale(en)
TimeAgo.addLocale(de)
TimeAgo.addLocale(fr)
TimeAgo.addLocale(es)
TimeAgo.addLocale(pt)
TimeAgo.addLocale(zh)

export const timeAgos = {
	"en-US": new TimeAgo('en'),
	"de-DE": new TimeAgo('de'),
	"fr-FR": new TimeAgo('fr'),
	"es-ES": new TimeAgo('es'),
	"pt-PT": new TimeAgo('pt'),
	"zh-CN": new TimeAgo('zh'),
} as {[key:string]:any}

export default locales;