import React, { useState } from 'react';
import axios from 'axios';
import { Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import pusheen from './assets/pusheen-cat.gif'
import { click, update_group } from './streamButtonSlice';
import './Home.css';
import { selectButton } from './streamButtonSlice';
import StreamChat from './streamchat/StreamChat';
import { GET_CONVERSATION } from './streamchat/chatAPI';

function Home() {
    const buttonResult = useSelector(selectButton);
    const dispatch = useDispatch();
    const [clicked] = useState(0);

    const clickValue = Boolean(clicked) || false;

    return (
        <div className="Home">
            <div className="Home-Info">
                {!buttonResult && <div className="Stream-Button">
                    <h1>Kitty Cakes</h1>
                    <Button
                        variant='primary'
                        onClick={() => {
                            dispatch(click(clickValue));
                            axios.get(GET_CONVERSATION).then(response => {
                                const { data } = response;
                                dispatch(update_group({sid: data.sid}));
                            })
                        }}
                    >
                        Watch Kittens!
                    </Button>
                </div>}
                {buttonResult && <div className='Stream-with-Chat'>
                    <StreamChat />
                </div>}
            </div>
        </div>
    )
}

export default Home;