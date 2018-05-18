import React, { Component } from 'react';
import * as UI from '@vkontakte/vkui';

class Main extends Component {
    render() {
        let self = this;

        return (
            <UI.Group title="Опции">
                <div style={{ marginBottom: '6px' }}>
                    <UI.Button appearance="vk-wide-primary" onClick={() => {
                        this.props.parent.setState({activePanel: 'Order'}, function() {
                            self.props.vkconnect.send('VKWebAppViewUpdateNavigationState',
                                {"canBack": true, "canForward": false});
                        })
                    }}>
                        Оформить заказ
                    </UI.Button>
                </div>
                <UI.Button appearance="vk-wide-primary" onClick={() => {}}>Помощь</UI.Button>
            </UI.Group>
        );
    }
}

export default Main;
