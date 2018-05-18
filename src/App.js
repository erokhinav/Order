import React, { Component } from 'react';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Main from './Main.js';
import Order from './Order.js';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'Main',
            popout: null,
        };

        let self = this;
        let vkconnect = this.props.vkconnect;
        vkconnect.subscribe(function(e) {
            e = e.detail;
            if (e['type'] === 'VKWebAppGoBack') {
                self.setState({activePanel: 'Main'});
                vkconnect.send('VKWebAppViewUpdateNavigationState', {"canBack": false, "canForward": true});
            } else if (e['type'] === 'VKWebAppGoForward') {
                self.setState({activePanel: 'Order'});
                vkconnect.send('VKWebAppViewUpdateNavigationState', {"canBack": true, "canForward": false});
            }
        });
    }

    render() {
        return (
            <UI.View activePanel={this.state.activePanel} popout={this.state.popout}>
                <UI.ScrollView id='Main'>
                    <Main parent={this} vkconnect={this.props.vkconnect}/>
                </UI.ScrollView>
                <UI.ScrollView id='Order'>
                    <Order parent={this} vkconnect={this.props.vkconnect}/>
                </UI.ScrollView>
            </UI.View>
        );
    }
}

export default App;
