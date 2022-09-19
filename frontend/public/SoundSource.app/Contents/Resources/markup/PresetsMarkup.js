var presetItemHeight = 28;

markup.push({
	"PresetsWindow": {
		nsClass: "GXWindow",
		gxWindowTitle: "Presets",
		gxInitialWindowSize: "320, 250",
		gxInitialWindowPosition: "0.3, 0.3", 
		gxContentView: PresetsWindowContent(PresetsWindowHeader(), ScrollView({
				nsClass: "GXListView",
				gxViewName: "presetsList",
				gxCollapsible: false,
				listTopHeight: 5,
				listItemSpacing: 5, 
				gxBackPainter: Painter().fill(Colors.background),
				axTitle: "Presets List",
				gxLayout: [ "H:|-0-[self(310)]-0@500-|", `V:|-0-[self(>=${presetItemHeight}@700)]-0@700-|` ],
				gxChildViews: [
					Label("")
						.keyPath("info.info.noPresetsTitle")
						.viewName("emptyView")	
						.fontSize(14)
						.intrinsicSize(-1,presetItemHeight) 
				]
			}).addLayout("H:|[self(>=320)]|").addLayout("V:[self(<=150)]"), PresetFooterButton(title = "Done")), 
	},
	
	"OutlineView" : Label("Testing").intrinsicSize(-1,20).fontColor(Colors.primaryContent).keyPath("name"),
	
	"HeadphoneEQPresetsWindow": {
		nsClass: "GXWindow",
		gxWindowTitle: "Select Headphone EQ Profile",
		gxInitialWindowSize: "320, 350", 
		gxInitialWindowPosition: "0.3, 0.3", 
		gxContentView: PresetsWindowContent(HeadphoneEQWindowHeader(),VStack([
			Padding(5),
			HStack([
				Padding(10),
				View("NSSearchField")
					.backPainter(Painter().radius(6).insets(0,0,0,0).fill(Colors.selection))
					.viewName("searchField")
					.addLayout("V:[self(22)]"),
				Padding(10)
			]).makeHostView().addLayout("H:|[self]|"),
			Padding(5),
			ScrollView(
				View()
					.viewClass("NSOutlineView")   
					.viewName("outlineView")
					.addLayout("H:|[self]|")
					.addLayout("V:|[self(>=380)]-0@700-|") 
			).fillWidth(),  
		]), 
		HStack([
			Padding(5),
			PresetFooterButton(title = "Cancel", keyEquiv = "", fontColor = Colors.primaryContent, background = Colors.paleGray).keyPath("cancelBtn"),
			Padding(5),
			Label().fontSize(12).viewName("downloadStringView").keyPath("downloadString"),
			Spacer(),
			TemplateView("Spinner").size(16).animateKey("downloading"),
			Padding(5),
			PresetFooterButton(title = "Select", keyEquiv = "\r").enableKey("selectButtonEnabled")
		]).makeHostView()).addLayout("H:[self(>=380)]").addLayout("V:[self(<=340)]"), // Sizing is less than the minimum width of the main window, and less than the height of the main window when the applications section is collapsed 
	},
	  
});

function PresetFooterButton(title = "Done", keyEquiv = "\r", fontColor = Colors.white, background = Colors.key)
{
	return Button(title) 
		.width(80)
		.height(23)
		.keyPath("dismissSheetBtn")
		.backPainter(Painter().radius(6).fill(background.showPressed().showDisabled()))
		.forePainter(LabelPainter().color(fontColor.addStyle("disabled", Colors.darkGray)).fontSize(12))
		.setValues({
			gxKeyEquivalent: keyEquiv,
		}).padding(5,10,10,10)
}

function PresetTextField()
{
	return TemplateView("BaseTextField").setValues({
		gxBackPainter: null,
		gxBaselineOffset: 2,
		gxValueKeyPath: "name", 
		gxSelectionColor: Colors.selection,
		"gxTextPainter": {
			"+" : "TextFieldFore",
			gxBackColor: Colors.invisible,
		},
		drawsSelected: true,
		gxDrawsFocusRing: false, 
	})
}

