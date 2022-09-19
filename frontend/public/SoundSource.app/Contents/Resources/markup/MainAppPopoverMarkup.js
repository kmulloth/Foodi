markup.push({ 
    AppPopover: {
		nsClass: "SoundSource.TCAppPopover",
		gxValueKeyPath: "",
		gxWantsLayer: false,
		gxScreenInset: "0,0,0,0",
        gxShadow: "{0, 0, 0, 0.14}, {0, 0}, 5",
        gxWindowMinSize: "411, 200", // 100px is placeholder - layout dictates the height
        gxInitialWindowSize: "679, 200", // 100px is placeholder - layout dictates the height
        gxWindowMaxSize: "667, 10000",
        gxCornerRadius: 10, 
        gxFullScreenFrame: true,   
        gxStatusItemInfo: MenuBarView()
            .viewClass("GXStatusItem")
            .setValues({
                gxAutosaveName: "SSMainAppMenuIcon",
            }),
        gxHeaderView: MainPopoverHeader(),
		gxBackColor: Colors.background,
        gxHiliteColor: null,
        gxStrokeColor: Colors.contrast,
        gxValueKeyPath: "preferences.uiState",
        gxAutoRecalculatesKeyViewLoop: true,
        axTitle: "SoundSource",
        gxTitle: "SoundSource", 
        axRoleDescription: "Main application window",
        gxSavedWindowStateKey: "SSAppPopover",  
		// Vertical contraints are altered in TCAppPopover.swift to make sure
		// the popover doesn't expand past the current screen size.
        gxLayout: [ 
            `H:|-${Constants.popoverShadowInset + 0.5}-[self]-${Constants.popoverShadowInset + 0.5}-|`,
            `V:|-${Constants.popoverShadowInset}-[self]-${Constants.popoverShadowInset}-|`,  
            "V:|-0-[mainView]-0-|",
            "H:|-(-0.5)-[mainView]-(-0.5)-|",
            `V:[self(<=100@600)]`, // Shrink to fit contents
        ],
        gxChildViews:
        [ 
            ZStack([ 
                 
                VStack([  

                    Padding(40),  

                    ScrollView(
                       VStack([ 
                           
                            SourceListHeader("System", "Volume", "Boost", "Device")
                                .viewName("devicesHeader"), 

                            SourceList()
                                .viewName("systemDevicesSourceList")
                                .keyPath(`preferences.uiState.SystemCollapsed`), 
                        
                            SourceListHeader("Applications", "Volume", "Boost", "Redirect Audio To")
                                .viewName("applicationsHeader"), 
                    
                            SourceList()
                                .setValue(true, "acceptsApplicationDrops")
                                .viewName("activeSourceList")
                                .keyPath(`preferences.uiState.ApplicationsCollapsed`),  
                                
                        ]).makeHostView().addLayout("H:|-0-[self]-0-|").addLayout("V:|-0-[self]-0@700-|")
                    ).viewName("sourcesScrollView"),
     
                    Divider(), 

                    HStack([
                        KeyPopupButton("TCAppPopupView")   
                            .width(105)
                            .viewName("addAppPopup") 
                            .toolTip("Add an application to the Favorites list. Favorites are shown at all times, so settings are always adjustable.")
                            .keyPath("addApp")
                            .padding(10,6,6,5),  
                        Spacer(), // Spacer makes the HStack fill the entire width of the parent view
                    ])
                    .makeHostView()
                    .setValue(true,"gxConsumeMouseClick") // Make sure clicking the footer doesn't close plugin windows

    
                ]).align("left"),
 
                DesatView(),
            ])
            .makeHostView()  
            .viewName("mainView"), 
        ], 
    },
	
	OptionMenuItems : {
        gxMenuItems: [
			seperatorItem(),
            menuItem("Preferences...").keyEquiv(","),
            menuItem("License..."),
            menuItem("Purchase SoundSource...").hideKey("hidePurchaseMenuItem"),
            seperatorItem(),
            menuItem("System")
                .keyEquiv("")
                .menuItems([ 
                    menuItem("Open Sound Preferences"), 
                    menuItem("Open Audio MIDI Setup")]),
            seperatorItem(),
            menuItem("Help")
                .menuItems([
					menuItem("Visit the SoundSource Support Center"),
					menuItem("Contact Us..."),
					menuItem("Quit and Relaunch for Debugging").isAlternate(),
					seperatorItem(),
                    menuItem("Online Manual"),
                    menuItem("Release Notes"),
					menuItem("Quick Tour"),
            ]),
            menuItem("About SoundSource"),
            seperatorItem(),
            menuItem("Uninstall ACE..."),
            menuItem("Reinstall ACE...").isAlternate(),
            seperatorItem(),
            menuItem("Quit SoundSource").keyEquiv("q"),
        ]
    } 
}); 


