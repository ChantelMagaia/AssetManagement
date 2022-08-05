import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../utils/Style';
import Button from './Button';

const Empty = ({ title, btnText, onPress }) => {
	return (
		<View style={styles.empty}>
			<Text style={styles.centerText}>{title}</Text>
			<Button title={btnText} onPress={onPress} />
		</View>
	);
};

export default Empty;

const styles = StyleSheet.create({
	empty: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	centerText: {
		fontFamily: Fonts.Semibold,
		fontSize: 16,
		color: Colors.dark,
		textAlign: 'center',
		marginVertical: 20,
	},
});
