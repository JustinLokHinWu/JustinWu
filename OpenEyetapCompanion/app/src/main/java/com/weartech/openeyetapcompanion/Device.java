package com.weartech.openeyetapcompanion;

import android.bluetooth.BluetoothDevice;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import java.nio.charset.Charset;
import java.util.UUID;

public class Device extends AppCompatActivity {
    private static final String TAG = "DEVICE";
    private static final UUID OET_UUID = UUID.fromString("6380f8d1-497a-4143-975d-e4d636cb628e");

    BluetoothService mBluetoothService;
    BluetoothDevice mDevice;

    // UI elements
    TextView textName;
    TextView textID;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_device);

        Bundle extras = getIntent().getExtras();

        if (extras != null) {
            mDevice = extras.getParcelable("BT_DEVICE");
        }

        textName = findViewById(R.id.device_name);
        textID = findViewById(R.id.device_ID);

        textName.setText(mDevice.getName());
        textID.setText(mDevice.getAddress());

        // start bluetooth service
        mBluetoothService = new BluetoothService(Device.this);

        startConnection();
    }

    public void startBluetoothConnection(BluetoothDevice device, UUID uuid) {
        Log.d(TAG, "Initializing Bluetooth connection");

        mBluetoothService.startClient(device, uuid);
    }

    public void startConnection() {
        startBluetoothConnection(mDevice, OET_UUID);
    }

    public void buttonPingDevice(View view) {
        mBluetoothService.write("This is a test!".getBytes(Charset.defaultCharset()));
    }
}
