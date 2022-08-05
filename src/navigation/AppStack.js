import React from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { NativeBaseProvider } from 'native-base';

import { Colors, Fonts } from '../utils/Style';
import DrawerContent from '../components/DrawerContent';

import ActivityScreen from '../screens/main/ActivityScreen';
import AssetScreen from '../screens/main/AssetScreen';
import DashboardScreen from '../screens/main/DashboardScreen';
import EmployeeScreen from '../screens/main/EmployeeScreen';
import ScanScreen from '../screens/main/ScanScreen';

import AddEmployee from '../screens/main/AddEmployee';
import AddAsset from '../screens/main/AddAsset';
import EmployeeInfo from '../screens/main/EmployeeInfo';
import AssignAsset from '../screens/main/AssignAsset';

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const EmployeeStack = createStackNavigator();
const AssetStack = createStackNavigator();

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
					height: 95,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 20,
					marginTop: 45,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 40 }}
						onPress={() => navigation.openDrawer()}
					>
						<Icons name='menu' size={25} color={Colors.dark} />
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
					height: 95,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 20,
					marginTop: 45,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 40 }}
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
					height: 95,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 20,
					marginTop: 45,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 40 }}
						onPress={() => navigation.navigate('Dashboard')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
		<HomeStack.Screen
			name='Scan Product'
			component={ScanScreen}
			options={{
				title: 'Scan Product',
				headerStyle: {
					backgroundColor: Colors.blue,
					shadowColor: Colors.dark,
					elevation: 10,
					height: 95,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 20,
					marginTop: 45,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 40 }}
						onPress={() => navigation.navigate('Dashboard')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
	</HomeStack.Navigator>
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
					height: 95,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 20,
					marginTop: 45,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 40 }}
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
					height: 95,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 20,
					marginTop: 45,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 40 }}
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
					height: 95,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 20,
					marginTop: 45,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 40 }}
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
					height: 95,
				},
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: Colors.dark,
					fontFamily: Fonts.Semibold,
					fontSize: 20,
					marginTop: 45,
				},
				headerTintColor: Colors.dark,
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15, marginTop: 40 }}
						onPress={() => navigation.navigate('Assets')}
					>
						<Icons name='arrow-left' size={25} color={Colors.dark} />
					</TouchableOpacity>
				),
			}}
		/>
	</AssetStack.Navigator>
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
							fontSize: 20,
						},
						headerTintColor: Colors.dark,
						headerStyle: {
							backgroundColor: Colors.blue,
							shadowColor: Colors.light,
							elevation: 10,
						},
					}}
				/>
				<Drawer.Screen
					name='Scan'
					component={ScanScreen}
					options={{
						drawerIcon: ({ color }) => (
							<Icons
								name='barcode-scan'
								size={20}
								color={color}
								style={{ marginBottom: 5, marginRight: -25 }}
							/>
						),
						title: 'Scan or Search',
						headerTitleAlign: 'center',
						headerTitleStyle: {
							color: Colors.dark,
							fontFamily: Fonts.Semibold,
							fontSize: 20,
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
