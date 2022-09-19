 

// Markup keys. We use these are automatically referenced in swift


Constants.EqualizerEffectTitle 			= "10-Band EQ";
Constants.VolumeOverdriveEffectTitle 	= "Volume Overdrive";
Constants.HeadphoneEQTitle 				= "Headphone EQ";
Constants.BalanceEffectTitle 			= "Balance";
Constants.ParametricEQTitle 			= "Parametric EQ";

Constants.TCVolumeOverdriveMarkupKey 	= "TCVolumeOverdriveMarkup";
Constants.BalanceEffectMarkupKey		= "TCBalanceMarkup";
Constants.TC10BandEQMarkupKey		 	= "TC10BandEQMarkup";
Constants.TCHeadphoneEQMarkupKey		= "TCHeadphoneEQMarkup";
Constants.TCAudioUnitModelMarkupKey 	= "TCAudioUnitModelMarkup";
Constants.TCParametricEQMarkupKey 		= "TCParametricEQMarkup";

// The order of these determine how they appear in the "Add Effects" menu
//
Constants.BuiltInEffectMarkup = [Constants.TC10BandEQMarkupKey,
                                 Constants.BalanceEffectMarkupKey,
                                 Constants.TCHeadphoneEQMarkupKey,
                                 Constants.TCVolumeOverdriveMarkupKey,
								  // Constants.TCParametricEQMarkupKey,
								 ]; 

markup.push({
	
	// MARK: Base Effect Markup
	
	"EffectsListItemView" : EffectsListView(),

	TCEffectModelMarkup : {
		nsClass: "SoundSource.TCModelEffect",
		effectName: "",
		nodeClass: "AHAudioNode",
		effectViewMarkup: "EffectsListItemView",
	},    	   
			
	// MARK: Audio Unit Plugin Markup 
			
	[Constants.TCAudioUnitModelMarkupKey] : {
		"+" : "TCEffectModelMarkup",
		nodeClass: "SoundSource.TCAudioUnitNode",
		defaultNodeSettings: {
			inPlaceProcessing: true,
		},
		effectViewMarkup:  {
			"+" : "EffectsListItemView", 
			gxGenericPopoverInfo: "GenericAUPopover",
			gxPopoverInfo: "AUPopover",
			gxDragController: 
			{ 
				"+" : "EffectsDragController",  // Not draggable between sources
				gxInsertionViewOffset: "{0,-4}", 
				gxCreateDragSpacerView: true 
			}, 
			axRoleDescription: "Audio Unit effect",
			gxToolTipKeyPath: "popoverToolTip",
			gxDisableOnKey: "node.pluginDisabled",
		},
	},  
		
	// MARK: 10 Band EQ
			
	[Constants.TC10BandEQMarkupKey] : EqualizerView(),
			
	// MARK: Volume Overdrive
			
	[Constants.TCVolumeOverdriveMarkupKey] : VolumeOverdriveView(), 
	
	[Constants.TCHeadphoneEQMarkupKey]  : HeadphoneEQView(),
	
	[Constants.TCParametricEQMarkupKey]  : ParametricEQView(),

	[Constants.BalanceEffectMarkupKey]  : BalanceView(), 
}) 

function EffectTitle(underlined)
{
	return Label() 
		.bordered()
		.backPainter(underlined ? Painter().fill(Colors.strongGray.addStyle("showing", Colors.key)).insets(0,15,0,0) : null)
		.keyPath("name")  
		.fillWidth()
		.left() 
		.fontSize(13) 
		.ignoreAX()
		.viewName("effectTitle");
}

