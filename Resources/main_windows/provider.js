var win 		= Ti.UI.currentWindow;

//-- Scrollview for our provider list, maximum provider, numprovider for reference
var scrollView	= Ti.UI.createScrollView();
var maxprovider	= 1;
var numprovider	= 0;


getproviderList();

function getproviderList(){

  
 var providerName = [];
 var providerImage = [];
 var providerId = [];
 var providerEmail = [];
 var resultLen;
 var lenRes;
 var nameArrayView=[];
 var result = [];
 var provider= [];

  //var url ="http://amihud.com/ec/musrlogin.php?action=login&user="+phone+"&pass="+phone; 
  var url ="http://amihud.com/ec/getresult.php?action=getprovider&type="+win.type;
  //var url ="http://localhost:889/login.php?action=login&user="+user+"&pass="+pass; 
  var request =  Titanium.Network.createHTTPClient();;
  request.open("GET",url);
   if(Titanium.App.getPublisher() == 0)
        	alert(url);
        	
  

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
   		providerName[i]=result[i].name;
   		providerImage[i]='http://amihud.com/ec/'+result[i].image;
   		providerId[i] = result[i].id;
   		providerEmail[i] = result[i].email;

   		
   		
   		
       }
	for( pos=0; pos < lenRes; pos++){
		var jpg=providerImage[pos];
		var container = -1;
		var title=providerName[pos];
		var provider_id = providerId[pos];
		var provider_email = providerEmail[pos];
		provider.push({
				title:'' + title + '' ,
				path:'' +  jpg + '' ,
				provider_id:'' +  provider_id + '' ,
				provider_email:'' +  provider_email + '' ,
				container:'' + container + ''});	
	}
	displayprovider(provider);

   }catch(eresult){
       var alertDialog = Titanium.UI.createAlertDialog({
			title: Ti.Locale.getString('InternetError', 'i18nMissingMsg'),
			message: result,
			buttonNames: [Ti.Locale.getString('OK', 'i18nMissingMsg')]
		});
		alertDialog.show();
		alertDialog.addEventListener('click',function(e)
		{
			Ti.App.fireEvent('ptype',{type:win.type,path:win.path});
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
			Ti.App.fireEvent('ptype',{type:win.type,path:win.path});
		});

	
};
}




