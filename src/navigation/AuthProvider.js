import React, { useState, createContext } from 'react';
import firebase from 'firebase';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const login = async (Email, Password) => {
		try {
			await firebase.auth().signInWithEmailAndPassword(Email, Password);
		} catch (e) {
			Alert.alert('Error!', '' + e.message + '');
		}
	};

	const register = async (Name, Email, Password) => {
		try {
			await firebase
				.auth()
				.createUserWithEmailAndPassword(Email, Password)
				.then(() => {
					firebase
						.firestore()
						.collection('Users')
						.doc(firebase.auth().currentUser.uid)
						.set({
							Name,
							Email,
							Date: new Date(),
						});
				});
		} catch (e) {
			Alert.alert('Error!', '' + e.message + '');
		}
	};

	const forgot = async (email) => {
		try {
			await firebase
				.auth()
				.sendPasswordResetEmail(email)
				.then(() => {
					Alert.alert(
						'Email Sent',
						'Please check your email, You will get a link to reset your password.'
					);
				});
		} catch (e) {
			Alert.alert('Error!', '' + e.message + '');
		}
	};

	const logout = async () => {
		try {
			await firebase.auth().signOut();
		} catch (e) {
			Alert.alert('Error!', '' + e.message + '');
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				login,
				register,
				forgot,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
