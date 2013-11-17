var curWindow = Titanium.UI.currentWindow;
curWindow.setBackgroundColor('#A00000');
var usr_id = curWindow.usr_id;

var typeTitle = Ti.UI.createLabel({
	
	text:Ti.Locale.getString('Register', 'i18nMissingMsg'),
	font:{
		fontFamily:'Verdana',
		fontWeight:'bold',
		fontSize:24
	},
	color:'black',
	shadowColor:'#333',
	shadowOffset:{x:1,y:1},
	textAlign:'center',
	width:Ti.App.SCREEN_WIDTH,
	height:Ti.App.TITLEVIEW,
	left:1
});

//-- type title background
var typeTitleView = Ti.UI.createView({
	width:Ti.App.SCREEN_WIDTH,
	height:Ti.App.TITLEVIEW,
	backgroundImage:'../images/typeHeaderBg.png',
	top:Ti.App.SCREEN_HEIGHT * .05
//	left:1,
	
});
typeTitleView.add(typeTitle);



 
var scrollView = Titanium.UI.createScrollView({
  contentWidth:'auto',
  contentHeight:'auto',
  top:0,
  showVerticalScrollIndicator:true,
  showHorizontalScrollIndicator:true
});
 
var view = Titanium.UI.createView({
  width:"100%",
  height: "auto",
  top:10,
  paddingBottom: 15
});
 
 
 
var lbl_Phone = Titanium.UI.createLabel({
  text:Ti.Locale.getString('Phone', 'i18nMissingMsg'),
  height:30,
  width:"98%",
  color:'white',
  font: {fontSize:16},
  top: Ti.App.SCREEN_HEIGHT * .17
});
var txt_Phone = Titanium.UI.createTextField({
  width: "98%",
  color: "black",
  paddingLeft: 5,
  border: 1,
  borderColor: "gray",
  borderRadius: 3,
  font:{fontSize:20},
  height: Ti.App.SCREEN_HEIGHT * .08,
  top: Ti.App.SCREEN_HEIGHT * .20
});

var lbl_Email = Titanium.UI.createLabel({
  text:Ti.Locale.getString('Email', 'i18nMissingMsg'),
  height:30,
  width:"98%",
  color:'white',
  font:{fontSize:16},
  top: Ti.App.SCREEN_HEIGHT * .27
});
var txt_Email = Titanium.UI.createTextField({
  width: "98%",
  color: "black",
  paddingLeft: 5,
  border: 1,
  borderColor: "gray",
  borderRadius: 3,
  //passwordMask: true,
  font:{fontSize:20},
  height: Ti.App.SCREEN_HEIGHT * .08,
  top: Ti.App.SCREEN_HEIGHT * .30
});

 
 
 
var lbl_User = Titanium.UI.createLabel({
  text:Ti.Locale.getString('Name', 'i18nMissingMsg'),
  height:30,
  width:"98%",
  color:'white',
  font:{fontSize:16},
  top: Ti.App.SCREEN_HEIGHT * .37
});
 
 
var txt_User = Titanium.UI.createTextField({
  width: "98%",
  color: "black",
  paddingLeft: 5,
  border: 1,
  borderColor: "gray",
  borderRadius: 3,
  //passwordMask: true,
  font:{fontSize:20},
  height: Ti.App.SCREEN_HEIGHT * .08,
  top: Ti.App.SCREEN_HEIGHT * .40
});
 
 
 
 
var lbl_Address = Titanium.UI.createLabel({
  text:Ti.Locale.getString('Address', 'i18nMissingMsg'),
 height:30,
  width:"98%",
  color:'white',
  font:{fontSize:16},
  top: Ti.App.SCREEN_HEIGHT * .47
});
 
 
var txt_Address = Titanium.UI.createTextField({
  width: "98%",
  color: "black",
  paddingLeft: 5,
  border: 1,
  borderColor: "gray",
  borderRadius: 3,
  //passwordMask: true,
  font:{fontSize:20},
  height: Ti.App.SCREEN_HEIGHT * .08,
  top: Ti.App.SCREEN_HEIGHT * .50
});
 
