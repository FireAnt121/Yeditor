const create_element = (ele, editable = false, classs = null, id = null) => {
  let e = document.createElement(ele);
  (editable) ? e.setAttribute('contenteditable', 'true') : '';
  (classs != null) ? e.classList.add(...classs) : '';
  (id != null) ? e.setAttribute('id', id) : '';
  return e;
}

const insertAfter = (newNode, existingNode) => {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

const setCaret = (el) => {
    var range = document.createRange()
    var sel = window.getSelection()
    
    range.setStart(el, 0)
    range.collapse(true)
    
    sel.removeAllRanges()
    sel.addRange(range)
}

const getCaretPosition = (editableDiv) => {
    var caretPos = 0,
      sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode == editableDiv) {
          caretPos = range.endOffset;
        }
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      if (range.parentElement() == editableDiv) {
        var tempEl = document.createElement("span");
        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
        var tempRange = range.duplicate();
        tempRange.moveToElementText(tempEl);
        tempRange.setEndPoint("EndToEnd", range);
        caretPos = tempRange.text.length;
      }
    }
    return caretPos;
  }

export { create_element,insertAfter , setCaret, getCaretPosition }