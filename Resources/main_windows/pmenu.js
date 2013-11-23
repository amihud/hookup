var win 			= Ti.UI.currentWindow;
 

win.backgroundImage = '../images/bg_main.png';


	var imageCollection1 = [
'http://amihud.com/ec/images/hookey.jpg',
'http://amihud.com/ec/images/logo.JPG',
'http://amihud.com/ec/images/1000312_10151743449039710_5992176_n.jpg',
'http://amihud.com/ec/images/hookey.jpg'

];

var imageCollection=[];

//////////////
//getUsrid('0505281056');


start(Ti.App.cusr_id,0,0);

function getUsrid(phone){
 
  //var url ="http://amihud.com/ec/musrlogin.php?action=login&user="+phone+"&pass="+phone; 
  var url ="http://amihud.com/ec/getresult.php?action=getusrid&phone="+phone;
  //var url ="http://localhost:889/login.php?action=login&user="+user+"&pass="+pass; 
  var request =  Titanium.Network.createHTTPClient();;
  request.open("GET",url);
  request.onload = function(){
  var arrData = [];
  var result = [];
  
   var json = this.responseText;
   if (json){
    try{
        result=JSON.parse(json);
  // result = JSON.parse(json);
 // arrData = eval('('+this.responseText+')');
 // var result = arrData[0];
 

  
  if(result[0].result == "true"){
   // Titanium.App.Properties.setString("user_id",arrData[0].user_id);
    var alrt_Success = Titanium.UI.createAlertDialog({
      title: result[0].email,
      message: result[0].user_id,
      buttonNames: ['OK']
    });
   // alrt_Success.show();
    start(result[0].user_id,result[0].email,0);
  } else {
    var alrt_Sorry = Titanium.UI.createAlertDialog({
      title: result[0].result,
      message: result[0].user_id,
      buttonNames: ['OK']
    });
    alrt_Sorry.show(); 
  }
      }catch(result){
        alert(result); //error in the above string(in this case,yes)!
        Ti.App.fireEvent('ptype',{});

    }
}
  
  };// end onload function
  
  request.send();
  
  
 }// end getuserid function

/////////////

function start1(usr_id,usr_email){
	var cli_id;
	var result = [];
	
}
//-- Our business views
////////


function start(usr_id,usr_email,cli_id){

 var typeName = [];
 var typeType = [];
  var typeId = [];

 var typeImage = [];
 var resultLen;
 var lenRes;
 var nameArrayView=[];
 var result = [];
 var business= [];
 var pkg = [];
 var req_id= [];

  //var url ="http://amihud.com/ec/musrlogin.php?action=login&user="+phone+"&pass="+phone; 
  var url ="http://amihud.com/ec/getresult.php?action=getordmenu&usr_id="+usr_id ;
  //var url ="http://localhost:889/login.php?action=login&user="+user+"&pass="+pass; 

  var request =  Titanium.Network.createHTTPClient();;
  request.open("GET",url);
  

  request.onload = function(){
  var arrData = [];
 
  
 

  
   var json = this.responseText;
   if (json){
    try{
        result=JSON.parse(json);
  // result = JSON.parse(json);
   
   lenRes = result[0].len;
 	for(var  i = 0 ; i < lenRes;i++){
   		typeType[i]=result[i].type;
   		typeId[i]=result[i].id;
		typeName[i]=result[i].name;
   		typeImage[i]=result[i].image;
   		imageCollection[i]='http://amihud.com/ec/'+result[i].image;
       }
	for( pos=0; pos < lenRes; pos++){
		//var jpg='../images/business/stuffedbusiness.png';
		var jpg=imageCollection[pos];
		var container = pos;
		var type = typeType[pos];
		var name = typeName[pos]; 
		business.push({
				title:'' + typeName[pos] + '' ,
				id:'' + typeId[pos] + '' ,
				path:'' +  jpg + '' ,
				type:'' +  type + '' ,
				
				container:'' + container + ''});	
	}
	
	/* never work here
	var imageView = Titanium.UI.createImageView({
		image:'http://static.appcelerator.com/images/header/appc_logo.png',
		defaultImage:'/images/cloud.png',
		top:20,
		width:100,
		height:100
	});*/
	
	/////
	//http://amihud.com/ec/images/hookey.jpg
	//http://amihud.com/ec/images/logo.JPG
	//http://amihud.com/ec/images/1000312_10151743449039710_5992176_n.jpg
	

	
	/////
	
	// need to push to imagecollection file from web return
	for(var i = 0 ; i < lenRes; i++){
		nameArrayView.push(Ti.UI.createView({width:216,height:156,backgroundImage:'../images/business/hand.png'}));
	}
	displayType(typeName[0],nameArrayView,business,usr_id,usr_email);

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
    }
}//if json
  
  };//d of onload fnction
  request.send();
////////
//typeImage[i]
}

