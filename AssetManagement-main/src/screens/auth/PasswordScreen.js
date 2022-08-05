import React, { useContext, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
	ActivityIndicator,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import { Colors, Fonts, windowHeight, windowWidth } from '../../utils/Style';
import { AuthContext } from '../../navigation/AuthProvider';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/Button';

const PasswordScreen = ({ navigation }) => {
	const [email, setEmail] = useState();
	const [loading, setLoading] = useState(false);

	const onForgot = () => {
		setLoading(false);
		forgot(email);
	};

	const { forgot } = useContext(AuthContext);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
			<LinearGradient colors={[Colors.blue, Colors.white]}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.container}>
						<View style={styles.header}>
							<Text style={styles.mainText}>MAGAIA</Text>
							<Text style={styles.subText}>Trading Enterprise</Text>
						</View>
						<Text style={styles.Title}> Forgot Your Password!</Text>
						<Text style={styles.subTitle}> Reset Your Password</Text>

						<View>
							<Text style={styles.label}>Email</Text>
							<View style={styles.inputContainer}>
								<TextInput
									style={styles.input}
									onChangeText={(email) => setEmail(email)}
									numberOfLines={1}
									maxLength={50}
									placeholder='johndoe@gmail.com'
									placeholderTextColor={Colors.gray}
									keyboardType='email-address'
									autoCapitilize='none'
									autoCorrect={false}
								/>
							</View>
						</View>

						<Button title={'Forgot Password'} onPress={() => onForgot()} />

						<View style={styles.flex}>
							<TouchableOpacity onPress={() => navigation.navigate('Register')}>
								<Text style={styles.text}>Sign Up</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => navigation.navigate('Login')}>
								<Text style={styles.text}>Sign In</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
};

export default PasswordScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: 20,
		height: windowHeight,
	},
	header: {
		marginTop: windowHeight / 20,
		padding: 20,
		borderColor: Colors.gray,
		borderWidth: 2,
	},
	mainText: {
		fontSize: 40,
		fontFamily: Fonts.Bold,
		color: Colors.dark,
		marginBottom: -15,
		textAlign: 'center',
	},
	subText: {
		fontSize: 18,
		fontFamily: Fonts.Semibold,
		color: Colors.dark,
		textAlign: 'center',
	},
	Title: {
		marginTop: 20,
		fontFamily: Fonts.Bold,
		fontSize: 20,
		color: Colors.dark,
		textAlign: 'center',
		width: windowWidth * 0.9,
	},
	subTitle: {
		fontFamily: Fonts.Regular,
		fontSize: 16,
		color: Colors.dark,
		textAlign: 'center',
		width: windowWidth * 0.9,
		marginBottom: 20,
	},
	label: {
		fontFamily: Fonts.Semibold,
		fontSize: 14,
		color: Colors.dark,
		marginLeft: 5,
	},
	inputContainer: {
		marginTop: 0,
		marginBottom: 5,
		width: windowWidth * 0.92,
		paddingVertical: 10,
		paddingHorizontal: 5,
		borderColor: Colors.gray,
		borderRadius: 3,
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.white,
	},
	input: {
		flex: 1,
		paddingHorizontal: 10,
		fontSize: 16,
		fontFamily: Fonts.Regular,
		color: Colors.dark,
		justifyContent: 'center',
		alignItems: 'center',
	},
	flex: {
		width: windowWidth * 0.92,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 5,
	},
	text: {
		fontFamily: Fonts.Semibold,
		color: Colors.dark,
		fontSize: 14,
		textAlign: 'center',
		marginVertical: 25,
	},
});
