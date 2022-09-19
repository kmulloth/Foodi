markup.push({
   
    // standard label for a slider
    "SliderLabel": {
        "+": "LabelView.right.fontColor.size13",
    },

    // standard readout for a slider
    "SliderReadout": {
        "+": "LabelView",
        gxCanBecomeKeyView: false,         
        gxForePainter: {
            "+": "LabelFore.right.fontColor.size11",
            "center" : {
                gxHAlign: 0.5
            },
            gxBackColor: Colors.invisible,
            "boost" : {
                gxFontColor: Colors.warning,
            },
            "disabled": {
                // prevent drawing when disabled by making empty rect
                gxEdgeInsets: "999,999,999,999"
            },
        }, 
        gxDefaultValue: "",
        gxIntrinsicWidth: 48,
        gxIntrinsicHeight: 19,
        gxVAlign: 0.5,
        gxSendTextAction: false,
        "fractionalSeconds": {
            gxFormatter: { nsClass: "GXTimeFormatter", "fractionalSeconds": true },
        },
        "percentage": {
            gxFormatter: { nsClass: "GXScaledFormatter", "format": "%.0f%%", scale: 100, },
        },
        "gain": {
            gxFormatter: { nsClass: "GXScaledFormatter", "format": "%.0.1fdB" },
        },
        "hertz": {
            gxFormatter: { nsClass: "GXScaledFormatter", "format": "%.0.0fHz" },
        },
    },

    // MARK: slider painters

    "SliderTrack":
    {
        nsClass: "GXRoundRectPainter",
        gxDefaultSize: "4,4",    // default size of track determines track width!
        gxCornerRadii: "2, 2, 2, 2", 
        gxFillColor: Colors.paleGray,
        gxHiliteColor: Colors.contrast,
        gxClipsHighlight: false,
        gxHighlightOffset: 0,
		gxStrokeWidth: 0,
        "on": {  
            gxFillColor: Colors.key,
            "muted": {
                gxFillColor: Colors.strongGray,   
            },
        },
        "disabled": {
            // prevent drawing using zero size when disabled 
            gxFillColor: Colors.paleGray
        },
        "muted": {
            gxFillColor: Colors.paleGray,   
        },
		"pressed" : { }
    }, 

    "SliderKnob" : {
        nsClass: "GXRoundRectPainter",
        gxCornerRadius: "16",
        gxDefaultSize: "{16,16}",
        gxFillColor: Colors.sliderFocus,
    },

    "SliderKnobExtra" : {
        nsClass: "GXRoundRectPainter",
        gxCornerRadius: "16",
        gxEdgeInsets : "1,1,1,1",
        gxDefaultSize: "{16,16}",
        gxFillColor: Colors.white,
        "focused" : {
            gxEdgeInsets: "2,2,2,2",
        },
        "muted" : {
            gxEdgeInsets : "1,1,1,1",
            gxFillColor: Colors.darkGray, 
        }
    },

    "SliderDetents": Painter().fill(Colors.paleGrayContrast).size(1,10).offset(0,14),

    "SliderDetentsBig": {
        nsClass: "GXPainter",
        gxFillColor: Colors.darkGray,
        gxDefaultSize: "1,20",
        gxEdgeInsets: "0,0,0,0",
        "disabled": {
            gxFillColor: Colors.darkGray
        }
    },
})
