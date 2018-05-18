import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const vkconnect = require('@vkontakte/vkui-connect');
vkconnect.send('VKWebAppInit');

// Авторизация
vkconnect.subscribe((e) => {
    e = e.detail;
    if (e['type'] === 'VKWebAppAccessTokenReceived') {
        let access_token = e['data']['access_token'];
        console.log('token: ' + access_token);
    }
});
vkconnect.send('VKWebAppGetAuthToken', {"app_id": 6481977, "scope": "video"});

ReactDOM.render(<App vkconnect={vkconnect}/>, document.getElementById('root'));
