import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, Fonts, windowWidth } from '../utils/Style';

const Product = ({ Product, Manufacture, Category, Type, onPress }) => {
	return (
		<TouchableOpacity style={styles.product} onPress={onPress}>
			<Text style={styles.bold}>{Product}</Text>
			<View style={styles.flex}>
				<View>
					<Text style={styles.label}>Manufacture</Text>
				</View>
				<View>
					<Text style={styles.bold}>{Manufacture}</Text>
				</View>
			</View>
			<View style={styles.flex}>
				<View>
					<Text style={styles.label}>Category</Text>
				</View>
				<View>
					<Text style={styles.bold}>{Category}</Text>
				</View>
			</View>
			<View style={styles.flex}>
				<View>
					<Text style={styles.label}>Product Type</Text>
				</View>
				<View>
					<Text style={styles.bold}>{Type}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Product;

const styles = StyleSheet.create({
	product: {
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
