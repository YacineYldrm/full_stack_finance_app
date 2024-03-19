

// --------------------Home no effect-----------------------

useEffect(() => {
    setAccount(provider?.accounts[provider?.cardIndex]);
}, [provider?.cardIndex, provider]);

// --------------------myWallet no effect-----------------------


useEffect(() => {
    provider.setAccount(provider?.accounts[provider?.cardIndex]);
}, [provider]);