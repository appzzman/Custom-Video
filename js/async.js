/**Gets info of the vimeo video*/
function logError(theUrl, text){
jQuery.post(theUrl,
    {
        xml: text
	});
}

function httpGetVideoAsync(id, image, callback)
{	
	var url = "http://behavior.uwf.edu/wp-content/plugins/wp-video-lightbox-custom/ajax.php";
    var xmlHttp = new XMLHttpRequest();
	
	xmlHttp.onerror = function(error){
	//	logError(error_url, "Error "+ JSON.stringify(error)+" "+theUrl);
	//	logError(error_url, "Error " + error.readyState + " " + error.responseText);
		console.log("Error "+JSON.stringify(error));
	}

   xmlHttp.onreadystatechange = function() { 

		
		if (xmlHttp.readyState == 4 ){
           // callback(xmlHttp.responseText, image);			
			//console.log("Response "+xmlHttp.responseText);
			var json = JSON.parse(xmlHttp.responseText);
	        var newImage = document.getElementById(json.id);
			//console.log(json.id);
			callback(xmlHttp.responseText,newImage);
		}
    }
	
	var url = url+"?id="+id;	
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send();
}

function httpGetVideoAsyncOLD(theUrl, image, callback, debugCallback)
{	
	var error_url = "http://behavior.uwf.edu/reports/logger.php";

    var xmlHttp = new XMLHttpRequest();
	//xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	
	if (xmlHttp == null ){
		logError(error_url, "  AJAX not supported");
	}
	
	xmlHttp.onerror = function(error){
	//		logError(error_url, "Error "+ JSON.stringify(error)+" "+theUrl);
	//	logError(error_url, "Error " + error.readyState + " " + error.responseText);
		//console.log("Error "+JSON.stringify(error));
	}

   xmlHttp.onreadystatechange = function() { 
        //debugCallback(xmlHttp);
		//console.log(xmlHttp.readyState);
		if (xmlHttp.readyState == 4 ){
            callback(xmlHttp.responseText, image);			
		}
		callback(xmlHttp.responseText, image)
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function getWithAjax(theUrl, image, callback){
	 jQuery.ajax({url: theUrl, success: function(result){
		callback(result, image);
    },
	error: function(xhr, status, error){
		if(xhr){
			console.log(xhr);
		}
		if(status){
			console.log(status);
		}
		if(error){
			console.log(error);
		}
		}
	});
	
}


	
/**Get Image View*/
function getVimeoImage(id){
		var image = document.getElementById("1");
		httpGetVideoAsync("http://vimeo.com/api/v2/video/"+id+".json", image, function callback(text, newImage){
			console.log(text)
			var object = eval('(' + text + ')');
			newImage.src = object[0]["thumbnail_medium"];	
		})
}


