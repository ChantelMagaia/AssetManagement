import {
	StyleSheet,
	SafeAreaView,
	View,
	FlatList,
	StatusBar,
} from 'react-native';
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
	const [loading, setLoading] = useState(true);

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
							Category,
							Type,
							Product,
							Vendor,
							AssetName,
							SerialNumber,
							Price,
							Location,
							PurchaseDate,
							WarrantyDate,
							PurchaseType,
							Image,
							Description,
							Assigned,
						} = document.data();
						list.push({
							id: document.id,
							Category,
							Type,
							Product,
							Vendor,
							AssetName,
							SerialNumber,
							Price,
							Location,
							PurchaseDate,
							WarrantyDate,
							PurchaseType,
							image: Image,
							Description,
							Assigned,
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
		Category,
		Type,
		Product,
		Vendor,
		AssetName,
		SerialNumber,
		Price,
		Location,
		PurchaseDate,
		WarrantyDate,
		PurchaseType,
		image,
		Description,
		Assigned
	) => {
		navigation.navigate(screen, {
			assetID,
			Category,
			Type,
			Product,
			Vendor,
			AssetName,
			SerialNumber,
			Price,
			Location,
			PurchaseDate,
			WarrantyDate,
			PurchaseType,
			image,
			Description,
			Assigned,
		});
	};

	const renderItem = ({ item }) => {
		return (
			<View>
				<Asset
					product={item.Product}
					category={item.Category}
					type={item.Type}
					name={item.AssetName}
					serial={item.SerialNumber}
					state={item.Assigned}
					assigned={item.Assigned}
					due={item.WarrantyDate}
					onPress={() =>
						Goto(
							'Asset Details',
							item.id,
							item.Category,
							item.Type,
							item.Product,
							item.Vendor,
							item.AssetName,
							item.SerialNumber,
							item.Price,
							item.Location,
							item.PurchaseDate,
							item.WarrantyDate,
							item.PurchaseType,
							item.image,
							item.Description,
							item.Assigned
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

		navigation.addListener('focus', () => setLoading(!loading));
	}, [navigation, isMounted, loading]);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar statusbarStyle='light-content' backgroundColor={Colors.dark} />
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
