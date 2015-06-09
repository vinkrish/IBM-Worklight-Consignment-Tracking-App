
/* JavaScript content from js/s8s2_preLoad.js in folder common */
function preLoad_s8s2(){
document.getElementById("imgovr2").style.display = "none";
document.getElementById("imgovr2").disabled = disabled;
}

function validateForm_s8s2(form){
	var templat = document.getElementById("ulatitude");
	var templong = document.getElementById("ulongitude");
	if(form.udate.value!='Day-Month-Year'){
		if(form.deliverystatus.value!='Delivery Status'){
			if(form.comments.value!='Comments'){
				if(templat.innerHTML!='' && templat.innerHTML!=null){
					if(templong.innerHTML!='' && templong.innerHTML!=null){
						change_s8s2();
					}
				}
			}
		}
	}	
}

function change_s8s2(){
	document.getElementById("img").style.display = "none";
	document.getElementById("txt").style.display = "none";
	document.getElementById("imgovr2").style.opacity = "1";
	document.getElementById("imgovr2").style.display = 'inline';
	}
