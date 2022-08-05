import React from 'react';
import { Center, Alert, VStack, HStack, Text } from 'native-base';
import {
	StyleSheet,
	View,
	Modal,
	TouchableWithoutFeedback,
} from 'react-native';
import { Colors } from '../utils/Style';

const CustomAlert = ({ visible, status, title, onClose }) => {
	return (
		<Modal
			visible={visible}
			animationType='fade'
			transparent
			onRequestClose={onClose}
		>
			<View style={styles.container}>
				<Center>
					<Alert w='100%' status={status}>
						<VStack space={2} flexShrink={1} w='100%'>
							<HStack flexShrink={1} space={2} justifyContent='space-between'>
								<HStack space={2} flexShrink={1}>
									<Alert.Icon mt='1' />
									<Text fontSize='md' color='coolGray.800'>
										{title}
									</Text>
								</HStack>
							</HStack>
						</VStack>
					</Alert>
				</Center>
			</View>
			<TouchableWithoutFeedback onPress={onClose}>
				<View
					style={[StyleSheet.absoluteFillObject, styles.Model_background]}
				/>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	Model_background: {
		zIndex: -1,
		backgroundColor: Colors.dark,
		opacity: 0.6,
	},
});

export default CustomAlert;
