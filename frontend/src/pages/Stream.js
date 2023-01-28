import React from 'react';
import VideoFeed from './streamchat/video/VideoFeed';

function Stream() {
    return (
        <div className='stream'>
            Hello World!
            <VideoFeed src="http://localhost:8083/stream/pattern/channel/0/hls/live/index.m3u8" />
        </div>
    )
}

export default Stream;