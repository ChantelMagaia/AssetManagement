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
import FeatherIcons from '@expo/vector-icons/Feather';
import { AuthContext } from '../../navigation/AuthProvider';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/Button';

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
			<LinearGradient colors={[Colors.blue, Colors.white]}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.container}>
						<StatusBar
							statusbarStyle='light-content'
							backgroundColor={Colors.blue}
						/>
						<View style={styles.header}>
							<Text style={styles.mainText}>MAGAIA</Text>
							<Text style={styles.subText}>Trading Enterprise</Text>
						</View>
						<Text style={styles.Title}> Welcome!</Text>
						<Text style={styles.subTitle}>Please Fill Your Details Below.</Text>

						<View>
							<Text style={styles.label}>Full Name</Text>
							<View style={styles.inputContainer}>
								<TextInput
									style={styles.input}
									onChangeText={(name) => setName(name)}
									numberOfLines={1}
									maxLength={30}
									placeholder='John Doe'
									placeholderTextColor={Colors.gray}
									autoCapitilize='words'
									autoCorrect={false}
								/>
							</View>
						</View>

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

						<View>
							<Text style={styles.label}>Password</Text>
							<View style={styles.inputContainer}>
								<TextInput
									style={styles.input}
									onChangeText={(password) => setPassword(password)}
									numberOfLines={1}
									maxLength={20}
									placeholderTextColor={Colors.gray}
									placeholder='12345678'
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
						</View>

						<Button title={'Sign Up'} onPress={() => onSignUp()} />

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
			</LinearGradient>
		</SafeAreaView>
	);
};

export default RegisterScreen;

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
	forgotText: {
		marginTop: 5,
		alignSelf: 'flex-end',
	},
	infoText: {
		fontSize: 14,
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
		fontSize: 14,
		color: Colors.dark,
		fontFamily: Fonts.Semibold,
	},
});
