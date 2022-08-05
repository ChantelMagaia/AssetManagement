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
import Icons from '@expo/vector-icons/Feather';
import { AuthContext } from '../../navigation/AuthProvider';

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
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<View style={styles.image}>
						<Image
							source={require('../../../assets/icon.png')}
							style={styles.logo}
						/>
					</View>
					<Text style={styles.Title}> Forgot Your Password!</Text>
					<Text style={styles.subTitle}> Reset Your Password</Text>

					<View style={styles.inputContainer}>
						<View style={styles.iconStyle}>
							<Icons name='mail' size={20} color={Colors.gray} />
						</View>
						<TextInput
							style={styles.input}
							onChangeText={(email) => setEmail(email)}
							numberOfLines={1}
							maxLength={50}
							placeholder='Email'
							placeholderTextColor={Colors.gray}
							keyboardType='email-address'
							autoCapitilize='none'
							autoCorrect={false}
						/>
					</View>
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={() => onForgot()}
					>
						{loading ? (
							<ActivityIndicator size='large' color={Colors.dark} />
						) : (
							<Text style={styles.buttonText}>Reset Password</Text>
						)}
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.switchPage}
						onPress={() => navigation.navigate('Login')}
					>
						<Text style={styles.infoText}>
							Have an account?
							<Text
								style={[
									styles.infoText,
									{ color: Colors.dark, fontFamily: Fonts.Semibold },
								]}
							>
								{' '}
								Sign In
							</Text>
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.switchPage}
						onPress={() => navigation.navigate('Register')}
					>
						<Text style={styles.infoText}>
							Don't have an account?
							<Text
								style={[
									styles.infoText,
									{ color: Colors.dark, fontFamily: Fonts.Semibold },
								]}
							>
								{' '}
								Create here
							</Text>
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default PasswordScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: Colors.Background,
		padding: 20,
		height: windowHeight,
	},
	image: {
		marginTop: windowHeight / 20,
		marginBottom: 20,
	},
	logo: {
		height: windowHeight / 5,
		width: windowHeight / 5,
		resizeMode: 'cover',
	},
	Title: {
		fontFamily: Fonts.Bold,
		fontSize: 25,
		color: Colors.dark,
		textAlign: 'center',
		width: windowWidth * 0.9,
	},
	subTitle: {
		fontFamily: Fonts.Regular,
		fontSize: 20,
		color: Colors.dark,
		textAlign: 'center',
		width: windowWidth * 0.9,
		marginBottom: 20,
	},
	inputContainer: {
		marginTop: 10,
		marginBottom: 5,
		width: '100%',
		height: windowHeight / 15,
		borderColor: Colors.gray,
		borderRadius: 3,
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.white,
	},
	iconStyle: {
		padding: 10,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRightColor: Colors.gray,
		borderRightWidth: 1,
		width: 50,
	},
	input: {
		flex: 1,
		paddingTop: 5,
		paddingHorizontal: 10,
		fontSize: 16,
		fontFamily: Fonts.Regular,
		color: Colors.dark,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonContainer: {
		marginTop: 10,
		width: '100%',
		height: windowHeight / 15,
		backgroundColor: Colors.blue,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: Colors.dark,
		borderWidth: 1,
		borderRadius: 3,
	},
	buttonText: {
		fontSize: 16,
		color: Colors.dark,
		fontFamily: Fonts.Semibold,
	},
	forgotText: {
		marginTop: 5,
		alignSelf: 'flex-end',
	},
	infoText: {
		fontSize: 16,
		color: Colors.dark,
		fontFamily: Fonts.Regular,
	},
	switchPage: {
		marginTop: 30,
	},
});
