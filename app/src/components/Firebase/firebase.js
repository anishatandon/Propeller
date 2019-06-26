import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAE3rMblfzZOFTXxSUHezi3jquVf0bXBhY",
    authDomain: "propellor-navigation-test.firebaseapp.com",
    databaseURL: "https://propellor-navigation-test.firebaseio.com",
    projectId: "propellor-navigation-test",
    storageBucket: "",
    messagingSenderId: "228854286013",
    appId: "1:228854286013:web:36448ae9a36a682c",
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth()
    }
    // auth API from Firebase
    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email,password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}


export default Firebase;