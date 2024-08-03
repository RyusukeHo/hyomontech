let login = document.getElementById("login");
let id = document.getElementById("account-id");
let password = document.getElementById("account-password");
let welcome = document.getElementById("welcome");
let message = document.getElementById("message");
let loginbox = document.getElementById("login-box");

let onLogin = async () => {
    id.disabled = true;
    password.disabled = true;
    login.disabled = true;
    welcome.innerHTML = "ログインしています";
    message.innerHTML = "<p>お待ちください...</p><svg width=\"30\" height=\"30\" viewBox=\"-60 -60 120 120\"><circle r =\"50\" /></svg>";

    let response = await fetch("https://script.google.com/macros/s/AKfycbwzB6H3Wy_V1MK_TMSkxBi3Kusz2MBEtuRkphpA7w9DKS9ApQOcaO-HH-Yh8mtEmQxy/exec?id=" + id.value + "&password=" + password.value, {
        method: 'GET'
    })
    let obj = await response.json();
    if (obj.code == "Success") {
        successLogin(obj.body);
    } else if (obj.code == "Failure") {
        failureLogin("パスワードが間違っています。");
    } else if (obj.code == "NotFound") {
        failureLogin("アカウントが見つかりませんでした。");
    }
};
let failureLogin = (reason) => {
    welcome.innerHTML = "もう一度お試しください";
    message.innerHTML = "<p class=\"error\"><span class=\"dli-exclamation-circle\"><span></span></span>" + reason + "</p><p>パスワードまたはIDをお忘れの場合は<a href=\"https://docs.google.com/forms/d/1wNEdvV9nDlvMgC66nMCSAnSKapXjBu6Itvs4cufiJWQ/viewform?edit_requested=true\">こちら</a></p> ";
    id.disabled = false;
    password.disabled = false;
    login.disabled = false;
    id.value = "";
    password.value = "";
};
let successLogin = (body) => {
    let d = new Date();
    let hour = d.getHours();
    if (hour >= 18 || hour <= 3) {
        welcome.innerHTML = "こんばんは！" + body[3] + "さん";
    } else if (hour >= 4 && hour <= 8) {
        welcome.innerHTML = "おはようございます！" + body[3] + "さん";
    } else {
        welcome.innerHTML = "こんにちは！" + body[3] + "さん";
    }
    message.innerHTML = "<p>ログインは正常に終了しました。</p> ";
    loginbox.style.visibility = "hidden";
};
login.addEventListener("click", onLogin);
