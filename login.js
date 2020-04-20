function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (username === "ibrahim" && password === "pakistan1") {
        window.sessionStorage.setItem("AuthenticationState", "Ibrahim");
        window.location.replace("dashboard.html");
    } else {
        window.sessionStorage.setItem("AuthenticationState", "no");
        document.getElementById('status').innerHTML = "Failed"
    }
}
