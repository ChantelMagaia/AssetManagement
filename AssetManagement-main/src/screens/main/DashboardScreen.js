import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	View,
	ScrollView,
	StatusBar,
	RefreshControl,
} from 'react-native';
import Heading from '../../components/Heading';
import { Colors, windowHeight, windowWidth } from '../../utils/Style';
import WideButton from '../../components/WideButton';
import Activity from '../../components/Activity';
import GridBox from '../../components/GridBox';

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

const DashboardScreen = ({ navigation }) => {
	let isMounted = useMountedState();
	const [assets, setAsset] = useState([]);
	const [employees, setEmployee] = useState([]);
	const [assigned, setAssigned] = useState();
	const [unassigned, setUnassigned] = useState();
	const [vendors, setVendor] = useState([]);
	const [products, setProduct] = useState([]);
	const [location, setLocation] = useState([]);
	const [department, setDepartment] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const getEmployees = async () => {
		const list = [];
		await firebase
			.firestore()
			.collection('Employees')
			.get()
			.then((query) => {
				query.forEach((document) => {
					if (document.exists) {
						const { FullName } = document.data();
						list.push({
							title: FullName,
						});
					}
				});
				if (isMounted()) {
					setEmployee(list);
				}
			});
	};

	const getAssets = async () => {
		var inStore = 0;
		const list = [];
		await firebase
			.firestore()
			.collection('Assets')
			.get()
			.then((query) => {
				query.forEach((document) => {
					if (document.exists) {
						const { AssetName } = document.data();
						if (document.data().Assigned === '') {
							inStore = inStore + 1;
						}
						list.push({
							title: AssetName,
						});
					}
				});
				if (isMounted()) {
					let count =
						Object.keys(list).length > 0 ? Object.keys(list).length : 0;

					setAsset(list);
					setAssigned(count - inStore);
					setUnassigned(inStore);
				}
			});
	};

	const getVendors = async () => {
		const list = [];
		await firebase
			.firestore()
			.collection('Vendors')
			.get()
			.then((query) => {
				query.forEach((document) => {
					if (document.exists) {
						const { Vendor } = document.data();
						list.push({
							title: Vendor,
						});
					}
				});
				if (isMounted()) {
					setVendor(list);
				}
			});
	};

	const getProduct = async () => {
		const list = [];
		await firebase
			.firestore()
			.collection('Products')
			.get()
			.then((query) => {
				query.forEach((document) => {
					if (document.exists) {
						const { ProductName } = document.data();
						list.push({
							title: ProductName,
						});
					}
				});
				if (isMounted()) {
					setProduct(list);
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
					setLocation(list);
				}
			});
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
					setDepartment(list);
				}
			});
	};

	const Goto = (screen) => {
		navigation.navigate(screen);
	};

	const onRefresh = () => {
		setRefreshing(true);
		setLoading(!loading);
		setRefreshing(false);
	};

	useEffect(() => {
		getEmployees();
		getAssets();
		getVendors();
		getProduct();
		getLocations();
		getDepartment();

		navigation.addListener('focus', () => setLoading(!loading));
	}, [navigation, isMounted, loading]);

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
					width: windowWidth,
				}}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						colors={[Colors.blue, Colors.white, Colors.dark]}
					/>
				}
			>
				<View style={styles.gridView}>
					<GridBox
						shade={'#77cbdf'}
						icon={'package-variant'}
						title={'Assets'}
						number={assets.length}
						onPress={() => Goto('AssetsStackScreens')}
					/>
					<GridBox
						shade={'#86d1e2'}
						icon={'account-group-outline'}
						title={'Employees'}
						number={employees.length}
						onPress={() => Goto('EmployeeStackScreen')}
					/>
				</View>
				<View style={styles.gridView}>
					<GridBox
						shade={'#95d6e6'}
						icon={'package-variant'}
						title={'Assigned'}
						number={assigned}
						onPress={() => Goto('AssetsStackScreens')}
					/>
					<GridBox
						shade={'#a4dce9'}
						icon={'package-variant-closed'}
						title={'Unassigned'}
						number={unassigned}
						onPress={() => Goto('AssetsStackScreens')}
					/>
				</View>
				<View style={styles.gridView}>
					<GridBox
						shade={'#b4e2ed'}
						icon={'store'}
						title={'Vendors'}
						number={vendors.length}
						onPress={() => Goto('VendorStackScreens')}
					/>
					<GridBox
						shade={'#c3e8f1'}
						icon={'shopping'}
						title={'Products'}
						number={products.length}
						onPress={() => Goto('ProductStackScreen')}
					/>
				</View>

				<View>
					<Heading title={'Frequent Actions'} />
					<WideButton
						shade={'#77cbdf'}
						icon={'account-plus-outline'}
						title={'Add Employee'}
						onPress={() => Goto('Add Employee')}
					/>
					<WideButton
						shade={'#95d6e6'}
						icon={'package-variant'}
						title={'Add Asset'}
						onPress={() => Goto('Add Asset')}
					/>
					<WideButton
						shade={'#b4e2ed'}
						icon={'qrcode-scan'}
						title={'Scan Product'}
						onPress={() => Goto('ScanStackScreen')}
					/>
				</View>

				<View style={styles.latest}>
					<Heading title={'Latest System Activity'} />
					<Activity
						action={'Asset Added By'}
						time={'26-07-2022 | 14:45'}
						user={'John Doe'}
						prodId={'TD143445676'}
						prodName={'Dell Laptop '}
					/>
					<Activity
						action={'Asset Updated By'}
						time={'26-07-2022 | 14:35'}
						user={'John Doe'}
						prodId={'TD143445676'}
						prodName={'HP Laptop '}
					/>
					<Activity
						action={'Asset Added By'}
						time={'26-07-2022 | 14:22'}
						user={'John Doe'}
						prodId={'TD21145676'}
						prodName={'Dell Laptop '}
					/>
				</View>

				<View style={styles.gridView}>
					<GridBox
						shade={'#77cbdf'}
						icon={'map-marker-multiple-outline'}
						title={'Locations'}
						number={location.length}
						onPress={() => Goto('Locations')}
					/>
					<GridBox
						shade={'#86d1e2'}
						icon={'office-building-outline'}
						title={'Departments'}
						number={department.length}
						onPress={() => Goto('Departments')}
					/>
				</View>

				<View>
					<Heading title={'Other Actions'} />
					<WideButton
						shade={'#77cbdf'}
						icon={'store'}
						title={'Add Vendor'}
						onPress={() => Goto('Add Vendor')}
					/>
					<WideButton
						shade={'#95d6e6'}
						icon={'shopping'}
						title={'Add Product'}
						onPress={() => Goto('Add Product')}
					/>
					<WideButton
						shade={'#a4dce9'}
						icon={'map-marker-plus-outline'}
						title={'Add Locations'}
						onPress={() => Goto('Add Location')}
					/>
					<WideButton
						shade={'#b4e2ed'}
						icon={'office-building-outline'}
						title={'Add Department'}
						onPress={() => Goto('Add Department')}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default DashboardScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: Colors.white,
		paddingTop: 5,
	},
	gridView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: windowWidth * 0.94,
		marginBottom: 2,
	},
	latest: {
		height: windowHeight / 3,
	},
});
