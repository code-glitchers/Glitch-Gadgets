
$(document).ready(function() {
    const clientId = "1001933562565644338"; // Replace with your actual client ID
    const redirectUri = "https://code-glitchers.github.io/Glitch-Gadgets/"; // Your actual redirect URI
    const scope = "identify";

    const loginButton = $("#loginButton");
    const userInfoDiv = $("#userInfo");
    const avatarElement = $("#avatar");
    const usernameElement = $("#username");

    loginButton.click(function() {
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
        localStorage.setItem('discordAccessToken', params.access_token);

        fetch("https://discord.com/api/users/@me", {
            headers: {
                Authorization: `Bearer ${params.access_token}`,
            },
        })
        .then(response => response.json())
        .then(user => {
            avatarElement.attr("src", `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`);
            usernameElement.text(`Hello, ${user.username}#${user.discriminator}!`);
            userInfoDiv.show(); // Display the user info section
            loginButton.hide(); // Hide the login button after login
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
    }
});

