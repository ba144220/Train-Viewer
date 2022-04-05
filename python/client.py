import requests

pin = 6
plotTitle = 'bleu'

url = f'http://localhost:5000/plots/update?pin={pin}&plotTitle={plotTitle}'
myobj = {'title': 'bleu','x':1200, 'y':4000}

x = requests.post(url, data = myobj)

print(x.status_code)