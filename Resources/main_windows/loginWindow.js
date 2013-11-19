var curWindow = Titanium.UI.currentWindow;
curWindow.setBackgroundColor('#A00000');


var usr_id=curWindow.usr_id;
var usr_email=curWindow.usr_email;
var usr_name=curWindow.usr_name;

//////////


//////////////////
/*
////////////////////////

var win = Titanium.UI.currentWindow;
var view = Titanium.UI.createView({
    backgroundColor: "#FFFEEE"
});
var row1 = Ti.UI.createTableViewRow({
    height:'auto',
    selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
});
var label1 = Titanium.UI.createLabel({
    text:'Username',
    left: 10
});
var usernametf = Ti.UI.createTextField({
    left: 100,
    right:10,
    hintText: 'username',
    textAlign:"right",
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE
});
var row2 = Ti.UI.createTableViewRow({
    height:'auto',
    selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
});
var label2 = Titanium.UI.createLabel({
    text:'Password',
    left: 10
});
var passwordtf = Ti.UI.createTextField({
    left: 100,
    textAlign:"right",
    hintText: 'password',
    right:10,
    passwordMask:true,
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE
});
row1.add(label1);
row1.add(usernametf);
row2.add(label2);
row2.add(passwordtf);
var data = [row1,row2];
var table = Ti.UI.createTableView({
    data:data,
    style: Ti.UI.iPhone.TableViewStyle.GROUPED
});
var button = Ti.UI.createButton({
    title:"Done",
    height:45,
    width:300,
    top:150
});
view.add(table);
view.add(button);
win.add(view);



////////////////////////

*/

