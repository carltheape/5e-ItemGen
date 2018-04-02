module.exports = function() {
	
	var settings;
	
	return {
		
		settings: {
			
		},
		
		init: function() {
			
			settings = this.settings;
			
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
		
		console.log(bkg);
						
		}
	}
}