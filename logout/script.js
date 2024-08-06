let logout = document.getElementById("logout-message");

let onLogout = async () => {
    logout.innerHTML = "<svg width=\"30\" height=\"30\" viewBox=\"-60 -60 120 120\"><circle r =\"50\" /></svg>ログアウト";
    document.cookie = "id=; max-age=0; path=/";
    document.cookie = "pwd=; max-age=0; path=/";
    let url_string = window.location.href;
    let url = new URL(url_string);
    let data = url.searchParams.get("redirect");
    if (data == null) {
        logout.innerHTML = "<p>ログアウトしました。このページは閉じてかまいません。</p>"
    } else {
        logout.innerHTML = "<p><svg width=\"30\" height=\"30\" viewBox=\"-60 -60 120 120\"><circle r =\"50\" /></svg>ログアウトしました。リダイレクトします...</p>"
        setTimeout(() => {
            window.location.href = decodeURIComponent(data);
        }, 1000);
    }
}
onLogout();