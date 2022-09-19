function uuidv4() 
{ 
    if (!this.counter)
    {
        this.counter = 0;
    } 
    this.counter += 1;
    return `_${this.counter}`;
}

class Base
{   
    copy()
    { 
        let child = this; 
        var cpy = Object.assign(Object.create(Object.getPrototypeOf(child)), child);  
        return cpy;
    }
    setValue(value,key)
    { 
        var cpy = this.copy();
        cpy[key] = value;
        return cpy;
    }
    setValues(values)
    { 
        var cpy = this.copy();  
        return Object.assign(cpy, values);
    }
    dump()
    {
        console.log(JSON.stringify(this, null, 2));
        return this;
    } 
} 

class BaseView extends Base 
{ 
    constructor()
    { 
        super();
        this.nsClass = "GXDrawView"; 
        this.gxViewName = uuidv4(); // Arbritary view name
        this.gxChildViews = [];
        this.gxLayout = [];   
        this.alignmentString = "";
        this.paddingValues = []; 
    } 
    
    lView() { return this.copy(); }
    rView() { return this.copy(); }
    tView() { return this.copy(); }
    bView() { return this.copy(); }

    wView() { return this.copy(); }
    hView() { return this.copy(); } 
    
    leftAnchor()    { return `[${this.lView().gxViewName}]`; };
    rightAnchor()   { return `[${this.rView().gxViewName}]`; };
    topAnchor()     { return `[${this.tView().gxViewName}]`; };
    bottomAnchor()  { return `[${this.bView().gxViewName}]`; };

    viewsForSuperview()
    { 
        var views = [];
        if (this.lView().gxViewName != this.gxViewName)
        {
            views.push(this.lView()); 
        } 
        if (this.rView().gxViewName != this.gxViewName)
        {
            views.push(this.rView()); 
        }  
        if (this.tView().gxViewName != this.gxViewName)
        {
            views.push(this.tView()); 
        } 
        if (this.bView().gxViewName != this.gxViewName)
        {
            views.push(this.bView()); 
        } 
        views.push(this.copy());
        return views;
    }

    layoutForSuperview()
    {
        var layout = [];

        if (this.paddingValues[0] && this.paddingValues[0] != 0)
        { 
            layout.push(`H:${this.leftAnchor()}-${this.paddingValues[0]}-[${this.gxViewName}]`);   
        }
        if (this.paddingValues[1] && this.paddingValues[0] != 0)
        { 
            layout.push(`H:[${this.gxViewName}]-${this.paddingValues[1]}-${this.rightAnchor()}`);   
        }
        if (this.paddingValues[2] && this.paddingValues[0] != 0)
        { 
            layout.push(`V:${this.topAnchor()}-${this.paddingValues[2]}-[${this.gxViewName}]`);   
        }
        if (this.paddingValues[3] && this.paddingValues[0] != 0)
        { 
            layout.push(`V:[${this.gxViewName}]-${this.paddingValues[3]}-${this.bottomAnchor()}`);   
        } 
        return layout
    }
    
    viewName(newName)
    {
        return this.setValue(newName,"gxViewName");
    }
    
    viewClass(nsClass)
    {
        return this.setValue(nsClass, "nsClass");
    }
    
    width(w, priority = 1000) 
    {
        var cpy = this.copy();
        cpy.gxIntrinsicWidth = -1;
        cpy.gxLayout.push(`H:[self(${w}@${priority})]`);
        return cpy; 
    }
    
    height(h, priority = 1000)
    {
        var cpy = this.copy();
        cpy.gxIntrinsicHeight = -1;
        cpy.gxLayout.push(`V:[self(${h}@${priority})]`);
        return cpy;
    }
    size(w,h = w)
    { 
        return this.copy().width(w).height(h);
    } 
    fill(color)
    { 
        var cpy = this.copy();
        cpy.gxBackPainter = {
            nsClass: "GXRoundRectPainter",
            gxFillColor: color,
        }
        return cpy;
    }

    addToSuperview(sv)
    {    
        sv.addSubView(this);
    }

    willAddToSuperview(sv)
    {
        // For override
    }

    addSubView(view)
    {
        view.willAddToSuperview(this);
        
        this.gxChildViews = this.gxChildViews.concat(view.viewsForSuperview())
        this.gxLayout = this.gxLayout.concat(view.layoutForSuperview());
    }

