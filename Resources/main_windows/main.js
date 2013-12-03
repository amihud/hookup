var win 			= Ti.UI.currentWindow;




var time;
//-- Create the sub windows
var business = Ti.UI.createWindow({
	 backgroundImage:'../images/bg_main.png'
	
});
var map		= Ti.UI.createWindow();

var obj		= Ti.UI.createWindow();
var details	= Ti.UI.createWindow();
var basket  = Ti.UI.createWindow();
var camera  = Ti.UI.createWindow();
var photolist  = Ti.UI.createWindow();
var cal       = Ti.UI.createWindow();
var newcal       = Ti.UI.createWindow();
var openeventcal    = Ti.UI.createWindow();



// clogin save cli_id as globle 
var login  = Ti.UI.createWindow();
var register     = Ti.UI.createWindow();

//work as business model
var ptype = Ti.UI.createWindow();
//work as obj model
// provider save his usr_id as globle
var provider     = Ti.UI.createWindow();

////// history windows

var crow    = Ti.UI.createWindow();
var cobj  	= Ti.UI.createWindow();
var cord 	= Ti.UI.createWindow();
var cpkg  	= Ti.UI.createWindow();

var pmenu  = Ti.UI.createWindow();
var order  = Ti.UI.createWindow();
var sale   = Ti.UI.createWindow();




//-- We set the background here since this wont change

//-- Include our clock
Ti.include('../includes/clock.js');

//-- This method will close the crusts/details window and open the toppings window
function closeWindows(){
	
	
	details.close();
	sale.close();
	provider.close();
	ptype.close();
	obj.close();
	business.close();
	basket.close();
	register.close();
	login.close();
	order.close();
	camera.close();
	photolist.close();
	pmenu.close();
	map.close();
	cal.close();
	newcal.close();
	openeventcal.close();

	
	crow.close();
	cobj.close();
	cord.close();
	cpkg.close();
	
}


function openneweventcal(e){
	
	closeWindows();
	openeventcal.url = 'neweventcal.js';
	
	
	openeventcal.usr_id = e.usr_id;
	openeventcal.cli_id = e.cli_id;
	openeventcal.obj_id = e.obj_id;
	openeventcal.open();
	
	
}



function opencal(e){
	closeWindows();
	cal.url = 'cal.js';
	
	
	cal.usr_id = e.usr_id;
	cal.cli_id = e.cli_id;
	
	cal.open();

	
	
}

function opennewcal(e){
	closeWindows();
	newcal.url = 'newcal.js';
	
	
	newcal.usr_id = e.usr_id;
	newcal.cli_id = e.cli_id;
	newcal.obj_id = e.obj_id;
	
	
	newcal.open();

	
	
}

function openobj(e)
{
	closeWindows();
	
	if (e.obj)
	{
		details.close();
	}
	else
	{
		business.close();
	}

	obj.url 	  = 'obj.js';
	obj.business  = e.business;
	obj.path	  = e.path;
	obj.bid	  = e.bid;
	obj.usr_id		= e.usr_id;
	obj.usr_email		= e.usr_email;

	obj.returnObj = e.obj;
	obj.cli_id 	= e.cli_id;
	
	obj.open();
}

function opencamera(e){
	closeWindows();
	camera.url = 'camera.js';
	
	camera.obj_id = e.obj_id;
	camera.usr_id = e.usr_id;
	camera.cli_id = e.cli_id;
	camera.open();

	
	
}

function openmap(e){
	closeWindows();
	map.url = 'map.js';
	
	map.obj_id = e.obj_id;
	map.usr_id = e.usr_id;
	map.typeSearch = e.typeSearch;
	map.open();

	
	
}

function openphotolist(e){
	closeWindows();
	photolist.url = 'photolist.js';
	
	photolist.obj_id = e.obj_id;
	photolist.usr_id = e.usr_id;
	photolist.cli_id = e.cli_id;
	photolist.open();

	
	
}

function openmenu(e)
{
	closeWindows();
	
	//-- If the event has a crust property, that means the user hit cancel once in the toppings window

	pmenu.url = 'pmenu.js';
	pmenu.usr_id 	= e.usr_id;
	pmenu.open();
}

function openorder(e)
{
	closeWindows();
	
	
	//-- If the event has a crust property, that means the user hit cancel once in the toppings window
	order.url = 'order.js';
	order.usr_id 	= e.usr_id;
	order.typeSearch      = e.typeSearch;
	order.open();
}


function opensale(e)
{
	closeWindows();
	
	order.close();
	
	sale.url 		= 'sale.js';
	sale.path		= e.path;
	sale.req_id 	= e.req_id;
	sale.usr_id 	= e.usr_id;
	sale.pkg 		= e.pkg;
	sale.title      = e.title;
	sale.typeSearch = e.typeSearch;
	sale.open();
}


