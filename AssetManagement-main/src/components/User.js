import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Avatar } from 'native-base';
import { Colors, Fonts, windowWidth } from '../utils/Style';

const User = ({ initials, name, empNum, onPress }) => {
	return (
		<TouchableOpacity style={styles.user} onPress={onPress}>
			<View style={styles.flex}>
				<Avatar bg='cyan.500' alignSelf='center' size='md'>
					<Text style={styles.initial}>{initials}</Text>
				</Avatar>
				<View style={{ marginLeft: 10 }}>
					<Text style={styles.bold}>{name}</Text>
					<Text style={styles.text}>{empNum}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default User;

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
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	text: {
		fontFamily: Fonts.Regular,
		fontSize: 14,
		color: Colors.dark,
	},
	bold: {
		fontFamily: Fonts.Semibold,
		fontSize: 16,
		color: Colors.dark,
	},
	initial: {
		fontFamily: Fonts.Semibold,
		fontSize: 18,
		color: Colors.white,
	},
});
