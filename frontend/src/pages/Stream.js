import React from 'react';
import VideoFeed from './streamchat/video/VideoFeed';

function Stream() {
    return (
        <div className='stream'>
            <script src="https://embed.twitch.tv/embed/v1.js"></script>
            <script type="text/javascript">
                new Twitch.Embed("twitch-embed", {
                    width: 854,
                    height: 480,
                    channel: "monstercat",
                    // Only needed if this page is going to be embedded on other websites
                    parent: ["embed.example.com", "othersite.example.com"]
                });
            </script>
        </div>
    )
}

export default Stream;