//-- The method will close the toppings window and open the crusts window
function openbusiness(e)
{
	closeWindows();
	
	//obj.close();
	//login.close();
	//-- If the event has a crust property, that means the user hit cancel once in the toppings window
	if (e.business)
	{
		business.business = e.business;
	}
	business.url = 'business.js';
	business.cli_id 	= e.cli_id;
	business.open();
}

//-- This method will close the toppings window and open the details window
function openDetails(e)
{
	
	closeWindows();
	
	obj.close();
	
	details.business 	= e.business;
	details.path		= e.path;
	details.bid			= e.bid;
	details.usr_id		= e.usr_id;
	details.usr_email	= e.usr_email;
	details.obj 		= e.obj;
	details.obj_id 		= e.obj_id;
	details.cli_id 		= e.cli_id;
	
	details.url 		= 'details.js';
	
	details.open();
}

//-- This gets called after an order is submitted. It basically starts the app over.
function resetApp()
{
	closeWindows();
	openbusiness({});
}


function openbasket(e)
{
	closeWindows();
	
	business.close();
	crow.close();
	
	
	basket.usr_id		= e.usr_id;
	basket.usr_email	= e.usr_email;
	basket.url = 'basket.js';
	basket.open();
}

function openlogin(e){
	closeWindows();
	
	login.usr_id =e.usr_id;
	login.usr_name = e.usr_name;
	login.usr_email = e.usr_email;
	provider.close();
	login.url = 'loginWindow.js';
	login.open();
}


function openregister(e){
	closeWindows();
	
	register.usr_id =e.usr_id;
	register.usr_name = e.usr_name;
	register.usr_email = e.usr_email;

	login.close();
	register.url = 'registerWindow.js';
	register.open();
}
 
 
function openptype(){
	
	closeWindows();
	
	
	ptype.url = 'ptype.js';
	ptype.open();
}

function openprovider(e){
	
	closeWindows();
	
	ptype.close();
	provider.type = e.title;
	provider.path = e.path;
	provider.url = 'provider.js';
	provider.open();
}



function openhistory(e)
{
	closeWindows();
	
	//parent
	basket.close();
	//child
	cobj.close();
	
	
	crow.usr_id		= e.usr_id;
	crow.cli_id		= e.cli_id;
	crow.usr_email	= e.usr_email;
	crow.url = 'crow.js';
	crow.open();
}


function openobjhistory(e)
{
	
	closeWindows();
	
	//parent
	crow.close();
	//child
	cord.close();
	
	cobj.obj_id	    = e.obj_id;
	cobj.url = 'cobj.js';
	cobj.open();
}

function openobjordhistory(e){
	
	
	closeWindows();
	
	//parent
	cobj.close();
	//child
	cpkg.close();
	
	cord.oreq_id = e.oreq_id;
	cord.obj_id  = e.obj_id;
	cord.url ='cord.js'; 
	cord.open();
}

function openobjpkghistory(e)
{
	
	closeWindows();
	
	//parent
	cord.close();
	
	
	cpkg.obj_id	    = e.obj_id;
	cpkg.oreq_id	= e.oreq_id;
	cpkg.pkg	    = e.pkg;

	cpkg.url = 'cpkg.js';
	cpkg.open();
}
//-- Have our app listen for our custom events
Ti.App.addEventListener('obj',openobj);
Ti.App.addEventListener('cancelobj',openbusiness);
Ti.App.addEventListener('details',openDetails);
Ti.App.addEventListener('cancelDetails',openobj);
Ti.App.addEventListener('resetApp',resetApp);
Ti.App.addEventListener('basket',openbasket);
Ti.App.addEventListener('endlogin',openbusiness);
Ti.App.addEventListener('camera',opencamera);
Ti.App.addEventListener('photolist',openphotolist);


Ti.App.addEventListener('order',openorder);

Ti.App.addEventListener('endloginprovider',openmenu);
Ti.App.addEventListener('sale',opensale);
Ti.App.addEventListener('map',openmap);


Ti.App.addEventListener('provider',openprovider);
Ti.App.addEventListener('login',openlogin);

Ti.App.addEventListener('ptype',openptype);
Ti.App.addEventListener('register',openregister);


Ti.App.addEventListener('history',openhistory);
Ti.App.addEventListener('objhistory',openobjhistory);
Ti.App.addEventListener('objordhistory',openobjordhistory);
Ti.App.addEventListener('objpkghistory',openobjpkghistory);


Ti.App.addEventListener('cal',opencal);
Ti.App.addEventListener('newcal',opennewcal);
Ti.App.addEventListener('newcalevent',openneweventcal);
								   













//-- First launch, open the crust window with an empty object
//openbusiness({});
//openlogin({});
openptype({});








