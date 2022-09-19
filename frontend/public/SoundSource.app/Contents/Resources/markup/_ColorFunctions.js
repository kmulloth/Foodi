 
// Color constants that need to be used in multiple places below


/**
 * Menu Item Constructor
 *
 * @param {number} r - red component
 * @param {number} g - green component
 * @param {number} b - blue component
 */

function rgb2hsb(r,g,b) 
{
	var minV = Math.min(r, g, b);
	var maxV = Math.max(r, g, b);
	let delta = maxV - minV;
	var hue = 0;
	if (delta != 0) 
	{
		if (r == maxV) 
		{
			hue = (g - b) / delta;
		}
		else if (g == maxV)
		{
			hue = 2 + (b - r) / delta;
		}
		else 
		{
			hue = 4 + (r - g) / delta;
		}
		hue *= 60;
		if (hue < 0)
		{
			hue += 360;
		}
	}
	var saturation = maxV == 0 ? 0 : (delta / maxV);
	var brightness = maxV;
	return [hue,saturation,brightness];
}   

/**
 * colorHSB
 *
 * @param {number} h - hue component
 * @param {number} s - saturation component
 * @param {number} b - brightness component
 * @param {number} a - alpha component
 */

function colorHSB(h,s,b,a)
{   
	return new BaseColor(h,s,b * 100,a);
}

/**
 * colorRGBA
 *
 * @param {number} r - red component
 * @param {number} g - green component
 * @param {number} b - blue component
 * @param {number} a - alpha component
 */


function colorRGBA(r, g, b, a)
{  
	var hsb = rgb2hsb(r/255,g/255, b/255);     
	return colorHSB(hsb[0], 100 * hsb[1], hsb[2], a);
}

/**
 * ThemedColor
 *
 * @param {string} theme1Name - name of first theme
 * @param {object} theme1Color - color1 first color
 * @param {string} theme2Name - blue component
 * @param {object} theme2Color - color2 second color
 */

function ThemedColor(theme1Name, theme1Color, theme2Name = theme1Name, theme2Color = theme1Color)
{
	return new BaseThemedColor(theme1Name,theme1Color,theme2Name,theme2Color)
}

/**
 * MainThemeColor
 *
 * @param {object} lightColor - color for light theme
 * @param {object} darkColor - color for dark theme
 */


function MainThemeColor(lightColor, darkColor = lightColor)
{
	return ThemedColor("lightMode", lightColor, "darkMode", darkColor) 
} 

function NamedColor(systemColor, name) 
{  
	return new BaseSystemColor(systemColor, name);
}

/**
 * StatusBarColor
 *
 * @param {object} lightColor - color for system light mode
 * @param {object} darkColor - color for system dark mode
 */

function StatusBarColor(lightColor, darkColor = lightColor)
{
    return ThemedColor("systemLight", lightColor, "systemDark", darkColor )
}

/**
 * ThemedPainter
 *
 * @param {string} theme1Name - name of first theme
 * @param {object} theme1Painter - painter for first theme
 * @param {string} theme2Name - name of second theme
 * @param {object} theme2Color - painter for second theme
 */

function ThemedPainter(theme1Name, theme1Painter, theme2Name = theme1Name, theme2Painter = theme1Painter)
{
    return new BaseThemedPainter(theme1Name,theme1Painter,theme2Name,theme2Painter)
}
