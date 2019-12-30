import firebase from './FirebaseConnection';

class SysConn {

    addAuthListener(callback) {
        
        firebase.auth().onAuthStateChanged(callback);
    }

    login(email,senha) {
        
        return firebase.auth().signInWithEmailAndPassword(email,senha);
    }
    
    logout() {

        firebase.auth().signOut();
    }

    getUserInfo(callback) {

        let userid = firebase.auth().currentUser.uid;
        
        firebase.database()
        .ref('usuarios')
        .child(userid)
        .once('value')
        .then(callback);
    }
}

export default new SysConn();