<?php header('Content-Type: text/html; charset=utf-8'); ?>
<?
 date_default_timezone_set("Asia/Tel_Aviv"); 
ob_start();

$phone_notnumeric = 1;
$phone_notexist = 2;
$cli_phone_notexist_heb ='טלפון לא קיים לחץ על הכפתור הכחול להצטרפות';
$usr_phone_notexist_heb ='טלפון לא קיים התקשר להוקון 0505281056 כדי להתחבר למערכת';
$phone_notnumeric_heb='יש להכניס מספר טלפון ולא אותיות ואו רייק';

 $date_value = date('Y-m-d');
$timev =date("H:i:s");
$date_time = "$date_value $timev";

include("fsp.php");
 
//Connecting to database.
//mysql_select_db($db_name, mysql_connect($db_server,$db_username,$db_password)) or die (mysql_error());
$dbi = mysql_connect($db_server,$db_username,$db_password);
 

mysql_select_db($db_name, $dbi) or die (mysql_error());
//mysql_query("SET NAMES 'utf8'",$dbi );
   
switch($_GET['action']){

case 'getcliordcal':
$icount = 0;
        $resultArr = Array();
        
        $cli_id = $_GET['cli_id'];
        $cli_id=trim($cli_id,' ');      
        $usr_id = $_GET['usr_id'];
        $usr_id=trim($usr_id,' ');
        $time_req = $_GET['time_req'];
        $time_req=trim($time_req,' ');
 	$time_val = $_GET['time_val'];
        $time_val=trim($time_val,' ');
        $month = $_GET['month'];
        $month=trim($month,' ');
  	$year = $_GET['year'];
        $year = trim($year,' ');
 
 
if($time_req == 'day' ){
  $like='%';
  $date_like = "$date_value$like"; 
  }
else {
$date_month = date('Y-m');
 $like='%';
  $date_like = "$year-$month$like"; 
}
  
		$sql = "SELECT obj.price,obj.name,obj.image,DATE_FORMAT( sale_date,  '%d' ) as day  FROM ord join obj on obj.id= obj_id WHERE ord.cli_id = $cli_id and ord.usr_id = $usr_id AND sale_date LIKE  '$date_like' GROUP BY DATE_FORMAT( sale_date,  '%d' ) ORDER BY sale_date ASC ";
		
		
		
		
		
		
	
		
	$data = mysql_query($sql);
	while($row = mysql_fetch_array( $data )){
		$resultArr[$icount ]['day'] 	= $row['day'];
		$resultArr[$icount ]['image'] 	= $row['image'];
		$resultArr[$icount ]['name'] 	= $row['name'];
		$resultArr[$icount ]['price'] 	= $row['price'];
        $resultArr[$icount ]['result'] 	= "true";
		$resultArr[$icount ]['cid'] 	= $cli_id;
        $icount = $icount + 1;
         
        }



		$resultArr[0]['len'] = $icount;
        $resultArr[0]['sql'] = $sql;
        $resultArr[0]['date_like'] = $date_like;
         
        echo json_encode($resultArr);

break;


case 'getusrclilocation':
       
	$icount = 0;
        $resultArr = Array();
        
              
        $usr_id = $_GET['usr_id'];
        $usr_id=trim($usr_id,' ');
        $time_req = $_GET['time_req'];
        $time_req=trim($time_req,' ');
 
if($time_req == 'day' ){
  $like='%';
  $date_like = "$date_value$like";  
  
	$sql = "select x(coord) as xp , y(coord) as yp,usr_id from mordreq where usr_id=$usr_id and date LIKE '$date_like'";
	$sql = "SELECT x( coord ) AS xp, y( coord ) AS yp, id, cli_id,usr_id,
CASE usr_id
WHEN '$usr_id'
THEN usr_id = '$usr_id'
ELSE usr_id = '0'
END AS val
FROM mordreq
WHERE date LIKE '2013-11-22%'";
 }	

       	$data = mysql_query($sql);
	while($row = mysql_fetch_array( $data )){
          $coordx = $row['xp'];
	  $coordy = $row['yp'];
	  
$resultArr[$icount ]['val'] 	= $row['val'];
$resultArr[$icount ]['usr_id'] 	= $row['usr_id'];
$resultArr[$icount ]['xp'] 	= $coordx;
$resultArr[$icount ]['yp'] 	= $coordy;
          $resultArr[$icount ]['result'] 	= "true";
          $icount = $icount + 1;
         
        }



	$resultArr[0]['len'] = $icount;
        $resultArr[0]['sql'] = $sql;
         
        echo json_encode($resultArr);

break;

case 'getordmenu':
              $resultArr = Array();
              $usr_id = $_GET['usr_id'];
              $sql="select * from ordmenu where  1";//usr_id=$usr_id
              $data=mysql_query($sql);

        $icount = 0;

        while($row = mysql_fetch_array( $data )){
         //$row['name'] = str_replace(' ', '', $row['name']);
          $row['name']=trim($row['name'],' ');
          $resultArr[$icount]['result'] = "true";
          $resultArr[$icount]['id'] = $row['id'];
          $resultArr[$icount]['image'] =$row['image'];
          $resultArr[$icount]['type'] = $row['type'];
           $resultArr[$icount]['name'] = $row['name'];
         
          $icount = $icount + 1;

          // $resultArr[1]['result'] = "email";
          // $resultArr[1]['user_email'] = $row['user_email'];
        }
        $resultArr[0]['len'] = $icount;
        $resultArr[0]['sql'] = $sql;
         
        echo json_encode($resultArr);

              
              

break;

case 'getphotolist':
              $resultArr = Array();
              $usr_id = $_GET['usr_id'];
              $obj_id = $_GET['obj_id'];
              $sql="select * from obj_photo_list where obj_id = $obj_id and usr_id=$usr_id";
              $data=mysql_query($sql);

        $icount = 0;

        while($row = mysql_fetch_array( $data )){
         //$row['name'] = str_replace(' ', '', $row['name']);
         $row['name']=trim($row['name'],' ');
          $resultArr[$icount]['result'] = "true";
          $resultArr[$icount]['id'] = $row['id'];
          $resultArr[$icount]['image'] =$row['image'];
          $resultArr[$icount]['text'] = $row['text'];
         
          $icount = $icount + 1;

          // $resultArr[1]['result'] = "email";
          // $resultArr[1]['user_email'] = $row['user_email'];
        }
        $resultArr[0]['len'] = $icount;
        $resultArr[0]['sql'] = $sql;
         
        echo json_encode($resultArr);

              
              

break;

case 'getlike':
              $resultArr = Array();
              $usr_id = $_GET['usr_id'];
              $obj_id = $_GET['obj_id'];
              $sql="select like_it from obj where id = $obj_id and usr_id=$usr_id";
              $data=mysql_query($sql);
              $row = mysql_fetch_assoc($data);
              $resultArr[0]['result'] = "true";
              $resultArr[0]['like'] = $row['like_it'];
              $resultArr[0]['sql'] = $sql;
         
              echo json_encode($resultArr);
              
              

break;

case 'getobj4sale':
        
              $resultArr = Array();
              $usr_id = $_GET['usr_id'];
              
              $pkg = $_GET['pkg'];
              $pkg=trim($pkg,' ');
              
              $req_id = $_GET['req_id'];
              $req_id=trim($req_id,' ');
              
              
$sql="SELECT obj.id, obj.name, obj.price, obj.name, obj.topping, obj.image,ord.cli_id,ordreq.note,ordreq.cli_id as ocli_id,ord.count
FROM `obj` , ord,ordreq
WHERE ord.usr_id =$usr_id
and setit = 1
AND ord.req_id =$req_id
AND ord.pkg =$pkg
and ordreq.id = $req_id
AND obj.id = ord.obj_id";


		
		 $data=mysql_query($sql);
        $icount = 0;

        while($row = mysql_fetch_array( $data )){
         //$row['name'] = str_replace(' ', '', $row['name']);
         $row['name']=trim($row['name'],' ');
          $resultArr[$icount]['result'] = "true";
          $resultArr[$icount]['id'] = trim($row['id']);
          $resultArr[$icount]['image'] =trim( $row['image']);
          $resultArr[$icount]['name'] = $row['name'];
          $resultArr[$icount]['price'] = trim($row['price']);
          $resultArr[$icount]['note'] = trim($row['note']);
          $resultArr[$icount]['cli_id'] = trim($row['ocli_id']);
          $resultArr[$icount]['count'] = trim($row['count']);
         
          $resultArr[$icount]['topping'] = trim($row['topping']);

          $icount = $icount + 1;

          // $resultArr[1]['result'] = "email";
          // $resultArr[1]['user_email'] = $row['user_email'];
        }
        $resultArr[0]['len'] = $icount;
        $resultArr[0]['sql'] = $sql;
         
        echo json_encode($resultArr);

        
        
        break;



 case 'getusrid':
        $resultArr = Array();
        $user = $_GET['user'];
        $phone =  $_GET['phone'];
   
        $sql ="SELECT * FROM usr WHERE  phone=$phone";
        $data = mysql_query($sql);
        if(mysql_num_rows($data) == 1 ){
          $row = mysql_fetch_assoc($data);
          $resultArr[0]['result'] = "true";
          $resultArr[0]['user_id'] = $row['id'];
          $resultArr[0]['email'] = $row['email'];
          // $resultArr[1]['result'] = "email";
          // $resultArr[1]['user_email'] = $row['user_email'];
        } else {
          $resultArr[0]['result'] = "false";
          $resultArr[0]['user_id'] = "no user";
        }      
        echo json_encode($resultArr);
      break;
      case 'getobjtype':
              $resultArr = Array();
              $usr_id = $_GET['usr_id'];

   
        $sql =	"SELECT * 
		FROM `obj`
		WHERE usr_id =$usr_id
		and name=type";
		//GROUP BY TYPE ";
        $data = mysql_query($sql);
        $icount = 0;
        
        while($row = mysql_fetch_array( $data )){
          $resultArr[$icount]['result'] = "true";
          $resultArr[$icount]['type'] =trim( $row['type']);
          $resultArr[$icount]['image'] =trim( $row['image']);
          $resultArr[$icount]['id'] =trim( $row['id']);

          $icount = $icount + 1;

          // $resultArr[1]['result'] = "email";
          // $resultArr[1]['user_email'] = $row['user_email'];
        }
        $resultArr[0]['len'] = $icount;
         
        echo json_encode($resultArr);

      break;
        case 'getobjname':
          $resultArr = Array();
              $usr_id = $_GET['usr_id'];
              $val = $_GET['val'];
              $val=trim($val,' ');
            
        $sql = "select * from obj where name LIKE  '%$val' and usr_id=$usr_id";
        $data = mysql_query($sql);
        $icount = 0;
        echo $sql;
        while($row = mysql_fetch_array( $data )){
         //$row['name'] = str_replace(' ', '', $row['name']);
         $row['name']=trim($row['name'],' ');
          $resultArr[$icount]['result'] = "true";
          $resultArr[$icount]['id'] = trim($row['id']);

          $resultArr[$icount]['name'] = $row['name'];
          
          $icount = $icount + 1;

          // $resultArr[1]['result'] = "email";
          // $resultArr[1]['user_email'] = $row['user_email'];
        }
        $resultArr[0]['len'] = $icount;
        $resultArr[0]['sql'] = $sql;
         
        echo json_encode($resultArr);
        
        break;
        case 'getobj':
              $resultArr = Array();
              $usr_id = $_GET['usr_id'];
               $type = $_GET['type'];
                $type=trim($type,' ');
               	//$type = str_replace(' ', '', $type);
   
        $sql =	"SELECT * FROM 'obj' 
        	WHERE usr_id =$usr_id 
		         and ( (name != '$type' and  type='$type') or (name != '$type' and  type = '' ) or (name='$type' and topping=1)  )";
//echo $sql;

 $sql  =	"SELECT * FROM `obj`
		WHERE usr_id =$usr_id
		         and ( (name != '$type' and  type='$type') or (name != '$type' and  type = '' ) or (name='$type' and topping=1)  )";
		       //and ( (name != '$type' and  type='$type') or (name != '$type' and  type = '' ) or (name='$type' and topping=1)  )";
		//echo $sql;
		
//echo $sql;	
        $data = mysql_query($sql);
        $icount = 0;

        while($row = mysql_fetch_array( $data )){
         //$row['name'] = str_replace(' ', '', $row['name']);
         $row['name']=trim($row['name'],' ');
          $resultArr[$icount]['result'] = "true";
          $resultArr[$icount]['id'] = trim($row['id']);
          $resultArr[$icount]['image'] =trim( $row['image']);
          $resultArr[$icount]['name'] = $row['name'];
          $resultArr[$icount]['price'] = trim($row['price']);
         
          $resultArr[$icount]['topping'] = trim($row['topping']);

          $icount = $icount + 1;

          // $resultArr[1]['result'] = "email";
          // $resultArr[1]['user_email'] = $row['user_email'];
        }
        $resultArr[0]['len'] = $icount;
        $resultArr[0]['sql'] = $sql;
         
        echo json_encode($resultArr);

      break;
  

	case 'morderlist':
	  $resultArr = Array();
              	$usr_id = $_GET['usr_id'];
               	$req_id = $_GET['req_id'];
		$req_id=trim($req_id,' ');
                $usr_id=trim($usr_id,' ');
		$sql=" select *,obj.id as oid , obj.topping from obj,mord where mord.obj_id = obj.id and mord.setit = -2 and mord.usr_id = $usr_id and mord.req_id = $req_id  "; 
	
		$data = mysql_query($sql);
			$icount=0;
			
		  while($row = mysql_fetch_array( $data )){
		  	$row['name']=trim($row['name'],' ');
		  	$row['type']=trim($row['type'],' ');
		  	$row['price']=trim($row['price'],' ');
		  	$resultArr[$icount]['result'] = "true";
          		$resultArr[$icount]['id'] = $row['oid'];
          		$resultArr[$icount]['image'] = $row['image'];
          		$resultArr[$icount]['name'] = $row['name'];
          		$resultArr[$icount]['type'] = $row['type'];
          		$resultArr[$icount]['price'] = $row['price'];
          		$resultArr[$icount]['topping'] = trim($row['topping']);

          		$icount = $icount + 1;
		  	
		  }
		    $resultArr[0]['len'] = $icount;
        	    echo json_encode($resultArr);
		break;
		
		
		///
		 case 'getusrtype':
              $resultArr = Array();
              $usr_id = $_GET['usr_id'];

   
        $sql =	"SELECT * 
		FROM `usr`
		where usr.app = 1
		GROUP BY TYPE ";
        $data = mysql_query($sql);
        $icount = 0;
        
        while($row = mysql_fetch_array( $data )){
          $resultArr[$icount]['result'] = "true";
          $resultArr[$icount]['type'] = $row['type'];
          $resultArr[$icount]['image'] = $row['type_image'];

          $icount = $icount + 1;

          // $resultArr[1]['result'] = "email";
          // $resultArr[1]['user_email'] = $row['user_email'];
        }
        $resultArr[0]['len'] = $icount;
         
        echo json_encode($resultArr);

      break;
		///
		
		///
		  case 'getprovider':
              $resultArr = Array();
              
               $type = $_GET['type'];
                $type=trim($type,' ');
               	//$type = str_replace(' ', '', $type);


   
        $sql =	"SELECT * 
		FROM `usr`
		WHERE usr.app = 1 and  type='$type'";
        $data = mysql_query($sql);
        $icount = 0;

        while($row = mysql_fetch_array( $data )){
         //$row['name'] = str_replace(' ', '', $row['name']);
         $row['name']=trim($row['name'],' ');
          $resultArr[$icount]['result'] = "true";
          $resultArr[$icount]['id'] = $row['id'];
          $resultArr[$icount]['image'] = trim($row['image'],' ');
          $resultArr[$icount]['name'] = trim($row['name'],' ');
          $resultArr[$icount]['email'] = trim($row['email'],' ');
        

          $icount = $icount + 1;

          // $resultArr[1]['result'] = "email";
          // $resultArr[1]['user_email'] = trim($row['user_email'],' ');
        }
        $resultArr[0]['len'] = $icount;
         $resultArr[0]['type'] = $type;
        $resultArr[0]['sql'] = $sql;

       
         
        echo json_encode($resultArr);

      break;
  
		////
	case 'clilogin':
              $resultArr = Array();
              
               $usr = $_GET['usr_type'];
               $usr=trim($usr,' ');
               
               $usr_id = $_GET['usr_id'];
               $usr_id=trim($usr_id,' ');
               $phone = $_GET['phone'];
               $phone=trim($phone,' ');
               $email = $_GET['email'];
               $email=trim($email,' ');
             
     if (is_numeric ($phone) == true){ 
       if($usr == 'cli')
        $sql =	"SELECT * 
		FROM `cli`
		WHERE  usr_id='$usr_id' 
		and phone = $phone
		
		";
		
	else	
	$sql =	"SELECT * 
		FROM `usr`
		WHERE   phone = $phone

		";
		

        $data = mysql_query($sql);
        if(mysql_num_rows($data) == 1 ){
          $row = mysql_fetch_assoc($data);
          $resultArr[0]['result'] = "true";
          $resultArr[0]['cli_id'] = $row['id'];
          $resultArr[0]['cli_name'] = $row['name'];
          if($usr == 'cli'){
          
          $cli_id = $row['id'];
           $sql= "insert into cli_enter set cli_id = $cli_id , usr_id = $usr_id,date = '$date_time'";
           mysql_query($sql);
          }
          
       
        } else {
          $resultArr[0]['result'] = "false";
           if($usr == 'cli')
          	//$resultArr[0]['user_id'] = "This phone dose not exist \n press the blue icon to register ";
          	$resultArr[0]['user_id'] = $cli_phone_notexist_heb;
          else
          	//$resultArr[0]['user_id'] = "This phone dose not exist \n please contact hookon to join hookon crm ";
          	$resultArr[0]['user_id'] = $usr_phone_notexist_heb;
         $resultArr[0]['sql'] = $sql;
          $resultArr[0]['err_code'] = $phone_notexist;
        }
        }
        else {
        $resultArr[0]['result'] = "false";
         // $resultArr[0]['user_id'] = "please enter phone as number ";$phone_notnumeric_heb
          $resultArr[0]['user_id'] = $phone_notnumeric_heb;
         $resultArr[0]['sql'] = $sql;
         $resultArr[0]['err_code'] = $phone_notnumeric;
         
        }
        
         
        echo json_encode($resultArr);

      break;
	
	case 'clihistory':
	        $icount = 0;
	 	
              $resultArr = Array();
              
               $usr_id = $_GET['usr_id'];
               $usr_id=trim($usr_id,' ');
               $cli_id = $_GET['cli_id'];
               $cli_id=trim($cli_id,' ');
               $sql = "SELECT count(obj.id) as cid, obj.id,obj.name, ord.date, ord.count, obj.price,obj.image
FROM ord, obj
WHERE ord.TYPE != ''
AND ord.usr_id =$usr_id
AND ord.cli_id =$cli_id
AND ord.obj_id = obj.id
AND ord.type = obj.name
group by ord.obj_id";


$sql ="SELECT count( obj_id ) AS cid, obj.id, obj.name, ord.date, ord.count, obj.price, obj.image
FROM `ord` , obj
WHERE ord.type = obj.name
AND ord.usr_id =$usr_id
AND ord.cli_id =$cli_id
GROUP BY obj_id";


$sql="SELECT obj_id , obj.name, ord.date, obj.price, obj.image, count( obj_id ) as count
FROM `ord` , obj
WHERE (
obj.type = obj.name
AND ord.obj_id = obj.id
)
AND ord.usr_id =$usr_id
AND ord.cli_id =$cli_id
GROUP BY obj_id";


               
       $data = mysql_query($sql);

        while($row = mysql_fetch_array( $data )){

          $resultArr[$icount ]['result'] = "true";
          $resultArr[$icount ]['name'] = trim($row['name']);
          $resultArr[$icount ]['price'] = $row['price'];
          $resultArr[$icount ]['count'] = $row['count'];
          $resultArr[$icount ]['image'] = $row['image'];
          $resultArr[$icount ]['id'] = $row['obj_id'];

       
     
                 $icount = $icount + 1;

          // $resultArr[1]['result'] = "email";
          // $resultArr[1]['user_email'] = $row['user_email'];
        }
        $resultArr[0]['len'] = $icount;

        $resultArr[0]['sql'] = $sql;  
        
        
        echo json_encode($resultArr);
  
               
	break;  
	
	/*
	ELECT obj.id, obj.name, ord.date, ord.count, obj.price, obj.image, pkg, ord.req_id AS oreq_id, count( ord.req_id ) AS coreq_id
FROM ord, obj
WHERE ord.TYPE != ''
AND ord.usr_id =190
AND ord.cli_id =214
AND ord.obj_id =217
AND ord.type = obj.name
GROUP BY ord.req_id
	*/  
	    	case 'cliobjhistory':
	        $icount = 0;
	 	
              $resultArr = Array();
              
               $usr_id = $_GET['usr_id'];
               $usr_id=trim($usr_id,' ');
               $cli_id = $_GET['cli_id'];
               $cli_id=trim($cli_id,' ');
               $obj_id = $_GET['obj_id'];
               $obj_id=trim($obj_id,' ');
               $sql = "SELECT obj.id, obj.name, ord.date, ord.count, obj.price, obj.image, pkg, ord.req_id AS oreq_id, count( ord.req_id ) AS coreq_id
FROM ord, obj
WHERE ord.TYPE != ''
AND ord.usr_id =$usr_id
AND ord.cli_id =$cli_id
AND ord.obj_id =$obj_id
AND ord.type = obj.name
GROUP BY ord.req_id";

/*
SELECT obj.id, obj.name, ord.date, ord.count, obj.price, obj.image, pkg, ord.req_id AS oreq_id
FROM `ord` , obj
WHERE ord.type = obj.name
AND ord.usr_id =185
AND ord.cli_id =187
AND obj.id =197
GROUP BY ord.date
*/

$sql ="SELECT obj.id, obj.name, ord.date, ord.count, obj.price, obj.image, pkg, ord.req_id AS oreq_id
FROM `ord` , obj
WHERE ord.type = obj.name
AND ord.usr_id =$usr_id
AND ord.cli_id =$cli_id
AND obj.id =$obj_id
GROUP BY ord.date";
               
       $data = mysql_query($sql);

        while($row = mysql_fetch_array( $data )){

          $resultArr[$icount ]['result'] = "true";
          $resultArr[$icount ]['name'] = trim($row['name']);
          $resultArr[$icount ]['coreq_id'] = $row['coreq_id'];
          $resultArr[$icount ]['oreq_id'] = $row['oreq_id'];
          $resultArr[$icount ]['date'] = $row['date'];
                    
          $resultArr[$icount ]['image'] = $row['image'];
          $resultArr[$icount ]['id'] = $row['id'];

       
     
                 $icount = $icount + 1;

          // $resultArr[1]['result'] = "email";
          // $resultArr[1]['user_email'] = $row['user_email'];
        }
        $resultArr[0]['len'] = $icount;

        $resultArr[0]['sql'] = $sql;  
        
        
        echo json_encode($resultArr);
  
               
	break;  
/*
SELECT obj.id, obj.name, ord.date, ord.count, obj.price, obj.image, pkg
FROM `ord` , obj
WHERE req_id =316
AND ord.obj_id = obj.id
AND ord.usr_id =190
GROUP BY pkg
*/

	case 'cliobjordhistory':
	        $icount = 0;
	 	
              $resultArr = Array();
              
               $usr_id = $_GET['usr_id'];
               $usr_id=trim($usr_id,' ');
               $cli_id = $_GET['cli_id'];
               $cli_id=trim($cli_id,' ');
              
               $pkg = $_GET['pkg'];
               $pkg=trim($pkg,' ');
               $req_id = $_GET['req_id'];
               $req_id=trim($req_id,' ');
               $sql = "SELECT obj.id, obj.name, ord.date, ord.count, obj.price, obj.image FROM ord, obj  
               WHERE ord.usr_id =$usr_id AND ord.cli_id =$cli_id AND ord.req_id =$req_id and ord.pkg = $pkg";
               
               
               $sql="SELECT obj.id, obj.name, ord.date, ord.count, obj.price, obj.image, pkg, count( obj_id ) AS cobj
FROM `ord` , obj
WHERE req_id =$req_id
AND ord.obj_id = obj.id
AND ord.usr_id =$usr_id
GROUP BY pkg

";


               
       $data = mysql_query($sql);

        while($row = mysql_fetch_array( $data )){

        	$resultArr[$icount ]['result'] = "true";
        	$resultArr[$icount ]['name'] = trim($row['name']);
 		$resultArr[$icount ]['price'] = trim($row['price']);
         	$resultArr[$icount ]['count'] = $row['cobj'];
          	$resultArr[$icount ]['date'] = $row['date'];
            	$resultArr[$icount ]['pkg'] = $row['pkg'];
                    
         	$resultArr[$icount ]['image'] = $row['image'];
          	$resultArr[$icount ]['id'] = $row['id'];

       
     
                 $icount = $icount + 1;

          // $resultArr[1]['result'] = "email";
          // $resultArr[1]['user_email'] = $row['user_email'];
        }
        $resultArr[0]['len'] = $icount;

        $resultArr[0]['sql'] = $sql;  
        
        
        echo json_encode($resultArr);
  
               
	break;  


	    	case 'cliobjpkghistory':
	        $icount = 0;
	 	
              $resultArr = Array();
              
               $usr_id = $_GET['usr_id'];
               $usr_id=trim($usr_id,' ');
               $cli_id = $_GET['cli_id'];
               $cli_id=trim($cli_id,' ');
              
               $pkg = $_GET['pkg'];
               $pkg=trim($pkg,' ');
               $req_id = $_GET['req_id'];
               $req_id=trim($req_id,' ');
               $sql = "SELECT obj.id, obj.name, ord.date, ord.count, obj.price, obj.image FROM ord, obj  
               WHERE ord.usr_id =$usr_id AND ord.cli_id =$cli_id AND ord.req_id =$req_id and ord.pkg = $pkg";
               
               
               $sql="SELECT obj.id, obj.name, ord.date, ord.count, obj.price, obj.image
FROM `ord` , obj
WHERE req_id =$req_id
AND pkg =$pkg
AND ord.obj_id = obj.id
AND ord.usr_id = $usr_id
";


               
       $data = mysql_query($sql);

        while($row = mysql_fetch_array( $data )){

          $resultArr[$icount ]['result'] = "true";
          $resultArr[$icount ]['name'] = trim($row['name']);
 $resultArr[$icount ]['price'] = trim($row['price']);
          $resultArr[$icount ]['count'] = $row['count'];
          $resultArr[$icount ]['date'] = $row['date'];
                    
          $resultArr[$icount ]['image'] = $row['image'];
          $resultArr[$icount ]['id'] = $row['id'];

       
     
                 $icount = $icount + 1;

          // $resultArr[1]['result'] = "email";
          // $resultArr[1]['user_email'] = $row['user_email'];
        }
        $resultArr[0]['len'] = $icount;

        $resultArr[0]['sql'] = $sql;  
        
        
        echo json_encode($resultArr);
  
               
	break;  
	
	case 'getordtype':
	      $icount = 0;
              $resultArr = Array();
              
              $usr_id = $_GET['usr_id'];
              $usr_id=trim($usr_id,' ');
              $time_req = $_GET['time_req'];
              $time_req=trim($time_req,' ');
              
              /*
              SELECT obj.id, obj.name, obj.image, DATE_FORMAT( ord.sale_date, '%y-%m-%d' ) , pkg, req_id, topping, ord.type
FROM ord, obj
WHERE ord.usr_id =190
AND DATE_FORMAT( ord.sale_date, '%day' ) = DATE_FORMAT( NOW( ) , '%day' )
AND setit =1
AND obj.id = ord.obj_id
AND ord.type = obj.name
              */
             
$sql ="SELECT obj.id, obj.name, obj.image, DATE_FORMAT( ord.sale_date, '%y-%m-%d' ) as sdate  , pkg, req_id, topping, ord.type FROM ord, obj WHERE ord.usr_id =$usr_id AND DATE_FORMAT( ord.sale_date, '%$time_req' ) = DATE_FORMAT( NOW( ) , '%$time_req' ) AND setit =1 AND obj.id = ord.obj_id AND obj.name = ord.type ORDER BY req_id";
 
if($time_req == 'day' ){
  $like='%';
  $date_like = "$date_value$like";  
  }
    $sql ="SELECT obj.id, obj.name, obj.image, DATE_FORMAT( ord.sale_date, '%y-%m-%d' ) AS sdate, pkg, req_id, topping, ord.type FROM ord, obj WHERE ord.usr_id =$usr_id AND ord.sale_date LIKE '$date_like' AND obj.name = ord.type AND setit =1 group by  req_id";           
              

               
       	     $data = mysql_query($sql);

             while($row = mysql_fetch_array( $data )){

          	$resultArr[$icount ]['result'] 	= "true";
          	$resultArr[$icount ]['name'] 		= trim($row['name']);
          $resultArr[$icount ]['type'] 		= trim($row['type']);
 	  $resultArr[$icount ]['topping']	= trim($row['topping']);
 	  $resultArr[$icount ]['pkg'] 		= trim($row['pkg']);
          $resultArr[$icount ]['req_id']	= trim( $row['req_id']);
          $resultArr[$icount ]['date']		= trim($row['sdate']);           
          $resultArr[$icount ]['image']		= trim($row['image']);
          $resultArr[$icount ]['id']		= trim($row['id']);

       
     
                 $icount = $icount + 1;

          // $resultArr[1]['result'] = "email";
          // $resultArr[1]['user_email'] = $row['user_email'];
        }
        $resultArr[0]['len'] = $icount;

        $resultArr[0]['sql'] = $sql;  
        
        
        echo json_encode($resultArr);
  
              break;  
        
}


ob_end_flush();


?>