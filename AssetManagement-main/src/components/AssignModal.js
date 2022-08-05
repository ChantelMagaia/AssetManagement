import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	StyleSheet,
	View,
	Modal,
	TouchableWithoutFeedback,
	FlatList,
} from 'react-native';
import { Colors, windowWidth } from '../utils/Style';
import Button from './Button';
import Heading from './Heading';
import Input from './Input';
import User from './User';

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

const AssignModal = ({ visible, onClose, onSubmit }) => {
	let isMounted = useMountedState();
	const [search, setSearch] = useState('');
	const [selected, setSelected] = useState({
		Id: '',
		Name: '',
		EmpNum: '',
		Initials: '',
	});
	const [employees, setEmployees] = useState([]);
	const [searchResults, setSearchResults] = useState({});

	const getListOfEmployees = async () => {
		const list = [];
		await firebase
			.firestore()
			.collection('Employees')
			.get()
			.then((query) => {
				query.forEach((document) => {
					if (document.exists) {
						const {
							Name,
							EmpNumber,
							Email,
							Phone,
							Role,
							Department,
							Location,
							Image,
						} = document.data();
						list.push({
							id: document.id,
							Name,
							EmpNumber,
							Email,
							Phone,
							Role,
							Department,
							Location,
							image: Image,
						});
					}
				});
				if (isMounted()) {
					setEmployees(list);
				}
			});
	};

	const onChangeText = (e) => {
		setSearch(e);
	};

	const onContinue = () => {
		onSubmit(selected.Id, selected.Name, selected.EmpNum);
	};

	const AssignTo = (id, name, empNum, initials) => {
		setSelected({
			Id: id,
			Name: name,
			EmpNum: empNum,
			Initials: initials,
		});
	};

	const removeFromSelected = () => {
		setSelected({});
	};

	const onSearch = (keyword) => {
		let results = employees.filter((employee) => {
			if (
				employee.Name.toLocaleLowerCase().search(keyword.toLocaleLowerCase()) >
				-1
			) {
				return employee;
			} else {
				return null;
			}
		});

		if (isMounted()) setSearchResults(results);
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
		let name = item.Name;
		let initials;
		if (name !== '') {
			initials = initialMaker(name);
		}
		return (
			<View>
				<User
					initials={initials}
					name={item.Name}
					empNum={item.EmpNumber}
					onPress={() => AssignTo(item.id, item.Name, item.EmpNumber, initials)}
				/>
			</View>
		);
	};

	useEffect(() => {
		getListOfEmployees();
	}, [isMounted]);

	useEffect(() => {
		if (search.length < 1) {
			setSearch('');
		} else {
			onSearch(search);
		}
	}, [search]);

	return (
		<Modal
			visible={visible}
			animationType='fade'
			transparent
			onRequestClose={onClose}
		>
			<View style={styles.container}>
				<View style={styles.modalContainer}>
					<View>
						{selected.Id === '' && (
							<>
								<Heading title='Search For Employee' />
								<Input
									icon={'account-search-outline'}
									onChangeText={onChangeText}
									placeholder={'Search by name'}
									keyboard={'default'}
								/>

								{search !== '' && Object.keys(searchResults).length > 0 && (
									<FlatList
										data={searchResults}
										renderItem={renderItem}
										keyExtractor={(item) => item.id}
										contentContainerStyle={{
											justifyContent: 'center',
											alignItems: 'center',
											backgroundColor: Colors.white,
											paddingTop: 5,
										}}
										ListEmptyComponent={<Heading title='No Employees Found' />}
									/>
								)}
							</>
						)}

						{selected.Id !== '' && (
							<View>
								<View>
									<Heading title={'Selected:'} />
									<User
										initials={selected.Initials}
										name={selected.Name}
										empNum={selected.EmpNum}
										onPress={() => removeFromSelected()}
									/>
								</View>
								<Button title={'Assign'} onPress={() => onContinue()} />
							</View>
						)}
					</View>
				</View>
			</View>
			<TouchableWithoutFeedback onPress={onClose}>
				<View
					style={[StyleSheet.absoluteFillObject, styles.Model_background]}
				/>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default AssignModal;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		flex: 0,
		width: windowWidth * 0.96,
		borderColor: Colors.dark,
		borderWidth: 1,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		backgroundColor: Colors.white,
	},
	Model_background: {
		zIndex: -1,
		backgroundColor: Colors.dark,
		opacity: 0.6,
	},
});
