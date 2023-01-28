import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Client as ConversationsClient } from "@twilio/conversations";

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
        const response = await axios.get(`http://localhost:5000/auth`);
        const { data } = response;
        return data.secret;
    }

    componentDidMount = async () => {
        const { location } = this.props;
        const { state } = location || {};
        const { room } = state || {};
        let token = {};
        console.log("---------------------")

        try {
            token = await this.getToken();
        } catch {
            throw new Error("unable to get token, please reload this page");
        }

        // const {secret, sid} = token;
        const client = await ConversationsClient(token);

        client.on("tokenAboutToExpire", async () => {
            const token = await this.getToken();
            client.updateToken(token);
        });

        client.on("tokenExpired", async () => {
            const token = await this.getToken();
            client.updateToken(token);
        });

        client.on("channelJoined", async (channel) => {
            // getting list of all messages since this is an existing channel
            const messages = await channel.getMessages();
            this.setState({ messages: messages.items || [] });
            this.scrollToBottom();
        });

        try {
            const channel = await client.getChannelByUniqueName(room);
            await this.joinChannel(channel);
            this.setState({ channel, loading: false })
        } catch {
            try {
                const channel = await client.createChannel({
                    uniqueName: room,
                    friendlyName: room,
                });
                await this.joinChannel(channel);
            } catch {
                throw new Error("unable to create channel, please reload this page");
            }
        }
    };

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