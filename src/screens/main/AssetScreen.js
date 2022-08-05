import { StyleSheet, SafeAreaView, View, FlatList, Text } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Colors } from '../../utils/Style';
import Asset from '../../components/Asset';

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

const AssetScreen = ({ navigation }) => {
	let isMounted = useMountedState();
	const [assets, setAssets] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const getListOfAssets = async () => {
		const list = [];
		await firebase
			.firestore()
			.collection('Assets')
			.get()
			.then((query) => {
				query.forEach((document) => {
					if (document.exists) {
						const {
							Name,
							Barcode,
							Brand,
							Model,
							Type,
							Maintance,
							Description,
							Image,
							Assign,
							AssignDay,
							ReturnedDay,
						} = document.data();
						list.push({
							id: document.id,
							Name,
							Barcode,
							Brand,
							Model,
							Type,
							Maintance,
							Description,
							Image,
							Assign,
							AssignDay,
							ReturnedDay,
						});
					}
				});
				if (isMounted()) {
					setIsFetching(false);
					setAssets(list);
				}
			});
	};

	const Goto = (
		screen,
		assetID,
		Name,
		Barcode,
		Brand,
		Model,
		Type,
		Maintance,
		Description,
		img,
		Assign,
		AssignDay,
		ReturnedDay
	) => {
		navigation.navigate(screen, {
			assetID,
			Name,
			Barcode,
			Brand,
			Model,
			Type,
			Maintance,
			Description,
			img,
			Assign,
			AssignDay,
			ReturnedDay,
		});
	};

	const renderItem = ({ item }) => {
		return (
			<View>
				<Asset
					name={item.Name}
					prodId={item.Barcode}
					type={item.Type}
					state={item.Assign}
					fromDate={item.AssignDay}
					assigned={item.Assign}
					due={item.ReturnedDay}
					onPress={() =>
						Goto(
							'Asset Details',
							item.id,
							item.Name,
							item.Barcode,
							item.Brand,
							item.Model,
							item.Type,
							item.Maintance,
							item.Description,
							item.Image,
							item.Assign,
							item.AssignDay,
							item.ReturnedDay
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
		getListOfAssets();
	};

	useEffect(() => {
		getListOfAssets();
	}, [isMounted]);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={assets}
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
						title='No Assets Found'
						btnText={'Add New Assets'}
						onPress={() => onNavigate('Add Asset')}
					/>
				}
			/>
		</SafeAreaView>
	);
};

export default AssetScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
