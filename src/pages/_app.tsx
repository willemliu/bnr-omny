import React from 'react';
import { Menu } from '../components/menu/Menu';
import { Player } from '../components/player/Player';
import './_app.scss';
import '@fdmg/css-grid/css/grid.css';
import '@fdmg/bnr-design-system/components/design-tokens/design-tokens.css';
import '@fdmg/bnr-design-system/components/card/VerticalCard1.css';

function App({ Component, pageProps }) {
    return (
        <section className="body-text sans xs">
            <Menu Programs={pageProps.Programs} />
            <Component {...pageProps} />
            <Player url={pageProps?.audioUrl} />
        </section>
    );
}
export default App;
