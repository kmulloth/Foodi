
// MARK: Menu item helpers

/**
 * Menu Item Constructor
 *
 * @param {string} title - The menu title
 * @param {string} value - The gxValue for the menu items
 */

function menuItem(title,value = title)
{
	return { 
		gxTitle: title, 
		gxValue: value,  
		"copy" : function() {
			var cpy = Object.assign({}, this);
			return cpy;
		},
		"setValue" : function (theValue, theKey) { 
			var obj = this.copy();
			obj[theKey] = theValue;
			return obj;			
		},
		"hideKey" : function(key) {
			return this.setValue(key, "gxHideOnKey");
		},
		"keyEquiv" : function(key) {
			return this.setValue(key, "gxKeyEquivalent");
		},
		"menuItems" : function(items) { 
			return this.setValue(items, "gxMenuItems");
		},
		"isAlternate" : function() {
			return this.setValue(true, "gxIsAlternate");
		}
	};
};

function seperatorItem()
{
	return menuItem("-", null)
};

 
