import React, {
	useContext,
	useState,
	useEffect,
	useRef,
	useCallback,
} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Colors } from '../../utils/Style';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import CustomAlert from '../../components/CustomAlert';
import LabelInput from '../../components/LabelInput';

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

const AddDepartment = () => {
	let isMounted = useMountedState();
	const { user } = useContext(AuthContext);
	const [department, setDepartment] = useState('');
	const [contact, setContact] = useState('');
	const [contactEmail, setContactEmail] = useState('');
	const [contactPhone, setContactPhone] = useState('');
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState({
		status: '',
		title: '',
		visible: false,
	});

	const submitDepartment = async () => {
		if (department !== '' && contact !== '') {
			if (isMounted()) setLoading(true);
			try {
				firebase
					.firestore()
					.collection('Department')
					.add({
						Department: department,
						Contact: contact,
						ContactEmail: contactEmail,
						ContactPhone: contactPhone,
						CreatetBy: user.uid,
						CreatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
					})
					.then(() => {
						if (isMounted()) {
							setDepartment('');
							setContact('');
							setContactEmail('');
							setContactPhone('');
							setLoading(false);
							setAlert({
								status: 'success',
								title: 'New Department successfully added',
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
					title: 'Please fill all required the fields',
					visible: true,
				});
		}
	};

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
					label={'Department Name *'}
					onChangeText={(e) => setDepartment(e)}
					placeholder={'Sales'}
					keyboard={'default'}
					value={department}
				/>

				<LabelInput
					label={'Contact Person *'}
					onChangeText={(e) => setContact(e)}
					placeholder={'Jane Doe'}
					keyboard={'default'}
					value={contact}
				/>

				<LabelInput
					label={'Contact Person Email'}
					onChangeText={(e) => setContactEmail(e)}
					placeholder={'janedoe@gmail.com'}
					keyboard={'email-address'}
					value={contactEmail}
				/>

				<LabelInput
					label={'Contact Person Phone'}
					onChangeText={(e) => setContactPhone(e)}
					placeholder={'011 123 1100'}
					keyboard={'phone-pad'}
					value={contactPhone}
				/>

				<Button title={'Submit'} onPress={() => submitDepartment()} />
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

export default AddDepartment;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
