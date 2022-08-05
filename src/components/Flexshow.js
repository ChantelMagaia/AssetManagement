import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Fonts, windowWidth } from '../utils/Style';

const Flexshow = ({ label, value }) => {
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

export default Flexshow;

const styles = StyleSheet.create({
	flex: {
		width: windowWidth * 0.95,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomColor: Colors.gray,
		borderBottomWidth: 1,
		marginVertical: 5,
		paddingHorizontal: 10,
		paddingVertical: 6,
	},
	text: {
		fontFamily: Fonts.Regular,
		fontSize: 16,
		color: Colors.dark,
	},
	bold: {
		fontFamily: Fonts.Semibold,
		fontSize: 14,
		color: Colors.dark,
	},
});
