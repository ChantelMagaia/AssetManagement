import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, Fonts, windowWidth } from '../utils/Style';

const Asset = ({
	name,
	prodId,
	type,
	state,
	fromDate,
	assigned,
	due,
	onPress,
}) => {
	return (
		<TouchableOpacity style={styles.user} onPress={onPress}>
			<View style={styles.flex}>
				<Text style={styles.bold}>
					{name} | {prodId}
				</Text>
				<Text style={styles.text}>{type}</Text>
			</View>
			<View style={styles.flex}>
				<Text style={styles.text}>
					{state !== '' ? 'Operational' : 'Recently Added'}
				</Text>
				<Text style={styles.text}>
					From: {fromDate !== '' ? fromDate : 'No Date'}
				</Text>
			</View>
			<View style={styles.flex}>
				<Text style={styles.bold}>
					{assigned !== '' ? assigned : 'Not Assigned'}
				</Text>
				<Text style={styles.text}>
					Return Due: {due !== '' ? due : 'No Date'}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Asset;

const styles = StyleSheet.create({
	user: {
		borderWidth: 1,
		borderColor: Colors.gray,
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 5,
		marginBottom: 5,
		width: windowWidth * 0.95,
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
