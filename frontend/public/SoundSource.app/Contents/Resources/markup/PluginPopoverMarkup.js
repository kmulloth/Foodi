function AUEffectView(insets = "0,0,0,0", presets = true)
{
	return VStack([
		
		View()
			.viewClass("GEAudioUnitView")
			.intrinsicSize(300, 200)
			.setValues({
				gxBackPainter: "AudioUnitBack",
				gxLoadingSpinnerColor: Colors.primaryContent,
				gxPostsParameterChangeNotifications: true, // Sends a notification on mouse down, drag and mouse up.
				gxLayerZPosition: 2,
			}) 
			.backPainter(TemplatePainter("AudioUnitBack"))
			.setValues({
				gxCanBecomeKeyView : true,
				gxPostsParameterChangeNotifications: true,
			})
			.viewName("auView")
			.setValue(insets, "borderInsets"),

		Padding(5),
		
		PresetFooterView("AudioUnitPresets") 
			  .visible(presets)

	])
	.makeHostView()  
	.addLayout("H:[self(<=1@600)]") // Make view shrinky to force it to hug the AU View
	.addLayout("V:[self(<=1@600)]") // More shrinky
}

function PresetFooterView(presetName)
{
	return HStack([
		Spacer(),
		PresetPopupButton(presetName)
			.label("Presets:")
			.width(200)
			.viewName("presetPopup"),
	])
	.makeHostView()
	.fillWidth()
	.height(30)
}

markup.push({

	GenericAUPopover : {
		"+" : "AUPopover",
		gxAutoRecalculatesKeyViewLoop: true,
		gxLayout: [
			"H:|-10-[self]-10-|",
			"V:|-50-[self(<=600)]-10-|", 
		],
		gxChildViews : [
			ScrollView(
				// For the focus ring to draw correctly, the view needs to be hosted inside another view, below
				// the clipview
				VStack([
					AUEffectView(insets = "0,0,0,0", presets=false) 
				])
				.makeHostView()
				.addLayout("V:|-0-[self]-0@700-|")
				.addLayout("H:|-10-[self]-0-|")
			)
			.addLayout("V:|-0-[self]-50-|")
			.addLayout("H:|-10-[self]-3-|"),
			
			PresetFooterView("AudioUnitPresets")
				.rightPad(10)
				.bottomPad(10) 
					
		]
	}, 

	AUPopover: {
		nsClass: "SoundSource.TCPluginPopover",
		gxValueKeyPath: "uiState.popoverState", 
		gxShadow: "{0, 0, 0, 0.2}, {0, 0}, 5",

		// This key isn't needed, but I'm leaving it here as commentary;
		// Because we aren't the owners of AU views, we don't want to take control of their key view loop.
		gxAutoRecalculatesKeyViewLoop: false, 
		gxStrokeColor: Colors.contrast,
		gxBackColor: Colors.background,
		gxInvisibleContentView: true,
		gxHiliteColor: Colors.invisible,
		gxCornerRadius: 10,
		axRoleDescription: "Plugin Window",
		gxHeaderView: PluginPopoverHeader(),
		gxLayout: [
			"H:|-10-[self]-10-|",
			"V:|-50-[self]-10-|",  
		],
		gxChildViews: [ 
			AUEffectView()
			  .addLayout("V:|-0-[self]-10-|")
			  .addLayout("H:|-10-[self(>=200)]-10-|"),
		],   
	},   
	
	KnownAudioUnitMapping:
	{
		// apple effects
		"aufx.appl.bpas":	"AppleAUPopoverTrimAll",					// Apple: AUBandpass
		"aufx.appl.dely":	"AppleAUPopoverTrimTop",					// Apple: AUDelay
		"aufx.appl.dcmp":	"AppleAUPopoverTrimTop",					// Apple: AUDynamicsProcessor 
		"aufx.appl.dist":	"AppleAUPopoverTrimAll",					// Apple: AUDistortion
		"aufx.appl.filt":	"AppleAUPopoverTrimAll",					// Apple: AUFilter
		"aufx.appl.greq":	"AppleAUPopoverTrimAll",					// Apple: AUGraphicEQ
		"aufx.appl.pmeq":	"AppleAUPopoverTrimAll",					// Apple: AUParametricEQ
		"aufx.appl.hpas":	"AppleAUPopoverTrimAll",					// Apple: AUHipass
		"aufx.appl.hshf":	"AppleAUPopoverTrimAll",					// Apple: AUHighShelfFilter 
		"aufx.appl.lpas":	"AppleAUPopoverTrimAll",					// Apple: AULowpass
		"aufx.appl.lshf":	"AppleAUPopoverTrimAll",					// Apple: AULowShelfFilter
		"aufx.appl.mcmp":	"AppleAUPopoverTrimTop",					// Apple: AUMultibandCompressor    
	},
	
	AppleAUPopoverTrimTop: { 
		"+" : "AUPopover",
		gxChildViews: [ 
			AUEffectView("0,28,0,0") 
			  .addLayout("V:|-0-[self]-10-|")
			  .addLayout("H:|-10-[self(>=200)]-10-|")
		],   
	},   
	
	AppleAUPopoverTrimAll: { 
		"+" : "AUPopover",
		gxChildViews: [ 
			AUEffectView("4,28,4,10") 
			  .addLayout("V:|-0-[self]-10-|")
			  .addLayout("H:|-10-[self(>=200)]-10-|")
		],   
	},  

	AudioUnitBack: {
		nsClass: "GXRoundRectPainter",
		gxCornerRadius: 6,
		gxFillColor: Colors.background,
		gxEdgeInsets: "10,0,10,10"
	},   
	
	// --------------------------------------------------
	// MARK: generic AU view controls

	GenericAUSliderItem: {
		nsClass: "GXDrawView",  
		gxCanBecomeKeyView: true,
		gxLayout: [ "H:|-10-[label(160)]-[slider(190)]-[readout(100)]-20-|&alignBaseline",
				   	"V:|-4-[slider]-3-|" ],
		gxChildViews: {
			slider: Slider().setValue(false, "gxIgnoreDoubleClick").viewName("slider"),
			label: {
				"+": "LabelView.right.fontColor.size13"
			},
			readout: {
				"+": "SliderValueLabel", 
				gxAlignment: "{0, 0.5}"
			}
		}
	}, 

	GenericAUSwitchItem: {
		nsClass: "GXDrawView",
		gxLayout: [ "H:|-10-[label(160)]-11-[switch]-10-|&alignBaseline",
				   	"V:|-4-[switch]-3-|" ],
		gxChildViews: {
			switch: BypassSlider().viewName("switch"),
			label: {
				"+": "LabelView.right.fontColor.size13"
			}
		}
	},

	GenericAUPopupMenuItem: {
		nsClass: "GXDrawView",
		gxLayout: [ "H:|-10-[label(160)]-[popupMenu(190)]-10-|&alignBaseline",
					"V:[label(24)]",
				   	"V:|-4-[popupMenu]-3-|" ],
		gxChildViews: {
			popupMenu: PopupButton().viewName("popupMenu"),
			label: {
				"+": "LabelView.right.fontColor.size13"
			}
		}
	},
  
	SliderValueLabel: {
		"+": "SliderReadout",  
		gxSpacingPixels: "{1, 2, 1, -1}",
		gxVAlign: 1,
		gxAlignment: "{1, 1}",
		gxPosition: "{1, 0}",
		gxClickValue: 0
	},
	
})

