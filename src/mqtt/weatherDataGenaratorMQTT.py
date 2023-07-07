# import statements
import paho.mqtt.client as mqtt_client
from dotenv import load_dotenv

import json
import random
import time
import os

load_dotenv()

# broker configuration
broker_address = os.getenv("BROKER_ADDRESS")
broker_port = int(os.getenv("BROKER_PORT"))
broker_user = os.getenv("BROKER_USER")
broker_password = os.getenv("BROKER_PASSWORD")
topic = os.getenv("TOPIC")
ca_cert_file = os.getenv("CA_CERT_FILE")

# client connection
client = mqtt_client.Client()
client.tls_set(ca_certs=ca_cert_file)
client.username_pw_set(username=broker_user, password=broker_password)

# connection log


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT broker")
    else:
        print("Failed to connect to MQTT broker")


client.on_connect = on_connect

client.connect(broker_address, broker_port, 60)


# publishing weather data
def publish_weather():
    while True:
        temperature = random.uniform(15, 30)
        humidity = random.uniform(40, 80)
        pressure = random.uniform(1000, 1020)

        weather_data = {
            "temperature": temperature,
            "humidity": humidity,
            "pressure": pressure
        }

        payload = json.dumps(weather_data)

        client.publish(topic, payload)

        print("Published weather data:", payload)

        time.sleep(10)


client.loop_start()
publish_weather()
