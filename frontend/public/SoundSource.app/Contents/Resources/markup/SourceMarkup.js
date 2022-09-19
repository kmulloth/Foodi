  
markup.push({ 
    "OutputSource" : { 
        nsClass: "SoundSource.TCOutputDeviceModel", 
        deviceType: "Output", 
        name: "Output",
        icon: "icon-output", 
        menuIcon: "menu-output", 
        expands: true,  
        showW1Status : true,
        scansBT : true, 
        showsSources : true,  
        showsAirplay : true,
        position: -3,
        menuModelClass: "SoundSource.TCMenuBarOutputModel",
        defaults: { 
            uuid: "SystemOutputUUID",  
            favourite: true,
            hasPan: true,
            alwaysActive: true,
            // hasRate: true, 
            hasBoost: true, 
            hostsEffects: true,
            viewInfoKey: "OutputListItem",
            statusItemInfoKey: "MenuBarListItem",
            supportedEffects: [Constants.BalanceEffectMarkupKey, Constants.TC10BandEQMarkupKey, Constants.TCHeadphoneEQMarkupKey],
            defaultEffects: [Constants.BalanceEffectMarkupKey, Constants.TC10BandEQMarkupKey],
            axTitle: "“<gx>sourceName</gx>“ device",
            visibleInMenuBar: true,
            hasResetToDefaultsMenuItem: true,
        }
    },
    "InputSource" : { 
        nsClass: "SoundSource.TCInputDeviceModel", 
        deviceType: "Input",  
        name: "Input",
        icon: "icon-input",    
        menuIcon: "menu-input",
        showInputs : true,  
        showsSources : true,  
        position: -2,
        menuModelClass: "SoundSource.TCMenuBarInputModel",
        defaults: { 
            uuid: "SystemInputUUID", 
            favourite: true,
            hasBoost: false, 
            hasRate: true,
            viewInfoKey: "InputListItem",
            statusItemInfoKey: "MenuBarListItem",
            axTitle: "“<gx>sourceName</gx>” device",
            visibleInMenuBar: true,
            defaultEffects: [],
        }
    },
    "EffecsSource" : { 
        nsClass: "SoundSource.TCEffectsDeviceModel", 
        deviceType: "Sound Effects",  
        name: "Sound Effects",
        icon: "icon-fx", 
        menuIcon: "menu-effects",
        effects: [], 
        hasBoost: false, 
        trackingTitle : "Track System Output",
        position: -1,
        menuModelClass: "SoundSource.TCMenuBarModel",
        defaults: { 
            uuid: "systemEffectsUUID",  
            favourite: true,
            viewInfoKey: "EffectsListItem",
            statusItemInfoKey: "MenuBarListItem",
            showsMuteAlert: true,
            alwaysActive: true,
            expands: false,
            axTitle: "<gx>sourceName</gx> device",
            visibleInMenuBar: false,
            defaultEffects: [],
        }
    },
    "AppSource" : { 
        nsClass: "SoundSource.TCAppSourceModel", 
        deviceType: "Output", 
        favourite: false,
        removable: true, 
        draggable: true,    
        trackingTitle : "No Redirect", 
        menuModelClass: "SoundSource.TCMenuBarModel",
        defaults: {
            deletable: true, 
            hostsEffects: true,
            hasBoost: true, 
            showsMuteAlert: true,
            templatePopoverIcon: false,
            supportedEffects: [Constants.TCVolumeOverdriveMarkupKey, Constants.TC10BandEQMarkupKey, Constants.TCParametricEQMarkupKey],
            defaultEffects: [Constants.TCVolumeOverdriveMarkupKey, Constants.TC10BandEQMarkupKey],
            viewInfoKey: "AppSourceListItem", 
            statusItemInfoKey: "MenuBarListItem",
            axTitle: "“<gx>sourceName</gx>” application",
            hasResetToDefaultsMenuItem: true,
        }
    }, 
    AppDropModel: {
        "+" : "AppSource",
        gxLayout: ["V:[self(0)]"],
        defaults: {
            viewInfoKey : "AppDropView",
        }
    },
})  

