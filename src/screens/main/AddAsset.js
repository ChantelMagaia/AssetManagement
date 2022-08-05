import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import React, {
	useContext,
	useState,
	useEffect,
	useRef,
	useCallback,
} from 'react';
import { Colors } from '../../utils/Style';
import Imagebackground from '../../components/Imagebackground';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import CustomAlert from '../../components/CustomAlert';

import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../navigation/AuthProvider';

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

const AddAsset = () => {
	let isMounted = useMountedState();
	const { user } = useContext(AuthContext);

	const [code, setCode] = useState('');
	const [name, setName] = useState('');
	const [brand, setBrand] = useState('');
	const [model, setModel] = useState('');
	const [type, setType] = useState('');
	const [maintance, setDate] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState({
		status: '',
		title: '',
		visible: false,
	});

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
			name !== '' &&
			code !== '' &&
			brand !== '' &&
			model !== '' &&
			type !== '' &&
			maintance !== '' &&
			image !== null
		) {
			if (isMounted()) setLoading(true);
			try {
				const imageUrl = await uploadImage();

				firebase
					.firestore()
					.collection('Assets')
					.add({
						Name: name,
						Barcode: code,
						Brand: brand,
						Model: model,
						Type: type,
						Maintance: maintance,
						Description: description,
						Image: imageUrl,
						Assign: '',
						AssignDay: '',
						ReturnedDay: '',
						CreatetBy: user.uid,
						CreatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
					})
					.then(() => {
						if (isMounted()) {
							setImage(null);
							setCode('');
							setName('');
							setBrand('');
							setModel('');
							setType('');
							setDate('');
							setDescription('');
							setLoading(false);
							setAlert({
								status: 'success',
								title: 'New employee successfully added to the system',
								visible: true,
							});
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
	return (
		<SafeAreaView style={styles.container}>
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
				<Input
					icon={'laptop'}
					onChangeText={(e) => setName(e)}
					placeholder={'Asset Name'}
					keyboard={'default'}
					value={name}
				/>
				<Input
					icon={'barcode'}
					onChangeText={(e) => setCode(e)}
					placeholder={'Servive Tag'}
					keyboard={'default'}
					value={code}
				/>
				<Input
					icon={'cogs'}
					onChangeText={(e) => setBrand(e)}
					placeholder={'Asset Brand'}
					keyboard={'default'}
					value={brand}
				/>
				<Input
					icon={'text'}
					onChangeText={(e) => setModel(e)}
					placeholder={'Asset Model'}
					keyboard={'default'}
					value={model}
				/>
				<Input
					icon={'shape-outline'}
					onChangeText={(e) => setType(e)}
					placeholder={'Asset Type'}
					keyboard={'default'}
					value={type}
				/>
				<Input
					icon={'card-text-outline'}
					onChangeText={(e) => setDescription(e)}
					placeholder={'Asset Description'}
					keyboard={'default'}
					value={description}
				/>
				<Input
					icon={'calendar-range'}
					onChangeText={(e) => setDate(e)}
					placeholder={'Maintenance Due'}
					keyboard={'default'}
					value={maintance}
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
