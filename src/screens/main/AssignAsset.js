import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Fonts, windowWidth } from '../../utils/Style';
import Image from '../../components/ImageView';
import Flexshow from '../../components/Flexshow';
import Button from '../../components/Button';
import AssignModal from '../../components/AssignModal';

const AssignAsset = ({ route }) => {
	const {
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
	} = route.params;

	const [showAssign, setShowAssign] = useState(false);
	const [assigned, setAssigned] = useState(false);

	const onAssignAsset = () => {
		setShowAssign(false);
		setAssigned(true);
	};

	const RemoveAssign = () => {
		setAssigned(false);
	};

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
				<Image image={img} />
				<Flexshow label={'Asset Name'} value={Name} />
				<Flexshow
					label={'Asset Unique No.'}
					value={assetID.slice(0, 10) + (assetID.length > 10 ? '...' : '')}
				/>
				<Flexshow label={'Service Tag'} value={Barcode} />
				<Flexshow label={'Asset Type'} value={Type} />
				<Flexshow
					label={'Asset State'}
					value={Assign !== '' ? 'Operational' : 'Recently Added'}
				/>
				<Flexshow
					label={'Assigned Date'}
					value={AssignDay !== '' ? AssignDay : 'No Date'}
				/>
				<Flexshow
					label={'Assigned To'}
					value={Assign !== '' ? Assign : 'Not Assigned'}
				/>
				<Flexshow label={'Maintenance Due'} value={Maintance} />

				{!assigned && (
					<Button title={'Assign Asset'} onPress={() => setShowAssign(true)} />
				)}

				{assigned && (
					<Button title={'Remove Asset Owner'} onPress={() => RemoveAssign()} />
				)}

				<AssignModal
					visible={showAssign}
					onClose={() => setShowAssign(false)}
					onSubmit={onAssignAsset}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default AssignAsset;

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
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomColor: Colors.gray,
		borderBottomWidth: 1,
		marginVertical: 5,
		paddingHorizontal: 10,
	},
	text: {
		fontFamily: Fonts.Regular,
		fontSize: 16,
		color: Colors.dark,
	},
	bold: {
		fontFamily: Fonts.Semibold,
		fontSize: 14,
		color: Colors.dark,
	},
});
