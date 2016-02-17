<?php
function wp_vid_lightbox_getVimeoInfo($id) 
{
	if (!function_exists('curl_init')) die('CURL is not installed!');
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://vimeo.com/api/v2/video/$id.php");
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
		$output = unserialize(curl_exec($ch));
	    $output = $output[0];
   	 curl_close($ch);

	return $output;
}
if(isset( $_REQUEST["id"])){
$id = $_REQUEST["id"];
$response = json_encode(wp_vid_lightbox_getVimeoInfo($id));
echo ($response);

}
else{
echo "Not Set";	
	
}