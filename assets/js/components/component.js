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
			
		let bkg = require("./json/backgrounds.json");
		let bit = require("./json/basic-items.json");
		let cls = require("./json/classes.json");
		let fet = require("./json/feats.json");
		let itm = require("./json/items.json");
		let rce = require("./json/races.json");
		let spl = require("./json/spells.json");
		
		let backgrounds = bkg.background;
		let basics = bit.basicitem;
		let properties = bit.itemProperty;
		let itemTypes = bit.itemType;
		let classes = cls.class;
		let feats = fet.feat;
		let items = itm.item;
		let mundane =[];
		let treasure = [];
		let common = [];
		let uncommon = [];
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
			if (items[i].rarity == "Common") {
				common.push(items[i])
			}
		}

		for (var i = 0; i < items.length; i++) {
			if (items[i].rarity == "None"  && items[i].type == "G"  && items[i].source == "PHB"){
				mundane.push(items[i])
			}
		};
		
		for (var i = 0; i < items.length; i++) {
			if (items[i].rarity == "Uncommon"){
				uncommon.push(items[i])
			}
		};
		
		for (var i = 0; i < items.length; i++) {
			if (items[i].type == "$"){
				treasure.push(items[i])
			}
		};
		
		for (var i = 0; i < spells.length; i++) {
			spLvl[spells[i].level].push(spells[i]);
		};
		
		console.log(uncommon);
		
		var deleteAll = function(){
			$(".display").html("");

		};
		
		var getMundane = function (){
			var stuff = mundane[Math.floor(Math.random()*mundane.length)];
			console.log(stuff);
			tooltip = "";
			page = `\npage ${stuff.page} of ${stuff.source}`;
			
			if (stuff.entries && stuff.entries.length == 1) {
				tooltip = stuff.entries[0];
				tooltip += `<br><br>${stuff.value}`;
			} else if (stuff.entries && stuff.entries.length > 1){
				tooltip = stuff.entries[0];
				if (stuff.entries[1].items) {
					console.log(stuff.entries[1].items.length);
					for (var i = 0; i < stuff.entries[1].items.length; i++) {
						tooltip += `<br>${stuff.entries[1].items[i]}`;
					}
				} 
				else if(stuff.entries[1].rows){
					let trinket = stuff.entries[1].rows;
					tooltip += `<br><br>${trinket[Math.floor(Math.random()*trinket.length)][1]}`;
					
				}
				else {
						tooltipHelp = " "+stuff.entries[1];
				}
				if(stuff.value){tooltip += `<br><br>${stuff.value}`;}
			} else {
				tooltip = "no additional info available";
				if(stuff.value){tooltip += `<br><br>${stuff.value}`;}
			}
			displayItem(tooltip, stuff.name, "junk")
		};
		
		var getTreasure = function (){
			var stuff = treasure[Math.floor(Math.random()*100)];
			tooltip = "";
			console.log(stuff);
			
			if (stuff.entries) {
				tooltip = `${stuff.entries}<br><br>`;
			}
			if(stuff.value){tooltip += `${stuff.value}`;}
			
			
			displayItem(tooltip, stuff.name, "money")
		};
		
		var getCommon = function(){
			var tooltip = "";
			var stuff = common[Math.floor(Math.random()*common.length)];
			console.log(stuff);
			
			if (stuff.entries.length == 1) {
				tooltip = stuff.entries;	
			}
			else if(stuff.entries.length > 1) {
				for (var i = 0; i < stuff.entries.length; i++) {
					if (typeof stuff.entries[i] != "object") {
						tooltip += stuff.entries[i];
					}
					if (typeof stuff.entries[i] == "object") {
						tooltip +=`<br><br>`;
						for (var j = 0; j < stuff.entries[i].items.length; j++) {
							tooltip += stuff.entries[i].items[j]
						}
						if(stuff.entries[i].rows){
							for (var j = 0; j < stuff.entries[i].rows.length; j++) {
								tooltip += stuff.entries[i].rows[j]
							}
						}
					}
				}
				
				if (stuff.type === "SC") {
					if (stuff.name === "Spell Scroll (Cantrip)") {
						tooltip = getScroll(0, tooltip)
					}
					else if(stuff.name == "Spell Scroll (1st Level)"){
						
						tooltip = getScroll(1, tooltip)  
					}
				}
			}
			displayItem(tooltip, stuff.name, "common")
		}
		
		
		var getUncommon = function(){
			var tooltip = "";
			var stuff = uncommon[Math.floor(Math.random()*uncommon.length)];
			console.log(stuff);
			
			if (stuff.entries && stuff.entries.length == 1) {
				tooltip = stuff.entries;	
			}
			else if (!stuff.entries){
				tooltip = "When you drink this potion, you gain resistance (1/2 damage) to this type of damage for 1 hour";
			}
			else if(stuff.entries.length > 1) {
				for (var i = 0; i < stuff.entries.length; i++) {
					if (typeof stuff.entries[i] != "object") {
						tooltip += stuff.entries[i];
					}
					if (typeof stuff.entries[i] == "object") {
						for (var j = 0; j < stuff.entries[j].length; j++) {
							tooltip += stuff.entries[j]
						}
						if(stuff.entries[i].rows){
							for (var j = 0; j < stuff.entries[i].rows.length; j++) {
								tooltip += `<br>${stuff.entries[i].rows[j]}`
							}
						}
					}
				}
				
				if (stuff.type === "SC") {
					if (stuff.name === "Spell Scroll (2nd Level)") {
						tooltip = getScroll(2, tooltip)
					}
					else if(stuff.name == "Spell Scroll (3rd Level)"){
						
						tooltip = getScroll(3, tooltip)  
					}
				}
			}
			displayItem(tooltip, stuff.name, "uncommon")
		}
		
		var getScroll = function(lvl, tool){
			let rando = spLvl[lvl][Math.floor(Math.random() * spLvl[lvl].length) + 0];
			console.log(rando);
			tool = `${rando.name}<br>`;
			for (var i = 0; i < rando.text.length; i++) {
				tool += rando.text[i];
			}
			return(tool); 
		}
		
		var displayItem = function(tool, name, type){
			$(".display").append(
				`<div class="item"><div class="stuff ${type}">${name}</div><p class="tool">${tool}</p></div>`,
				);
		}
		
		$("#delete-all").click(deleteAll);
		$("#mundane-item").click(getMundane);
		$("#treasure-item").click(getTreasure);
		$("#common-magic-item").click(getCommon);
		$("#uncommon-magic-item").click(getUncommon);
							
		}
	}
}