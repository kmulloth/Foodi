var Colors = {}; 

// Window colors
//
Colors.background 			= MainThemeColor(colorRGBA(255, 255, 255, 100.0), colorRGBA(51, 51, 51, 100.0));
Colors.desat				= Colors.background.withAlpha(0.3);

// Primary Colors
Colors.black 				= colorRGBA(51, 51, 51, 100.0);
Colors.warning  			= colorRGBA(255, 73, 73, 100.0);
Colors.white 				= colorRGBA(255, 255, 255, 100.0); 
Colors.invisible 			= colorRGBA(0.0, 0.0, 0.0, 0.0);  
Colors.invisibleThemed      = MainThemeColor(Colors.invisible, Colors.invisible)
Colors.darkGray 			= colorRGBA( 200, 200, 200, 100.0);
Colors.yellow    			= colorRGBA( 240, 214, 33, 100.0); 

Colors.text                 = MainThemeColor(Colors.black,Colors.white);

// Main Colors
Colors.key 				    = MainThemeColor(NamedColor("controlAccentColor", "key"));
Colors.selection 			= MainThemeColor(NamedColor("controlAccentColor", "selection"));

Colors.paleGray             = MainThemeColor(colorRGBA(148, 148, 148, 25.0), colorRGBA(148, 148, 148, 25.0));
Colors.strongGray           = MainThemeColor(colorRGBA(51, 51, 51, 50.0), colorRGBA(202, 202, 202, 50.0));

Colors.paleGrayMixed        = MainThemeColor(colorRGBA(228, 228, 228, 100), colorRGBA(75, 75, 75, 100.0)); // Not to be used where selection states matter 
 
Colors.controlFill          = MainThemeColor(Colors.background, Colors.paleGray); 
Colors.primaryContent 		= MainThemeColor(Colors.black.showDisabled(Colors.black.withAlpha(0.5)), Colors.white.showDisabled(Colors.white.withAlpha(0.5)));
Colors.trialButtonOrange 	= colorRGBA(255,107,73,100);  
Colors.faveStar             = Colors.paleGray.addStyle("on", Colors.key.showPressed()); 
Colors.sourceBackground     = Colors.background.addStyle("selected", Colors.selection);   

Colors.menuBarBaseColor     = StatusBarColor(colorRGBA(0,0,0,70), Colors.white).addStyle("highlighted", Colors.white);
Colors.menuBarIcon          = Colors.menuBarBaseColor.addStyle("muted", Colors.menuBarBaseColor.withAlpha(0.5)); 
Colors.menuBarFill          = Colors.menuBarBaseColor.addStyle("muted", Colors.menuBarBaseColor.withAlpha(0.2));  
Colors.menuBarTrial         = StatusBarColor(Colors.yellow, Colors.yellow).addStyle("highlighted", Colors.white);

Colors.contrast             = Colors.invisible.addStyle("increasedContrast", Colors.primaryContent.withAlpha(0.5))
Colors.paleGrayContrast     = Colors.paleGray.addStyle("increasedContrast", Colors.contrast)

Colors.sliderFocus = 
{
    "lightMode" : colorRGBA(174, 174, 174, 100.0),
    "darkMode" :  Colors.invisible,
    "focused" : {
        "lightMode" : Colors.key.lightMode,
        "darkMode" : Colors.key.darkMode,
    } 
}
 
markup.push({
    "lightModeColors" : 
    {  
        "selection" : 
        { 
            gxAlpha: 25,
        },
    },
    "darkModeColors" : 
    {  
        "selection" : 
        { 
            gxAlpha: 25,
        },
    },   
});
