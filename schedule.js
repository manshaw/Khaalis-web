const firebaseConfig = {
    apiKey: "AIzaSyA5Nh0gL2tEIntXLLQGJxTgKuUV_gs_RIY",
    authDomain: "khalis-milk.firebaseapp.com",
    databaseURL: "https://khalis-milk.firebaseio.com",
    projectId: "khalis-milk",
    storageBucket: "khalis-milk.appspot.com",
    messagingSenderId: "11792051852",
    appId: "1:11792051852:web:8ed4d85087929a8bd055a9",
    measurementId: "G-ECS321DBCE"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var ref = database.ref('Test/User/');

ref.on("value", function (snapshot) {
    var total_scheduled = 0;
    document.getElementById('table-schedule').innerHTML = '';
    snapshot.forEach(function (childSnapshot) {
        childSnapshot.forEach(function (grandChild) {
            grandChild.forEach(function (Child) {
                if (Child.child('orderType').val() === 'Schedule') {
                    total_scheduled = total_scheduled + 1;
                    fetchData(Child, childSnapshot);
                }
            });
        });
    });
    document.getElementById('total-scheduled').innerHTML = total_scheduled;
});

function fetchData(childSnapshot, snapshot) {
    var table = document.getElementById('table-schedule');
    var rowCount = table.rows.length;
    var date = new Date();
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML = rowCount + 1;
    var cell1 = row.insertCell(1);
    cell1.innerHTML = snapshot.key;
    if (childSnapshot.child('name').val()) {
        cell1.innerHTML = cell1.innerHTML + ' (' + childSnapshot.child('name').val() + ')';
    }
    row.insertCell(2).innerHTML = childSnapshot.child('milkQuantity').val();
    row.insertCell(3).innerHTML = childSnapshot.child('yogurtQuantity').val();
    row.insertCell(4).innerHTML = childSnapshot.child('status').val();
    if (row.cells[4].innerHTML !== 'Resumed') {
        row.style.backgroundColor = 'red';
        row.style.color = 'white';
    }
    if (childSnapshot.child('scheduleType').val() === 'Custom Days') {
        row.insertCell(5).innerHTML = JSON.stringify(childSnapshot.child('days').val());
    } else {
        row.insertCell(5).innerHTML = childSnapshot.child('scheduleType').val();
    }
    row.insertCell(6).innerHTML = convertTime(childSnapshot.child('timeStamp').val());
    row.insertCell(7).innerHTML = childSnapshot.child('address').val();
}

function convertEpoch(timeStamp) {
    var date = new Date(timeStamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(timeStamp);
    return d;
}

function convertTime(timeStamp) {
    var dateString = new Date(timeStamp).toUTCString();
    return dateString;
}

function searchTracker() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-tracker");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}