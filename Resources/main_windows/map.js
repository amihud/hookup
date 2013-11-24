

var win 			= Ti.UI.currentWindow;


var longitude = 31.31;
var latitude =	34.34;


GetAllCliLocation(win.usr_id);

//-- Cancel Button
var cancel = Ti.UI.createButton({
	width:54,
	height:54,
	backgroundImage:'../images/button_previous_01.png',
	top:Ti.App.SCREEN_HEIGHT * .88,
	left:Ti.App.SCREEN_WIDTH * 0.1,
	opacity:0
});



cancel.addEventListener('click',function(e){
	cancel.enabled 		= false;
	win.remove(mapview);	


	Ti.App.fireEvent('endloginprovider',{usr_id:win.usr_id});
	
});

cancel.animate({
	opacity:1,
	duration:500
});

win.add(cancel);
var mapview;
function drawMap(){
	if (Ti.Geolocation.locationServicesEnabled) {
    	Ti.Geolocation.purpose = 'Get current location';
    	Ti.Geolocation.getCurrentPosition(function(e){
        	if(e.error) {
            	Ti.API.error('Error:' + e.error);
        	} else {
            	Ti.API.info(e.coords);
            	longitude = e.coords.longitude;
        		latitude = e.coords.latitude;
        		}
      
        
       		// call next function with current coords
       		 mapview = Titanium.Map.createView({
        	mapType: Titanium.Map.STANDARD_TYPE,
        	region:{latitude:latitude, longitude:longitude, latitudeDelta:1, longitudeDelta:1},
        	animate:true,
        	regionFit:true,
        	userLocation:true,
        	annotations:annoatationData,
        	top:Ti.App.SCREEN_HEIGHT * .01,
        	height:Ti.App.SCREEN_HEIGHT * .85
    		});  //create view
 
			win.add(mapview);	

		});// location service
	}//if
}

var annoatationData = [];
	   
function createAnnotations ()
{
  
   
    return annoatationData ;
}




function GetAllCliLocation(usr_id){
 


  var time_type = win.typeSearch;
  //var url ="http://amihud.com/ec/musrlogin.php?action=login&user="+phone+"&pass="+phone; 
  var url ="http://amihud.com/ec/getresult.php?action=getusrclilocation&usr_id="+usr_id + '&time_req='+time_type;
  //var url ="http://localhost:889/login.php?action=login&user="+user+"&pass="+pass; 

  var request =  Titanium.Network.createHTTPClient();;
  request.open("GET",url);
  

  request.onload = function(){
  var typeXP = [];
  var typeYP = [];
  var valColor;
 

  
   var json = this.responseText;
   if (json){
    try{
        result=JSON.parse(json);
  // result = JSON.parse(json);
    		//alert(result);
   //if(Ti.Platform.osname == 'android')
   

   lenRes = result[0].len;
 	for(var  i = 0 ; i < lenRes;i++){
 		var title;
 		if(result[i].val == '1'){
 			 title = usr_id;
 			 if(Ti.Platform.osname == 'android1' )
 			    valColor = "orange" ;
 			 else
 			  	valColor = Titanium.Map.ANNOTATION_RED;
 		}
 		else {
 			 title = 'other';
 		     if(Ti.Platform.osname == 'android1' )
 			    valColor = 'yellow';
 			 else
 			  	valColor = Titanium.Map.ANNOTATION_YELLOW;
 		}
 		var icolorpin = Titanium.Map.ANNOTATION_GREEN;
 		if(title == usr_id)
 			icolorpin = Titanium.Map.ANNOTATION_RED;
 		var mapView = Titanium.Map.createAnnotation(
            {

                latitude:result[i].xp,
                longitude:result[i].yp,
                title:title,
                subtitle:time_type,
                pincolor:icolorpin,
                animate:true,
                myid:i // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
            });
        annoatationData.push(mapView);
 		
   		typeXP[i]=result[i].xp;
   		typeYP[i]=result[i].yp;
   		}
	
	drawMap();

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


