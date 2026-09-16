import requests

response = requests.get('http://localhost:3000/what-is-menstrual-cycle')
if "MEDICAL DISCLAIMER" in response.text:
    print("Found Medical Disclaimer text")
else:
    print("Did NOT find Medical Disclaimer text")
