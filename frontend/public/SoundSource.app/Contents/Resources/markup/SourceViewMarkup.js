

markup.push({
	OutputListItem: 	sourceListItemView(kSystemOutputSourceType),
	EffectsListItem: 	sourceListItemView(kSystemEffectsSourceType), // not selectable
	InputListItem: 		sourceListItemView(kSystemInputSourceType),
	AppSourceListItem: 	sourceListItemView(kApplicationSourceType), 
	AppDropView: {
		"+" : "AppSourceListItem",
		gxLayout: ["V:[self(1)]"],
		gxDragController : { 
			nsClass: "TCDropAppDragController",
			"+" : "ListDragController",
		},
	},
	"BluetoothConnectionSpinner" : TemplateView("Spinner").size(16).animateKey("deviceConnecting") 
}); 

function sourceListItemView(sourceType) {  
 
	return VStack([ 
		// View containing all the main controls
		MainSourceView(sourceType)
			.viewName("header"),   
		// Expansion view for plugins, and other advanced settings
		VList([    
			
			VStack([ 
				HStack([ 
					View().viewName("spacer"),
					PopupButton()  
						.addLayout("H:[self(>=160)]") // initial size - also modified in code
						.label("Sample Rate:")
						.menuItemsPath("sampleRateMenuItems")
						.keyPath("setSampleRate")
						.setAXTitle("Sample Rate Selection")
						.disableKey("deviceSelectorDisabled")
						.viewName("sampleRatePopup")
						.toolTip(Constants.tooltips[sourceType+"sampleRateToolTip"]), 
				]),
				Padding(4)
			]) 
				.align("right")
				.makeHostView() 
				.viewName("extraDeviceControls") 
				.showKey("showAdvancedDeviceControls")
				.setAXTitle("Advanced Settings"), 
			
			EffectsList(sourceType) 
				.showKey("hostsEffects")

		])  .viewName("expansion")
			.viewClass("SoundSource.TCSourceViewExpansion")
			.keyPath("isCollapsed") 
	]) 
		.makeHostView() 
		.addLayout("H:|[self]|")
		.viewName("sourceView") 
		.setAXTitle("<gx>sourceName</gx>")
		.backPainter(Painter().fill(Colors.sourceBackground))
		.forePainter(Painter().shadow(Colors.invisible.addStyle("selected", Colors.key.lightMode.withAlpha(0.2), 
		Colors.key.lightMode.withAlpha(0.2)),0,0,2).insets(-20,0,-20,0).innerShadow()) 
		.viewClass("SoundSource.TCSourceView")
		.setValues({ 
			gxDragController: sourceType == kApplicationSourceType ? { "+" : "ListDragController" } : null,
			axTitle: Constants.tooltips[sourceType+"axTitle"],
			axHelp: Constants.tooltips[sourceType+"axHelp"],
			axRoleDescription: "Source List Item",
			axDescription: Constants.tooltips[sourceType+"axDescription"], 
			selectable: true,
			multipleSelection: false,
			gxDrawsSelected: true,
			gxDrawsFocused: false, 
			// gxCanDrawSubviewsIntoLayer: true,  - This breaks on 10.13...
	})
};


function VolumeSlider()
{
	return Slider() 
		.keyPath("userSetVolume") 
		.viewName("volumeSlider")  
		.setValues({
			gxPlayEffectsOnMouseUp: true,
			gxStylesKeyPath: "volumeSliderStyles", 
			gxSliderDetents: "0,1",
			gxDefaultValue: 1.0,
			gxReadoutTemplate: {
				"+": "SliderReadout.percentage", 
				gxStylesKeyPath: "volumeReadoutStyles",
				gxBaselineOffset: 5,
				gxClickValue: 1,
			},
			gxKeystrokeStepSize: 0.0652,
			gxLargeKeystrokeStepSize: 2.0,
			gxRangeMin: 0,
			gxRangeMaxKeyPath: "volumeController.rangeMax",
			axFormatter: "AXVolumeSliderFormatter",
			axRoleDescription: "Volume Slider",
			gxValueKeyPath: "userSetVolume",
			gxReadoutKeyPath: "volumeController.volumeForReadout"
		});
} 

