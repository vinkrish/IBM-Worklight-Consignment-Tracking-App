
// Worklight comes with the jQuery framework bundled inside. If you do not want to use it, please comment out the line below.
window.$ = window.jQuery = WLJQ;

var Current_barcode = null;
var busyIndicator = null;
var abw_no,awbno_tst,search;
var dest_tst,date,flag,lati,longi,location;
var consignee_address,consignee_name,consignee_city,consignee_contact;
var consignor_address,consignor_name,consignor_city,consignor_contact;
var search_consign,tusername=null,tpassword=null;
var tdestination=null,tDate,tname=null,taddressline1=null,taddressline2=null,tcity=null,tphonenumber=null;
var tname2=null,taddressline12=null,taddessline22=null,tphonenumber2=null,tlatitude=null,tlongitude=null;
var tudate=null,tulatitude=null,tulongitude=null,tdeliverystatus=null,tcomments=null,consignee_sign=null;
var pictureSource;
var destinationType;
var current_page="LoginScreen";
var previousOrientation = 0;
setInterval(checkOrientation, 500);

document.addEventListener("deviceready",onDeviceReady_try,false);

function checkOrientation(){
	if(window.orientation != previousOrientation){
        previousOrientation = window.orientation;
        if(previousOrientation != 0 && current_page == "LoginScreen"){
        	movetoLoginls_tst();
        	}else if(previousOrientation == 0 && current_page == "LoginScreen_ls"){
        	movetoLogin_tst();
        	}
        if(previousOrientation != 0 && current_page == "s3s2"){
            movetos3s2ls_tst();
            }else if(previousOrientation == 0 && current_page == "s3s2_ls"){
            	movetos3s2_tst();
            }
        if(previousOrientation != 0 && current_page == "s4s2"){
            movetos4s2ls_tst();
            }else if(previousOrientation == 0 && current_page == "s4s2_ls"){
            	movetos4s2_tst();
            }
        if(previousOrientation != 0 && current_page == "s7s1"){
            movetos7s1ls_tst();
            }else if(previousOrientation == 0 && current_page == "s7s1_ls"){
            	movetos7s1_tst();
            }
        if(previousOrientation != 0 && current_page == "s7s3"){
            movetos7s3ls_tst();
            }else if(previousOrientation == 0 && current_page == "s7s3_ls"){
            	movetos7s3_tst();
            }
        if(previousOrientation != 0 && current_page == "s8s1"){
            movetos8s1ls_tst();
            }else if(previousOrientation == 0 && current_page == "s8s1_ls"){
            	movetos8s1_tst();
            }
        if(previousOrientation != 0 && current_page == "s8s2"){
            movetos8s2ls_tst();
            }else if(previousOrientation == 0 && current_page == "s8s2_ls"){
            	movetos8s2_tst();
            }
    }
}

function wlCommonInit(){
	// Common initialization code goes here
	WL.Page.load("LoginScreen.html", {
	//WL.Page.load("s3s2.html", {
		onComplete : function() {temp_login();},
		onUnload : function() {WL.Logger.debug("s3s1.html unload");}
	});	
}

function movetoLogin_tst(){
	WL.Page.load("LoginScreen.html", {
		onComplete : function() {temp_login();},
		onUnload : function() {}
	});	
}

function movetoLoginls_tst(){
	WL.Page.load("LoginScreen_ls.html", {
		onComplete : function() {temp_loginls();},
		onUnload : function() {}
	});	
}

function temp_rotation(){
		if(document.getElementById("username").value != "Username"){
			tusername = document.getElementById("username").value;
			//alert(tusername);
		}
}

function temp_rotationp(){
	if(document.getElementById("password").value != "Password")
		tpassword = document.getElementById("password").value;
}

function temp_login(){
	current_page = "LoginScreen";
	//alert(tusername);
	if(tusername != null && tusername != ''){
	//if(tusername != ''){
		document.getElementById("username").value = tusername;
		document.getElementById("username").style.color = "#000000";
	}
	if(tpassword != null && tpassword != ''){
		document.getElementById("password").value = tpassword;
		document.getElementById("password").style.color = "#000000";
	}
}

function temp_loginls(){
	current_page = "LoginScreen_ls";
	//alert(tusername);
	if(tusername != null && tusername != ''){
	//if(tusername != ''){
		document.getElementById("username").value = tusername;
		document.getElementById("username").style.color = "#000000";
	}
	if(tpassword != null && tpassword !=''){
		document.getElementById("password").value = tpassword;
		document.getElementById("password").style.color = "#000000";
	}
}

