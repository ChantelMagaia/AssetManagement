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
import Product from '../../components/Product';

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

const ProductScreen = ({ navigation }) => {
	let isMounted = useMountedState();
	const [product, setProduct] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const getListOfProduct = async () => {
		const list = [];
		await firebase
			.firestore()
			.collection('Products')
			.get()
			.then((query) => {
				query.forEach((document) => {
					if (document.exists) {
						const { Category, Type, ProductName, Manufacture, Description } =
							document.data();
						list.push({
							id: document.id,
							Category,
							Type,
							ProductName,
							Manufacture,
							Description,
						});
					}
				});
				if (isMounted()) {
					setIsFetching(false);
					setProduct(list);
				}
			});
	};

	const Goto = (
		screen,
		ProductID,
		Category,
		Type,
		ProductName,
		Manufacture,
		Description
	) => {
		navigation.navigate(screen, {
			ProductID,
			Category,
			Type,
			ProductName,
			Manufacture,
			Description,
		});
	};

	const renderItem = ({ item }) => {
		return (
			<View>
				<Product
					Product={item.ProductName}
					Manufacture={item.Manufacture}
					Category={item.Category}
					Type={item.Type}
					onPress={() =>
						Goto(
							'Product Details',
							item.id,
							item.Category,
							item.Type,
							item.ProductName,
							item.Manufacture,
							item.Description
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
		getListOfProduct();
	};

	useEffect(() => {
		getListOfProduct();
	}, [isMounted]);
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar statusbarStyle='light-content' backgroundColor={Colors.dark} />
			<Heading title={`${product.length} Products`} />
			<FlatList
				data={product}
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
						title='No Product Found'
						btnText={'Add Product'}
						onPress={() => onNavigate('Add Product')}
					/>
				}
			/>
		</SafeAreaView>
	);
};

export default ProductScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
