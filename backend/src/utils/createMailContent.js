



const createMailContent = (v_code, userInfo, link) => {
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
                    padding: 2.5rem 5rem;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont,
                    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
                    'Helvetica Neue', sans-serif;
                    color: rgb(0, 75, 125);
			}
			body > div {
                        display: flex;
                    align-items: basline;
                    gap: 2rem;
                    color: rgb(4, 137, 225);
                    font-size: 2rem;
                    border-bottom: 3px solid rgb(4, 137, 225);
                    padding-bottom: 2.5rem;
                    margin-bottom: 8rem;
			}
			body > div > img {
                width: 6rem;
                height:  3rem;
                margin-right: 2rem;
			}
			body > div > h2 {
                padding-top: 3rem;
			}

                    h3 {
                        margin: 0 auto;
                    font-size: 2.3rem;
                    margin-bottom: 3rem;
                    margin-bottom: 6rem;
                    width: 80%;
			}
                    h4 {
                        text-align: center;
                    font-size: 2.5rem;
                    background-color: rgb(0, 75, 125);
                    color: rgb(219, 243, 255);
                    width:fit-content;
                    padding: 1%;
                    line-height: 100%;
                    margin: 0 auto;
                    border-radius: 1rem;
                    margin-bottom: 8rem;
			}
                    h5 {
                        margin: 0 auto;
                    margin-bottom: 10rem;
                    font-size: 2rem;
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
                    border-radius: 0.6rems;
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
                    <h2>Welcome to Finco</h2>
                </div>
                <h3>Hello ${userInfo.user}</h3>
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