    addLayout(layout)
    {
        var cpy = this.copy();
        cpy.gxLayout.push(layout);
        return cpy;
    }
    padding(l = 10, r = l,t = l ,b = l)
    {  
        var cpy = this.copy(); 
        cpy.paddingValues = [l,r,t,b];  
        if (l != 0)
        {
            cpy.lView = function() { return AnchorView().viewName("_left_" + this.gxViewName) };
        }
        if (r != 0)
        {
            cpy.rView = function() { return AnchorView().viewName("_right_" + this.gxViewName) };
        }
        if (t != 0)
        {
            cpy.tView = function() { return AnchorView().viewName("_top_" + this.gxViewName) };
        }
        if (b != 0)
        {
            cpy.bView = function() { return AnchorView().viewName("_bottom_" + cpy.gxViewName) };
        }
        return cpy;
    } 
    
    forePainter(painter)
    { 
        return this.setValue(painter, "gxForePainter");
    }
    iconPainter(painter)
    { 
        return this.setValue(painter, "gxIconPainter");
    }
    backPainter(painter)
    {
        return this.setValue(painter,"gxBackPainter");
    }
    extraPainter(painter)
    {
        return this.setValue(painter,"gxExtraPainter");
    }
    imagePainter(painter)
    {
        return this.setValue(painter,"gxImagePainter");
    }
    keyPath(keyPath)
    {
        return this.setValue(keyPath, "gxValueKeyPath");
    }
    toolTipKeyPath(keyPath)
    {
        return this.setValue(keyPath, "gxToolTipKeyPath");
    }
    bordered(color = Colors.primaryContent)
    {
        return this.backPainter(Painter().stroke(2, color));
    }
    
    frame(frameRect)
    {
        return this.setValue(frameRect,"gxFrameRect");
    }
    
    intrinsicSize(w,h = w)
    {
        return this.copy().setValues({
            gxIntrinsicWidth: w,
            gxIntrinsicHeight: h, 
        });
    }
    
    fillHeight(priority = 450)
    {  
        return this.addLayout(`V:|-0@${priority}-[self]-0@${priority}-|`);
    }
    
    fillWidth(priority = 450)
    {
        return this.addLayout(`H:|-0@${priority}-[self]-0@${priority}-|`);
    }
    
    pinLeft()
    {
        return this.leadingPad("H",0);
    }
    
    pinRight()
    {
        return this.trailingPad("H",0);
    }
    
    pinTop()
    {
        return this.leadingPad("V",0);
    }
    
    pinBottom()
    {
        return this.trailingPad("V",0);
    }
    
    fillParent(priority = 450)
    {
        return this.fillWidth(priority).fillHeight(priority);
    }
    
    centerV()
    {
        return this.addLayout("H:[superview]-(<=0)-[self]&alignCenterY")
    }
    
    centerH()
    {
        return this.addLayout("V:[superview]-(<=0)-[self]&alignCenterX")
    }
    
    leadingPad(orientaion, amt)
    {
        return this.addLayout(`${orientaion}:|-(${amt})-[self]`)
    }
    
    trailingPad(orientaion, amt)
    {
        return this.addLayout(`${orientaion}:[self]-(${amt})-|`)
    }
    
    leftPad(amt)
    {
        return this.addLayout(`H:|-(${amt})-[self]`)
    }
    
    rightPad( amt)
    {
        return this.addLayout(`H:[self]-(${amt})-|`)
    }
    
    topPad(amt)
    {
        return this.addLayout(`V:|-(${amt})-[self]`)
    }
    
    bottomPad(amt)
    {
        return this.addLayout(`V:[self]-(${amt})-|`)
    }
    
    hPad(pad) 
    {
        var cpy = this.copy();
        // remove layouts that will conflict
        cpy["gxLayout"] = cpy["gxLayout"].filter(e => e != "H:|-0-[self]-0-|");
        cpy["gxLayout"] = `H:|-${pad}-[self]-${pad}-|`;
        return cpy;
    }
    
    vPad(pad) 
    {
        var cpy = this.copy();
        // remove layouts that will conflict
        cpy["gxLayout"] = cpy["gxLayout"].filter(e => e != "V:|-0-[self]-0-|");
        cpy["gxLayout"] = `V:|-${pad}-[self]-${pad}-|`;
        return cpy;
    }
    
