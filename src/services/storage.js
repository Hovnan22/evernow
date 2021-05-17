import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  static async setAuthTokens(auth) {
    try {
      await AsyncStorage.setItem("@evernow:auth", JSON.stringify(auth));
    } catch (e) {
      console.warn(e);
    }
  }

  static async getAuthTokens() {
    try {
      const auth = await AsyncStorage.getItem("@evernow:auth");
      return JSON.parse(auth);
    } catch (e) {
      console.warn(e);
    }
  }

  static async setUserData(user) {
    try {
      await AsyncStorage.setItem("@evernow:user", JSON.stringify(user));
    } catch (e) {
      console.warn(e);
    }
  }

  static async getUserData() {
    try {
      const user = await AsyncStorage.getItem("@evernow:user");
      return JSON.parse(user);
    } catch (e) {
      console.warn(e);
    }
  }

  static async setSettingsData(settings) {
    try {
      await AsyncStorage.setItem("@evernow:settings", JSON.stringify(settings));
    } catch (e) {
      console.warn(e);
    }
  }

  static async getSettingsData() {
    try {
      const settings = await AsyncStorage.getItem("@evernow:settings");
      return JSON.parse(settings);
    } catch (e) {
      console.warn(e);
    }
  }
}

export default StorageService;
