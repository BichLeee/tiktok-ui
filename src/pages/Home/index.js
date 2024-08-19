import { useState } from 'react';
import Video from '~/components/Video';

function Home() {
    const [muted, setMuted] = useState(false);
    return (
        <div>
            <Video muted={muted} setMuted={setMuted} />
        </div>
    );
}

export default Home;
