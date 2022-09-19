var raWelcomeWindow = new function() {

	this.didNavigateForward = true;
	
	/**
	 * Event handler for key press events in the license form
	 * @param {Event} e - The keypress event.
	 */
	this.handleKeyPress = function(e) {
		return true;
	}

	/*
	 * Sets OS version information for the unsupportedOS pages.
	 * @param (string) appVersion - the current application version.
	 * @param (string) minOS - the minimum supported OS version.
	 * @param (string) maxOS - the maximum supported OS version.
	 * @param (string) currentOS - the current OS version.
	 */
	this.setVersionInfo = function(appVersion, minOS, maxOS, currentOS) {
		document.querySelectorAll('.appVersion').forEach(function f(e){
			e.innerText = appVersion;
		});
		document.querySelectorAll('.minOSVersion').forEach(function f(e){
			e.innerText = minOS;
		});
		document.querySelectorAll('.maxOSVersion').forEach(function f(e){
			e.innerText = maxOS;
		});
		document.querySelectorAll('.currentOSVersion').forEach(function f(e){
			e.innerText = currentOS;
		});
	}

	/*
	 * Adds an app to the conflicted-apps-list list in the conflictedACE page.
	 * @param (string) appName - the name of the application.
	 * @param (string) appIcon - the base64 encoded icon of the application.
	 * @param (string) appIconRetina - the base64 encoded retina icon of the application.
	 */
	this.addConflictedApp = function(appName, appIcon, appIconRetina) {

		var appListElement = document.querySelector('#conflicted-apps-list');
		if(appListElement) {
			
			// See how many apps are already on the list
			var currentApps = appListElement.querySelectorAll(".conflicted-app");
			if(currentApps.length < 4) {
				console.log("Adding " + appName);
				var newApp = document.createElement('div');
				newApp.classList.add('conflicted-app');
				newApp.innerHTML = "<img src='data:image/png;base64," + appIcon + "' srcset='data:image/png;base64," + appIconRetina + " 2x'><br>" + appName;

				appListElement.appendChild(newApp);
			}

		}
	}

	/*
		 * Sets the extra-conflicted-apps list in the conflictedACE page.
		 * @param (string) appNames - the list of application names.
	 	 */
	this.setExtraAppsList = function(appNames) {
		var appListElement = document.querySelector('#extra-conflicted-apps-list');
			if(appListElement) {
				appListElement.innerText = "As well as: " + appNames + ".";
			}
	}

	/**
		* Sets the app name in templates.
		* @param (string) appName - the name of the app
	 	*/
	this.setAppName = function(appName) {
		var containers = document.querySelectorAll('.template-app-name');
		containers.forEach(function(c){
			c.innerText = appName;
		});
	}

	/**
		* Sets the app bundle id in templates.
		* @param (string) bundleId - the bundle id of the app
	 	*/
	this.setBundleId = function(bundleId) {
		var containers = document.querySelectorAll('.template-bundle-id');
		containers.forEach(function(c){
			c.innerText = appName;
		});
	}

	/**
		* Sets the app tagline in templates.
		* @param (string) tagline - the tagline of the app
	 	*/
	this.setAppTagline = function(tagline) {
		var containers = document.querySelectorAll('.template-app-tagline');
		containers.forEach(function(c){
			c.innerText = tagline;
		});
	}

	/**
		* Sets the app icon in templates.
		* @param (string) appIcon - base64 png representation of the application icon
		* @param (string) appRetinaIcon - base64 png representation of the retina version of the application icon
	 	*/
	this.setAppIcon = function(appIcon, appRetinaIcon) {
		var containers = document.querySelectorAll('.template-app-icon');
		containers.forEach(function(c){
			c.setAttribute('src', 'data:image/png;base64,' + appIcon);
			c.setAttribute('srcset', 'data:image/png;base64,' + appRetinaIcon + ' 2x');
		});
	}

	/**
		* @param (string) installed - 
		* @param (string) installable - 
	 	*/
	this.setACEVersions = function(installed, installable) {

		document.querySelector("#slide-c").setAttribute("title", installable);

		var containers = document.querySelectorAll('.template-app-icon');
		containers.forEach(function(c){
			c.setAttribute("title", installed);
		});
	}

	/**
	* Adds a class to the body tag.
	* @param (string) className - the class to add.
 	*/
	this.addBodyClass = function(className) {
		document.body.classList.add(className);
	}

	/**
	* Removes a class from the body tag.
	* @param (string) className - the class to remove.
 	*/
	this.removeBodyClass = function(className) {
		document.body.classList.remove(className);
	}

	/**
	* Removes all classes from the body tag
 	*/
	this.clearBodyClass = function() {
		document.body.className = "";
	}

	/**
	 * Disables the right-click menu.
	 */
	this.disableContextMenu = function() {
		document.querySelector('body').setAttribute('oncontextmenu', 'event.preventDefault();');
	}


	/*
	 * Sends a message back to WWWindowController.
	 * @param {string} msg - the message.
	 */
	postMessage = function(msg) {
		if(window.webkit.messageHandlers.WWWindowController) {
			window.webkit.messageHandlers.WWWindowController.postMessage(msg);
		}
	}

	/*
	 * Debug functions to allow jumping around within welcome window
	 */
	debugPage = function(pageID, tourIndex = 0, path = null) {
		if(path)		
			postMessage('{"type": "debug-page", "page-id": "' + pageID + '", "index": "' + tourIndex + '", "path": "' + path + '" }');
		else
			postMessage('{"type": "debug-page", "page-id": "' + pageID + '", "index": "' + tourIndex + '" }');
	}

	this.debugPageConflictedACE = function() {
		debugPage("conflicted-ace");
	}

	this.debugPageUnsupportedACE = function() {
		debugPage("unsupported-ace-version");
	}

	this.debugPageUnsupportedApp = function() {
		debugPage("unsupported-app-version");
	}

	this.debugPageACEInstall = function() {
		debugPage("ace-install");
	}

	this.debugPageACEInstallFinished = function() {
		debugPage("ace-install-finished");
	}

	this.debugPageACEUninstall = function() {
		debugPage("ace-uninstall");
	}

	this.debugPageACEUninstallFinished = function() {
		debugPage("ace-uninstall-finished");
	}

	this.debugPageACEUpdate = function() {
		debugPage("ace-update");
	}

	this.debugPageACEUpdateFinished = function() {
		debugPage("ace-update-finished");
	}

	this.debugPageSplashWelcome = function() {
		debugPage("splash");
	}

	this.debugReleaseNotes = function() {
		debugPage("release-notes");
	}

	this.debugPageTour = function(index) {
		debugPage("tour", index);
	}

	this.debugOneShotNotice = function(path) {
		debugPage("one-shot-notice", 0, path);
	}
	
	this.debugPageSecureInstall = function(path) {
		debugPage("secure-install", 0, path);
	}
	
	this.debugPageSecureUpdate = function(path) {
		debugPage("secure-update", 0, path);
	}
	
	this.debugPageSecureApproval = function(path) {
		debugPage("secure-approval", 0, path);
	}

	this.debugPageSecureInstallSilicon = function(path) {
		debugPage("secure-install-silicon", 0, path);
	}

	this.debugPageSecureApprovalSilicon = function(path) {
		debugPage("secure-approval-silicon", 0, path);
	}

	this.debugPageSecureEnableSystemExtensions = function(path) {
		debugPage("secure-enable-system-extensions", 0, path);
	}

}
