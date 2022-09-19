 
/**
 * Painter - Base
 * @param {String}className The name of the painter class - GXRoundRectPainter default
 */
function Painter(className = "GXRoundRectPainter")
{
	var painter = new BasePainter();   
	painter.nsClass = className;
	return painter;
} 

/**
 * TemplatePainter
 * @param {String}template the name of the markup dictionary
 */
function TemplatePainter(template)
{
	var painter = Painter()
	delete painter.nsClass; 
	return painter.setValues({
		"+" : template,
	});
}

/**
 * LabelPainter
 * @param {String}title default string value to paint
 */    
function LabelPainter(title)
{ 
	var painter = Painter("GXStringPainter").color(Colors.controlFill); 
	painter.gxDefaultValue = title; 
	return painter;
}

/**
 * ImagePainter
 * @param {String}imageName name of the image to paint
 */    
function ImagePainter(imageName)
{ 
	return Painter("GXImagePainter").setValues({
		gxImage : imageName,
		gxTintColor: null
	});
}
 
/**
 * Shadow
 * @param {object}color Shadow color object
 * @param {number}x x offset
 * @param {number}y y offset
 * @param {number}radius shadow radius
 */   
function Shadow(color,x,y,radius)
{
	return {
		nsClass: "NSShadow",
		"gxShadowColor" : color,
		"gxBlurRadius" : radius,
		"gxShadowOffset" : `{${x},${y}}`,
	}
}  
 
/**
 * TemplateView - TemplateView Wrapper 
 * @param {String}markupTitle, The name of the object as it is in the markup dictionary
 */  
function TemplateView(markupTitle)
{
	var view = View()
	delete view.nsClass;
	view["+"] = markupTitle;
	return view;
} 

/**
 * VList - Vertical GXListView Wrapper 
 * @param {Array} views - Views to host in list
 */ 

function VList(views = [])
{  
	var listView = new BaseListView();
	listView.gxVertical = true;
	for (var i in views)
    { 
		var view = views[i];    
		listView.addSubView(view);     
    }  
	return listView;
} 


/**
 * HList - Vertical GXListView Wrapper 
 * @param {Array} views - Views to host in list
 */ 

function HList(views = [])
{  
	var listView = new BaseListView().viewClass("TCHListView");
	listView.gxVertical = false;
	listView.gxLayoutHorizontally = true;
	for (var i in views)
    { 
		var view = views[i];    
		listView.addSubView(view);     
    }  
	return listView;
} 

/**
 * Label 
 * @param {String} defaultValue - Label text
 */

function Label(defaultValue)
{  
	return new BaseLabelView(defaultValue);
} 

function Color(color = Colors.white)
{ 
	return View().backPainter(Painter().fill(color)).fillWidth().fillHeight().keyPath("");
}

function AnchorView()
{ 
    return new BaseView().setValues({
		isAnchorView: true,
		nsClass: "NSView",
		gxLayerZPosition: -1000,
        gxViewName: "__anchor_" + uuidv4(),
    });
}
 
function View(nsClass = "GXDrawView")
{   
	var view = new BaseView();
    return view.viewClass(nsClass);
}

function Padding(size, priority = 1000)
{
    var pad = View()
	pad.gxLayerZPosition = -1000;
    pad.willAddToSuperview = function(sv)
    {
        sv.stackLayout.push(`${sv.alignmentDirection}:[${this.gxViewName}(${size}@${priority})]`);
    }
    return pad;
}

function Spacer()
{
    var spacer = View();
	spacer.gxLayerZPosition = -1000;
    spacer.willAddToSuperview = function(sv)
    { 
        sv.stackLayout.push(`${sv.alignmentDirection}:[${this.gxViewName}(9999@400)]`)
    }
    return spacer
}
 

function Divider(color = Colors.paleGrayContrast)
{
	var divider = View().backPainter(Painter().fill(color)).height(1).fillWidth();
    divider.willAddToSuperview = function(sv)
    { 
		let opp = sv.alignmentDirection == "H" ? "V" : "H"; 
		sv.stackLayout.push(`${opp}:[${this.gxViewName}(9999@400)]`)
		sv.stackLayout.push(`${sv.alignmentDirection}:[${this.gxViewName}(1)]`)
    }
	return divider;
}