function EffectTextField()
{
	return TemplateView("BaseTextField").setValues({
		nsClass: "TCNameFieldContainer",
		gxBackPainter: Painter().radius(8).inset(3).fill(Colors.invisibleThemed.addStyle("editing", Colors.paleGrayMixed)), 
		gxValueKeyPath: "name", 
		gxSelectionColor: Colors.selection,
		"gxTextStyle": {
			"+" : "TextFieldFore",
			nsClass: "GXStyledString",
			gxBackColor: Colors.invisible,
			gxFontSize: 14,
			gxFontWeight: 0.4
		},  
		drawsSelected: true,  
		gxEditable: false,
	})
}

function PluginPopoverHeader()
{
	return ZStack([
		DesatView(radii = [10,10,0,0]),
		HStack([
			Padding(10), 
			PinButton()
				.toolTip("Pin “<gx>node.nodeTitle</gx>”", "Un-pin “<gx>node.nodeTitle</gx>”"),  
			
			HList([

				EffectTextField()
					.viewName("nameField")	
					.height(26)
					.fillWidth()    
					.keyPath("modelEffect.name"),     

				View().width(5).showKey("modelEffect.tornOff"),

				HStack([
					
					Padding(10),
					ZStack([
						ImageView("source.sourceIcon", Colors.primaryContent) 
							.showKey("source.templatePopoverIcon")
							.size(16)
							.layerZ(1),
						ImageView("source.sourceIcon", null) 
							.hideKey("source.templatePopoverIcon")
							.size(16)
							.layerZ(1),
					]),
					
					Padding(5),

					Label("")  
						.keyPath("source.sourceName")  
						.fontSize(14)
						.fontColor(Colors.primaryContent)
						.centerX().centerY().height(25).addLayout("H:[self(<=110)]"), // Note!! Fits "Quicktime Player"
					 Padding(10), 
				])
					.background(Button() 	
						.toolTip("Focus “<gx>modelEffect.name</gx>” in SoundSource popover")
						.backPainter(Painter().fill(Colors.paleGray.showPressed()).inset(2).radius(10))
						.keyPath("modelEffect.focusModelInSource"))
					.showKey("modelEffect.tornOff"),

			])
			.wantsLayer()
			.fillWidth(), 
			
			BypassSlider()
				.keyPath("modelEffect.enabled")
				.toolTip("Turn the processing for “<gx>modelEffect.name</gx>” on", "Turn the processing for “<gx>modelEffect.name</gx>” off")
				.padding(10,10,0,0)
	
		])  
	])	.makeHostView() 
		.topPad(12)  
		.leftPad(12)
		.rightPad(12)
		.viewClass("GXSettingsView")
		.wantsLayer()
		.height(39) 
		.viewName("header")
		.keyPath("");
}
 