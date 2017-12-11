$(function() {

    $('#head #name').click(function() {
        location.reload();
    });

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
        //var monster = json[Math.floor(Math.random() * json.length)];
        var monster = json[8];
        console.log(monster);

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

    });

    // Collapse or expand
    $('.name_toggle').click(function() {
        console.log(this);
        //$(this).hide();
        //$(this).closest('p').toggle();
        //$(this).closest('i').show();
    });
    console.log(1);
});
