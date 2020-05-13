import app from 'firebase/app';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyCWl7D6sN3f3pP2xNYK6XiSEbXVBhkAET4",
    authDomain: "portfoliolab-d4d3a.firebaseapp.com",
    databaseURL: "https://portfoliolab-d4d3a.firebaseio.com",
    projectId: "portfoliolab-d4d3a",
    storageBucket: 'portfoliolab-d4d3a.appspot.com',
    messagingSenderId: "4108999263",
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }

    // *** Auth API ***
    getCurrentUser = () => this.auth.currentUser?.email
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

}

export default Firebase;