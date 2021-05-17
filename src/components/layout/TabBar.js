import React, { useEffect, useState } from "react";
import {
	View, TouchableOpacity, StyleSheet, Animated, Easing,
} from "react-native";

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		borderTopRightRadius: 16,
		borderTopLeftRadius: 16,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		backgroundColor: "#FFFFFF",
		minHeight: 64,
	},
	item: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		color: "#A5ADC1",
	},
	focused: {
		backgroundColor: "#5596D9",
		borderRadius: 12,
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default function TabBar(props) {
	const { state, descriptors, navigation } = props;
	const [visibility, setVisibility] = useState(true);
	const padding = new Animated.Value(0);
	const animationHide = Animated.timing(padding, {
		toValue: -70,
		duration: 2000,
		easing: Easing.elastic(2),
	});
	const animationFade = Animated.timing(padding, {
		toValue: 0,
		duration: 2000,
		easing: Easing.elastic(2),
	});
	const animatedViewStyle = { position: visibility ? "relative" : "absolute", bottom: padding };
	useEffect(() => {
		if (visibility === false) {
			animationHide.start();
		} else {
			animationFade.start();
		}
	}, [visibility]);
	return <Animated.View style={[styles.container, animatedViewStyle]}>
		{state.routes.map((route, index) => {
			const { options } = descriptors[route.key];
			const isFocused = state.index === index;
			if (options.headerShown === false && isFocused === true && visibility === true) {
				setVisibility(false);
			}
			if (options.headerShown !== false && isFocused === true && visibility !== true) {
				setVisibility(true);
			}
			const onPress = () => {
				const event = navigation.emit({
					type: "tabPress",
					target: route.key,
					canPreventDefault: true,
				});
				if (!isFocused && !event.defaultPrevented) {
					navigation.navigate(route.name);
				}
			};
			const onLongPress = () => {
				navigation.emit({
					type: "tabLongPress",
					target: route.key,
				});
			};
			return (
				<TouchableOpacity
					key={index}
					style={styles.item}
					accessibilityRole="button"
					accessibilityStates={isFocused ? ["selected"] : []}
					accessibilityLabel={options.tabBarAccessibilityLabel}
					testID={options.tabBarTestID}
					onPress={onPress}
					onLongPress={onLongPress}>
					<View style={isFocused ? styles.focused : {}}>
						{ options.tabBarIcon && options.tabBarIcon({
							...styles.icon,
							size: 32,
							color: isFocused ? "#FFF" : "#A5ADC1",
						})}
					</View>
				</TouchableOpacity>
			);
		})}
	</Animated.View>;
}
