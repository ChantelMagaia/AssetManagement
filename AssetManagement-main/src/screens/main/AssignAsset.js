import { SafeAreaView, StyleSheet, ScrollView, StatusBar } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Colors } from '../../utils/Style';
import Image from '../../components/ImageView';
import Flexshow from '../../components/Flexshow';
import Button from '../../components/Button';
import AssignModal from '../../components/AssignModal';
import Loading from '../../components/Loading';
import CustomAlert from '../../components/CustomAlert';
import DescriptionBox from '../../components/Description';

import firebase from 'firebase';

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

const AssignAsset = ({ route, navigation }) => {
	let isMounted = useMountedState();
	const {
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
	} = route.params;

	const [showAssign, setShowAssign] = useState(false);
	const [assigned, setAssigned] = useState(false);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState({
		status: '',
		title: '',
		visible: false,
	});

	const onAssignAsset = (userId, name, empNum) => {
		try {
			setLoading(true);
			firebase
				.firestore()
				.collection('Assets')
				.doc(assetID)
				.update({
					Assigned: {
						Id: userId,
						Name: name,
						EmpNum: empNum,
					},
				})
				.then(() => {
					setShowAssign(false);
					setAssigned(true);
					setLoading(false);
					setAlert({
						status: 'success',
						title: 'Asset successfully assigned',
						visible: true,
					});
					navigation.navigate('Assets');
				});
		} catch (error) {
			setLoading(false);
			setAlert({
				status: 'error',
				title: error,
				visible: true,
			});
		}
	};

	const RemoveAssign = () => {
		setAssigned(false);
	};

	useEffect(() => {
		if (Assigned !== '') {
			if (isMounted()) setAssigned(true);
		} else {
			if (isMounted()) setAssigned(false);
		}
	}, [Assigned, isMounted]);

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
				<Image image={image} />
				<Flexshow label={'Asset Category'} value={Category} />
				<Flexshow label={'Asset Type'} value={Type} />
				<Flexshow label={'Asset Name'} value={AssetName} />
				<Flexshow label={'Product'} value={Product} />
				<Flexshow label={'Vendor'} value={Vendor} />
				<Flexshow
					label={'Asset Unique No.'}
					value={assetID.slice(0, 10) + (SerialNumber.length > 10 ? '...' : '')}
				/>
				<Flexshow label={'Asset Price'} value={Price} />
				<Flexshow
					label={'Purchase Date'}
					value={PurchaseDate.toDate().toDateString()}
				/>
				<Flexshow label={'Purchase Type'} value={PurchaseType} />
				<Flexshow
					label={'Warranty Expiration Date'}
					value={WarrantyDate.toDate().toDateString()}
				/>
				<Flexshow
					label={'Asset State'}
					value={Assigned !== '' ? 'Operational' : 'Recently Added'}
				/>
				<Flexshow
					label={'Assigned To'}
					value={Assigned !== '' ? Assigned.Name : 'Not Assigned'}
				/>
				<Flexshow label={'Location'} value={Location} />

				<DescriptionBox
					label={'Asset Description'}
					value={Description !== '' ? Description : 'No Description Provided'}
				/>

				{!assigned && (
					<Button title={'Assign Asset'} onPress={() => setShowAssign(true)} />
				)}

				{assigned && (
					<Button title={'Remove Asset Owner'} onPress={() => RemoveAssign()} />
				)}

				<AssignModal
					visible={showAssign}
					onClose={() => setShowAssign(false)}
					onSubmit={onAssignAsset}
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

export default AssignAsset;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
