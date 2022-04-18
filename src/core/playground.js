
const PlayGround = () => {

    let store = undefined;

    return {
        Store: store,

        init(app) {
            const display_area = document.createElement('div');
            app.append(display_area);
            
            const store = document.createElement('div');
            store.classList.add('fire_main');
            
            store.setAttribute('id', 'fire_display_area');
            display_area.append(store);

            this.Store = store; 
        }
    }
}

export default PlayGround;