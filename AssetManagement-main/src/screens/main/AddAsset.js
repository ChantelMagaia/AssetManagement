import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	View,
	StatusBar,
} from 'react-native';
import React, {
	useContext,
	useState,
	useEffect,
	useRef,
	useCallback,
} from 'react';
import { Colors } from '../../utils/Style';
import Imagebackground from '../../components/Imagebackground';
import LabelInput from '../../components/LabelInput';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import CustomAlert from '../../components/CustomAlert';
import DropDown from '../../components/DropDown';

import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../navigation/AuthProvider';
import Datetime from '../../components/Datetime';

const useMountedState = () => {
	const mountedRef = useRef(false);
	const isMounted = useCallback(() => mountedRef.current, []);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, [isMounted]);

	return isMounted;
};

const AddAsset = ({ navigation }) => {
	let isMounted = useMountedState();
	const { user } = useContext(AuthContext);

	const [category, setCategory] = useState('-- select option --');
	const [type, setType] = useState('-- select option --');
	const [product, setProduct] = useState('-- select option --');
	const [vendor, setVendor] = useState('-- select option --');
	const [name, setName] = useState('');
	const [serial, setSerial] = useState('');
	const [price, setPrice] = useState('');
	const [location, setLocation] = useState('-- select option --');
	const [purchaseDate, setPurchaseDate] = useState('');
	const [purchaseType, setPurchaseType] = useState('-- select option --');
	const [warranty, setWarranty] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState({
		status: '',
		title: '',
		visible: false,
	});

	const [savedLoc, setSavedLoc] = useState([]);
	const [savedProd, setSavedProd] = useState([]);
	const [savedVen, setSavedVen] = useState([]);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		});

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	const uploadImage = async () => {
		var storage = firebase.storage();

		const uploadedUri = image;

		const response = await fetch(uploadedUri);
		const blob = await response.blob();

		let filename = uploadedUri.substring(uploadedUri.lastIndexOf('/') + 1);

		const extension = filename.split('.').pop();
		const name = filename.split('.').splice(0, -1).join('.');
		filename = name + Date.now() + '.' + extension;

		const storageRef = storage.ref(`Assets/${filename}`);

		const task = storageRef.put(blob);
		task.on('state_changed', (taskSnapshot) => {
			console.log(
				Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
					100
			);
		});

		try {
			await task;
			const url = await storageRef.getDownloadURL();
			return url;
		} catch (e) {
			return null;
		}
	};

	const submitAssetData = async () => {
		if (
			image !== null &&
			category !== '-- select option --' &&
			type !== '-- select option --' &&
			product !== '-- select option --' &&
			vendor !== '-- select option --' &&
			name !== '' &&
			serial !== '' &&
			price !== '' &&
			warranty !== ''
		) {
			if (isMounted()) setLoading(true);
			try {
				const imageUrl = await uploadImage();

				firebase
					.firestore()
					.collection('Assets')
					.add({
						Category: category,
						Type: type,
						Product: product,
						Vendor: vendor,
						AssetName: name,
						SerialNumber: serial,
						Price: price,
						Location: location,
						PurchaseDate: purchaseDate,
						WarrantyDate: warranty,
						PurchaseType: purchaseType,
						Description: description,
						Image: imageUrl,
						Assigned: '',
						CreatetBy: user.uid,
						CreatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
					})
					.then(() => {
						if (isMounted()) {
							setImage(null);
							setCategory('-- select option --');
							setType('-- select option --');
							setProduct('-- select option --');
							setVendor('-- select option --');
							setName('');
							setSerial('');
							setPrice('');
							setLocation('-- select option --');
							setPurchaseDate('');
							setWarranty('');
							setPurchaseType('');
							setDescription('');
							setLoading(false);
							setAlert({
								status: 'success',
								title: 'New Asset successfully added',
								visible: true,
							});
							navigation.popToTop();
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
		} else {
			if (isMounted())
				setAlert({
					status: 'error',
					title: 'Please fill all the fields and upload an Image',
					visible: true,
				});
		}
	};

	const getProducts = async () => {
		const list = [];
		await firebase
			.firestore()
			.collection('Products')
			.get()
			.then((query) => {
				query.forEach((document) => {
					if (document.exists) {
						const { ProductName } = document.data();
						list.push({
							title: ProductName,
						});
					}
				});
				if (isMounted()) {
					setSavedProd(list);
				}
			});
	};

	const getVendors = async () => {
		const list = [];
		await firebase
			.firestore()
			.collection('Vendors')
			.get()
			.then((query) => {
				query.forEach((document) => {
					if (document.exists) {
						const { Vendor } = document.data();
						list.push({
							title: Vendor,
						});
					}
				});
				if (isMounted()) {
					setSavedVen(list);
				}
			});
	};

	const getLocations = async () => {
		const list = [];
		await firebase
			.firestore()
			.collection('Locations')
			.get()
			.then((query) => {
				query.forEach((document) => {
					if (document.exists) {
						const { Office } = document.data();
						list.push({
							title: Office,
						});
					}
				});
				if (isMounted()) {
					setSavedLoc(list);
				}
			});
	};

	useEffect(() => {
		getProducts();
		getVendors();
		getLocations();
	}, [isMounted]);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar statusbarStyle='light-content' backgroundColor={Colors.dark} />
			<ScrollView
				showsVerticalScrollIndicator={false}
				nestedScrollEnabled={true}
				contentContainerStyle={{
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: Colors.white,
					paddingTop: 5,
				}}
			>
				<Imagebackground
					image={image}
					placeholder={
						'https://strykerslev.com/wp-content/uploads/2021/05/noPhoto.png'
					}
					onPress={() => pickImage()}
				/>

				<DropDown
					label={'Product Category *'}
					options={[
						{
							title: 'Hardware',
						},
						{
							title: 'Software',
						},
						{
							title: 'Others',
						},
					]}
					selected={(e) => setCategory(e)}
					value={category}
				/>

				<DropDown
					label={'Product Type *'}
					options={[
						{
							title: 'Computers',
						},
						{
							title: 'Removable Media',
						},
						{
							title: 'Peripherals',
						},
						{
							title: 'Network Assets',
						},
						{
							title: 'Office Accessories',
						},
						{
							title: 'Application software',
						},
						{
							title: 'System software',
						},
						{
							title: 'Others',
						},
					]}
					selected={(e) => setType(e)}
					value={type}
				/>

				<DropDown
					label={'Product *'}
					options={savedProd}
					selected={(e) => setProduct(e)}
					value={product}
				/>

				<DropDown
					label={'Vendor *'}
					options={savedVen}
					selected={(e) => setVendor(e)}
					value={vendor}
				/>

				<LabelInput
					label={'Asset Name *'}
					onChangeText={(e) => setName(e)}
					placeholder={'Acer'}
					keyboard={'default'}
					value={name}
				/>

				<LabelInput
					label={'Serial Number *'}
					onChangeText={(e) => setSerial(e)}
					placeholder={'ABC123Z456'}
					keyboard={'default'}
					value={serial}
				/>

				<LabelInput
					label={'Price (R) *'}
					onChangeText={(e) => setPrice(e)}
					placeholder={'24,999'}
					keyboard={'number-pad'}
					value={price}
				/>

				<DropDown
					label={'Location'}
					options={savedLoc}
					selected={(e) => setLocation(e)}
					value={location}
				/>

				<Datetime
					label={'Purchase date'}
					mode={'date'}
					selected={(e) => setPurchaseDate(e)}
				/>

				<Datetime
					label={'Warranty Expiry Date *'}
					mode={'date'}
					selected={(e) => setWarranty(e)}
					minDate={new Date()}
				/>

				<DropDown
					label={'Purchase Type'}
					options={[
						{
							title: 'Owned',
						},
						{
							title: 'Rented',
						},
						{
							title: 'Leased',
						},
						{
							title: 'Subscription',
						},
					]}
					selected={(e) => setPurchaseType(e)}
					value={purchaseType}
				/>

				<LabelInput
					label={'Description'}
					onChangeText={(e) => setDescription(e)}
					placeholder={'Brief Description'}
					keyboard={'default'}
					value={description}
				/>

				<Button title={'Submit'} onPress={() => submitAssetData()} />
				<Loading loading={loading} />
				<CustomAlert
					visible={alert.visible}
					status={alert.status}
					title={alert.title}
					onClose={() => setAlert({ ...alert, visible: false })}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default AddAsset;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