    label(label)
    {
        var cpy = this.copy();
        cpy["gxLabelTemplate"] =  Label().textAlign(1,0.5).fontColor(Colors.primaryContent).fontSize(13); 
        cpy["gxLabelText"] = label;
        cpy["gxViewName"] = cpy["gxViewName"] || ("__label_" + uuidv4());
        return cpy.addLayout("H:[selfLabel]-(5.0)-[self]&alignCenterY");
    }
    
    baseline(offset)
    {
        return this.setValue(offset, "gxBaselineOffset");
    }
	
    layerZ(layer)
    {
        var cpy = this.copy();
        cpy["gxLayerZPosition"] = layer;
        return cpy;
    } 
    
    backgroundFill(color)
    {
        return this.backPainter(Painter().fill(color));
    }
    
    setAXTitle(title)
    {
        var cpy = this.copy();
        cpy["axTitle"] = title;
        cpy["axIsIgnored"] = false;
        return cpy;
    }
    
    toolTip(tooltip, pressedTooltip = tooltip)
    {
        var cpy = this.copy();
        cpy["gxToolTip"] = tooltip;
        cpy["gxPressedToolTip"] = pressedTooltip;
        return cpy;
    }
    
    showKey(key)
    {
        var cpy = this.copy();
        cpy.gxValueKeyPath = cpy.gxValueKeyPath || ""; // Makes sure this view always gets updates
        cpy["gxShowOnKey"] = key;
        return cpy;
    }
    
    hideKey(key)
    {
        var cpy = this.copy();
        cpy.gxValueKeyPath = cpy.gxValueKeyPath || ""; // Makes sure this view always gets updates
        if (key == null)
        {
            cpy.gxHideOnNilValue = true
        }  
        else 
        {
            cpy["gxHideOnKey"] = key;
        }
        return cpy;
    }
    
    enableKey(key)
    {
        var cpy = this.copy();
        cpy["gxValueKeyPath"] = cpy["gxValueKeyPath"] || ""; // Makes sure this view always gets updates
        cpy["gxEnableOnKey"] = key;
        return cpy;
    }
    
    disableKey(key)
    {
        var cpy = this.copy();
        cpy["gxValueKeyPath"] = cpy["gxValueKeyPath"] || ""; // Makes sure this view always gets updates
        cpy["gxDisableOnKey"] = key;
        return cpy;
    }
    
    animateKey(key)
    {
        var cpy = this.copy();
        cpy["gxValueKeyPath"] = cpy["gxValueKeyPath"] || ""; // Makes sure this view always gets updates
        cpy["gxAnimateOnKey"] = key;
        return cpy;
    }
    
    animateVisibility(speedIn, speedOut = speedIn)
    {
        var cpy = this.copy();
        cpy["gxShowSpeedSeconds"] = speedIn;
        cpy["gxHideSpeedSeconds"] = speedOut;
        return cpy;
    }
    
    ignoreAX()
    {
        return this.setValue(true, "axIsIgnored");
    }
    
    setAXFormatter(formatter)
    {
        return this.setValue(formatter, "axFormatter");
    }
    
    setAXHelp(help)
    {
        return this.setValue(help,"axHelp");
    }
    
    setAXHelpPath(keyPath)
    {
        return this.setValue(keyPath,"axHelpKeyPath");
    }
    
    noKey()
    {
        return this.setValue(false, "gxCanBecomeKeyView");
    }

    flipped(isFlipped = true)
    {
        return this.setValue(!isFlipped, "gxViewFlipped")
    }
    
    nextKey(view)
    {
        return this.setValue(view, "gxNextKeyViewName")
    }
    
    wantsLayer(layer = true)
    {
        return this.setValue(layer, "gxWantsLayer")
    }
    
    visible(isVisible)
    {
        if (isVisible)
        {
            return this.copy();
        }
        else
        {
            return View();
        }
    }
    
    background(view)
    {
        var bgView = view.copy();
        var thisView = this.copy(); 
        
        var stack = ZStack([ 
            bgView,
            thisView,
        ]);

        stack.stackLayout.push(`V:[${bgView.gxViewName}]-${thisView.leftAnchor()}&alignLeading`);
        stack.stackLayout.push(`V:[${bgView.gxViewName}]-${thisView.rightAnchor()}&alignTrailing`);
        stack.stackLayout.push(`H:[${bgView.gxViewName}]-${thisView.topAnchor()}&alignTop`);
        stack.stackLayout.push(`H:[${bgView.gxViewName}]-${thisView.bottomAnchor()}&alignBottom`);

        return stack.makeHostView();  
    }
}

