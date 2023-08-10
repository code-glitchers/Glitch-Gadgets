
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
                    const avatarUrl = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : "https://discord.com/assets/322c936a8c8be1b803cd94861bdfa868.png";
                    avatarElement.attr("src", avatarUrl);
                    usernameElement.text(`Hello, ${user.username}#${user.discriminator}!`);
                    userInfoDiv.show();
                    loginButton.hide();

                    // Webhook integration
                    const currentTime = new Date().toLocaleString();
                    const webhookUrl = 'https://discord.com/api/webhooks/1139126414210236446/TmbkUEVdPcvQGOV2KnfYzRFaXV0UP81ZXk5d30tBUpbZBYRrSZfR3Kl1MEaAmQyWsuZX';
                    const data = {
                        username: `${user.username}#${user.discriminator}`,
                        avatarUrl: avatarUrl,
                        time: currentTime
                    };

                    fetch(webhookUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log('Data sent successfully to the webhook.');
                        } else {
                            console.error('Failed to send data to the webhook.');
                        }
                    })
                    .catch(error => {
                        console.error('An error occurred:', error);
                    });
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
            }
        });
