import app from 'firebase'
import 'firebase/auth';
import "firebase/firestore";

class Fire {
    constructor(){
        app.initializeApp({
                apiKey: "AIzaSyCpHNNh7yTEPHjNufgPl9qAXdMTIlcDqy0",
                authDomain: "corona333-7fe39.firebaseapp.com",
                databaseURL: "https://corona333-7fe39.firebaseio.com",
                projectId: "corona333-7fe39",
                storageBucket: "corona333-7fe39.appspot.com",
                messagingSenderId: "69609870899",
                appId: "1:69609870899:web:38c8c0ff348e750c21b546",
                measurementId: "G-DZTQ3SEGMN"
        })
        this.checkAuth()
    }

    checkAuth = async () => {
        try{
            await app.auth().onAuthStateChanged(user => {
                if(!user){
                    app.auth().signInAnonymously()
                } 
            })
        } catch(err){
            console.log(err)
        }
    };

    send = (dest,cases) => {
       return app.database().ref(`positive/${dest}`).set(cases);
    }

   remove = (dest) => {
       return app.database().ref(`positive/${dest}`).remove()
    }

    parse = data => {
        const {id,lat,lon} = cases.val();

        return {
            id,
            lat,
            lon
        }
    }

    off(){
        this.db.off()
    }

    get = () => {
            return app
    }

    get db() {
        return app.firestore()
    }

    get uid(){
        return (app.auth().currentUser || {}).uid;
    }
}

export default new Fire();