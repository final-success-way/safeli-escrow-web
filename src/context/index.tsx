import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import Config from './config.json'
import { currentTime } from "./helper";
import Locales, { UILangType, timeAgos } from "./locale";

const locales = { ...Locales };

export const config = Config;

export interface ContextDataType {
	darkTheme: boolean
	emailSubscribed: boolean
	locales: string[]
	lang: string
	cookie: string
	loading: boolean
	emailSent: number
	connected: boolean
}

const initiContextData = {
	darkTheme: config.defaultThemeDark,
	emailSubscribed: false,
	locales: ['en-US'],
	lang: 'en-US',
	cookie: '',
	loading: false,
	connected: false,
	emailSent: 0,
} as ContextDataType

interface ContextType extends ContextDataType {
	en: UILangType
	countries: Array<{ key: string, label: any, icon: string }>
	T(key: string, args?: { [key: string]: string | number } | string | number): string
	A(key: string, args?: { [key: string]: string | number } | string | number): string[]
	R(key: string): any
	update(attrib: Partial<ContextDataType>): void
	getError(code: number | string, args?: { [key: string]: string | number } | string | number): string
	getCountryCode(country: string): string
	timeAgo(time: number): string
	showLoading(show: boolean): void
	setCookie(extra?: Partial<ContextDataType>): void
	logout(extra?: Partial<ContextDataType>): void
}

const Context = React.createContext<ContextType>(null!);

const getStore = (state: any) => {
	try {
		const buf = window.localStorage.getItem(config.appId);
		if (buf) {
			const json = JSON.parse(buf);
			for (let k in json) {
				if (state[k] !== undefined) {
					state[k] = json[k];
				}
			}
		}
		if (state.cookie === '') state.cookie = uuidv4()
		state.loading = false;
	} catch (err) {
		console.log(err);
	}
	return state;
}

const setLangStore = (lang: string, data: UILangType) => {
	window.localStorage.setItem(config.appId + '-' + lang, JSON.stringify(data))
}

const getLangStore = (lang: string) => {
	try {
		const buf = window.localStorage.getItem(config.appId + '-' + lang);
		if (buf) {
			return JSON.parse(buf);
		}
	} catch (err) {
		console.log(err);
	}
	return null;
}

const setStore = (state: any) => {
	window.localStorage.setItem(config.appId, JSON.stringify(state))
}

const setDocumentCookie = () => {
	const cookie = uuidv4();
	document.cookie = `${config.appId}=${cookie}; path=/; sameSite=true; expires=${new Date(+new Date() + 7 * 86400000).toUTCString()}`;
	return cookie;
}

