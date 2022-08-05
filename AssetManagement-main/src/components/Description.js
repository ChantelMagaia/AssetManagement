import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Fonts, windowWidth } from '../utils/Style';

const Description = ({ label, value }) => {
	return (
		<View style={styles.flex}>
			<View>
				<Text style={styles.bold}>{label}</Text>
			</View>
			<View>
				<Text style={styles.text}>{value}</Text>
			</View>
		</View>
	);
};

export default Description;

const styles = StyleSheet.create({
	flex: {
		width: windowWidth * 0.94,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		borderBottomColor: Colors.gray,
		borderBottomWidth: 1,
		marginVertical: 5,
		paddingHorizontal: 10,
		paddingVertical: 6,
	},
	text: {
		fontFamily: Fonts.Regular,
		fontSize: 14,
		color: Colors.dark,
		textAlign: 'justify',
	},
	bold: {
		fontFamily: Fonts.Semibold,
		fontSize: 14,
		color: Colors.dark,
	},
});
