var win 		= Ti.UI.currentWindow;
var orderReq 	= Titanium.Network.createHTTPClient();

//-- Name Text Field
var names = Titanium.UI.createTextField({
	color:'#336699',
	top:100,
	left:10,
	width:300,
	height:40,
	hintText:'Name',
	backgroundImage:'../images/textfield.png',
	paddingLeft:8,
	paddingRight:8,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_NEXT,
	suppressReturn:false
});

//-- Address1 Text Field
var address1 = Titanium.UI.createTextField({
	color:'#336699',
	top:140,
	left:10,
	width:300,
	height:40,
	hintText:'Address 1',
	backgroundImage:'../images/textfield.png',
	paddingLeft:8,
	paddingRight:8,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_NEXT,
	suppressReturn:false
});

//-- Address2 Text Field
var address2 = Titanium.UI.createTextField({
	color:'#336699',
	top:180,
	left:10,
	width:300,
	height:40,
	hintText:'City, State, Zip Code',
	backgroundImage:'../images/textfield.png',
	paddingLeft:8,
	paddingRight:8,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	suppressReturn:false

});


var cli_email = Titanium.UI.createTextField({
	color:'#336699',
	top:220,
	left:10,
	width:300,
	height:40,
	hintText:'email',
	backgroundImage:'../images/textfield.png',
	paddingLeft:8,
	paddingRight:8,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT
});

//-- Listen for the next click on the key board
names.addEventListener('return',function(){address1.focus();});
address1.addEventListener('return',function(){address2.focus();});
address2.addEventListener('return',function(){cli_email.focus();});

win.add(names);
win.add(address1);
win.add(address2);
win.add(cli_email);

//-- This method makes a nice formatted summary of the users order
function getFormattedOrd()
{
	var text =  win.business + '  with:\n';
	if (win.obj.length == 0)
	{
		text += '• Plain (normal)\n';
	}
	else
	{
		for (var i = 0; i < win.obj.length; i++)
		{
			text += '• ' + win.obj[i] + '\n';
		}
	}
	return text;
}

//-- Are formatted text field
var ordInfoText = Ti.UI.createLabel({
	text:getFormattedOrd(),
	font:{
		fontFamily:'Verdana',
		fontSize:14
	},
	color:'#fff',
	shadowColor:'#333',
	shadowOffset:{x:1,y:1},
	textAlign:'left',
	width:Ti.Platform.displayCaps.platformWidth,
	height:160,
	top:210,
	left:10
});
win.add(ordInfoText);

//-- Order Button
var order = Ti.UI.createButton({
	width:137,
	height:75,
	backgroundImage:'../images/order.png',
	top:385,
	left:165,
	opacity:0
});

//-- Cancel Button
var cancel = Ti.UI.createButton({
	width:137,
	height:75,
	backgroundImage:'../images/cancel.png',
	top:385,
	left:10,
	opacity:0
});

//-- If android OS, use the image property instead of backgroundImage (Ti SDK bug)
if (Ti.Platform.osname == 'android')
{
	order.image = '../images/order.png';
	cancel.image = '../images/cancel.png';
}
win.add(order);
win.add(cancel);

//-- Fade the order button in
order.animate({
	opacity:1,
	duration:500
});

//-- Fade the cancel button in
cancel.animate({
	opacity:1,
	duration:500
});

//-- Cancel button event. Goes back to the obj window and remembers the users selections
cancel.addEventListener('click',function(){
	Ti.App.fireEvent('cancelDetails',{business:win.business,path:win.path,bid:win.bid  ,usr_id:win.usr_id,usr_email:win.usr_email,obj:win.obj,obj_id:win.obj_id});
});

//-- Submit order. Check if the text fields are blank
order.addEventListener('click',function(){
	if (names.value == '' || address1.value == '' || address2.value == '' || cli_email.value == '')
	{
		alert('All fields are required');
	}
	else
	{
		var setit = -2;
		var orderit = 0;
		//-- Disable fields and buttons before making are http request
		names.enabled 		= false;
		address1.enabled 	= false;
		address2.enabled 	= false;
		cli_email.enabled  = false;
		order.enabled 		= false;
		cancel.enabled 		= false;
		//-- URL to submit_order.php
		//orderReq.open('POST','http://localhost:889/submit_order.php');
		orderReq.open('POST','http://amihud.com/ec/submit_order.php');
		
		var params = {
			names: names.value,
			address1: address1.value,
			address2: address2.value,
			cli_email:cli_email.value,
			business: win.business,
			obj: win.obj,
			obj_id: win.obj_id,
			req_id: Ti.App.creq_id,
			setit: setit,
			orderit: orderit,
			usr_email:win.usr_email
		};
		orderReq.send(params);
		
	}
});

//-- onLoad method for our http request
orderReq.onload = function()
{
	var response=[];
	var json = this.responseText;
	if (json){
    try{
        response=JSON.parse(json);
  
    //response = JSON.parse(json);
	
	//-- Mail was sent
	if (response[0].mail != 'false')
	{
		Ti.App.creq_id = response[0].mail;
		
		var alertDialog = Titanium.UI.createAlertDialog({
			title: response[0].mail,
			message: 'Your order has been submitted (check the email you used in your submit_order.php file)',
			buttonNames: ['OK']
		});
		alertDialog.show();
		alertDialog.addEventListener('click',function(e)
		{
			Ti.App.fireEvent('resetApp');
		});	
	}
	else
	{
		//-- Mail failed
		alert(response.usr_email);
		names.enabled 		= true;
		address1.enabled 	= true;
		address2.enabled 	= true;
		cli_email.enabled   = true;
		order.enabled 		= true;
		cancel.enabled 		= true;		
	}
	}catch(response){
        alert(response); //error in the above string(in this case,yes)!
    }
}
};

  
//-- Network error
orderReq.onerror = function(event)
{
	alert('Network error: ' + JSON.stringify(event));
	names.enabled 		= true;
	address1.enabled 	= true;
	address2.enabled 	= true;
	cli_email.enabled   = true;
	order.enabled 		= true;
	cancel.enabled 		= true;
};