function displayprovider(provider){
	
 
//-- These are our provider. Title is the label, path is the image path and container will hold our view when it is selected
var provider1	= [
	{title:'Bacon Bits',path:'../images/provider/bacon_bits.png',container:null},
	{title:'Beef',path:'../images/provider/beef.png',container:null},
	{title:'Grilled Chicken',path:'../images/provider/grilled_chicken.png',container:null},
	{title:'Ham',path:'../images/provider/ham.png',container:null},
	{title:'Italian Sausage (Crumbled)',path:'../images/provider/italian_sausage_crumbled.png',container:null},
	{title:'Italian Sausage (Sliced)',path:'../images/provider/italian_sausage_sliced.png',container:null},
	{title:'Jalapenos',path:'../images/provider/jalapenos.png',container:null},
	{title:'Mushrooms',path:'../images/provider/mushrooms.png',container:null},
	{title:'Black Olives',path:'../images/provider/olives_black.png',container:null},
	{title:'Green Olives',path:'../images/provider/olives_green.png',container:null},
	{title:'Red Onions',path:'../images/provider/onions_red.png',container:null},
	{title:'White Onions',path:'../images/provider/onions_white.png',container:null},
	{title:'Pepperoni',path:'../images/provider/pepperoni.png',container:null},
	{title:'Banana Peppers',path:'../images/provider/peppers_banana.png',container:null},
	{title:'Green Peppers',path:'../images/provider/peppers_green.png',container:null},
	{title:'Red Peppers',path:'../images/provider/peppers_red.png',container:null},
	{title:'Pineapple',path:'../images/provider/pineapple.png',container:null},
	{title:'Pork',path:'../images/provider/pork.png',container:null},
	{title:'Diced Tomatoes',path:'../images/provider/tomatoes_diced.png',container:null},
	{title:'Marinated Tomatoes',path:'../images/provider/tomatoes_marinated.png',container:null},
	{title:'Roma Tomatoes',path:'../images/provider/tomatoes_roma.png',container:null}
];

//-- provider title

var providerTitle = Ti.UI.createLabel({
	text: Ti.Locale.getString('ChooseProvider', 'i18nMissingMsg') + win.type,
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

//-- provider title background
var providerTitleView = Ti.UI.createView({
	width:Ti.App.SCREEN_WIDTH,
	height:Ti.App.TITLEVIEW,
	backgroundImage:'../images/typeHeaderBg.png',
	top:Ti.App.SCREEN_HEIGHT * .05,
//	left:1,
	opacity:0
});
providerTitleView.add(providerTitle);


//-- holds the ord image
var ord = Ti.UI.createView({
	top:Ti.App.SCREEN_HEIGHT * .60,
	width:114,
	height:114
	//backgroundImage:win.path
});

/*
var view = Ti.UI.createView({});
var img = Ti.UI.createImageView({
								maxZoomScale:1,
								defaultImage:'images/default_image.png'
			});
img.image = win.path;
//kold web address image url
//alert(win.path); 


view.add(img);			
ord.add(view);
*/

//-- this will hold all the selected provider
var providerHolder = Ti.UI.createView({
	//amihud 216
	width:114,
	height:114
	
});
//ord.add(providerHolder);
ord.add(providerHolder);
win.add(ord);
win.add(providerTitleView);

//-- Details Button
var login = Ti.UI.createButton({
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
	login.image = '../images/details.png';
	cancel.image = '../images/cancel.png';
}


win.add(login);
win.add(cancel);

//-- Cancel click event goes back to the type window
cancel.addEventListener('click',function(e){
	cancel.enabled 		= false;
	Ti.App.fireEvent('ptype',{});
});

//-- Details click event, makes an array and fires the open details method in main.js
login.addEventListener('click',function(e){
	var ordInfo ;
	var providerId ;
	var providerEmail ;
	var olen = provider.Length;
	var bFind=false;
	login.enabled 		= false;
	
	for (var i = 0; i < provider.length; i++)
	{
		if (provider[i].container != -1)
		{
			ordInfo    = provider[i].title;
			providerEmail   = provider[i].provider_email;
			providerId = provider[i].provider_id;
			providerHolder.remove(imageIn[i]);
			bFind= true;
			//alert(provider[i].provider_id);
		}
	}
	if(bFind == true ){
		win.remove(scrollView);
		win.remove(ord);
		Ti.App.fireEvent('login',{usr_name:ordInfo,usr_id:providerId,usr_email:providerEmail});
		}
	else{
				alert(Ti.Locale.getString('Selectprovider', 'i18nMissingMsg') );
				login.enabled 		= true;
			}
});

//-- Fade the views and buttons in
providerTitleView.animate({
	opacity:1,
	duration:500
});


login.animate({
	opacity:1,
	duration:500
});

cancel.animate({
	opacity:1,
	duration:500
});

ord.animate({
	opacity:1,
	duration:500
});
//-- This method toggles a provider item by checking the selected property
//- It will fade a new provider in and also remove a provider when it gets unchecked



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


var  imageIn=[];

function providerListClick(e)
{
	if (e.source.selected)
	{
		e.source.selected = false;
		e.source.backgroundImage = '../images/checkbox_no.png';
        
		numprovider -= 1;
		if (provider[e.source.providerID].container != -1)
		{
			//amihud providerHolder
			providerHolder.remove(provider[e.source.providerID].container);
			provider[e.source.providerID].container = -1;
			providerHolder.remove(imageIn[e.source.providerID]);
		}
	}
	else
	{
		//-- If numprovider is less than maxprovider, add the new provider else alert them
		if (numprovider < maxprovider)
		{
			e.source.selected = true;
			e.source.backgroundImage = '../images/checkbox_yes.png';
		
            imageIn[e.source.providerID] = Utils.RemoteImage( {
 				image:provider[e.source.providerID].path,
  				defaultImage:'KS_nav_ui.png'
  				
				});

       
			var aprovider = Ti.UI.createView({
				
			// backgroundImage:image   
				//backgroundImage:imageIn[e.source.providerID].path,
		        image : imageIn[e.source.providerID].path

			});
			
			if (Ti.Platform.osname == 'android1')
			{
				aprovider.image = imageIn[e.source.providerID].path;
			}
			else
			{
				aprovider.opacity = 0;
				aprovider.animate({
					opacity:1,
					duration:500
				});
			}
			//amihud the image size is not correct
			
			//amihud providerHolder
			//kold web address image url
			//alert(win.path); 


         
			
			if(Ti.Platform.osname != 'android1'){
			    providerHolder.add(imageIn[e.source.providerID]);
				providerHolder.add(aprovider);
			}
			provider[e.source.providerID].container = aprovider;
			numprovider += 1;
		}
		/*
		else
		{
			alert("Hang on there cowboy! Let's not get carried away with provider. " + numprovider + " is the max.");
		}
		*/
	}
}

/*
This method creates the provider list. Since iOS doesn't have checkmark components, I made my own using a view, a button and swapping out the background image
*/
function createproviderList()
{
	scrollView.opacity = 0;
	scrollView.top = Ti.App.SCREEN_HEIGHT * .20;
	scrollView.height = 200;
	scrollView.contentWidth = Ti.App.SCREEN_WIDTH;
    scrollView.contentHeight = 'auto';
    scrollView.showVerticalScrollIndicator = true;
    win.add(scrollView);

	for (i = 0; i < provider.length; i++)
	{
		//-- The label
		var providerLabel = Ti.UI.createLabel({
			text:provider[i].title,
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
			providerID:i
		});
		
		//-- if the user hits cancel in the details window, we go back and repopulate the list with previously checked provider
		/*
		if (win.returnprovider)
		{
			for (j = 0; j < win.returnprovider.length; j++)
			{
				if (win.returnprovider[j] == provider[i].title)
				{
					var aprovider = Ti.UI.createView({
						backgroundImage:provider[i].path
					});
					
					if (Ti.Platform.osname == 'android1')
					{
						aprovider.image = provider[i].path;
					}
					else
					{
						aprovider.opacity = 0;
						aprovider.animate({
							opacity:1,
							duration:500
						});
					}
					providerHolder.add(aprovider);
					provider[i].container = aprovider;
					checkbox.backgroundImage = '../images/checkbox_yes.png';
					checkbox.selected = true;
					numprovider += 1;
				}
			}
		}
		*/
		var toggler = Ti.UI.createView({
			width:Ti.App.SCREEN_WIDTH,
			height:50,
			top: i * 50
		});
		
		//-- We use the singletap event rather than the click since its in a scroll view
		checkbox.addEventListener('singletap',providerListClick);
		toggler.add(providerLabel);
		toggler.add(checkbox);
		
		scrollView.add(toggler);
	}
	scrollView.animate({
		opacity:1,
		duration:500
	});
}
createproviderList();
}