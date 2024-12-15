let apps = document.getElementById("apps");
let account = document.getElementById("account");
let accountView = document.getElementById("account-view-frame");
let accountViewEnable = false;
let switchAccountView = (isOn) => {
    accountViewEnable = isOn;
    accountView.hidden = !isOn;
};
account.addEventListener('click', function () {
    switchAccountView(!accountViewEnable);
}, false);

document.addEventListener('click', function (event) {
    if (accountViewEnable && !accountView.contains(event.target) && !account.contains(event.target)) {
        switchAccountView(false);
    }
}, true);