function PinButton()
{
    return Button() 
        .viewClass("SoundSource.TCAnimatingButtonView")
        .setValues({
            "gxAnimationView" : {
                "nsClass" : "GXArchivedAnimationView",
                "gxAssetName" : "pin-toggle",
                "gxShowPressEffect" : true,
                "gxVectorPainter" : Painter().stroke(0,Colors.key.showPressed()).fill(Colors.key.showPressed()), 
            }  
        })
        .viewName("pinBtn")
        .flipped(true)
        .checkBoxRole()
        .forePainter(null)
        .backPainter(null)
        .keyPath("pinnedBtn")
        .toolTip("Pin this popover above all windows on the system", "Unpin this popover")
        .setAXTitle("Pin") 
        .size(22,22); 
}

function BypassSlider()
{
    return Button() 
        .viewClass("SoundSource.TCAnimatingSwitchView")
        .setValues({
            "gxAnimationView" : {
                "nsClass" : "GXArchivedAnimationView",
                "gxAssetName" : "toggle",
                "tint" : {
                    "gxVectorPainter" : Painter().fill(Colors.key.showPressed().addStyle("disabled", Colors.paleGray)), 
                }
            },
            "toolTip": function(tooltip, onToolTip = tooltip)
            {
                var cpy = this.copy(); 
                cpy["gxOffToolTip"] = tooltip;
                cpy["gxToolTip"] = onToolTip;
                return cpy;
            },
        }) 
        .viewName("bypassButton")
        .flipped(true)
        .checkBoxRole()
        .forePainter(null)
        .backPainter(null)   
        .size(44,20); 
}

function DisclosureButton()
{
    return Button("") 
        .viewClass("SoundSource.TCAnimatingButtonView")
        .setValues({
            "gxAnimationView" : {
                "nsClass" : "GXArchivedAnimationView",
                "gxAssetName" : "disclosure",
                "gxShowPressEffect" : true,
                "gxVectorPainter" : Painter().fill(Colors.primaryContent), 
            } ,  
            gxBaselineOffset: 7,
            gxHideOnNilValue: true,
            axCheckboxRole: true, 
        })
        .size(28)  
        .ignoreAX()
        .flipped(true)
        .checkBoxRole() 
        .viewName("disclosureButton")
        .backPainter(Painter()
            .radius(14) 
            .inset(2)
            .fill(MainThemeColor(Colors.background.lightMode, Colors.controlFill.darkMode))
            .stroke(1, Colors.paleGrayContrast)
        ); 
}

function DeleteButton(fill = Colors.controlFill, stroke = Colors.contrast)
{
    return Button() 
        .backPainter(Painter().radius(10).fill(fill.showPressed().removeStyle("disabled")).stroke(1, stroke.removeStyle("disabled")))
        .forePainter(ImagePainter("delete").tintColor(Colors.text))
        .size(20);
}

function AnimationView(asset)
{
    var animation = new BaseAnimationView(); 
    return animation.setValue(asset, "gxAssetName") 
}

