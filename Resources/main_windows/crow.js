

var WindowWidth = Ti.Platform.displayCaps.platformWidth; 
var WindowHeight = Ti.Platform.displayCaps.platformHeight;


Titanium.UI.currentWindow.title = 'Title';


///
 var CustomData= [];




var win = Titanium.UI.currentWindow;
 

var pReturn = Ti.UI.createButton({
	width:46,
	height:46,
	backgroundImage:'../images/button_previous_01.png',
	top:Ti.App.SCREEN_HEIGHT * .90,
	left:Ti.App.SCREEN_WIDTH * 0.05,
	opacity:0
});

pReturn.addEventListener('click', function(e)
{
	    
        Ti.App.fireEvent('basket');

        
      // Titanium.UI.currentTab.open(newWindow);    
});


var pCal = Ti.UI.createButton({
	width:46,
	height:46,
	backgroundImage:'../images/button_previous_01.png',
	top:Ti.App.SCREEN_HEIGHT * .90,
	left:Ti.App.SCREEN_WIDTH * 0.25,
	opacity:0
});

pCal.addEventListener('click', function(e)
{
	    
        Ti.App.fireEvent('cal',{usr_id:win.usr_id,cli_id:win.cli_id});

        
      // Titanium.UI.currentTab.open(newWindow);    
});


var objTitle = Ti.UI.createLabel({
	text: Ti.Locale.getString('ObjType', 'i18nMissingMsg')  ,
	font:{
		fontFamily:'Verdana',
		fontWeight:'bold',
		fontSize:22
	},
	color:'white',
	shadowColor:'#333',
	shadowOffset:{x:1,y:1},
	textAlign:'center',
	top:Ti.App.SCREEN_HEIGHT * .05,
	width:Ti.App.SCREEN_WIDTH,
	height:Ti.App.TITLEVIEW,
	left:1
});





var tableview = Titanium.UI.createTableView({
	
	top:Ti.App.SCREEN_HEIGHT * .15,
	height:Ti.App.SCREEN_HEIGHT * .75

	
	
	});


getObjList();

function getObjList(){
	
var usr_id = Ti.App.cusr_id;
var cli_id = Ti.App.ccli_id;

 var objCount = [];

 var objName = [];
 var objPrice = [];
 var objImage = [];
 var objId = [];
 var resultLen;
 var lenRes;
 var nameArrayView=[];
 var result = [];

  //var url ="http://amihud.com/ec/musrlogin.php?action=login&user="+phone+"&pass="+phone; 
  var url ="http://amihud.com/ec/getresult.php?action=clihistory&usr_id="+usr_id+'&cli_id='+cli_id;
  //var url ="http://localhost:889/login.php?action=login&user="+user+"&pass="+pass; 
  var request =  Titanium.Network.createHTTPClient();;
  request.open("GET",url);
  request.send();


  
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
   		objCount[i]=result[i].cid;
   		objImage[i]='http://amihud.com/ec/'+result[i].image;
   		objId[i] = result[i].id;
   		
   		
       }
       
	for( pos=0; pos < lenRes; pos++){
		var jpg=objImage[pos];
		var container = -1;
		var title=objName[pos];
		var price=objPrice[pos];
		var count=objCount[pos];
		var obj_id = objId[pos];
		CustomData.push({
			    hasChild:true,
			    pos:pos,
				name:'' + title + '' ,
				price:'' + price + '' ,
				count:'' + count + '' ,
				image:'' +  jpg + '' ,
				obj_id:'' +  obj_id + '' ,
				container:'' + container + ''});

	}
	displayHistory();
	
	//displayObj(obj);

   }catch(result){

var alertDialog = Titanium.UI.createAlertDialog({
			title: Ti.Locale.getString('InternetError', 'i18nMissingMsg'),
			message: result,
			buttonNames: [Ti.Locale.getString('OK', 'i18nMissingMsg')]
		});
		alertDialog.show();
		alertDialog.addEventListener('click',function(e)
		{
        Ti.App.fireEvent('basket',{});
		});

    }
}
  
  };
  
 