function doLogin() {
	var user = document.getElementById('username').value;
	var pswd = document.getElementById('password').value;
	if (user == 'Username') {
		alert("Please enter user name");
		return;
	} else if (pswd == 'Password') {
		alert("Please enter password");
		return;
	} else {
		doAuthenticate_RSS();
	}
}

function doAuthenticate_LDAP() {
	if (busyIndicator == null)
		busyIndicator = new WL.BusyIndicator('pagePort');
	busyIndicator.show();
	var usr = document.getElementById('username').value;
	var pwd = document.getElementById('password').value;
	WL.Logger.debug("Feed retrieve success");
	var invocationData = {
		adapter : 'LDAPAdapter',
		procedure : 'doAuthenticateLDAP',
		parameters : [ usr, pwd ]
	};
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : authLDAP_loadFeedsSuccess,
		onFailure : authLDAP_loadFeedsFailure,
	});
}

function doAuthenticate_RSS() {
	if (busyIndicator == null)
		busyIndicator = new WL.BusyIndicator('pagePort');
	busyIndicator.show();
	var usr = document.getElementById('username').value;
	var pwd = document.getElementById('password').value;
	WL.Logger.debug("Feed retrieve success");
	   var req1 = {
               "Mention correct key for  UN here" : usr,
               "Mention correct key for pwd here" : pwd
	   			};
	   var req2 = JSON.stringify(req1);
	   var invocationData = {
		adapter : 'RSSReader',
		procedure : 'doAuthenticateRSS',
		parameters : [ req2 ]
	};
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : authLDAP_loadFeedsSuccess,
		onFailure : authLDAP_loadFeedsFailure,
	});
}

function authLDAP_loadFeedsSuccess(result) {
	WL.Logger.debug("Feed retrieve success");
	busyIndicator.hide();
	WL.Logger.debug("result actual: " + JSON.stringify(result));
	if(result.invocationResult.isSuccessful == true)
	{
		if(previousOrientation == 0){
		movetos3s2_tst();
		}
		else if(previousOrientation != 0){
			movetos3s2ls_tst();
		}
	}else{
		alert('Invalid User');
	}
}

function authLDAP_loadFeedsFailure(result) {
	WL.Logger.error("Feed retrieve failure");
	busyIndicator.hide();
	alert('Auth Failed: Try Again');
}

function common_s3s2(){
	if(previousOrientation == 0){
		movetos3s2_tst();
		}
		else if(previousOrientation != 0){
			movetos3s2ls_tst();
		}
}

function movetos3s2_tst(){
	WL.Page.load("s3s2.html", {
		onComplete : function() {current_page="s3s2";temp_unload();},
		onUnload : function() {}
	});	
	WL.App.overrideBackButton(movetoLogin_tst);
}

function movetos3s2ls_tst(){
	WL.Page.load("s3s2_ls.html", {
		onComplete : function() {current_page="s3s2_ls";temp_unload();},
		onUnload : function() {}
	});	
	WL.App.overrideBackButton(movetoLoginls_tst);
}

function common_s7s1(){
	if(previousOrientation == 0){
		movetos7s1_tst();
		}
		else if(previousOrientation != 0){
			movetos7s1ls_tst();
		}
}

function movetos7s1_tst(){
	WL.Page.load("s7s1.html", {
		onComplete : function() {current_page="s7s1";},
		onUnload : function() {}
	});	
	WL.App.overrideBackButton(movetos3s2_tst);
}

function movetos7s1ls_tst(){
	WL.Page.load("s7s1_ls.html", {
		onComplete : function() {current_page="s7s1_ls";},
		onUnload : function() {}
	});	
	WL.App.overrideBackButton(movetos3s2ls_tst);
}

function searchIntermediate_tst(){
	search = document.getElementById("searchAWD").value;
if (busyIndicator == null)
	busyIndicator = new WL.BusyIndicator('pagePort');
busyIndicator.show();
var invocationData = {
	adapter : 'RSSReader',
	procedure : 'getConsignmentCompleteDetails',
	parameters : [ search ]
};
WL.Client.invokeProcedure(invocationData, {
	onSuccess : receivedDetailsforSearch_tst,
	onFailure : receivedDetailsFailure_tst,
});
}

