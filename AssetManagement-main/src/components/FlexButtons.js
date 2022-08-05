import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import React from 'react';
import { Colors, Fonts, windowWidth } from '../utils/Style';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';

const FlexButtons = ({ data, onPress }) => {
	return (
		<View>
			<Text style={styles.heading}>Actions</Text>
			<View style={styles.flex}>
				{Object.keys(data).length > 0 &&
					data.map((item, index) => (
						<TouchableOpacity
							style={styles.iconCover}
							key={index}
							onPress={() => onPress(item.action)}
						>
							<Icons name={item.icon} size={22} color={Colors.white} />
						</TouchableOpacity>
					))}
			</View>
		</View>
	);
};

export default FlexButtons;

const styles = StyleSheet.create({
	flex: {
		width: windowWidth * 0.94,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginVertical: 5,
		paddingHorizontal: 10,
		paddingBottom: 20,
		borderBottomColor: Colors.gray,
		borderBottomWidth: 1,
	},
	iconCover: {
		width: 50,
		height: 50,
		borderWidth: 1,
		borderColor: Colors.gray,
		borderRadius: 10,
		backgroundColor: Colors.blue,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
	heading: {
		fontFamily: Fonts.Semibold,
		fontSize: 16,
		color: Colors.dark,
		paddingTop: 5,
	},
});
