markup.push({
    "MenuBarListItem" : ApplicationMeter().viewClass("GXStatusItem"), 
})

function VolumeIndicator(iconPath, size, color)
{
    return View() 
    .viewClass("SoundSource.TCVolumeIndicatorView").keyPath(iconPath).size(size).setValues({
        "gxSubLayers" : {
            "imageLayer1" : {
                nsClass: "GXImageLayer", 
                gxFrameRect: `0,0,${size},${size}`, 
                gxForePainter: ImagePainter().tintColor(color),
            },
            "imageLayer2" : {
                nsClass: "GXImageLayer", 
                gxFrameRect: `0,0,${size},${size}`, 
                gxForePainter: ImagePainter().tintColor(color),
            }
        },
    });
}

function MenuBarView()
{
    return HStack([     
        ZStack([ 

            // VolumeIndicator("volumeIconFill", 20, Colors.white.withAlpha(0.25))
            //     .showKey("volumeIndicatorInMenuBar"), 
            
            VolumeIndicator("volumeIcon", 20, Colors.menuBarBaseColor)
                .showKey("volumeIndicatorInMenuBar"),  
            
            View() 
                .showKey("legacyIconInMenuBar") 
                .viewClass("SoundSource.TCImageLayerView")
                .size(17)
                .setValues({
                    "gxSubLayers" : {
                        "imageLayer" : {
                            nsClass: "GXImageLayer",
                            gxImage: "menu-icon-logo",
                            gxFrameRect: "0,0,17,17", 
                            gxForePainter: ImagePainter().tintColor(Colors.menuBarBaseColor),
                        }
                    },
                }), 
                TrialBadge(), 
        ]).align(),  
    ])   
    .makeHostView().viewName("mainMenuBarView"); 
}

function TrialBadge()  
{
    return View() 
    .showKey("trialMode")
    .viewClass("SoundSource.TCLayerHostingView").keyPath("").size(17).setValues({
        "gxSubLayers" : {
            "imageLayer" : {
                nsClass: "GXImageLayer",
                gxImage: "menu-icon-trial",
                gxFrameRect: "0,0,17,17",  
                gxForePainter: ImagePainter().tintColor(Colors.menuBarTrial),
            }
        },
    })
}

function InactiveMeter()
{
    return View()  
    .showKey("showMeterDisabled")
    .viewClass("SoundSource.TCLayerHostingView").keyPath("").size(6,16).setValues({
        "gxSubLayers" : {
            "imageLayer" : {
                nsClass: "GXImageLayer",
                gxImage: "menubar-meter-inactive",
                gxFrameRect: "0,0,6,16",   
                gxForePainter: ImagePainter().tintColor(Colors.menuBarBaseColor.withAlpha(0.25).addStyle("muted", Colors.menuBarBaseColor.withAlpha(0))),
            }
        },
    })
}

function ApplicationMeter() 
{
    return HStack([
       
        ZStack([ 
            View() 
                .size(16)
                .viewClass("SoundSource.TCImageLayerView").keyPath("menuIcon").size(16).setValues({
                    "gxSubLayers" : {
                        "imageLayer" : {
                            nsClass: "GXImageLayer", 
                            gxFrameRect: "0,0,16,16", 
                            gxForePainter: ImagePainter().tintColor(Colors.menuBarIcon),
                        }
                    },
                }), 
        ]).align(),
        
        Padding(2), 
 
        ZStack([  
            MenuBarLevelMeter(true)
                .width(6) 
                .height(16) 
                .peakPath(`levelMeter.peakStereoMax`) 
                .clipPath(`levelMeter.clipStereoMax`)
                .rmsPath(`levelMeter.rmsStereoMax`), 

            View()
                .viewClass("SoundSource.TCAnimatingView") 
                .size(13)  
                .showKey("muted") 
                .setValues({
                    "gxAnimationView" : {
                        "nsClass" : "GXArchivedAnimationView", 
                        "gxAssetName" : "menu-mute", 
                        "gxVectorPainter" : Painter().fill(Colors.menuBarBaseColor), 
                    }  
                })
                .keyPath(""),

            InactiveMeter()
        ]).align(), 
    ])
    .makeHostView()
}   

function MenuBarLevelMeter(vertical)
{
    return View().setValues({
        nsClass: "SoundSource.TCMenuLevelMeter",
        gxValueKeyPath: "",
        gxViewFlipped: true, 
        gxVertical: vertical, 
        gxMinPeakHold: 0.2,  
        gxAnimateOnKey: "animateMeter",
        "gxRootLayer": {
            nsClass: "GXMeterLayer",  
            gxBackPainter : Painter()
                .radius(3) 
                .fill(Colors.menuBarBaseColor.withAlpha(0.3)), 
            gxMaskLayer: {
                nsClass: "GXImageLayer",
                gxImage: "mute-mask",
                gxForePainter : ImagePainter().fill(Colors.white.addStyle("muted", Colors.white.withAlpha(0)))
            }
        },  
        "gxRMSLayer": { 
            nsClass: "GXMeterLayer",  
            gxLayerZPosition: 2,
            gxVertical : vertical,
            gxBackPainter : Painter()
                .radius(3) 
                .fill(Colors.menuBarFill),  
            gxMaskLayer: {
                nsClass: "GXDrawLayer",
                "gxVertical": vertical,
                gxBackColor: Colors.black,
                gxIsOpaque: true,
                gxLayerZPosition: 3,
            },	// sets layer color for fill
        }, 
        gxPeakLayer: { 
            nsClass: "GXMeterLayer",  
            gxLayerZPosition: 2,
            gxVertical : vertical,
            gxBackPainter : Painter()
                .radii(0,0,3,3)
                .insets(0,3,0,0)
                .fill(Colors.menuBarFill.withAlpha(0.5)),  
            gxMaskLayer: {
                nsClass: "GXDrawLayer",
                "gxVertical": vertical,
                gxBackColor: Colors.menuBarFill,
                gxIsOpaque: true,
                gxLayerZPosition: 3,
            },	// sets layer color for fill
        },  
        gxPeakClipLayer: { 
            nsClass: "GXDrawLayer",
            gxLayerZPosition: 4,
            gxFrameRect: "0, 0, 6, 2",  // size matters, not position
            "gxVertical": vertical,
            gxBackPainter : Painter()
                .radii(3,3,0,0)
                .fill(Colors.menuBarFill), 
        },   
        "rmsPath" : function(path)
        {
            let cpy = this.copy();
            cpy.gxRMSValueKeyPath = path;
            return cpy; 
        },
        "peakPath" : function(path)
        {
            let cpy = this.copy();
            cpy.gxPeakValueKeyPath = path;
            return cpy; 
        },
        "clipPath" : function(path)
        {
            let cpy = this.copy();
            cpy.gxClipValueKeyPath = path;
            return cpy; 
        } 
    });
}
