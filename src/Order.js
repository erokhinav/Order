import React, { Component } from 'react';
import * as UI from '@vkontakte/vkui';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            phoneNumber: null,
            address: null,
        };

        let vkconnect = this.props.vkconnect;
        let self = this;
        vkconnect.subscribe((e) => {
            e = e.detail;
            if (e['type'] === 'VKWebAppGetUserInfoResult') {
                let name = e['data']['first_name'] + ' ' + e['data']['last_name'];
                self.setState({name: name});
            } else if (e['type'] === 'VKWebAppGetPhoneNumberResult' && e['data']['phone_number'] !== null) {
                self.setState({phoneNumber: e['data']['phone_number']});
            } else if (e['type'] === 'VKWebAppGeodataResult') {
                self.getAddress([e['data']['lat'], e['data']['long']]);
            }
        });
        if (this.state.name === null) {
            vkconnect.send('VKWebAppGetUserInfo');
        }
        if (this.state.phoneNumber === null) {
            vkconnect.send('VKWebAppGetPhoneNumber');
        }
        if (this.state.address === null) {
            vkconnect.send('VKWebAppGetGeodata');
        }
    }

    getAddress(coords) {
        let self = this;
        window.ymaps.geocode(coords).then(function (res) {
            self.setState({address: res.geoObjects.get(0).getAddressLine()});
        });
    }

    openNotifyDialog() {
        let self = this;
        let parent = this.props.parent;
        let vkconnect = this.props.vkconnect;
        parent.setState({ popout:
                <UI.Alert
                    actions={[{
                        title: 'OK',
                        autoclose: true,
                        style: 'destructive'
                    }]}
                    onClose={ () => {
                        parent.setState({popout: null, activePanel: 'Main'}, () => {
                            vkconnect.send('VKWebAppViewUpdateNavigationState',
                                {"canBack": false, "canForward": true});
                        })
                    }}
                >
                    <h2>Заказ оформлен</h2>
                    <p>Ожидайте сообщения о подтверждении заказа.</p>
                </UI.Alert>
        });
    }

    render() {
        let state = this.state;

        return (
            <UI.Group title="Оформление заказа">
                <UI.FormLayout v='new'>
                    <div>Имя и фамилия:</div>
                    <UI.Input value={state.name} placeholder="Введите имя и фамилию"/>

                    <div>Телефон:</div>
                    <UI.Input value={state.phoneNumber} placeholder="Введите телефон" />

                    <div>Адрес:</div>
                    <UI.Input value={state.address} placeholder="Введите адрес" />

                    <div>Способ оплаты:</div>
                    <UI.Select>
                        <option>Банковская карта</option>
                        <option>Наличные</option>
                    </UI.Select>
                </UI.FormLayout>
                <UI.Button appearance="vk-wide-primary" onClick={() => {
                    this.openNotifyDialog();
                }}>Оформить</UI.Button>
            </UI.Group>
        );
    }
}

export default Main;
