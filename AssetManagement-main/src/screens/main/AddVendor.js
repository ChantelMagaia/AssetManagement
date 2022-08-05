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

import firebase from 'firebase';
import { AuthContext } from '../../navigation/AuthProvider';
import LabelInput from '../../components/LabelInput';

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

const AddVendor = () => {
	let isMounted = useMountedState();
	const { user } = useContext(AuthContext);
	const [vendor, setVendor] = useState('');
	const [contact, setContact] = useState('');
	const [contactEmail, setContactEmail] = useState('');
	const [contactPhone, setContactPhone] = useState('');
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState({
		status: '',
		title: '',
		visible: false,
	});

	const submitVendor = async () => {
		if (vendor !== '') {
			if (isMounted()) setLoading(true);
			try {
				firebase
					.firestore()
					.collection('Vendors')
					.add({
						Vendor: vendor,
						ContactPerson: contact,
						ContactEmail: contactEmail,
						ContactPhone: contactPhone,
						CreatetBy: user.uid,
						CreatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
					})
					.then(() => {
						if (isMounted()) {
							setVendor('');
							setContact('');
							setContactEmail('');
							setContactPhone('');
							setLoading(false);
							setAlert({
								status: 'success',
								title: 'New Vendor successfully added to the system',
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
					label={'Vendor Name *'}
					onChangeText={(e) => setVendor(e)}
					placeholder={'Adobe'}
					keyboard={'default'}
					value={vendor}
				/>

				<LabelInput
					label={'Contact Person'}
					onChangeText={(e) => setContact(e)}
					placeholder={'Jane Doe'}
					keyboard={'default'}
					value={contact}
				/>

				<LabelInput
					label={'Contact Person Email'}
					onChangeText={(e) => setContactEmail(e)}
					placeholder={'janedoe@adobe.com'}
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

				<Button title={'Submit'} onPress={() => submitVendor()} />
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

export default AddVendor;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
