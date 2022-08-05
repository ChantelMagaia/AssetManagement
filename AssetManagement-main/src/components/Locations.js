import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, Fonts, windowWidth } from '../utils/Style';

const Locations = ({ Office, Address, Person, Email, Phone }) => {
	return (
		<TouchableOpacity style={styles.location}>
			<Text style={styles.bold}>{Office}</Text>
			<Text style={styles.bold}>{Address}</Text>
			<View style={styles.flex}>
				<View>
					<Text style={styles.label}>Contact Person</Text>
				</View>
				<View>
					<Text style={styles.bold}>{Person}</Text>
				</View>
			</View>
			<View style={styles.flex}>
				<View>
					<Text style={styles.label}>Contact Email</Text>
				</View>
				<View>
					<Text style={styles.bold}>{Email}</Text>
				</View>
			</View>
			<View style={styles.flex}>
				<View>
					<Text style={styles.label}>Contact Phone:</Text>
				</View>
				<View>
					<Text style={styles.bold}>{Phone}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Locations;

const styles = StyleSheet.create({
	location: {
		borderWidth: 1,
		borderColor: Colors.gray,
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 5,
		width: windowWidth * 0.94,
		marginBottom: 5,
	},
	flex: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	label: {
		fontSize: 14,
		fontFamily: Fonts.Regular,
		fontWeight: '700',
	},
	bold: {
		fontFamily: Fonts.Semibold,
		fontSize: 14,
		color: Colors.dark,
	},
});
