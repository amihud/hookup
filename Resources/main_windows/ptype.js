var win 			= Ti.UI.currentWindow;



//win.backgroundImage = '../images/bg_main.png';


	var imageCollection1 = [
'http://amihud.com/ec/images/hookey.jpg',
'http://amihud.com/ec/images/logo.JPG',
'http://amihud.com/ec/images/1000312_10151743449039710_5992176_n.jpg',
'http://amihud.com/ec/images/hookey.jpg'

];

var imageCollection=[];

//////////////
//alert(Titanium.App.getVersion());
start();

function start(){
 
 var typeData = [];
 var typeImage = [];
 var resultLen;
 var lenRes;
 var nameArrayView=[];
 var result = [];
 var type= [];

  //var url ="http://amihud.com/ec/musrlogin.php?action=login&user="+phone+"&pass="+phone; 
  var url ="http://www.amihud.com/ec/getresult.php?action=getusrtype";
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
   		typeImage[i]=result[i].image;
   		imageCollection[i]='http://amihud.com/ec/'+result[i].image;
       }
	for( pos=0; pos < lenRes; pos++){
		//var jpg='../images/type/stuffedtype.png';
		var jpg=imageCollection[pos];
		var container = pos;
		type.push({
				title:'' + typeData[pos] + '' ,
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
	
	/*
	for(var i = 0 ; i < lenRes; i++){
		nameArrayView.push(Ti.UI.createView({width:216,height:156,backgroundImage:'../images/type/hand.png'}));
	}
	*/
	displayType(typeData[0],nameArrayView,type);

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
}

  
  };
  

  request.send();
////////
//typeImage[i]
	request.onerror = function(event)
	{
var alertDialog = Titanium.UI.createAlertDialog({
			title: Ti.Locale.getString('InternetError', 'i18nMissingMsg'),
			message: event,
			buttonNames: [Ti.Locale.getString('OK', 'i18nMissingMsg')]
		});
		alertDialog.show();
		alertDialog.addEventListener('click',function(e)
		{
			Ti.App.fireEvent('ptype');
		});
		
	};
}

