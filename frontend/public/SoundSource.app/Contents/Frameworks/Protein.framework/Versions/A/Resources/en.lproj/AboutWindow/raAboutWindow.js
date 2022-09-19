var raAboutWindow = new function() {

	/**
	* Event handler for key press events in the license form
	* @param {Event} e - The keypress event.
	*/
	this.handleKeyPress = function(e) {
		return true;
	}

	/**
	 * Set the name of the product shown in the about window.
	 * @param {string} productName - The product name.
	 */
	this.setProductName = function(productName) {
		var nodes = document.querySelectorAll('.product-name');
		for(var i = 0; i < nodes.length; i++) { 
			nodes[i].innerText = productName;
		}
	};

	/**
	 * Set the app version string.
	 * @param {string} version - The version string.
	 */
	this.setAppVersionString = function(version) {
		var e = document.querySelector('#app-version');
		if(e){
			e.innerHTML = version;
		}
	};

	/**
	 * Set the ACE version string.
	 * @param {string} version - The version string.
	 */
	this.setACEVersionString = function(version) {
		var e = document.querySelector('#ace-version');
		if(e){
			e.innerHTML = version;
		}
	};

	/**
	 * Set the Repository version string.
	 * @param {string} version - The version string.
	 */
	this.setRepositoryVersionString = function(version) {
		var e = document.querySelector('#repository-version');
		if(e){
			e.innerHTML = version;
		}
	};

	/**
	 * Set the build date string.
	 * @param {string} date - The date string.
	 */
	this.setBuildDateString = function(date) {
		var e = document.querySelector('#build-date');
		if(e){
			e.innerHTML = date;
		}
	};

	/** 
	* Disables the right-click menu.
	*/
	this.disableContextMenu = function() {
		document.querySelector('body').setAttribute('oncontextmenu', 'event.preventDefault();');	
	}

	/**
	 * Gets the desired height for the containing window, based on
	 * information found in the ra-size meta tag.
	 * ex: <meta name="ra-size" width="700" height="500">
	 * @returns {number} the desired height, or -1 if the ra-size tag is missing.
	 */
	getRAHeight = function() {
		var meta = document.querySelector('meta[name="ra-size"]');
		
		if(meta) {
			var h = meta.getAttribute('height');
			if(h){
				return Number(h);
			}
		}

		return -1;
	};

	/**
	 * Gets the desired width for the containing window, based on
	 * information found in the ra-size meta tag.
	 * ex: <meta name="ra-size" width="700" height="500">
	 * @returns {number} the desired width, or -1 if the ra-size tag is missing.
	 */
	getRAWidth = function() {
		var meta = document.querySelector('meta[name="ra-size"]');
		
		if(meta) {
			var w = meta.getAttribute('width');
			if(w){
				return Number(w);
			}
		}

		return -1;
	};

	/**
	 * Sends a message back to PTAboutWindowController.
	 * @param {string} msg - the message.
	 */
	postMessage = function(msg) {
		if(window.webkit.messageHandlers.PTAboutWindowController) {
			window.webkit.messageHandlers.PTAboutWindowController.postMessage(msg);
		}
	}

	/**
	 * Sends the window height and width back to PTAboutWindowController.
	 */
	this.postRASize = function() {
		var width = getRAWidth();
		var height = getRAHeight();

		postMessage('{"type": "ra-size", "width": ' + width + ', "height": ' + height + '}');
	}

}