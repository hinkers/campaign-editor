// Enable jQuery
window.$ = window.jQuery = require('jquery');

// On document ready
$(function() {

    // Ace editor
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
});
