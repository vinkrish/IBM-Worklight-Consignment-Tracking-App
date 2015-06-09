package com.DellLogin;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Toast;


@SuppressLint("NewApi")
public class HelloNative extends Activity {

	//EditText eText = null;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		LinearLayout linearLayout = new LinearLayout(this);
		linearLayout.setOrientation(LinearLayout.VERTICAL);
		setContentView(linearLayout);
	
		/*
		 Intent intent = new Intent("com.google.zxing.client.android.SCAN");
			CharSequence[] modes = new CharSequence[] { "QR_CODE_MODE",
									"PRODUCT_MODE", "ONE_D_MODE", "DATA_MATRIX_MODE" };
			intent.putExtra("SCAN_MODE", modes);	
	        startActivityForResult(intent, 0);		*/
	        
	  
		Button submitButton = new Button(this);
		submitButton.setText("Start");
		submitButton.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
							
		        Intent intent = new Intent("com.google.zxing.client.android.SCAN");
				CharSequence[] modes = new CharSequence[] { "QR_CODE_MODE",
						"PRODUCT_MODE", "ONE_D_MODE", "DATA_MATRIX_MODE" };
				intent.putExtra("SCAN_MODE", modes);		        
		        startActivityForResult(intent, 0);				
			}
		});

		linearLayout.addView(submitButton);
	}
	

	public void onActivityResult(int requestCode, int resultCode, Intent intent) {
	    if (requestCode == 0) {
	            String contents = intent.getStringExtra("SCAN_RESULT");
	            String format = intent.getStringExtra("SCAN_RESULT_FORMAT");
	            intent.putExtra("phoneNumber", contents);
				setResult(RESULT_OK, intent);
				finish();
	        } else if (resultCode == RESULT_CANCELED) {
	        	Toast.makeText(this, "FAILED", Toast.LENGTH_LONG).show();
	        	finish();
	        }
	    }
		
}