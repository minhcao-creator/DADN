import time
import  sys
from  Adafruit_IO import  MQTTClient
from uart import*

AIO_FEED_ID = ["bbc-alarm", "bbc-led", "sensor"]
AIO_USERNAME = "minhcao2000"
AIO_KEY = ""

def connected(client):
    print("Ket noi thanh cong ...")
    for topic in AIO_FEED_ID:
        client.subscribe(topic)

def subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong ...")

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit (1)

def message(client , feed_id , payload):
    print("Nhan du lieu: " + payload + " ### "+feed_id)
    if feed_id == "bbc-alarm":
        if payload == "0":
            writeData("2")
        else:
            writeData("1")
    if feed_id == "bbc-led":
        if payload == "0":
            writeData("2")
        else:
            writeData("1")
    if feed_id == "sensor":
        if payload == "0":
            writeData("1")
        else:
            writeData("2")

client = MQTTClient(AIO_USERNAME , AIO_KEY) 
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

couter_temp = 5

while True:
    # couter_temp -= 1
    # if couter_temp == 0:
    #     value = random.randint(0, 100)
    #     print("Cap nhat:", value)
    #     client.publish("bbc-temp", value)
    #     couter_temp = 5
    # time.sleep(1)
    readSerial(client)
    time.sleep(1)