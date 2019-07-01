console.log('Connected.');

const googleButton = document.querySelector('#so');

googleButton.addEventListener('click', function() {
    console.log('Ready to authenticate');
    authenticateWithGoogle();
})

function authenticateWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user)
            window.location.href = 'hw-pg.html'
            // ...
        }).catch(function(error) {
            console.log('error')
            console.log(error)
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
        });
}

let options = {}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, options);
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log('User is logged in.');
        console.log(user);

        const avatarImg = document.querySelector('#avatar');
        avatarImg.setAttribute('src', user.photoURL);

        getAllAssignments()

    }
    else {
        // User is NOT signed in.
        console.log('User is not logged in.');
    }

});

function signUserOut() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("User Signed Out");
        window.location.href = 'index.html';
    }).catch(function(error) {
        // An error happened.
        console.log(error);
        console.log("Could not sign user out ._.");
    });
}