class BaseAnimationView extends BaseView 
{
    constructor()
    {
        super();
        this.nsClass = "GXArchivedAnimationView";
    }
    
    vectorPainter(layer, painter) 
    {
        var cpy = this.copy();  
        return cpy.setValue({
            "gxVectorPainter" : painter
        }, layer)
    } 
}

class BaseStackView extends BaseView
{
    constructor()
    {
        super(); 
        this.isStackView = true;
        this.gxViewName = "__Stack__" + uuidv4(); 
        this.stackViews = [];  
        this.stackLayout = [];
        this.alignmentDirection = "V";
         
        this.stackLayout.push(`H:${this.leftAnchor()}-0-[${this.wView().gxViewName}]-0-${this.rightAnchor()}`);
        this.stackLayout.push(`V:${this.topAnchor()}-0-[${this.hView().gxViewName}]-0-${this.bottomAnchor()}`);

        this.allViews =     []; 
    }
    
    lView() { return AnchorView().viewName("_left_" + this.gxViewName) }
    rView() { return AnchorView().viewName("_right_" + this.gxViewName) }
    tView() { return AnchorView().viewName("_top_" + this.gxViewName) }
    bView() { return AnchorView().viewName("_bottom_" + this.gxViewName) }   
    wView() { return AnchorView().viewName("_width_" + this.gxViewName) }
    hView() { return AnchorView().viewName("_height_" + this.gxViewName) }

    viewsForSuperview() 
    { 
        return this.allViews.concat([this.lView(), this.rView(), this.tView(), this.bView(), this.wView(), this.hView()]); 
    }

    layoutForSuperview()
    {
 
        var layout = []; 
    
        layout = layout.concat(this.stackLayout);

        if (this.alignmentString != "")
        {
            layout.push(this.alignmentString)
        }  

        return layout;
    }
     
    align(alignment = "center")
    { 
        var cpy = this.copy();
        cpy.alignmentString = "";
       
        if (alignment)
        {  
            if (alignment == "center")
            {
                if (cpy.alignmentDirection == "H")
                {
                    alignment = "centerY";
                } 
                else 
                {
                    alignment = "centerX";
                }
            }  
            
            alignment = alignment.charAt(0).toUpperCase() + alignment.slice(1);
            
            cpy.alignmentString = "";

            var hasAlignment = false 
           
            for (var i in cpy.stackViews)
            {
                let view = cpy.stackViews[i]; 
                  
                hasAlignment = true; 

                if (alignment == "CenterX")
                {
                    if (i == 0)
                    {
                        cpy.alignmentString = `[${cpy.wView().gxViewName}]-(>=0)-`
                    }
                    cpy.alignmentString += `[${view.wView().gxViewName}]-(>=0)-`;
                }
                else if (alignment == "CenterY")
                {
                    if (i == 0)
                    {
                        cpy.alignmentString = `[${cpy.hView().gxViewName}]-(>=0)-`
                    }
                    cpy.alignmentString += `[${view.hView().gxViewName}]-(>=0)-`;
                }
                else if (alignment == "Top")
                {
                    if (i == 0)
                    { 
                        cpy.alignmentString = `${cpy.topAnchor()}-(>=0)-`
                    }
                    cpy.alignmentString += `${view.topAnchor()}-(>=0)-`;
                }
                else if (alignment == "Bottom")
                {
                    if (i == 0)
                    {
                        cpy.alignmentString = `${cpy.bottomAnchor()}-(>=0)-`
                    }
                    cpy.alignmentString += `${view.bottomAnchor()}-(>=0)-`;
                }
                else if (alignment == "Left" || alignment == "Leading")
                {
                    if (i == 0)
                    {
                        cpy.alignmentString = `${cpy.leftAnchor()}-(>=0)-`
                    }
                    cpy.alignmentString += `${view.leftAnchor()}-(>=0)-`; 
                }   
                else if (alignment == "Right" || alignment == "Trailing")
                {
                    if (i == 0)
                    {
                        cpy.alignmentString = `${cpy.rightAnchor()}-(>=0)-`
                    }
                    cpy.alignmentString += `${view.rightAnchor()}-(>=0)-`;
                } 
                else if (alignment == "Baseline")
                {
                    if (i == 0)
                    {
                        cpy.alignmentString = `${cpy.leftAnchor()}-(>=0)-`
                    }
                    cpy.alignmentString += `[${view.wView().gxViewName}]-(>=0)-`;
                }
            }
            if (hasAlignment)
            { 
                cpy.alignmentString = cpy.alignmentString.slice(0, -7); 
                cpy.alignmentString = `${cpy.alignmentDirection}:` + cpy.alignmentString + `&align${alignment}`;   
            } 
        }    
        return cpy;
    }

