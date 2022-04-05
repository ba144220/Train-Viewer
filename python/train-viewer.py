
import requests
import json

class Figure:
    def __init__(self,pin, plot_titles):
        self.base_url = 'http://localhost:5000'
        self.pin = pin
        self.plots = plot_titles

        # send create fig
        x = requests.post(self.base_url+'/plots/create/'+pin, data = {'plot_titles':plot_titles})
        obj = json.loads(x.text)  

        if x.status_code!=200:
            print('WARNING: '+ obj['message'])
            return 
        print('Successfully create a figure on Train Viewer ~~~')
    def update(self, plot_title, data_title, x, y):
        url = f'{self.base_url}/plots/update?pin={self.pin}&plotTitle={plot_title}'
        payload = {
            'title':data_title,
            'x':x,
            'y':y
        }
        x=requests.post(url, payload)
        obj = json.loads(x.text)  
        if x.status_code!=200:
            print('WARNING: '+ obj['message'])
            return
        print('Successfully update the fig')


# import random
# import time
# fig = Figure('186877', ['acc','loss','bleu'])
# time.sleep(10)

# train_acc = 0
# val_acc = 0
# train_loss = 10
# val_loss = 10

# for i in range(20):
#     fig.update('acc', 'train_acc', i+1, train_acc )
#     fig.update('acc', 'val_acc', i+1, val_acc)
#     fig.update('loss', 'train_loss', i+1, train_loss)
#     fig.update('loss', 'val_loss', i+1, val_loss)
#     fig.update('bleu', 'val_loss', i+1, val_loss)
#     train_acc += 5*random.random()
#     val_acc += 4.8*random.random()
#     train_loss -= 1.0*random.random()
#     val_loss -= 0.9*random.random()
#     time.sleep(5)
    

    
    
