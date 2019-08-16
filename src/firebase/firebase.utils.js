import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAlECOQEVd2aOkJlIDY2PmiYfoJ3VpnSpo",
  authDomain: "vuejs-http-e7c9c.firebaseapp.com",
  databaseURL: "https://vuejs-http-e7c9c.firebaseio.com",
  projectId: "vuejs-http-e7c9c",
  storageBucket: "vuejs-http-e7c9c.appspot.com",
  messagingSenderId: "58682826576",
  appId: "1:58682826576:web:87bd285f05618700"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
