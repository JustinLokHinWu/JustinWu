from tkinter import *
from bluetoothserver import BluetoothServer

bt_server = BluetoothServer();

root = Tk()
root.configure(background='black')
root.attributes('-fullscreen', True)

topFrame= Frame(root)
topFrame.config(bg="black")
topFrame.pack()

bottomFrame= Frame(root)
bottomFrame.pack(side=BOTTOM)

label_title = Label(topFrame, text="This is some text", fg="white", bg="black")
label_title.config(font=("Arial", 100))

label_text = Label(topFrame, text="This is also text", fg="white", bg="black")
label_text.config(font=("Arial", 50))


label_title.pack()
label_text.pack()



root.mainloop()
