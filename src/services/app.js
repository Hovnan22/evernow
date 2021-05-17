import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

import StorageService from './storage';
import { Store } from '../config';

import {
  setAuth,
  setUser,
  setSettings,
  setIsLoggedIn,
} from '../actions/app';

import { languages } from '../constants';
import translations from '../translations'

class AppService {

  static async init() {


    const auth = await StorageService.getAuthTokens();
    const user = await StorageService.getUserData();
    if (auth?.accessToken) {
      Store.dispatch(setAuth(auth));
      Store.dispatch(setUser(user));
      Store.dispatch(setIsLoggedIn(true));
    }
    await this.initLanguage();
    await this.initSettings();
  }

  static async initLanguage() {
    const language = await this.getLanguage();
    i18n.translations = translations;
    i18n.locale = language;
    i18n.fallbacks = language;
  }

  static async initSettings() {
    const locale = await this.getLanguage();
    const timezone = await this.getTimezone();
    const settings = { timezone, locale };
    Store.dispatch(setSettings(settings));
    const setting = await StorageService.getSettingsData();
    if (typeof setting?.timezone !== 'string' || !setting?.timezone) {
      Store.dispatch(setSettings(settings));
      await StorageService.setSettingsData(settings);
    } else {
      Store.dispatch(setSettings(setting));

    }
  }

  static async getLanguage() {
    const { locale } = Localization;
    const language = languages.find(v => v === locale) || "en";
    const settings = await StorageService.getSettingsData();
    const settingsLanguage = settings?.locale;
    const { app: {
      user: {
        language: userLanguage
      },
    } } = Store.getState();
    return userLanguage || settingsLanguage || language;
  }

  static async getTimezone() {
    const { timezone } = Localization;
    const settings = await StorageService.getSettingsData();
    const settingsTimezone = settings?.timezone;
    const { app: {
      user: {
        timezone: userTimezone
      },
    } } = Store.getState()
    return userTimezone || settingsTimezone || timezone;
  }
}

export default AppService;
