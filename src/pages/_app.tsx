import React from 'react';
import { Menu } from '../components/menu/Menu';
import { Player } from '../components/player/Player';
import './_app.scss';

function App({ Component, pageProps }) {
    return (
        <>
            <Menu items={pageProps.Programs} />
            <Component {...pageProps} />
            <Player url={pageProps?.audioUrl} />
        </>
    );
}
export default App;
