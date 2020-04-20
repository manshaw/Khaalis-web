if (window.sessionStorage.getItem("AuthenticationState") === "no" || !window.sessionStorage.getItem("AuthenticationState")) {
    window.location.replace("login.html");
}


