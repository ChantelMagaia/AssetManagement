import React from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { NativeBaseProvider } from 'native-base';

import { Colors, Fonts } from '../utils/Style';
import DrawerContent from '../components/DrawerContent';

import DashboardScreen from '../screens/main/DashboardScreen';
import VendorScreen from '../screens/main/VendorScreen';
import ProductScreen from '../screens/main/ProductScreen';
import EmployeeScreen from '../screens/main/EmployeeScreen';
import AssetScreen from '../screens/main/AssetScreen';
import ActivityScreen from '../screens/main/ActivityScreen';
import ScanScreen from '../screens/main/ScanScreen';
import LocationScreen from '../screens/main/LocationScreen';
import DepartmentScreen from '../screens/main/DepartmentScreen';

import AddEmployee from '../screens/main/AddEmployee';
import AddAsset from '../screens/main/AddAsset';
import EmployeeInfo from '../screens/main/EmployeeInfo';
import AssignAsset from '../screens/main/AssignAsset';
import AddVendor from '../screens/main/AddVendor';
import AddProduct from '../screens/main/AddProduct';
import AddDepartment from '../screens/main/AddDepartment';
import AddLocation from '../screens/main/AddLocation';
import VendorInfo from '../screens/main/VendorInfo';
import ProductInfo from '../screens/main/ProductInfo';

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const VendorStack = createStackNavigator();
const ProductStack = createStackNavigator();
const EmployeeStack = createStackNavigator();
const AssetStack = createStackNavigator();
const ScanStack = createStackNavigator();

