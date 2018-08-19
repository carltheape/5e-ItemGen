module.exports = function() {

    // var settings;

    return {

        // settings: {

        // },

        init: function() {

            // settings = this.settings;

            this.bindUI();
        },

        bindUI: function() {

            $(document).ready(function() {
                $('[data-toggle="tooltip"]').tooltip();
            });

            let bkg = require("./json/backgrounds.json");
            let bit = require("./json/basic-items.json");
            let cls = require("./json/classes.json");
            let fet = require("./json/feats.json");
            let itm = require("./json/items.json");
            let rce = require("./json/races.json");
            let spl = require("./json/spells.json");
            let rdm = require("./json/random-tables.json");
            let fud = require("./json/foods.json");

            let backgrounds = bkg.background;
            let basics = bit.basicitem;
            let properties = bit.itemProperty;
            let itemTypes = bit.itemType;
            let classes = cls.class;
            let feats = fet.feat;
            let items = itm.item;
            let itemNames = [];
            let mundane = [];
            let treasure = [];
            let common = [];
            let uncommon = [];
            let rare = [];
            let veryRare = [];
            let legendary = [];
            let ranged = [];
            let melee = [];
            let wands = [];
            let potions = [];
            let races = rce.race;
            let spells = spl.spell;
            let spLvl = {
                "0": [],
                "1": [],
                "2": [],
                "3": [],
                "4": [],
                "5": [],
                "6": [],
                "7": [],
                "8": [],
                "9": []
            };
            let test = "testing";


            for (var i = 0; i < items.length; i++) {
                itemNames.push(items[i].name)
                if (items[i].rarity == "Common") {
                    common.push(items[i])
                }
                if (items[i].rarity == "None" && items[i].type == "G") {
                    mundane.push(items[i])
                }
                if (items[i].rarity == "Uncommon") {
                    uncommon.push(items[i])
                }
                if (items[i].type == "$") {
                    treasure.push(items[i])
                }
                if (items[i].rarity == "Rare") {
                    rare.push(items[i])
                }
                if (items[i].rarity == "Very Rare") {
                    veryRare.push(items[i])
                }
                if (items[i].rarity == "Legendary") {
                    legendary.push(items[i])
                }
                if (items[i].type == "R") {
                    ranged.push(items[i])
                }
                if (items[i].type == "M") {
                    melee.push(items[i])
                }
                if (items[i].type == "WD") {
                    wands.push(items[i])
                }
                if (items[i].type == "P") {
                    potions.push(items[i])
                }
            }

            for (var i = 0; i < spells.length; i++) {
                spLvl[spells[i].level].push(spells[i]);
            };

            // console.log(potions);
            console.log(items);
            // console.log(ranged);

            var deleteAll = function() {
                $(".display").html("");

            };
            
            function findObjectByKey(array, value) {
                for (var i = 0; i < array.length; i++) {
                    if(array[i].name === value.name){
                        return array[i]
                    }
                }
                return null;
            };

            var getMundane = function(x) {
                var stuff = "";
                if(typeof x == 'undefined') {
                    stuff = mundane[Math.floor(Math.random() * mundane.length)];
                    console.log("empty");
                }
                else{

                    stuff = findObjectByKey(mundane, x);
                    console.log(stuff);
                }
                console.log(stuff);
                tooltip = "";
                // page = `\npage ${stuff.page} of ${stuff.source}`;

                if (stuff.entries && stuff.entries.length == 1) {
                    tooltip = stuff.entries[0];
                    tooltip += `<br><br>${stuff.value}`;
                } else if (stuff.entries && stuff.entries.length > 1) {
                    tooltip = stuff.entries[0];
                    if (stuff.entries[1].items) {
                        console.log(stuff.entries[1].items.length);
                        for (var i = 0; i < stuff.entries[1].items.length; i++) {
                            tooltip += `<br>${stuff.entries[1].items[i]}`;
                        }
                    } else if (stuff.entries[1].rows) {
                        let trinket = stuff.entries[1].rows;
                        tooltip += `<br><br>${trinket[Math.floor(Math.random()*trinket.length)][1]}`;

                    } else {
                        tooltipHelp = " " + stuff.entries[1];
                    }
                    if (stuff.value) { tooltip += `<br><br>${stuff.value}`; }
                } else {
                    tooltip = `${stuff.name}`;
                    if (stuff.value) { tooltip += `<br><br>${stuff.value}`; }
                }
                displayItem(tooltip, stuff.name, "junk");
            };

            var getTreasure = function(x) {
                var stuff = "";
                if(typeof x == 'undefined') {
                    stuff = treasure[Math.floor(Math.random() * 100)]; //100
                    console.log("empty");
                }
                else{

                    stuff = findObjectByKey(treasure, x);
                    console.log(stuff);
                }
                tooltip = "";
                console.log(stuff);

                if (stuff.entries) {
                    tooltip = `${stuff.entries}<br><br>`;
                }
                if (stuff.value) { tooltip += `${stuff.value}`; }


                displayItem(tooltip, stuff.name, "money");
            };

            var getCommon = function(x) {
                var stuff = "";
                if(typeof x == 'undefined') {
                    stuff = common[Math.floor(Math.random() * common.length)];
                    console.log("empty");
                }
                else{

                    stuff = findObjectByKey(common, x);
                    console.log(stuff);
                }
                var tooltip = "";
                console.log(stuff);

                if (stuff.entries.length == 1) {
                    tooltip = stuff.entries;
                } else if (stuff.entries.length > 1) {
                    for (var i = 0; i < stuff.entries.length; i++) {
                        if (typeof stuff.entries[i] != "object") {
                            tooltip += stuff.entries[i];
                        }
                        if (typeof stuff.entries[i] == "object") {
                            tooltip += `<br><br>`;
                            for (var j = 0; j < stuff.entries[i].items.length; j++) {
                                tooltip += stuff.entries[i].items[j];
                            }
                            if (stuff.entries[i].rows) {
                                for (var j = 0; j < stuff.entries[i].rows.length; j++) {
                                    tooltip += stuff.entries[i].rows[j]
                                }
                            }
                        }
                    }

                    if (stuff.type === "SC") {
                        if (stuff.name === "Spell Scroll (Cantrip)") {
                            tooltip = getScroll(0, tooltip)
                        } else if (stuff.name == "Spell Scroll (1st Level)") {

                            tooltip = getScroll(1, tooltip)
                        }
                    }
                }
                tooltip += `<br><br>50-100 gp`;
                displayItem(tooltip, stuff.name, "common")
            };


            var getUncommon = function(x) {
                var tooltip = "";
                var stuff = "";
                if(typeof x == 'undefined') {
                    stuff = uncommon[Math.floor(Math.random() * uncommon.length)];
                    console.log("empty");
                }
                else{
                    stuff = findObjectByKey(uncommon, x);
                    console.log(stuff);
                }

                if (stuff.entries && stuff.entries.length == 1) {
                    tooltip = stuff.entries;
                } else if (!stuff.entries) {
                    tooltip = `When you drink this potion, you gain resistance to ${stuff.resist} for 1 hour`;
                } else if (stuff.entries.length > 1) {
                    for (var i = 0; i < stuff.entries.length; i++) {
                        if (typeof stuff.entries[i] != "object") {
                            tooltip += stuff.entries[i] + " ";
                        } else if (typeof stuff.entries[i] == "object") {
                            // for (var j = 0; j < stuff.entries[j].length; j++) {
                            // 	tooltip += stuff.entries[j];
                            // }
                            if (stuff.entries[i].items) {
                                for (var q = 0; q < stuff.entries[i].items.length; q++) {
                                    tooltip += '<br><br>' + stuff.entries[i].items[q];
                                }
                            }
                            if (stuff.entries[i].rows) {
                                for (var j = 0; j < stuff.entries[i].rows.length; j++) {
                                    tooltip += `<br>${stuff.entries[i].rows[j]}`
                                }
                            }
                        }
                    }

                    if (stuff.type === "SC") {
                        if (stuff.name === "Spell Scroll (2nd Level)") {
                            tooltip = getScroll(2, tooltip)
                        } else if (stuff.name == "Spell Scroll (3rd Level)") {

                            tooltip = getScroll(3, tooltip)
                        }
                    }
                }
                tooltip += `<br><br>101-500 gp`;
                displayItem(tooltip, stuff.name, "uncommon")
            };

            var getRare = function(x) {
                var tooltip = "";
                var stuff = "";
                if(typeof x == 'undefined') {
                    stuff = rare[Math.floor(Math.random() * rare.length)];
                    console.log("empty");
                }
                else{
                    stuff = findObjectByKey(rare, x);
                    console.log(stuff);
                }

                if (stuff.entries && stuff.entries.length == 1) {
                    tooltip = stuff.entries;
                } else if (!stuff.entries) {
                    if (stuff.type == "RG") {
                        tooltip = `You have Resistance to ${stuff.resist} damage while wearing this ring. `;
                    } else if (stuff.type == "P") {
                        tooltip = `When you drink this potion, you gain resistance to ${stuff.resist} for 1 hour`;
                    }
                } else if (stuff.entries.length > 1) {
                    for (var i = 0; i < stuff.entries.length; i++) {
                        if (typeof stuff.entries[i] != "object") {
                            tooltip += stuff.entries[i] + " ";
                        } else if (typeof stuff.entries[i] == "object") {
                            // for (var j = 0; j < stuff.entries[j].length; j++) {
                            // 	tooltip += stuff.entries[j];
                            // }
                            if (stuff.entries[i].items) {
                                for (var q = 0; q < stuff.entries[i].items.length; q++) {
                                    tooltip += '<br><br>' + stuff.entries[i].items[q];
                                }
                            }
                            if (stuff.entries[i].rows) {
                                for (var j = 0; j < stuff.entries[i].rows.length; j++) {
                                    tooltip += `<br>${stuff.entries[i].rows[j]}`
                                }
                            }
                        }
                    }

                    if (stuff.type === "SC") {
                        if (stuff.name === "Spell Scroll (4th Level)") {
                            tooltip = getScroll(4, tooltip)
                        } else if (stuff.name == "Spell Scroll (5th Level)") {

                            tooltip = getScroll(5, tooltip)
                        }
                    }
                }
                tooltip += `<br><br>501-5,000 gp`;
                displayItem(tooltip, stuff.name, "rare")
            };

            var getVeryRare = function(x) {
                var tooltip = "";
                var stuff = "";
                if(typeof x == 'undefined') {
                    stuff = veryRare[Math.floor(Math.random() * veryRare.length)];
                    console.log("empty");
                }
                else{
                    stuff = findObjectByKey(veryRare, x);
                    console.log(stuff);
                }
                if (stuff.entries && stuff.entries.length == 1) {
                    tooltip = stuff.entries;
                } else if (!stuff.entries) {
                    if (stuff.type == "RG") {
                        tooltip = `You have Resistance to ${stuff.resist} damage while wearing this ring. `;
                    } else if (stuff.type == "P") {
                        tooltip = `When you drink this potion, you gain resistance to ${stuff.resist} for 1 hour`;
                    }
                } else if (stuff.entries.length > 1) {
                    for (var i = 0; i < stuff.entries.length; i++) {
                        if (typeof stuff.entries[i] != "object") {
                            tooltip += stuff.entries[i] + " ";
                        } else if (typeof stuff.entries[i] == "object") {
                            // for (var j = 0; j < stuff.entries[j].length; j++) {
                            // 	tooltip += stuff.entries[j];
                            // }
                            if (stuff.entries[i].items) {
                                for (var q = 0; q < stuff.entries[i].items.length; q++) {
                                    tooltip += '<br><br>' + stuff.entries[i].items[q];
                                }
                            }
                            if (stuff.entries[i].rows) {
                                for (var j = 0; j < stuff.entries[i].rows.length; j++) {
                                    tooltip += `<br>${stuff.entries[i].rows[j]}`
                                }
                            }
                        }
                    }

                    if (stuff.type === "SC") {
                        if (stuff.name === "Spell Scroll (6th Level)") {
                            tooltip = getScroll(6, tooltip)
                        } else if (stuff.name == "Spell Scroll (7th Level)") {

                            tooltip = getScroll(7, tooltip)
                        } else if (stuff.name == "Spell Scroll (8th Level)") {

                            tooltip = getScroll(8, tooltip)
                        }
                    }
                }
                tooltip += `<br><br>5,001 - 50,000 gp`;
                displayItem(tooltip, stuff.name, "very-rare")
            };

            var getLegendary = function(x) {
                var tooltip = "";
                var stuff = "";
                if(typeof x == 'undefined') {
                    stuff = legendary[Math.floor(Math.random() * legendary.length)];
                    console.log("empty");
                }
                else{
                    stuff = findObjectByKey(legendary, x);
                    console.log(stuff);
                }

                if (stuff.entries && stuff.entries.length == 1) {
                    tooltip = stuff.entries;
                } else if (!stuff.entries) {
                    if (stuff.type == "RG") {
                        tooltip = `You have Resistance to ${stuff.resist} damage while wearing this ring. `;
                    } else if (stuff.type == "P") {
                        tooltip = `When you drink this potion, you gain resistance to ${stuff.resist} for 1 hour`;
                    }
                } else if (stuff.entries.length > 1) {
                    for (var i = 0; i < stuff.entries.length; i++) {
                        if (typeof stuff.entries[i] != "object") {
                            tooltip += stuff.entries[i] + '<br><br>';
                        } else if (typeof stuff.entries[i] == "object") {
                            // for (var j = 0; j < stuff.entries[j].length; j++) {
                            // 	tooltip += stuff.entries[j];
                            // }
                            if (stuff.entries[i].items) {
                                for (var q = 0; q < stuff.entries[i].items.length; q++) {
                                    tooltip += '<br>' + stuff.entries[i].items[q];
                                }
                            }
                            if (stuff.entries[i].rows) {
                                for (var j = 0; j < stuff.entries[i].rows.length; j++) {
                                    tooltip += `<br>${stuff.entries[i].rows[j]}<br>`
                                }
                            }
                        }
                    }

                    if (stuff.type === "SC") {
                        if (stuff.name === "Spell Scroll (9th Level)") {
                            tooltip = getScroll(9, tooltip)
                        }
                    }
                }
                tooltip = checkItem(stuff, tooltip);
                tooltip += `<br><br>50,001+ gp`;
                displayItem(tooltip, stuff.name, "legendary")
            };

            var getWand = function() {
                var stuff = wands[Math.floor(Math.random() * wands.length)];
                tooltip = "";
                console.log(stuff);

                if (stuff.entries) {
                    tooltip = `${stuff.entries}<br><br>`;
                }
                if (stuff.value) { tooltip += `${stuff.value}`; }
                if (stuff.rarity) { tooltip += `${stuff.rarity}<br>`; }
                if (stuff.name === "Wand of Wonder") {
                    for (var i = 0; i < 22; i++) {
                        tooltip += `${stuff.entries[4].rows[i][0]}, ${stuff.entries[4].rows[i][1]}<br>`
                    }
                }


                displayItem(tooltip, stuff.name, "wand");
            };

            var getPotion = function() {
                var stuff = potions[Math.floor(Math.random() * potions.length)];
                tooltip = "";
                console.log(stuff);

                if (stuff.entries) {
                    tooltip = `${stuff.entries}<br><br>`;
                }
                if (stuff.resist) { tooltip += `When you drink this potion, you gain resistance to ${stuff.resist} damage for 1 hour. <br><br>` };
                tooltip += stuff.rarity;

                displayItem(tooltip, stuff.name, "potion");
            };

            var getScrollOnly = function(e) {
                console.log(e.data);
                var tooltip = "";
                var spLvl = e.data[Math.floor(Math.random() * e.data.length)];

                // console.log("lvl: ", spLvl, " min: ", e.data.min, " max: ",e.data.max);

                tooltip = getScroll(spLvl, tooltip);

                displayItem(tooltip, `Spell Scroll <br>(Level ${spLvl})`, "scroll");
            };

            var getScroll = function(lvl, tool) {
                let rando = spLvl[lvl][Math.floor(Math.random() * spLvl[lvl].length) + 0];
                console.log(rando);
                tool = `${rando.name}<br>`;
                tool += `Range: ${rando.range}<br>`;
                tool += `Duration: ${rando.duration}<br>`;
                for (var i = 0; i < rando.text.length; i++) {
                    tool += rando.text[i];
                }
                return (tool);
            }

            var checkItem = function(item, tool) {
                if (item.type == "S") {
                    tool += `<br>AC: ${item.ac}`;
                }
                // if (item.entries[1]){
                // 	tool += `<br>curse name${item.entries[1].entries[0]}`;
                // }
                if (item.reqAttune) {
                    tool += `<br>Requires Attunement: ${item.reqAttune}`;
                }
                if (item.type == "M" || item.type == "R") {
                    if (item.dmg1) {
                        tool += `<br>Deals: ${item.dmg1}`;
                    }
                    if (item.dmg2) {
                        tool += `/${item.dmg2}`;
                    }
                    if (item.range) {
                        tool += `<br>Range:${item.range}`;
                    }
                    if (item.weaponCategory) {
                        tool += `<br>Category:${item.weaponCategory}`
                    }

                }
                return (tool);
            }
            var deleteItem = function () {
            	$(this).parent().remove();
            }

            var displayItem = function(tool, name, type) {
                $(".display").append(
                    `<div class="item">
                    	<div class="stuff ${type}">${name}</div>
                    	<p class="tool">${tool}</p>
                    	<button class="btn btn-danger btn-xs del-item">
               				<i class="fa fa-times-circle" aria-hidden="true"></i>
        				</button>
                    </div>`,
                );
            }
            // document.addEventListener('mousemove', fn, false);
            // function fn(e) {
            // 	var tank = $(".tool");
            //     for (var i = tank.length; i--;) {
            //         tank[i].style.left = e.pageX + 'px';
            //         tank[i].style.top = e.pageY + 'px';
            //     }
            //     var tank = $(".tool");
            //     for (var i = 0; i < tank.length; i++) {
            //     	tank[i].style.left = e.pageX + 'px';
            //         tank[i].style.top = e.pageY + 'px';
            //     }
            //     console.log(tank);

            // }

	            // $(".del-item").click(function() {
	            // 	console.log("FML");
	            // });


            $("#itemSearch").autocomplete({
               source: itemNames
            });

            $('#itemSubmit').click(function( event ) {
                event.preventDefault();
                let query = $("#itemSearch").val();
                toSearch(items, query);
                $("#itemSearch").val("");
            });


            var toSearch = function(source, search){
            var results = "";
            for (var property1 in source) {
                if (source[property1].name == search) {
                    results = source[property1];
                    console.log(results)
                }
            }
            if(results.rarity == "Common"){
                getCommon(results);
            }
            if(results.type == "$"){
                getTreasure(results);
            }
            if(results.rarity == "None" && results.type == "G"){
                getMundane(results);
            }
            if(results.rarity == "Uncommon"){
                getUncommon(results);
            }
            if(results.rarity == "Rare"){
                getRare(results);
            }
            if(results.rarity == "Very Rare"){
                getVeryRare(results);
            }
            if(results.rarity == "Legendary"){
                getLegendary(results);
            }
            else{
                //HANDLE THE ERROR INPUT
            }
            }

	        $(document).on('click', '.del-item', deleteItem);
            $("#delete-all").click(deleteAll);
            $("#mundane-item").click(function(){
                getMundane();
            });
            $("#treasure-item").click(function(){
                getTreasure();
            });
            $("#common-magic-item").click(function(){
                getCommon();
            });
            $("#uncommon-magic-item").click(function(){
                getUncommon();
            });
            $("#rare-magic-item").click(function(){
                getRare();
            });
            $("#very-rare-magic-item").click(function(){
                getVeryRare();
            });
            $("#legendary-magic-item").click(function(){
                getLegendary();
            });
            $("#wand-item").click(getWand);
            $("#potion-item").click(getPotion);
            $("#scroll-item01").click([0, 1], getScrollOnly);
            $("#scroll-item23").click([2, 3], getScrollOnly);
            $("#scroll-item45").click([4, 5], getScrollOnly);
            $("#scroll-item67").click([6, 7], getScrollOnly);
            $("#scroll-item89").click([8, 9], getScrollOnly);
            
            $(".randItemsTab").click(function() {
                $(this).parent().toggleClass("show");
                $(this).find( "img" ).toggleClass("expanded");
                $(".display").parent().toggleClass("display-small");
            });



            // function MyFunction(info) {
            //     $('#output').html(info);
            // }

            // $('#myButton').click(function() {
            //     var passThis = $('input[name="foo"]').val();
            //     MyFunction(passThis);
            // });

        }
    }
}