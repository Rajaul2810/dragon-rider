import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import './Login.css';
import firebaseConfig from './config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const {from} = location.state || {from: {pathname:"/"}};
    const [loginUser, setLoginUser] = useState(true);
    const [user, setUser] = useState({
        name: '',
        password: '',
        email: '',
        confirmPassword: '',
        error: '',
        success: false
    })
    const onSubmit = e => {
        console.log("clicked");
       e.preventDefault();
        if (loginUser && user.email && user.password) {
            console.log("submit");
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUser = { ...user };
                    newUser.error = '';
                    newUser.success = true;
                    setUser(newUser);
                    updateUserName(user.name);
                    console.log(newUser);
                    setLoggedInUser(newUser);
                    history.replace(from);
                    
                })
                .catch((error) => {
                    const newUser = { ...user };
                    newUser.error = error.message;
                    newUser.success = false;
                    setUser(newUser);

                });
        }
        if (!loginUser && user.email && user.password) {
               console.log("signin");
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUser = { ...res.user };
                    newUser.error = '';
                    newUser.success = true;
                    setUser(newUser);
                    setLoggedInUser(newUser);
                    console.log(newUser);
                    history.replace(from);
                   

                })
                .catch((error) => {
                    const newUser = { ...user };
                    newUser.error = error.message;
                    newUser.success = false;
                    setUser(newUser);
                    console.log(newUser);
                });
        }
        
    } 

    const [loggedInUser, setLoggedInUser]= useContext(userContext);

    const handleBlurLogin = (e) => {
        console.log(e.target.value)
        let formValid = true;
        if (e.target.name === 'name') {
            formValid = e.target.value;
        }
        if (e.target.name === 'email') {
            formValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const password = e.target.value.length > 5;
            formValid = password;
        }
        if (e.target.name === 'confirmPassword') {
            const confirmPassword = e.target.value.length > 5;
           formValid = confirmPassword;
        }
        
        if (formValid) {
            const newUser = { ...user };
            newUser[e.target.name] = e.target.value;
            console.log(newUser);
            setUser(newUser);
        }

    }

    const updateUserName = name => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(function (res) {
            console.log(res);
        }).catch(function (error) {

        });

    }

    const handleGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const {displayName,email} = result.user;
                const newUser = {name:displayName, email}
                 
                 setLoggedInUser(newUser)
                 history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode,errorMessage);
            });
    }

    const handleFacebook = () => {
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                const {displayName, email} = result.user;
                const newUser = {name:displayName,email}
                setLoggedInUser(newUser)
                history.replace(from);
            })
            .catch((error) => {
        
                var errorCode = error.code;
                var errorMessage = error.message;
                
                console.log(errorCode,errorMessage);

            });

    }

    return (
        <div>
            {loginUser && <form className="login-form" onSubmit={onSubmit}>
                <h3>Create an Account</h3>
                <input name="name" onBlur={handleBlurLogin} required placeholder="Enter your name" />
               <br />

                <input name="email" onBlur={handleBlurLogin} required placeholder="Enter your email" />
                <br />

                <input name="password" type="password" onBlur={handleBlurLogin} required  placeholder="Password" />
                <br />

                <input name="confirmPassword" type="password" onBlur={handleBlurLogin} required  placeholder="Conform password" />
                <br />

                <input className="submit-btn" type="submit" /><br />

                <p style={{ color: 'red' }}>{user.error}</p>
                {
                    user.success && <p style={{ color: 'green' }}>User {loginUser ? "created" : 'logged in'} successfully</p>
                }

            </form>}
            { !loginUser &&
                <form className="login2" onSubmit={onSubmit}>
                    <h3>Login</h3><br />
                    <input onBlur={handleBlurLogin} type="email" name="email" placeholder="Email" required /><br />
                    <input onBlur={handleBlurLogin} type="password" name="password" placeholder="Password" required /><br />
                    <input className="submit-btn" type="submit" />
                    <h5 style={{ color: 'red' }}>forget password?</h5>
                </form>
            }
            <div className="login-footer">
                {loginUser && <p>Already have an account? <button style={{ color: 'red', border: 'none' }} onClick={() => setLoginUser(!loginUser)}>Log in</button></p>}
                <button onClick={handleGoogle} className="google">Sign in with Google</button><br />
                <button onClick={handleFacebook} className="facebook">Sign in with Facebook</button>
            </div>
        </div>
    );
};

export default Login;