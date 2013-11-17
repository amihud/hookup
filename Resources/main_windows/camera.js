var win 			= Ti.UI.currentWindow;

win.backgroundImage = '../images/bg_main.png';


var obj_id = win.obj_id;
var cli_id = win.cli_id;
var usr_id = win.usr_id;
var d = new Date();

var current_date = new Date();
var check_current_date = Date.parse(current_date);

var filename = usr_id + '_' + obj_id + '_'+ check_current_date +  '.png' ;
 
var textfield = Titanium.UI.createTextArea({color:'#333',
											backgroundColor:'#ddd',
											borderRadius:5,value:Ti.Locale.getString('Waitforupload', 'i18nMissingMsg'),
											width:Ti.App.SCREEN_WIDTH,
											height:Ti.App.TITLEVIEW,
											top:Ti.App.SCREEN_HEIGHT * .8,
											left:Ti.App.SCREEN_WIDTH * 0.3,

											visible:true
											});
 
win.add(textfield);

var cancel = Ti.UI.createButton({
	width:64,
	height:64,
	backgroundImage:'../images/button_previous_01.png',
	top:Ti.App.SCREEN_HEIGHT * .8,
	left:Ti.App.SCREEN_WIDTH * 0.1,
	opacity:0
});

cancel.addEventListener('click',function(e){
	removeWinObj();
	Ti.App.fireEvent('endlogin',{usr_id:win.usr_id,cli_id:win.cli_id,obj_id:win.obj_id	});
	
});

win.add(cancel);
cancel.animate({
	opacity:1,
	duration:500
});
 
//win.open();
 
function removeWinObj(){
win.remove(cancel);
win.remove(textfield);
win.remove.backgroundImage;
}	
	
cam_basic();
	
function fireUpTheCamera() {

Titanium.Media.showCamera({
	
    success:function(event)
    {
        var image = event.media;
        
        var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename );
        f.write(image.imageAsResized(216,156));
        win.backgroundImage = f.nativePath;
 
        var data_to_send = { 
            "file": f.read(), 
            "name": filename,
            "obj_id":obj_id,
            "cli_id":cli_id,
            "usr_id":usr_id,
            "text":''
            
        };
        xhr = Titanium.Network.createHTTPClient();
        xhr.setRequestHeader("contentType", "multipart/form-data");
       // xhr.setRequestHeader("enctype", "multipart/form-data");
       // xhr.setRequestHeader("Content-Type", "image/png");
        xhr.open("POST","http://amihud.com/ec/uploadfile.php");
        xhr.send(data_to_send); 
        xhr.onload = function() {
            textfield.value = this.responseText;
            Ti.API.info(this.responseText); 
            

        };
 
    },
    cancel:function()
    {
    removeWinObj();
	Ti.App.fireEvent('endlogin',{usr_id:win.usr_id,cli_id:win.cli_id,obj_id:win.obj_id	});
	
    },
    error:function(error)
    {
        // create alert
        var a = Titanium.UI.createAlertDialog({title:'Camera'});
        // set message
        if (error.code == Titanium.Media.NO_CAMERA)
        {
        	

            a.setMessage(Ti.Locale.getString('Nocamera', 'i18nMissingMsg'));
        }
        else
        {
            a.setMessage(Ti.Locale.getString('Unknownerror', 'i18nMissingMsg') + error.code);
        }
        // show alert
        a.show();
        a.addEventListener('click',function(e){
				removeWinObj();
				Ti.App.fireEvent('endlogin',{usr_id:win.usr_id,cli_id:win.cli_id,obj_id:win.obj_id	});
				});

	
    },
    showControls:true,
    saveToPhotoGallery:true,
	mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
});

}




	function fireUpTheCamera1() {
	Titanium.Media.showCamera({
	
		success:function(event)
		{
			var cropRect = event.cropRect;
			var image = event.media;
	
			Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
			{
				var imageView = Ti.UI.createImageView({
					width:win.width,
					height:win.height,
					image:event.media
				});
				win.add(imageView);
			}
			else
			{
				alert("got the wrong type back ="+event.mediaType);
			}
		},
		cancel:function()
		{
		},
		error:function(error)
		{
			// create alert
			var a = Titanium.UI.createAlertDialog({title:'Camera'});
	
			// set message
			if (error.code == Titanium.Media.NO_CAMERA)
			{
				a.setMessage('Please run this test on device');
			}
			else
			{
				a.setMessage('Unexpected error: ' + error.code);
			}
	
			// show alert
			a.show();
		},
		saveToPhotoGallery:true,
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

	
	function cam_basic() {
	
	if (Ti.Platform.osname === 'android') {
		win.addEventListener('open', function(e) {
			fireUpTheCamera();
		});
	} else {
		fireUpTheCamera();	
	}
};



