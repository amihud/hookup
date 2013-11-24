
var win 		= Ti.UI.currentWindow;


var orderReq 	= Titanium.Network.createHTTPClient();


//-- Scrollview for our obj list, maximum obj, numobj for reference
var scrollView	= Ti.UI.createScrollView();
var maxobj	= 6;
var numobj	= 0;
var cli_id=-1;
var note=-1;



getObjList();

function getObjList(){
	
var usr_id = win.usr_id;
var req_id = win.req_id;
var pkg = win.pkg;

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
 var objCount= [];
 

  //var url ="http://amihud.com/ec/musrlogin.php?action=login&user="+phone+"&pass="+phone; 
  var url ="http://amihud.com/ec/getresult.php?action=getobj4sale&usr_id="+usr_id+'&req_id='+req_id+'&pkg='+pkg;
  //var url ="http://localhost:889/login.php?action=login&user="+user+"&pass="+pass; 
  var request =  Titanium.Network.createHTTPClient();;
  request.open("GET",url);
  

  request.onload = function(){
  var arrData = [];
 
  
  

  
   var json = this.responseText;
   if (json){
    try{
        result=JSON.parse(json);
        if(Titanium.App.getPublisher() == 0)
        	alert(result);
  
   //result = JSON.parse(json);
   lenRes = result[0].len;
   for(var  i = 0 ; i < lenRes;i++){
   		objName[i]=result[i].name;
   		objPrice[i]=result[i].price;
   		objImage[i]='http://amihud.com/ec/'+result[i].image;
   		objId[i] = result[i].id;
   		objCount[i] = result[i].count;
   		objTopping[i] = result[i].topping;
   		if(cli_id == -1)
   			cli_id = result[i].cli_id;
   		if(note == -1 && result[i].note != '')
   		    note = result[i].note;
   		
   		
       }
	for( pos=0; pos < lenRes; pos++){
		var jpg=objImage[pos];
		var container = -1;
		var topping = objTopping[pos];
		var title=objName[pos]+ ' ' + objPrice[pos];
		var obj_id = objId[pos];
		var count = objCount[pos];
		obj.push({
				title:'' + title + '' ,
				topping:'' + topping + '' ,
				path:'' +  jpg + '' ,
				obj_id:'' +  obj_id + '' ,
				pkg:pkg,
				count:count,
			
				container:'' + container + ''});	
	}
	
	displayObj(obj);

   }catch(result){

var alertDialog = Titanium.UI.createAlertDialog({
			title: Ti.Locale.getString('InternetError', 'i18nMissingMsg'),
			message:result,
			buttonNames: [Ti.Locale.getString('OK', 'i18nMissingMsg')]
		});
		alertDialog.show();
		alertDialog.addEventListener('click',function(e)
		{
        Ti.App.fireEvent('endloginprovider',{usr_id:win.usr_id});
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


var objTitle = Ti.UI.createLabel({
	text: win.business ,
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
	height:114
	//backgroundImage:win.path
});
//-- obj title
/*
var objTitle = Ti.UI.createLabel({
	text: win.business ,
	font:{
		fontFamily:'Verdana',
		fontWeight:'bold',
		fontSize:22
	},
	color:'#A90329',
	shadowColor:'#333',
	shadowOffset:{x:1,y:1},
	textAlign:'center',
	width:Ti.Platform.displayCaps.platformWidth,
	height:58,
	left:10
});

//-- obj title background
var objTitleView = Ti.UI.createView({
	width:328,
	height:58,
	backgroundImage:'../images/businessHeaderBg.png',
	top:100,
	left:-6,
	opacity:0
});
objTitleView.add(objTitle);


//-- holds the ord image
var ord = Ti.UI.createView({
	top:270,
	width:216,
	height:156,
	backgroundImage:win.path
});

*/




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

//-- this will hold all the selected obj
var objHolder = Ti.UI.createView({
	//amihud 216
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
	details.image = '../images/details.png';
	cancel.image = '../images/cancel.png';
	ord.image = win.path;
}
else
{
	ord.opacity = 0;
}
win.add(details);
win.add(cancel);

//-- Cancel click event goes back to the business window
cancel.addEventListener('click',function(e){
	Ti.App.fireEvent('order',{usr_id:win.usr_id,typeSearch:win.typeSearch});
});

//-- Details click event, makes an array and fires the open details method in main.js
details.addEventListener('click',function(e){
	var ordInfo = [];

	var objCount = [];
	var objId = [];
	
	var olen = obj.Length;
	var bFind=false;
	var pkgObj;
	
	for (var i = 0; i < obj.length; i++)
	{
		
		if (obj[i].container != -1)
		{
			ordInfo.push(obj[i].title);
			objId.push(obj[i].obj_id);
			objCount.push(obj[i].count);
			pkgObj= obj[i].pkg;

			bFind= true;
			//alert(obj[i].obj_id);
		}
	}
	if(bFind == true)
	    mordSend(ordInfo,objId,objCount,pkgObj);
	//	Ti.App.fireEvent('details',{business:win.business,path:win.path ,bid:win.bid ,usr_id:win.usr_id,usr_email:win.usr_email ,obj:ordInfo,obj_id:objId});
	else
		alert(Ti.Locale.getString('Select', 'i18nMissingMsg'));	
});

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

//-- This method toggles a obj item by checking the selected property
//- It will fade a new obj in and also remove a obj when it gets unchecked
function objListClick(e)
{
	if( obj[e.source.objID].topping == 1)
	    return;
	if (e.source.selected  )
	{
		e.source.selected = false;
		e.source.backgroundImage = '../images/checkbox_no.png';

		numobj -= 1;
		if (obj[e.source.objID].container != -1)
		{
			objHolder.remove(obj[e.source.objID].container);
			obj[e.source.objID].container = -1;
		}
	}
	else
	{
		//-- If numobj is less than maxobj, add the new obj else alert them
		if (numobj < maxobj)
		{
			e.source.selected = true;
			e.source.backgroundImage = '../images/checkbox_yes.png';

			var aobj = Ti.UI.createView({
				backgroundImage:obj[e.source.objID].path
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
			if(Ti.Platform.osname != 'android')
				objHolder.add(aobj);
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
}

/*
This method creates the obj list. Since iOS doesn't have checkmark components, I made my own using a view, a button and swapping out the background image
*/
function createobjList()
{
	/////////////
	if(note != '-1')
		objTitle.text = note;
	
	/////////////
	
	scrollView.opacity = 0;
	scrollView.top = Ti.App.SCREEN_HEIGHT * .20;
	scrollView.height =200 ;
	scrollView.contentWidth = Ti.App.SCREEN_WIDTH;
    scrollView.contentHeight = 'auto';
    scrollView.showVerticalScrollIndicator = true;
    win.add(scrollView);

	for (i = 0; i < obj.length; i++)
	{
		//-- The label
		var objLabel = Ti.UI.createLabel({
			text:obj[i].title,
				font:{
				fontFamily:'Verdana',
				fontWeight:'bold',
				fontSize:22
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
			width:50,
			height:31,
			left:Ti.App.SCREEN_WIDTH * .80,
			backgroundImage:'../images/checkbox_no.png',
			selected:false,
			objID:i
		});
		
		/////
		
		
		
		
		//	for (j = 0; j < obj.length; j++)
			{
				if (obj[i].topping == 1)
				{
					var aobj = Ti.UI.createView({
						backgroundImage:obj[i].path
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
					objHolder.add(aobj);
					obj[i].container = aobj;
					checkbox.backgroundImage = '../images/checkbox_yes.png';
					checkbox.selected = true;
					numobj += 1;
				}
			}
	
		
		/////
		/*
		//-- if the user hits cancel in the details window, we go back and repopulate the list with previously checked obj
		if (win.returnobj)
		{
			for (j = 0; j < win.returnobj.length; j++)
			{
				if (win.returnobj[j] == obj[i].title)
				{
					var aobj = Ti.UI.createView({
						backgroundImage:obj[i].path
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
					objHolder.add(aobj);
					obj[i].container = aobj;
					checkbox.backgroundImage = '../images/checkbox_yes.png';
					checkbox.selected = true;
					numobj += 1;
				}
			}
		}
		*/
		var toggler = Ti.UI.createView({
			width:Ti.App.SCREEN_WIDTH,
			height:30,
			top: i * 30
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





function mordSend(ordInfo,objId,objCount,pkg){
		var setit = 1;
		var orderit = 2;
		var done = 1;
		//-- Disable fields and buttons before making are http request
	 
		//-- URL to submit_order.php
		//orderReq.open('POST','http://localhost:889/submit_order.php');
		orderReq.open('POST','http://amihud.com/ec/mordersetit.php');
		
		 
			
	   if (Ti.Platform.osname == 'android'){
	   		var params = {
			obj_id: '{'+ objId.toString()+ '}',
			req_id: win.req_id,
			usr_id: win.usr_id,
			cli_id:cli_id,
			note:note,
			pkg:pkg,
			count:'{'+ objCount.toString()+ '}',
			device:Ti.Platform.osname
			
			
		};
		orderReq.send(params);
	   }
	   else{
	   	
	   
		
		var params = {
			
			obj_id: objId,
			req_id: win.req_id,
			usr_id: win.usr_id,
			cli_id:cli_id,
			note:note,
			pkg:pkg,
			count:objCount,
			device:Ti.Platform.osname
		
		};
		orderReq.send(params);
	}
		if (Ti.Platform.osname == 'android'){
			//orderReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				//orderReq.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
		}
		
		
	}


//-- onLoad method for our http request
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
		
		Ti.App.creq_id = response[0].mail;
		//Ti.API.info(response[0].sql);
		
		var alertDialog = Titanium.UI.createAlertDialog({
			title: response[0].mail,
			message: Ti.Locale.getString('RequestSend', 'i18nMissingMsg'),
			buttonNames: ['OK']
		});
		alertDialog.show();
		alertDialog.addEventListener('click',function(e)
		{
        Ti.App.fireEvent('order',{usr_id:win.usr_id,typeSearch:win.typeSearch});
        
   
		});	
	}
	else
		{
		//-- Mail failed
		alert(response.usr_email);
	
			
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
        Ti.App.fireEvent('order',{usr_id:win.usr_id,typeSearch:win.typeSearch});
		});	
       
    }
}

	
};

