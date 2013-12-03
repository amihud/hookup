var win = Ti.UI.currentWindow;
var orderReq = Titanium.Network.createHTTPClient();

// Taking Screen Width
var win = Ti.UI.currentWindow;
var orderReq = Titanium.Network.createHTTPClient();
var calAddEvent = false;

// Taking Screen Width
var screenWidth = 322;
var needToChangeSize = false;

var screenWidthActual = Ti.Platform.displayCaps.platformWidth;

if (Ti.Platform.osname === 'android') {
	if (screenWidthActual >= 641) {
		screenWidth = screenWidthActual;
		needToChangeSize = true;
	}
}

var CustomData = [];

var obj = [];
var iLenInternet = 0;
var cli_id = Ti.App.ccli_id;
var usr_id = Ti.App.cusr_id;

// Main Window of the Month View.
//calWindow();
//function calWindow() {
// Button at the buttom side
/*
monthName = function(e) {
switch(e) {
case 0:
e = 'January';
break;
case 1:
e = 'February';
break;
case 2:
e = 'March';
break;
case 3:
e = 'April';
break;
case 4:
e = 'May';
break;
case 5:
e = 'June';
break;
case 6:
e = 'July';
break;
case 7:
e = 'August';
break;
case 8:
e = 'September';
break;
case 9:
e = 'October';
break;
case 10:
e = 'November';
break;
case 11:
e = 'December';
break;
};
return e;
};

win.modal = true;
*/
//}

Ti.App.addEventListener("newCalTime", function(e) {
	startEventDay = e.startEventDay;
	startEventTime = e.startEventTime;
	endEventDay = e.endEventDay;
	endEventTime = e.endEventTime;

	var longitude = 31.31;
	var latitude = 34.34;

	if (Ti.Geolocation.locationServicesEnabled) {
		Ti.Geolocation.purpose = 'Get current location';
		Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_NEAREST_TEN_METERS;
		Ti.Geolocation.getCurrentPosition(function(e) {
			if (e.error) {
				Ti.API.error('Error:' + e.error);
			} else {
				Ti.API.info(e.coords);
				longitude = e.coords.longitude;
				latitude = e.coords.latitude;
			}

			// objTitle.text=  win.business +' ' + longitude + ' ' + latitude;
			//mordSend(ordInfo, objId, latitude, longitude);
			//alert(latitude + ' ' + longitude);
			mordSend(win.obj_id, latitude, longitude, startEventDay, startEventTime, endEventDay, endEventTime);

		});
	} else {
		Titanium.UI.createAlertDialog({
			title : 'Location Service',
			message : 'Please turn on your location services.'
		}).show();
	}

});
 
var buttonTime = Ti.UI.createButton({
	backgroundImage : '../images/button_ok.png',
	bottom : '50dp',
	right : '45dp',
	width : '40',
	height : '40'
});

var timeButtonStart = Ti.UI.createButton({
	backgroundImage : '../images/clock.png',
	width : 33,
	height : 33,
	text : 'start time',
	font : {
		fontFamily : 'Verdana',
		fontWeight : 'bold',
		fontSize : 16
	},
	color : '#fff',
	shadowColor : '#333',
	shadowOffset : {
		x : 1,
		y : 1
	},
	textAlign : 'left',
	left : '50dp',
	top : '50dp'
});

var timeButtonEnd = Ti.UI.createButton({
	backgroundImage : '../images/history.png',
	width : 33,
	height : 33,
	text : 'end time',
	font : {
		fontFamily : 'Verdana',
		fontWeight : 'bold',
		fontSize : 24
	},
	color : '#fff',
	shadowColor : '#333',
	shadowOffset : {
		x : 1,
		y : 1
	},
	textAlign : 'left',
	left : '50dp',
	top : '90dp'
});

