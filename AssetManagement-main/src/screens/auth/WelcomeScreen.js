import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	Image,
	Text,
} from 'react-native';
import React from 'react';
import { windowWidth, Colors, Fonts } from '../../utils/Style';
import Button from '../../components/Button';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient colors={[Colors.blue, Colors.white]}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					nestedScrollEnabled={true}
					contentContainerStyle={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						width: windowWidth,
					}}
				>
					<Image
						source={require('../../assets/images/4380.png')}
						style={styles.image}
					/>

					<Text style={styles.heading}>MAGAIA TRADING ENTERPRISE</Text>
					<Text style={styles.subHeading}>ASSET MANAGEMENT APP</Text>
					<Text style={styles.text}>
						Keep track of all your enterprise assets & inventory items from a
						central place
					</Text>

					<Button
						title={'Get Started'}
						onPress={() => navigation.navigate('Login')}
					/>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
};

export default WelcomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.blue,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: windowWidth * 0.65,
		height: windowWidth * 0.65,
		borderRadius: 10,
		resizeMode: 'contain',
		borderColor: Colors.gray,
		borderWidth: 1,
		margin: 10,
		overflow: 'hidden',
		marginVertical: 30,
	},
	heading: {
		fontFamily: Fonts.Bold,
		fontSize: 20,
		color: Colors.dark,
		textAlign: 'center',
		width: windowWidth * 0.8,
		marginTop: 5,
	},
	subHeading: {
		fontFamily: Fonts.Semibold,
		fontSize: 18,
		color: Colors.dark,
		textAlign: 'center',
		width: windowWidth * 0.8,
		marginBottom: 5,
	},
	text: {
		fontFamily: Fonts.Semibold,
		color: Colors.dark,
		fontSize: 16,
		textAlign: 'center',
		marginVertical: 30,
	},
});
