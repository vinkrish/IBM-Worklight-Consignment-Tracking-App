package com.DellLogin;

import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.view.Menu;
import android.widget.Toast;

public class Location extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_location);
		
		String location = getIntent().getStringExtra("locparams");
		Toast.makeText(getApplicationContext(), location, Toast.LENGTH_SHORT).show();
		String latt = location.substring(0, 6).toString();
		String lngg = location.substring(7,13).toString();
		Intent locationinfo = new Intent();
		locationinfo.putExtra("latitude",latt);
		locationinfo.putExtra("longitude",lngg);
		setResult(RESULT_OK, locationinfo);
		finish();
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.location, menu);
		return true;
	}

}
