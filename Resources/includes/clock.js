 Ti.App.time = Ti.UI.createLabel({
	text:'',
	font:{
		fontFamily:'Verdana',
		fontWeight:'bold',
		fontSize:14
	},
	color:'#fff',
	shadowColor:'#333',
	shadowOffset:{x:1,y:1},
	textAlign:'left',
	//width:Ti.Platform.displayCaps.platformWidth,
	height:20,
	top:Ti.App.SCREEN_HEIGHT * .05,
	left:Ti.App.SCREEN_WIDTH * .75
});


function getFormattedTime()
{
	var amPM 		= '';
	var d 			= new Date();
	var currentHour = d.getHours();
	
	if (currentHour < 12)
	{
		amPM = 'AM';
	}
	else
	{
		amPM = 'PM';
	}
	
	if (currentHour == 0)
	{
		currentHour = 12;
	}
	
	if (currentHour > 12)
	{
		currentHour = currentHour - 12;
	}
	
	var currentMinute 	= d.getMinutes();
	currentMinute 		= currentMinute + '';
	
	if (currentMinute.length == 1)
	{
		currentMinute = '0' + currentMinute;
	}
	Ti.App.time.text = currentHour + ':' + currentMinute + ' ' + amPM   ;
}
var clockInterval = setInterval(getFormattedTime,5000);
getFormattedTime();
//win.add(time);