var timeLabelStart = Ti.UI.createLabel({
	text : 'start time',
	font : {
		fontFamily : 'Verdana',
		fontWeight : 'bold',
		fontSize : 16
	},
	color : 'white',
	shadowColor : '#333',
	shadowOffset : {
		x : 1,
		y : 1
	},
	textAlign : 'right',
	width : 'auto',
	left : '150dp',
	top : '50dp'
});

var timeLabelEnd = Ti.UI.createLabel({
	text : 'end time',
	font : {
		fontFamily : 'Verdana',
		fontWeight : 'bold',
		fontSize : 16
	},
	color : 'white',
	shadowColor : '#333',
	shadowOffset : {
		x : 1,
		y : 1
	},
	textAlign : 'right',
	width : 'auto',
	left : '150dp',
	top : '90dp'
});

///////////

///////////

var now = new Date();
var pickerIphone = Ti.UI.createPicker({

	value : now,
	exitOnClose : true,
	format24 : true,
	width : 'auto',
	left : '1dp',
	top : '150dp',
	type : Ti.UI.PICKER_TYPE_DATE_AND_TIME
});

var pickerAndroidTime = Ti.UI.createPicker({

	value : now,
	exitOnClose : true,
	format24 : true,
	width : 150,
	left : 180,
	top : 150,
	type : Ti.UI.PICKER_TYPE_TIME
});

var pickerAndroidDate = Ti.UI.createPicker({

	value : now,
	exitOnClose : true,
	format24 : true,
	width : 150,
	left : 1,
	top : 150,
	type : Ti.UI.PICKER_TYPE_DATE
});

var bStart = false;
var bEnd = false;

timeButtonStart.addEventListener('click', function(e) {
	if (bStart == true) {
		win.remove(pickerIphone);
		win.pickerIphone = null;
		bStart = false;
		timeButtonEnd.enabled = true;
		buttonTime.enabled = true;
	} else {
		timeButtonEnd.enabled = false;
		buttonTime.enabled = false;
		bStart = true;
		win.add(pickerIphone);

	}

});

timeButtonEnd.addEventListener('click', function(e) {
	if (bEnd == true) {
		win.remove(pickerIphone);
		win.pickerIphone = null;
		timeButtonStart.enabled = true;
		bEnd = false;
		buttonTime.enabled = true;
	} else {
		timeButtonStart.enabled = false;
		buttonTime.enabled = false;
		bEnd = true;
		win.add(pickerIphone);

	}
});
///////////

win.add(buttonTime);
win.add(timeButtonStart);
win.add(timeButtonEnd);
win.add(timeLabelStart);
win.add(timeLabelEnd);


buttonTime.enabled = false;

var startEventDay = '';
var endEventDay = '';

var startEventTime = '';
var endEventTime = '';

pickerIphone.addEventListener('change', function(e) {

	//Ti.API.info("User selected date: " + e.value.toLocaleString());
	var dv = e.value;

	day = dv.getDate() ;
	month = dv.getMonth() + 1 ;
	year = dv.getFullYear();

	//dateVal = day + '-' + month + '-' + year;
	
	dateVal = year + '-' + month + '-' + day;

	var currentHour = dv.getHours();

	var currentMinute = dv.getMinutes();

	//console.log(currentHour + ';' + currentMinute);
	if (bStart == true && bEnd == false) {
		//startEventTime = currentHour + ':' + currentMinute;
		//timeLabelStart.text = dateVal + ' ' + startEventTime;

		startEventTime = currentHour + ':' + currentMinute;
		startEventDay = dateVal;
		timeLabelStart.text = startEventDay + ' ' + startEventTime;
	} else if (bStart == false && bEnd == true) {
		endEventTime = currentHour + ':' + currentMinute;
		endEventDay = dateVal;
		timeLabelEnd.text = endEventDay + ' ' + endEventTime;
	}
});

