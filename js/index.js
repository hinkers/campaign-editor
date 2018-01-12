// Intial vars
var editor;
var position = {
	row: 0,
	column: 0
};

var sidebarOpen = 250;
var sidebarClosed = 50;
var sidebarWidth = sidebarOpen;

var currentIcon = 'files';

// Editor re-size
function editorResize() {
	$('#sidebar').width(sidebarWidth);
	$('#editor, #preview').css('left', sidebarWidth);
	$('#editor, #preview').width($(window).width() - sidebarWidth);
	$('#editor, #preview').height($(window).height());
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

// Function to update the markdown on the preview
function updatePreview() {
	var converter = new showdown.Converter();
	var markdown = converter.makeHtml(editor.getValue());
	$('#preview').html(markdown);
}

// Update sidebar
function updateSidebar() {
	// Unselect previously selected icon
	$('li.selected').removeClass('selected');

	// If the sidebar is open
	if (currentIcon) {
		$('#sidebar-content').show();

		// Select new icon
		$('li[data-name=' + currentIcon + ']').addClass('selected');

		// Clear current content
		$('#sidebar-content').html('');

		// Do different things based on what is selected
		switch (currentIcon) {
			case 'files':
				break;

			case 'players':
				break;

			case 'npcs':
				break;

			case 'enemies':
				$.getJSON("assets/dnd/5e-SRD-Monsters.json", function(monsters) {
					var mons = [];
					$.each(monsters, function(index, monster) {
						var mon = listItem('fas fa-file-alt', monster['name']);
						mons.push(mon);
					});

					var list = '<ul>';
					$.each(mons, function(index, mon) {
						console.log(mon.name);
						list += mon.draw();
					});
					list += '</ul>';
					$('#sidebar-content').html(list);
				});
				break;
		}
	} else {
		$('#sidebar-content').hide();
	}
}

// Slide toggle between two elements
function slideBetween(oldDOM, newDOM) {
	$(newDOM).show();
	$(oldDOM).hide();
	// $(newDOM).show();
	// $(newDOM).animate({'left': '+=' + $(newDOM).width() / 2}, 'slow');
	// $(oldDOM).animate({'left': '-=' + $(newDOM).width() / 2}, 'slow');
	// $(oldDOM).hide()
}

// On document ready
$(() => {

	// Hide markdown preview on startup
	$('#preview').hide();

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
			slideBetween('#editor', '#preview');
			updatePreview();
			position = editor.getCursorPosition();
		} else if (sender.data('mode') == 'preview') {
			sender.html(viewIcon);
			sender.data('mode', 'edit');
			slideBetween('#preview', '#editor');
			editor.focus();
			editor.gotoLine(position.row, position.column);
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
	editor = ace.edit("editor");
	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/markdown");
	editor.getSession().setUseWrapMode(true);
});
