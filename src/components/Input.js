import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors, Fonts, windowWidth, windowHeight } from '../utils/Style';

const Input = ({ icon, onChangeText, placeholder, keyboard, value }) => {
	return (
		<View style={styles.inputContainer}>
			<View style={styles.iconStyle}>
				<Icons name={icon} color={Colors.gray} size={25} />
			</View>
			<TextInput
				style={styles.input}
				onChangeText={(e) => onChangeText(e)}
				numberOfLines={1}
				placeholder={placeholder}
				placeholderTextColor={Colors.gray}
				autoCapitilize='words'
				autoCorrect={false}
				keyboardType={keyboard}
				value={value}
			/>
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	inputContainer: {
		marginVertical: 5,
		width: windowWidth * 0.95,
		height: windowHeight / 15,
		borderColor: Colors.gray,
		borderRadius: 3,
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.white,
	},

	iconStyle: {
		padding: 10,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRightColor: Colors.gray,
		borderRightWidth: 1,
		width: 50,
	},
	input: {
		padding: 10,
		flex: 1,
		fontSize: 16,
		fontFamily: Fonts.Regular,
		color: Colors.dark,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