// Base effect view creation
//
function EffectsListView(inside)
{
	return VStack([  
		Divider(),
		HStack([ 
			BypassSlider()
					.keyPath("enabled") 
					.padding(10,10,0,0)
					.toolTip("Turn the processing for “<gx>name</gx>” on", "Turn the processing for “<gx>name</gx>” off")
					.viewName("effectBypass"), 
	
			
			ZStack([
				EffectTitle(underlined=false).hideKey("hasPopover"),
				EffectTitle(underlined=true).showKey("hasPopover")
			]).makeHostView(),
			
			
			Spacer(),

			(inside ? inside.viewName("insideView") : View()), 
			
			DeleteButton()
					.keyPath("remove")
					.padding() 
					.toolTip("Remove “<gx>name</gx>”")
					.viewName("effectRemove"),

			Padding(1),
		]),   
	])
	.makeHostView()
	.viewClass("SoundSource.TCEffectListView") 
	.setValues({
		effectName: null, // Default to node title
        gxDragController: 
		{ 
			"+" : "ListDragController",  // Not draggable between other sources
			gxInsertionViewOffset: "{0,-4}", 
			gxCreateDragSpacerView: true 
		}, 
		gxAutoLoadConstraints: true,
        drawsSelected: true,
		gxDrawsFocused: true,
		gxExpandOnMouseClick: false,
		gxDeselectOthersOnMouseUp: true,
		multipleSelection: true,
		selectable: true,
		axIsIgnored: false,
		gxValueKeyPath: "",  
		axTitleKeyPath: "axDescription",
		axHelpKeyPath: "axHelp",
		gxBackPainter: Painter() 
			.styleByMutating("selected", (painter) => { 
				return painter.fill(Colors.selection)
			})
			.styleByMutating("focused", (painter) => { 
				return painter.fill(Colors.selection)
			}), 
	});
} 
 
 
function EQPresetPopupButton(fillColor = Colors.controlFill)
{
	return EffectPopupButton("GEPresetsPopupMenu", fillColor).setValues({
		gxShowManualPreset: false,
		gxPresetWindowIsSheet: true,
		presetsKey: "Equalizer10Presets",
		gxIconKeyPath: "sparkline", 
		gxForePainter: {
			"+": "ControlFore.size13.fontColor.left",
			gxEdgeInsets: "10,0,20,0",
			gxIconAlignment: "{0,0.55}",
			gxIconTintColor: Colors.primaryContent,
		}, 
		gxLabelText: "",
		gxValueKeyPath: "",
		gxToolTip: "Equalizer Preset - “<gx>node.loadedPreset</gx>”",
	}).flipped(true);
} 

function HeadphoneEQPresetPopupButton(fillColor = Colors.controlFill)
{
	return PresetPopupButton("HeadphoneEQPresets", fillColor).setValues({
		gxShowManualPreset: false,  
		gxLabelText: "",
		gxToolTip: "Headphone EQ Profile - “<gx>node.presetName</gx>”",
	});
}

function PresetPopupButton(presetsKey, fillColor = Colors.controlFill)
{
	return EffectPopupButton("GEPresetsPopupMenu", fillColor).setValues({ 
		gxPresetWindowIsSheet: true,
		presetsKey: presetsKey,
		gxForePainter: {
			"+": "ControlFore.size13.fontColor.left",  
			gxEdgeInsets: "10,0,20,0",
			gxIconTintColor: Colors.primaryContent,
		}, 
		gxLabelText: "Preset:",
		gxValueKeyPath: "",
	});
}

function EffectPopupButton(nsClass = "GXPopupMenuView", fillColor = Colors.controlFill)
{
	return PopupButton(nsClass, fillColor).width(190,500)
}

function EqualizerView()
{ 
	return {
		"+" : "TCEffectModelMarkup",
		effectName: Constants.EqualizerEffectTitle,
		nodeClass: "AHEqualizer10Node",
		defaultNodeSettings: {
			"loadedPreset" : "Flat (Off)",
			"enabled" : true
		}, 
		effectViewMarkup: EffectsListView(EQPresetPopupButton().setValue(false, "gxShowPresetManagementItems")).setValue("EQPopover", "gxPopoverInfo")
	};
} 
 