function receivedDetailsforSearch_tst(result){
WL.Logger.debug("Feed retrieve success");
WL.Logger.debug("result: " + JSON.stringify(result));
if (result.invocationResult.awb_no == search){

	awbno_tst = result.invocationResult.awb_no;
	dest_tst = result.invocationResult.destination;

	consignee_address = result.invocationResult.receiverDetails.address;
	consignee_city = result.invocationResult.receiverDetails.city;
	consignee_contact = result.invocationResult.receiverDetails.contact;
	consignee_name = result.invocationResult.receiverDetails.name;
	
	consignor_address = result.invocationResult.senderDetails.address;
	consignor_city = result.invocationResult.senderDetails.city;
	consignor_contact = result.invocationResult.senderDetails.contact;
	consignor_name = result.invocationResult.senderDetails.name;

	date = result.invocationResult.sendingDate;

	busyIndicator.hide();
	
	if(previousOrientation == 0){
		movetos7s3_tst();
		}
		else if(previousOrientation != 0){
			movetos7s3ls_tst();
		}		
}
else{
	alert("No Details returned");
	busyIndicator.hide();
	common_s3s2();
	}
}

function common_s7s3(){
	if(previousOrientation == 0){
		movetos7s3_tst();
		}
		else if(previousOrientation != 0){
			movetos7s3ls_tst();
		}
}

function movetos7s3_tst(){
	WL.Page.load("s7s3.html",{
		onComplete : function() {load_try();current_page="s7s3";},
		onUnload : function() {}
	});
	WL.App.overrideBackButton(movetos7s1_tst);
}

function movetos7s3ls_tst(){
	WL.Page.load("s7s3_ls.html",{
		onComplete : function() {load_try();current_page="s7s3_ls";},
		onUnload : function() {}
	});
	WL.App.overrideBackButton(movetos7s1ls_tst);
}

function load_try(){
	document.getElementById("AWB").innerHTML=awbno_tst;
	document.getElementById("destination").innerHTML=dest_tst;
	document.getElementById("date").innerHTML=date;
	document.getElementById("name").innerHTML=consignee_name;
	document.getElementById("addressline1").innerHTML=consignee_address;
	document.getElementById("city").innerHTML=consignee_city;
	document.getElementById("phonenumber").innerHTML=consignee_contact;
	document.getElementById("name2").innerHTML=consignor_name;
	document.getElementById("addressline12").innerHTML=consignor_address;
	document.getElementById("city2").innerHTML=consignor_city;
	document.getElementById("phonenumber2").innerHTML=consignor_contact;
	//document.getElementById("lat").innerHTML=lati;
	//document.getElementById("lng").innerHTML=longi;
}

function receivedDetailsFailure_tst(result) {
	WL.Logger.error("Feed retrieve failure");
	busyIndicator.hide();
	alert("AWB number not found in db");
}

function openNativePage() {
	var params = null;
	WL.NativePage.show('com.DellLogin.HelloNative', backFromNativePage,
			params);
}

function openNativePage2(){
	var params2 = null;
	WL.NativePage.show('com.DellLogin.Date', backFromNativePage2, params2);
}

function openNativePage3(){
	var params3 = null;
	WL.NativePage.show('com.DellLogin.Date', backFromNativePage3, params3);
}

function openNativeLocation(){
	var params = {locparams:location.toString()};
	WL.NativePage.show('com.DellLogin.Location', backFromNativeLocation, params);
}

function backFromNativePage(data) {
	//alert("barcode decoded value: " + data.phoneNumber);
	//WL.Logger.debug("barcode decoded value" + data.phoneNumber);
	Current_barcode = data.phoneNumber;
	
	if(previousOrientation == 0){
		movetos4s2_tst();
		}
		else if(previousOrientation != 0){
			movetos4s2ls_tst();
		}
	// createNewEntry(data.phoneNumber);
}

function backFromNativePage2(data2){
	var received_date = data2.dateString;
	document.getElementById("Date").value = received_date;
	document.getElementById("Date").style.color = "#000000";
//	alert(received_date);
}

function backFromNativePage3(data3){
	var received_date = data3.dateString;
	document.getElementById("udate").value= received_date;
	document.getElementById("udate").sytle.color  = "#000000";
//	alert(received_date);
}

function backFromNativeLocation(data4){
	lati = data4.latitude;
	longi = data4.longitude;
}

function movetos4s2_tst(){
	WL.Page.load("s4s2.html",{
		onComplete : function() {afterBarcode_Scan(); current_page="s4s2";},
		//onComplete : function() {current_page="s4s2";},
		onUnload : function() {}
	});	 
	WL.App.overrideBackButton(movetos3s2_tst);
}