function Image(imageName,tintColor)
{
	return View().backPainter(ImagePainter(imageName).tintColor(tintColor))
}

function ImageView(keyPath, tint = Colors.primaryContent)
{
	return TemplateView("ImageView")
		.keyPath(keyPath)    
		.imagePainter(ImagePainter().tintColor(tint))
}

 
/**
 * Button 
 * @param {String} title - Button title
 */
function Button(title)
{
	let btn = new BaseButtonView(title);
	return btn.backPainter(Painter().radius(6).fill(Colors.selection.addStyle("on", Colors.key))).forePainter(LabelPainter(title).color(Colors.white));
}

/**
 * Button 
 * @param {String} title - Button title
 */
function Checkbox(title,)
{
	let btn = new BaseButtonView()  
	return btn
		.height(20)
		.backPainter(ImagePainter("checkbox").tintColor(Colors.key).align(0,0.5))
		.extraPainter(LabelPainter(title).color(Colors.primaryContent).align(0.0,0.5).fontSize(12).offset(20,0))
		.checkBoxRole()
}


function Slider()
{
	return View("GXSliderView").setValues({ 
		gxRangeMin: 0,
		gxRangeMax: 1,  
		gxTrackPainter: "SliderTrack", 
		gxEndGap: 10,
		
		"endGap" : function(gap)
		{
			var cpy = this.copy();
			cpy["endGap"] = gap;
			return cpy;
		},
		"knobPainter" : function(painter)
		{
			var cpy = this.copy();
			cpy["gxKnobPainter"] = painter;
			return cpy;
		},
		"knobPainterExtra" : function(painter)
		{
			var cpy = this.copy();
			cpy["gxKnobPainterExtra"] = painter;
			return cpy;
		},
		"detentPainter" : function(painter)
		{
			return this.setValue(painter, "gxDetentPainter")
		},
		"hasDetents" : function()
		{
			return this.setValue(TemplatePainter("SliderDetents"), "gxDetentPainter")
		},
		"trackPainter" : function(painter)
		{
			var cpy = this.copy();
			cpy["gxTrackPainter"] = painter;
			return cpy;
		},
		"range" : function(l,h)
		{
			var cpy = this.copy();
			cpy["gxRangeMin"] = l;
			cpy["gxRangeMax"] = h;
			return cpy;
		},
		"readoutPath" : function(keyPath)
		{
			var cpy = this.copy();
			cpy["gxReadoutKeyPath"] = keyPath;
			return cpy; 
		},
		"sliderStyle" : function(style = 0)
		{
			var cpy = this.copy();
			cpy["gxSliderTrackStyling"] = style;
			return cpy; 
		},
		"vertical" : function()
		{
			return this.setValue(true, "gxVertical")
		}, 
		gxDetents: "-1, 0, 1",
		gxTrackMidRatio: 0.0,
		gxSliderTrackStyling: 0,
		gxKeystrokeStepSize: 0.01, 
		gxIgnoreScrollWheel: false,
		gxIgnoreDoubleClick: true,
	})
	.viewClass("SoundSource.TCSliderView")   
	.endGap(10) 
	.knobPainter(TemplatePainter("SliderKnob"))
	.knobPainterExtra(TemplatePainter("SliderKnobExtra"))
}


function PopupButton(className = "GXPopupMenuView", fillColor = Colors.controlFill)
{    
	return Button()
		.viewClass(className)
		.intrinsicSize(150,28)
		.backPainter(
			Painter()
				.fill(fillColor)
				.stroke(1,Colors.paleGray.addStyle("increasedContrast", Colors.contrast))
				.radius(6)
				.inset(2) 
				) 
		.forePainter(
			LabelPainter() 
				.tintColor(Colors.primaryContent)
				.fontSize(12)
				.color(Colors.primaryContent)
				.align(0,0.5)
				.monospacedDigits(false)
				.insets(10,0,0,0))
		.iconPainter(ImagePainter().tintColor(Colors.primaryContent.addStyle("disabled", Colors.paleGray)).align(0,0.5).insets(8,0,0,0))
		.flipped()
		.drawArrows("popup.arrows", Colors.primaryContent.addStyle("disabled", Colors.paleGray))
}

