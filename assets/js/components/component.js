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
			if (items[i].rarity == "Common") {
				common.push(items[i])
			}
			if (items[i].rarity == "None"  && items[i].type == "G"  && items[i].source == "PHB"){
				mundane.push(items[i])
			}
			if (items[i].rarity == "Uncommon"){
				uncommon.push(items[i])
			}
			if (items[i].type == "$"){
				treasure.push(items[i])
			}
			if (items[i].rarity == "Rare"){
				rare.push(items[i])
			}
			if (items[i].rarity == "Very Rare"){
				veryRare.push(items[i])
			}
			if (items[i].rarity == "Legendary"){
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
		
		console.log(potions);
		console.log(wands);
		// console.log(ranged);
		
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
			displayItem(tooltip, stuff.name, "junk");
		};
		
		var getTreasure = function (){
			var stuff = treasure[Math.floor(Math.random()*100)];
			tooltip = "";
			console.log(stuff);
			
			if (stuff.entries) {
				tooltip = `${stuff.entries}<br><br>`;
			}
			if(stuff.value){tooltip += `${stuff.value}`;}
			
			
			displayItem(tooltip, stuff.name, "money");
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
							tooltip += stuff.entries[i].items[j];
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
			tooltip += `<br><br>50-100 gp`;
			displayItem(tooltip, stuff.name, "common")
		};
		
		
		var getUncommon = function(){
			var tooltip = "";
			var stuff = 
			// uncommon[10];
			uncommon[Math.floor(Math.random()*uncommon.length)];
			console.log(stuff);
			
			if (stuff.entries && stuff.entries.length == 1) {
				tooltip = stuff.entries;	
			}
			else if (!stuff.entries){
				tooltip = `When you drink this potion, you gain resistance to ${stuff.resist} for 1 hour`;
			}
			else if(stuff.entries.length > 1) {
				for (var i = 0; i < stuff.entries.length; i++) {
					if (typeof stuff.entries[i] != "object") {
						tooltip += stuff.entries[i]+" ";
					}
					else if (typeof stuff.entries[i] == "object") {
						// for (var j = 0; j < stuff.entries[j].length; j++) {
						// 	tooltip += stuff.entries[j];
						// }
						if (stuff.entries[i].items) {
							for (var q = 0; q < stuff.entries[i].items.length; q++) {
								tooltip += '<br><br>'+stuff.entries[i].items[q];
							}
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
			tooltip += `<br><br>101-500 gp`;
			displayItem(tooltip, stuff.name, "uncommon")
		};
		
		var getRare = function(){
			var tooltip = "";
			var stuff = 
			// uncommon[10];
			rare[Math.floor(Math.random()*rare.length)];
			console.log(stuff);
			
			if (stuff.entries && stuff.entries.length == 1) {
				tooltip = stuff.entries;	
			}
			else if (!stuff.entries){
				if (stuff.type == "RG") {
					tooltip = `You have Resistance to ${stuff.resist} damage while wearing this ring. `;
				}
				else if (stuff.type == "P") {
					tooltip = `When you drink this potion, you gain resistance to ${stuff.resist} for 1 hour`;
				}
			}
			else if(stuff.entries.length > 1) {
				for (var i = 0; i < stuff.entries.length; i++) {
					if (typeof stuff.entries[i] != "object") {
						tooltip += stuff.entries[i]+" ";
					}
					else if (typeof stuff.entries[i] == "object") {
						// for (var j = 0; j < stuff.entries[j].length; j++) {
						// 	tooltip += stuff.entries[j];
						// }
						if (stuff.entries[i].items) {
							for (var q = 0; q < stuff.entries[i].items.length; q++) {
								tooltip += '<br><br>'+stuff.entries[i].items[q];
							}
						}
						if(stuff.entries[i].rows){
							for (var j = 0; j < stuff.entries[i].rows.length; j++) {
								tooltip += `<br>${stuff.entries[i].rows[j]}`
							}
						}
					}
				}
				
				if (stuff.type === "SC") {
					if (stuff.name === "Spell Scroll (4th Level)") {
						tooltip = getScroll(4, tooltip)
					}
					else if(stuff.name == "Spell Scroll (5th Level)"){
						
						tooltip = getScroll(5, tooltip)  
					}
				}
			}
			tooltip += `<br><br>501-5,000 gp`;
			displayItem(tooltip, stuff.name, "rare")
		};
		
		var getVeryRare = function(){
			var tooltip = "";
			var stuff = 
			// uncommon[10];
			veryRare[Math.floor(Math.random()*veryRare.length)];
			console.log(stuff);
			
			if (stuff.entries && stuff.entries.length == 1) {
				tooltip = stuff.entries;	
			}
			else if (!stuff.entries){
				if (stuff.type == "RG") {
					tooltip = `You have Resistance to ${stuff.resist} damage while wearing this ring. `;
				}
				else if (stuff.type == "P") {
					tooltip = `When you drink this potion, you gain resistance to ${stuff.resist} for 1 hour`;
				}
			}
			else if(stuff.entries.length > 1) {
				for (var i = 0; i < stuff.entries.length; i++) {
					if (typeof stuff.entries[i] != "object") {
						tooltip += stuff.entries[i]+" ";
					}
					else if (typeof stuff.entries[i] == "object") {
						// for (var j = 0; j < stuff.entries[j].length; j++) {
						// 	tooltip += stuff.entries[j];
						// }
						if (stuff.entries[i].items) {
							for (var q = 0; q < stuff.entries[i].items.length; q++) {
								tooltip += '<br><br>'+stuff.entries[i].items[q];
							}
						}
						if(stuff.entries[i].rows){
							for (var j = 0; j < stuff.entries[i].rows.length; j++) {
								tooltip += `<br>${stuff.entries[i].rows[j]}`
							}
						}
					}
				}
				
				if (stuff.type === "SC") {
					if (stuff.name === "Spell Scroll (6th Level)") {
						tooltip = getScroll(6, tooltip)
					}
					else if(stuff.name == "Spell Scroll (7th Level)"){
						
						tooltip = getScroll(7, tooltip)  
					}
					else if(stuff.name == "Spell Scroll (8th Level)"){
						
						tooltip = getScroll(8, tooltip)  
					}
				}
			}
			tooltip += `<br><br>5,001 - 50,000 gp`;
			displayItem(tooltip, stuff.name, "very-rare")
		};
		
		var getLegendary = function(){
			var tooltip = "";
			var stuff = 
			// uncommon[10];
			legendary[Math.floor(Math.random()*legendary.length)];
			console.log(stuff);
			
			if (stuff.entries && stuff.entries.length == 1) {
				tooltip = stuff.entries;	
			}
			else if (!stuff.entries){
				if (stuff.type == "RG") {
					tooltip = `You have Resistance to ${stuff.resist} damage while wearing this ring. `;
				}
				else if (stuff.type == "P") {
					tooltip = `When you drink this potion, you gain resistance to ${stuff.resist} for 1 hour`;
				}
			}
			else if(stuff.entries.length > 1) {
				for (var i = 0; i < stuff.entries.length; i++) {
					if (typeof stuff.entries[i] != "object") {
						tooltip += stuff.entries[i]+'<br><br>';
					}
					else if (typeof stuff.entries[i] == "object") {
						// for (var j = 0; j < stuff.entries[j].length; j++) {
						// 	tooltip += stuff.entries[j];
						// }
						if (stuff.entries[i].items) {
							for (var q = 0; q < stuff.entries[i].items.length; q++) {
								tooltip += '<br>'+stuff.entries[i].items[q];
							}
						}
						if(stuff.entries[i].rows){
							for (var j = 0; j < stuff.entries[i].rows.length; j++) {
								tooltip += `<br>${stuff.entries[i].rows[j]}`
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
		
		var getScroll = function(lvl, tool){
			let rando = spLvl[lvl][Math.floor(Math.random() * spLvl[lvl].length) + 0];
			console.log(rando);
			tool = `${rando.name}<br>`;
			tool += `Range: ${rando.range}<br>`;
			tool += `Duration: ${rando.duration}<br>`;
			for (var i = 0; i < rando.text.length; i++) {
				tool += rando.text[i];
			}
			return(tool); 
		}
		
		var checkItem = function(item, tool){
			if (item.type == "S") {
				tool += `<br>AC: ${item.ac}`;
			}
			// if (item.entries[1]){
			// 	tool += `<br>curse name${item.entries[1].entries[0]}`;
			// }
			if (item.reqAttune) {
				tool += `<br>Requires Attunement: ${item.reqAttune}`;
			}
			if (item.type == "M" || item.type == "R"){
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
		return(tool);
		}
		
		var displayItem = function(tool, name, type){
			$(".display").append(
				`<div class="item"><div class="stuff ${type}">${name}</div><p class="tool">${tool}</p></div>`,
				);
		}
		
		// document.addEventListener('mousemove', fn, false);
		// function fn(e) {
		//     for (var i = tool.length; i--;) {
		//         tool[i].style.left = e.pageX + 'px';
		//         tool[i].style.top = e.pageY + 'px';
		//     }
		//     var tank = $(".tool");
		//     for (var i = 0; i < tank.length; i++) {
		//     	tank[i].style.left = e.pageX + 'px';
		//         tank[i].style.top = e.pageY + 'px';
		//     }
		//     console.log(tank);
		    
		// }
		
		$("#delete-all").click(deleteAll);
		$("#mundane-item").click(getMundane);
		$("#treasure-item").click(getTreasure);
		$("#common-magic-item").click(getCommon);
		$("#uncommon-magic-item").click(getUncommon);
		$("#rare-magic-item").click(getRare);
		$("#very-rare-magic-item").click(getVeryRare);
		$("#legendary-magic-item").click(getLegendary);
							
		}
	}
}