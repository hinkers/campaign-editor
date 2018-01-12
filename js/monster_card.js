// Get current window (to receive passed variables)
var electron = require('electron');
var currentWindow = electron.remote.getCurrentWindow();

// On document ready
$(function() {

	// Function for working out stat modifiers
	var modifier = function(stat) {
		n = Math.floor(stat / 2) - 5;
		return "(" + (n < 0 ? "" : "+") + n + ")";
	}

	// XP Lookup
	var xp = {
		"0": "0 or 10",
		"1/8": "25",
		"1/4": "50",
		"1/2": "100",
		"1": "200",
		"2": "450",
		"3": "700",
		"4": "1,100",
		"5": "1,800",
		"6": "2,300",
		"7": "2,900",
		"8": "3,900",
		"9": "5,000",
		"10": "5,900",
		"11": "7,200",
		"12": "8,400",
		"13": "10,000",
		"14": "11,500",
		"15": "13,000",
		"16": "15,000",
		"17": "18,000",
		"18": "20,000",
		"19": "22,000",
		"20": "25,000",
		"21": "33,000",
		"22": "41,000",
		"23": "50,000",
		"24": "62,000",
		"25": "75,000",
		"26": "90,000",
		"27": "105,000",
		"28": "120,000",
		"29": "135,000",
		"30": "155,000"
	};


	// Get json file
	$.getJSON("assets/dnd/5e-SRD-Monsters.json", function(json) {

		// Get requested monster
		var monster;
		var ipcRenderer = require('electron').ipcRenderer;
		ipcRenderer.on('monsterNumber', function (monsterNumber) {
			monster = json[currentWindow.monsterNumber];
		});

		// Title
		document.title = monster['name'] + " - " + document.title;

		// Head
		$('#head #name').text(monster['name']);
		$('#head #size').text(monster['size']);
		$('#head #type').text(monster['type']);
		$('#head #type').text(monster['subtype']);
		$('#head #alignment').text(monster['alignment']);

		// Combat stats
		$('#combat-stats #armor_class').text(monster['armor_class']);
		$('#combat-stats #hit_points').text(monster['hit_points']);
		$('#combat-stats #hit_dice').text(monster['hit_dice']);
		$('#combat-stats #speed').text(monster['speed']);

		// Raw stats
		$('#raw-stats #strength').text(monster['strength']);
		$('#raw-stats #strength_mod').text(modifier(monster['strength']));
		$('#raw-stats #dexterity').text(monster['dexterity']);
		$('#raw-stats #dexterity_mod').text(modifier(monster['dexterity']));
		$('#raw-stats #constitution').text(monster['constitution']);
		$('#raw-stats #constitution_mod').text(modifier(monster['constitution']));
		$('#raw-stats #intelligence').text(monster['intelligence']);
		$('#raw-stats #intelligence_mod').text(modifier(monster['intelligence']));
		$('#raw-stats #wisdom').text(monster['wisdom']);
		$('#raw-stats #wisdom_mod').text(modifier(monster['wisdom']));
		$('#raw-stats #charisma').text(monster['charisma']);
		$('#raw-stats #charisma_mod').text(modifier(monster['charisma']));

		// Traits
		var saves = {
			'Str': 'strength_save',
			'Dex': 'dexterity_save',
			'Con': 'consitution_save',
			'Int': 'intelligence_save',
			'Wis': 'wisdom_save',
			'Cha': 'charisma_save'
		};
		var saveStr = [];
		$.each(saves, function(attr, save) {
			if (save in monster) {
				saveStr.push(attr + " " + (monster[save] < 0 ? "" : "+") + monster[save]);
			}
		});
		if (saveStr.length) {
			$('#traits #saving_throws').text(saveStr.join(", "));
		} else {
			$('#traits #saving_throws').closest('p').hide();
		}

		var skills = [
			'Athletics',
			'Acrobatics',
			'Sleight of Hand',
			'Stealth',
			'Arcana',
			'History',
			'Investigation',
			'Nature',
			'Religion',
			'Animal Handling',
			'Insight',
			'Medicine',
			'Perception',
			'Survival',
			'Deception',
			'Intimidation',
			'Performance',
			'Persuasion'
		]
		var skillStr = [];
		$.each(skills, function(i, skill) {
			if (skill.toLowerCase() in monster) {
				skillStr.push(skill + " " + (monster[skill.toLowerCase()] < 0 ? "" : "+") + monster[skill.toLowerCase()]);
			}
		});
		if (skillStr.length) {
			$('#traits #skills').text(skillStr.join(", "));
		} else {
			$('#traits #skills').closest('p').hide();
		}

		if (monster['damage_immunities']) {
			$('#traits #damage_immunities').text(monster['damage_immunities']);
		} else {
			$('#traits #damage_immunities').closest('p').hide();
		}

		if (monster['damage_resistances']) {
			$('#traits #damage_resistances').text(monster['damage_resistances']);
		} else {
			$('#traits #damage_resistances').closest('p').hide();
		}

		if (monster['damage_vulnerabilities']) {
			$('#traits #damage_vulnerabilities').text(monster['damage_vulnerabilities']);
		} else {
			$('#traits #damage_vulnerabilities').closest('p').hide();
		}

		if (monster['condition_immunities']) {
			$('#traits #condition_immunities').text(monster['condition_immunities']);
		} else {
			$('#traits #condition_immunities').closest('p').hide();
		}

		$('#traits #senses').text(monster['senses']);

		if (monster['languages'] == "") {
			$('#traits #languages').text("None");
		} else {
			$('#traits #languages').text(monster['languages']);
		}

		$('#traits #challenge_rating').text(monster['challenge_rating'] + " (" + xp[monster['challenge_rating']] + " XP)");


		// Special abilities
		if ('special_abilities' in monster) {
			var  specialAbilityContainer = $('#special_abilities #special_abilities_clone').clone();
			specialAbilityContainer.prop('id', '').children('.closed').hide();

			$.each(monster['special_abilities'], function(i, ability) {
				var abilityConatiner = specialAbilityContainer.clone();

				abilityConatiner.children('strong').text(ability['name']);
				abilityConatiner.children('p').text(ability['desc']);

				$('#special_abilities').append(abilityConatiner);
			});
		}
		$('#special_abilities #special_abilities_clone').remove();


		// Actions
		if ('actions' in monster) {
			var  actionsContainer = $('#actions #actions_clone').clone();
			actionsContainer.prop('id', '').children('.closed').hide();

			$.each(monster['actions'], function(i, action) {
				var actionContainer = actionsContainer.clone();

				actionContainer.children('strong.action_toggle').text(action['name']);
				actionContainer.children('p').text(action['desc']);

				if ('damage_dice' in action) {
					var img = $('<img src="images/d20.png" />');
					actionContainer.children('span.attack').append(img).append((action['attack_bonus'] < 0 ? " " : " +") + action['attack_bonus']);
					actionContainer.children('span.attack').data('roll', '1d20' + (action['attack_bonus'] < 0 ? "" : "+") + action['attack_bonus']);

					var diceSize = action['damage_dice'].substr(action['damage_dice'].indexOf("d") + 1);
					var img = $('<img src="images/d' + diceSize + '.png" />');
					actionContainer.children('span.damage').append(action['damage_dice'].substr(0, action['damage_dice'].indexOf("d")) + " ").append(img);
					actionContainer.children('span.damage').data('roll', action['damage_dice']);

					if ('damage_bonus' in action) {
						actionContainer.children('span.damage').append((action['damage_bonus'] < 0 ? " " : " +") + action['damage_bonus']);
						actionContainer.children('span.damage').data('roll',  actionContainer.children('span.damage').data('roll') + (action['damage_bonus'] < 0 ? "" : "+") + action['damage_bonus']);
					}

				} else {
					actionContainer.children('.roll_dice, .attack, .damage, br').each(function() {
						$(this).addClass('hidden').hide();
					});
				}

				$('#actions').append(actionContainer);
			});
		}
		$('#actions #actions_clone').remove();


		// Legendary Actions
		if ('legendary_actions' in monster) {
			var  actionsContainer = $('#legendary_actions #legendary_actions_clone').clone();
			actionsContainer.prop('id', '').children('.closed').hide();

			$.each(monster['legendary_actions'], function(i, action) {
				var actionContainer = actionsContainer.clone();

				actionContainer.children('strong.action_toggle').text(action['name']);
				actionContainer.children('p').text(action['desc']);

				if ('damage_dice' in action) {
					var img = $('<img src="images/d20.png" />');
					actionContainer.children('span.attack').append(img).append((action['attack_bonus'] < 0 ? " " : " +") + action['attack_bonus']);
					actionContainer.children('span.attack').data('roll', '1d20' + (action['attack_bonus'] < 0 ? "" : "+") + action['attack_bonus']);

					var diceSize = action['damage_dice'].substr(action['damage_dice'].indexOf("d") + 1);
					var img = $('<img src="images/d' + diceSize + '.png" />');
					actionContainer.children('span.damage').append(action['damage_dice'].substr(0, action['damage_dice'].indexOf("d")) + " ").append(img);
					actionContainer.children('span.damage').data('roll', action['damage_dice']);

					if ('damage_bonus' in action) {
						actionContainer.children('span.damage').append((action['damage_bonus'] < 0 ? " " : " +") + action['damage_bonus']);
						actionContainer.children('span.damage').data('roll',  actionContainer.children('span.damage').data('roll') + (action['damage_bonus'] < 0 ? "" : "+") + action['damage_bonus']);
					}

				} else {
					actionContainer.children('.roll_dice, .attack, .damage, br').each(function() {
						$(this).addClass('hidden').hide();
					});
				}

				$('#legendary_actions').append(actionContainer);
			});
		}
		$('#legendary_actions #legendary_actions_clone').remove();


		// Collapse or expand actions
		$('.action_toggle').click(function() {
			var parent = $(this).closest('div');
			$(parent).children('svg').each(function(key, i) {
				$(i).toggle();
			});
			$(parent).children('p, strong:not(.action_toggle):not(.hidden), span:not(.hidden), br:not(.hidden)').each(function(key, i) {
				$(i).slideToggle();
			});
		});


		// Roll dice
		$('.roll_dice').click(function() {
			var roll = $(this);
			if (roll.is('strong')) {
				roll = $(this).next('span');
			}

			var copyElement = $('<input value="/r ' + roll.data('roll') + '">');
			$('body').append(copyElement);
			copyElement.select();
			document.execCommand("copy");
			copyElement.remove();

			// TODO: Show copied tooltip
		});


		// Fix width if there is a scrollbar
		if ($("body").height() > $(window).height()) {
			require('electron').remote.getCurrentWindow().setSize(383, 515);
		}

	});
});