function MainSourceView(sourceType)
{    
	var mainView = View().setValues({
		gxValueKeyPath: "",
		// A lot of the horizontal layout is handled in code. 
		// vertical alignment is handled here with the &alignCenterY
		"gxLayout" : [
			"V:|[self(36)]|", 
			"H:|[self]|",
			"H:[superview]-(<=0)-[sourceIcon]&alignCenterY",    
			"H:|-10-[star]-0-[sourceIcon]-5-[sourceName]&alignCenterY",
			"H:[sourceIcon]-(>=10)-[volumeIndicator]-5-[volumeSlider(>=155@300)]-5-[volumeSliderReadout(40)]-5-[boostBtn]-0-[levelMeters(22)]-0-[deviceSelector(>=48@999)]-0-[disclosure]-3-|&alignCenterY",
			"H:[volumeIndicator]-(<=448)-|",  
			"H:[deviceSelector(190@400)]",
			"H:|-(<=365)-[boostBtn]",  
			"H:|-(>=250)-[boostBtn]",  
		], 
		gxWantsLayer: true,
		"gxChildViews" : [
			
			HStack([ 
				Button()
					.viewClass("SoundSource.TCAnimatingButtonView")	
					.setValues({
						"gxAnimationView" : {
							"nsClass" : "GXArchivedAnimationView",
							"gxAssetName" : "favourite",
							"gxShowPressEffect" : true,
							"gxVectorPainter" :	Painter().stroke(0,Colors.contrast.showPressed()).fill(Colors.faveStar.showPressed())
						}  
					}) 
					.keyPath("favourite")
					.toolTip("Favorite ”<gx>sourceName</gx>”", "Unfavorite ”<gx>sourceName</gx>”")
					.backPainter(null) 
					.size(sourceType == kApplicationSourceType ? 20 : 0, 20),  
				Padding(sourceType == kApplicationSourceType ? 8 : 0)
			]).makeHostView().viewName("star"),

			ImageView("sourceIcon", (sourceType != kApplicationSourceType) ? Colors.primaryContent : null)
					.viewName("sourceIcon")
					.size(20)
					.layerZ(1)
					.animateVisibility(0.2)
					.ignoreAX(),
			
			Label()   
					.fontSize(13)      
					.intrinsicSize(-1,25)
					.viewName("sourceName")
					.keyPath("sourceName") 
					.animateVisibility(1.0,0)
					.left().centerY(),  
		 
			Button()
				.setValue(true, "gxAnimateIconStyles")
				.checkBoxRole()
				.setValue("volumeSliderStyles", "gxStylesKeyPath")
				.backPainter(null) 
				.forePainter(ImagePainter().tintColor(Colors.primaryContent.addStyle("muted", Colors.warning)).pressedAlpha(0.85))
				.toolTip("Mute “<gx>sourceName</gx>”", "Unmute “<gx>sourceName</gx>”")
				.setValue("volume-ui", "gxIconBaseName")
				.keyPath("userSetMute") 
				.size(16)
				.viewName("volumeIndicator"),
				
			
			VolumeSlider() 
						.setValue(true, "gxAlwaysSendClicks")
						.viewName("volumeSlider")
						.toolTip(Constants.tooltips[sourceType+"volumeToolTip"]), 
			
			Button()  
					.viewClass("SoundSource.TCAnimatingButtonView")	
					.viewName("boostBtn")  
					.backPainter(Painter().radius(12).inset(1).stroke(1, Colors.contrast))
					.setValues({
						"gxAnimationView" : {
							"nsClass" : "GXArchivedAnimationView",
							"gxAssetName" : "boost",
							"gxShowPressEffect" : true, 
							"circle" : {
								"gxVectorPainter" :	Painter().fill(Colors.paleGray.showPressed())
							},
							"Active Circle" : {
								"gxVectorPainter" :	Painter().fill(Colors.key.addStyle("effectsDisabled", Colors.paleGray))
							}, 
							"arrow 1" : {
								"gxVectorPainter" :	Painter().fill(Colors.strongGray.addStyle("on", Colors.white).showPressed())
							}, 
							"arrow 2" : {
								"gxVectorPainter" :	Painter().fill(Colors.strongGray.addStyle("on", Colors.white).showPressed())
							},
							"arrow 3" : {
								"gxVectorPainter" :	Painter().fill(Colors.strongGray.addStyle("on", Colors.white).showPressed())
							}, 
						}  
					}) 
					.keyPath("userSetBoost")
					.showKey("hasBoost") 
					.toolTip("Enable Magic Boost for “<gx>sourceName</gx>”", "Disable Magic Boost for “<gx>sourceName</gx>”")
					.setValues({ 
						gxTitle: "", // Important for performance!
						gxOperateOnMouseUp: true,
					})
					.checkBoxRole()
					.size(25,25)
					, 

			LevelMeterAlertsSection()	
				.makeHostView()
				.viewName("levelMeters"),
  
			PopupButton() 
				.viewClass("SoundSource.TCAudioDevicePopupMenu") 
				.disableKey("deviceSelectorDisabled")
				.setValue(false,"gxResetItemsOnOpen") // We control the state of the device items in code
				.setValue("deviceMenuItems", "gxMenuItemsKeyPath")
				.keyPath("userSetDevice")  
				.toolTip(Constants.tooltips[sourceType+"deviceSelectToolTip"])
				.viewName("deviceSelector") ,
 
			ZStack([
				DisclosureButton()  
					.padding(5,5,5,4)
					.keyPath("userSetCollapsed")
					.showKey("expands") 
					.toolTip("Hide “<gx>sourceName</gx>” advanced section", "Show “<gx>sourceName</gx>” advanced section")
					.viewName("showAdvanced"),

				Label("FX")
					.size(18,13)  
					.backPainter(Painter().fill(Colors.key.addStyle("effectsDisabled", Colors.paleGrayMixed)).radius(5).inset(2).shadow(Colors.black.withAlpha(0.3),0,-1,1))
					.fontSize(7)
					.fontColor(Colors.white.addStyle("effectsDisabled", Colors.darkGray))
					.bold()
					.showKey("advancedEffected")
			]).align("right").makeHostView().viewName("disclosure"),
		]
	})
	
	var hostView = View().setValues({
		"gxLayout" : [
			"H:|[self]|",
			"V:|[self]",
		],
		"gxChildViews" : [ mainView ]
	})

	return hostView;
	 
} 