function movetos4s2ls_tst(){
	WL.Page.load("s4s2_ls.html",{
		onComplete : function() {afterBarcode_Scan(); current_page="s4s2_ls";},
		//onComplete : function() {current_page="s4s2_ls";},
		onUnload : function() {}
	});	 
	WL.App.overrideBackButton(movetos3s2ls_tst);
}

function afterBarcode_Scan() {
	if (busyIndicator == null)
		busyIndicator = new WL.BusyIndicator('pagePort');
	busyIndicator.show();
	//WL.Logger.debug("Feed retrieve successfull");
	var invocationData = {
		adapter : 'RSSReader',
		procedure : 'getConsignmentName',
		parameters : []
	};

	WL.Client.invokeProcedure(invocationData, {
		onSuccess : getConsignList_Success,
		onFailure : getConsignList_Failure,
	});
}

function getConsignList_Success(result) {
	//WL.Logger.debug("Feed retrieve success: " + JSON.stringify(result));
	busyIndicator.hide();
	document.getElementById("text1").innerHTML = Current_barcode;
	var len = result.invocationResult.consignmentDetails.length;
	//alert(len);
	var i = 0;
	var flag = false;
	do{
		var barcode_listvalue = result.invocationResult.consignmentDetails[i].awb_no;
		if(barcode_listvalue == Current_barcode)
			flag = true;
		else
			flag = false;
		i++;
	}while(flag == false && i<len);
		if(flag){
			document.getElementById("cret").disabled=true;
		}
		else{
			document.getElementById("upd").disabled=true;
		}
	}

function getConsignList_Failure(result) {
	//WL.Logger.error("Feed retrieve failure");
	busyIndicator.hide();
	alert("Server down. Scan Again and Retry");
	common_s3s2();
}

function common_s8s1(){
	if(previousOrientation == 0){
		movetos8s1_tst();
		}
		else if(previousOrientation != 0){
			movetos8s1ls_tst();
		}
}

function movetos8s1_tst(){
	abw_no = Current_barcode;
	WL.Page.load("s8s1.html",{
		onComplete : function() {temp_upload();},
		onUnload : function() {}
	});	 
	WL.App.overrideBackButton(movetos3s2_tst);
}

function movetos8s1ls_tst(){
	abw_no = Current_barcode;
	WL.Page.load("s8s1_ls.html",{
		onComplete : function() {temp_uploadls();},
		onUnload : function() {}
	});	 
	WL.App.overrideBackButton(movetos3s2ls_tst);
}

function temp_rotation1(){
	if(document.getElementById("destination").value != "Destination")
		tdestination = document.getElementById("destination").value;
}
function temp_rotation2(){
	if(document.getElementById("Date").value != "Day-Month-Year")
		tDate = document.getElementById("Date").value;
}
function temp_rotation3(){
	if(document.getElementById("name").value != "Name")
		tname = document.getElementById("name").value;
}
function temp_rotation4(){
	if(document.getElementById("addressline1").value != "Address Line 1")
		taddressline1 = document.getElementById("addressline1").value;
}
function temp_rotation5(){
	if(document.getElementById("addressline2").value != "Address Line 2")
		taddressline2 = document.getElementById("addressline2").value;
}
function temp_rotation6(){
	if(document.getElementById("city").value != "City")
		tcity = document.getElementById("city").value;
}
function temp_rotation7(){
	if(document.getElementById("phonenumber").value != "Phone Number")
		tphonenumber = document.getElementById("phonenumber").value;
}
function temp_rotation8(){
	if(document.getElementById("name2").value != "Name")
		tname2 = document.getElementById("name2").value;
}
function temp_rotation9(){
	if(document.getElementById("addressline12").value != "Address Line 1")
		taddressline12 = document.getElementById("addressline12").value;
}
function temp_rotation10(){
	if(document.getElementById("addressline22").value != "Address Line 2")
		taddressline22 = document.getElementById("addressline22").value;
}
function temp_rotation11(){
	if(document.getElementById("city2").value != "City")
		tcity2 = document.getElementById("city2").value;
}
function temp_rotation12(){
	if(document.getElementById("phonenumber2").value != "Phone Number")
		tphonenumber2 = document.getElementById("phonenumber2").value;
}
function temp_rotation13(){
	if(document.getElementById("udate").value != "Day_Month-Year")
		tudate = document.getElementById("udate").value;
}
function temp_rotation14(){
	if(document.getElementById("deliverystatus").value != "Delivery status")
		tdeliverystatus = document.getElementById("deliverystatus").value;
}
function temp_rotation15(){
	if(document.getElementById("comments").value != "Comments")
		tcomments = document.getElementById("comments").value;
}
function temp_rotation16(){
	if(document.getElementById("latitude").value != "latitude")
		tlatitude = document.getElementById("latitude").value;
	if(document.getElementById("longitude").value != "longitude")
		tlongitude = document.getElementById("longitude").value;
}
function temp_rotation17(){
	if(document.getElementById("ulatitude").value != "latitude")
		tulatitude = document.getElementById("ulatitude").value;
	if(document.getElementById("ulongitude").value != "longitude")
		tulongitude = document.getElementById("ulongitude").value;
}

