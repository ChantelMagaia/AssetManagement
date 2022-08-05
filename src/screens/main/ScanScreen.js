import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native';
import { Colors, Fonts, windowHeight, windowWidth } from '../../utils/Style';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';
import ScanModal from '../../components/ScanModal';
import AddManually from '../../components/AddManually';

const useMountedState = () => {
	const mountedRef = useRef(false);
	const isMounted = useCallback(() => mountedRef.current, []);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);

	return isMounted;
};

const ScanScreen = () => {
	let isMounted = useMountedState();
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const [modelVisible, setModelVisible] = useState(false);
	const [manualModal, setManualModel] = useState(false);
	const [key, setKey] = useState('');
	const [valid, setValid] = useState(false);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();

			if (isMounted()) setHasPermission(status === 'granted');
		})();
	}, []);

	const handleBarCodeScanned = ({ data }) => {
		if (isMounted()) {
			setScanned(true);
			setKey(data);
			setValid(true);
			setModelVisible(true);
		}
	};

	const manualSearch = ({ data }) => {
		if (isMounted()) {
			manualModal(false);
			setKey(data);
			setValid(true);
			setModelVisible(true);
		}
	};

	if (hasPermission === null) {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.bold}>Requesting for camera permission</Text>
			</SafeAreaView>
		);
	}
	if (hasPermission === false) {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.bold}>No access to camera</Text>
			</SafeAreaView>
		);
	}

	const moveForward = () => {
		console.log('continue', key);
	};

	const tryAgain = () => {
		console.log('tryAgain');
		if (isMounted()) {
			setScanned(false);
			setModelVisible(false);
			setKey('');
		}
	};

	const addManually = () => {
		setManualModel(true);
	};

	return (
		<SafeAreaView style={styles.container}>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>
			<View>
				<Text style={styles.text}>
					Place the Barcode or QR Code of the Asset on the blue box
				</Text>
			</View>
			<View style={styles.bluebox} />
			<View style={styles.column}>
				<TouchableOpacity
					style={styles.cirlce}
					onPress={() => handleBarCodeScanned}
				>
					<Icons name='barcode-scan' size={20} color={Colors.dark} />
				</TouchableOpacity>
				<Text style={[styles.bold, { marginVertical: 10 }]}>OR</Text>
				<Button title={'Add Manually'} onPress={addManually} />
			</View>
			<ScanModal
				valid={valid}
				visible={modelVisible}
				onClose={() => setModelVisible(false)}
				onSubmit={moveForward}
				onTryAgain={tryAgain}
			/>

			<AddManually
				visible={manualModal}
				onClose={() => setManualModel(false)}
				onSubmit={manualSearch}
			/>
		</SafeAreaView>
	);
};

export default ScanScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontFamily: Fonts.Semibold,
		fontSize: 16,
		color: Colors.dark,
		textAlign: 'center',
		width: windowWidth * 0.7,
	},
	bold: {
		fontFamily: Fonts.Semibold,
		fontSize: 16,
		color: Colors.dark,
	},
	bluebox: {
		width: windowWidth * 0.85,
		height: windowHeight / 3,
		marginVertical: 20,
		borderWidth: 2,
		borderColor: Colors.blue,
		borderRadius: 10,
		backgroundColor: 'transparent',
	},
	column: {
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	cirlce: {
		width: 60,
		height: 60,
		borderRadius: 50,
		backgroundColor: Colors.blue,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
