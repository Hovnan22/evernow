import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default function LinearGradientLayout({ children }) {
	return <LinearGradient
		colors={["#F2F5FC", "#FAFBFE"]}
		style={styles.container}>
		{children}
	</LinearGradient>;
}