function temp_upload(){
	current_page="s8s1";
	if(tdestination != null && tdestination != ''){
		document.getElementById("destination").value = tdestination;
		document.getElementById("destination").style.color = "#000000";
	}
	if(tDate != null && tDate != ''){
		document.getElementById("Date").value = tDate;
		document.getElementById("Date").style.color = "#000000";
	}
	if(tname != null && tname != ''){
		document.getElementById("name").value = tname;
		document.getElementById("name").style.color = "#000000";
	}
	if(taddressline1 != null && taddressline1 != ''){
		document.getElementById("addressline1").value = taddressline1;
		document.getElementById("addressline1").style.color = "#000000";
	}
	if(taddressline2 != null && taddressline2 != ''){
		document.getElementById("addressline2").value = taddressline2;
		document.getElementById("addressline2").style.color = "#000000";
	}
	if(tcity != null && tcity != ''){
		document.getElementById("city").value = tcity;
		document.getElementById("city").style.color = "#000000";
	}
	if(tphonenumber != null && tphonenumber != ''){
		document.getElementById("phonenumber").value = tphonenumber;
		document.getElementById("phonenumber").style.color = "#000000";
	}
	if(tname2 != null && tname2 != ''){
		document.getElementById("name2").value = tname2;
		document.getElementById("name2").style.color = "#000000";
	}
	if(taddressline12 != null && taddressline12 != ''){
		document.getElementById("addressline12").value = taddressline12;
		document.getElementById("addressline12").style.color = "#000000";
	}
	if(taddressline22 != null && taddressline22 != ''){
		document.getElementById("addressline22").value = taddressline22;
		document.getElementById("addressline22").style.color = "#000000";
	}
	if(tcity2 != null && tcity2 != ''){
		document.getElementById("city2").value = tcity2;
		document.getElementById("city2").style.color = "#000000";
	}
	if(tphonenumber2 != null && tphonenumber2 != ''){
		document.getElementById("phonenumber2").value = tphonenumber2;
		document.getElementById("phonenumber2").style.color = "#000000";
	}
	if(tlatitude != null && tlatitude != ''){
		document.getElementById("latitude").value = tlatitude;
		document.getElementById("longitude").value = tlongitude;
		document.getElementById("latitude").style.color = "#000000";
		document.getElementById("longitude").style.color = "#000000";
	}
}

function temp_uploadls(){
	current_page="s8s1_ls";
	if(tdestination != null && tdestination != ''){
		document.getElementById("destination").value = tdestination;
		document.getElementById("destination").style.color = "#000000";
	}
	if(tDate != null && tDate != ''){
		document.getElementById("Date").value = tDate;
		document.getElementById("Date").style.color = "#000000";
	}
	if(tname != null && tname != ''){
		document.getElementById("name").value = tname;
		document.getElementById("name").style.color = "#000000";
	}
	if(taddressline1 != null && taddressline1 != ''){
		document.getElementById("addressline1").value = taddressline1;
		document.getElementById("addressline1").style.color = "#000000";
	}
	if(taddressline2 != null && taddressline2 != ''){
		document.getElementById("addressline2").value = taddressline2;
		document.getElementById("addressline2").style.color = "#000000";
	}
	if(tcity != null && tcity != ''){
		document.getElementById("city").value = tcity;
		document.getElementById("city").style.color = "#000000";
	}
	if(tphonenumber != null && tphonenumber != ''){
		document.getElementById("phonenumber").value = tphonenumber;
		document.getElementById("phonenumber").style.color = "#000000";
	}
	if(tname2 != null && tname2 != ''){
		document.getElementById("name2").value = tname2;
		document.getElementById("name2").style.color = "#000000";
	}
	if(taddressline12 != null && taddressline12 != ''){
		document.getElementById("addressline12").value = taddressline12;
		document.getElementById("addressline12").style.color = "#000000";
	}
	if(taddressline22 != null && taddressline22 != ''){
		document.getElementById("addressline22").value = taddressline22;
		document.getElementById("addressline22").style.color = "#000000";
	}
	if(tcity2 != null && tcity2 != ''){
		document.getElementById("city2").value = tcity2;
		document.getElementById("city2").style.color = "#000000";
	}
	if(tphonenumber2 != null && tphonenumber2 != ''){
		document.getElementById("phonenumber2").value = tphonenumber2;
		document.getElementById("phonenumber2").style.color = "#000000";
	}
	if(tlatitude != null && tlatitude != ''){
		document.getElementById("latitude").value = tlatitude;
		document.getElementById("longitude").value = tlongitude;
		document.getElementById("latitude").style.color = "#000000";
		document.getElementById("longitude").style.color = "#000000";
	}
}

