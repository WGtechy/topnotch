async function subscribe(){
    let sw = await  navigator.serviceWorker.ready;
    let push = await subscribe.pushManager.subscribe({
        useVisibleOnly: true,
        applicationServerey: process.env.REACT_APP_WEB_ADDRESS
        // process.env.REACT_APP_PUSH_NOTIFICATION_SERVER_KEY
    })
}