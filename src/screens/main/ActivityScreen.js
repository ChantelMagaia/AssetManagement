import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import React from 'react';
import Heading from '../../components/Heading';
import { Colors } from '../../utils/Style';
import Activity from '../../components/Activity';

const ActivityScreen = () => {
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
					<Heading title={'System Activity'} />
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

export default ActivityScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