function temp_unload(){
	Current_barcode = null;
	tusername=null;
	tpassword=null;
	tdestination=null;
	tDate=null;
	tname=null;
	taddressline1=null;
	taddressline2=null;
	tcity=null;
	tphonenumber=null;
	tname2=null;
	taddressline12=null;
	taddressline22=null;
	tcity2=null;
	tphonenumber2=null;
	tudate=null;
	tdeliverystatus=null;
	tcomments=null;
	tlatitude=null;
	tlongitude=null;
}

function create_consignment() {
	WL.Logger.debug("submit function call");
	var dest = document.getElementById("destination").value;
	var sdate = document.getElementById("Date").value;
	
	var rname = document.getElementById("name").value;
	var raddr = document.getElementById("addressline1").value;
	var raddr2 = document.getElementById("addressline2").value;
	var rcity = document.getElementById("city").value;
	var rphone = document.getElementById("phonenumber").value;
	
	var sname = document.getElementById("name2").value;
	var saddr = document.getElementById("addressline12").value;
	var saddr2 = document.getElementById("addressline22").value;
	var scity = document.getElementById("city2").value;
	var sphone = document.getElementById("phonenumber2").value;

	var lat = document.getElementById("latitude").innerHTML;
	var lng = document.getElementById("longitude").innerHTML;
	var curloc = lat+lng;
	
	var request1 = {
		"awb_no" : abw_no,
		"destination" : dest,
		"receiverDetails" : {
			"address" : raddr,
			"awb_no" : abw_no,
			"city" : rcity,
			"contact" : rphone,
			"name" : rname,
			"zip" : "58818"
		},
		"senderDetails" : {
			"address" : saddr,
			"awb_no" : abw_no,
			"city" : scity,
			"contact" : sphone,
			"name" : sname,
			"zip" : "9006"
		},
		"sendingDate" : sdate,
		"currentLocation" : curloc,
		"source" : scity,
		"status" : "default_status"
	};
	var req2 = JSON.stringify(request1);
	createConsignment(req2);
}

function createConsignment(req3) {
	if (busyIndicator == null)
		busyIndicator = new WL.BusyIndicator('pagePort');
	busyIndicator.show();
	var invocationData = {
		adapter : 'RSSReader',
		procedure : 'writeConsignmentDetails',
		parameters : [ req3 ]
	};

	WL.Client.invokeProcedure(invocationData, {
		onSuccess : create_loadFeedsSuccess,
		onFailure : create_loadFeedsFailure,
	});
}

function create_loadFeedsSuccess(result) {
	//WL.Logger.debug("Feed retrieve success");
	busyIndicator.hide();
	//WL.Logger.debug("result actual: " + JSON.stringify(result));
	if (result.invocationResult.isSuccessful == true)
		alert("New Entry added into database");
	else{
		alert("Submission Failed. Please try Again");
	}
	temp_unload();
	common_s3s2();
	}

function create_loadFeedsFailure(result) {
	WL.Logger.error("Feed retrieve failure");
	busyIndicator.hide();
	alert("Submission Failed. Please try Again");
}

function s8s2Intermediate_tst(){
	var request = Current_barcode;
	if(request == null){
		var request = document.getElementById("searchAWD").value;
		Current_barcode=request;
	}
	//abw_no = request;
	if (busyIndicator == null)
		busyIndicator = new WL.BusyIndicator('pagePort');

	busyIndicator.show();

	var invocationData = {
		adapter : 'RSSReader',
		procedure : 'getConsignmentCompleteDetails',
		parameters : [ request ]
	};

	WL.Client.invokeProcedure(invocationData, {
		onSuccess : receivedDetailsforUpdate_tst,
		onFailure : receivedDetailsFailure_tst,
	});

}

