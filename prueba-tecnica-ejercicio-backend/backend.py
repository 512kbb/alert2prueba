import http.client
import json
from datetime import datetime
from pytz import timezone

email = ""
password = ""

def getToken(email, password):
    credentials = {"email": email, "password": password}
    conn = http.client.HTTPSConnection("devtest.a2g.io")
    payload = json.dumps(credentials)
    headers = { 'Content-Type': "application/json" }
    conn.request("POST", "/api/Auth?=", payload, headers)
    res = conn.getresponse()
    data = res.read()
    parsed_data = json.loads(data)
    token = parsed_data["token"]
    return token

def getSensorInfo(token, sensorId):
    conn = http.client.HTTPSConnection("devtest.a2g.io")
    payload = ""
    headers = { 'Authorization': f"Bearer {token} "}
    conn.request("GET", f"/api/Records/{sensorId}?pageNumber=1&pageSize=10000", payload, headers)
    res = conn.getresponse()
    data = res.read()
    parsed_data = json.loads(data)
    return parsed_data

def countData(sensorData):

    low_count = 0
    medium_count = 0
    high_count = 0

    for data in sensorData:
        if data['value'] < 60:
            low_count += 1
        elif data['value'] < 120:
            medium_count += 1
        else:
            high_count += 1
    return {"noiseHigh": high_count, "noiseMedium": medium_count, "noiseLow": low_count}

def getRecordsBetweenDates(start_date, end_date, sensorData):
    count = 0
    for record in sensorData:
        ts = record['ts']
        timestamp = datetime.strptime(ts, '%Y-%m-%dT%H:%M:%S.%f')
        santiago_tz = timezone('America/Santiago')
        timestamp_santiago = timestamp.astimezone(santiago_tz)
        if start_date <= timestamp_santiago <= end_date:
            count += 1
    return count

def postResult(token, result):
    conn = http.client.HTTPSConnection("devtest.a2g.io")
    payload = json.dumps(result)
    headers = {
        'Content-Type': "application/json",
        'Authorization': f"Bearer {token}"
        }

    conn.request("POST", "/api/Result", payload, headers)
    res = conn.getresponse()
    data = res.read()
    return data.decode("utf-8")

token = getToken(email, password)
sensorId = "fb76277a-5872-4d74-a80b-4cce592c9e12"
sensorInfo = getSensorInfo(token, sensorId)
sensorData = sensorInfo["data"]
count = countData(sensorData)

santiago_tz = timezone('America/Santiago')
start_date = santiago_tz.localize(datetime(2023, 4, 10, 8, 0, 0)).astimezone(timezone('UTC'))
end_date = santiago_tz.localize(datetime(2023, 4, 11, 20, 0, 0)).astimezone(timezone('UTC'))
count["rangeAmount"] = getRecordsBetweenDates(start_date, end_date, sensorData)


print(count)
print(postResult(token, count))

