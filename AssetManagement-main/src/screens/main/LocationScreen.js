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
import Locations from '../../components/Locations';

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

const LocationScreen = ({ navigation }) => {
	let isMounted = useMountedState();
	const [locations, setlocations] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const getListOfLocations = async () => {
		const list = [];
		await firebase
			.firestore()
			.collection('Locations')
			.get()
			.then((query) => {
				query.forEach((document) => {
					if (document.exists) {
						const {
							Office,
							Address,
							ContactPerson,
							ContactEmail,
							ContactPhone,
						} = document.data();
						list.push({
							id: document.id,
							Office,
							Address,
							ContactPerson,
							ContactEmail,
							ContactPhone,
						});
					}
				});
				if (isMounted()) {
					setIsFetching(false);
					setlocations(list);
				}
			});
	};

	const Goto = (
		screen,
		OfficeID,
		Office,
		Address,
		ContactPerson,
		ContactEmail,
		ContactPhone
	) => {
		navigation.navigate(screen, {
			OfficeID,
			Office,
			Address,
			ContactPerson,
			ContactEmail,
			ContactPhone,
		});
	};

	const renderItem = ({ item }) => {
		return (
			<View>
				<Locations
					Office={item.Office}
					Address={item.Address}
					Person={item.ContactPerson}
					Email={item.ContactEmail}
					Phone={item.ContactPhone}
					onPress={() =>
						Goto(
							'Location Details',
							item.id,
							item.Office,
							item.Address,
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
		getListOfLocations();
	};

	useEffect(() => {
		getListOfLocations();
	}, [isMounted]);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar statusbarStyle='light-content' backgroundColor={Colors.dark} />
			<Heading title={`${locations.length} Locations`} />
			<FlatList
				data={locations}
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
						title='No locations Found'
						btnText={'Add New Location'}
						onPress={() => onNavigate('Add Location')}
					/>
				}
			/>
		</SafeAreaView>
	);
};

export default LocationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
