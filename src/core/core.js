import Config from '../../config.js'
import Events from '../interactive/events.js';
import PlayGround from './playground.js';
import Fonts from '../interactive/Plugins/Fonts/index.js';
import State from './state.js';

const CORE = (app) => {

    const interactive_area = document.createElement('ul');
    interactive_area.classList.add('fire_interactives');
    
    var states = {
        current_ele: undefined,
        selected_font: undefined
    }
   

    var mapped_style = Object.keys(Config?.fontStyle).map((key) => [key, Config?.fontStyle[key]]);
    // Fonts.initChangeEvent()
    // const fonts = Fonts();

    // fonts.init();
    // app.append(fonts.element);
    interactive_area.append(Fonts.element);
    app.append(interactive_area);
    let store = PlayGround();
    store.init(app);
    State.store = store.Store;
    Events(Fonts,store.Store);  
};

export default CORE;
