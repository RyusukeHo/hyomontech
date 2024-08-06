let login = document.getElementById("login");
let id = document.getElementById("account-id");
let password = document.getElementById("account-password");
let welcome = document.getElementById("welcome");
let message = document.getElementById("message");
let loginbox = document.getElementById("login-box");

let onLogin = async () => {
    if (id.value != "") {
        id.disabled = true;
        password.disabled = true;
        login.disabled = true;
        welcome.innerHTML = "ログインしています";
        message.innerHTML = "<p>お待ちください...</p><svg width=\"30\" height=\"30\" viewBox=\"-60 -60 120 120\"><circle r =\"50\" /></svg>";
        const data = {
            "type": "login",
            "id": id.value,
            "password": password.value
        };

        const options = {
            'method': 'post',
            'headers': {
            },
            'body': JSON.stringify(data)
        };
        let res = await fetch("https://script.google.com/macros/s/AKfycbwzB6H3Wy_V1MK_TMSkxBi3Kusz2MBEtuRkphpA7w9DKS9ApQOcaO-HH-Yh8mtEmQxy/exec", options);
        let obj = await res.json();
        if (obj.code == "Success") {
            successLogin(obj.body, id.value, password.value);
            id.value = "";
            password.value = "";
        } else if (obj.code == "Failure") {
            failureLogin("パスワードが間違っています。");
            password.value = "";
        } else if (obj.code == "NotFound") {
            failureLogin("アカウントが見つかりませんでした。");
            id.value = "";
            password.value = "";
        } else if (obj.code == "Blocked") {
            failureLogin("このアカウントはブロックされています。");
            id.value = "";
            password.value = "";
        }
    }

};
let failureLogin = (reason) => {
    welcome.innerHTML = "もう一度お試しください";
    message.innerHTML = "<p class=\"error\"><span class=\"dli-exclamation-circle\"><span></span></span>" + reason + "</p><p>パスワードまたはIDをお忘れの場合は<a href=\"https://docs.google.com/forms/d/1wNEdvV9nDlvMgC66nMCSAnSKapXjBu6Itvs4cufiJWQ/viewform?edit_requested=true\">こちら</a></p> ";
    id.disabled = false;
    password.disabled = false;
    login.disabled = false;

};
let successLogin = (body, id, password) => {
    let d = new Date();
    let hour = d.getHours();
    if (hour >= 18 || hour <= 3) {
        welcome.innerHTML = "こんばんは！" + body[3] + "さん";
    } else if (hour >= 4 && hour <= 8) {
        welcome.innerHTML = "おはようございます！" + body[3] + "さん";
    } else {
        welcome.innerHTML = "こんにちは！" + body[3] + "さん";
    }
    document.cookie = "id=" + encodeURIComponent(id) + "; path=/; secure; samesite=Strict";
    document.cookie = "pwd=" + encodeURIComponent(password) + "; path=/; secure; samesite=Strict";

    let url_string = window.location.href;
    let url = new URL(url_string);
    let data = url.searchParams.get("redirect");

    loginbox.style.visibility = "hidden";
    if (data == null) {
        message.innerHTML = "<p>このページは閉じてかまいません。</p> ";
    } else {
        message.innerHTML = "<p><svg width=\"30\" height=\"30\" viewBox=\"-60 -60 120 120\"><circle r =\"50\" /></svg>リダイレクトします...</p> ";
        setTimeout(() => {
            if (data != "reload") {
                window.location.href = decodeURIComponent(data);
            } else {
                window.top.location.reload();
            }

        }, 1000);
    }
};
login.addEventListener("click", onLogin);
