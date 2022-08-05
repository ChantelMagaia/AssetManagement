import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Modal,
	TouchableWithoutFeedback,
} from 'react-native';
import { Colors, Fonts, windowWidth } from '../utils/Style';
import Button from './Button';
import Heading from './Heading';
import Input from './Input';
import User from './User';

const AssignModal = ({ visible, onClose, onSubmit }) => {
	const [search, setSearch] = useState('');
	const [selected, setSelected] = useState('');
	const onChangeText = (e) => {
		setSearch(e);
	};

	const onContinue = () => {
		onSubmit(id);
	};

	const AssignTo = (id) => {
		setSelected(id);
	};

	const removeFromSelected = () => {
		setSelected('');
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
					<View>
						{selected === '' && (
							<>
								<Heading title='Search For Employee' />
								<Input
									icon={'account-search-outline'}
									onChangeText={onChangeText}
									placeholder={'Search by name'}
									keyboard={'default'}
								/>

								{search !== '' && (
									<View>
										<User
											name={'Jane Doe'}
											empNum={'M12345675656'}
											onPress={() => AssignTo('Employee Id')}
										/>
									</View>
								)}
							</>
						)}

						{selected !== '' && (
							<View>
								<View>
									<Heading title={'Selected:'} />
									<User
										name={'Jane Doe'}
										empNum={'M12345675656'}
										onPress={() => removeFromSelected()}
									/>
								</View>
								<Button title={'Assign'} onPress={() => onContinue()} />
							</View>
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

export default AssignModal;

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
