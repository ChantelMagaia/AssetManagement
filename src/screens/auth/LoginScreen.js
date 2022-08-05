import React, { useContext, useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
	SafeAreaView,
	StatusBar,
	ScrollView,
	Image,
} from 'react-native';
import { Colors, Fonts, windowHeight, windowWidth } from '../../utils/Style';
import FeatherIcons from '@expo/vector-icons/Feather';
import { AuthContext } from '../../navigation/AuthProvider';

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [loading, setLoading] = useState('');
	const [secure, setSecure] = useState(true);
	const [focus, setFocus] = useState(false);
	const { login } = useContext(AuthContext);

	const onLogin = () => {
		setLoading('login');
		login(email, password);
	};

	useEffect(() => {
		setLoading('');
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<StatusBar statusbarStyle='default' backgroundColor={Colors.blue} />
					<View style={styles.image}>
						<Image
							source={require('../../../assets/icon.png')}
							style={styles.logo}
						/>
					</View>
					<Text style={styles.Title}> Welcome Back.</Text>

					<View style={styles.inputContainer}>
						<View style={styles.iconStyle}>
							<FeatherIcons name='mail' size={20} color={Colors.blue} />
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

					<View style={styles.inputContainer}>
						<View style={styles.iconStyle}>
							<FeatherIcons name='lock' size={20} color={Colors.blue} />
						</View>
						<TextInput
							style={styles.input}
							onChangeText={(password) => setPassword(password)}
							numberOfLines={1}
							maxLength={20}
							placeholderTextColor={Colors.gray}
							placeholder='Password'
							secureTextEntry={secure}
							setFocus={focus}
							onFocus={() => setFocus(true)}
							onBlur={() => setFocus(false)}
						/>
						<FeatherIcons
							style={{ paddingRight: 15 }}
							name={secure ? 'eye' : 'eye-off'}
							size={20}
							color={Colors.gray}
							onPress={() => setSecure(!secure)}
						/>
					</View>

					<TouchableOpacity
						style={styles.forgotText}
						onPress={() => navigation.navigate('Password')}
					>
						<Text style={styles.infoText}>Forgot Password</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={() => onLogin()}
					>
						{loading == 'login' ? (
							<ActivityIndicator size='large' color={Colors.dark} />
						) : (
							<Text style={styles.buttonText}>Sign In</Text>
						)}
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.swicthPage}
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: Colors.white,
		padding: 20,
		height: windowHeight,
	},
	image: {
		marginTop: windowHeight / 20,
	},
	logo: {
		height: windowHeight / 6,
		width: windowHeight / 6,
		resizeMode: 'cover',
	},
	Title: {
		marginTop: 18,
		fontFamily: Fonts.Bold,
		fontSize: 25,
		color: Colors.dark,
		textAlign: 'center',
		width: windowWidth * 0.9,
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
		justifyContent: 'center',
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
		marginTop: 5,
		marginBottom: 10,
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
		marginVertical: 15,
		alignSelf: 'flex-end',
	},
	infoText: {
		fontSize: 16,
		color: Colors.dark,
		fontFamily: Fonts.Regular,
	},
	swicthPage: {
		marginTop: 30,
	},
});

export default LoginScreen;