function EQView()
{
	function DBLabel(label)
	{
		return Label(label).width(40).right();
	}


	function EQSlider(band, hz)
	{
		var hzTitle = "";
		var hzTitleAX = "Hz";
		if (hz == 32)
		{
			hzTitle = "Hz";
		}
		if (hz >= 1000)
		{
			hzTitle = hz == 1000 ? "kHz" : "K";
			hzTitleAX = "KHz";
		}
		var hzNumber = hz < 1000 ? hz : (hz / 1000);
		return VStack([
			Label(hzNumber + hzTitle),
			Padding(5),
			Slider() 
				.viewClass("SoundSource.TCMultiSelectSlider")
				.keyPath("node.band"+band)
				.viewName(`eqSlider${band}`)
				.sliderStyle(1) // Middle  out
				.vertical()
				.range(0,1) 
				.height(115)
				.width(18) // Important for 10.13 
				.trackPainter(TemplatePainter("SliderTrack").setValues({  
					gxDetents: "(0.5)", 
					gxDefaultSize: "4,0",    // default size of track determines track width! 
					gxFillColor: Colors.paleGrayMixed,
					"selected" : { },
					"on" : 
					{     
						gxFillColor: Colors.key
					},
					"disabled": { },
				})) 
				.setValues({
					gxDefaultValue: 0.5, 
					gxKeystrokeStepSize: 0.00416666667,
					gxSmallKeystrokeStepSize: 1, // no small step size
					gxEndGap: 9,
					gxAnimatesSliderForModelUpdates: true,
					gxSliderAnimationDuration: 0.4, 
					gxIgnoreTrackClicks: true,
					gxCornerRadii: "1.5, 1.5, 1.5, 1.5",
					axFormatter: {
						nsClass: "GXScaledFormatter", 
						offset: -0.5, scale: 24, 
						format: `% .1f db ${hzNumber + hzTitleAX}`, 
						zeroFormat: `0 db ${hzNumber + hzTitleAX}`
					}
				}),
			Label() 
				.viewName(`eqSlider${band}Readout`)
				.setValues({
					gxSendTextAction: false,
					gxClickValue: 0.5,
					gxForePainter: {
						"+": "LabelFore.primary.size10",
						gxBackColor: Colors.invisible, 
					}, 
					gxVAlign: 0.5,
				})
				.width(40) 
				.intrinsicSize(40, 17) 
				.keyPath("node.band"+band) 
				.setValue({ nsClass: "GXScaledFormatter", offset: -0.5, scale: 24, format: "%0.1f", zeroFormat: "0", min: -12, max: 12, }, "gxFormatter"),
		]).makeHostView().width(40)
	};

	return VStack([    
		
		HStack([ 
			Padding(10),  
			VStack([
				DBLabel("+12dB"), 
				Padding(8),
				DBLabel("+6dB"), 
				Padding(8),
				DBLabel("0dB"), 
				Padding(8),
				DBLabel("-6dB"), 
				Padding(8),
				DBLabel("-12dB"),  
			]),  
			ZStack([
				HStack([
					Padding(18),
					VStack([
						Padding(27),
						Divider(),
						View().viewName("sd1"),
						Divider(),
						View().viewName("sd2"),
						Divider(),
						View().viewName("sd3"),
						Divider(),
						View().viewName("sd4"),
						Divider(),
						Padding(26),
					])
					.spaceViews(["sd1","sd2","sd3","sd4"])
					.makeHostView()
					.fillHeight(),
					Padding(19),
				]),
				HStack([ 
					EQSlider(0,32),
					View().viewName("s1"),
					EQSlider(1,64),
					View().viewName("s2"),
					EQSlider(2,128),
					View().viewName("s3"),
					EQSlider(3,250),
					View().viewName("s4"),
					EQSlider(4,500),
					View().viewName("s5"),
					EQSlider(5,1000),
					View().viewName("s6"),
					EQSlider(6,2000),
					View().viewName("s7"),
					EQSlider(7,4000),
					View().viewName("s8"),
					EQSlider(8,8000),
					View().viewName("s9"),
					EQSlider(9,16000),
				]) 
				.spaceViews(["s1","s2","s3","s4","s5","s6","s7","s8","s9"])
				.makeHostView()
				.fillWidth()  
			])
			.align(), 
			Padding(10),
		]),  
		
		Padding(10),
		
		HStack([
			Spacer(),
			EQPresetPopupButton(Colors.paleGray).width(165).viewName("eqPreset"),
			Padding(10),
		]),
		
		Padding(10),
	]).align("right").makeHostView(true).viewClass("GXDrawView").keyPath("")
}

markup.push({
	"EQPopover": { 
		"+" : "AUPopover",  
		nsClass: "SoundSource.TCEffectPopover",
		gxAutoRecalculatesKeyViewLoop: true,
		axRoleDescription: "10-Band EQ Popover",
		gxChildViews: [
			ZStack([
				DesatView(radii = [0,0,10,10])
					.leftPad(2)
					.rightPad(2)
					.bottomPad(2),
				EQView().width(500), 
			])
			.makeHostView(true)
			.viewClass("SoundSource.TCMultiSelectBackground")
			.setValues({ 
				"gxConsumeMouseClick" : true,
				"gxDraggingRequiresFocus" : false,
				"gxDragController" : {
					nsClass: "SoundSource.TCEffectDragSelectionController",
				}
			})
		],   
	},  
})


