package com.weartech.openeyetapcompanion;

import android.bluetooth.BluetoothDevice;
import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import java.util.ArrayList;

public class DeviceListAdapter extends ArrayAdapter<BluetoothDevice>{

    private LayoutInflater mLayoutInflater;
    private ArrayList<BluetoothDevice> mDevices;
    private int mViewResourceId;

    public DeviceListAdapter(Context context, int resource, ArrayList<BluetoothDevice> devices) {
        super(context, resource, devices);

        this.mDevices = devices;
        mLayoutInflater = (LayoutInflater) context.getSystemService((Context.LAYOUT_INFLATER_SERVICE));
        mViewResourceId = resource;
    }

    public View getView(int position, View convertView, ViewGroup parent) {
        convertView = mLayoutInflater.inflate(mViewResourceId, null);

        BluetoothDevice device = mDevices.get(position);

        if (device != null) {
            TextView deviceName = (TextView) convertView.findViewById(R.id.textDeviceName);
            TextView deviceAddress = (TextView) convertView.findViewById(R.id.textDeviceAddr);
            TextView deviceBond = (TextView) convertView.findViewById(R.id.textDeviceBonded);

            if (deviceName != null) {
                deviceName.setText(device.getName());
            }
            if (deviceAddress != null) {
                deviceAddress.setText(device.getAddress());
            }
            if (deviceBond != null) {
                switch(device.getBondState()) {
                    case BluetoothDevice.BOND_BONDED:
                        deviceBond.setText("Bonded");
                        deviceBond.setTextColor(Color.parseColor("#66ba57"));
                        break;
                    case BluetoothDevice.BOND_BONDING:
                        deviceBond.setText("Bonding");
                        deviceBond.setTextColor(Color.parseColor("#bababa"));
                        break;
                    case BluetoothDevice.BOND_NONE:
                        deviceBond.setText("No Bond");
                        deviceBond.setTextColor(Color.parseColor("#bababa"));
                        break;
                }
            }
        }

        return convertView;
    }
}
