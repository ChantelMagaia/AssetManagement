import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Heading from '../../components/Heading';
import { Colors } from '../../utils/Style';
import WideButton from '../../components/WideButton';
import Activity from '../../components/Activity';

const DashboardScreen = ({ navigation }) => {
	const Goto = (screen) => {
		navigation.navigate(screen);
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
				<View>
					<Heading title={'Actions'} />
					<WideButton
						icon={'account-plus-outline'}
						title={'Add New Employee'}
						onPress={() => Goto('Add Employee')}
					/>
					<WideButton
						icon={'archive-plus-outline'}
						title={'Add New Asset'}
						onPress={() => Goto('Add Asset')}
					/>
					<WideButton
						icon={'qrcode-scan'}
						title={'Scan Product'}
						onPress={() => Goto('Scan Product')}
					/>
				</View>
				<View>
					<Heading title={'Latest System Activity'} />
					<Activity
						action={'Asset Added By'}
						time={'26-07-2022 | 14:45'}
						user={'John Doe'}
						prodId={'TD143445676'}
						prodName={'Dell Laptop '}
					/>
					<Activity
						action={'Asset Updated By'}
						time={'26-07-2022 | 14:35'}
						user={'John Doe'}
						prodId={'TD143445676'}
						prodName={'HP Laptop '}
					/>
					<Activity
						action={'Asset Added By'}
						time={'26-07-2022 | 14:22'}
						user={'John Doe'}
						prodId={'TD21145676'}
						prodName={'Dell Laptop '}
					/>
					<Activity
						action={'Asset Updated By'}
						time={'26-07-2022 | 14:12'}
						user={'John Doe'}
						prodId={'TD124456745'}
						prodName={'Acer Laptop '}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default DashboardScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
