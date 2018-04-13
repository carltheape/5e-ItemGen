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
		
		let backgrounds = bkg.background;
		let basics = bit.basicitem;
		let properties = bit.itemProperty;
		let itemTypes = bit.itemType;
		let classes = cls.class;
		let feats = fet.feat;
		let items = itm.item;
		let races = rce.race;
		let mundane =[];
		let treasure = [];
		
		console.log(items);
		for (var i = 0; i < items.length; i++) {
			if (items[i].rarity == "Common") {
				console.log(items[i])
			}
		}

		
		for (var i = 0; i < items.length; i++) {
			if (items[i].rarity == "None"  && items[i].type == "G"  && items[i].source == "PHB"){
				mundane.push(items[i])
			}
		};
		
		for (var i = 0; i < items.length; i++) {
			if (items[i].type == "$"){
				treasure.push(items[i])
			}
		};
		
		var deleteAll = function(){
			$(".display").html("");

		}
		
		var getMundane = function (){
			var stuff = mundane[Math.floor(Math.random()*mundane.length)];
			console.log(stuff);
			tooltip = "";
			tooltipHelp = "";
			page = `\npage ${stuff.page} of ${stuff.source}`;
			
			if (stuff.entries && stuff.entries.length == 1) {
				tooltip = stuff.entries[0];
			} else if (stuff.entries && stuff.entries.length > 1){
				tooltip = stuff.entries[0];
				
				if (stuff.entries[1].items) {
					for (var i = 0; i < stuff.entries[1].items.length; i++) {
						tooltipHelp += "\n"+stuff.entries[1].items[i];
					}
				} else {
						tooltipHelp = " "+stuff.entries[1];
				}
				
			} else {
				tooltip = "no additional info available"
			}
			$(".mundane").append(
				`<div class="stuff"><p class="tool">${tooltip}${tooltipHelp}${page}</p>${stuff.name}</div>`,
				`<hr>`
				);
		};
		
		var getTreasure = function (){
			var stuff = treasure[Math.floor(Math.random()*100)];
			console.log(stuff);
			tooltip = stuff.value;
			
			
			$(".treasure").append(
				`<div class="stuff"><p class="tool">${tooltip}</p>${stuff.name}</div>`,
				`<hr>`
				);
		};
		
		
		$("#delete-all").click(deleteAll);
		$("#mundane-item").click(getMundane);
		$("#treasure-item").click(getTreasure);
							
		}
	}
}