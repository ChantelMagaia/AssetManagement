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

const AddProduct = () => {
	let isMounted = useMountedState();
	const { user } = useContext(AuthContext);
	const [category, setCategory] = useState('-- select option --');
	const [type, setType] = useState('-- select option --');
	const [name, setName] = useState('');
	const [manufacture, setManufacture] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState({
		status: '',
		title: '',
		visible: false,
	});

	const submitProduct = async () => {
		if (
			name !== '' &&
			category !== '-- select option --' &&
			type !== '-- select option --' &&
			manufacture !== ''
		) {
			if (isMounted()) setLoading(true);
			try {
				firebase
					.firestore()
					.collection('Products')
					.add({
						Category: category,
						Type: type,
						ProductName: name,
						Manufacture: manufacture,
						Description: description,
						CreatetBy: user.uid,
						CreatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
					})
					.then(() => {
						if (isMounted()) {
							setCategory('-- select option --');
							setType('-- select option --');
							setName('');
							setManufacture('');
							setDescription('');
							setLoading(false);
							setAlert({
								status: 'success',
								title: 'New Product successfully added',
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

				<LabelInput
					label={'Product Name *'}
					onChangeText={(e) => setName(e)}
					placeholder={'Adobe Photoshop CC'}
					keyboard={'default'}
					value={name}
				/>

				<LabelInput
					label={'Manufacture *'}
					onChangeText={(e) => setManufacture(e)}
					placeholder={'Adobe'}
					keyboard={'default'}
					value={manufacture}
				/>
				<LabelInput
					label={'Description'}
					onChangeText={(e) => setDescription(e)}
					placeholder={'Brief Description'}
					keyboard={'default'}
					value={description}
				/>

				<Button title={'Submit'} onPress={() => submitProduct()} />
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

export default AddProduct;

const styles = StyleSheet.create({});
