import React from 'react';
import CatStream from './CatStream';
import Chat from './Chat';


function StreamChat() {
    return (
        <div className='StreamChat'>
            <CatStream />
            <Chat />
        </div>
    )
}

export default StreamChat;