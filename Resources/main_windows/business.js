var win 			= Ti.UI.currentWindow;

win.backgroundImage = '../images/bg_main.png';


	var imageCollection1 = [
'http://amihud.com/ec/images/hookey.jpg',
'http://amihud.com/ec/images/logo.JPG',
'http://amihud.com/ec/images/1000312_10151743449039710_5992176_n.jpg',
'http://amihud.com/ec/images/hookey.jpg'

];

var imageCollection=[];
var likeTitle;
var basket;
////////////
//getUsrid('0505281056');


function getBasket(){
	
 // likeTitle.text='load..';
  var url ="http://amihud.com/ec/getresult.php?action=morderlist&req_id="+Ti.App.creq_id+'&usr_id='+Ti.App.cusr_id;
  //var url ="http://localhost:889/login.php?action=login&user="+user+"&pass="+pass; 
  var request =  Titanium.Network.createHTTPClient();;
  request.open("GET",url);
  //request.send();
  
  
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
 

 
  if(result[0].len  > 0 ){
   // Titanium.App.Properties.setString("user_id",arrData[0].user_id);
   //likeTitle.text = result[0].like;
   
   
    basket.backgroundImage='../images/full-basket-icon.png';

  } 
  
  else if(result[0].len  == 0 ){
   // Titanium.App.Properties.setString("user_id",arrData[0].user_id);
   //likeTitle.text = result[0].like;
   
   //do nothing
  } 
  
  else {
    var alrt_Sorry = Titanium.UI.createAlertDialog({
      title: result[0].result,
      message: result[0].user_id,
      buttonNames: ['OK']
    });
    alrt_Sorry.show(); 
  }
      }catch(result){
        alert(result); //error in the above string(in this case,yes)!
        //Ti.App.fireEvent('cancelobj',{business:win.business,bid:win.bid,usr_id:win.usr_id,usr_email:win.usr_email});

    }
}
  
  };// end onload function
  

request.send();
	
	
}




function getlike(obj_id){
	
  likeTitle.text='load..';
  var url ="http://amihud.com/ec/getresult.php?action=getlike&obj_id="+obj_id + '&usr_id=' +Ti.App.cusr_id;
  //var url ="http://localhost:889/login.php?action=login&user="+user+"&pass="+pass; 
  var request =  Titanium.Network.createHTTPClient();;
  request.open("GET",url);
  //request.send();
  
  
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
   //likeTitle.text = result[0].like;
   
    likeTitle.text = result[0].like;

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
        //Ti.App.fireEvent('cancelobj',{business:win.business,bid:win.bid,usr_id:win.usr_id,usr_email:win.usr_email});

    }
}
  
  };// end onload function
  

request.send();
	
	
}



start(Ti.App.cusr_id,Ti.App.cusr_email,0);


