import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Fonts, windowWidth } from '../utils/Style';

const Heading = ({ title }) => {
	return <Text style={styles.heading}>{title}</Text>;
};

export default Heading;

const styles = StyleSheet.create({
	heading: {
		fontFamily: Fonts.Semibold,
		fontSize: 16,
		color: Colors.dark,
		textAlign: 'left',
		width: windowWidth * 0.94,
		marginVertical: 5,
	},
});
