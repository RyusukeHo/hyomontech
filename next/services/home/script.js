let apps = document.getElementById("apps");
let account = document.getElementById("account");
let accountView = document.getElementById("account-view-frame");
let appsView = document.getElementById("apps-view-frame");
let accountViewEnable = false;
let appsViewEnable = false;
let switchAccountView = (isOn) => {
    accountViewEnable = isOn;
    accountView.hidden = !isOn;
};
let switchAppsView = (isOn) => {
    appsViewEnable = isOn;
    appsView.hidden = !isOn;
};
account.addEventListener('click', function () {
    switchAccountView(!accountViewEnable);
}, false);

apps.addEventListener('click', function () {
    switchAppsView(!appsViewEnable);
}, false);

document.addEventListener('click', function (event) {

    if (accountViewEnable && !accountView.contains(event.target) && !account.contains(event.target)) {
        switchAccountView(false);
    } else if (appsViewEnable && !appsView.contains(event.target) && !apps.contains(event.target)) {
        switchAppsView(false);
    }
}, true);
