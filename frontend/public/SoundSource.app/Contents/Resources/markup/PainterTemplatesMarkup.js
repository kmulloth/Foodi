	markup.push({

		// MARK: label fore painter
			
		"LabelFore": {
			nsClass: "GXStringPainter",
			gxFontSize: 13,
			gxFontColor: Colors.primaryContent,
			gxBackColor: null,
			gxFontShadow: "[0, 0, 0, 0], [0, 1], 1",
			gxHAlign: 0.5,
			gxVAlign: 0.5,

			// alignment styles
			"left"		        : { gxHAlign: 0 },
			"centerx"	        : { gxHAlign: 0.5 },
			"right"		        : { gxHAlign: 1 },
			"top"		        : { gxVAlign: 0 },
			"centery"	        : { gxVAlign: 0.5 },
			"bottom"	        : { gxVAlign: 1 },
		
			// weight (font weights match apple's naming)
			"light"		        : { gxFontWeight: -0.4 },
			"regular"	        : { gxFontWeight: 0 },
			"medium"	        : { gxFontWeight: 0.23 },
			"bold"		        : { gxFontWeight: 0.4 },
		
			"fontColor"		    : { gxFontColor: Colors.primaryContent },
			"fontColorInverted"	: { gxFontColor: Colors.primaryContent.inverted() },
			"white"		        : { gxFontColor: Colors.white },
			"black"		        : { gxFontColor: Colors.black },
			"background"        : { gxFontColor: Colors.background },
			"primary"	        : { gxFontColor: Colors.key },
			"secondary"	        : { gxFontColor: Colors.paleGray },
			"on"		        : { gxFontColor: Colors.black },
			"disabled"	        : { gxFontColor: Colors.darkGray },
				   
			// word wrap
			"wrap"		: { gxLineBreakMode: 0 },

			// sizes
			"size8"		: { gxFontSize: 8 },
			"size9"		: { gxFontSize: 9 },
			"size95"	: { gxFontSize: 9.5 },
			"size10"	: { gxFontSize: 10 },
			"size105"	: { gxFontSize: 10.5 },
			"size11"	: { gxFontSize: 11 },
			"size115"	: { gxFontSize: 11.5 },
			"size12"	: { gxFontSize: 12 },
			"size125"	: { gxFontSize: 12.5 },
			"size13"	: { gxFontSize: 13 },
			"size135"	: { gxFontSize: 13.5 },
			"size14"	: { gxFontSize: 14 },
			"size145"	: { gxFontSize: 14.5 },
			"size15"	: { gxFontSize: 15 },
			"size16"	: { gxFontSize: 16 },
			"size17"	: { gxFontSize: 17 },
			"size18"	: { gxFontSize: 18 },
			"size20"	: { gxFontSize: 20 },
			"size22"	: { gxFontSize: 22 },
			"size24"	: { gxFontSize: 24 },
			"size26"	: { gxFontSize: 26 },
			"size28"	: { gxFontSize: 28 },
			"size30"	: { gxFontSize: 30 }
		},

		// "LabelFore".push(addColorsForKey("gxFontColor")),

		// MARK: image painters

		"ImagePainter": {
			nsClass: "GXImagePainter",
		},

		"StretchHImagePainter": {
			"+": "ImagePainter",
			gxVertical: false
		},

		"StretchVImagePainter": {
			"+": "ImagePainter",
			gxVertical: true
		},

		// MARK: base control painters
		// a common base shared by painters for buttons, popup menus etc

		"ControlFore": {
			"+": "LabelFore",
			gxEdgeInsets: "2, 0, 2, 0",
			gxIconSpacing: 5,
			gxFontColor: Colors.primaryContent,
			"on": { gxFontColor: Colors.primaryContent.showPressed() },
			"disabled": { gxFontColor: Colors.darkGray.showPressed() }
		},

		"ControlBack": Painter()
			.radius(6)
			.fill(Colors.controlFill.showPressed()) 
			.inset(2)
			.styleByMutating("leftSegment", 	(style) => { return style.radii(5,0,5,0).insets(0,0,-1.5,0); 		})
			.styleByMutating("middleSegment",	(style) => { return style.radii(0, 0, 0, 0).insets(-1.5,0,-1.5,0); 	})
			.styleByMutating("rightSegment", 	(style) => { return style.radii(0, 5, 0, 5).insets(-1.5,0,0,0); 	}) 
		, 
		 
		"TextFieldFore": {
			nsClass: "GXStringPainter",
			gxFontSize: 13,
			gxFontColor: Colors.primaryContent,
			gxBackColor: Colors.invisible,
			gxAlignment: "0, 0"
		},

		"TextFieldBack": {
			nsClass: "GXRoundRectPainter",
			gxCornerRadius: 0,
			gxFillColor: Colors.invisible,
		},

		// MARK: button painters

		"ButtonFore": {
			"+": "ControlFore.center"
		},

		"ButtonBack": {
			"+": "ControlBack"
		},

		"CancelBack": {
			"+": "ControlBack",
			gxImage: "popup.arrows"
		},

		// MARK: popup menu painters

		"PopupFore": {
			"+": "ControlFore.size11",
			gxHAlign: 0,
			gxEdgeInsets: "10, 0, 22, 0"        // extra space on right for arrows
		},

		"PopupBack": Painter()
			.fill(Colors.background)
			.radius(6)
			.inset(2)
			.shadow(Colors.key.withAlpha(0.5), 0,0,2),

		"PopupArrows": {
			nsClass: "GXImagePainter",
			gxEdgeInsets: "0, 0, 10, 0",    // inset from right
			gxHAlign: 1,                    // aligned	 right
			gxVAlign: 0.5,
			gxImage: "popup.arrows",
			gxTintColor: Colors.primaryContent,
			"disabled" : {
				gxTintColor: Colors.darkGray
			}
		}, 
 
		// MARK: scrollbar painters

		"ScrollBarKnob":
		{
			nsClass: "GXRoundRectPainter",
			gxCornerRadius: 2.5,
			gxFrameColor: Colors.selection,
			gxFillColor: Colors.selection,
			"vertical": {
				gxEdgeInsets: "6, 4, 2, 3"
			},
			"horizontal": {
				gxEdgeInsets: "6, 3, 6, 3"
			}
		},

		// MARK: radio painters

		"RadioButtonFore": {
			"+": "ControlFore.left.secondary.size11",
			gxEdgeInsets: "24, 0, 0, 0",    // inset from left to leave room for box
		},

		"RadioButtonBack": {
			nsClass: "GXImagePainter",
			gxEdgeInsets: "2, 0, 0, 0",
			gxHAlign: 0,                    // aligned right
			gxVAlign: 0.5,
			gxImage: "radio",
			"colored": {
				gxTintColor: Colors.darkGray,
				"pressed": {
					gxTintColor: Colors.selection.showPressed(),
					"gxAddStyles": ["on"],    // use 'on' artwork
				},
			},
			"disabled": {
				gxTintColor: Colors.darkGray,
			}
		},

		deleteButton: {
			nsClass: "GXButtonView",
			gxLayerZPosition: 1,
			gxIntrinsicWidth: 20,
			gxIntrinsicHeight: 20,
			gxHideOnNilValue: true,
			gxValueKeyPath: "remove",
			gxBackPainter: ImagePainter("delete").tintColor(Colors.key.showPressed()), 
			gxExtraPainter: Painter().shadow(Colors.key.withAlpha(0.4),0,0,5).innerShadow().radius(10).inset(1)
		},
				
		AXVolumeSliderFormatter:
		{
			nsClass: "GXScaledFormatter",
			scale: 100,
			format: "%.0f%%"
		}, 
		AXPanSliderFormatter:
		{
			nsClass: "GXScaledFormatter",
			scale: 100,
			format: "%.0f%%"
		},
	}) 
