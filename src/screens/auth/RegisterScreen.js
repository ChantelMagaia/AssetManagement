import React, { useContext, useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
	ActivityIndicator,
	SafeAreaView,
	StatusBar,
	ScrollView,
} from 'react-native';
import { Colors, Fonts, windowHeight, windowWidth } from '../../utils/Style';
import Icons from '@expo/vector-icons/Feather';
import { AuthContext } from '../../navigation/AuthProvider';

const RegisterScreen = ({ navigation }) => {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [loading, setLoading] = useState(false);
	const [secure, setSecure] = useState(true);
	const [focus, setFocus] = useState(false);

	const { register } = useContext(AuthContext);

	const onSignUp = () => {
		setLoading(true);
		if ((name === '', email == '', password == '')) {
			Alert.alert('Error', 'Please fill in alll the fields');
			setLoading(false);
		} else {
			register(name, email, password);
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(false);
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<StatusBar
						statusbarStyle='light-content'
						backgroundColor={Colors.blue}
					/>
					<View style={styles.image}>
						<Image
							source={require('../../../assets/icon.png')}
							style={styles.logo}
						/>
					</View>
					<Text style={styles.Title}> Welcome to App Name</Text>
					<Text style={styles.subTitle}>Please Fill Your Details Below.</Text>

					<View style={styles.inputContainer}>
						<View style={styles.iconStyle}>
							<Icons name='user' size={20} color={Colors.blue} />
						</View>
						<TextInput
							style={styles.input}
							onChangeText={(name) => setName(name)}
							numberOfLines={1}
							maxLength={30}
							placeholder='Full Name'
							placeholderTextColor={Colors.gray}
							autoCapitilize='words'
							autoCorrect={false}
						/>
					</View>

					<View style={styles.inputContainer}>
						<View style={styles.iconStyle}>
							<Icons name='mail' size={20} color={Colors.blue} />
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
							<Icons name='lock' size={20} color={Colors.blue} />
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
						<Icons
							style={{ paddingRight: 15 }}
							name={secure ? 'eye' : 'eye-off'}
							size={20}
							color={Colors.gray}
							onPress={() => setSecure(!secure)}
						/>
					</View>

					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={() => onSignUp()}
					>
						{loading ? (
							<ActivityIndicator size='large' color={Colors.dark} />
						) : (
							<Text style={styles.buttonText}>Sign Up</Text>
						)}
					</TouchableOpacity>

					<View style={styles.termsTextContainer}>
						<Text style={styles.infoText}>By signing up you accept our </Text>
						<Text
							onPress={() => console.log('Terms of use')}
							style={styles.termsText}
						>
							Terms of use
						</Text>
						<Text style={styles.infoText}> and </Text>
						<Text
							onPress={() => console.log('Privacy Policy')}
							style={styles.termsText}
						>
							Privacy Policy
						</Text>
					</View>

					<TouchableOpacity
						style={styles.swicthPage}
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
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default RegisterScreen;

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
		marginTop: 20,
	},
	logo: {
		height: windowHeight / 6,
		width: windowHeight / 6,
		resizeMode: 'cover',
	},
	Title: {
		marginTop: 20,
		fontFamily: Fonts.Bold,
		fontSize: 25,
		color: Colors.dark,
		textAlign: 'center',
		width: windowWidth * 0.9,
	},
	subTitle: {
		fontFamily: Fonts.Regular,
		fontSize: 18,
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
	swicthPage: {
		marginTop: 10,
	},
	termsTextContainer: {
		marginTop: 20,
		width: windowWidth * 0.9,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	termsText: {
		fontSize: 16,
		color: Colors.dark,
		fontFamily: Fonts.Semibold,
	},
});
