// On document ready
$(function() {

    // Tabs
    $('#tabs').tabs({
        active: 0,

    });
    

    // Ace editor
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/markdown");
    editor.getSession().setUseWrapMode(true);
});