////////
//typeImage[i]
}




var CustomData1 = [
{ flag:'assets/es.png', country:"United States", trend:'assets/up.png', percent: 'assets/level0.png', hasChild:true, link: 'tutorials/dof_deep.js'},
{ flag:'assets/fr.png', country:"United States", trend:'assets/up.png', percent: 'assets/level1.png', hasChild:true, link: 'tutorials/dof_deep.js'},
{ flag:'assets/gb.png', country:"United States", trend:'assets/up.png', percent: 'assets/level2.png', hasChild:true, link: 'tutorials/dof_deep.js'},
{ flag:'assets/es.png', country:"United States", trend:'assets/up.png', percent: 'assets/level0.png', hasChild:true, link: 'tutorials/dof_deep.js'},
{ flag:'assets/fr.png', country:"United States", trend:'assets/up.png', percent: 'assets/level1.png', hasChild:true, link: 'tutorials/dof_deep.js'},
{ flag:'assets/gb.png', country:"United States", trend:'assets/up.png', percent: 'assets/level2.png', hasChild:true, link: 'tutorials/dof_deep.js'},
{ flag:'assets/es.png', country:"United States", trend:'assets/up.png', percent: 'assets/level0.png', hasChild:true, link: 'tutorials/dof_deep.js'},
{ flag:'assets/fr.png', country:"United States", trend:'assets/up.png', percent: 'assets/level1.png', hasChild:true, link: 'tutorials/dof_deep.js'},
{ flag:'assets/gb.png', country:"United States", trend:'assets/up.png', percent: 'assets/level2.png', hasChild:true, link: 'tutorials/dof_deep.js'},

{ flag:'assets/es.png', country:"United States", trend:'assets/up.png', percent: 'assets/level0.png', hasChild:true, link: 'tutorials/dof_deep.js'},
{ flag:'assets/fr.png', country:"United States", trend:'assets/up.png', percent: 'assets/level1.png', hasChild:true, link: 'tutorials/dof_deep.js'},
{ flag:'assets/gb.png', country:"United States", trend:'assets/up.png', percent: 'assets/level2.png', hasChild:true, link: 'tutorials/dof_deep.js'},
{ flag:'assets/us.png', country:"United States", trend:'assets/up.png', percent: 'assets/level0.png', hasChild:true, link: 'tutorials/dof_deep.js'}

];

function displayHistory(){

var data=[];
for (var i = CustomData.length - 1; i >= 0; i--){

	var row = Titanium.UI.createTableViewRow({
        hasChild: true,
        height: 'auto'
    });
	var image =  Titanium.UI.createImageView({
		image:CustomData[i].image,
		width:44,
		height:44,
		left:4,
		top:2
	});

	var name = Titanium.UI.createLabel({
		text:CustomData[i].name,
		font:{fontSize:16,fontWeight:'bold'},
		width:'auto',
		textAlign:'right',
		top:2,
		left:50,
		height:16
	});

	var price =  Titanium.UI.createLabel({
        text:CustomData[i].price,
        top: 40,
        left: 72,
        width: 80,
        height: 16,
        bottom: 5
	});



    row.add(name);
	row.add(image);

	row.add(price);
	row.hasChild=CustomData[i].hasChild;
	//row.className = 'coutry_row';

	data.push(row);
};
tableview.setData(data);


// create table view event listener
tableview.addEventListener('click', function(e)
{
	    if (e.rowData.link)
        {
           newWindow = Titanium.UI.createWindow({
				url:e.rowData.link
			});
        }
     
     var i = CustomData.length - e.index - 1;
    // alert(CustomData[i].obj_id);
    if (Ti.Platform.osname != 'android')
     	Ti.App.fireEvent('objhistory',{obj_id:CustomData[i].obj_id});

     
      // Titanium.UI.currentTab.open(newWindow);    
});

pReturn.animate({
	opacity:1,
	duration:500
});

pCal.animate({
	opacity:1,
	duration:500
});
win.add(pReturn);
win.add(tableview);
win.add(objTitle);
//win.add(pCal);
//win.open();

}

