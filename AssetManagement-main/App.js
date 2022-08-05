import 'react-native-gesture-handler';
import React from 'react';
import Providers from './src/navigation';

import { useFonts } from 'expo-font';
import * as firebase from 'firebase';

require('firebase/firestore');

const firebaseConfig = {
	apiKey: 'AIzaSyCNsed9hQA51awc2u_mvKuG4k5P4OguLcg',
	authDomain: 'asset-management-app-1daa0.firebaseapp.com',
	projectId: 'asset-management-app-1daa0',
	storageBucket: 'asset-management-app-1daa0.appspot.com',
	messagingSenderId: '620565519527',
	appId: '1:620565519527:web:0e7bd0bc439a574b740f82',
};

if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}

const App = () => {
	const [loaded] = useFonts({
		'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
		'Poppins-SemiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
		'Poppins-Bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
	});

	if (!loaded) {
		return null;
	}

	return <Providers />;
};

export default App;
