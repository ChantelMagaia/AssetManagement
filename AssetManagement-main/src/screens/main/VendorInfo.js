import { SafeAreaView, StyleSheet, ScrollView, StatusBar } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Colors } from '../../utils/Style';
import Loading from '../../components/Loading';
import CustomAlert from '../../components/CustomAlert';
import Flexshow from '../../components/Flexshow';
import FlexButtons from '../../components/FlexButtons';

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

const VendorInfo = ({ route }) => {
	let isMounted = useMountedState();
	const { VendorID, Vendor, ContactPerson, ContactEmail, ContactPhone } =
		route.params;

	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState({
		status: '',
		title: '',
		visible: false,
	});

	const performAction = (action) => {
		console.log(action);
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
					paddingBottom: 10,
				}}
			>
				<Flexshow label={'Vendor'} value={Vendor} />
				<Flexshow label={'Contant Person'} value={ContactPerson} />
				<Flexshow label={'Contant Email'} value={ContactEmail} />
				<Flexshow label={'Contant Phone'} value={ContactPhone} />

				<FlexButtons
					data={[
						{
							icon: 'phone-outline',
							value: ContactPhone,
							action: 'Call',
						},
						{
							icon: 'email-outline',
							value: ContactEmail,
							action: 'Email',
						},
						{
							icon: 'store-edit-outline',
							value: VendorID,
							action: 'Edit',
						},
						{
							icon: 'delete-outline',
							value: VendorID,
							action: 'Delete',
						},
					]}
					onPress={(e) => performAction(e)}
				/>
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

export default VendorInfo;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
