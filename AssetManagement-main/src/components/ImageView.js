import { StyleSheet, Image } from 'react-native';
import React from 'react';
import { windowWidth, Colors } from '../utils/Style';

const ImageView = ({ image }) => {
	console.log(image);
	return (
		<Image
			source={{
				uri: image,
			}}
			style={styles.image}
		/>
	);
};

export default ImageView;

const styles = StyleSheet.create({
	image: {
		width: windowWidth * 0.35,
		height: windowWidth * 0.35,
		borderRadius: 10,
		resizeMode: 'contain',
		borderColor: Colors.gray,
		borderWidth: 1,
		margin: 10,
		overflow: 'hidden',
	},
});