function displayType(firstType,nameArrayView,type){ 

var handMade 		= Ti.UI.createView({width:216,height:156,backgroundImage:'../images/type/hand.png'});
var natural 		= Ti.UI.createView({width:216,height:156,backgroundImage:'../images/type/natural.png'});
var pantype 		= Ti.UI.createView({width:216,height:156,backgroundImage:'../images/type/pan.png'});
var stuffedtype 	= Ti.UI.createView({width:216,height:156,backgroundImage:'../images/type/stuffedtype.png'});
var thinNCrispy 	= Ti.UI.createView({width:216,height:156,backgroundImage:'../images/type/thinNcrispy.png'});

var returntype;

//-- type reference


var type1		= [
			{title:'Hand Made',path:'../images/type/hand.png',container:1},
			{title:'Natural',path:'../images/type/natural.png',container:2},
			{title:'Pan type',path:'../images/type/pan.png',container:3},
			{title:'Stuffed type',path:'../images/type/stuffedtype.png',container:4},
			{title:'Thin N Crispy type',path:'../images/type/thinNcrispy.png',container:5}
];

/*
for(var i = 0 ; i < 4; i++){
	nameArrayView.push(Ti.UI.createView({width:216,height:156,backgroundImage:'../images/type/hand.png'}));
}


*/



///////////////////////////////////////////





//-- Our scroll view that contains our type views
var scrollView = Ti.UI.createScrollableView({
	//views:[handMade,natural,pantype,stuffedtype,thinNCrispy],
	
	//views:nameArrayView,
	showPagingControl:true,
	//clipViews:true,
	top:Ti.App.SCREEN_HEIGHT * .35,
	left:Ti.App.SCREEN_WIDTH * .05,
	right:30,
	height:160,
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
//-- If the window has the type property, that means we are coming from the provider window so choose the last know selected type
if (win.type)
{
	for (i = 0; i < type.length; i++)
	{
		if (win.type == type[i].title)
		{
			returntype = i;
			break;
		}
	}
	scrollView.scrollToView(returntype);
}

//-- type title
var typeTitle = Ti.UI.createLabel({
	
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

//-- type title background
var typeTitleView = Ti.UI.createView({
	width:Ti.App.SCREEN_WIDTH,
	height:Ti.App.TITLEVIEW,
	backgroundImage:'../images/typeHeaderBg.png',
	top:Ti.App.SCREEN_HEIGHT * .05,
//	left:1,
	opacity:0
});
typeTitleView.add(typeTitle);

//-- type type label
var typeType = Ti.UI.createLabel({
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

//alert(Ti.Platform.displayCaps.platformHeight);
//alert(Ti.Platform.displayCaps.platformWidth);



///- if returntype isn't null, set the type type label
if (returntype != null)
{
	typeType.text = type[returntype].title;
}

var left ;

if(Ti.Platform.osname == 'android')
  left = 345;
else
  left = 245;
//-- Next Button
var next = Ti.UI.createButton({
	width:64,
	height:64,
	backgroundImage:'../images/button_ok.png',
	top:Ti.App.SCREEN_HEIGHT * .8,
	left:Ti.App.SCREEN_WIDTH * 0.70,
	opacity:0
});


//-- Next Button
var about = Ti.UI.createButton({
	width:64,
	height:64,
	backgroundImage:'../images/iphone4_mini_white_08.png',
	top:Ti.App.SCREEN_HEIGHT * .8,
	left:Ti.App.SCREEN_WIDTH * 0.1,
	opacity:0
});

about.addEventListener('click',function(e){
	    about.enabled 		= false;

	
 var alrt_Sorry = Titanium.UI.createAlertDialog({
      title: Ti.Locale.getString('ver', 'i18nMissingMsg') + '\n Amihud kandisbrot cohen',
      message:Titanium.App.getVersion(),
      buttonNames: [Ti.Locale.getString('OK', 'i18nMissingMsg')]
      });
      alrt_Sorry.show();
      alrt_Sorry.addEventListener('click',function(e)
		{
        Ti.App.fireEvent('ptype',{});
		});
	 
	
	
	
});



//-- If android11 OS, use the image property instead of backgroundImage (Ti SDK bug)
if (Ti.Platform.osname == 'android1')
{
	next.image = '../images/button_ok.png';
}

next.addEventListener('click',function(e){
	
    next.enabled 		= false;
	Ti.App.fireEvent('provider',{
			title:type[scrollView.currentPage].title,
			path:type[scrollView.currentPage].path
			
	});
	
	
});


scrollView.addEventListener('click',function(e){
	

	Ti.App.fireEvent('provider',{
			title:type[scrollView.currentPage].title,
			path:type[scrollView.currentPage].path
			
	});
	
	
});

/////////////////


var adTitle = Ti.UI.createLabel({
	text:Ti.Locale.getString('ChooseType', 'i18nMissingMsg'),
	font:{
		fontFamily:'Verdana',
		fontWeight:'bold',
		fontSize:24
	},
	color:'#A90329',
	shadowColor:'#333',
	shadowOffset:{x:1,y:1},
	textAlign:'left',
	width:Ti.Platform.displayCaps.platformWidth,
	height:58,
	left:10
});

//-- Crust title background
var adTitleView = Ti.UI.createView({
	width:140,
	height:100,
	backgroundImage:'..images/default_image.png',
	top:Ti.App.SCREEN_HEIGHT * .80,
	left:Ti.App.SCREEN_WIDTH * 0.27,
	opacity:0
});

var adImg = Ti.UI.createImageView({
					maxZoomScale:5,
					defaultImage:'..images/default_image.png'
				});
	adImg.image = adImg.defaultImage;
		
	adTitleView.add(adImg);


adTitleView.add(adTitle);


/////////////////


////////////////////facebook ////////////

var bFacebook = false;
if(bFacebook){
var fb = require('facebook');
fb.appid = "469420066507590";
fb.permissions = ['publish_stream']; // Permissions your app needs
fb.forceDialogAuth = true;
fb.addEventListener('login', function(e) {
    if (e.success) {
        //alert('Logged In');
    } else if (e.error) {
        alert(e.error);
    } else if (e.cancelled) {
        alert("Canceled");
    }
});
fb.authorize();
        
}



win.add(scrollView);
win.add(typeTitleView);
win.add(typeType);
win.add(next);
win.add(about);
//win.add(Ti.App.time);

//amihud as option
//win.add(adTitleView);


adTitle.text = '2222';
//-- Fade the scrollview in
scrollView.animate({
	opacity:1,
	duration:500
});

//-- Fade the type title in
typeTitleView.animate({
	opacity:1,
	duration:500
});

typeType.animate({
	opacity:1,
	duration:500
});



//-- Fade the next button in
next.animate({
	opacity:1,
	duration:500
});

adTitleView.animate({
	opacity:1,
	duration:500
});

about.animate({
	opacity:1,
	duration:500
});


var  imageIn=[];


var imgLast = -1;

//-- Changes the type type label text when the user scrolls
scrollView.addEventListener('scroll',function(e){
	typeType.text = type[scrollView.currentPage].title;
	//img.image = imageCollection[scrollView.currentPage];
	
	
	        if(imgLast != -1)
				adImg.remove(imageIn[imgLast]);
			imgLast = scrollView.currentPage;
			imageIn[imgLast] = Utils.RemoteImage( {
 				image:type[imgLast].path,
  				defaultImage:'KS_nav_ui.png'
				});	 
			adImg.add(imageIn[imgLast]);
			//adTitle.text = typeType.text;
	
	
	
	/* if (scrollView.currentPage < (imageCollection.length-1)) {
var nxt = scrollView.currentPage+2; // get the 2nd next image (since the next one is already loaded)
scrollView.views[nxt].children[0].image = imageCollection[nxt];
}*/

});


var Utils = {
  /* modified version of https://gist.github.com/1243697 */
  _getExtension: function(fn) {
    // from http://stackoverflow.com/a/680982/292947
    var re = /(?:\.([^.]+))?$/;
    var tmpext = re.exec(fn)[1];
    return (tmpext) ? tmpext : '';
  },
  RemoteImage: function(a){
    a = a || {};
    var md5;
    var needsToSave = false;
    var savedFile;
    if(a.image){
      md5 = Ti.Utils.md5HexDigest(a.image)+this._getExtension(a.image);
      savedFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,md5);
      if(savedFile.exists()){
        a.image = savedFile;
      } else {
        needsToSave = true;
      }
    }
    var image = Ti.UI.createImageView(a);
    if(needsToSave === true){
      function saveImage(e){
        image.removeEventListener('load',saveImage);
        savedFile.write(
          Ti.UI.createImageView({image:image.image,width:'auto',height:'auto'}).toImage()
        );
      }
      image.addEventListener('load',saveImage);
    }
    return image;
  }
};
// example usage

// ads change via databsse , the ad will match the type of business

}