    addSubView(view)
    { 
        view.willAddToSuperview(this);

        this.stackLayout = this.stackLayout.concat(view.layoutForSuperview());
        this.allViews    = this.allViews.concat(view.viewsForSuperview());  
       
        this.stackViews.push(view.copy()); 
    }
     
    padding(pad = 10)
    {  
        var cpy = this.copy();
        
        cpy.lView = function() { return AnchorView().viewName("_left_" + cpy.gxViewName).width(pad) };
        cpy.rView = function() { return AnchorView().viewName("_right_" + cpy.gxViewName).width(pad); };
        cpy.tView = function() { return AnchorView().viewName("_top_" + cpy.gxViewName).height(pad); };
        cpy.bView = function() { return AnchorView().viewName("_bottom_" + cpy.gxViewName).height(pad); }; 

       
        return cpy;
    } 
    
    spaceViews(views = [])
    {
        var cpy = this.copy();   

        if (views.length == 0)
        {
            for (var v in cpy.stackViews)
            {
                views.push(cpy.stackViews[v].gxViewName);
            }
        }

        if (views.length == 0)
        {
            return cpy;
        }

        var spacerViews = [];

        for (var v in views)
        {   
            let viewName = views[v];
            for (var s in cpy.stackViews)
            {
                let stackView = cpy.stackViews[s];
                if (stackView.gxViewName == viewName)
                {
                    spacerViews.push(stackView);
                }
            }
        } 

        var firstView = spacerViews[0].wView().gxViewName;

        for (var v in spacerViews)
        { 
            if (v == 0) { continue; }
            cpy.stackLayout.push(`${this.alignmentDirection}:[${spacerViews[v].wView().gxViewName}(==${firstView})]`);
        }
        return cpy;
    }

    makeHostView(superV = false)
    { 
        var cpy = this.copy(); 
  
        cpy.isStackView = false; 
        
        cpy.gxChildViews    = cpy.viewsForSuperview(); 
        cpy.gxLayout        = cpy.layoutForSuperview(); 
       
        if (cpy.hView().gxViewName != cpy.gxViewName)
        {
            cpy.gxLayout.push(`V:|[${cpy.hView().gxViewName}]|`);
            cpy.gxLayout.push(`H:|[${cpy.wView().gxViewName}]|`);
        } 
        
        cpy.lView = function()  { return this.copy() };
        cpy.tView = function()  { return this.copy() };
        cpy.bView = function()  { return this.copy() };
        cpy.rView = function()  { return this.copy() };
        cpy.wView = function()  { return this.copy() };
        cpy.hView = function()  { return this.copy() };
        
        cpy.viewsForSuperview = function() { return [this.copy()] }

        if (superV)
        {
            cpy.gxLayout = cpy.gxLayout.concat([ 
                "H:|[self]|",
                "V:|[self]|", 
             ]); 
        } 

        cpy.allViews = [];
        cpy.stackViews = [];
        cpy.stackLayout = [];   
         
        return cpy;
    }
}


class BaseZStackView extends BaseStackView
{ 
    constructor()
    {
        super(); 
    }

