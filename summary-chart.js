
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
var ref = database.ref("Test/User/");

ref.on("value", function (snapshot) {
  var users = 0;
  var orders = 0;
  var milkBuffalo = 0;
  var milkCow = 0;
  var yogurt = 0;
  var butter = 0;
  var ghee = 0;

  snapshot.forEach(function (childSnapshot) {
    users = snapshot.numChildren();
    childSnapshot.forEach(function (grandChild) {
      grandChild.forEach(function (Child) {
        orders = orders + 1;
        milkBuffalo = milkBuffalo + Child.child('buffaloMilkQuantity').val();
        milkCow = milkCow + Child.child('cowMilkQuanity').val();
        yogurt = yogurt + Child.child('yogurtQuantity').val();
        butter = butter + Child.child('butterQuantity').val();
        ghee = ghee + Child.child('gheeQuantity').val();
      });
    });
  });
  document.getElementById('total-users').innerHTML = "Total Users: " + users;
  document.getElementById('total-orders').innerHTML = "Total Orders: " + orders;
  document.getElementById('total-milk-buffalo').innerHTML = "Total Milk(Buffalo): " + milkBuffalo;
  document.getElementById('total-milk-cow').innerHTML = "Total Milk(Cow): " + milkCow;
  document.getElementById('total-yogurt').innerHTML = "Total Yogurt: " + yogurt;
  document.getElementById('total-butter').innerHTML = "Total Butter: " + butter;
  document.getElementById('total-ghee').innerHTML = "Total Ghee: " + ghee;
  setChart(users, orders, milkBuffalo, milkCow, yogurt, butter, ghee);
});

function setChart(users, orders, milkBuffalo, milkCow, yogurt, butter, ghee) {

  var donutChartCanvas = $('#donutChart').get(0).getContext('2d')
  const donutData = {
    labels: [
      'Users',
      'Orders',
      'Buffalo Milk',
      'Cow Milk',
      'Yogurt',
      'Butter',
      'Ghee'
    ],
    datasets: [
      {
        data: [users, orders, milkBuffalo, milkCow, yogurt, butter, ghee],
        backgroundColor: ['#ffd800', '#00a65a', '#007bff', '#57009F', '#87654d', '#00656f', '#dc3545'],
      }
    ]
  }
  var donutOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false
    }
  }
  //Create pie or douhnut chart
  // You can switch between pie and douhnut using the method below.
  var donutChart = new Chart(donutChartCanvas, {
    type: 'doughnut',
    data: donutData,
    options: donutOptions
  })
}

function getMonthNumber(n) {
  if (n == 'JAN')
    return 0
  if (n == 'FEB')
    return 1
  if (n == 'MAR')
    return 2
  if (n == 'APR')
    return 3
  if (n == 'MAY')
    return 4
  if (n == 'JUN')
    return 5
  if (n == 'JUL')
    return 6
  if (n == 'AUG')
    return 7
  if (n == 'SEP')
    return 8
  if (n == 'OCT')
    return 9
  if (n == 'NOV')
    return 10
  if (n == 'DEC')
    return 11
}


