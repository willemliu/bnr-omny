import React from 'react';
import { Player } from '../components/podcast/player/Player';
import './_app.scss';

function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Player url={pageProps?.audioUrl} />
        </>
    );
}
export default App;