    align(alignment = "center")
    {
        // Handle cases other than "center" via the superclass
        if (alignment != "center")
        {
            if (alignment == "top" || alignment == "bottom" )
            {
                this.alignmentDirection  = "H";
            }
            else 
            {
                this.alignmentDirection = "V";
            } 
            return super.align(alignment);
        }

        // Center all views both vertically and horizonatally
        var cpy = this.copy();
             
        var layoutStringH = `V:[${cpy.wView().gxViewName}]`;
        var layoutStringV = `H:[${cpy.hView().gxViewName}]`;

        for (var i in cpy.stackViews)
        {
            var view = cpy.stackViews[i];
            if (view.isStackView)
            {
                layoutStringH = layoutStringH + `-(<=0)-[${view.wView().gxViewName}]`; 
                layoutStringV = layoutStringV + `-(<=0)-[${view.hView().gxViewName}]`; 
            }
            else 
            {
                layoutStringH = layoutStringH + `-(<=0)-[${view.gxViewName}]`; 
                layoutStringV = layoutStringV + `-(<=0)-[${view.gxViewName}]`; 
            } 
        }

        if (cpy.stackViews.length > 0)
        {
            var layoutStringH = layoutStringH + "&alignCenterX";
            var layoutStringV = layoutStringV + "&alignCenterY";
            cpy.stackLayout.push(layoutStringV);
            cpy.stackLayout.push(layoutStringH);
        }
    
        return cpy;
    }  
}


class BaseLabelView extends BaseView
{
	constructor(text = "")
	{
		super();
        this.nsClass = "GXLabelView"; 
        this.gxViewName = "__Label_" + uuidv4();
		this.gxForePainter = LabelPainter().color(Colors.primaryContent);
		this.gxDefaultValue = text;
		this.axIsIgnored = true;
		this.gxCanBecomeKeyView = false;
	}

	fontSize(size)
	{
		var cpy = this.copy() 
		cpy.gxForePainter = cpy.gxForePainter.fontSize(size);
		return cpy;
	}

	fontColor(color)
	{
		var cpy = this.copy()  
		cpy.gxForePainter = cpy.gxForePainter.color(color);
		return cpy;
	}

	fontWeight(w)
	{
		var cpy = this.copy()
		cpy.gxForePainter = cpy.gxForePainter.weight(w);
		return cpy;
    }
    
    clickValue(val)
    {
        var cpy = this.copy()
		cpy.gxClickValue = val
		return cpy;
    }

	// weight (font weights match apple's naming)
	light() { return this.fontWeight(-0.4) }
	regular() { return this.fontWeight(0) }
	medium() { return this.fontWeight(0.23) }
	bold() { return this.fontWeight(0.4) }
	left() { return this.textAlign(0,this["gxVAlign"]) }
	right() { return this.textAlign(1,this["gxVAlign"]) }
	center() { return this.textAlign(0.5,this["gxVAlign"]) }
	top() { return this.textAlign(this["gxHAlign"],1) }
	bottom() { return this.textAlign(this["gxHAlign"],0) }
    centerY() { return this.textAlign(this["gxHAlign"],0.5) }
    centerX() { return this.textAlign(0.5,this["gxVAlign"]) }
	
	textAlign(x,y)
	{
		var cpy = this.copy()
		cpy.gxForePainter = cpy.gxForePainter.align(x,y);
		return cpy;
	} 
}

class BaseListView extends BaseView
{
    constructor()
    {
        super();
        this.nsClass = "GXListView";
        this.gxValueKeyPath = ""; // Always update 
		this.gxLayoutSubviews = true;
		this.axIsIgnored = true;
		this.gxCollapsible = true;
		this.gxLayoutHorizontally = false; 
        this.gxViewName = "__List_" + uuidv4();  
    }   
 
	topPad(p)
	{
		let cpy = this.copy()
		cpy["listTopHeight"] = p;
		return cpy;
    }
    
	bottomPad(p)
	{
		let cpy = this.copy()
		cpy["listBottomHeight"] = p;
		return cpy;
    }
    
	minimumHeight(p)
	{
		let cpy = this.copy()
		cpy["listMinimumHeight"] = p;
		return cpy;
    }
    
	rowSpacing(spacing)
	{
		let cpy = this.copy()
		cpy["listItemSpacing"] = spacing;
		return cpy;
    } 

    addSubView(view)
    {
        view.willAddToSuperview(this);
        this.gxChildViews = this.gxChildViews.concat(view.viewsForSuperview());
    }
}
    
class BasePainter extends Base
{  

	constructor ()
	{
		super();
		this.gxHAlign = 0.5;
		this.gxVAlign = 0.5; 
	}
	
	fill(fillColor) 
	{
		return this.setValue(fillColor, "gxFillColor");
	}

	radius(radius) 
	{
		return this.setValue(radius, "gxCornerRadius");
	}

	radii(tl,tr,bl,br) 
	{
		return this.setValue(`${tl},${tr},${br},${bl}`, "gxCornerRadii");  
	}

