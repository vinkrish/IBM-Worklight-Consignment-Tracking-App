function getFeeds() {
	var input = {
		method : 'get',
		returnedContentType : 'xml',
		path : "/check"
	};
	return WL.Server.invokeHttp(input);
}

function getFeedsFiltered() {
	var input = {
		method : 'get',
		returnedContentType : 'xml',
		path : "rss.xml",
		transformation : {
			type : 'xslFile',
			xslFile : 'filtered.xsl'
		}
	};
	return WL.Server.invokeHttp(input);
}

function writeConsignmentDetails(request1)
{

//	var request = {"awb_no":"WL123","source":"Bangalore","destination":"Texas","sendingDate":"2nd June","receivingDate":"10th June","status":"Delivered"};
	var input = {
		    method : 'post',
//		    parameters: request1,
		    returnedContentType : 'text/plain',
		    path : "dhlws/rest/dhl/add_cons",
		    body: {
		    	content : request1.toString(),
		    	contentType : 'application/json; charset=utf-8'
		    }
		};
	WL.Logger.debug(input);
	return WL.Server.invokeHttp(input);
}

function getConsignmentDetails()
{
	var input = {
		    method : 'get',
		    returnedContentType : 'json',
		    path : "dhlws/rest/dhl/get_cons"
		};
	WL.Logger.debug(input);
	return WL.Server.invokeHttp(input);
}

function getConsignmentName() {
	var input = {
		method : 'get',
		returnedContentType : 'json',
		path : "dhlws/rest/dhl/get_cons"
	};
	WL.Logger.debug(input);
	return WL.Server.invokeHttp(input);
}

function updateConsignmentDetails(request1) {
	var input = {
		method : 'post',
		// parameters: request1,
		returnedContentType : 'text/plain',
		path : "dhlws/rest/dhl/status_update",
		body : {
			content : request1.toString(),
			contentType : 'application/json; charset=utf-8'
		}
	};
	WL.Logger.debug(input);
	return WL.Server.invokeHttp(input);
}

function getConsignmentCompleteDetails(request1){
	var awb="?awb_no="+request1;
	var input = {
		method : 'get',
		path : "dhlws/rest/dhl/get_cons_details"+awb
	};
	WL.Logger.debug(input);
	return WL.Server.invokeHttp(input);
}

function doAuthenticateDHL(request1){
	var input = {
		    method : 'post',
//		    parameters: request1,
		    returnedContentType : 'text/plain',
		    path : "dhlws/rest/dhl/auth",
		    body: {
		    	content : request1.toString(),
		    	contentType : 'application/json; charset=utf-8'
		    }
		};
	WL.Logger.debug(input);
	return WL.Server.invokeHttp(input);
}

function doAuthenticateRSS(req2) {
    var input = {
                 method : 'post',
                 returnedContentType : 'text/plain',
                 path : "dhlws/rest/dhl/auth",
                 body: {
                        content : req2.toString(),
                        contentType : 'application/json; charset=utf-8'
                      }
                    };
    WL.Logger.debug(input);
    return WL.Server.invokeHttp(input);
}
