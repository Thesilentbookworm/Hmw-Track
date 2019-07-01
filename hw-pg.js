firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log('User is logged in.');
        console.log(user);

        const avatarImg = document.querySelector('#avatar');
        avatarImg.setAttribute('src', user.photoURL);

        //runs the getAllAssignments function
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

let options = {}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, options);
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, options);
});


function addHomework() {
    let hwInput = document.querySelector('#hw_name')
    let dueDateInput = document.querySelector('#due_date')
    if (hwInput.value.length === 0 || dueDateInput.value.length === 0) {
        alert('You must fill out both fields before you submit')
        return
    }
    let user = firebase.auth().currentUser

    if (!user) {
        alert('You must sign in first!')
        return
    }
    // find the activities collection 
    // in the firebase database
    firebase.firestore()
        .collection('activities')
        // then we add a document
        // with the user id, the name of the hw, and the due date
        .add({
            userId: user.uid,
            hwName: hwInput.value,
            dueDate: dueDateInput.value
        })
        // then we reset all the inputs to blank
        .then(res => {
            hwInput.value = ''
            dueDateInput.value = ''
            getAllAssignments()
        })
        .catch(err => {
            console.log('err')
            alert('Something went wrong! Try again.')
        })
}


//a new function is created
function getAllAssignments() {
    let activitiesList = document.querySelector('#hw_activities')
    activitiesList.innerHTML = ''
    let user = firebase.auth().currentUser
    if (!user) {
        // alert('You must sign in first!')
        return
    }
    firebase.firestore()
        .collection('activities')
        .where('userId', '==', user.uid)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let data = doc.data()
                activitiesList.innerHTML +=
                    `
                <li class="activity-list-item">
                    <i class="material-icons">assignment</i>
                    ${data.hwName}: ${data.dueDate}
                </li>
            `
            })
        })
        .catch(err => console.log(err))
}




document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, options);
});
