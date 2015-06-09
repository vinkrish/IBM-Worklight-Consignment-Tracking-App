function preLoad_s8s1(){
document.getElementById("imgovr").style.display = "none";
document.getElementById("imgovr").disabled = "disabled";
}

function validateForm_s8s1(form){
	if(form.destination.value!='Destination'){
		if(form.name.value!='Name')	{
			if(form.addressline1.value!='Address Line 1'){
				if(form.addressline2.value!='Address Line 2'){
					if(form.city.value!='City'){
						if(form.phonenumber.value!='Phone Number'){
							if(form.name2.value!='Name'){
								if(form.addressline12.value!='Address Line 1'){	
									if(form.addressline22.value!='Address Line 2'){
										if(form.city2.value!='City'){
											if(form.phonenumber2.value!='Phone Number'){
												if(form.Date.value!='Day-Month-Year'){
												change_s8s1();
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}	
	}
	}

function change_s8s1(){
	document.getElementById("img").style.display = "none";
	document.getElementById("txt").style.display = "none";
	document.getElementById("imgovr").style.opacity = "1";
	document.getElementById("imgovr").style.display = 'inline';
	document.getElementById("imgovr").disabled = false;
	}