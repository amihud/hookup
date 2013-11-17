Titanium.UI.setBackgroundColor('#8C0221');
//Titanium.UI.setBackgroundImage('images/bg_main.jpg');


Ti.App.creq_id = -1234;
Ti.App.ccli_id = -1234;
Ti.App.ccli_name = -1234;

Ti.App.pkg = -1234;
Ti.App.cusr_id= -1234;
Ti.App.cusr_email= -1234;


var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;
Ti.App.SCREEN_WIDTH = (pWidth > pHeight) ? pHeight : pWidth;
Ti.App.SCREEN_HEIGHT = (pWidth > pHeight) ? pWidth : pHeight;
Ti.App.TITLEVIEW = 50;

//-- Create our main window that will contain all our sub windows


var main = Ti.UI.createWindow({
	url:'main_windows/main.js',
	height:Ti.Platform.displayCaps.platformHeight,
	width:Ti.Platform.displayCaps.platformWidth,
	fullscreen:true,
	navBarHidden:true
});

main.open();   
