import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors, Fonts, windowWidth } from '../utils/Style';
import React from 'react';

const WideButton = ({ shade, icon, title, onPress }) => {
	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor: shade }]}
			onPress={onPress}
		>
			<View style={styles.iconCover}>
				<Icons name={icon} size={22} color={Colors.white} />
			</View>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
};

export default WideButton;

const styles = StyleSheet.create({
	button: {
		width: windowWidth * 0.94,
		borderWidth: 1,
		borderColor: Colors.gray,
		borderRadius: 5,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: 5,
	},
	iconCover: {
		width: 50,
		height: 50,
		borderWidth: 1,
		borderColor: Colors.gray,
		borderRadius: 10,
		backgroundColor: Colors.gray,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
	text: {
		fontFamily: Fonts.Semibold,
		color: Colors.dark,
		fontSize: 14,
	},
});
