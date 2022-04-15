var Fonts = (mapped_style) => {

    let fonts_ant = document.createElement('select');
    fonts_ant.classList.add('fire_drop');
    fonts_ant.setAttribute('id','fire_drops')
    
    // var mapped_style = Object.keys(Interactives?.fontStyle).map((key) => [key, Interactives?.fontStyle[key]]);

    let interactive_fonts = mapped_style.map((styles) => {
        console.log(styles);
        let option = document.createElement('option');
        option.setAttribute('value', styles[1]?.text);
        option.innerHTML = styles[1]?.text;
        // option.setAttribute('id',styles?.id);
        return option;
    });
    
    interactive_fonts.forEach((styles) => {
        fonts_ant.append(styles);
    })

    return fonts_ant;
}

export default Fonts;