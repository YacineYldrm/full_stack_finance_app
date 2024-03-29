



const createResetPasswordMail = (token, userInfo, link) => {
    return `
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
                        width: 100%;
                    
                    background-color: rgb(219, 243, 255);
                    padding: 2.5% 5%;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont,
                    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
                    'Helvetica Neue', sans-serif;
                    color: rgb(0, 75, 125);
			}
			body > div {
                        display: flex;
                    align-items: basline;
                    gap: 2vmax;
                    color: rgb(4, 137, 225);
                    font-size: 2vmax;
                    border-bottom: 3px solid rgb(4, 137, 225);
                    padding-bottom: 2.5vh;
                    margin-bottom: 8vh;
			}
			body > div > img {
                width: 6vmax;
                height:  3vmax;
                margin-right: 2vmax;
			}
			body > div > h2 {
                padding-top: 3vh;
			}

                    h3 {
                        margin: 0 auto;
                    font-size: 2.3vmax;
                    margin-bottom: 6vh;
                    width: 80%;
			}
                    h4 {
                        text-align: center;
                    font-size: 2.5vmax;
                    background-color: rgb(0, 75, 125);
                    color: rgb(219, 243, 255);
                    width:fit-content;
                    padding: 1%;
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
                    font-size: 1.4rem;
                    background-color: rgb(0, 75, 125);
                    color: rgb(219, 243, 255);
                    padding: 0.7%;
                    line-height: 100%;
                    margin: 0 auto;
                    border-radius: 0.6vmax;
                    display: inline-block;
                    transition: all 400ms ease-in-out;
			}
        
                </style>
            </head>
            <body>
                <div>
                    <img
                        src="cid:persianspacex@gmail.com"
                        alt="" />
                    <h2>Don't Panic</h2>
                </div>
                <h3>Hello ${userInfo.user}</h3>
                <h5>
                    We at Finoccio, will help you to go on,  on your journey towards
                    your financial aspirations. <br /><br />
                    Please <a href=${link}/reset-password/${token}>CLICK HERE!</a> to reset your Password!
                    
                </h5>
                
            </body>
        </html>

    `
}


export default createResetPasswordMail;