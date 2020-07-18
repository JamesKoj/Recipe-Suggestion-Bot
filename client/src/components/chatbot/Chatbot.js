import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios/index';
import Cookies from 'universal-cookie';
import {v4 as uuid} from 'uuid';

import Message from './Message';

const cookies = new Cookies();

class Chatbot extends Component {
    messagesEnd;
    inputChat;
    constructor(props) {
        super(props);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this.state = { 
            messages: []
        };
        
        if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), {path: '/'});
        }
        console.log(cookies.get('userID'));
    }
    
    async df_text_query(textQuery) {     
        // every message needs to have who sent it and what was sent 
        let says = {
            speaks: 'Me',
            msg: {
                text: {
                    text: textQuery
                }
            }
        }
        
        // add the current message to the array of messages
        this.setState({messages: [...this.state.messages, says]});
        const res = await axios.post('/api/df_text_query', {text: textQuery, userID: cookies.get('userID')});
        
        // add the chatbot's message to the array of messages
        for (let msg of res.data.fulfillmentMessages) {
            says = {
                speaks: 'Bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]});
        }
        
    }
    
    async df_event_query(eventName) {
        const res = await axios.post('/api/df_event_query', {event: eventName, userID: cookies.get('userID')});
        
        for (let msg of res.data.fulfillmentMessages) {
            let says = {
                speaks: 'Bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]});
        }
        
    }
    
    // checks if component is mounted
    componentDidMount() {
        this.df_event_query('Welcome');
    }
    
    // messagesEnd in the constructor is used here
    // inputChat is auto-focused
    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behaviour:"smooth" });
        this.inputChat.focus();
        
    }
    
    renderCards(cards) {
        return cards.map((card, i) => <Card key={i} payload={card.structValue} />)
    }
    
    renderEachMessage(message, i) {
        if (message.msg && message.msg.text && message.msg.text.text){
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
        } else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.cards) {
            return <div key={i}>
                            <div>
                                <div>
                                    {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                                </div>
                        </div>
                    </div>
        }
    }
    
    renderMessages(stateMessages) {
        if (stateMessages) {
            return stateMessages.map((message, i) => {
                return this.renderEachMessage(message, i);

                
                
            });
        } else {
            return null;                                     
        }
    }
    
    // checks if enter key was entered sends the text to text query
    // then sets the value of the input element to the empty string
    _handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }
    
    // uses the renderMessages function above to return a message
    // onKeyPresss calls the handleInputKeyPress getting user input on the enter key
    render() {
        return (
            <div className="chatbot-box">
                <nav>
                    <div className="nav-wrapper">
                        <a className="brand-logo">Recipe&nbsp;Bot </a>
                    </div>
                </nav>
                <div id="chatbot">
                    {this.renderMessages(this.state.messages)}
                    <div className="messages-chat" ref={(el) => { this.messagesEnd= el; }}></div>
                    <div className="col s12">
                        <input id="input-chatbot" placeholder="type a message:" ref={(input) => { this.inputChat= input; }} type="text" onKeyPress={this._handleInputKeyPress} />
                    </div>
                </div>
            </div>
            
        )
        
    }
    

}

export default Chatbot;