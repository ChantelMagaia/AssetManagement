import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors, Fonts, windowWidth } from '../utils/Style';
import React from 'react';

const WideButton = ({ icon, title, onPress }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<Icons name={icon} size={24} color={Colors.dark} />
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
};

export default WideButton;

const styles = StyleSheet.create({
	button: {
		width: windowWidth * 0.95,
		backgroundColor: Colors.blue,
		borderWidth: 1,
		borderColor: Colors.gray,
		borderRadius: 5,
		padding: 15,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingLeft: 20,
		marginBottom: 5,
	},
	text: {
		fontFamily: Fonts.Semibold,
		color: Colors.dark,
		fontSize: 15,
		marginLeft: 10,
		paddingTop: 5,
	},
});
