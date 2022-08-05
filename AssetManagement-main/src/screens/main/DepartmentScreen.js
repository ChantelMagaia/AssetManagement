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

const DepartmentScreen = ({ navigation }) => {
	let isMounted = useMountedState();
	const [department, setDepartment] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const getListOfDepartment = async () => {
		const list = [];
		await firebase
			.firestore()
			.collection('Department')
			.get()
			.then((query) => {
				query.forEach((document) => {
					if (document.exists) {
						const { Department, Contact, ContactEmail, ContactPhone } =
							document.data();
						list.push({
							id: document.id,
							Department,
							Contact,
							ContactEmail,
							ContactPhone,
						});
					}
				});
				if (isMounted()) {
					setIsFetching(false);
					setDepartment(list);
				}
			});
	};

	const Goto = (screen, departmentID, Contact, ContactEmail, ContactPhone) => {
		navigation.navigate(screen, {
			departmentID,
			Contact,
			ContactEmail,
			ContactPhone,
		});
	};

	const renderItem = ({ item }) => {
		return (
			<View>
				<Vendors
					Vendor={item.Department}
					Person={item.Contact}
					Email={item.ContactEmail}
					Phone={item.ContactPhone}
					onPress={() =>
						Goto(
							'Department Details',
							item.id,
							item.Department,
							item.Contact,
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
		getListOfDepartment();
	};

	useEffect(() => {
		getListOfDepartment();
	}, [isMounted]);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar statusbarStyle='light-content' backgroundColor={Colors.dark} />
			<Heading title={`${department.length} department`} />
			<FlatList
				data={department}
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
						title='No Department Found'
						btnText={'Add Department'}
						onPress={() => onNavigate('Add Department')}
					/>
				}
			/>
		</SafeAreaView>
	);
};

export default DepartmentScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
