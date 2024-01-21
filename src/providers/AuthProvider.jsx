import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {app} from "../firebase/firebase.config.js";
import {API} from "../../config.js";
import axios from "axios";

const auth = getAuth(app);

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [laoding, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    } 

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    } 

    const googleSignIn = () => {
        setLoading(false);
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if(currentUser){
                axios.post(`${API}/jwt`, {email: currentUser.email})
                .then( (response) => {
                    localStorage.setItem("access-token", response.data.token);
                    setLoading(false);
                })
            }
            else{
                localStorage.removeItem("access-token");
            }
          });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        laoding,
        createUser,
        signIn, 
        logOut,
        googleSignIn
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;