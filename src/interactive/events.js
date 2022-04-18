
const Events = (fonts,store) => {

fonts.init();
fonts.element.addEventListener("change", function (e) { fonts.initChangeEvent(e) });

store.addEventListener("click", function (e) {
    fonts.initStoreEvent(e);
})

store.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'Enter': {
            e.preventDefault()
            fonts.initEnterEvent(e);
            break;
        }
        case 'Backspace': {
            fonts.initBackSpaceEvent(e);
            break;
        }
    }
});

}

export default Events;