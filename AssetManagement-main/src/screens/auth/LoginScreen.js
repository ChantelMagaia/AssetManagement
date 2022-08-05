import React, { useContext, useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
	StatusBar,
	ScrollView,
	Image,
} from 'react-native';
import { Colors, Fonts, windowHeight, windowWidth } from '../../utils/Style';
import FeatherIcons from '@expo/vector-icons/Feather';
import { AuthContext } from '../../navigation/AuthProvider';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/Button';

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
			<LinearGradient colors={[Colors.blue, Colors.white]}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.container}>
						<StatusBar statusbarStyle='default' backgroundColor={Colors.blue} />
						<View style={styles.header}>
							<Text style={styles.mainText}>MAGAIA</Text>
							<Text style={styles.subText}>Trading Enterprise</Text>
						</View>
						<Text style={styles.Title}> Welcome Back.</Text>

						<View>
							<Text style={styles.label}>Email</Text>
							<View style={styles.inputContainer}>
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
						</View>

						<Button title={'Sign In'} onPress={() => onLogin()} />

						<View style={styles.flex}>
							<TouchableOpacity onPress={() => navigation.navigate('Register')}>
								<Text style={styles.text}>Sign Up</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => navigation.navigate('Password')}>
								<Text style={styles.text}>Forgot Password?</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
};

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
	label: {
		fontFamily: Fonts.Semibold,
		fontSize: 14,
		color: Colors.dark,
		marginLeft: 5,
		marginTop: 10,
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
	},
	text: {
		fontFamily: Fonts.Semibold,
		color: Colors.dark,
		fontSize: 14,
		textAlign: 'center',
		marginVertical: 25,
	},
});

export default LoginScreen;
