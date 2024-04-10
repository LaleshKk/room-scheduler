'use strict';

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";;


const firebaseConfig = {
	apiKey: "AIzaSyB86Ngt7fXPwqFbwnSFqXTRb73HSubelZs",
    authDomain: "roomschsp1.firebaseapp.com",
    projectId: "roomschsp1",
    storageBucket: "roomschsp1.appspot.com",
    messagingSenderId: "924399062529",
    appId: "1:924399062529:web:df782de6e7a76c64c83a00"
};

window.addEventListener("load", function () {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    updateUI();

    document.getElementById("login").addEventListener('click', function () {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("User logged in successfully!");
            })
            .catch((error) => {
                console.log(error.code, error.message);
            });
    });

    document.getElementById("sign-out").addEventListener('click', function () {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully!");
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    });

    // Listen for changes in authentication state
    onAuthStateChanged(auth, (user) => {
        updateUI(user);
    });

    function updateUI(user) {
        const loginBox = document.getElementById("login-box");
        const signOutButton = document.getElementById("sign-out");
        const links = document.querySelectorAll("a");
        const link_row = document.getElementById("link-row");

        if (user) {
            // User is signed in
            loginBox.style.display = "none"; // Hide login box
            signOutButton.style.display = "block"; // Show sign-out button

            // Show links
            links.forEach(link => {
                link.style.display = "block";
            });
        } else {
            // User is signed out
            loginBox.style.display = "block"; // Show login box
            signOutButton.style.display = "none"; // Hide sign-out button

            // Hide links
            links.forEach(link => {
                link.style.display = "none";
            });
        }
    }  
});