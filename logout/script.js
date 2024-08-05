let logout = document.getElementById("logout-message");

let onLogout = async () => {
    logout.innerHTML = "<svg width=\"30\" height=\"30\" viewBox=\"-60 -60 120 120\"><circle r =\"50\" /></svg>ログアウトしています";
    const data = {
        "type": "logout"
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
        let url_string = window.location.href;
        let url = new URL(url_string);
        let data = url.searchParams.get("redirect");
        if (data == null) {
            logout.innerHTML = "<p>ログアウトしました。このページは閉じてかまいません。</p>"
        } else {
            logout.innerHTML = "<p><svg width=\"30\" height=\"30\" viewBox=\"-60 -60 120 120\"><circle r =\"50\" /></svg>ログアウトしました。リダイレクトします...</p>"
            setTimeout(() => {
                window.location.href = decodeURIComponent(data);
            }, 0);
        }

    } else {
        logout.innerHTML = "<p class=\"error\"><span class=\"dli-exclamation-circle\"><span></span></span>技術的な問題が発生しました。</p><p>申し訳ございません。<br>後でもう一度お試しください。</p>";
    }
}
onLogout();
