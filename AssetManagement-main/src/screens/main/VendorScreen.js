import {
	StyleSheet,
	SafeAreaView,
	View,
	FlatList,
	StatusBar,
} from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Colors } from '../../utils/Style';
import Heading from '../../components/Heading';
import Vendors from '../../components/Vendors';

import firebase from 'firebase';
import Empty from '../../components/Empty';

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

const VendorScreen = ({ navigation }) => {
	let isMounted = useMountedState();
	const [vendors, setvendors] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const getListOfVendors = async () => {
		const list = [];
		await firebase
			.firestore()
			.collection('Vendors')
			.get()
			.then((query) => {
				query.forEach((document) => {
					if (document.exists) {
						const { Vendor, ContactPerson, ContactEmail, ContactPhone } =
							document.data();
						list.push({
							id: document.id,
							Vendor,
							ContactPerson,
							ContactEmail,
							ContactPhone,
						});
					}
				});
				if (isMounted()) {
					setIsFetching(false);
					setvendors(list);
				}
			});
	};

	const Goto = (
		screen,
		VendorID,
		Vendor,
		ContactPerson,
		ContactEmail,
		ContactPhone
	) => {
		navigation.navigate(screen, {
			VendorID,
			Vendor,
			ContactPerson,
			ContactEmail,
			ContactPhone,
		});
	};

	const renderItem = ({ item }) => {
		return (
			<View>
				<Vendors
					Vendor={item.Vendor}
					Person={item.ContactPerson}
					Email={item.ContactEmail}
					Phone={item.ContactPhone}
					onPress={() =>
						Goto(
							'Vendor Details',
							item.id,
							item.Vendor,
							item.ContactPerson,
							item.ContactEmail,
							item.ContactPhone
						)
					}
				/>
			</View>
		);
	};

	const onNavigate = (screen) => {
		navigation.navigate(screen);
	};

	const onRefresh = () => {
		setIsFetching(true);
		getListOfVendors();
	};

	useEffect(() => {
		getListOfVendors();
	}, [isMounted]);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar statusbarStyle='light-content' backgroundColor={Colors.dark} />
			<Heading title={`${vendors.length} Vendors`} />
			<FlatList
				data={vendors}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				onRefresh={onRefresh}
				refreshing={isFetching}
				contentContainerStyle={{
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: Colors.white,
					paddingTop: 5,
				}}
				ListEmptyComponent={
					<Empty
						title='No Vendors Found'
						btnText={'Add New Location'}
						onPress={() => onNavigate('Add Location')}
					/>
				}
			/>
		</SafeAreaView>
	);
};

export default VendorScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