function EffectsList(sourceType)
{ 
	return VList([  
		ZStack([ 
			Color(Colors.sourceBackground),
			VStack([ 
				Divider().showKey("customEffects.hasEffects"), // Something with layout is broken for this view on 10.13 and we need to give this a width constraint
				HStack([  
					Padding(4),
					KeyPopupButton("SoundSource.TCPluginMenuPopupButton")
							.width(95)
							.keyPath("customEffects.addEffect")
							.viewName("addEffect") 
							.pullsDown()
							.setTitle("Add Effect") 
							.toolTip(Constants.tooltips[sourceType+"addEffectHelp"]), 
					
					Padding(10),    
					Spacer(),  
					HStack([
						Label("FX Bypassed").fontSize(12).right().width(100).fontColor(Colors.warning),
						Padding(10),
						Image("fx-bypass", Colors.warning)
							.width(20)
							.height(20),   
						Padding(10) 
					]).makeHostView().showKey("customEffects.effectsDisabled")
				])
				.padding(6),   
			]), 
			
			Label("\u{26A0}\u{FE0F} Significant delay will be audible with this effects configuration.")  
				.fontSize(12)
				.centerV()
				.left()
				.leftPad(110)
				.hideKey("preferences.uiState.narrowWindow")
				.showKey("customEffects.showLatencyWarning") 
		]) 
		.background(Color(Colors.background)) 
		.viewName("footerView").fillWidth(1000),  
	]).viewName("effectsList");
}

function LevelMeterAlertsSection()
{
	return ZStack([
		
		TemplateView("AlertButton")
			.size(22)
			.setAXTitle("Target Device Muted Alert")
			.viewName("muteAlert")
			.showKey("showMuteAlert")
			.keyPath("showMuteAlert"),
		TemplateView("AlertButton")
			.size(22)
			.setAXTitle("Unsupported Device Alert")
			.viewName("deviceAlert")
			.showKey("showDeviceAlert")
			.keyPath("showDeviceAlert"), 
		TemplateView("AlertButton")
			.size(22)
			.setAXTitle("Voice Over Processing Disabled Alert")
			.viewName("voiceOverAlert")
			.showKey("showVoiceOverBypassAlert")
			.keyPath("showVoiceOverBypassAlert"),
 
 		Image("meter-inactive", MainThemeColor(Colors.black, Colors.white).withAlpha(0.5)).showKey("meterDisabled").hideKey("showDeviceAlert").width(16).height(48),
 
		LevelMeter(true)
				.width(12)   
				.height(28)
				.viewName("levelMeterV") 
				.showKey("showLevelMeter")
				.setValues({
					gxPeakValueKeyPath : "levelMeter.peakStereoMax",
					gxClipValueKeyPath : "levelMeter.clipStereoMax", 
				}) 
	]).align();
}
