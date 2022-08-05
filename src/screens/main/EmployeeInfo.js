import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Colors, Fonts, windowWidth } from '../../utils/Style';
import Image from '../../components/ImageView';
import Heading from '../../components/Heading';
import Asset from '../../components/Asset';

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

const EmployeeInfo = ({ route }) => {
	let isMounted = useMountedState();
	const { userID, FullName, EmpNumber, Department, img, Position } =
		route.params;

	return (
		<SafeAreaView style={styles.container}>
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
					<Image image={img} />
					<View>
						<Text style={styles.bold}>{FullName}</Text>
						<Text style={styles.bold}>{EmpNumber}</Text>
						<Text style={styles.text}>{Position}</Text>
						<Text style={styles.text}>{Department}</Text>
					</View>
				</View>
				<View>
					<Heading title={'Assets'} />
					<Asset
						name={'Asset Name'}
						prodId={'Product ID'}
						type={'Type'}
						state={'Operational'}
						fromDate={'26-07-2022'}
						assigned={'Username'}
						due={'06-06-2023'}
					/>
					<Asset
						name={'Asset Name'}
						prodId={'Product ID'}
						type={'Type'}
						state={'Operational'}
						fromDate={'26-07-2022'}
						assigned={'Username'}
						due={'06-06-2023'}
					/>
					<Asset
						name={'Asset Name'}
						prodId={'Product ID'}
						type={'Type'}
						state={'Operational'}
						fromDate={'26-07-2022'}
						assigned={'Username'}
						due={'06-06-2023'}
					/>
					<Asset
						name={'Asset Name'}
						prodId={'Product ID'}
						type={'Type'}
						state={'Operational'}
						fromDate={'26-07-2022'}
						assigned={'Username'}
						due={'06-06-2023'}
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
