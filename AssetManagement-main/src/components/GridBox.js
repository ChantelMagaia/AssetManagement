import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors, Fonts, windowWidth } from '../utils/Style';
import React from 'react';

const GridBox = ({ shade, icon, title, number, onPress }) => {
	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor: shade }]}
			onPress={onPress}
		>
			<View style={styles.iconCover}>
				<Icons name={icon} size={22} color={Colors.white} />
			</View>
			<View style={styles.textblock}>
				<Text style={styles.bold}>{number}</Text>
				<Text style={styles.text} numberOfLines={1} ellipsizeMode='tail'>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default GridBox;

const styles = StyleSheet.create({
	button: {
		width: windowWidth * 0.46,
		borderWidth: 1,
		borderColor: Colors.gray,
		borderRadius: 5,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: 5,
		overflow: 'hidden',
	},
	iconCover: {
		width: 50,
		height: 50,
		borderWidth: 1,
		borderColor: Colors.gray,
		borderRadius: 10,
		backgroundColor: Colors.gray,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
	bold: {
		fontFamily: Fonts.Bold,
		color: Colors.dark,
		fontSize: 16,
	},
	text: {
		fontFamily: Fonts.Regular,
		color: Colors.dark,
		fontSize: 14,
		fontWeight: '800',
		textAlign: 'left',
		flexWrap: 'wrap',
		width: windowWidth * 0.2,
		marginTop: -8,
	},
});