function KeyPopupButton(className = "GXPopupMenuView")
{
    return PopupButton()
		.viewClass(className)
		.height(22)
        .forePainter(LabelPainter().align(0.0,0.5).color(Colors.white).fontSize(12).offset(10,0))
		.backPainter(Painter().radius(6).fill(Colors.key.showPressed()).stroke(1, Colors.contrast))
		.drawArrows("caret", Colors.white)
    
} 

function Stack()
{    
    return new BaseStackView();
}  

function HStack(views = [])
{
    var stack = Stack();
    stack.alignmentDirection = "H";  
    
    for (var i in views)
    { 
        var view = views[i];  
        if (i > 0)
        { 
            stack.stackLayout.push(`H:${views[i-1].rightAnchor()}-(0)-${view.leftAnchor()}`); 
        }
        else 
        {  
            stack.stackLayout.push(`H:${stack.leftAnchor()}-(0)-${view.leftAnchor()}`);  
		} 
		stack.addSubView(view);   
        stack.stackLayout.push(`V:${stack.topAnchor()}-(>=0)-${view.topAnchor()}`);
        stack.stackLayout.push(`V:${view.bottomAnchor()}-(>=0)-${stack.bottomAnchor()}`); 
    } 
    
    if (views.length > 0)
    {
        stack.stackLayout.push(`H:${views.slice(-1)[0].rightAnchor()}-(0)-${stack.rightAnchor()}`);
    }

    return stack.align();
}

function VStack(views = [])
{
    var stack = Stack();        
    stack.alignmentDirection = "V";
   
    for (var i in views)
    { 
        var view = views[i];  
         
        if (i > 0)
        { 
            stack.stackLayout.push(`V:${views[i-1].bottomAnchor()}-(0)-${view.topAnchor()}`); 
        }
        else 
        {  
            stack.stackLayout.push(`V:${stack.topAnchor()}-(0)-${view.topAnchor()}`);  
        } 

        stack.addSubView(view);     
        stack.stackLayout.push(`H:${stack.leftAnchor()}-(>=0)-${view.leftAnchor()}`);
        stack.stackLayout.push(`H:${view.rightAnchor()}-(>=0)-${stack.rightAnchor()}`);
    }
    
    if (views.length > 0)
    {
        stack.stackLayout.push(`V:${views.slice(-1)[0].bottomAnchor()}-(0)-${stack.bottomAnchor()}`);
    } 

    return stack.align();
}

function ZStack(views = [])
{
    var stack = new BaseZStackView();   
    
    for (var i in views)
    { 
        var view = views[i];   
		stack.addSubView(view);  
		
		stack.stackLayout.push(`H:${stack.leftAnchor()}-(>=0)-${view.leftAnchor()}`);
		stack.stackLayout.push(`H:${view.rightAnchor()}-(>=0)-${stack.rightAnchor()}`);  
		stack.stackLayout.push(`V:${stack.topAnchor()}-(>=0)-${view.topAnchor()}`);
        stack.stackLayout.push(`V:${view.bottomAnchor()}-(>=0)-${stack.bottomAnchor()}`);  
	}       
    return stack;
} 

function ScrollView(documentView = View())
{  
	return View().setValues({ 
		gxBackColor: Colors.background,
		gxVScrollbar: "ScrollBarView",	// vertical scroller only
		axIsIgnored: true,
		gxVScrollbarWidth: 10,
		gxIntrinsicHeight: -1,
		gxIntrinsicWidth: -1,
		gxAutohidesScrollers: true, 
		gxWantsLayer: true, // Do not delete! Vital for getting layers to look right on older systems.
	    // gxAddViewBelow: true, 
		gxDocumentView: documentView
	}).viewClass("GXScrollView");
}