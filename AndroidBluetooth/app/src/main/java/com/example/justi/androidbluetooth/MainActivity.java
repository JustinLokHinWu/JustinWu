package com.example.justi.androidbluetooth;

import android.Manifest;
import android.os.Build;
import android.os.Bundle;

import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListView;

import java.util.ArrayList;
import android.content.Context;
import android.content.IntentFilter;

import static android.bluetooth.BluetoothAdapter.*;

public class MainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener{
    private final static String TAG = "SelectActivity";

    BluetoothAdapter mBluetoothAdapter;
    Button buttonDiscover;
    ListView lvDevices;
    public ArrayList<BluetoothDevice> mDevices = new ArrayList<>();
    public DeviceListAdapter mDeviceListAdapter;


    // Create a BroadcastReceiver for ACTION_FOUND, from developer.android.com
    private final BroadcastReceiver mReceiver = new BroadcastReceiver() {
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();

            // from video by CodingWithMitch
            assert action != null;
            if (action.equals(BluetoothAdapter.ACTION_STATE_CHANGED)) {
                final int state = intent.getIntExtra(BluetoothAdapter.EXTRA_STATE, ERROR);

                switch(state) {
                    case BluetoothAdapter.STATE_OFF:
                        Log.d(TAG, "onReceive: STATE_OFF");
                        break;
                    case BluetoothAdapter.STATE_TURNING_OFF:
                        Log.d(TAG, "onReceive: STATE_TURNING_OFF");
                        break;
                    case BluetoothAdapter.STATE_ON:
                        Log.d(TAG, "onReceive: STATE_ON");
                        break;
                    case BluetoothAdapter.STATE_TURNING_ON:
                        Log.d(TAG, "onReceive: STATE_TURNING_ON");
                        break;
                }
            }
        }
    };

    private BroadcastReceiver mBroadcastReceiverDiscover = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            final String action = intent.getAction();

            Log.d(TAG, "onReceive: ACTION_FOUND");


            if(action.equals(BluetoothDevice.ACTION_FOUND)) {
                BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);

                // TODO change device filter to use something other than name
                if (!mDevices.contains(device) && device.getName().equals("raspberrypi")) {
                    mDevices.add(device);
                    Log.d(TAG, "onReceive: " + device.getName() + " : " + device.getAddress());

                    mDeviceListAdapter = new DeviceListAdapter(context, R.layout.device_adapter_view, mDevices);
                    lvDevices.setAdapter(mDeviceListAdapter);
                }
            }
        }
    };

    private BroadcastReceiver mBroadcastReceiverPair = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            final String action = intent.getAction();

            if(action.equals(BluetoothDevice.ACTION_BOND_STATE_CHANGED)) {
                Log.d(TAG, "onReceive: ACTION_BOND_STATE_CHANGED");

                BluetoothDevice mDevice = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);

                mDeviceListAdapter = new DeviceListAdapter(context, R.layout.device_adapter_view, mDevices);
                lvDevices.setAdapter(mDeviceListAdapter);

                if (mDevice.getBondState() == BluetoothDevice.BOND_BONDED) {
                    Log.d(TAG, "BroadcastReceiver: BOND_BONDED");
                }
                if (mDevice.getBondState() == BluetoothDevice.BOND_BONDING) {
                    Log.d(TAG, "BroadcastReceiver: BOND_BONDING");
                }
                if (mDevice.getBondState() == BluetoothDevice.BOND_NONE) {
                    Log.d(TAG, "BroadcastReceiver: BOND_NONE");
                }
            }
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_select);

        Toolbar toolbar = findViewById(R.id.toolbar);
        toolbar.setTitle("Find Open EyeTap Devices");
        setSupportActionBar(toolbar);

        // Bluetooth adapter
        mBluetoothAdapter = getDefaultAdapter();

        // UI elements
        buttonDiscover = (Button) findViewById(R.id.button_discover);
        lvDevices = (ListView) findViewById(R.id.list_devices);
        lvDevices.setOnItemClickListener(MainActivity.this);

        // Check if Bluetooth is supported
        if(mBluetoothAdapter == null) {
            Log.d(TAG, "toggleBT: Does not have BT capabilities");

            // TODO alert, and force quit
        }

        // Check if Bluetooth is enabled
        if (!mBluetoothAdapter.isEnabled()) {
            Intent enableBTIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            startActivity(enableBTIntent);

            IntentFilter BTIntent = new IntentFilter(BluetoothAdapter.ACTION_STATE_CHANGED);
            registerReceiver(mReceiver, BTIntent);
        }

        // Bluetooth pairing
        IntentFilter BTPair = new IntentFilter(BluetoothDevice.ACTION_BOND_STATE_CHANGED);
        registerReceiver(mBroadcastReceiverPair, BTPair);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_select, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onDestroy() {
        Log.d(TAG, "onDestroy called");
        super.onDestroy();

        unregisterReceiver(mReceiver);
        unregisterReceiver(mBroadcastReceiverDiscover);
        unregisterReceiver(mBroadcastReceiverPair);
    }

    public void buttonDiscover(View view) {
        // clearing list view and device list
        mDevices.clear();

        Log.d(TAG, "buttonDiscover: Searching for devices");

        if(mBluetoothAdapter.isDiscovering()) {
            mBluetoothAdapter.cancelDiscovery();
            Log.d(TAG, "buttonDiscover: Cancelling discovery");
        }
        checkBTPermissions();

        Log.d(TAG, "buttonDiscover: Starting discovery");

        mBluetoothAdapter.startDiscovery();
        IntentFilter discoverDevicesIntent = new IntentFilter(BluetoothDevice.ACTION_FOUND);
        registerReceiver(mBroadcastReceiverDiscover, discoverDevicesIntent);


    }

    private void checkBTPermissions() {
        if(Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP) {
            int permissionCheck = this.checkSelfPermission("Manifsest.permission.ACCESS_FINE_LOCATION");
            permissionCheck += this.checkSelfPermission("Manifsest.permission.ACCESS_COARSE_LOCATION");

            if(permissionCheck != 0) {
                this.requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION}, 1);
            }
            else {
                Log.d(TAG, "checkBTPermissions: No need for permissions");
            }
        }
    }

    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
        mBluetoothAdapter.cancelDiscovery();

        Log.d(TAG, "onItemClick: item clicked");
        String deviceName = mDevices.get(i).getName();
        String deviceAddress = mDevices.get(i).getAddress();

        Log.d(TAG, "onItemClick: Name: " + deviceName);
        Log.d(TAG, "onItemClick: Address: " + deviceAddress);

        mDevices.get(i).createBond();

    }
}

