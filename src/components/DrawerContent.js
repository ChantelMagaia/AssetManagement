import React, {
	useContext,
	useState,
	useEffect,
	useRef,
	useCallback,
} from 'react';
import { Avatar } from 'native-base';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { Colors, Fonts } from '../utils/Style';
import Feather from '@expo/vector-icons/Feather';
import { AuthContext } from '../navigation/AuthProvider';
import firebase from 'firebase';

const useMountedState = () => {
	const mountedRef = useRef(false);
	const isMounted = useCallback(() => mountedRef.current, []);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);

	return isMounted;
};

const DrawerContent = (props) => {
	let isMounted = useMountedState();
	const { user, logout } = useContext(AuthContext);
	const [userData, setUserData] = useState(null);

	const getUser = async () => {
		await firebase
			.firestore()
			.collection('Users')
			.doc(user.uid)
			.get()
			.then((doc) => {
				if (doc.exists) {
					if (isMounted()) {
						setUserData(doc.data());
					}
				}
			});
	};

	useEffect(() => {
		getUser();
	}, [isMounted]);

	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView
				{...props}
				contentContainerStyle={{ backgroundColor: Colors.blue, flex: 1 }}
			>
				<View style={styles.header}>
					<Text style={styles.appname}>MTE</Text>
				</View>
				<View style={styles.drawerSection}>
					<DrawerItemList {...props} />
				</View>
			</DrawerContentScrollView>
			<View style={styles.profile}>
				<Avatar bg={Colors.dark} alignSelf='center' size='md'>
					<Text style={styles.initial}>CM</Text>
				</Avatar>
				<View style={{ marginLeft: 15, flexDirection: 'column' }}>
					<Text style={styles.title}>
						{userData ? userData.Name : 'Loading...'}
					</Text>
					<Text style={styles.caption}>
						{userData ? userData.Email : 'Loading...'}
					</Text>
				</View>
				<TouchableOpacity style={styles.iconStyle}>
					<Feather name='log-out' size={24} color={Colors.dark} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default DrawerContent;

const styles = StyleSheet.create({
	header: {
		paddingVertical: 15,
		borderBottomColor: Colors.gray,
		borderBottomWidth: 2,
	},
	appname: {
		fontSize: 32,
		fontFamily: Fonts.Bold,
		color: Colors.dark,
		marginLeft: 30,
	},
	drawerSection: {
		flex: 1,
		backgroundColor: Colors.blue,
		paddingTop: 10,
	},
	profile: {
		flexDirection: 'row',
		paddingVertical: 12,
		borderTopWidth: 2,
		borderTopColor: Colors.gray,
		backgroundColor: Colors.blue,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		height: 70,
	},
	title: {
		fontSize: 16,
		marginTop: 3,
		fontFamily: Fonts.Semibold,
		color: Colors.dark,
	},
	caption: {
		fontSize: 14,
		lineHeight: 16,
		fontFamily: Fonts.Regular,
		color: Colors.dark,
	},
	iconStyle: {
		padding: 10,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	initial: {
		fontFamily: Fonts.Semibold,
		fontSize: 18,
		color: Colors.white,
	},
});
