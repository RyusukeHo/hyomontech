let login = document.getElementById("login");
let id = document.getElementById("account-id");
let password = document.getElementById("account-password");
let welcome = document.getElementById("welcome");
let message = document.getElementById("message");

let onLogin = async () => {
    id.disabled = true;
    password.disabled = true;
    login.disabled = true;
    welcome.innerHTML = "ログインしています";
    message.innerHTML = "<p>お待ちください...</p><svg width=\"30\" height=\"30\" viewBox=\"-60 -60 120 120\"><circle r =\"50\" /></svg>";

    const body = JSON.stringify({
        id: id.value,
        password: password.value
    });
    const method = "POST";
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbwzB6H3Wy_V1MK_TMSkxBi3Kusz2MBEtuRkphpA7w9DKS9ApQOcaO-HH-Yh8mtEmQxy/exec", { method, headers, body, mode: "cors" });
        console.log(await response)
    } catch (error) {
        failureLogin("技術的な問題が発生しました。");
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
login.addEventListener("click", onLogin);
