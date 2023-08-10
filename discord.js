$(document).ready(function() {
    const clientId = "1001933562565644338";
    const redirectUri = "https://code-glitchers.github.io";
    const scope = "identify";

    $("#loginButton").click(function() {
        window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${scope}`;
    });

    function parseHashParams() {
        const hash = window.location.hash.substring(1);
        const params = hash.split("&").reduce(function(acc, item) {
            const [key, value] = item.split("=");
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {});
        return params;
    }

    const params = parseHashParams();
    if (params.access_token) {
        fetch("https://discord.com/api/users/@me", {
            headers: {
                Authorization: `Bearer ${params.access_token}`,
            },
        })
        .then(response => response.json())
        .then(user => {
            const usernameElement = document.getElementById("username");
            usernameElement.textContent = `Hello, ${user.username}#${user.discriminator}!`;
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
    }
});
