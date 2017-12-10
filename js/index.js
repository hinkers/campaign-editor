// On document ready
$(function () {

	// Tabs
	$('#tabs').tabs({
		active: 0
	});


	// Monsters test
	$('#monsters-button').click(function () {
		const remote = require('electron').remote;
		const BrowserWindow = remote.BrowserWindow;

		var win = new BrowserWindow({ width: 360, height: 600 });

		win.webContents.on('did-finish-load', () => {
			win.show();
			win.focus();
		});

		win.loadURL(url.format({
			pathname: path.join(__dirname, "/monster_card.html"),
			protocol: 'file:',
			slashes: true
		}));

		// Open the debugger while developing (it's just too handy)
		win.webContents.openDevTools();
	});


	// Ace editor
	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/markdown");
	editor.getSession().setUseWrapMode(true);
});