export const Provider = ({ children }: any) => {
	const navigate = useNavigate()
	const [data, setData] = React.useState<ContextDataType>(getStore(initiContextData));
	const en = locales['en-US'];
	const [L, setL] = React.useState(getLangStore(data.lang));


	const update = (attrib: Partial<ContextDataType>) => {
		const _data = { ...data, ...attrib }
		setData(_data)
		setStore(_data)
	}

	// const getError = (code:number, args?:{[key:string]:string|number}|string|number) => T("error."+code, args)

	const T = (key: string, args?: { [key: string]: string | number } | string | number): string => {
		let x = key.split('.');
		let v = (L || {}) as any
		for (let k of x) {
			if (v[k] === undefined) {
				// throw new Error('Undefined lang key[' + key + ']');
				v = null;
				break;
			} else {
				v = v[k];
			}
		}
		if (v === null) {
			v = en;
			for (let k of x) {
				if (v[k] === undefined) {
					throw new Error('Undefined lang key[' + key + ']');
				} else {
					v = v[k];
				}
			}
		}
		let text = v;
		if (typeof args === 'string' || typeof args === 'number') {
			text = text.replace(/\{\w+\}/, String(args))
		} else if (args) {
			for (let k in args) text = text.replace(new RegExp('{' + k + '}', 'g'), String(args[k]))
		}
		return text
	}
	const A = (key: string, args?: { [key: string]: string | number } | string | number): string[] => {
		let x = key.split('.');
		let v = (L || {}) as any
		for (let k of x) {
			if (v[k] === undefined) {
				// throw new Error('Undefined lang key[' + key + ']');
				v = null;
				break;
			} else {
				v = v[k];
			}
		}
		if (v === null) {
			v = en;
			for (let k of x) {
				if (v[k] === undefined) {
					throw new Error('Undefined lang key[' + key + ']');
				} else {
					v = v[k];
				}
			}
		}
		let text = v;
		if (typeof args === 'string' || typeof args === 'number') {
			for (let k = 0; k < text.length; k++) {
				text[k] = text[k].replace(/\{\w+\}/, String(args))
			}

		} else if (args) {
			for (let key in args) {
				for (let k = 0; k < text.length; k++) {
					text[k] = text[k].replace(new RegExp('{' + key + '}', 'g'), String(args[key]))
				}
			}
		}
		return text
	}

	const R = (key: string): any => {
		let x = key.split('.');
		let v = (L || {}) as any
		for (let k of x) {
			if (v[k] === undefined) {
				// throw new Error('Undefined lang key[' + key + ']');
				v = null;
				break;
			} else {
				v = v[k];
			}
		}
		if (v === null) {
			v = en;
			for (let k of x) {
				if (v[k] === undefined) {
					throw new Error('Undefined lang key[' + key + ']');
				} else {
					v = v[k];
				}
			}
		}
		return v
	}

	const getError = (code: number | string, args?: { [key: string]: string | number } | string | number | null): string => {
		if (typeof code === 'string') return code;
		let text = (L || {})?.error?.[code] || en?.error?.[code] || code;
		if (text === undefined) throw new Error('Undefined lang key[' + code + ']')
		if (typeof args === 'string' || typeof args === 'number') {
			text = text.replace(/\{\w+\}/, String(args))
		} else if (!!args) {
			for (let k in args) text = text.replace(new RegExp('{' + k + '}', 'g'), String(args[k]))
		}
		return text
	}

	const getCountryCode = (country: string) => {
		if (!country) return "US";
		try {
			if (T('countries.' + country)) {
				return country;
			}
		}
		catch (err) {
			let code = 'US';
			Object.entries(en.countries).forEach(([key, element]) => {
				if (element.toString().toUpperCase() == country.toUpperCase()) {
					code = key;
					return;
				}
			})
			return code;
		}
		return 'US'
	}

	const timeAgo = (time: number): string => {
		if (time < 1e12) time *= 1000
		return timeAgos[data.lang]?.format(time)
	}

	const setCookie = (extra?: Partial<ContextDataType>) => {
		const cookie = setDocumentCookie()
		update({ cookie, ...extra })
	}

	const logout = (extra?: Partial<ContextDataType>) => {
		setCookie({ /* account: null, */ ...extra })
		navigate('/')
	}

	const fetchLanguage = async (lang: string) => {
		try {
			const res = await fetch(`/locale/${lang}.json`);
			const json = await res.json();
			setLangStore(lang, { ...json, lastUpdated: currentTime() });
			setL(json)
			console.log(`loading locale file ${lang}`)
		} catch (error) {

		}
	}

	React.useEffect(() => {
		if (data.lang === 'en-US') {
			setL(en);
		} else {
			if (config.debug) {
				fetchLanguage(data.lang)
			} else {
				const timestamp = currentTime()
				const _L = getLangStore(data.lang);
				if (_L === null || timestamp - (_L.lastUpdated || 0) > 86400) {
					fetchLanguage(data.lang)
				} else {
					setL(_L)
				}
			}
		}
	}, [data.lang])

	const showLoading = (show: boolean) => update({ loading: show })
	const [countries] = React.useState(Object.keys(en.countries).map(i => ({ key: i, label: T('countries.' + i), icon: `https://storage.Fwork.io/flag/${i.toLowerCase()}.svg` })))
	return <Context.Provider value={{ ...data, countries, en, T, A, R, timeAgo, setCookie, getCountryCode, getError, logout, showLoading, update }}>
		{children}
	</Context.Provider>
};

export default Context;