markup.push({
	"ParametricPopover": { 
		"+" : "AUPopover",  
		nsClass: "SoundSource.TCEffectPopover", 
		gxChildViews: [
			ZStack([
				DesatView(radii = [0,0,10,10])
					.leftPad(2)
					.rightPad(2)
					.bottomPad(2), 
				VStack([
					Padding(10),
					HStack([
						Padding(10),
						HStack([
							VStack([
								Padding(2),
								Label("Preamp"),
								RoundedSlider(40).range(-24,24).setValue(0, "gxDefaultValue").keyPath("node.preampDB").viewName("eqPreamp").nextKey("bandEnabled0"),
								TemplateView("SliderReadout.gain.center.size10")
									.width(55)
									.keyPath("node.preampDB")
									.viewName("eqPreampReadout"),
								Padding(8)
							]),   
							VStack([
								Padding(5),
								// EQLevelMeter("node.levels[0]","node.levels[1]","node.levels[2]").fillHeight().width(10),
								Label("L"),
								Padding(5),
							]),
							VStack([
								Padding(5),
								// EQLevelMeter("node.levels[3]","node.levels[4]","node.levels[5]").fillHeight().width(10),
								Label("R"),
								Padding(5),
							]),
							Padding(10),
						]).makeHostView().fillHeight().backPainter(Painter().stroke(1, Colors.invisible).radius(8)),
						Padding(5),
						EQBandGroup(0, "Low", 20, 400),
						Padding(5),
						EQBandGroup(1, "Low-Mid", 100, 800),
						Padding(5),
						EQBandGroup(2, "Mid", 500, 5000),
						Padding(5),
						EQBandGroup(3, "High-Mid", 500, 5000),
						Padding(5),
						EQBandGroup(4, "High", 5000, 20000),
						Padding(5),
						HStack([  
							Padding(5),
							VStack([
								Padding(5),
								// EQLevelMeter("node.levels[6]","node.levels[7]","node.levels[8]").fillHeight().width(10),
								Label("L"),
								Padding(5),
							]),
							VStack([
								Padding(5),
								// EQLevelMeter("node.levels[9]","node.levels[10]","node.levels[11]").fillHeight().width(10),
								Label("R"),
								Padding(5),
							]),
							Padding(5),
						]).makeHostView().fillHeight().backPainter(Painter().stroke(1, Colors.invisible).radius(8)), 
						Padding(10),
					]),
					Padding(20),
				])
			]).makeHostView(true)
		],   
	},  
})


function EQLevelMeter(peakPath, rmsPath, clipPath)
{
	var vertical = true;
	return View().setValues( 
	{
		nsClass: "GXLevelMeter", 
		gxValueKeyPath: "",
		// gxAnimateOnKey: "node.metering", 
		gxVertical: vertical,
		gxViewFlipped: true, 
		gxMinPeakHold: 0.2,
		gxPeakValueKeyPath : peakPath,
		gxClipValueKeyPath : clipPath, 
		gxRMSValueKeyPath : rmsPath, 
		"gxRootLayer": {
			nsClass: "GXMeterLayer",
			gxBackPainter : Painter() 
				.radius(3)
				.fill(Colors.paleGray)
				.stroke(1,Colors.contrast)
				.inset(1.5), 
		},
		gxPeakHoldLayer: {
			nsClass: "GXMeterLayer",
			gxFrameRect: vertical? "0,0,6,6" : "0, 0, 6, 8",
			gxBackPainter: PeakHoldPainter(vertical)
		 },
		gxPeakClipLayer: {
			nsClass: "GXDrawLayer",
			gxLayerZPosition: 4,
			gxFrameRect: vertical ? "0,0,6,5" : "0, 0, 5, 8",  // size matters, not position
			"gxVertical": vertical,
			gxBackPainter: PeakClipPainter(vertical)
		},
		gxPeakLayer: {
			nsClass: "GXMeterLayer",
			gxLayerZPosition: 1,
			"gxVertical": vertical,
			gxBackPainter: Painter()
				.fill(Colors.key) 
				.insets(2,6,2,2)
				.radii(0,0,3,3)
				.addStyle("muted", Colors.white),
			gxMaskLayer: {
				nsClass: "GXDrawLayer",
				gxBackColor: Colors.black,
				gxIsOpaque: true,
				gxLayerZPosition: 6,
			},	// sets layer color for fill
		},
		gxRMSLayer: {
			nsClass: "GXMeterLayer",
			gxLayerZPosition: 1,
			"gxVertical": vertical,
			gxBackPainter: Painter()
				.fill(Colors.selection) 
				.insets(2,6,2,2)
				.radii(0,0,3,3)
				.addStyle("muted", Colors.white),
			gxMaskLayer: {
				nsClass: "GXDrawLayer",
				gxBackColor: Colors.black,
				gxIsOpaque: true,
				gxLayerZPosition: 6,
			},	// sets layer color for fill
		},
	})
} 