function MainPopoverHeader()
{ 
    return ZStack([ 
        
        VStack([
            HStack([    
                Padding(5),
                
                PinButton(),

                Button()
                    .viewClass("SoundSource.TCAnimatingButtonView") 
                    .checkBoxRole()
                    .keyPath("preferences.uiState.narrowWindow")
                    .size(26,22) 
                    .forePainter(null)
                    .backPainter(null)
                    .setAXTitle("window resize")
                    .toolTip("Switch to Compact View", "Switch to Standard View")
                    .setValues({
                        "gxDefaultValue" : false,
                        "gxAnimationView" : {
                            "nsClass" : "GXArchivedAnimationView",
                            "gxAssetName" : "resize-toggle",
                            "gxShowPressEffect" : true,
                            "gxVectorPainter" : Painter().stroke(0,Colors.key.showPressed()).fill(Colors.key.showPressed()), 
                        }
                    }).padding(5), 

                Spacer(),
                
                Label("SoundSource")
                    .viewName("appTitle")
                    .fontSize(16) 
                    .width(110)
                    .medium()
                    .centerH()
                    .hideKey("trialMode")
                , 
    
                Spacer(),
    
                Button("Trial Mode")
                    .size(80,28)
                    .backPainter(TemplatePainter("ControlBack")
                        .shadow(Colors.invisible,0,0,0)
                        .fill(Colors.trialButtonOrange.showPressed()) 
                        .radius(6)
                    )
                    .hideKey(null)
                    .keyPath("windowController.trialBtn")
                    .forePainter(TemplatePainter("ControlFore.white")) 
                    .padding(5),   
    
                Padding(5),

                PopupButton() 
                    .viewClass("SoundSource.TCAnimatingPopupButtonView")
                    .backPainter(null)
                    .setValues({
                        "gxResetItemsOnOpen" : false,
                        "gxAnimationView" : {
                            "nsClass" : "GXArchivedAnimationView",
                            "gxAssetName" : "preferences",
                            "caret" : { 
                                "gxVectorPainter" : Painter().stroke(0,Colors.key.showPressed()), 
                            },
                            "gear"  : { 
                                "gxVectorPainter" : Painter().fill(Colors.key.showPressed()), 
                            }
                        }
                    })
                    .size(32,22)
                    .setAXTitle("Options")
                    .extraPainter(null)
                    .pullsDown()
                    .menuItemsPath("windowController.optionMenuItems")
                    .keyPath(""), 

                Padding(10),
            ]),
            Divider(),  
        ]),

        DesatView([10,10,0,0]),
    ])   
    .makeHostView()  
    .addLayout("H:|-12-[self]-12-|")
    .addLayout("V:|-12-[self]")
    .viewClass("GXSettingsView")
    .setValues({
        gxCanDrawSubviewsIntoLayer: true,
        gxConsumeMouseClick: true, // Make sure clicking the header doesn't cause any open plugin to be hidden
    });
}

function DesatView(radii = [10,10,10,10])
{
    return TemplateView("DesatOverlay") 
            .keyPath("") 
            .backPainter(TemplatePainter("DesatOverlayBackPainter").radii(radii[0],radii[1],radii[2],radii[3]))
            .fillWidth()
            .fillHeight()
}

function SourceListHeader(headerName, volumeName, boostName, deviceTitle) 
{ 
 
    function HeaderView(name) 
    {
        return Label(name).textAlign(0,1).fontSize(12).height(25).animateVisibility(1, 0);
    }

    return View().setValues({
        gxLayout: [
            "H:|-8-[showSection]-5-[nameHeader][volumeHeader]-46-[boostHeader][deviceHeader]&alignBaseline", 
            "H:|-415-[deviceHeader(186)]",
            "H:|-301-[deviceHeaderCollapsed(42)]",   
            "H:|-246-[boostHeaderCollapsed]",
            "H:|-361-[boostHeader]",
            "H:|-(205)-[volumeHeader]", 
        ],
        gxWantsLayer: true,
        "gxChildViews": [
             DisclosureButton()
                .setValues({
                   "gxBaselineOffset" : -8, 
                })
                .viewName("showSection")  
                .keyPath(`preferences.uiState.${headerName}Collapsed`)  
                .toolTip(`Hide “${headerName}” section`, `Show “${headerName}” section`)
                .ignoreAX()
                ,
      
        
            HeaderView(headerName)    
                .viewName("nameHeader") 
                .fontSize(14).bold(),  

            HeaderView(volumeName)
                .viewName("volumeHeader")  
                .textAlign(0.5,1)
                .showKey(`showVolumeHeader${headerName}`)     
                ,    
       
            HeaderView(boostName)  
                .viewName("boostHeader")   
                .showKey(`showBoostHeader${headerName}`) 
                ,   
            
            HeaderView(boostName)  
                .viewName("boostHeaderCollapsed")   
                .showKey(`showBoostHeaderCollapsed${headerName}`) 
                ,  
                
            HeaderView(deviceTitle)
                .viewName("deviceHeaderCollapsed")   
                .textAlign(0.5,1)   
                .showKey(`showDeviceHeaderCollapsed${headerName}`) 
                , 

            HeaderView(deviceTitle)
                .viewName("deviceHeader")   
                .textAlign(0.5,1)  
                .showKey(`showDeviceHeader${headerName}`) 
                , 
        ]
    }).viewClass("GXSettingsView").height(30).fillWidth().keyPath("").ignoreAX();
}; 

function SourceList()
{
    return VList()
        .fillWidth()  
        .topPad(5)
        .viewClass("SoundSource.TCSourceListView")  
        .ignoreAX()
        .setValues({
            gxDrawsSelected: true,  
            gxCollapsible: true, 
        })   
}
  
