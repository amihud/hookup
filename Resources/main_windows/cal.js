// Taking Screen Width
var win = Ti.UI.currentWindow;

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
calWindow();
function calWindow() {
	// Button at the buttom side
	var backButton = Ti.UI.createButton({
		bottom : '20dp',
		height : '40dp',
		width : '200dp'
	});

	// Previous Button - Tool Bar
	var prevMonth = Ti.UI.createButton({
		left : '15dp',
		width : 'auto',
		height : 'auto',
		title : '<'
	});

	// Next Button - Tool Bar
	var nextMonth = Ti.UI.createButton({
		right : '15dp',
		width : 'auto',
		height : 'auto',
		title : '>'
	});

	var pExit = Ti.UI.createButton({
		backgroundImage : '../images/button_previous_01.png',
		left : '45dp',
		width : '40',
		height : '40'
	});
	// Month Title - Tool Bar
	var monthTitle = Ti.UI.createLabel({
		width : '200dp',
		height : '24dp',
		textAlign : 'center',
		color : '#3a4756',
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		}
	});

	var topBar = Ti.UI.createView({
		top : '20dp',
		width : '322dp',
		height : '45dp',
		backgroundColor : '#FFFFD800',
		layout : 'vertical'
	});


	// Tool Bar
	var toolBar = Ti.UI.createView({
		top : '60dp',
		width : '322dp',
		height : '110dp',
		backgroundColor : '#FFFFD800',
		layout : 'vertical'
	});

	// Tool Bar - View which contain Title Prev. & Next Button
	var toolBarTitle = Ti.UI.createView({
		top : '3dp',
		width : '322dp',
		height : '24dp'
	});

	var topBarTitle = Ti.UI.createView({
		top : '2dp',
		width : '322dp',
		height : '45dp'
	});

	toolBarTitle.add(prevMonth);
	toolBarTitle.add(monthTitle);
	toolBarTitle.add(nextMonth);

	topBarTitle.add(pExit);

	// Tool Bar - Day's
	var toolBarDays = Ti.UI.createView({
		top : '2dp',
		width : '322dp',
		height : '22dp',
		layout : 'horizontal',
		left : '-1dp'
	});

	toolBarDays.sunday = Ti.UI.createLabel({
		left : '0dp',
		height : '20dp',
		text : 'Sun',
		width : '46dp',
		textAlign : 'center',
		font : {
			fontSize : 12,
			fontWeight : 'bold'
		},
		color : '#3a4756'
	});

	toolBarDays.monday = Ti.UI.createLabel({
		left : '0dp',
		height : '20dp',
		text : 'Mon',
		width : '46dp',
		textAlign : 'center',
		font : {
			fontSize : 12,
			fontWeight : 'bold'
		},
		color : '#3a4756'
	});

	toolBarDays.tuesday = Ti.UI.createLabel({
		left : '0dp',
		height : '20dp',
		text : 'Tue',
		width : '46dp',
		textAlign : 'center',
		font : {
			fontSize : 12,
			fontWeight : 'bold'
		},
		color : '#3a4756'
	});

	toolBarDays.wednesday = Ti.UI.createLabel({
		left : '0dp',
		height : '20dp',
		text : 'Wed',
		width : '46dp',
		textAlign : 'center',
		font : {
			fontSize : 12,
			fontWeight : 'bold'
		},
		color : '#3a4756'
	});

	toolBarDays.thursday = Ti.UI.createLabel({
		left : '0dp',
		height : '20dp',
		text : 'Thu',
		width : '46dp',
		textAlign : 'center',
		font : {
			fontSize : 12,
			fontWeight : 'bold'
		},
		color : '#3a4756'
	});

	toolBarDays.friday = Ti.UI.createLabel({
		left : '0dp',
		height : '20dp',
		text : 'Fri',
		width : '46dp',
		textAlign : 'center',
		font : {
			fontSize : 12,
			fontWeight : 'bold'
		},
		color : '#3a4756'
	});

	toolBarDays.saturday = Ti.UI.createLabel({
		left : '0dp',
		height : '20dp',
		text : 'Sat',
		width : '46dp',
		textAlign : 'center',
		font : {
			fontSize : 12,
			fontWeight : 'bold'
		},
		color : '#3a4756'
	});

	toolBarDays.add(toolBarDays.sunday);
	toolBarDays.add(toolBarDays.monday);
	toolBarDays.add(toolBarDays.tuesday);
	toolBarDays.add(toolBarDays.wednesday);
	toolBarDays.add(toolBarDays.thursday);
	toolBarDays.add(toolBarDays.friday);
	toolBarDays.add(toolBarDays.saturday);

	// Adding Tool Bar Title View & Tool Bar Days View
	toolBar.add(toolBarTitle);
	toolBar.add(toolBarDays);

	topBar.add(topBarTitle);

	// Function which create day view template
	dayView = function(e) {
		var label = Ti.UI.createLabel({
			current : e.current,
			width : '46dp',
			height : '44dp',
			backgroundColor : '#FFDCDCDF',
			text : e.day,
			textAlign : 'center',
			color : e.color,
			font : {
				fontSize : 20,
				fontWeight : 'bold'
			}
		});
		return label;
	};

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

	// Calendar Main Function
	var calView = function(a, b, c) {
		var nameOfMonth = monthName(b);

		//create main calendar view
		var mainView = Ti.UI.createView({
			layout : 'horizontal',
			width : '322dp',
			height : 'auto',
			top : toolBar.height
		});

		//set the time
		var daysInMonth = 32 - new Date(a, b, 32).getDate();
		var dayOfMonth = new Date(a, b, c).getDate();
		var dayOfWeek = new Date(a, b, 1).getDay();
		var daysInLastMonth = 32 - new Date(a, b - 1, 32).getDate();
		var daysInNextMonth = (new Date(a, b, daysInMonth).getDay()) - 6;

		//set initial day number
		var dayNumber = daysInLastMonth - dayOfWeek + 1;

		//get last month's days
		for ( i = 0; i < dayOfWeek; i++) {

			mainView.add(new dayView({
				day : dayNumber,
				color : '#8e959f',
				current : 'no',
				dayOfMonth : ''
			}));
			dayNumber++;
		};

		// reset day number for current month
		dayNumber = 1;

		//get this month's days
		for ( i = 0; i < daysInMonth; i++) {
			var colorit = '#3a4756';
			for ( ii = 0; ii < obj.length; ii++)
				if (obj[ii].day == dayNumber) {
					colorit = 'red';
					//'#3a4756'
					//console.log(obj[ii]);
					break;
				}
			var newDay = new dayView({
				day : dayNumber,
				color : colorit,
				current : 'yes',
				dayOfMonth : dayOfMonth
			});
			mainView.add(newDay);
			if (newDay.text == dayOfMonth) {
				newDay.color = colorit;
				// newDay.backgroundImage='../libraries/calendar/pngs/monthdaytiletoday_selected.png';
				newDay.backgroundColor = 'green';
				//#FFFFF000
				var oldDay = newDay;

			}

			dayNumber++;
		};
		dayNumber = 1;

		/////////
		// change color to red if there is event at this day
		//

		/////////

		//get remaining month's days

		
		for ( i = 0; i > daysInNextMonth; i--) {
		mainView.add(new dayView({
		day : dayNumber,
		color : '#8e959f',
		current : 'no',
		dayOfMonth : ''
		}));
		dayNumber++;
		};

		
		// this is the new "clicker" function, although it doesn't have a name anymore, it just is.
		mainView.addEventListener('click', function(e) {
			if (e.source.current == 'yes') {

				// reset last day selected
				var colorit = '#3a4756';
				for ( ii = 0; ii < obj.length; ii++)
					if (obj[ii].day == oldDay.text) {
						colorit = 'red';
						//'#3a4756'
						break;
					}

				if (oldDay.text == dayOfMonth) {

					oldDay.color = colorit;
					// oldDay.backgroundImage='../libraries/calendar/pngs/monthdaytiletoday.png';
					oldDay.backgroundColor = '#FFFFF000';
				} else {
					oldDay.color = colorit;
					// oldDay.backgroundImage='../libraries/calendar/pngs/monthdaytile-Decoded.png';
					oldDay.backgroundColor = '#FFDCDCDF';
				}
				oldDay.backgroundPaddingLeft = '0dp';
				oldDay.backgroundPaddingBottom = '0dp';

				// set window title with day selected, for testing purposes only
				//34567
				backButton.title = monthName(b) + ' ' + e.source.text + ', ' + a;

				// set characteristic of the day selected
				if (e.source.text == dayOfMonth) {
					// e.source.backgroundImage='../libraries/calendar/pngs/monthdaytiletoday_selected.png';
					e.source.backgroundColor = '#FFFF00FF';
				} else {
					// e.source.backgroundImage='../libraries/calendar/pngs/monthdaytile_selected.png';
					e.source.backgroundColor = 'blue';
					//#FFFF0000
				}
				e.source.backgroundPaddingLeft = '1dp';
				e.source.backgroundPaddingBottom = '1dp';
				e.source.color = 'white';
				//this day becomes old :(
				oldDay = e.source;
				Ti.App.fireEvent('clickDAY', {
					day : e.source.text
				});
			}
		});

		return mainView;
	};

	// what's today's date?
	var setDate = new Date();
	a = setDate.getFullYear();
	b = setDate.getMonth();
	c = setDate.getDate();

	// add the three calendar views to the window for changing calendars with animation later

	var thisCalendarView = null;
	var prevCalendarView = null;
	var nextCalendarView = null;

	getCliOrder(a, b + 1, c, 'CURCAL');

	Ti.App.addEventListener("CURCAL", function(e) {
		thisCalendarView = calView(a, b, c);
		if (needToChangeSize == false) {
			thisCalendarView.left = '-1dp';
		}
		win.add(thisCalendarView);
		/*
		 if (b == 0) {
		 getCliOrder(a - 1, 12, c, 'PREVCAL');
		 } else {
		 getCliOrder(a, b, c, 'PREVCAL');
		 }
		 */

	});

	Ti.App.addEventListener("PREVCAL", function(e) {
		if (b == 0) {

			prevCalendarView = calView(a - 1, 11, c);
		} else {

			prevCalendarView = calView(a, b - 1, c);
		}

		prevCalendarView.left = (screenWidth * -1) + 'dp';
		if (needToChangeSize == false) {
			thisCalendarView.left = '-1dp';
		}
		win.add(prevCalendarView);
		if (b == 0) {
			getCliOrder(a + 1, 1, c, 'NEXTCAL');
		} else {
			getCliOrder(a, b + 2, c, 'NEXTCAL');
		}

	});

	Ti.App.addEventListener("NEXTCAL", function(e) {
		if (b == 0) {
			nextCalendarView = calView(a + 1, 0, c);
		} else {
			nextCalendarView = calView(a, b + 1, c);
		}

		nextCalendarView.left = screenWidth + 'dp';
		win.add(nextCalendarView);
	});

	monthTitle.text = monthName(b) + ' ' + a;

	backButton.title = monthName(b) + ' ' + c + ', ' + a;

	// add everything to the window
	win.add(toolBar);
	win.add(topBar);
	//win.add(thisCalendarView);
	//win.add(nextCalendarView);
	//win.add(prevCalendarView);
	//win.add(backButton);

	// yeah, open the window, why not?

	var slideNext = Titanium.UI.createAnimation({
		// left : '-322',
		duration : 500
	});

	slideNext.left = (screenWidth * -1);

	var slideReset = Titanium.UI.createAnimation({
		// left : '-1',
		duration : 500
	});

	if (needToChangeSize == false) {
		slideReset.left = '-1';
	} else {
		slideReset.left = ((screenWidth - 644) / 2);
	}

	var slidePrev = Titanium.UI.createAnimation({
		// left : '322',
		duration : 500
	});

	slidePrev.left = screenWidth;

	// Next Month Click Event
	nextMonth.addEventListener('click', function() {
		if (b == 11) {
			b = 0;
			a++;
		} else {
			b++;
		}

		getCliOrder(a, b + 1, c, 'clickNEXTCAL');

		thisCalendarView.animate(slideNext);
		//nextCalendarView.animate(slideReset);

		Ti.App.addEventListener("clickNEXTCAL", function(e) {
			win.remove(thisCalendarView);
			thisCalendarView = calView(a, b, c);
			if (needToChangeSize == false) {
				thisCalendarView.left = '-1dp';
			}

			win.add(thisCalendarView);
			monthTitle.text = monthName(b) + ' ' + a;
			/*
			 setTimeout(function() {
			 thisCalendarView.left = (screenWidth * -1) + 'dp';
			 if (needToChangeSize == false) {
			 nextCalendarView.left = '-1dp';
			 } else {
			 nextCalendarView.left = ((screenWidth - 644) / 2);
			 }
			 prevCalendarView = thisCalendarView;
			 thisCalendarView = nextCalendarView;
			 if (b == 11) {
			 nextCalendarView = calView(a + 1, 0, c);
			 } else {
			 nextCalendarView = calView(a, b + 1, c);
			 }
			 monthTitle.text = monthName(b) + ' ' + a;
			 nextCalendarView.left = screenWidth + 'dp';
			 win.add(nextCalendarView);
			 }, 500);
			 */

		});
	});

	// Previous Month Click Event
	prevMonth.addEventListener('click', function() {
		if (b == 0) {
			b = 11;
			a--;
		} else {
			b--;
		}

		getCliOrder(a, b + 1, c, 'clickPREVCALL');

		thisCalendarView.animate(slidePrev);
		//prevCalendarView.animate(slideReset);

		Ti.App.addEventListener("clickPREVCALL", function(e) {
			win.remove(thisCalendarView);
			thisCalendarView = calView(a, b, c);
			if (needToChangeSize == false) {
				thisCalendarView.left = '-1dp';
			}

			win.add(thisCalendarView);
			monthTitle.text = monthName(b) + ' ' + a;

			/*
			 setTimeout(function() {
			 thisCalendarView.left = screenWidth + 'dp';
			 if (needToChangeSize == false) {
			 prevCalendarView.left = '-1dp';
			 } else {
			 prevCalendarView.left = ((screenWidth - 644) / 2);
			 }
			 nextCalendarView = thisCalendarView;
			 thisCalendarView = prevCalendarView;
			 if (b == 0) {
			 prevCalendarView = calView(a - 1, 11, c);
			 } else {
			 prevCalendarView = calView(a, b - 1, c);
			 }
			 monthTitle.text = monthName(b) + ' ' + a;

			 prevCalendarView.left = (screenWidth * -1) + 'dp';
			 win.add(prevCalendarView);
			 }, 500);
			 */
		});
	});

	pExit.addEventListener('click', function(e) {

		Ti.App.fireEvent('cancelobj');

	});

	win.modal = true;
}