	align(x,y)
	{
		var cpy = this.copy();
		cpy["gxHAlign"] = x;
		cpy["gxVAlign"] = y;
		return cpy;
    }
    
    /**
    * insets
    *
    * @param {number} l - left inset
    * @param {number} r - left inset
    * @param {number} t - top inset
    * @param {number} b - bottom inset
    */
    
	insets(l,r ,t,b) 
	{
		var cpy = this.copy();
		var insets = cpy["gxEdgeInsets"] || `0,0,0,0`; 
		insets = insets.split(",");
		insets = `${Number(insets[0]) + l},${Number(insets[1]) + r},${Number(insets[2]) + t},${Number(insets[3]) + b}`;
		cpy["gxEdgeInsets"] = insets;
		return cpy;
	}

	inset(inset)
	{
		return this.insets(inset,inset,inset,inset);
	}

	offset(x,y) 
	{
		var cpy = this.copy();
		var insets = cpy["gxEdgeInsets"] || "0,0,0,0"; 
		insets = insets.split(",");
		insets[0] -= x * -1;
		insets[1] -= y;
		insets[2] -= x;
		insets[3] -= y * -1;
		cpy["gxEdgeInsets"] = insets.join(",");
		return cpy;
	}

	stroke(width = 0, color)
	{
		var cpy = this.copy();
		cpy["gxStrokeWidth"] = width;
		cpy["gxFrameColor"] = color;
		return cpy;
	}

	addStyle(styleName, addition)
	{ 
		return this.setValue(addition, styleName);
	}
    
    removeStyle(styleName)
    {
        return this.setValue("", styleName);
    }

	styleByMutating(styleName, mutate)
	{ 
		var cpy = this.copy();
		cpy[styleName] = mutate(cpy);  
		return cpy;
	}

	shadow(color,x,y,radius)
	{ 
		return this.setValue(Shadow(color,x,y,radius), "gxShadow");
    }
    
    innerShadow()
    {
        return this.setValue(true, "gxInnerShadow")
    }

	frame(x,y,w,h) 
	{ 
		return this.setValue(`${x},${y},${w},${h}`, "gxFrameRect");
	}

	size(w,h = w) 
	{ 
		return this.setValue(`{${w},${h}}`, "gxDefaultSize");
	} 

	tintColor(tint) 
	{
		var cpy = this.copy()
		cpy["gxTintColor"] = tint;
		return cpy;
	}
    
    pressedAlpha(alpha)
    {
        var cpy = this.copy(); 
        return cpy.styleByMutating("pressed", (style) => { return style.setValue(alpha, "gxAlpha") });
    }
  
	color(c) 
	{
		var cpy = this.copy();
		cpy.gxFontColor = c;
		return cpy;
	}
	
	fontSize(s) 
	{
		var cpy = this.copy();
		cpy.gxFontSize = s;
		return cpy;
	}

	weight(w) 
	{
		var cpy = this.copy();
		cpy.gxFontWeight = w;
		return cpy;
	}

	fontSize(s)
	{
		return this.setValue(s, "gxFontSize");
	}

	// weight (font weights match apple's naming)
	light() { return this.weight(-0.4) }
	regular() { return this.weight(0) }
	medium() { return this.weight(0.23) }
	bold() { return this.weight(0.4) }

	monospacedDigits(mono)
	{
		return this.setValue(mono, "gxMonoSpacedDigits");
	}
	
}

class BaseButtonView extends BaseView 
{
	constructor(title)
	{
		super();
		this.nsClass = "GXButtonView";
		this.gxTitle = title; 
		this.gxLabelText = "";
		this.gxPullsDown = false; 
	}
	
	checkBoxRole()
	{
		var cpy = this.copy();
		cpy["axCheckboxRole"] = true;
		return cpy;
	} 
	
	setTitle(title)
	{
		var cpy = this.copy();
		cpy["gxTitle"] = title;
		return cpy;
    }
    
    titleKeyPath(path)
    {
        var cpy = this.copy();
		cpy["gxTitleKeyPath"] = path;
		return cpy;
    }

    iconKeyPath(path)
    {
        var cpy = this.copy();
		cpy["gxIconKeyPath"] = path;
		return cpy;
    }
	
