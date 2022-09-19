var raLicenseWindow = new function() {

	var _showingCert = false; 
	/**
	* Event handler for key press events in the license form
	* @param {Event} e - The keypress event.
	*/
	this.handleKeyPress = function(e) {
		if(e.keyCode == 13 && !_showingCert) {
			this.postLicense();
			return false;
		}
		else {
			return true;
		}
	}

	/**
	 * Set the name of the product shown in the license window.
	 * @param {string} productName - The product name.
	 */
	this.setProductName = function(productName) {
		var nodes = document.querySelectorAll('.product-name');
		for(var i = 0; i < nodes.length; i++) { 
			nodes[i].innerText = productName;
		}
	};

	/**
	 * Set the version of the product shown in the license window.
	 * @param {string} productVersion - The product version number.
	 */
	this.setProductVersion = function(productVersion) {
		var nodes = document.querySelectorAll('.product-version');
		for(var i = 0; i < nodes.length; i++) { 
			nodes[i].innerText = productVersion;
		}
	};

	/**
	 * Set the icon of the product shown in the license window.
	 * @param {string} icon - A base64 encoded png image.
	 */
	this.setProductIcon = function(icon) {
		var e = document.querySelector('#product-icon');
		if(e){
			e.src='data:image/png;base64, ' + icon;
		}
	};

	/**
	 * Set the url used for purchasing the product.
	 * @param {string} url - The store url.
	 */
	this.setPurchaseURL = function(url) {
		var e = document.querySelector('#purchase-button')
		if(e){
			e.href = url;
		}
	};

	/**
	 * Set the label used on the purchase button.
	 * @param {string} label - The button label.
	 */
	this.setPurchaseLabel = function(label) {
		var e = document.querySelector('#purchase-button')
		if(e){
			e.innerHTML = label;
		}
	};

	/**
	 * Set the license error message and display the alert animation.
	 * @param {string} error - The error message.
	 */
	this.setLicenseErrorMessage = function(error) {
		var e = document.querySelector('#license-feedback')
		if(e){
			e.innerHTML = error;
		}

		e = document.querySelector('#alert-box')
		if(e){
			e.classList.add('active');
			e.setAttribute('aria-hidden', 'false');
		}
	};

	/**
	 * Set the promotional upgrade header in the trial window.
	 * @param {string} txt - The upgrade header
	 */
	this.setPromoHeader = function(headerText) {
		// NOP
	};

	/**
	 * Set the promotional upgrade text in the trial window.
	 * @param {string} txt - The upgrade text
	 */
	this.setPromoMessage = function(txt) {
		var e = document.querySelector('#promo-message')
		if(e){
			e.innerHTML = txt;
		}
	};

	/**
	 * Set the normal trial limitations message in the license window.
	 * That is, the message shown under normal conditions before the 
	 * trial expires.
	 * @param {string} msg - The trial message.
	 */
	this.setTrialMessage = function(msg) {
		var e = document.querySelector('#trial-message')
		if(e){
			e.innerHTML = msg;
		}
	};

	/**
	* Set the license name and key for the license window.
	* @param {string} name - The license name.
	* @param {string} key - The license key.
	*/
	this.setLicense = function(name, key) {
		
		// To avoid having different functions for certificate view
		// vs form view, take advantage of the fact that querySelectorAll's
		// returns an empty array rather than null if the element doesn't exist
		var nodes = document.querySelectorAll('input[name="name"]');
		for(var i = 0; i < nodes.length; i++) { 
			nodes[i].value = name;
		}

		nodes = document.querySelectorAll('input[name="code"]');
		for(var i = 0; i < nodes.length; i++) { 
			nodes[i].value = key;
		}

		nodes = document.querySelectorAll('#cert-name');
		for(var i = 0; i < nodes.length; i++) { 
			nodes[i].innerText = name;
		}

		nodes = document.querySelectorAll('#cert-code');
		for(var i = 0; i < nodes.length; i++) { 
			nodes[i].innerText = key;
		}
	};

	/**
	 * Activates 'trial expired' mode in the license window.
	 * @param {string} msg - The trial message to use.
	 */
	this.activateTrialExpiration = function(msg) {

		var header = document.querySelector('#trial-header');

		if(header){
			header.classList.add('trial-expired');
			header.innerHTML = 'Trial Limitations Are Now Active!';
		}

		var e = document.querySelector('#trial-message')
		if(e){
			e.innerHTML = msg;
		}
	};

	/**
	 * Triggers the unlock animation.
	 */
	this.unlock = function() {
		document.querySelector('body').classList.add('registered'); 
		
		document.querySelector('#license-form').setAttribute('aria-hidden', 'true');
		document.querySelector('#certificate-bg').setAttribute('aria-hidden', 'false');

		_showingCert = true;
		raCelebrate.start();
		document.querySelector('#certificate-content h2').focus();
	}

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
			var h = meta.getAttribute('height')
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
			var w = meta.getAttribute('width')
			if(w){
				return Number(w);
			}
		}

		return -1;
	};

	/**
	 * Sends a message back to PTLicenseWindow.
	 * @param {string} msg - the message.
	 */
	postMessage = function(msg) {
		if(window.webkit.messageHandlers.PTLicenseWindow) {
			window.webkit.messageHandlers.PTLicenseWindow.postMessage(msg);
		}
	}

	/**
	 * Sends the license name and code back to PTLicenseWindow.
	 * @param {string} msg - the message.
	 */
	this.postLicense = function() {
		var name = document.querySelector('input[name="name"]').value;
		var code = document.querySelector('input[name="code"]').value;

		nodes = document.querySelectorAll('#cert-name');
		for(var i = 0; i < nodes.length; i++) { 
			nodes[i].innerText = name;
		}

		nodes = document.querySelectorAll('#cert-code');
		for(var i = 0; i < nodes.length; i++) { 
			nodes[i].innerText = code;
		}

		postMessage('{"type": "license", "name": "' + name + '", "code": "' + code + '"}');
	}

	/**
	 * Sends the window height and width back to PTLicenseWindow.
	 */
	this.postRASize = function() {
		var width = getRAWidth();
		var height = getRAHeight();

		postMessage('{"type": "ra-size", "width": ' + width + ', "height": ' + height + '}');
	}

}