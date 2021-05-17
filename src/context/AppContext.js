import React from "react";
import * as FileSystem from "expo-file-system";

const configFile = `${FileSystem.documentDirectory}config.json`;
const AppContext = React.createContext();

export const getSettingsFromFile = async () => {
	const info = await FileSystem.getInfoAsync(configFile);
	return info.exists ? FileSystem.readAsStringAsync(configFile) : null;
};

export const saveSettingsToFile = (data) => {
	FileSystem.writeAsStringAsync(configFile, JSON.stringify(data));
	return data;
};

export const appReducer = (state, action) => {
	switch (action.type) {
	case "SET_AUTH":
		return saveSettingsToFile({
			...state,
			auth: action.payload,
		});
	case "SET_SETTINGS":
		return saveSettingsToFile({
			...state,
			settings: {
				...state.settings,
				...action.payload,
			},
		});
	case "SET_INSTANCE":
		return { ...state, ...action.payload };
	default:
		return state;
	}
};

export const setAuthorization = (accessToken, refreshToken) => ({
	type: "SET_AUTH",
	payload: {
		accessToken,
		refreshToken,
	},
});

export const setSettings = (data) => ({
	type: "SET_SETTINGS",
	payload: data,
});

export default AppContext;