function receivedDetailsforUpdate_tst(result){
	WL.Logger.debug("Feed retrieve success");
	WL.Logger.debug("result: " + JSON.stringify(result));
	if (result.invocationResult.awb_no == Current_barcode){
	
		awbno_tst = result.invocationResult.awb_no;
		dest_tst = result.invocationResult.destination;

		consignee_address = result.invocationResult.receiverDetails.address;
		consignee_city = result.invocationResult.receiverDetails.city;
		consignee_contact = result.invocationResult.receiverDetails.contact;
		consignee_name = result.invocationResult.receiverDetails.name;
		
		consignor_address = result.invocationResult.senderDetails.address;
		consignor_city = result.invocationResult.senderDetails.city;
		consignor_contact = result.invocationResult.senderDetails.contact;
		consignor_name = result.invocationResult.senderDetails.name;

		date = result.invocationResult.sendingDate;

		busyIndicator.hide();
		
		if(previousOrientation == 0){
			movetos8s2_tst();
			}
			else if(previousOrientation != 0){
				movetos8s2ls_tst();
			}		
	}
	else{
		alert("No Details returned");
		busyIndicator.hide();
		common_s3s2();
	}
}

function movetos8s2_tst(){
	WL.Page.load("s8s2.html",{
	    onComplete : function() {loadup();temp_loadup();},
		onUnload : function() {}
	});	 
	WL.App.overrideBackButton(movetos3s2_tst);
}

function movetos8s2ls_tst(){
	WL.Page.load("s8s2_ls.html",{
	    onComplete : function() {loadup();temp_loadupls();},
		onUnload : function() {}
	});	 
	WL.App.overrideBackButton(movetos3s2ls_tst);
}

function temp_loadup(){
	current_page="s8s2";
	if(tudate != null && tudate != ''){
		document.getElementById("udate").value = tudate;
		document.getElementById("udate").style.color = "#000000";
	}
	if(tdeliverystatus != null && tdeliverystatus != ''){
		document.getElementById("deliverystatus").value = tdeliverystatus;
		document.getElementById("deliverystatus").style.color = "#000000";
	}
	if(tcomments != null && tcomments != ''){
		document.getElementById("comments").value = tcomments;
		document.getElementById("comments").style.color = "#000000";
	}
	if(tulatitude != null && tulatitude != ''){
		document.getElementById("ulatitude").value = tulatitude;
		document.getElementById("ulongitude").value = tulongitude;
		document.getElementById("ulatitude").style.color = "#000000";
		document.getElementById("ulongitude").style.color = "#000000";
	}
}

function temp_loadupls(){
	current_page="s8s2_ls";
	if(tudate != null && tudate != ''){
		document.getElementById("udate").value = tudate;
		document.getElementById("udate").style.color = "#000000";
	}
	if(tdeliverystatus != null && tdeliverystatus != ''){
		document.getElementById("deliverystatus").value = tdeliverystatus;
		document.getElementById("deliverystatus").style.color = "#000000";
	}
	if(tcomments != null && tcomments != ''){
		document.getElementById("comments").value = tcomments;
		document.getElementById("comments").style.color = "#000000";
	}
	if(tulatitude != null && tulatitude != ''){
		document.getElementById("ulatitude").value = tulatitude;
		document.getElementById("ulongitude").value = tulongitude;
		document.getElementById("ulatitude").style.color = "#000000";
		document.getElementById("ulongitude").style.color = "#000000";
	}
}

function loadup(){
	document.getElementById('AWB').innerHTML=awbno_tst;
	document.getElementById("updestination").innerHTML=dest_tst;
	document.getElementById("upname").innerHTML=consignee_name;
	document.getElementById("upname2").innerHTML=consignor_name;
	document.getElementById("upaddressline1").innerHTML=consignee_address;
	document.getElementById("upaddressline11").innerHTML=consignor_address;
	document.getElementById("upcity").innerHTML=consignee_city;
	document.getElementById("upcity2").innerHTML=consignor_city;
	document.getElementById("upphonenumber").innerHTML=consignee_contact;
	document.getElementById("upphonenumber2").innerHTML=consignor_contact;
	document.getElementById("date").innerHTML=date;
}