// MARK: Accessibility strings

Constants.tooltips = {} 

Constants.tooltips[kSystemOutputSourceType+"axHelp"]                = `Set the default system output, mute, volume, Magic Boost setting, equalizer, balance, 
                                                                       sample rate and custom effects for all audio coming from this device. To start interacting
                                                                       with this device press Control-Option-Shift-Down arrow.`;
Constants.tooltips[kSystemInputSourceType+"axHelp"]                 = `Control the volume, and sample rate of the system input device. To start interacting with 
                                                                       this device press Control-Option-Shift-Down arrow.`;
Constants.tooltips[kSystemEffectsSourceType+"axHelp"]               = `Control the volume, and output device for all system effects. To start interacting with 
                                                                       this device press Control-Option-Shift-Down arrow.`;
Constants.tooltips[kApplicationSourceType+"axHelp"]                 = `Set the output device, mute, , Magic Boost setting, equalizer and custom effects 
                                                                       for all audio coming from this application. To start interacting with this application 
                                                                       press Control-Option-Shift-Down arrow.`;

Constants.tooltips[kSystemOutputSourceType+"deviceSelectToolTip"]   = "Choose an audio device for the system “<gx>sourceName&lc</gx>”.";
Constants.tooltips[kSystemInputSourceType+"deviceSelectToolTip"]    = "Choose an audio device for the system “<gx>sourceName&lc</gx>”.";
Constants.tooltips[kSystemEffectsSourceType+"deviceSelectToolTip"]  = "Choose an audio device for the system “<gx>sourceName&lc</gx>”.";
Constants.tooltips[kApplicationSourceType+"deviceSelectToolTip"]    = "Choose an audio device for “<gx>sourceName</gx>”.";

Constants.tooltips[kSystemOutputSourceType+"sampleRateToolTip"]     = "Set the sample rate for the system output device";
Constants.tooltips[kSystemInputSourceType+"sampleRateToolTip"]      = "Set the sample rate for the system input device";

Constants.tooltips[kSystemOutputSourceType+"volumeToolTip"]         = "Set the system “<gx>sourceName&lc</gx>” volume";
Constants.tooltips[kSystemInputSourceType+"volumeToolTip"]          = "Set the system “<gx>sourceName&lc</gx>” volume";
Constants.tooltips[kSystemEffectsSourceType+"volumeToolTip"]        = "Set the system “<gx>sourceName&lc</gx>” volume";
Constants.tooltips[kApplicationSourceType+"volumeToolTip"]          = "Set the volume for “<gx>sourceName</gx>”"; 

Constants.tooltips[kSystemOutputSourceType+"addEffectHelp"]         = "Select 3rd party plugins to process the audio for the system output";
Constants.tooltips[kSystemInputSourceType+"addEffectHelp"]          = "Select 3rd party plugins to process the audio for the system input";
Constants.tooltips[kSystemEffectsSourceType+"addEffectHelp"]        = "Select 3rd party plugins to process the audio for the system effects";
Constants.tooltips[kApplicationSourceType+"addEffectHelp"]          = "Select 3rd party plugins to process the audio from “<gx>sourceName</gx>”";

Constants.tooltips[kSystemOutputSourceType+"axDescription"]         = "<gx>axTitle</gx>: The current audio device selection for this output is “<gx>device.name</gx>”";
Constants.tooltips[kSystemInputSourceType+"axDescription"]          = "<gx>axTitle</gx>: The currentudio device selection for the system input is “<gx>device.name</gx>”";
Constants.tooltips[kSystemEffectsSourceType+"axDescription"]        = "<gx>axTitle</gx>: The current output selection for the system effects is “<gx>device.name</gx>”";
Constants.tooltips[kApplicationSourceType+"axDescription"]          = "<gx>axTitle</gx>: This application's output selection is “<gx>device.name</gx>”";
