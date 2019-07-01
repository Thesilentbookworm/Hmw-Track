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

        // getAllAssignments()

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