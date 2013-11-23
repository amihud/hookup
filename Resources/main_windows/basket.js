//var win 		= Ti.UI.currentWindow;


var orderReq 	= Titanium.Network.createHTTPClient();

//alert(Ti.App.creq_id);
//alert(win.usr_id);


var win 		= Ti.UI.currentWindow;

//-- Scrollview for our obj list, maximum obj, numobj for reference
var scrollView	= Ti.UI.createScrollView();
var maxobj	= 100;
var numobj	= 0;
var gobjTitle;


getObjList();

function getObjList(){
	
var usr_id = win.usr_id;

 var objTopping = [];
 var objName = [];
 var objPrice = [];
 var objImage = [];
 var objId = [];
 var resultLen;
 var lenRes;
 var nameArrayView=[];
 var result = [];
 var obj= [];


  //var url ="http://amihud.com/ec/musrlogin.php?action=login&user="+phone+"&pass="+phone; 
  var url ="http://amihud.com/ec/getresult.php?action=morderlist&req_id="+Ti.App.creq_id+'&usr_id='+Ti.App.cusr_id;
  //var url ="http://localhost:889/login.php?action=login&user="+user+"&pass="+pass; 
  var request =  Titanium.Network.createHTTPClient();

  request.open("GET",url);
  
     if(Titanium.App.getPublisher() == 0)
        	alert(url);
  request.onload = function(){
  var arrData = [];
 
  
  

  
   var json = this.responseText;
   if (json){
    try{
        result=JSON.parse(json);
     
  
  
   //result = JSON.parse(json);
   lenRes = result[0].len;
   for(var  i = 0 ; i < lenRes;i++){
   		objName[i]=result[i].name;
   		objPrice[i]=result[i].price;
   		objImage[i]='http://amihud.com/ec/'+result[i].image;
   		objId[i] = result[i].id;
   		objTopping[i] = result[i].topping;
   		
   		
       }
	for( pos=0; pos < lenRes; pos++){
		var jpg=objImage[pos];
		var container = -1;
		var topping = objTopping[pos];
		var title=objName[pos]+ ' ' + objPrice[pos];
		var obj_id = objId[pos];
		obj.push({
				title:'' + title + '' ,
				topping:'' + topping + '' ,
				path:'' +  jpg + '' ,
				obj_id:'' +  obj_id + '' ,
				container:'' + container + ''});	
	}
	
	displayObj(obj);

    }catch(result){
    	
    	var alertDialog = Titanium.UI.createAlertDialog({
			title: Ti.Locale.getString('InternetError', 'i18nMissingMsg'),
			message: result,
			buttonNames: [Ti.Locale.getString('OK', 'i18nMissingMsg')]
		});
		alertDialog.show();
		alertDialog.addEventListener('click',function(e)
		{
		  Ti.App.fireEvent('cancelobj',{business:win.business,bid:win.bid,usr_id:win.usr_id,usr_email:win.usr_email});
		});
		      

    }
}


  
  };

  request.send();
////////
//typeImage[i]
}