const HomeStackScreens = ({ navigation }) => (
	<HomeStack.Navigator>
		<HomeStack.Screen
			name='Dashboard'
			component={DashboardScreen}
			options={{
				title: 'Dashboard',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.openDrawer()}
					>
						<Icons name='menu' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<HomeStack.Screen
			name='Assets'
			component={AssetScreen}
			options={{
				title: 'Assets',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Dashboard')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<HomeStack.Screen
			name='Employees'
			component={EmployeeScreen}
			options={{
				title: 'Employees',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Dashboard')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<HomeStack.Screen
			name='Vendors'
			component={VendorScreen}
			options={{
				title: 'Vendors',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Dashboard')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<HomeStack.Screen
			name='Products'
			component={ProductScreen}
			options={{
				title: 'Products',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Dashboard')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<HomeStack.Screen
			name='Locations'
			component={LocationScreen}
			options={{
				title: 'Locations',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Dashboard')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<HomeStack.Screen
			name='Departments'
			component={DepartmentScreen}
			options={{
				title: 'Departments',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Dashboard')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<HomeStack.Screen
			name='Add Employee'
			component={AddEmployee}
			options={{
				title: 'Add Employee',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Dashboard')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<HomeStack.Screen
			name='Add Asset'
			component={AddAsset}
			options={{
				title: 'Add Asset',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Dashboard')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<HomeStack.Screen
			name='Add Vendor'
			component={AddVendor}
			options={{
				title: 'Add Vendor',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Dashboard')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<HomeStack.Screen
			name='Add Product'
			component={AddProduct}
			options={{
				title: 'Add Product',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Dashboard')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<HomeStack.Screen
			name='Add Department'
			component={AddDepartment}
			options={{
				title: 'Add Department',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Dashboard')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<HomeStack.Screen
			name='Add Location'
			component={AddLocation}
			options={{
				title: 'Add Location',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Dashboard')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
	</HomeStack.Navigator>
);

const VendorStackScreens = ({ navigation }) => (
	<VendorStack.Navigator>
		<VendorStack.Screen
			name='Vendors'
			component={VendorScreen}
			options={{
				title: 'Vendors',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.openDrawer()}
					>
						<Icons name='menu' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<VendorStack.Screen
			name='Add Vendor'
			component={AddVendor}
			options={{
				title: 'Add Vendor',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Vendors')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<VendorStack.Screen
			name='Vendor Details'
			component={VendorInfo}
			options={{
				title: 'Vendor Details',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Vendors')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
	</VendorStack.Navigator>
);

const ProductStackScreens = ({ navigation }) => (
	<ProductStack.Navigator>
		<ProductStack.Screen
			name='Products'
			component={ProductScreen}
			options={{
				title: 'Products',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.openDrawer()}
					>
						<Icons name='menu' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<ProductStack.Screen
			name='Add Product'
			component={AddProduct}
			options={{
				title: 'Add Product',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Products')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<ProductStack.Screen
			name='Product Details'
			component={ProductInfo}
			options={{
				title: 'Product Details',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Products')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
	</ProductStack.Navigator>
);

const EmployeeStackScreens = ({ navigation }) => (
	<EmployeeStack.Navigator>
		<EmployeeStack.Screen
			name='Employees'
			component={EmployeeScreen}
			options={{
				title: 'Employees',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.openDrawer()}
					>
						<Icons name='menu' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<EmployeeStack.Screen
			name='Employee Info'
			component={EmployeeInfo}
			options={{
				title: 'Employee Info',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Employees')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
	</EmployeeStack.Navigator>
);

const AssetStackScreens = ({ navigation }) => (
	<AssetStack.Navigator>
		<AssetStack.Screen
			name='Assets'
			component={AssetScreen}
			options={{
				title: 'Assets',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.openDrawer()}
					>
						<Icons name='menu' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<AssetStack.Screen
			name='Asset Details'
			component={AssignAsset}
			options={{
				title: 'Asset Details',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Assets')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
	</AssetStack.Navigator>
);

const ScanStackScreens = ({ navigation }) => (
	<ScanStack.Navigator>
		<ScanStack.Screen
			name='Scan'
			component={ScanScreen}
			options={{
				title: 'Scan Product',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.openDrawer()}
					>
						<Icons name='menu' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<ScanStack.Screen
			name='Scanned Asset Details'
			component={AssignAsset}
			options={{
				title: 'Scanned Asset Details',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 55,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 16,
					marginTop: 5,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 5 }}
						onPress={() => navigation.navigate('Scan')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
	</ScanStack.Navigator>
);

const AppStack = () => {
	return (
		<NativeBaseProvider>
			<Drawer.Navigator
				drawerContent={(props) => <DrawerContent {...props} />}
				screenOptions={{
					drawerActiveBackgroundColor: Colors.dark,
					drawerActiveTintColor: Colors.blue,
					drawerInactiveTintColor: Colors.dark,
					drawerItemStyle: {
						marginLeft: -10,
						paddingLeft: 30,
						justifyContent: 'center',
						height: 60,
					},
					drawerLabelStyle: {
						fontFamily: Fonts.Regular,
						fontSize: 16,
					},
				}}
				useLegacyImplementation={true}
				initialRouteName='Dashboard'
			>
				<Drawer.Screen
					name='DashboardStackScreen'
					component={HomeStackScreens}
					options={{
						drawerIcon: ({ color }) => (
							<Icons
								name='view-grid-outline'
								size={20}
								color={color}
								style={{ marginBottom: 5, marginRight: -25 }}
							/>
						),
						title: 'Dashboard',
						header: () => null,
					}}
				/>
				<Drawer.Screen
					name='VendorStackScreens'
					component={VendorStackScreens}
					options={{
						drawerIcon: ({ color }) => (
							<Icons
								name='store-outline'
								size={20}
								color={color}
								style={{ marginBottom: 5, marginRight: -25 }}
							/>
						),
						title: 'Vendors',
						header: () => null,
					}}
				/>
				<Drawer.Screen
					name='EmployeeStackScreen'
					component={EmployeeStackScreens}
					options={{
						drawerIcon: ({ color }) => (
							<Feather
								name='users'
								size={20}
								color={color}
								style={{ marginBottom: 5, marginRight: -25 }}
							/>
						),
						title: 'Employees',
						header: () => null,
					}}
				/>
				<Drawer.Screen
					name='ProductStackScreen'
					component={ProductStackScreens}
					options={{
						drawerIcon: ({ color }) => (
							<Feather
								name='shopping-bag'
								size={20}
								color={color}
								style={{ marginBottom: 5, marginRight: -25 }}
							/>
						),
						title: 'Products',
						header: () => null,
					}}
				/>
				<Drawer.Screen
					name='AssetsStackScreens'
					component={AssetStackScreens}
					options={{
						drawerIcon: ({ color }) => (
							<Icons
								name='archive-outline'
								size={20}
								color={color}
								style={{ marginBottom: 5, marginRight: -25 }}
							/>
						),
						title: 'Assets',
						header: () => null,
					}}
				/>
				<Drawer.Screen
					name='ScanStackScreen'
					component={ScanStackScreens}
					options={{
						drawerIcon: ({ color }) => (
							<Icons
								name='barcode-scan'
								size={20}
								color={color}
								style={{ marginBottom: 5, marginRight: -25 }}
							/>
						),
						title: 'Scan Product',
						header: () => null,
					}}
				/>
				<Drawer.Screen
					name='System Activity'
					component={ActivityScreen}
					options={{
						drawerIcon: ({ color }) => (
							<Feather
								name='server'
								size={20}
								color={color}
								style={{ marginBottom: 5, marginRight: -25 }}
							/>
						),
						title: 'System Activity',
						headerTitleAlign: 'center',
						headerTitleStyle: {
							color: Colors.dark,
							fontFamily: Fonts.Semibold,
							fontSize: 16,
						},
						headerTintColor: Colors.dark,
						headerStyle: {
							backgroundColor: Colors.blue,
							shadowColor: Colors.light,
							elevation: 10,
						},
					}}
				/>
			</Drawer.Navigator>
		</NativeBaseProvider>
	);
};

export default AppStack;
