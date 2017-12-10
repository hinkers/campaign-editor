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
        var monster = json[Math.floor(Math.random() * json.length)];
        console.log(monster);

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
        $('#combat-stats #challenge_rating').text(monster['challenge_rating']);
        $('#combat-stats #xp').text(xp[monster['challenge_rating']]);

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
    });
});