function getCliOrder(year, month, day, eventCal) {
	var lenRes;
	var result = [];
	var time_val = month;
	var time_req = 'month';

	//obj=null;
	if (obj.length > 0)
		obj.length = 0;
	//var url ="http://amihud.com/ec/musrlogin.php?action=login&user="+phone+"&pass="+phone;
	var url = "http://amihud.com/ec/getresult.php?action=getcliordcal&cli_id=" + cli_id + '&usr_id=' + usr_id + '&month=' + month + '&year=' + year + '&time_req=' + time_req + '&time_val=' + time_val;
	//var url ="http://localhost:889/login.php?action=login&user="+user+"&pass="+pass;
	var request = Titanium.Network.createHTTPClient();
	;
	request.open("GET", url);
	if (Titanium.App.getPublisher() == 0)
		alert(url);
	request.onload = function() {
		var json = this.responseText;
		if (json) {
			try {

				result = JSON.parse(json);

				if (Titanium.App.getPublisher() == 0)
					alert(result);

				//result = JSON.parse(json);
				lenRes = result[0].len;
				for (var i = 0; i < lenRes; i++) {
					var jpg = 'http://amihud.com/ec/' + result[i].image;

					obj.push({
						name : '' + result[i].name + '',
						path : '' + jpg + '',
						id : '' + result[i].id + '',
						day : '' + result[i].day + ''
					});

				}

				console.log('getCliOrder' + ' ' + day + ' ' + month + ' ' + year + ' ' + eventCal);
				console.log(obj[0]);

				Ti.App.fireEvent(eventCal);
				/*
				 var count = 0;
				 var intervalID = setInterval(function() {
				 count++;
				 console.log("Interval fired. Count = " + count);
				 if (count === 20) {
				 clearInterval(intervalID);
				 console.log(obj[0]);
				 console.log(func + ' ' + month + ' ' + year);
				 if (func == 1)
				 calWindow();
				 else if (func == 2)
				 Ti.App.fireEvent("WORKER");

				 }
				 }, 10);
				 */

			} catch(eresult) {
				var alertDialog = Titanium.UI.createAlertDialog({
					title : Ti.Locale.getString('InternetError', 'i18nMissingMsg'),
					message : result,
					buttonNames : [Ti.Locale.getString('OK', 'i18nMissingMsg')]
				});
				alertDialog.show();
				alertDialog.addEventListener('click', function(e) {
					Ti.App.fireEvent('ptype', {
						type : win.type,
						path : win.path
					});
				});
			}
		}

	};

	request.send();
	////////
	//typeImage[i]
	request.onerror = function(event) {

		var alertDialog = Titanium.UI.createAlertDialog({
			title : Ti.Locale.getString('InternetError', 'i18nMissingMsg'),
			message : event,
			buttonNames : [Ti.Locale.getString('OK', 'i18nMissingMsg')]
		});
		alertDialog.show();
		alertDialog.addEventListener('click', function(e) {
			Ti.App.fireEvent('ptype', {
				type : win.type,
				path : win.path
			});
		});

	};
}// get cliorder


