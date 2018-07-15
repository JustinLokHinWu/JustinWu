# based on: l2capclient.py, a Demo L2CAP server for pybluez, written 2007-08-15 04:04:52Z albert

import bluetooth
import json

server_sock=bluetooth.BluetoothSocket(bluetooth.RFCOMM)
port = 1

server_sock.bind(("",port))
server_sock.listen(1)

#uuid = "94f39d29-7d6d-437d-973b-fba39e49d4ef"
#bluetooth.advertise_service( server_sock, "SampleServerL2CAP",
#                   service_id = uuid,
#                   service_classes = [ uuid ]
#                    )
print("Waiting for connection...")
client_sock,address = server_sock.accept()
print("Accepted connection from ",address)

data = client_sock.recv(1024)
print("Data received: ", str(data))

while data:
    # client_sock.send('Echo => ' + str(data))
    # this is where data is processed
    print("Notification received.")

    notif_data = json.loads(data)
    print("Package: " + notif_data["package"])
    print("Title: " + notif_data["title"])
    print("Text: " + notif_data["text"])

    
    # receive next message
    data = client_sock.recv(1024)
    print("Data received:", str(data))

client_sock.close()
server_sock.close()