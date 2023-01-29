import React, { useRef } from 'react';
import { TwitchEmbed } from 'react-twitch-embed';
import './StreamChat.css'

function Chat() {
    // const { group_sid, token_sid, token_auth } = useSelector(selectAPIInfo)
    const embed = useRef();

    const handleReady = (e) => {
        embed.current = e;
    }

    return (
        <TwitchEmbed
            className="twitchstream"
            channel="hoya_hacks_kitty_cakes"
            autoplay
            muted
            withChat={false}
            darkMode={false}
            hideControls
            onVideoReady={handleReady}
        />
    );
}

export default Chat;