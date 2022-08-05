import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, Fonts, windowWidth } from '../utils/Style';

const Asset = ({
	product,
	category,
	type,
	name,
	serial,
	state,
	assigned,
	due,
	onPress,
}) => {
	return (
		<TouchableOpacity style={styles.user} onPress={onPress}>
			<Text style={styles.bold}>
				{product} | {name} | {serial}
			</Text>
			<View style={styles.flex}>
				<Text style={styles.text}>{category}</Text>
				<Text style={styles.text}>{type}</Text>
			</View>
			<View style={styles.flex}>
				<Text style={styles.text}>
					{state !== '' ? 'Operational' : 'Recently Added'}
				</Text>
				<Text style={styles.text}>
					{Object.values(assigned).length > 0 ? assigned.Name : 'Not Assigned'}
				</Text>
			</View>
			<View style={styles.flex}>
				<Text style={styles.label}>Warranty Expiration Date</Text>
				<Text style={styles.label}>
					{due !== '' ? due.toDate().toDateString() : 'No Date'}
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
		width: windowWidth * 0.94,
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
	label: {
		fontSize: 14,
		fontFamily: Fonts.Regular,
		fontWeight: '700',
	},
});
