import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Client as ConversationsClient } from "@twilio/conversations";
import { GET_CONVERSATION, GET_AUTH } from './chatAPI';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroup } from '../streamButtonSlice';

class ChatScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            messages: [],
            loading: false,
            channel: null,
        };

        // this.scrollDiv = React.createRef();
    }

    getToken = async () => {
        const response = await axios.get(GET_AUTH);
        const { data } = response;
        return data;
    }

    getConversation = async () => {
        const response = await axios.get(GET_CONVERSATION);
        const { data } = response;
        return data.sid;
    }

    // componentDidMount = async () => {
    //     const chatResult = useSelector(selectGroup);
    //     const dispatch = useDispatch();
    //     const [group_sid] = useState(0);

    //     const groupValue = String(group_sid) || '';

    //     const { secret, sid } = this.getToken();

    // };

    joinChannel = async (channel) => {
        if (channel.channelState.status !== "joined") {
            await channel.join();
        }
        channel.on("messageAdded", this.handleMessageAdded);
    };

    handleMessageAdded = (message) => {
        const { messages } = this.state;
        this.setState(
            {
                messages: !!messages ? [...messages, message] : [message],
            },
            this.scrollToBottom
        );
    };

    scrollToBottom = () => {
        console.log("Scroll to bottom");
    };

    sendMessage = () => {
        const { text, channel } = this.state;
        if (text && String(text).trim()) {
            this.setState({ loading: true });
            channel && channel.sendMessage(text);
            this.setState({ text: "", loading: false })
        }
    };

    render() {
        const { loading, text, messages, channel } = this.state;
        const { location } = this.props;

        return (
            <div className='chat-window'>
                {/* <Form>
                    <Form.Group className='message' controlId="formMessage">
                        
                    </Form.Group>
                </Form> */}
                Chat
            </div>
        )
    }
}

export default ChatScreen;