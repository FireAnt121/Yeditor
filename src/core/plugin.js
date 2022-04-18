import Config from '../../config.js'
import State from './state.js';

const YPlugin = (() => {

    let changeEvent = undefined;
    let storeClickEvent = undefined;
    let render = undefined;
    let enterEvent;
    let backspaceEvent;
    return {
        state: State,
        config: Config,
        element: undefined,

        init() { try {render(); } catch (e) {}},
        initChangeEvent(e) { try { changeEvent(e); } catch (e) { } },
        initEnterEvent(e) { try {enterEvent(e); } catch(e) {}},
        initStoreEvent(e) { try { storeClickEvent(e); } catch (err) {} },
        initBackSpaceEvent(e) { try { backspaceEvent(e); } catch (err) {} },

        addRender(fn) { render = fn },
        addChangeEvent(fn) { changeEvent = fn; },
        addEnterEvent(fn) { enterEvent = fn; },
        addBackSpaceEvent(fn) { backspaceEvent = fn; },
        addClickEventOnStore(fn) { storeClickEvent = fn; }
    };
});


export default YPlugin;