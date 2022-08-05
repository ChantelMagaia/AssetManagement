import { SafeAreaView, StyleSheet, ScrollView, StatusBar } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Colors } from '../../utils/Style';
import Loading from '../../components/Loading';
import CustomAlert from '../../components/CustomAlert';
import Flexshow from '../../components/Flexshow';
import FlexButtons from '../../components/FlexButtons';
import DescriptionBox from '../../components/Description';

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

const ProductInfo = ({ route }) => {
	let isMounted = useMountedState();
	const { ProductID, Category, Type, ProductName, Manufacture, Description } =
		route.params;

	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState({
		status: '',
		title: '',
		visible: false,
	});

	const performAction = (action) => {
		console.log(action);
	};
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
					paddingBottom: 10,
				}}
			>
				<Flexshow label={'Product'} value={ProductName} />
				<Flexshow label={'Category'} value={Category} />
				<Flexshow label={'Product Type'} value={Type} />
				<Flexshow label={'Manufacture'} value={Manufacture} />
				<DescriptionBox
					label={'Asset Description'}
					value={Description !== '' ? Description : 'No Description Provided'}
				/>
				<FlexButtons
					data={[
						{
							icon: 'pencil-outline',
							value: ProductID,
							action: 'Edit',
						},
						{
							icon: 'delete-outline',
							value: ProductID,
							action: 'Delete',
						},
					]}
					onPress={(e) => performAction(e)}
				/>
				<Loading loading={loading} />
				<CustomAlert
					visible={alert.visible}
					status={alert.status}
					title={alert.title}
					onClose={() => setAlert({ ...alert, visible: false })}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ProductInfo;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
