import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	ScrollView,
	StatusBar,
	FlatList,
	LogBox,
} from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Colors, Fonts, windowWidth } from '../../utils/Style';
import Image from '../../components/ImageView';
import Heading from '../../components/Heading';
import Asset from '../../components/Asset';
import FlexButtons from '../../components/FlexButtons';
import call from 'react-native-phone-call';
import email from 'react-native-email';

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

const EmployeeInfo = ({ route, navigation }) => {
	let isMounted = useMountedState();
	const {
		userID,
		Name,
		EmpNumber,
		Email,
		Phone,
		Role,
		Department,
		Location,
		image,
	} = route.params;

	const [assets, setAssets] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const onNavigate = (screen) => {
		navigation.navigate(screen);
	};

	const getListOfAssets = async () => {
		const list = [];
		await firebase
			.firestore()
			.collection('Assets')
			.get()
			.then((query) => {
				query.forEach((document) => {
					if (document.exists) {
						if (document.data().Assigned !== '') {
							if (document.data().Assigned.Id === userID) {
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
						}
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

	const onRefresh = () => {
		setIsFetching(true);
		getListOfAssets();
	};

	const performAction = (action) => {
		if (action === 'Call') {
			const args = {
				number: Phone,
				prompt: false,
				skipCanOpen: true,
			};

			call(args).catch(console.error);
		} else if (action === 'Email') {
			const to = Email;
			email(to, {
				subject: 'Write Email Subject',
				body: 'Write Email Body',
			}).catch(console.error);
		}
	};

	useEffect(() => {
		LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
		getListOfAssets();
	}, [isMounted]);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar statusbarStyle='light-content' backgroundColor={Colors.dark} />
			<ScrollView
				showsVerticalScrollIndicator={false}
				nestedScrollEnabled={true}
				contentContainerStyle={{
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: Colors.white,
					paddingTop: 5,
				}}
			>
				<View style={styles.flex}>
					<Image image={image} />
					<View>
						<Text style={styles.bold}>{Name}</Text>
						<Text style={styles.bold}>{EmpNumber}</Text>
						<Text style={styles.text}>{Email}</Text>
						<Text style={styles.text}>{Phone}</Text>
						<Text style={styles.text}>{Department}</Text>
					</View>
				</View>

				<FlexButtons
					data={[
						{
							icon: 'phone-outline',
							value: Phone,
							action: 'Call',
						},
						{
							icon: 'email-outline',
							value: Email,
							action: 'Email',
						},
						{
							icon: 'delete-outline',
							value: userID,
							action: 'Delete',
						},
					]}
					onPress={(e) => performAction(e)}
				/>

				<View style={{ flex: 1 }}>
					<Heading title={'Assets'} />
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
								btnText={'Assign Assets'}
								onPress={() => onNavigate('Assets')}
							/>
						}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default EmployeeInfo;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	flex: {
		width: windowWidth * 0.95,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderBottomColor: Colors.gray,
		borderBottomWidth: 1,
		paddingBottom: 10,
	},
	text: {
		fontFamily: Fonts.Regular,
		fontSize: 16,
		color: Colors.dark,
	},
	bold: {
		fontFamily: Fonts.Semibold,
		fontSize: 16,
		color: Colors.dark,
	},
});
