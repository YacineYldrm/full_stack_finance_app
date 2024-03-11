



const createMailContent = (v_code, userInfo, link) => {
    return `
        < !DOCTYPE html >
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0" />
                <title>Your Verification email</title>
                <style>
                    * {
                        margin: 0;
                    padding: 0;
                    box-sizing: border-box;
			}

                    a {
                        text - decoration: none;
                    color: inherit;
			}

                    img {
                        display: block;
                    max-width: 100%;
			}
                    body {
                        width: 100vw;
                    min-height: 60vh;
                    background-color: rgb(219, 243, 255);
                    padding: 2.5% 5%;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont,
                    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
                    'Helvetica Neue', sans-serif;
                    color: rgb(0, 75, 125);
			}
			body > div {
                        display: flex;
                    align-items: center;
                    gap: 2vw;
                    color: rgb(4, 137, 225);
                    font-size: 2vmax;
                    border-bottom: 3px solid rgb(4, 137, 225);
                    padding-bottom: 2.5%;
                    margin-bottom: 8vh;
			}
			body > div > h2 {
                        position: relative;
                    top: 2.8vh;
			}

                    h3 {
                        margin: 0 auto;
                    font-size: 2.3vmax;
                    margin-bottom: 3vh;
                    margin-bottom: 6vh;
                    width: 80%;
			}
                    h4 {
                        text - align: center;
                    font-size: 2.5vmax;
                    background-color: rgb(0, 75, 125);
                    color: rgb(219, 243, 255);
                    width: 15%;
                    padding: 1% 0.5%;
                    line-height: 100%;
                    margin: 0 auto;
                    border-radius: 1vmax;
                    margin-bottom: 8vh;
			}
                    h5 {
                        margin: 0 auto;
                    margin-bottom: 10vh;
                    font-size: 2vmax;
                    width: 80%;
			}

                    a {
                        text - align: center;
                    font-size: 1.4vmax;
                    background-color: rgb(0, 75, 125);
                    color: rgb(219, 243, 255);
                    width: 15%;
                    padding: 0.7%;
                    line-height: 100%;
                    margin: 0 auto;
                    border-radius: 0.6vmax;
                    display: inline-block;
                    transition: all 400ms ease-in-out;
			}
                    a:hover {
                        transform: scale(1.03) translate(0, -10%);
                    font-size: 1.5;
			}
                </style>
            </head>
            <body>
                <div>
                    <img
                        src="./logo.png"
                        alt="" />
                    <h2>Welcome to Finco</h2>
                </div>
                <h3>Hello ${userInfo.user}}</h3>
                <h5>
                    Welcome aboard! With Finco, you’re embarking on a journey towards
                    your financial aspirations. From now on, stay in control of your
                    finances effortlessly. <br /><br />
                    Please <a href=${link}/${userInfo._id}>CLICK HERE!</a> and type in your verification code
                    to verify your email!
                </h5>
                <h4>${v_code}</h4>
            </body>
        </html>

    `
}


export default createMailContent;