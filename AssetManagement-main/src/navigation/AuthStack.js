import React, { useEffect, useState } from 'react';
import { StyleSheet, LogBox } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import PasswordScreen from '../screens/auth/PasswordScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AuthStack = () => {
	const [isFirstLaunch, setIsFirstLaunch] = useState(null);
	let routeName;

	useEffect(() => {
		LogBox.ignoreLogs([
			'AsyncStorage has been extracted from react-native core',
		]);
		AsyncStorage.getItem('alreadyLaunched').then((value) => {
			if (value == null) {
				AsyncStorage.setItem('alreadyLaunched', 'true');
				setIsFirstLaunch(true);
			} else {
				setIsFirstLaunch(false);
			}
		});
	}, []);

	if (isFirstLaunch === null) {
		return null;
	} else if (isFirstLaunch === true) {
		routeName = 'Welcome';
	} else {
		routeName = 'Login';
	}

	return (
		<Stack.Navigator initialRouteName={routeName}>
			<Stack.Screen
				name='Welcome'
				component={WelcomeScreen}
				options={{ header: () => null }}
			/>
			<Stack.Screen
				name='Login'
				component={LoginScreen}
				options={{ header: () => null }}
			/>
			<Stack.Screen
				name='Register'
				component={RegisterScreen}
				options={{ header: () => null }}
			/>
			<Stack.Screen
				name='Password'
				component={PasswordScreen}
				options={{ header: () => null }}
			/>
		</Stack.Navigator>
	);
};

export default AuthStack;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
		fontFamily: 'Poppins-Regular',
		padding: 20,
	},
});
