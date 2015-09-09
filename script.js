function add_textblock() {
    var placeholder = document.getElementById("new_textblock");
    
    new_textblock = '<div class="row textblock_row"><div class="one column"><div class="checkbox_div" title="Uncheck to not include in email"><input type="checkbox" class="checkbox" checked="true"/>' +
        '</div></div><div class="eleven columns textblock_div"><input type="button" value="-" class="remove_textblock_button" onclick="remove_textblock()" title="Remove paragraph"/>' +
        '<textarea class="u-full-width textblock" placeholder="Paragraph"></textarea></div></div><div id="new_textblock"></div>';
    
    placeholder.outerHTML = new_textblock;
}

function remove_textblock() {
    var e = window.event;
    
    var src_el = e.srcElement;
    
    var row = src_el.parentElement.parentElement;
    
    row.remove();
}

function generate_email() {
    var textblock_row = document.getElementsByClassName("textblock_row");
    
    textblocks = [];
    for (var i=0; i<textblock_row.length; i++) {
        if (textblock_checked(textblock_row[i])) {
            textblock = textblock_row[i].getElementsByClassName("textblock")[0];
            
            textblocks.push(textblock);
        }
    }
    
    var email_content = '';
    
    for (var i=0; i<textblocks.length; i++) {
        var block_content = textblocks[i].value;
        block_content = block_content.replace(/\n{2}/g, '&nbsp;</p><p>');
        block_content = block_content.replace(/\n/g, '&nbsp;<br />');
        email_content = email_content + '<p>' + block_content + '</p>';
    }
    
    var email_content_div = document.getElementById("email_content");
    
    email_content_div.innerHTML = email_content;
}

function textblock_checked(el) {
    var checkbox = el.getElementsByClassName("checkbox")[0];
    
    if (checkbox.checked) return true;
}

function copy_email_content() {
    var email_content = document.getElementById("email_content");
    
    selectElementText(email_content);
    
    document.execCommand('copy');
}

function selectElementText(el, win) {
    win = win || window;
    var doc = win.document, sel, range;
    if (win.getSelection && doc.createRange) {
        sel = win.getSelection();
        range = doc.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (doc.body.createTextRange) {
        range = doc.body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
}