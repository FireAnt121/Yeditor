import Fonts from './interactive/fonts.js'

import Interactives from './interactives.js'

const app = document.getElementById('fire_edit');

const interactive_area = document.createElement('ul');
interactive_area.classList.add('fire_interactives');


var mapped_style = Object.keys(Interactives?.fontStyle).map((key) => [key, Interactives?.fontStyle[key]]);
const fonts = Fonts(mapped_style);
app.append(fonts);

// app.append(fonts_ant);
// let interactive_elements = Interactives.map((object,index) => {
//     switch(object?.type) {
//         case 'single-button': 
//             let temp = document.createElement('button');
//             temp.setAttribute('id', object?.id);
//             temp.innerHTML = object?.text;
//             return temp;
//         break;
//     }
// });

// console.log(interactive_elements);

// interactive_elements.forEach((ele,index) => {
//     app.append(ele);
// })

const create_element = (ele, classs = null, id = null) => {
    let e = document.createElement(ele);
    e.setAttribute('contenteditable','true');
    (classs != null) ? e.classList.add(classs) : '';
    (id != null) ? e.setAttribute('id',id) : '';
    return e;
}
// const area = document.createElement('textarea');
// app.append(area);

const display_area = document.createElement('div');
app.append(display_area);

// const store = create_element('div','fire_main','fire_display_area');
const store = document.createElement('div');
store.classList.add('fire_main');
// store.setAttribute('contenteditable','true');
store.setAttribute('id','fire_display_area');
display_area.append(store);

var current_ele = undefined;
// const initial_ele = document.createElement('div');
// initial_ele.classList.add('fire_block');
// store.append(initial_ele);

// var current_ele = initial_ele;

var old_font_style = undefined;
store.addEventListener("click", function() {
    if (current_ele === undefined) {
        let initial_ele = create_element('div','fire_block');

        // let initial_ele = document.createElement('div');
        // initial_ele.classList.add('fire_block');
        store.append(initial_ele);
        current_ele = initial_ele;
    }
})

current_ele.addEventListener("input", function() {
    // store.innerHTML = area.value;
    let temp;
    let ele = document.createElement('span');

    if( old_font_style != Interactives?.fontStyle[fonts.value].class ) {
        // console.log(current_ele.innerHTML);
        if(current_ele.localName != 'div'){
            console.log(current_ele.parentElement.innerHTML);
            current_ele = current_ele.parentElement;
        }
        ele.classList.add(Interactives?.fontStyle[fonts.value].class);
        console.log(current_ele.innerHTML);
        ele.innerHTML = display_area.innerHTML;
        temp = ele;
        old_font_style = Interactives?.fontStyle[fonts.value].class;
        current_ele.append(temp);
        current_ele = temp;
    }
    //  else {
    //     // console.log(current_ele.innerHTML);
    //     current_ele.innerHTML = area.value;
    // }
    // console.log(fonts.value);
    // // console.dir(app);
    // console.log(store);
});