function PresetItemView(content = View())
{
	return HStack([  
			Padding(25),
	
			content, 
			
			PresetTextField()
				.viewName("presetName")
				// .setValues({
				// 	"gxEditingKeyPath" : "editing"
				// })
			,
	
			DeleteButton()	
				.keyPath("remove")
				.setAXTitle("Preset Delete"),
	
			Padding(10),
		])
		.makeHostView()
		.backPainter(Painter().radius(6).insets(10,0,0,0).fill(Colors.selection))
		.viewClass("GXSettingsView")
		.height(presetItemHeight)
		.setValues({
			drawsSelected: true,
			selectable: true, 
			gxAutoLoadConstraints: true
		}).intrinsicSize(-1, presetItemHeight);
} 

function HeadphoneEQWindowHeader() 
{
	return HStack([  
		PresetsWindowHeader().viewName("oldHeader").viewClass("GXDrawView"), 
		AnimationView("hpeq-preview")
			.viewName("previewIndicator")
			.vectorPainter("Circle", Painter().fill(Colors.paleGray))
			.vectorPainter("Wave", Painter().fill(Colors.primaryContent))
			.setValue(true, "gxAnimatesWhileVisible")
			.showKey("selectButtonEnabled")
			.keyPath("")
			.size(20),
		Padding(10)
	]).makeHostView().viewName("headerView").viewClass("GXSettingsView").keyPath("")
}

function PresetsWindowHeader()
{
	return HStack([ 
		Padding(10), 
		Label()   
			.forePainter(LabelPainter().color(Colors.primaryContent))
			.keyPath("windowTitle")   
			.fontSize(14)
			.bold()
			.left()
			.addLayout("V:[self(20)]"), 
		Spacer(),
	]).makeHostView().viewClass("GXSettingsView").keyPath("").viewName("headerView").height(20)
}

function PresetsWindowContent(header, content = View(), footer = View())
{
	return VStack([
			
			Padding(5),
			
			header,
			
			Padding(5), 
			Divider(),
	
			content,
			
			VStack([
				Divider(),
				
				footer,
			])
				.align("right")
				.makeHostView()
				.viewClass("GXSettingsView")
				.viewName("bottomBar")
				.keyPath("")
				.addLayout("V:[self(<=1@600)]")
				.backPainter(Painter().fill(Colors.background).radii(0,0,10,10))
			
		])
		.align("left")
		.makeHostView(false)
		.backPainter(Painter().fill(Colors.background).insets(0,0,0,12))
}

markup.push({
	Equalizer10Presets: {
		nsClass: "GEPresetsGroup",
		noPresetsTitle: "No User Presets",
		gxPresetItemView: PresetItemView(
			HStack([
				ImageView("sparkline") 
				.ignoreAX()
				.width(25)
				.height(10), 
				Padding(10),
			]).makeHostView()
		),
		gxTitle: "Custom EQ Presets",
		gxPresetValueKeys: [ "node.band0", "node.band1", "node.band2", "node.band3", "node.band4", "node.band5", "node.band6", "node.band7", "node.band8", "node.band9" ]
	},
	
	HeadphoneEQPresets: {
		nsClass: "GEPresetsGroup", 
		noPresetsTitle: "No Saved Profiles",
		gxPresetItemView: PresetItemView(),
		gxTitle: "Saved Profiles",
		gxPresetValueKeys: [ "node.profileSettings" ]
	},

	VolumeOverdrivePresets: {
		nsClass: "GEPresetsGroup",  
		gxPresets: [
			{ presetName: "1x",     presetValues: {  "node.overdrive": 1  }},
			{ presetName: "2x",     presetValues: {  "node.overdrive": 2  }},
			{ presetName: "3x",     presetValues: {  "node.overdrive": 3  }},
			{ presetName: "4x",     presetValues: {  "node.overdrive": 4  }}, 
		],
		gxPresetValueKeys: [ "node.overdrive" ]
	},

	AudioUnitPresets: {
		nsClass: "GEPresetsGroup",   
		gxTitle: "Audio Unit Presets",
		noPresetsTitle: "No Saved Presets",
		gxPresetItemView: PresetItemView(),
		modelKeyPathForPresetsKey: "presetsGroupName",
		gxPresetValueKeys: [ "preset" ]
	},
});
 
