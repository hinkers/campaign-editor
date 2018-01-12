// On document ready
function w3_open() {
	document.getElementById("main").style.marginLeft = "25%";
	document.getElementById("mySidebar").style.width = "25%";
	document.getElementById("mySidebar").style.display = "block";
	document.getElementById("openNav").style.display = 'none';
}
function w3_close() {
	document.getElementById("main").style.marginLeft = "0%";
	document.getElementById("mySidebar").style.display = "none";
	document.getElementById("openNav").style.display = "inline-block";
}

// Intial vars
var sidebarOpen = 250;
var sidebarClosed = 50;
var sidebarWidth = sidebarOpen;

var currentIcon = 'files';

// Editor re-size
function editorResize() {
	$('#sidebar').width(sidebarWidth);
	$('#editor').css('left', sidebarWidth);
	$('#editor').width($(window).width() - sidebarWidth);
	$('#editor').height($(window).height());
}

// Sidebar toggle
function sidebarToggle() {
	if (sidebarWidth == sidebarOpen) {
		sidebarWidth = sidebarClosed;
	} else {
		sidebarWidth = sidebarOpen;
	}
	editorResize();
}

// Update sidebar
function updateSidebar() {
	console.log('pass');
}

// On document ready
$(() => {

	// Editor size
	editorResize();
	$(window).resize(() => {
		editorResize();
	});

	// Preview toggle
	$('#icons li:not([data-name])').click(function(event) {
		// Get clicked li
		sender = $(event.currentTarget);

		// Icons
		viewIcon = '<i class="fas fa-eye"></i>';
		editIcon = '<i class="fas fa-pencil-alt"></i>';

		if (sender.data('mode') == 'edit') {
			sender.html(editIcon);
			sender.data('mode', 'preview');
		} else if (sender.data('mode') == 'preview') {
			sender.html(viewIcon);
			sender.data('mode', 'edit');
		}
	});

	// Sidebar change
	$('#icons li[data-name]').click(function(event) {
		// Get clicked li
		sender = event.currentTarget;

		// Determine outcome
		if ($(sender).data('name') == currentIcon) {
			sidebarToggle();
			currentIcon = false;
		} else if (currentIcon === false) {
			sidebarToggle();
			currentIcon = $(sender).data('name');
	 	} else {
			currentIcon = $(sender).data('name');
		}

		updateSidebar();
	});

	// Monsters test
	$('#monsters-button').click(function () {
		const remote = require('electron').remote;
		const BrowserWindow = remote.BrowserWindow;

		var win = new BrowserWindow({
			autoHideMenuBar: true,
			useContentSize: true,
			width: 360,
			height: 515,
			resizable: false,
			fullscreenable: false
		});

		// Send monster number to be shown
		win.monsterNumber = 8;

		win.webContents.on('did-finish-load', () => {
			win.setMenu(null);
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