function EQBandGroup(band, label, lowFreq, highFreq)
{
	return ZStack([ 
		VStack([
			HStack([
				Button("\u{23FB}").checkBoxRole().keyPath(`node.b_enabled${band}`).height(20).width(20).padding(4).viewName(`bandEnabled${band}`).nextKey(`bandGain${band}`),
				Padding(0),
				Label(label).fontSize(12).bold(),
				Spacer(),
			]), 
			Spacer(),
		]), 
		VStack([
			Padding(30),
			Label("Q"),
			RoundedSlider(25).range(0.5,10).setValue(1.4, "gxDefaultValue").keyPath(`node.b_width${band}`).viewName(`bandQ${band}`).nextKey(`bandFreq${band}`),
			TemplateView("SliderReadout.center.size10")
				.keyPath(`node.b_width${band}`)
				.viewName(`bandQ${band}Readout`),
				
			Padding(50)
		]).makeHostView(true),  
		
		VStack([
			HStack([
				VStack([
					Padding(26),
					Label("Gain"),
					RoundedSlider(40).range(-24,24).setValue(0, "gxDefaultValue").keyPath(`node.b_gain${band}`).viewName(`bandGain${band}`).nextKey(`bandQ${band}`),
					TemplateView("SliderReadout.gain.center.size10")
						.width(60)
						.keyPath(`node.b_gain${band}`)
						.viewName(`bandGain${band}Readout`)
				]), 
				Padding(10),
				VStack([
					Padding(26),
					Label("Freq"),
					RoundedSlider(40).range(lowFreq,highFreq).setValue(lowFreq + ((highFreq - lowFreq) / 2), "gxDefaultValue").keyPath(`node.b_freq${band}`).viewName(`bandFreq${band}`),
					TemplateView("SliderReadout.center.hertz.size10") 
						.width(65)
						.keyPath(`node.b_freq${band}`)
						.viewName(`bandFreq${band}Readout`)
				]), 
			]),
			Padding(5),
			HStack([ 
				Padding(1),
				SegmentButton("left",   "HP",	`node.b_type${band}_x_0`).viewName("HP").setAXTitle("High Pass"),
				SegmentButton("middle", "LS", 	`node.b_type${band}_x_1`).viewName("LS").setAXTitle("Low Shelf"),
				SegmentButton("middle", "PK",	`node.b_type${band}_x_2`).viewName("PK").setAXTitle("Peak"),
				SegmentButton("middle", "HS", 	`node.b_type${band}_x_3`).viewName("HS").setAXTitle("High Shelf"),
				SegmentButton("right",  "LP",	`node.b_type${band}_x_4`).viewName("LP").setAXTitle("Low Pass").nextKey(`bandEnabled${band + 1}`),
				Padding(1)
			]).spaceViews(["HP","LS", "PK", "HS", "HP", "LP"]).makeHostView().backPainter(Painter().fill(Colors.paleGray).radius(6).insets(2,1,2,1)),
			Padding(1),
		]), 
	]).makeHostView()
}


function RoundedSlider(size)
{
	return Slider()
		.width(size)
		.height(size) 
		.knobPainter(Painter().radius(size * 0.5).fill(Colors.selection.showPressed().showDisabled(Colors.paleGray.lightMode)).size(size,size).inset(2)) 
		.knobPainterExtra(Painter().fill(Colors.key).size(10,6).radius(2).offset((-(size * 0.5)) + 8, 0))
		.setValues({
			gxSliderStyle : 1, 
			gxIgnoreDoubleClick: false,
			gxKnobRotationRadians: 270, 
			gxIgnoreScrollWheel: false,
		})
}

