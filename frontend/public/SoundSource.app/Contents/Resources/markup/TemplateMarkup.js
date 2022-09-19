markup.push({
	// MARK: "Image view"
	
	"ImageView": {
		nsClass: "GXImageView",
		"gxImagePainter": "ImagePainter",
	},
	
	// MARK: "label view"
	
	"LabelView": {
		nsClass: "GXLabelView",
		gxForePainter: "LabelFore",
		gxDefaultValue: "12345",      // just so it has a size and something visible
		gxIntrinsicHeight: 16
	},
	
	"DescriptionLabelView": {
		"+": "LabelView.left.top.size11.wrap",
		axIsIgnored: false
	},
	
	// MARK: "list view"
	
	"ListView": {
		nsClass: "GXListView",
		gxLayoutSubviews: true,
		gxCollapsible: false,
		gxLayoutHorizontally: false,
		gxCollapsed: false
	},
	
	// MARK: "scrollbar view"
	
	"ScrollBarView":
	{
		nsClass: "GXScroller",
		axIsIgnored: true,
		gxKnobPainter: "ScrollBarKnob",
		gxMinKnobLength: 20
	},
	
	// MARK: "text view"
	
	"TextView": {
		"+": "BaseTextField",
		nsClass: "GXTextView",
	},
	
	// MARK: "textfield view"
	
	"BaseTextField": {    // note: "code depends on the name 'BaseTextField' when looking up gxSelectionColor"
		nsClass: "GXTextField",
		gxBaselineOffset: 2,
		//gxDisabledAlphaColor: "gray:255,28", // placed over everything when disabled
		gxInsertionPointColor: Colors.primaryContent,
		gxSelectionColor: "rgba:167,201,255,100",    // overrides system hilite color for user selection
		gxLabelTemplate: "LabelView.right.primary.size13",
		gxBackPainter: "TextFieldBack",
		gxPlaceholderStyle: "PlaceholderStyle",
		"gxTextPainter": "TextFieldFore",
	},

	"BypassSlider" : { 
		nsClass: "GXSwitchView", 
		axCheckboxRole: true,
		gxIntrinsicHeight: 36,
		gxIntrinsicWidth: 40,
		gxBackPainter: {
			"on" : Painter()
				.fill(Colors.key)
				.radius(5)
				.insets(0,9,0,9),
			"off" : Painter()
				.fill(colorRGBA(179,179,179,100))
				.radius(5)
				.insets(0,9,0,9)
			,
		},
		gxForePainter: {
			"off" : LabelPainter("Off")
				.color(Colors.white)
				.fontSize(11)
				.align(1,0.5)
				.offset(-2,0),
			"on" : LabelPainter("On").color(Colors.white).fontSize(11).align(0,0.5).insets(3,0,0,0),
		},
		gxThumbPainter: Painter().size(14,12).radius(3).fill(Colors.white.showPressed()).shadow(Colors.black,0,0,2), 
	}, 

	"TextField": {
		"+": "BaseTextField"
	},

	"PlaceholderStyle": {
		nsClass: "GXStyledString",
		gxFontSize: 12.3,
		gxFontColor: Colors.darkGray
	},


	"ImageBarButton": {  // images without border
		nsClass: "GXButtonView",
		gxIntrinsicHeight: 24,
		gxIntrinsicWidth: 24,
	},

	"ButtonView": {
		nsClass: "GXButtonView",
		gxTitle: "", // Important for performance
		gxIntrinsicHeight: 25,
		gxIntrinsicWidth: 60,
		gxBackPainter: "ControlBack",
		gxForePainter: "ControlFore"
	},

	// MARK: "window bits"

	"WindowTitle": {
		"+": "LabelView.light.size135",
		gxValueKeyPath: "window.title",
		gxIntrinsicWidth: -1,
		gxLayout: ["H:|-75-[self]-75-|", "V:|-3-[self]"],
		axIsIgnored: true
	},

	"WindowTitleBar": {
		nsClass:  "GXSettingsView",
		gxViewName: "titleBarView",
		gxBackPainter: "WindowTitleBarBack",
		gxIntrinsicWidth: -1,
		gxIntrinsicHeight: 23,
		gxCanDrawSubviewsIntoLayer: true,    // important for drawn text quality of title
		gxLayout: ["H:|[self]|",
		"V:|-(0@900)-[self]"],
		// constraint priority set so code can override. see GXWindow setupCustomTitlebar
		gxChildViews: {
			"title": "WindowTitle"
		},
	},

	"WindowTitleBarBack": {
		nsClass: "GXRoundRectPainter",
		gxEdgeInsets: "-1.5,-2.5,-1.5,0",
		gxCornerRadii: "3, 3, 0, 0",
		gxFillColor: Colors.white,
	},

	//MARK: "Panel Dividers"

	"PanelDivider": {
		nsClass: "GXDrawView",
		gxIntrinsicHeight: 1,
		gxLayout: [
			"H:|-0-[self]-0-|"
		],
		gxBackPainter: "PanelDividerPainter",
	},

	"PanelDividerPainter" : {
		nsClass: "GXPainter",            // "GXPainter" can only fill
		gxFillColor: Colors.selection
	},

	//MARK: "Spinner"

	"Spinner": {
		nsClass: "GXSpinnerView",
		gxStepSize: 30,
		gxSpinAngleScale: 360,
		gxValueKeyPath: "",
		gxFrameRect: "0,0,16,16",
		"gxSpinLayer": "SpinnerLayer"
	},
	"SpinnerLayer": {
		nsClass: "GXDrawLayer",
		gxFrameRect: "0,0,16,16",    // initial size sublayers are relative to
		gxForePainter: {
			"+": "ImagePainter.system_spinner",
			gxTintColor: Colors.primaryContent,
		},
		"gxAnchorPoint": "0.5, 0.5",    // spin around center
		"gxOpacity": 0,    // start invisible}
	},

	// MARK: "formatters"
	"PercentageFormatter": { nsClass: "GXScaledFormatter", "scale": 100, "format": "% .0f%%" },

	"PopupMenuView": {
		nsClass: "GXPopupMenuView",
		gxForePainter: "PopupFore",
		gxBackPainter: "PopupBack",
		gxForePainter: {
			"+": "ControlFore.size12.left",
			gxEdgeInsets: "5,2,0,0",
		},
		gxLayout: [
			"V:[self(28)]",
			"H:[selfLabel]-(5.0)-[self]&alignCenterY",
		],
		gxExtraPainter: "PopupArrows",
		gxLabelTemplate: {
			"+": "LabelView.right.fontColor.size13",
		},
		gxDisableOnNil: false        // menu item with repObject of null is valid, but doesn't mix with this setting. choose one.
	}, 

	"FlatButtonPopup" : {
		"+" : "PopupMenuView",
		gxBackPainter: "FlatButtonBack",
		gxForePainter: "FlatButtonFore",
		gxExtraPainter: "FlatButtonExtra",
		"down": {
			gxExtraPainter: "FlatButtonExtra.down",
		},
		gxHideOnNilValue: true, 
		gxLayout: [
			"H:[self(100)]",
			"V:[self(24)]",
		],
		gxTitle: ""
	},

	"FlatButtonBack" : {
		"+" : "ControlBack", 
		gxStrokeWidth: 1,
		"green" : {
			gxFrameColor: Colors.key.showPressed(),
			gxFillColor: Colors.key.showPressed(),
		},
	},
	"FlatButtonFore" : {
		"+" : "ControlFore.size12.fontColor",
		"green" : {
			gxFontColor: Colors.white
		},
	},
	"FlatButtonExtra" : {
		"+" : "PopupArrows",
		"down" : {
			gxImage: "caret"
		},
		gxTintColor: Colors.white,
	},

	// ---------------------------------
	// MARK: formatter: AX volume slider

	AXVolumeSliderFormatter:
	{
		nsClass: "GXScaledFormatter",
		scale: 100,
		format: "%.0f%%"
	},
	AXBalanceSliderFormatter:
	{
		nsClass: "GXScaledFormatter",
		scale: 100,
		format: "%.0f%%",
		zeroFormat: "0%%"
	},
	DesatOverlay: {
		nsClass: "SoundSource.TCDesatOverlay",
		gxIgnoreMouseClick: true,
		gxValueKeyPath: "", 
		gxLayout: [
			"H:|[self]|",
			"V:|[self]|",
		],
		gxLayerZPosition: 100,
		gxBackPainter : "DesatOverlayBackPainter"
	},

	DesatOverlayBackPainter: {
		nsClass: "GXRoundRectPainter",
		gxFillColor	: Colors.desat
	},

	"AlertButton" : {
		"+" : "ButtonView",
		gxIntrinsicHeight: 30,
		gxViewFlipped: false, // fixes focus ring
		gxIntrinsicWidth: 30,
		gxBaselineOffset: 11,
		gxLayerZPosition: 2,
		gxBackPainter: null,
		gxForePainter: {
			"+": "ControlFore.black",
		},
		gxTitle: Constants.warningIcon,
	},

})


