import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, Fonts, windowWidth } from '../utils/Style';

const Button = ({ title, onPress }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
		width: windowWidth * 0.95,
		backgroundColor: Colors.blue,
		borderWidth: 1,
		borderColor: Colors.gray,
		borderRadius: 5,
		padding: 15,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 5,
	},
	text: {
		fontFamily: Fonts.Semibold,
		color: Colors.dark,
		fontSize: 16,
	},
});
