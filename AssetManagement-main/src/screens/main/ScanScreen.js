import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	StatusBar,
} from 'react-native';
import { Colors, Fonts, windowHeight, windowWidth } from '../../utils/Style';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';
import ScanModal from '../../components/ScanModal';
import AddManually from '../../components/AddManually';
import { LinearGradient } from 'expo-linear-gradient';
import CustomAlert from '../../components/CustomAlert';

import firebase from 'firebase';

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

const ScanScreen = ({ navigation }) => {
	let isMounted = useMountedState();
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const [modelVisible, setModelVisible] = useState(false);
	const [manualModal, setManualModel] = useState(false);
	const [asset, setAsset] = useState([]);
	const [valid, setValid] = useState(false);
	const [loading, setLoading] = useState(true);
	const [alert, setAlert] = useState({
		status: '',
		title: '',
		visible: false,
	});

	const isFocused = useIsFocused();

	useEffect(() => {
		console.log(hasPermission, scanned);
		askForCameraPermission();

		navigation.addListener('focus', () => setLoading(false));
	}, [navigation, loading, isMounted]);

	const askForCameraPermission = () => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			if (isMounted()) setHasPermission(status === 'granted');
		})();
	};

	const getPermission = async () => {
		const permission = await BarCodeScanner.getPermissionsAsync();

		if (permission.granted) {
			if (isMounted()) setHasPermission(false);
		}

		if (!permission.canAskAgain && !permission.granted) {
			if (isMounted()) setHasPermission(true);
		}

		if (!permission.granted && permission.canAskAgain) {
			await BarCodeScanner.requestPermissionsAsync()
				.then((res) => {
					if (res.status === 'denied' && res.canAskAgain) {
						PermissionAlert();
					}

					if (res.status === 'granted') {
						if (isMounted()) setHasPermission(res.status === 'granted');
					}

					if (res.status === 'denied' && !res.canAskAgain) {
						if (isMounted()) setHasPermission(true);
					}
				})
				.catch((error) => {
					console.log(error.message);
				});
		}

		if (!permission.granted && !permission.canAskAgain) {
			await BarCodeScanner.requestPermissionsAsync()
				.then((res) => {
					if (res.status === 'denied' && res.canAskAgain) {
						PermissionAlert();
					}

					if (res.status === 'granted') {
						if (isMounted()) setHasPermission(res.status === 'granted');
					}

					if (res.status === 'denied' && !res.canAskAgain) {
						if (isMounted()) setHasPermission(true);
					}
				})
				.catch((error) => {
					console.log(error.message);
				});
		}
	};

	const PermissionAlert = () => {
		Alert.alert(
			'Permission Required',
			'This app needs to have access to your camera to scan!',
			[
				{
					text: 'Confirm',
					onPress: () => {
						getPermission();
					},
				},
				{
					text: 'Cancel',
					onPress: () => {
						PermissionAlert();
					},
				},
			]
		);
	};

	const handleBarCodeScanned = async ({ type, data }) => {
		console.log('check:', data);
		try {
			const list = [];
			await firebase
				.firestore()
				.collection('Assets')
				.get()
				.then((query) => {
					query.forEach((document) => {
						if (document.exists) {
							if (
								document.id === data ||
								document.data().SerialNumber === data
							) {
								const {
									Category,
									Type,
									Product,
									Vendor,
									AssetName,
									SerialNumber,
									Price,
									Location,
									PurchaseDate,
									WarrantyDate,
									PurchaseType,
									Image,
									Description,
									Assigned,
								} = document.data();
								list.push({
									id: document.id,
									Category,
									Type,
									Product,
									Vendor,
									AssetName,
									SerialNumber,
									Price,
									Location,
									PurchaseDate,
									WarrantyDate,
									PurchaseType,
									image: Image,
									Description,
									Assigned,
								});
							}
						}
					});
					if (isMounted()) {
						setScanned(true);
						setAsset(list);
						setModelVisible(true);

						if (list.length > 0) {
							setValid(true);
						} else {
							setValid(false);
						}
					}
				});
		} catch (error) {
			if (isMounted())
				setAlert({
					status: 'error',
					title: { error },
					visible: true,
				});
		}
	};

	const manualSearch = ({ data }) => {
		if (isMounted()) {
			handleBarCodeScanned('', data);
		}
	};

	if (hasPermission === null) {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.bold}>Requesting for camera permission</Text>
				<Button
					title={'Ask Camera Permission'}
					onPress={askForCameraPermission}
				/>
			</SafeAreaView>
		);
	}
	if (hasPermission === false) {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.bold}>No access to camera</Text>
				<Button
					title={'Ask Camera Permission'}
					onPress={askForCameraPermission}
				/>
			</SafeAreaView>
		);
	}

	const Goto = (
		screen,
		assetID,
		Category,
		Type,
		Product,
		Vendor,
		AssetName,
		SerialNumber,
		Price,
		Location,
		PurchaseDate,
		WarrantyDate,
		PurchaseType,
		image,
		Description,
		Assigned
	) => {
		navigation.navigate(screen, {
			assetID,
			Category,
			Type,
			Product,
			Vendor,
			AssetName,
			SerialNumber,
			Price,
			Location,
			PurchaseDate,
			WarrantyDate,
			PurchaseType,
			image,
			Description,
			Assigned,
		});
	};

	const tryAgain = () => {
		if (isMounted()) {
			setScanned(false);
			setModelVisible(false);
		}
	};

	const addManually = () => {
		setManualModel(true);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar statusbarStyle='light-content' backgroundColor={Colors.dark} />
			<LinearGradient
				colors={[Colors.white, Colors.blue, Colors.white]}
				style={{
					width: windowWidth,
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<View>
					<Text style={styles.text}>
						Place the Barcode or QR Code of the Asset on the box below
					</Text>
				</View>
				<View style={styles.barcodeBox}>
					{isFocused ? (
						<BarCodeScanner
							onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
							style={{ height: windowHeight, width: windowWidth }}
						/>
					) : null}
				</View>
				<View style={styles.column}>
					<TouchableOpacity
						style={styles.cirlce}
						onPress={() => setScanned(false)}
					>
						<Icons name='barcode-scan' size={20} color={Colors.dark} />
					</TouchableOpacity>
					<Text style={[styles.bold, { marginVertical: 10 }]}>OR</Text>
					<Button title={'Add Manually'} onPress={addManually} />
				</View>
				<ScanModal
					valid={valid}
					visible={modelVisible}
					asset={asset}
					onClose={() => setModelVisible(false)}
					onSubmit={() =>
						Goto(
							'Scanned Asset Details',
							asset[0].id,
							asset[0].Category,
							asset[0].Type,
							asset[0].Product,
							asset[0].Vendor,
							asset[0].AssetName,
							asset[0].SerialNumber,
							asset[0].Price,
							asset[0].Location,
							asset[0].PurchaseDate,
							asset[0].WarrantyDate,
							asset[0].PurchaseType,
							asset[0].image,
							asset[0].Description,
							asset[0].Assigned
						)
					}
					onTryAgain={tryAgain}
				/>

				<AddManually
					visible={manualModal}
					onClose={() => setManualModel(false)}
					onSubmit={manualSearch}
				/>
				<CustomAlert
					visible={alert.visible}
					status={alert.status}
					title={alert.title}
					onClose={() => setAlert({ ...alert, visible: false })}
				/>
			</LinearGradient>
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
	barcodeBox: {
		alignItems: 'center',
		justifyContent: 'center',
		height: windowWidth * 0.8,
		width: windowWidth * 0.8,
		overflow: 'hidden',
		marginVertical: 20,
		borderWidth: 2,
		borderColor: Colors.gray,
		borderRadius: 10,
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
	column: {
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	cirlce: {
		width: 60,
		height: 60,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: Colors.gray,
		backgroundColor: Colors.blue,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
