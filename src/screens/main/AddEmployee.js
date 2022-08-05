import React, {
	useContext,
	useState,
	useEffect,
	useRef,
	useCallback,
} from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
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

const AddEmployee = () => {
	let isMounted = useMountedState();
	const { user } = useContext(AuthContext);

	const [name, setName] = useState('');
	const [employeeNumber, setEmpNum] = useState('');
	const [position, setPosition] = useState('');
	const [department, setDepartment] = useState('');
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
			if (isMounted()) setImage(result.uri);
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

		const storageRef = storage.ref(`Employees/${filename}`);

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
			console.log(e);
			return null;
		}
	};

	const submitEmpData = async () => {
		if (
			name !== '' &&
			employeeNumber !== '' &&
			position !== '' &&
			department !== '' &&
			image !== null
		) {
			if (isMounted()) setLoading(true);
			try {
				const imageUrl = await uploadImage();

				firebase
					.firestore()
					.collection('Employees')
					.add({
						FullName: name,
						EmpNumber: employeeNumber,
						Position: position,
						Department: department,
						Image: imageUrl,
						CreatetBy: user.uid,
						CreatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
					})
					.then(() => {
						if (isMounted()) {
							setImage(null);
							setName('');
							setEmpNum('');
							setPosition('');
							setDepartment('');
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
						'https://coenterprises.com.au/wp-content/uploads/2018/02/male-placeholder-image.jpeg'
					}
					onPress={() => pickImage()}
				/>
				<Input
					icon={'account-outline'}
					onChangeText={(e) => setName(e)}
					placeholder={'Employee Name'}
					keyboard={'default'}
					value={name}
				/>
				<Input
					icon={'identifier'}
					onChangeText={(e) => setEmpNum(e)}
					placeholder={'Employee Number'}
					keyboard={'default'}
					value={employeeNumber}
				/>
				<Input
					icon={'account-tie'}
					onChangeText={(e) => setPosition(e)}
					placeholder={'Position'}
					keyboard={'default'}
					value={position}
				/>
				<Input
					icon={'domain'}
					onChangeText={(e) => setDepartment(e)}
					placeholder={'Department'}
					keyboard={'default'}
					value={department}
				/>

				<Button title={'Submit'} onPress={() => submitEmpData()} />
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

export default AddEmployee;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