function likeit(obj_id){
	
	
  var url ="http://amihud.com/ec/setresult.php?action=setlike&cli_id="+Ti.App.ccli_id + '&usr_id=' +Ti.App.cusr_id  + '&obj_id=' +obj_id;
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
    getlike(obj_id);
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
        Ti.App.fireEvent('cancelobj',{business:win.business,bid:win.bid,usr_id:win.usr_id,usr_email:win.usr_email});

    }
}
  
  };// end onload function
  
  request.send();
  

	
	
}

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
        Ti.App.fireEvent('cancelobj',{business:win.business,bid:win.bid,usr_id:win.usr_id,usr_email:win.usr_email});

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
 
 var typeData = [];
  var typeId = [];

 var typeImage = [];
 var resultLen;
 var lenRes;
 var nameArrayView=[];
 var result = [];
 var business= [];

  //var url ="http://amihud.com/ec/musrlogin.php?action=login&user="+phone+"&pass="+phone; 
  var url ="http://amihud.com/ec/getresult.php?action=getobjtype&usr_id="+usr_id;
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
   		typeData[i]=result[i].type;
   		typeId[i]=result[i].id;
   		typeImage[i]=result[i].image;
   		imageCollection[i]='http://amihud.com/ec/'+result[i].image;
       }
	for( pos=0; pos < lenRes; pos++){
		//var jpg='../images/business/stuffedbusiness.png';
		var jpg=imageCollection[pos];
		var container = pos;
		business.push({
				title:'' + typeData[pos] + '' ,
				id:'' + typeId[pos] + '' ,
				path:'' +  jpg + '' ,
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
	displayType(typeData[0],nameArrayView,business,usr_id,usr_email);
	getlike(business[0].id);
	getBasket();

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
	
	
function removeWinObj(){
win.remove(scrollView);
win.remove(businessTitleView);
win.remove(businessType);
win.remove(next);
win.remove(camera);
win.remove(list);


win.remove(basket);
win.remove(pType);
win.remove(like);
win.remove(likeTitle);
}	
	

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
			if (i < 20) { // only preload the first 3 images
				img.image = imageCollection[i];
				}
				
				
			
			view.add(img);
			viewCollection.push(view);
		}
		
scrollView.views = viewCollection;

/*
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
*/
//-- business title
var text = Ti.Locale.getString('Hello', 'i18nMissingMsg') + ' ' + Ti.App.ccli_name + ' '+ Ti.Locale.getString('ChooseType', 'i18nMissingMsg');

var businessTitle = Ti.UI.createLabel({
	text:text  ,
	font:{
		fontFamily:'Verdana',
		//fontWeight:'bold',
		fontSize:18
	},
	color:'black',
	shadowColor:'#333',
	shadowOffset:{x:1,y:1},
	textAlign:'center',
	width:Ti.App.SCREEN_WIDTH,
	height:Ti.App.TITLEVIEW * .75,
	left:1
});

var camera = Ti.UI.createButton({
	width:44,
	height:44,
	backgroundImage:'../images/camera-accept-icon.png',
	top:Ti.App.SCREEN_HEIGHT * .2,
	left:Ti.App.SCREEN_WIDTH * 0.85,
	opacity:0
});

var list = Ti.UI.createButton({
	width:44,
	height:44,
	backgroundImage:'../images/Images-icon.png',
	top:Ti.App.SCREEN_HEIGHT * .3,
	left:Ti.App.SCREEN_WIDTH * 0.85,
	opacity:0
});


var like = Ti.UI.createButton({
	width:44,
	height:44,
	backgroundImage:'../images/1384297379_facebook_likepx.png',
	top:Ti.App.SCREEN_HEIGHT * .2,
	left:Ti.App.SCREEN_WIDTH * 0.05,
	opacity:0
});




	likeTitle = Ti.UI.createLabel({
	font:{
		fontFamily:'Verdana',
		fontWeight:'bold',
		fontSize:Ti.App.SCREEN_HEIGHT/30
	},
	color:'white',
	shadowColor:'#333',
	shadowOffset:{x:1,y:1},
	textAlign:'lefe',
	//width:Ti.App.SCREEN_WIDTH,
//height:Ti.App.TITLEVIEW* 1/4,
	left:Ti.App.SCREEN_WIDTH * 0.05,
	top:Ti.App.SCREEN_HEIGHT * .28
});
//-- business title background
var businessTitleView = Ti.UI.createView({
	width:Ti.App.SCREEN_WIDTH,
	height:Ti.App.TITLEVIEW *.85,
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
		fontSize:24
	},
	color:'#fff',
	shadowColor:'#333',
	shadowOffset:{x:1,y:1},
	textAlign:'center',
	width:Ti.App.SCREEN_WIDTH,
	height:Ti.App.TITLEVIEW,
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
	width:44,
	height:44,
	backgroundImage:'../images/button_ok.png',
	top:Ti.App.SCREEN_HEIGHT * .9,
	left:Ti.App.SCREEN_WIDTH * 0.70,
	opacity:0
});


    basket = Ti.UI.createButton({
	width:44,
	height:44,
	backgroundImage:'../images/shopcartdown.png',
	top:Ti.App.SCREEN_HEIGHT * .9,
	left:Ti.App.SCREEN_WIDTH * 0.5,
	opacity:0
});


    history = Ti.UI.createButton({
	width:44,
	height:44,
	backgroundImage:'../images/iphone_shame.png',
	top:Ti.App.SCREEN_HEIGHT * .9,
	left:Ti.App.SCREEN_WIDTH * 0.3,
	opacity:0
});



var pType = Ti.UI.createButton({
	width:44,
	height:44,
	backgroundImage:'../images/button_blue_eject.png',
	top:Ti.App.SCREEN_HEIGHT * .9,
	left:Ti.App.SCREEN_WIDTH * 0.1,
	opacity:0
});



pType.addEventListener('click',function(e){
	
	
	var dialog = Ti.UI.createAlertDialog({
    cancel: 1,
    buttonNames: [Ti.Locale.getString('Yes', 'i18nMissingMsg'), Ti.Locale.getString('No', 'i18nMissingMsg')],
    message: Ti.Locale.getString('Doyouwanttoquit', 'i18nMissingMsg'),
    title: Ti.Locale.getString('Quit', 'i18nMissingMsg'),
  });
  dialog.addEventListener('click', function(d){
    if (d.index == 0){
      Ti.API.info('The ok button was clicked');
      removeWinObj();
      Ti.App.fireEvent('ptype',{	});
		
    }
   
  });
  dialog.show();
	
	//Ti.App.fireEvent('ptype',{	});
	
});

next.addEventListener('click',function(e){
	removeWinObj();
	next.enabled 		= false;

	Ti.App.fireEvent('obj',{
			business:business[scrollView.currentPage].title,
			path:business[scrollView.currentPage].path,
			bid:business[scrollView.currentPage].container,
			usr_email:usr_email,
			usr_id:usr_id
	});
	
});


camera.addEventListener('click',function(e){
	removeWinObj();
	camera.enabled 		= false;

	Ti.App.fireEvent('camera',{
			obj_id:business[scrollView.currentPage].id,
			cli_id:Ti.App.ccli_id,
			usr_id:Ti.App.cusr_id
	});
	
});


list.addEventListener('click',function(e){
    list.enabled 		= false;

	removeWinObj();

	Ti.App.fireEvent('photolist',{
			obj_id:business[scrollView.currentPage].id,
			cli_id:Ti.App.ccli_id,
			usr_id:Ti.App.cusr_id
	});
	
});





scrollView.addEventListener('click',function(e){
removeWinObj();

scrollView.enabled 		= false;
	
Ti.App.fireEvent('obj',{
	        
			business:business[scrollView.currentPage].title,
			path:business[scrollView.currentPage].path,
			bid:business[scrollView.currentPage].container,
			usr_email:usr_email,
			usr_id:usr_id
	});
	
	
});


basket.addEventListener('click',function(e){
	removeWinObj();
	basket.enabled 		= false;
	Ti.App.fireEvent('basket',{
		
			usr_email:usr_email,
			usr_id:usr_id
	});
	
});


history.addEventListener('click',function(e){
	removeWinObj();
	basket.enabled 		= false;
	Ti.App.fireEvent('cal',{
		
			cli_id:Ti.App.ccli_id,
			usr_id:Ti.App.cusr_id
	});
	
});


like.addEventListener('click',function(e){
	likeit(business[scrollView.currentPage].id);
	
});

win.add(scrollView);
win.add(businessTitleView);
win.add(businessType);
win.add(next);
win.add(history);


win.add(basket);
win.add(pType);
win.add(like);
win.add(likeTitle);
win.add(camera);
win.add(list);



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

basket.animate({
	opacity:1,
	duration:500
});

pType.animate({
	opacity:1,
	duration:500
});

like.animate({
	opacity:1,
	duration:500
});

history.animate({
	opacity:1,
	duration:500
});

list.animate({
	opacity:1,
	duration:500
});

camera.animate({
	opacity:1,
	duration:500
});
var currentTitle='';
//-- Changes the business type label text when the user scrolls
scrollView.addEventListener('scroll',function(e){
	    
	businessType.text = business[scrollView.currentPage].title;
	if(currentTitle == ''){
		 currentTitle = businessType.text;
		 getlike(business[scrollView.currentPage].id);
	}
	   
	else if(currentTitle != businessType.text){
		currentTitle = businessType.text;
		getlike(business[scrollView.currentPage].id);
	}

	
	
	
	/* if (scrollView.currentPage < (imageCollection.length-1)) {
var nxt = scrollView.currentPage+2; // get the 2nd next image (since the next one is already loaded)
scrollView.views[nxt].children[0].image = imageCollection[nxt];
}*/

});


}