var lbl_City = Titanium.UI.createLabel({
  text:Ti.Locale.getString('City', 'i18nMissingMsg'),
  height:30,
  width:"98%",
  color:'white',
  font:{fontSize:16},
  top: Ti.App.SCREEN_HEIGHT * .57
});
 
 
var txt_City = Titanium.UI.createTextField({
  
  width: "98%",
  color: "black",
  paddingLeft: 5,
  border: 1,
  borderColor: "gray",
  borderRadius: 3,
  //passwordMask: true,
  font:{fontSize:20},
  height: Ti.App.SCREEN_HEIGHT * .08,
  top: Ti.App.SCREEN_HEIGHT * .60
  
});
 

 var  btn_Register = Titanium.UI.createButton({
 // width: "98%",
 // color: "black",
 width:64,
	height:64,
	backgroundImage:'../images/button_ok.png',
	top:Ti.App.SCREEN_HEIGHT * .8,
	left:Ti.App.SCREEN_WIDTH * 0.70
 //title: Ti.Locale.getString('login', 'i18nMissingMsg')
});

var cancel = Ti.UI.createButton({
		width:64,
	height:64,
	backgroundImage:'../images/button_previous_01.png',
	top:Ti.App.SCREEN_HEIGHT * .8,
	left:Ti.App.SCREEN_WIDTH * 0.1
	
	//title: Ti.Locale.getString('Return', 'i18nMissingMsg')
});
 
view.add(lbl_Email);
view.add(txt_Email);
view.add(lbl_User);
view.add(txt_User);
view.add(lbl_Phone);
view.add(txt_Phone);
view.add(lbl_Address);
view.add(txt_Address);
view.add(lbl_City);
view.add(txt_City);
view.add(btn_Register);
view.add(typeTitleView);

view.add(cancel);
 
 
scrollView.add(view);
 
curWindow.add(scrollView);


function registerUser(email, name, phone, address,city){



  var request = Titanium.Network.createHTTPClient();
  var url = "http://www.amihud.com/ec/adddata.php?action=addcli&email="+email+"&name="+name+"&phone="+phone+"&usr_id="+usr_id+"&address="+address+"&city="+city;
  request.open("GET",url);
  request.onload = function(){
   var arrData = [];
   //arrData = eval('('+this.responseText+')');
    
    var json = this.responseText;
   if (json){
    try{
        result=JSON.parse(json);
  
    if(result[0].result == "true"){
      var alrt_Success = Titanium.UI.createAlertDialog({
        title: Ti.Locale.getString('Success', 'i18nMissingMsg'),
        message: Ti.Locale.getString('Youcanstarttomakeorder', 'i18nMissingMsg'),
        buttonNames: [Ti.Locale.getString('OK', 'i18nMissingMsg')]
      });
      alrt_Success.show();
      alrt_Success.addEventListener('click',function(e)
		{
        Ti.App.fireEvent('ptype',{});
		});
      
    } else if (result[0].result == "false"){
    var alrt_Sorry = Titanium.UI.createAlertDialog({
      title: Ti.Locale.getString('Sorry', 'i18nMissingMsg'),
      message:Ti.Locale.getString('Useralreadyexist', 'i18nMissingMsg'),
      buttonNames: [Ti.Locale.getString('OK', 'i18nMissingMsg')]
      });
      alrt_Sorry.show();
      alrt_Sorry.addEventListener('click',function(e)
		{
        Ti.App.fireEvent('register',{});
		});
      
    } else {
      var alrt_Fail = Titanium.UI.createAlertDialog({
        title: Ti.Locale.getString('Error', 'i18nMissingMsg'),
        message: Ti.Locale.getString('Tryagain', 'i18nMissingMsg'),
        buttonNames: [Ti.Locale.getString('OK', 'i18nMissingMsg')]
      });
      alrt_Fail.show();
      alrt_Fail.addEventListener('click',function(e)
		{
        Ti.App.fireEvent('register',{});
		});
      
    }
    
  }  catch(result){

		var alertDialog = Titanium.UI.createAlertDialog({
			title: Ti.Locale.getString('InternetError', 'i18nMissingMsg'),
			message:result,
			buttonNames: [Ti.Locale.getString('OK', 'i18nMissingMsg')]
		});
		alertDialog.show();
		alertDialog.addEventListener('click',function(e)
		{
        Ti.App.fireEvent('register',{});
		});

    }
}
  };
  request.send();
  
}

function getUserInfo(){  
	btn_Register.enabled 		= false; 
  var email = txt_Email.value;
  var user = txt_User.value;
  var phone = txt_Phone.value;
  var address = txt_Address.value;  
  var city = txt_City.value;   
  
  registerUser(email, user, phone,address,city);
 
}

btn_Register.addEventListener('click',getUserInfo);
cancel.addEventListener('click', myReturn);

function myReturn(){
	cancel.enabled 		= false;
	Ti.App.fireEvent('ptype');
	
}

