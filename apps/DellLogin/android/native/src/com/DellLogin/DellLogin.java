package com.DellLogin;

import android.os.Bundle;

import com.worklight.androidgap.WLDroidGap;

public class DellLogin extends WLDroidGap {
	@Override
	public void onWLInitCompleted(Bundle savedInstanceState) {
	   // Additional initialization code from onCreate() was moved here
	   //DeviceAuthManager.getInstance().setProvisioningDelegate(<Use default ProvisioningDelegateImpl class or replace with your IProvisioningDelegate implementation>);
	   super.loadUrl(getWebMainFilePath());
	}


    @Override
    public void onCreate(Bundle savedInstanceState) { 
        super.onCreate(savedInstanceState);
        // Additional initialization code was moved to onWLInitCompleted()
    }
		
}