Ti.App.addEventListener("clickDAY", function(e) {

	//	function getObjList(day, month, year) {

	day = e.day;
	month = b + 1;
	year = a;

	var usr_id = Ti.App.cusr_id;
	var cli_id = Ti.App.ccli_id;

	var objCount = [];

	var objName = [];
	var objPrice = [];
	var objImage = [];
	var objId = [];
	var resultLen;
	var lenRes;
	var nameArrayView = [];
	var result = [];

	CustomData.length = 0;

	//var url ="http://amihud.com/ec/musrlogin.php?action=login&user="+phone+"&pass="+phone;
	var url = "http://amihud.com/ec/getresult.php?action=clihistoryday&usr_id=" + usr_id + '&cli_id=' + cli_id + '&day=' + day + '&month' + month + '&year=' + year;

	var time_req = 'day';
	var time_val = day;

	//var url ="http://amihud.com/ec/musrlogin.php?action=login&user="+phone+"&pass="+phone;
	var url = "http://amihud.com/ec/getresult.php?action=getcliordcal&cli_id=" + cli_id + '&usr_id=' + usr_id + '&month=' + month + '&year=' + year + '&time_req=' + time_req + '&time_val=' + time_val;

	//var url ="http://localhost:889/login.php?action=login&user="+user+"&pass="+pass;
	var request = Titanium.Network.createHTTPClient();
	;
	request.open("GET", url);
	request.send();

	request.onload = function() {
		var arrData = [];

		var json = this.responseText;
		if (json) {
			try {
				result = JSON.parse(json);

				if (Titanium.App.getPublisher() == 0)
					alert(result);
				//result = JSON.parse(json);
				lenRes = result[0].len;
				for (var i = 0; i < lenRes; i++) {
					objName[i] = result[i].name;
					objPrice[i] = result[i].price;
					objCount[i] = result[i].cid;
					objImage[i] = 'http://amihud.com/ec/' + result[i].image;
					objId[i] = result[i].id;
					console.log(result[i]);

				}

				for ( pos = 0; pos < lenRes; pos++) {
					var jpg = objImage[pos];
					var container = -1;
					var title = objName[pos];
					var price = objPrice[pos];
					var count = objCount[pos];
					var obj_id = objId[pos];
					CustomData.push({
						hasChild : true,
						pos : pos,
						name : '' + title + '',
						price : '' + price + '',
						count : '' + count + '',
						image : '' + jpg + '',
						obj_id : '' + obj_id + '',
						container : '' + container + ''
					});

				}
				displayHistory();

				//displayObj(obj);

			} catch(result) {

				var alertDialog = Titanium.UI.createAlertDialog({
					title : Ti.Locale.getString('InternetError', 'i18nMissingMsg'),
					message : result,
					buttonNames : [Ti.Locale.getString('OK', 'i18nMissingMsg')]
				});
				alertDialog.show();
				alertDialog.addEventListener('click', function(e) {
					Ti.App.fireEvent('basket', {});
				});

			}
		}

	};

	////////
	//typeImage[i]
	//}

});
var tableview = null;
function displayHistory() {
	if (tableview != null) {
		if (tableview.data.length > 0) {
			for (var i = tableview.data[0].rows.length - 1; i >= 0; i--) {
				tableview.deleteRow(i);
			}
			myData = [];

			tableview.setData(myData);
			var newData = [];

			for (x in tableview.data) {
				var sectionData = tableview.data[x];

				newData.push(sectionData);
			}

			tableview.setData(newData);
		}

		win.remove(tableview);
	}

	tableview = Titanium.UI.createTableView({
		top : Ti.App.SCREEN_HEIGHT * .70,
		height : 'auto'
	});

	var data = [];
	for (var i = CustomData.length - 1; i >= 0; i--) {

		var row = Titanium.UI.createTableViewRow({
			hasChild : true,
			height : 'auto'
		});
		var image = Titanium.UI.createImageView({
			image : CustomData[i].image,
			width : 33,
			height : 33,
			left : 4,
			top : 2
		});

		var name = Titanium.UI.createLabel({
			text : CustomData[i].name,
			font : {
				fontSize : 16,
				fontWeight : 'bold'
			},
			width : 'auto',
			textAlign : 'right',
			top : 2,
			left : 50,
			height : 16
		});

		var price = Titanium.UI.createLabel({
			text : CustomData[i].price,
			//top : 33,
			left : 72,
			width : 'auto',
			height : 14,
			bottom : 1
		});

		row.add(name);
		row.add(image);

		row.add(price);
		row.hasChild = CustomData[i].hasChild;
		//row.className = 'coutry_row';

		data.push(row);
	};
	tableview.setData(data);

	// create table view event listener
	tableview.addEventListener('click', function(e) {
		/*
		if (e.rowData.link) {
		newWindow = Titanium.UI.createWindow({
		url : e.rowData.link
		});
		}

		var i = CustomData.length - e.index - 1;
		// alert(CustomData[i].obj_id);
		if (Ti.Platform.osname != 'android')
		Ti.App.fireEvent('objhistory', {
		obj_id : CustomData[i].obj_id
		});

		*/

		// Titanium.UI.currentTab.open(newWindow);
	});

	win.add(tableview);

}

