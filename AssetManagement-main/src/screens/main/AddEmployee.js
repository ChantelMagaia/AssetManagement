import React, {
	useContext,
	useState,
	useEffect,
	useRef,
	useCallback,
} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Colors } from '../../utils/Style';
import LabelInput from '../../components/LabelInput';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import CustomAlert from '../../components/CustomAlert';
import DropDown from '../../components/DropDown';

import firebase from 'firebase';
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

const AddEmployee = ({ navigation }) => {
	let isMounted = useMountedState();
	const { user } = useContext(AuthContext);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [employeeNumber, setEmpNum] = useState('');
	const [role, setRole] = useState('-- select option --');
	const [department, setDepartment] = useState('-- select option --');
	const [location, setLocation] = useState('-- select option --');
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState({
		status: '',
		title: '',
		visible: false,
	});

	const [savedDep, setSavedDep] = useState([]);
	const [savedLoc, setSavedLoc] = useState([]);

	const submitEmpData = async () => {
		if (
			name !== '' &&
			employeeNumber !== '' &&
			email !== '' &&
			role !== '' &&
			department !== ''
		) {
			if (isMounted()) setLoading(true);
			try {
				const password = '12345678';

				const config = {
					apiKey: 'AIzaSyCNsed9hQA51awc2u_mvKuG4k5P4OguLcg',
					authDomain: 'asset-management-app-1daa0.firebaseapp.com',
					projectId: 'asset-management-app-1daa0',
					storageBucket: 'asset-management-app-1daa0.appspot.com',
					messagingSenderId: '620565519527',
					appId: '1:620565519527:web:0e7bd0bc439a574b740f82',
				};

				var SecondaryApp = firebase.initializeApp(config, 'Secondary');

				await SecondaryApp.auth()
					.createUserWithEmailAndPassword(email, password)
					.then(() => {
						SecondaryApp.firestore()
							.collection('Employees')
							.doc(SecondaryApp.auth().currentUser.uid)
							.set({
								Name: name,
								EmpNumber: employeeNumber,
								Email: email,
								Phone: phone,
								Role: role,
								Department: department,
								Location: location,
								Image:
									'https://firebasestorage.googleapis.com/v0/b/asset-management-app-1daa0.appspot.com/o/Employees%2FAvatar.jpg?alt=media&token=d43695aa-162e-4fc0-be20-f3f5f2efc1f4',
								CreatetBy: user.uid,
								CreatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
							})
							.then(() => {
								if (isMounted()) {
									setName('');
									setEmpNum('');
									setEmail('');
									setPhone('');
									setRole('');
									setDepartment('');
									setLocation('');
									setLoading(false);
									setAlert({
										status: 'success',
										title: 'New Employee successfully added',
										visible: true,
									});
									SecondaryApp.auth().signOut();
									navigation.popToTop();
								}
							});
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
					title: 'Please fill all required the fields',
					visible: true,
				});
		}
	};

	const getDepartment = async () => {
		const list = [];
		await firebase
			.firestore()
			.collection('Department')
			.get()
			.then((query) => {
				query.forEach((document) => {
					if (document.exists) {
						const { Department } = document.data();
						list.push({
							title: Department,
						});
					}
				});
				if (isMounted()) {
					setSavedDep(list);
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
		getDepartment();
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
				<LabelInput
					label={'Employee Name *'}
					onChangeText={(e) => setName(e)}
					placeholder={'John Doe'}
					keyboard={'default'}
					value={name}
				/>
				<LabelInput
					label={'Employee Number *'}
					onChangeText={(e) => setEmpNum(e)}
					placeholder={'IT2022012'}
					keyboard={'default'}
					value={employeeNumber}
				/>
				<LabelInput
					label={'Employee Email **'}
					onChangeText={(e) => setEmail(e)}
					placeholder={'johndoe@gmail.com'}
					keyboard={'email-address'}
					value={email}
				/>
				<LabelInput
					label={'Employee Phone'}
					onChangeText={(e) => setPhone(e)}
					placeholder={'011 123 1100'}
					keyboard={'phone-pad'}
					value={phone}
				/>

				<DropDown
					label={'User Role *'}
					options={[
						{
							title: 'Admin',
						},
						{
							title: 'Employee',
						},
					]}
					selected={(e) => setRole(e)}
					value={role}
				/>

				<DropDown
					label={'Department *'}
					options={savedDep}
					selected={(e) => setDepartment(e)}
					value={department}
				/>

				<DropDown
					label={'Location'}
					options={savedLoc}
					selected={(e) => setLocation(e)}
					value={location}
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
