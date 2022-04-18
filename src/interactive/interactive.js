import Fonts from './Plugins/Fonts/index.js'

const Interactive = (app,Config) => {
    const interactive_area = document.createElement('ul');
    interactive_area.classList.add('fire_interactives');
    
    var states = {
        current_ele: undefined,
        selected_font: undefined
    }

    var mapped_style = Object.keys(Config?.fontStyle).map((key) => [key, Config?.fontStyle[key]]);
    const fonts = Fonts(states,Config);
    fonts.onChangeLiseten
    app.append(fonts);

    return {
        mapped_style,
        fonts
    }
};

export default Interactive;
