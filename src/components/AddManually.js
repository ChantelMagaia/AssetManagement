import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Modal,
	TouchableWithoutFeedback,
} from 'react-native';
import { Colors, Fonts, windowWidth, windowHeight } from '../utils/Style';
import Button from './Button';
import Heading from './Heading';
import Input from './Input';

const AddManually = ({ visible, onClose, onSubmit }) => {
	const [data, setData] = useState('');
	const onChangeText = (e) => {
		setData(e);
	};

	const onContinue = () => {
		onSubmit(data);
	};

	return (
		<Modal
			visible={visible}
			animationType='fade'
			transparent
			onRequestClose={onClose}
		>
			<View style={styles.container}>
				<View style={styles.modalContainer}>
					<Heading title='Add Manually' />
					<View>
						<Input
							icon={'barcode-scan'}
							onChangeText={onChangeText}
							placeholder={'Add Code'}
							keyboard={'default'}
						/>
						<Button title={'Continue'} onPress={() => onContinue()} />
					</View>
				</View>
			</View>
			<TouchableWithoutFeedback onPress={onClose}>
				<View
					style={[StyleSheet.absoluteFillObject, styles.Model_background]}
				/>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default AddManually;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		flex: 0,
		width: windowWidth * 0.98,
		borderColor: Colors.dark,
		borderWidth: 1,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		backgroundColor: Colors.white,
	},
	Model_background: {
		zIndex: -1,
		backgroundColor: Colors.dark,
		opacity: 0.6,
	},
});
