function LevelMeter(vertical = false)
{
	return View().setValues( 
	{
		nsClass: "GXLevelMeter", 
		gxShowOnKey: "showLevelMeter",
		gxValueKeyPath: "",
		gxAnimateOnKey: "animateMeters",
		gxSytlesKeyPath: "meterStyling",
		gxVertical: vertical,
		gxViewFlipped: true, 
		gxMinPeakHold: 0.2,
		"gxRootLayer": {
			nsClass: "GXMeterLayer",
			gxBackPainter : Painter() 
				.radius(3.5)
				.fill(Colors.paleGray)
				.stroke(1,Colors.contrast)
				.inset(1.5), 
		},
		gxPeakHoldLayer: {
			nsClass: "GXMeterLayer",
			gxFrameRect: vertical? "0,0,8,6" : "0, 0, 6, 8",
			gxBackPainter: PeakHoldPainter(vertical)
 		},
		gxPeakClipLayer: {
			nsClass: "GXDrawLayer",
			gxLayerZPosition: 4,
			gxFrameRect: vertical ? "0,0,8,4" : "0, 0, 5, 8",  // size matters, not position
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
				.radii(0,0,4,4)
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

function PeakClipPainter(vertical)
{
	if (vertical)
	{
		return Painter().fill(Colors.warning).radii(3,3,0,0).offset(0,-2);
	}
	return Painter().fill(Colors.warning).radii(0,3,0,3).offset(-2,0);
}

function PeakHoldPainter(vertical)
{
	if (vertical)
	{
		return Painter().offset(0,-4).fill(Colors.key.addStyle("disabled", Colors.selection));
	}
	return Painter().offset(-4,0).fill(Colors.key.addStyle("disabled", Colors.selection));
}