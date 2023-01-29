import React from 'react';
import CatStream from './CatStream';
import Chat from './Chat';


function StreamChat() {
    return (
        <div className='StreamChat' >
            <Chat />
            <CatStream />
        </div>
    )
}

export default StreamChat;