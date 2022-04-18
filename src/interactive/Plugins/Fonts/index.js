import YPlugin from '../../../core/plugin.js';
import { create_element, insertAfter ,setCaret, getCaretPosition } from '../../../utils/utils.js'
import State from '../../../core/state.js';

let Fonts = YPlugin();

let fonts_ant = document.createElement('select');
fonts_ant.classList.add('fire_drop');
fonts_ant.setAttribute('id','fire_drops')
Fonts.element = fonts_ant;

Fonts.addRender(() => {
    let mapped_style = Object.keys(Fonts.config?.fontStyle).map((key) => [key, Fonts.config?.fontStyle[key]]);
    let interactive_fonts = mapped_style.map((styles) => {
        let option = document.createElement('option');
        option.setAttribute('value', styles[1]?.text);
        option.innerHTML = styles[1]?.text;
        return option;
    });
    
    interactive_fonts.forEach((styles) => {
        Fonts.element.append(styles);
    })
})

Fonts.addChangeEvent((e) => {

    let mapped_style = Object.keys(Fonts.config?.fontStyle).map((key) => [key, Fonts.config?.fontStyle[key]]);
    let the_parent_value;

    for (let temps of mapped_style) {
        if (temps[1].text === e.target.value) {
            the_parent_value = temps[1].class[0];
            break;
        }
    }
    console.log(the_parent_value);
    console.log(State.selected_font)
    if (State.selected_font !== undefined) {
        State.current_ele.classList.remove(State.current_ele.classList[0]);
        State.current_ele.classList.add(the_parent_value);
    }
})

Fonts.addClickEventOnStore((e) => {
    let mapped_style = Object.keys(Fonts.config?.fontStyle).map((key) => [key, Fonts.config?.fontStyle[key]]);
    State.selected_font = undefined;

    if (e.target.classList[0] !== undefined && e.target.classList[0] !== "fire_main") {
        let the_parent_class = '';
        for (let temps of mapped_style) {
            if (temps[1].class[0] === e.target.classList[0]) {
                the_parent_class = temps[1].text;
                break;
            }
        }
        State.selected_font = the_parent_class;
        Fonts.element.value = the_parent_class;
        State.current_ele = e.target;
        setCaret(e.target);
    }
    if (State.current_ele === undefined) {
        let initial_ele = create_element('div', false, ['fire_block']);
        let first_ele = create_element('p', true, Fonts.config?.fontStyle[Fonts.element.value].class);
        initial_ele.append(first_ele);

        State.store.append(initial_ele);
        State.current_ele = first_ele;
    } else if (State.current_ele !== undefined && e.target.classList[0] === "fire_main") {
        if (State.current_ele.parentElement.localName === 'div') {
            if (State.current_ele?.innerHTML !== "") {
                let first_ele = create_element('p', true, Fonts.config?.fontStyle[Fonts.element.value].class);
                State.current_ele.parentElement.append(first_ele);
                State.current_ele = first_ele;
                setCaret(State.current_ele);
            }
        }
    }
})

Fonts.addEnterEvent((e) => {

    var lvalue = State.current_ele.innerHTML.replace(/^\s+/gi, '').replace(/\s+$/gi, '');
    let first_part = lvalue.substring(0, getCaretPosition(State.current_ele));
    let second_part = lvalue.substring(getCaretPosition(State.current_ele), lvalue.length);

    e.target.innerHTML = first_part;
    let new_ele = create_element('p', true, Fonts.config?.fontStyle[Fonts.element.value].class);
    new_ele.innerHTML = second_part;
    insertAfter(new_ele, e.target);
    State.current_ele = new_ele;
    setCaret(State.current_ele);
})

Fonts.addBackSpaceEvent((e) => {
    if (getCaretPosition(State.current_ele) <= 0) {
        let current_html = State.current_ele.innerHTML;
        let prev_html = State.current_ele.previousElementSibling.innerHTML;
        State.current_ele.previousElementSibling.innerHTML = prev_html + current_html;
        let temp_ele = State.current_ele.previousElementSibling;
        State.current_ele.remove();
        State.current_ele = temp_ele;

        let the_parent_class = '';
        for (let temps of mapped_style) {
            if (temps[1].class[0] === State.current_ele.classList[0]) {
                the_parent_class = temps[1].text;
                break;
            }
        }

        Fonts.element.value = the_parent_class;
        setCaret(State.current_ele);
    }
})

export default Fonts;
