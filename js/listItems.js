// listItem object
function listItem(icon, name) {

	// Constructor
	var self = {};
	self.icon = icon;
	self.name = name;
	self.dataValues = [];

	// Draw list item
	self.draw = () => {
		var i = '<i class="' + self.icon + '"></i>';
		var li = '<li>' + i + ' ' + name + '</li>';
		return li;
	};

	// Store data about self item
	self.data = function(get, set) {
		switch (arguments.length) {
			case 0:
				return self.dataValues[get];

			case 1:
				return self.dataValues[get] = set;

			default:
				return self.dataValues;
		}
	};

	return self;
}
