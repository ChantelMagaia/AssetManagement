import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Modal,
	TouchableWithoutFeedback,
} from 'react-native';
import { Colors, Fonts, windowWidth } from '../utils/Style';
import Asset from './Asset';
import Button from './Button';
import Heading from './Heading';

const ScanModal = ({ valid, visible, onClose, onSubmit, onTryAgain }) => {
	return (
		<Modal
			visible={visible}
			animationType='fade'
			transparent
			onRequestClose={onClose}
		>
			<View style={styles.container}>
				<View style={styles.modalContainer}>
					<Heading title='Scan Results' />
					<View>
						{valid ? (
							<>
								<Asset
									name={'Asset Name'}
									prodId={'Product ID'}
									type={'Type'}
									state={'Operational'}
									fromDate={'26-07-2022'}
									assigned={'Username'}
									due={'06-06-2023'}
								/>
								<Button title={'Continue'} onPress={onSubmit} />
							</>
						) : (
							<>
								<Text style={styles.bold}>Unknown Product</Text>
								<Button title={'Scan Again'} onPress={onTryAgain} />
							</>
						)}
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

export default ScanModal;

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
	bold: {
		fontFamily: Fonts.Semibold,
		fontSize: 18,
		color: Colors.dark,
		textAlign: 'center',
		marginVertical: 15,
	},
});
