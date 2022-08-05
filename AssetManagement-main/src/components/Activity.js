import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Fonts } from '../utils/Style';

const Activity = ({ action, time, user, prodId, prodName }) => {
	return (
		<View style={styles.Activity}>
			<View style={styles.flex}>
				<Text style={styles.text}>
					{action} <Text style={styles.bold}>{user}</Text>
				</Text>
				<Text style={styles.text}>{time}</Text>
			</View>
			<Text style={styles.text}>
				File Record:{' '}
				<Text style={styles.bold}>
					{prodName} | {prodId}
				</Text>
			</Text>
		</View>
	);
};

export default Activity;

const styles = StyleSheet.create({
	Activity: {
		borderWidth: 1,
		borderColor: Colors.gray,
		borderRadius: 5,
		padding: 10,
		marginBottom: 5,
	},
	flex: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	text: {
		fontFamily: Fonts.Regular,
		fontSize: 14,
		color: Colors.dark,
	},
	bold: {
		fontFamily: Fonts.Semibold,
		fontSize: 14,
		color: Colors.dark,
	},
});