buttonTime.addEventListener('click', function(e) {
	if (endEventTime != '' && startEventTime != '') {
		console.log(endEventTime);
		console.log(startEventTime);
		win.remove(pickerIphone);
		//win.remove(buttonTime);
		//win.remove(timeViewDlg);
		Ti.App.fireEvent('newCalTime', {
			startEventDay : startEventDay,
			startEventTime : startEventTime,
			endEventDay : endEventDay,
			endEventTime : endEventTime
		});

	} else {
		msg = Ti.Locale.getString('Selectstartendtime', 'i18nMissingMsg');
		alert(msg);
	}

});

pickerAndroidDate.addEventListener('change', function(e) {

	//Ti.API.info("User selected date: " + e.value.toLocaleString());

	var dv = e.value;
	var currentHour = dv.getHours();

	var currentMinute = dv.getMinutes();

	//console.log(currentHour + ';' + currentMinute);
	timeChange1 = currentHour + ':' + currentMinute;
});

function mordSend(obj_id, lat, longt, startEventDay, startEventTime, endEventDay, endEventTime) {
    
	var setit = -2;
	var orderit = 0;

	var ordInfo = ['event'];

	var objId = [];
	objId.push(obj_id);
	//-- Disable fields and buttons before making are http request

	//-- URL to submit_order.php
	//orderReq.open('POST','http://localhost:889/submit_order.php');
	orderReq.open('POST', 'http://amihud.com/ec/submit_order_event.php');

	if (Ti.App.creq_id == -1234)
		Ti.App.pkg = 1;
	else
		Ti.App.pkg += 1;

	if (Ti.Platform.osname == 'android') {
		var params = {
			startEventDay : startEventDay,
			startEventTime : startEventTime,
			endEventDay : endEventDay,
			endEventTime : endEventTime,
			obj : ordInfo,
			obj_id : '{' + objId.toString() + '}',
			req_id : Ti.App.creq_id,
			cli_id : Ti.App.ccli_id,
			usr_id : Ti.App.cusr_id,
			lat : lat,
			longt : longt,
			ver : Titanium.App.getVersion(),

			type : win.business,
			pkg : Ti.App.pkg,
			device : Ti.Platform.osname,
			setit : setit,
			orderit : orderit
		};
		orderReq.send(params);
	} else {

		var params = {
			startEventDay : startEventDay,
			startEventTime : startEventTime,
			endEventDay : endEventDay,
			endEventTime : endEventTime,
			obj : ordInfo,
			obj_id : objId,
			req_id : Ti.App.creq_id,
			cli_id : Ti.App.ccli_id,
			usr_id : Ti.App.cusr_id,
			lat : lat,
			longt : longt,
			ver : Titanium.App.getVersion(),

			type : win.business,
			pkg : Ti.App.pkg,
			device : Ti.Platform.osname,
			setit : setit,
			orderit : orderit
		};
		orderReq.send(params);
	}
	if (Ti.Platform.osname == 'android') {
		//orderReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		//orderReq.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	}

}

//-- onLoad method for our http request
orderReq.onload = function() {
	var response = [];
	var json = this.responseText;

	if (json) {
		try {
			response = JSON.parse(json);

			// response = JSON.parse(json);

			//-- Mail was sent
			if (response[0].mail != 'false') {

				Ti.App.creq_id = response[0].mail;
				//Ti.API.info(response[0].sql);

				var alertDialog = Titanium.UI.createAlertDialog({
					title : response[0].mail,
					message : Ti.Locale.getString('RequestSend', 'i18nMissingMsg'),
					buttonNames : ['OK']
				});
				alertDialog.show();
				alertDialog.addEventListener('click', function(e) {
					Ti.App.fireEvent('resetApp');
				});
			} else {
				//-- Mail failed

				alert(response.usr_email);
				details.enabled = true;

			}
		} catch(response) {
			var alertDialog = Titanium.UI.createAlertDialog({
				title : Ti.Locale.getString('InternetError', 'i18nMissingMsg'),
				message : response,
				buttonNames : [Ti.Locale.getString('OK', 'i18nMissingMsg')]
			});
			alertDialog.show();
			alertDialog.addEventListener('click', function(e) {
				Ti.App.fireEvent('resetApp');
			});

		}
	}

};