function update_consignment_tst(){
	var update = document.getElementById('udate').value;
	var uplatitude = document.getElementById('ulatitude').innerHTML;
	var uplongitude = document.getElementById('ulongitude').innerHTML;
	var updeliverystatus = document.getElementById('deliverystatus').value;
	var upcomments = document.getElementById('comments').value;
	var ucurloc = uplatitude+uplongitude;
	abw_no = Current_barcode;
	var uprequest1 = {
			"awb_no":abw_no,
			"commentDetails":{
				"awb_no" :abw_no,
				"commentText" :upcomments,
				"status" :updeliverystatus
			},
			"receivingDate" :update,
			"currentLocation" :ucurloc,
			"status" :updeliverystatus,
			"trackDetails":{
			"awbNo" :abw_no,
			"receivingDate" :update,
			"status" :updeliverystatus,
			}
	};
	var upreq2 = JSON.stringify(uprequest1);
	updateConsignment_tst(upreq2);
}


function updateConsignment_tst(upreq3){
	if (busyIndicator == null)
		busyIndicator = new WL.BusyIndicator('pagePort');
	busyIndicator.show();
	var invocationData = {
		adapter : 'RSSReader',
		procedure : 'updateConsignmentDetails',
		parameters : [ upreq3 ]
	};

	WL.Client.invokeProcedure(invocationData, {
		onSuccess : update_loadFeedsSuccess_tst,
		onFailure : update_loadFeedsFailure_tst,
	});
}

function update_loadFeedsSuccess_tst(result) {
	WL.Logger.debug("Feed retrieve success");
	busyIndicator.hide();
	WL.Logger.debug("result actual: " + JSON.stringify(result));
	if (result.invocationResult.isSuccessful == true)
		alert("Updated into database");
	else{
		alert("failed to updated into database");
	}
	temp_unload();
	common_s3s2();
	}

function update_loadFeedsFailure_tst(result) {
	WL.Logger.error("Feed retrieve failure");
	busyIndicator.hide();
	alert("Submission Failed. Please try Again");
	common_s3s2();
}

function getGPSParams() {
	document.addEventListener("deviceready", onDeviceReady_try, false);
}

function onDeviceReady_try() {
	pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    navigator.geolocation.getCurrentPosition(onSuccess_try, onError_try);
}

function onSuccess_try(position) {
	var lat = position.coords.latitude;
	var longg = position.coords.longitude;
	document.getElementById('longitude').innerHTML = trim(longg);
	document.getElementById('latitude').innerHTML = trim(lat);
}

function onError_try(error) {
	document.getElementById('longitude').innerHTML = "GPS_Failed";
	document.getElementById('latitude').innerHTML = "GPS_Failed";
	alert("failed to receive grp params");
}
/*
function preLoad_s8s2(){
	document.addEventListener("deviceready",onDeviceReady,false);
}
*/
function capturePhoto() {
	// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality : 50,
		destinationType : destinationType.DATA_URL
	});
}

function onPhotoDataSuccess(imageData) {
    consignee_sign = document.getElementById('smallImage');
    consignee_sign.style.display = 'block';
    consignee_sign.src = "data:image/jpeg;base64," + imageData;
  }

function onFail(message){
	WL.Logger.debug(message);
}

function alerted(){
	alert("feature covered in barcode scanner");
}

function getGPSParams_up() {
	document.addEventListener("deviceready", onDeviceReady_up, false);
}

function onDeviceReady_up() {
    navigator.geolocation.getCurrentPosition(onSuccess_up, onError_up);
}

function onSuccess_up(position) {
	var ulat = position.coords.latitude;
	var ulong = position.coords.longitude;
	document.getElementById('ulongitude').innerHTML = trim(ulong);
	document.getElementById('ulatitude').innerHTML = trim(ulat);
}

function trim(val){
	return Math.round(val*10000)/10000;
}

function onError_up(error) {
	document.getElementById('ulongitude').innerHTML = "GPS Failed";
	document.getElementById('ulatitude').innerHTML = "GPS Failed";
	alert("failure");
}

function logout_tst(){
	Current_barcode = null;
	busyIndicator = null;
	abw_no = null;
	awbno_tst = null;
	dest_tst = null;
	consignee_address = null;
	consignee_name = null;
	consignee_city = null;
	consignor_address = null;
	consignor_name = null;
	consignor_city = null;
	consignee_contact = null;
	consignor_contact = null;
	date = null;
	flag = null;
	search_consign = null;
	tusername = null;
	tpassword = null;
	previousOrientation = 0;
	temp_unload();
	movetoLogin_tst();
}
