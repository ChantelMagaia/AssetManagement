import { StyleSheet, SafeAreaView, View, FlatList, Text } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Colors } from '../../utils/Style';
import User from '../../components/User';

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

const EmployeeScreen = ({ navigation }) => {
	let isMounted = useMountedState();
	const [employees, setEmployees] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const getListOfEmployees = async () => {
		const list = [];
		await firebase
			.firestore()
			.collection('Employees')
			.get()
			.then((query) => {
				query.forEach((document) => {
					if (document.exists) {
						const { FullName, EmpNumber, Department, Image, Position } =
							document.data();
						list.push({
							id: document.id,
							FullName,
							EmpNumber,
							Department,
							Image,
							Position,
						});
					}
				});
				if (isMounted()) {
					setIsFetching(false);
					setEmployees(list);
				}
			});
	};

	const Goto = (
		screen,
		userID,
		FullName,
		EmpNumber,
		Department,
		img,
		Position
	) => {
		navigation.navigate(screen, {
			userID,
			FullName,
			EmpNumber,
			Department,
			img,
			Position,
		});
	};

	const initialMaker = (text) => {
		try {
			text = text.trim();
			let myString = text.split(' ');
			let firstName = myString[0];
			let lastName = myString[1];

			let initials = firstName.substring(0, 1) + lastName.substring(0, 1);
			return initials;
		} catch (error) {
			return text.substring(0, 1);
		}
	};

	const renderItem = ({ item }) => {
		let name = item.FullName;
		let initials;
		if (name !== '') {
			initials = initialMaker(name);
		}
		return (
			<View>
				<User
					initials={initials}
					name={item.FullName}
					empNum={item.EmpNumber}
					onPress={() =>
						Goto(
							'Employee Info',
							item.id,
							item.FullName,
							item.EmpNumber,
							item.Department,
							item.Image,
							item.Position
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
		getListOfEmployees();
	};

	useEffect(() => {
		getListOfEmployees();
	}, [isMounted]);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={employees}
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
						title='No Employees Found'
						btnText={'Add New Employee'}
						onPress={() => onNavigate('Add Employee')}
					/>
				}
			/>
		</SafeAreaView>
	);
};

export default EmployeeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