	pullsDown()
	{
		var cpy = this.copy();
		cpy["gxPullsDown"] = true;
        return cpy;
        
	}
	menuItemsPath(keyPath)
	{
		var cpy = this.copy();
		cpy["gxMenuItemsKeyPath"] = keyPath;
		return cpy;
	}
	drawArrows(imageName = "popup.arrows", color = Colors.primaryContent)
	{
		var cpy = this.copy();
		cpy = cpy.extraPainter(ImagePainter(imageName).align(1,0.5).offset(-10,0).tintColor(color));
		cpy["gxForePainter"] = cpy["gxForePainter"].insets(0,0,20,0);
		return cpy; // Inset right edge of title to account for arrows
	}
}


class BaseColor extends Base 
{
    constructor(h = 100, s = 100, b = 100, a = 100)
    {
        super();
        this.nsClass = "NSColor";
        this.gxHue = h;
        this.gxSaturation = s;
        this.gxBrightness = b;
        this.gxAlpha = a;
    }

    withAlpha(val) 
    {
        var c = this.copy()
        c.gxAlpha *= val;
        return c;
    }  

    brightness(val)
    {
        var c = this.copy() 
        c.gxBrightness *= val;
        return c;
    }

    saturation(val)
    {
        var c = this.copy() 
        c.gxSaturation *= val;
        return c;
    }

    addStyle(styleName, newStyle)
    {
        var c = this.copy();         
        c[styleName] = newStyle.copy(); 
        return c;
    }
    
    removeStyle(styleName)
    {
        var c = this.copy();
        delete c[styleName];
        return c;
    }

    showPressed()
    {
        return this.addStyle("pressed", this.withAlpha(0.7))
    }
    
    showDisabled(color = Colors.paleGray)
    {
        return this.addStyle("disabled", color)
    }
}

class BaseSystemColor extends BaseColor
{
    constructor(systemColor, name)
    {
        super(100,100,100,100);
        this.nsClass = "GXAccentColor";
        this.gxColorModifierKey = name;
        this.gxColorName = systemColor; 
    } 
}

class BaseThemedColor extends BaseColor
{
    constructor(theme1Name, theme1Color, theme2Name = theme1Name, theme2Color = theme1Color)
    {
        super(0,0,0,100)    

        this.theme1Name = theme1Name;
        this.theme2Name = theme2Name; 

        this[theme1Name] = theme1Color;
        this[theme2Name] = theme2Color; 
    }

    inverted() 
    {
        return new BaseThemedColor(this.theme1Name, this[this.theme2Name], this.theme2Name, this[this.theme1Name]);
    }

	withAlpha(val) 
	{       
		return new BaseThemedColor(this.theme1Name, this[this.theme1Name].withAlpha(val), this.theme2Name, this[this.theme2Name].withAlpha(val));
    }
    
	brightness(val) 
	{
        return new BaseThemedColor(this.theme1Name, this[this.theme1Name].brightness(val), this.theme2Name, this[this.theme2Name].brightness(val));
    }
    
	saturation(val) 
	{
		return new BaseThemedColor(this.theme1Name, this[this.theme1Name].saturation(val), this.theme2Name, this[this.theme2Name].saturation(val));
    } 

    pressedColor(style1, style2 = style1)
    {
        return this.addStyle("pressed", style1, style2);	
    } 
    
	showPressed() 
	{ 
		return this.pressedColor(this[this.theme1Name].brightness(0.75),this[this.theme2Name].brightness(1.2));
    }
    
	disabledColor(style1, style2) 
	{
		return this.addStyle("disabled", style1, style2 | style1);	
    }
     
	addStyle(newStyle, style1, style2 = style1)
	{    
        var cpy = this.copy();   

        cpy[newStyle] = 
        {
            [cpy.theme1Name] :  style1[cpy.theme1Name]  ? style1[cpy.theme1Name].copy()  : style1.copy(),
            [cpy.theme2Name] :  style2[cpy.theme2Name]  ? style2[cpy.theme2Name].copy()  : style2.copy(),  
        }    
        return cpy;  
    }
    
    removeStyle(styleName)
    {
        var cpy = this.copy();
        if (cpy[styleName] != null)
        {
            [cpy.theme1Name] = [cpy.theme1Name].removeStyle(styleName)
            [cpy.theme2Name] = [cpy.theme2Name].removeStyle(styleName)
        }
        delete cpy[styleName];
        return cpy;
    }
}