var typeTitle = Ti.UI.createLabel({
	
		text: Ti.Locale.getString('login', 'i18nMissingMsg') + ' ' + Ti.Locale.getString('Client', 'i18nMissingMsg'),
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



/*
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
 
 */

var color;
if(Ti.Platform.osname == 'android')
   color = 'black';
else
	color = 'white';
var lbl_Phone = Titanium.UI.createLabel({
  text:Ti.Locale.getString('Phone', 'i18nMissingMsg'),
  height:Ti.App.SCREEN_HEIGHT * .05,
  width:"98%",
  color:'white',
  font: {fontSize:16},
  top: Ti.App.SCREEN_HEIGHT * .16
  });
var txt_Phone = Titanium.UI.createTextField({
  width: "98%",
  color: color,
  paddingLeft: 5,
  border: 1,
  borderColor: "gray",
  borderRadius: 1,
  font:{fontSize:16},
  
  
  
  height: Ti.App.SCREEN_HEIGHT * .06,
  top: Ti.App.SCREEN_HEIGHT * .20
});

var lbl_Email = Titanium.UI.createLabel({
  text:Ti.Locale.getString('Email', 'i18nMissingMsg'),
  height:Ti.App.SCREEN_HEIGHT * .05,
  width:"98%",
  color:'white',
  font:{fontSize:16},
  top: Ti.App.SCREEN_HEIGHT * .26
});
var txt_Email = Titanium.UI.createTextField({
  width: "98%",
  color: color,
  paddingLeft: 5,
  border: 1,
  borderColor: "gray",
  borderRadius: 1,
  //passwordMask: true,
  font:{fontSize:16},
  height: Ti.App.SCREEN_HEIGHT * .06,
  top: Ti.App.SCREEN_HEIGHT * .30
});

var btn_Login = Titanium.UI.createButton({
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

var register = Ti.UI.createButton({

	
    width:46,
	height:46,
	backgroundImage:'../images/Group-icon.png',
	top:Ti.App.SCREEN_HEIGHT * .8,
	left:Ti.App.SCREEN_WIDTH * 0.45
	
	//title: Ti.Locale.getString('Return', 'i18nMissingMsg')
});

////////

var lbl_checkbox = Titanium.UI.createLabel({
  text:Ti.Locale.getString('Signifprovider', 'i18nMissingMsg'),
  height:Ti.App.SCREEN_HEIGHT * .05,
  width:"98%",
  color:'white',
  font:{fontSize:16},
    top:Ti.App.SCREEN_HEIGHT * .7,
    left:Ti.App.SCREEN_WIDTH * 0.45,
});
var checkbox = Ti.UI.createButton({
    title: '',
    top:Ti.App.SCREEN_HEIGHT * .7,
    left:Ti.App.SCREEN_WIDTH * 0.70,
    width: 30,
    height: 30,
    borderColor: '#666',
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: '#aaa',
    backgroundImage: 'none',
    color: '#fff',
    font:{fontSize: 25, fontWeight: 'bold'},
    value: 'cli' //value is a custom property in this casehere.
});
 
//Attach some simple on/off actions
checkbox.on = function() {
    this.backgroundColor = '#007690';
    this.title='\u2713';
    this.value = 'usr';
};
 
checkbox.off = function() {
    this.backgroundColor = '#aaa';
    this.title='';
    this.value = 'cli';
};
 
checkbox.addEventListener('click', function(e) {
    if('cli' == e.source.value) {
        e.source.on();
        typeTitle.text = Ti.Locale.getString('login', 'i18nMissingMsg') + ' ' + Ti.Locale.getString('Provider', 'i18nMissingMsg') ;   
         
    } else {
        e.source.off();
        typeTitle.text = Ti.Locale.getString('login', 'i18nMissingMsg') + ' ' + Ti.Locale.getString('Client', 'i18nMissingMsg') ;   

    }
});


//////

/*
view.add(checkbox);
view.add(lbl_Phone);
view.add(txt_Phone);
view.add(lbl_Email);
view.add(txt_Email);
view.add(btn_Login);
view.add(register);
view.add(cancel);
view.add(typeTitleView);
scrollView.add(view);


 
curWindow.add(scrollView);

*/
curWindow.add(checkbox);
curWindow.add(lbl_checkbox);
curWindow.add(lbl_Phone);
curWindow.add(txt_Phone);
curWindow.add(lbl_Email);
curWindow.add(txt_Email);
curWindow.add(btn_Login);
curWindow.add(cancel);
curWindow.add(typeTitleView);


 var storedCredentials = Ti.App.Properties.getString("Credentials");

    if (storedCredentials){
        var credObject = JSON.parse(storedCredentials);
        var phone = credObject.phone;
		var email = credObject.email;
		var usr  = credObject.usr;
		if(phone != '' )
			loginUser(phone,email,usr);

        // Call your authentication function
        // For example, autoAuthenticate(oJson.username, oJson.password);
    } else {
        // kick the user out to your login window
        // For example, $.loginWindow.open();
    }

	

function getUserInfo(e){
  btn_Login.enabled 		= false;
  var phone = txt_Phone.value;
  var email = txt_Email.value;
  var usr = checkbox.value;

  

// Build the object and then convert it to a json string.

 
  	loginUser(phone,email,usr);
  
}
btn_Login.addEventListener('click',getUserInfo);
cancel.addEventListener('click', myReturn);

function myReturn(){
	cancel.enabled 		= false;
	Ti.App.fireEvent('ptype');
	
}


register.addEventListener('click',function(e)
           
			{
		    register.enabled 		= false;
			Ti.App.fireEvent('register',{usr_id:usr_id});
			});

function loginUser(phone,email,usr){
	
  var request = Titanium.Network.createHTTPClient();
  //var url ="http://amihud.com/ec/musrlogin.php?action=login&user="+user+"&pass="+pass; 
  
  var url ="http://amihud.com/ec/getresult.php?action=clilogin&phone="+phone+"&email="+email+"&usr_id="+usr_id+"&usr_type="+usr; 

  //var url ="http://localhost:889/login.php?action=login&user="+user+"&pass="+pass; 

  request.open("GET",url);
  request.onload = function(){
  var arrData = [];
  var result = [];
  
   var json = this.responseText;
   if (json){
    try{
        result=JSON.parse(json);
  		if(result[0].result == "true"){
			oCredentials = new Object();
			oCredentials.phone = phone;
			oCredentials.email = email;
			oCredentials.usr = usr;
			var stringCredentials = JSON.stringify(oCredentials);
			Ti.App.Properties.setString("Credentials", stringCredentials);
			//Ti.App.Properties.setString("Credentials", stringCredentials);
  			Ti.App.Properties.setString({"phone" :phone, "email":email, "usr":usr}, "CREDENTIALS");


   			Ti.App.cusr_id= usr_id;
   			Ti.App.cusr_email= usr_email;
   			Ti.App.ccli_id= result[0].cli_id;
   			if(usr == 'cli'){
   				Ti.App.ccli_name= result[0].cli_name;
   				Ti.App.fireEvent('endlogin');
   				}
   			else{
   				Ti.App.cusr_id= result[0].cli_id;
    			Ti.App.fireEvent('endloginprovider');
    			}
  			} else {
    			var alrt_Sorry = Titanium.UI.createAlertDialog({
      			title: result[0].result,
      			message: result[0].user_id,
      			buttonNames: ['OK']
    			});
    			alrt_Sorry.show();
    
				alrt_Sorry.addEventListener('click',function(e)
					{
					oCredentials = new Object();
					oCredentials.phone = '';
					oCredentials.email = '';
					oCredentials.usr = '';
					var stringCredentials = JSON.stringify(oCredentials);
					Ti.App.Properties.setString("Credentials", stringCredentials);
     				Ti.App.fireEvent('ptype');
					});
   
  				}//
  
   }catch(result){
   			var alertDialog = Titanium.UI.createAlertDialog({
			title: Ti.Locale.getString('InternetError', 'i18nMissingMsg'),
			message: result,
			buttonNames: [Ti.Locale.getString('OK', 'i18nMissingMsg')]
			});
			alertDialog.show();
			alertDialog.addEventListener('click',function(e)
			{
			Ti.App.fireEvent('ptype');
			});
   		}//catch
}// end if for try
  };//end onload
  request.send();
}

