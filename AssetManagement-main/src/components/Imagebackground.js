import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors, windowWidth } from '../utils/Style';

const Imagebackground = ({ image, placeholder, onPress }) => {
	return (
		<ImageBackground
			source={{
				uri: image ? image : placeholder,
			}}
			style={styles.image}
		>
			<TouchableOpacity style={styles.inner} onPress={onPress}>
				<Icons
					name='camera'
					size={30}
					color={Colors.dark}
					Style={styles.icon}
				/>
			</TouchableOpacity>
		</ImageBackground>
	);
};

export default Imagebackground;

const styles = StyleSheet.create({
	image: {
		width: windowWidth * 0.35,
		height: windowWidth * 0.35,
		borderRadius: 10,
		resizeMode: 'contain',
		borderColor: Colors.gray,
		borderWidth: 1,
		marginVertical: 10,
		overflow: 'hidden',
	},
	inner: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		opacity: 0.7,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: Colors.blue,
		borderRadius: 10,
	},
});
