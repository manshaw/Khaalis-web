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
    document.getElementById('table-all').innerHTML = '';
    snapshot.forEach(function (childSnapshot) {
        childSnapshot.forEach(function (grandChild) {
            grandChild.forEach(function (Child) {
                if (orderToday(Child)) {
                    total_scheduled = total_scheduled + 1;
                    fetchData(Child, childSnapshot);
                }
            });
        });
    });
    document.getElementById('total-all').innerHTML = total_scheduled;
});

function fetchData(childSnapshot, snapshot) {
    var table = document.getElementById('table-all');
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML = rowCount + 1;
    var cell1 = row.insertCell(1);
    cell1.innerHTML = snapshot.key;
    if (childSnapshot.child('name').val()) {
        cell1.innerHTML = cell1.innerHTML + ' (' + childSnapshot.child('name').val() + ')';
    }
    row.insertCell(2).innerHTML = childSnapshot.child('buffaloMilkQuantity').val();
    row.insertCell(3).innerHTML = childSnapshot.child('cowMilkQuanity').val();
    row.insertCell(4).innerHTML = childSnapshot.child('yogurtQuantity').val();
    row.insertCell(5).innerHTML = childSnapshot.child('butterQuantity').val();
    row.insertCell(6).innerHTML = childSnapshot.child('gheeQuantity').val();
    row.insertCell(7).innerHTML = childSnapshot.child('orderType').val();
    if (row.cells[7].innerHTML === 'Schedule') {
        if (childSnapshot.child('scheduleType').val() === 'Custom Days') {
            row.cells[7].innerHTML = 'Schedule ' + JSON.stringify(childSnapshot.child('days').val());
        } else {
            row.cells[7].innerHTML = 'Schedule ' + JSON.stringify(childSnapshot.child('scheduleType').val());
        }
    }
    row.insertCell(8).innerHTML = childSnapshot.child('status').val();
    if (row.cells[8].innerHTML !== 'Resumed') {
        row.style.backgroundColor = 'red';
        row.style.color = 'white';
    }
    row.insertCell(9).innerHTML = convertTime(childSnapshot.child('timeStamp').val());
    row.insertCell(10).innerHTML = childSnapshot.child('address').val();
    row.insertCell(11).innerHTML = childSnapshot.child('total').val();
}

function orderToday(snapshot) {
    var currentDate = new Date();
    var orderDate = new Date(snapshot.child('timeStamp').val());
    if (currentDate.getFullYear() === orderDate.getFullYear() && currentDate.getMonth() === orderDate.getMonth() && currentDate.getDate() === orderDate.getDate()) {
        return true;
    } else {
        return false;
    }
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