function SegmentButton(segment, title, path)
{
	return TemplateView(`ButtonView.${segment}Segment`).setValues({   
		axCheckboxRole: true,
		gxTitle: title,
		gxViewFlipped: false,
		gxBackPainter: {
			"+" : "ControlBack",   
			gxFillColor: Colors.white,
			"on" : {
				gxFillColor: Colors.key
			}, 
		},
		gxForePainter: {
			"+" : "ControlFore",   
			"on" : {
				gxFontColor: Colors.white.showPressed(),
				gxFontWeight: 0.4,
			},
			"disabled" : { 
				gxFontColor: Colors.primaryContent.withAlpha(0.4).showPressed(),
			},
		},
		gxValueKeyPath: path,
	}).height(26)
}


function VolumeOverdriveView()
{ 
	return {
		"+" : "TCEffectModelMarkup",
		effectName: Constants.VolumeOverdriveEffectTitle,
		nodeClass: "SoundSource.TCGainEffectsNode",
		defaultNodeSettings: {
			"gain" : 1.0,
			"overdrive" : 1.0,
			"enabled" : true, 
		},
		effectViewMarkup : EffectsListView(
			HStack([ 
				Padding(1),
				SegmentButton("left",   "1\u{00D7}", "node.overdrive_x_1").viewName("OD1").setAXTitle("overdrive 1X"),
				SegmentButton("middle", "2\u{00D7}", "node.overdrive_x_2").viewName("OD2").setAXTitle("overdrive 2X"),
				SegmentButton("middle", "3\u{00D7}", "node.overdrive_x_3").viewName("OD3").setAXTitle("overdrive 3X"),
				SegmentButton("right",  "4\u{00D7}", "node.overdrive_x_4").viewName("OD4").setAXTitle("overdrive 4X"),
				Padding(1)
			]) 
				.spaceViews(["OD1","OD2", "OD3", "OD4"])
				.makeHostView() 
				.backPainter(Painter().fill(Colors.paleGray).radius(6).insets(2,1,2,1))
		) 
	};
} 
 
function ParametricEQView()
{ 
	return {
		"+" : "TCEffectModelMarkup",
		effectName: Constants.ParametricEQTitle,
		nodeClass: "AHNBandEQNode", 
		defaultNodeSettings: { 
			"enabled" : true, 
			// "metering": true,
			"flatten" : true,
		},
		effectViewMarkup: EffectsListView(View()).setValue("ParametricPopover", "gxPopoverInfo")
	};
} 

function HeadphoneEQView()
{
	return {
		"+" : "TCEffectModelMarkup",
		effectName: Constants.HeadphoneEQTitle,
		nodeClass: "AHAutoEQNode",
		defaultNodeSettings: {
			"restoreDefaults" : true,
		},
		effectViewMarkup: EffectsListView(HStack([  
			HeadphoneEQPresetPopupButton()
				.viewClass("SoundSource.TCHeadphoneEQPresetPopupMenu")
				.iconPainter(ImagePainter().align(0,0.5).inset(5))
				.height(28)  

		]).makeHostView())
	};
} 


function BalanceView()
{
	return {
		"+" : "TCEffectModelMarkup",
		effectName: Constants.BalanceEffectTitle,
		defaultNodeSettings: {
			"balance" : 0, 
			"enabled" : true, 
		},
		nodeClass: "AHBalanceNode",  
		effectViewMarkup: EffectsListView(HStack([  
			Padding(1),
			Label("L").ignoreAX().fontSize(13),
			Padding(2),
			Slider() 
				.sliderStyle(1) // Middle  out
				.hasDetents()
				.width(140,700)
				.height(28)
				.range(-1,1)
				.enableKey("node.enabled")
				.knobPainter(ImagePainter("sliderPointy2.focused").inset(1).offset(0,3).tintColor(Colors.sliderFocus))
				.knobPainterExtra(ImagePainter("sliderPointy2.thumb").offset(0,3).tintColor(Colors.white)) 
				.keyPath("node.balance") 
				.setAXTitle("Balance")
				.setAXFormatter("AXBalanceSliderFormatter")
				.toolTip("Balance all audio being sent to the system output")
				.viewName("balanceSlider"),
			Padding(5),
			Label("R").fontSize(13).ignoreAX(),   
			Padding(2),
		]).makeHostView()),
	};
} 