function displayType(firstType,nameArrayView,business,usr_id,usr_email){ 

var handMade 		= Ti.UI.createView({width:216,height:156,backgroundImage:'../images/business/hand.png'});
var natural 		= Ti.UI.createView({width:216,height:156,backgroundImage:'../images/business/natural.png'});
var panbusiness 		= Ti.UI.createView({width:216,height:156,backgroundImage:'../images/business/pan.png'});
var stuffedbusiness 	= Ti.UI.createView({width:216,height:156,backgroundImage:'../images/business/stuffedbusiness.png'});
var thinNCrispy 	= Ti.UI.createView({width:216,height:156,backgroundImage:'../images/business/thinNcrispy.png'});

var returnbusiness;

//-- business reference


var business1		= [
			{title:'Hand Made',path:'../images/business/hand.png',container:1},
			{title:'Natural',path:'../images/business/natural.png',container:2},
			{title:'Pan business',path:'../images/business/pan.png',container:3},
			{title:'Stuffed business',path:'../images/business/stuffedbusiness.png',container:4},
			{title:'Thin N Crispy business',path:'../images/business/thinNcrispy.png',container:5}
];

/*
for(var i = 0 ; i < 4; i++){
	nameArrayView.push(Ti.UI.createView({width:216,height:156,backgroundImage:'../images/business/hand.png'}));
}
*/

//-- Our scroll view that contains our business views
var scrollView = Ti.UI.createScrollableView({
	//views:[handMade,natural,pantype,stuffedtype,thinNCrispy],
	
	//views:nameArrayView,
	showPagingControl:true,
	//clipViews:true,
	top:Ti.App.SCREEN_HEIGHT * .30,
	left:Ti.App.SCREEN_WIDTH * .05,
	right:30,
	height:180,
	opacity:0,
	
   	   maxZoomScale:5,
		minZoomScale:1
});


var viewCollection = [];
	for (var i = 0; i < imageCollection.length; i++) {
			var view = Ti.UI.createView({});
			var img = Ti.UI.createImageView({
											maxZoomScale:5,
											defaultImage:'images/default_image.png'
											});
			if (i < 100) { // only preload the first 3 images
				img.image = imageCollection[i];
				}
				
				
			
			view.add(img);
			viewCollection.push(view);
		}
		
scrollView.views = viewCollection;
//-- If the window has the business property, that means we are coming from the obj window so choose the last know selected business
if (win.business)
{
	for (i = 0; i < business.length; i++)
	{
		if (win.business == business[i].title)
		{
			returnbusiness = i;
			break;
		}
	}
	scrollView.scrollToView(returnbusiness);
}

//-- business title
var businessTitle = Ti.UI.createLabel({
	text:Ti.Locale.getString('ChooseType', 'i18nMissingMsg'),
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

//-- business title background
var businessTitleView = Ti.UI.createView({
	width:Ti.App.SCREEN_WIDTH,
	height:Ti.App.TITLEVIEW,
	backgroundImage:'../images/businessHeaderBg.png',
	top:Ti.App.SCREEN_HEIGHT * .05,
	//left:1,
	opacity:0
});


businessTitleView.add(businessTitle);

//-- business type label
var businessType = Ti.UI.createLabel({
	text:firstType,
	//text:result[0].type,
	font:{
		fontFamily:'Verdana',
		fontWeight:'bold',
		fontSize:16
	},
	color:'#fff',
	shadowColor:'#333',
	shadowOffset:{x:1,y:1},
	textAlign:'center',
	width:Ti.App.SCREEN_WIDTH,
	height:20,
	top:Ti.App.SCREEN_HEIGHT * .20,
	opacity:0
});



///- if returnbusiness isn't null, set the business type label
if (returnbusiness != null)
{
	businessType.text = business[returnbusiness].title;
}

//-- Next Button
var next = Ti.UI.createButton({
	width:34,
	height:34,
	backgroundImage:'../images/button_ok.png',
	top:Ti.App.SCREEN_HEIGHT * .8,
	left:Ti.App.SCREEN_WIDTH * 0.70,
	opacity:0
});




var pType = Ti.UI.createButton({
	width:36,
	height:36,
	backgroundImage:'../images/button_blue_eject.png',
	top:Ti.App.SCREEN_HEIGHT * .8,
	left:Ti.App.SCREEN_WIDTH * 0.45,
	opacity:0
});
//-- If android1 OS, use the image property instead of backgroundImage (Ti SDK bug)


pType.addEventListener('click',function(e){
	Ti.App.fireEvent('ptype',{	});
	
});

next.addEventListener('click',function(e){
	if(imageCollection.length != 0){
			Ti.App.fireEvent('order',{
			typeSearch:business[scrollView.currentPage].type,
			
			usr_id:Ti.App.cusr_id
			});
	}else {
			start(Ti.App.cusr_id,0,0);
		}
});


scrollView.addEventListener('click',function(e){
		if(imageCollection.length != 0){
			Ti.App.fireEvent('order',{
			typeSearch:business[scrollView.currentPage].type,
			usr_id:Ti.App.cusr_id
			});
		}
		else {
			start(Ti.App.cusr_id,0,0);
		}
});



var map = Ti.UI.createButton({
	width:36,
	height:36,
	backgroundImage:'../images/Map-icon.png',
	top:Ti.App.SCREEN_HEIGHT * .8,
	left:Ti.App.SCREEN_WIDTH * 0.1,
	opacity:0
});
//-- If android1 OS, use the image property instead of backgroundImage (Ti SDK bug)


map.addEventListener('click',function(e){
	Ti.App.fireEvent('map',{usr_id:win.usr_id,typeSearch:business[scrollView.currentPage].type});  
});	


win.add(scrollView);
win.add(businessTitleView);
win.add(businessType);
win.add(next);
win.add(map);
win.add(pType);



map.animate({
	opacity:1,
	duration:500
});


//-- Fade the scrollview in
scrollView.animate({
	opacity:1,
	duration:500
});

//-- Fade the business title in
businessTitleView.animate({
	opacity:1,
	duration:500
});

businessType.animate({
	opacity:1,
	duration:500
});

//-- Fade the next button in
next.animate({
	opacity:1,
	duration:500
});



pType.animate({
	opacity:1,
	duration:500
});
//-- Changes the business type label text when the user scrolls
scrollView.addEventListener('scroll',function(e){
	businessType.text = business[scrollView.currentPage].title;
	
	/* if (scrollView.currentPage < (imageCollection.length-1)) {
var nxt = scrollView.currentPage+2; // get the 2nd next image (since the next one is already loaded)
scrollView.views[nxt].children[0].image = imageCollection[nxt];
}*/

});



}

/*

setInterval(function(){
if(imageCollection.length == 0)
   start(Ti.App.cusr_id,0,0);
}, 2000);

*/