function displayObj(obj){

//-- These are our obj. Title is the label, path is the image path and container will hold our view when it is selected
var obj1	= [
	{title:'Bacon Bits',path:'../images/obj/bacon_bits.png',container:null},
	{title:'Beef',path:'../images/obj/beef.png',container:null},
	{title:'Grilled Chicken',path:'../images/obj/grilled_chicken.png',container:null},
	{title:'Ham',path:'../images/obj/ham.png',container:null},
	{title:'Italian Sausage (Crumbled)',path:'../images/obj/italian_sausage_crumbled.png',container:null},
	{title:'Italian Sausage (Sliced)',path:'../images/obj/italian_sausage_sliced.png',container:null},
	{title:'Jalapenos',path:'../images/obj/jalapenos.png',container:null},
	{title:'Mushrooms',path:'../images/obj/mushrooms.png',container:null},
	{title:'Black Olives',path:'../images/obj/olives_black.png',container:null},
	{title:'Green Olives',path:'../images/obj/olives_green.png',container:null},
	{title:'Red Onions',path:'../images/obj/onions_red.png',container:null},
	{title:'White Onions',path:'../images/obj/onions_white.png',container:null},
	{title:'Pepperoni',path:'../images/obj/pepperoni.png',container:null},
	{title:'Banana Peppers',path:'../images/obj/peppers_banana.png',container:null},
	{title:'Green Peppers',path:'../images/obj/peppers_green.png',container:null},
	{title:'Red Peppers',path:'../images/obj/peppers_red.png',container:null},
	{title:'Pineapple',path:'../images/obj/pineapple.png',container:null},
	{title:'Pork',path:'../images/obj/pork.png',container:null},
	{title:'Diced Tomatoes',path:'../images/obj/tomatoes_diced.png',container:null},
	{title:'Marinated Tomatoes',path:'../images/obj/tomatoes_marinated.png',container:null},
	{title:'Roma Tomatoes',path:'../images/obj/tomatoes_roma.png',container:null}
];

//-- obj title

var color;
if(Ti.Platform.osname == 'android')
   color = 'black';
else
	color = 'white';
var lbl_Note = Titanium.UI.createLabel({
  text:Ti.Locale.getString('Note', 'i18nMissingMsg'),
  
  height:Ti.App.SCREEN_HEIGHT * .05,
  color:'white',
  font: {fontSize:20},
  fontWeight:'bold',
  textAlign:'right',
  left:1,
  top: Ti.App.SCREEN_HEIGHT * .15
});
var txt_Note = Titanium.UI.createTextField({
  width: Ti.App.SCREEN_WIDTH * .85,
  color: color,
 // paddingLeft: 5,
  border: 1,
  borderColor: "gray",
  borderRadius: 3,
  font:{fontSize:20},
  height: Ti.App.SCREEN_HEIGHT * .08,
  left:Ti.App.SCREEN_WIDTH * .15,
  top: Ti.App.SCREEN_HEIGHT * .15
});


var objTitle = Ti.UI.createLabel({
	text: Ti.Locale.getString('selectorderobj', 'i18nMissingMsg')  ,
	font:{
		fontFamily:'Verdana',
		fontWeight:'bold',
		fontSize:24
	},
	color:'#A90329',
	shadowColor:'#333',
	shadowOffset:{x:1,y:1},
	textAlign:'center',
	width:Ti.App.SCREEN_WIDTH,
	height:Ti.App.TITLEVIEW,
	left:1
});

gobjTitle = objTitle;
//-- obj title background
var objTitleView = Ti.UI.createView({
	width:Ti.App.SCREEN_WIDTH,
	height:Ti.App.TITLEVIEW,
	backgroundImage:'../images/businessHeaderBg.png',
	top:Ti.App.SCREEN_HEIGHT * .05,
//	left:1,
	opacity:0
});
objTitleView.add(objTitle);


//-- holds the ord image
var ord = Ti.UI.createView({
	top:Ti.App.SCREEN_HEIGHT * .60,
	width:114,
	height:114,
	//was 216
	//    156
	backgroundImage:win.path
});

var view = Ti.UI.createView({});
var img = Ti.UI.createImageView({
								maxZoomScale:5,
								defaultImage:'images/default_image.png'
			});
//img.image = win.path;
//kold web address image url
//alert(win.path); 
view.add(img);			
ord.add(view);
win.add(lbl_Note);
win.add(txt_Note);


//-- this will hold all the selected obj
var objHolder = Ti.UI.createView({
	//amihud 216 156
	width:114,
	height:114
});
ord.add(objHolder);
win.add(ord);
win.add(objTitleView);

//-- Details Button
var details = Ti.UI.createButton({
	width:64,
	height:64,
	backgroundImage:'../images/button_ok.png',
	top:Ti.App.SCREEN_HEIGHT * .8,
	left:Ti.App.SCREEN_WIDTH * 0.70,
	opacity:0
});


var history = Ti.UI.createButton({
	width:46,
	height:46,
	backgroundImage:'../images/iphone_shame.png',
	top:Ti.App.SCREEN_HEIGHT * .8,
	left:Ti.App.SCREEN_WIDTH * 0.45,
	opacity:0
});
//-- Cancel Button
var cancel = Ti.UI.createButton({
	width:64,
	height:64,
	backgroundImage:'../images/button_previous_01.png',
	top:Ti.App.SCREEN_HEIGHT * .8,
	left:Ti.App.SCREEN_WIDTH * 0.1,
	opacity:0
});

//-- If android1 OS, use the image property instead of backgroundImage (Ti SDK bug)
if (Ti.Platform.osname == 'android1')
{
	details.image = '../images/button_ok.png';
	cancel.image = '../images/button_previous_01.png';
	history.image = '../images/iphone_shame.png';
	ord.image = win.path;
}
else
{
	ord.opacity = 0;
}
win.add(details);
win.add(cancel);
win.add(history);


history.addEventListener('click',function(e){
	history.enabled 		= false;
	Ti.App.fireEvent('history');
	});

//-- Cancel click event goes back to the business window
cancel.addEventListener('click',function(e){
	cancel.enabled 		= false;
	Ti.App.fireEvent('resetApp');
	});

//-- Details click event, makes an array and fires the open details method in main.js
details.addEventListener('click',function(e){
	details.enabled 		= false;
	var ordInfo = [];
	var objId = [];
	var olen = obj.Length;
	var bFind=false;
	var note = txt_Note.value;
  
	for (var i = 0; i < obj.length; i++)
	{
		if (obj[i].container != -1)
		{
			ordInfo.push(obj[i].title);
			objId.push(obj[i].obj_id);
			bFind= true;
			//alert(obj[i].obj_id);
		}
	}
	if(bFind == true){
		//change setit to -1
		// change to correct name
		orderReq.open('POST','http://amihud.com/ec/submit_order.php');
		
		
		/*
		var params = {
			
			obj:ordInfo,
			obj_id: objId,
			req_id: Ti.App.creq_id,
			setit: -1,
			orderit: 1,
			usr_id: Ti.App.cusr_id,
			cli_id:Ti.App.ccli_id,
			note:note
			
		};
 		orderReq.send(params);
 		*/
		
		if (Ti.Platform.osname == 'android'){
	   		var params = {
			
			obj:    '{'+ ordInfo.toString()+ '}',
			obj_id: '{'+ objId.toString()+ '}',
			req_id: Ti.App.creq_id,
			cli_id: Ti.App.ccli_id,
			usr_id: Ti.App.cusr_id,
			
			ver:Titanium.App.getVersion(),
			device:Ti.Platform.osname,
			setit: -1,
			orderit: 1,
			note:note
		};
		orderReq.send(params);
	   }
	   else{
	   	
	   
		
		var params = {
			
			obj:ordInfo,
			obj_id: objId,
			req_id: Ti.App.creq_id,
			usr_id: Ti.App.cusr_id,
			cli_id: Ti.App.ccli_id,
			ver:Titanium.App.getVersion(),
			
			device:Ti.Platform.osname,
			setit: -1,
			orderit: 1,
			note:note
		};
		orderReq.send(params);
	}
		
		//Ti.App.fireEvent('resetApp');
	}
	else{
		alert(Ti.Locale.getString('Select', 'i18nMissingMsg'));	
		details.enabled 		= true;
	
	}
});



////
orderReq.onload = function()
{
	var response=[];
	var json = this.responseText;
	
	if (json){
    try{
        response=JSON.parse(json);
   
	// response = JSON.parse(json);
	
	
	
	//-- Mail was sent
	if (response[0].mail != 'false')
	{
		//Ti.App.creq_id = response[0].mail;
		
 		
		var alertDialog = Titanium.UI.createAlertDialog({
			title: response[0].mail,
			message: 'Your order has been submitted (check the email)',
			buttonNames: ['OK']
		});
		alertDialog.show();
		alertDialog.addEventListener('click',function(e)
		{
			// basket was fire create new req_id
			Ti.App.creq_id= -1234;

//-- Create the sub w
			Ti.App.fireEvent('resetApp');
		});	
	}
	else
	{
		//-- Mail failed
		alert(response.usr_email);
			var alertDialog = Titanium.UI.createAlertDialog({
			title: 'error',
			message: 'No  order',
			buttonNames: ['OK']
		});
		alertDialog.show();
		alertDialog.addEventListener('click',function(e)
		{
			Ti.App.fireEvent('resetApp');
		});
		
				
	}
	 }catch(response){
        var alertDialog = Titanium.UI.createAlertDialog({
			title: Ti.Locale.getString('InternetError', 'i18nMissingMsg'),
			message: response,
			buttonNames: [Ti.Locale.getString('OK', 'i18nMissingMsg')]
		});
		alertDialog.show();
		alertDialog.addEventListener('click',function(e)
		{
			Ti.App.fireEvent('resetApp');
		});

    

    }
}
};

//-- Network error
orderReq.onerror = function(event)
{
	 var alertDialog = Titanium.UI.createAlertDialog({
			title: Ti.Locale.getString('InternetError', 'i18nMissingMsg'),
			message: event,
			buttonNames: [Ti.Locale.getString('OK', 'i18nMissingMsg')]
		});
		alertDialog.show();
		alertDialog.addEventListener('click',function(e)
		{
			Ti.App.fireEvent('resetApp');
		});

};

////


//-- Fade the views and buttons in
objTitleView.animate({
	opacity:1,
	duration:500
});

ord.animate({
	opacity:1,
	duration:500
});

details.animate({
	opacity:1,
	duration:500
});

cancel.animate({
	opacity:1,
	duration:500
});

history.animate({
	opacity:1,
	duration:500
});



//-- This method toggles a obj item by checking the selected property
//- It will fade a new obj in and also remove a obj when it gets unchecked

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



var  imageIn=[];


function objListClick(e)
{
	if( obj[e.source.objID].topping == 1)
	    return;
	if (e.source.selected)
	{
		e.source.selected = false;
		e.source.backgroundImage = '../images/checkbox_no.png';

		numobj -= 1;
		if (obj[e.source.objID].container != -1)
		{
			objHolder.remove(obj[e.source.objID].container);
			obj[e.source.objID].container = -1;
			objHolder.remove(imageIn[e.source.objID]);

		}
	}
	else
	{
		//-- If numobj is less than maxobj, add the new obj else alert them
		if (numobj < maxobj)
		{
			e.source.selected = true;
			e.source.backgroundImage = '../images/checkbox_yes.png';
			imageIn[e.source.objID] = Utils.RemoteImage( {
 				image:obj[e.source.objID].path,
  				defaultImage:'KS_nav_ui.png'
  				
				});

			var aobj = Ti.UI.createView({
				image:imageIn[e.source.objID]
			});
			
			if (Ti.Platform.osname == 'android1')
			{
				aobj.image = obj[e.source.objID].path;
			}
			else
			{
				aobj.opacity = 0;
				aobj.animate({
					opacity:1,
					duration:500
				});
			}
			//amihud the image size is not correct
				//amihud the image size is not correct
			if(Ti.Platform.osname != 'android1'){
			    objHolder.add(imageIn[e.source.objID]);
				objHolder.add(aobj);
			}
			obj[e.source.objID].container = aobj;
			numobj += 1;
		}
		/*
		else
		{
			alert("Hang on there cowboy! Let's not get carried away with obj. " + numobj + " is the max.");
		}
		*/
	}
	    // need to check dose not work well
	    //gobjTitle.text = Ti.Locale.getString('selectorderobj', 'i18nMissingMsg')  + ' ' + numobj;

}

/*
This method creates the obj list. Since iOS doesn't have checkmark components, I made my own using a view, a button and swapping out the background image
*/
function createobjList()
{
	scrollView.opacity = 0;
	scrollView.top = Ti.App.SCREEN_HEIGHT * .22;
	scrollView.height =200 ;
	scrollView.contentWidth = Ti.App.SCREEN_WIDTH;
    scrollView.contentHeight = 'auto';
    scrollView.showVerticalScrollIndicator = true;
    win.add(scrollView);
    
    gobjTitle.text = Ti.Locale.getString('selectorderobj', 'i18nMissingMsg')  + ' ' + obj.length;

	for (i = 0; i < obj.length; i++)
	{
		//-- The label
		var objLabel = Ti.UI.createLabel({
			text:obj[i].title,
			font:{
				fontFamily:'Verdana',
				fontWeight:'bold',
				fontSize:24
			},
			color:'#fff',
			shadowColor:'#333',
			shadowOffset:{x:1,y:1},
			textAlign:'left',
			width:Ti.App.SCREEN_WIDTH * .75,
			left:1
		});
		
		//-- We add a custom property 'selected' to our checkbox view
		var checkbox = Ti.UI.createView({
			width:70,
			height:51,
			left:Ti.App.SCREEN_WIDTH * .80,
			backgroundImage:'../images/checkbox_no.png',
			selected:false,
			objID:i
		});
		
		//-- if the user hits cancel in the details window, we go back and repopulate the list with previously checked obj
		//if (win.returnobj)
		{                   //win.returnobj.length
			
			
			for (j = 0; j < obj.length; j++)  			{
			//	if (win.returnobj[j] == obj[i].title)
				{
					
				imageIn[i] = Utils.RemoteImage( {
 				image:obj[i].path,
  				defaultImage:'KS_nav_ui.png'
  				
				});

					var aobj = Ti.UI.createView({
						//backgroundImage:obj[i].path
						image:imageIn[i]

					});
					
					if (Ti.Platform.osname == 'android1')
					{
						aobj.image = obj[i].path;
					}
					else
					{
						aobj.opacity = 0;
						aobj.animate({
							opacity:1,
							duration:500
						});
					}
					
						
					if(Ti.Platform.osname != 'android1'){
			    		objHolder.add(imageIn[i]);
						objHolder.add(aobj);
					}
					obj[i].container = aobj;
					checkbox.backgroundImage = '../images/checkbox_yes.png';
					checkbox.selected = true;
					numobj += 1;
				}
			}
		}
		
		var toggler = Ti.UI.createView({
			width:Ti.Platform.displayCaps.platformWidth,
			height:50,
			top: i * 50
		});
		
		//-- We use the singletap event rather than the click since its in a scroll view
		checkbox.addEventListener('singletap',objListClick);
		toggler.add(objLabel);
		toggler.add(checkbox);
		
		scrollView.add(toggler);
	}
	scrollView.animate({
		opacity:1,
		duration:500
	});
}
createobjList();
}

