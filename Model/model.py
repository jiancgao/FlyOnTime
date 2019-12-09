import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import pickle

# calculate accuracy, precision and recall
def metrics(pred, label):
    tp = 0
    tf = 0
    totalp = 0
    totalf = 0
    predp = 0
    for p, l in zip(pred, label):
        if l == 1.0:
            totalp += 1
            if p == l:
                tp += 1
                predp += 1
        else:
            totalf += 1
            if p == l:
                tf += 1
            else:
                predp += 1
    
    if predp == 0:
        predp = 1
    
    return (tp+tf) / (totalf+totalp), tp/ predp, tp / totalp
        

file = pd.read_csv('../alldata.csv')
# filter out 
file = file[file['CANCELLED'] == 0.0]
file = file[file['DIVERTED'] == 0.0]
file = file.fillna({'ARR_DEL15': 0.0})
file = file.fillna({'ARR_DELAY_GROUP': 0})
file = file.fillna({'ARR_DELAY_NEW': 0.0})
# select relevant columns
dataset = file[['MONTH', 'DAY_OF_WEEK',
               'ORIGIN_CITY', 'DEST_CITY',
                'DEP_TIME_BLK', 'ARR_TIME_BLK',
               'DISTANCE_GROUP','FLIGHTS', 'OP_UNIQUE_CARRIER', 
                'ARR_DELAY_NEW', 'ARR_DEL15'
               ]]
# remove duplicates
dataset.drop_duplicates(subset=['MONTH', 'DAY_OF_WEEK',
               'ORIGIN_CITY', 'DEST_CITY',
                'DEP_TIME_BLK', 'ARR_TIME_BLK',
                'OP_UNIQUE_CARRIER', 'OP_CARRIER_FL_NUM', 'CRS_DEP_TIME', 'CRS_ARR_TIME', 
               ], inplace = True) 
# one-hot encoding
dataset = pd.get_dummies(dataset)

train_x, test_x, train_y, test_y = train_test_split(
                dataset.drop(['ARR_DELAY_NEW', 'ARR_DEL15'], axis=1),
                dataset['ARR_DEL15'],
                test_size=0.2, random_state=42)

# train rf classifier on whether delay more than 15 mins or not
model = RandomForestClassifier(oob_score=True, n_estimators=500, max_depth=50, 
                               criterion='entropy', class_weight={0:1,1:2},
                               n_jobs=-1, max_leaf_nodes=None, min_samples_leaf=5,
                            random_state=0).fit(train_x, train_y)

print('feature importance:')
print('month, day, distance, num_flight', model.feature_importances_[:4])
print('origin', sum(model.feature_importances_[4:28]))
print('dest', sum(model.feature_importances_[28:52]))
print('dep_blk', sum(model.feature_importances_[52:71]))
print('arr_blk', sum(model.feature_importances_[71:90]))
print('carrier', sum(model.feature_importances_[90:]))
print()

predicted = model.predict(test_x)
print('test', model.score(test_x, test_y))
print(metrics(predicted, test_y))
print()

predicted = model.predict(train_x)
print('train', model.score(train_x, train_y))
print(metrics(predicted, train_y))
print()

print('oob', model.oob_score_)

# make prediction on new data
total_prob = model.predict_proba(dataset.drop(['ARR_DELAY_NEW', 'ARR_DEL15'], axis=1))
output = file[['MONTH', 'DAY_OF_WEEK', 'ORIGIN_CITY', 'DEST_CITY',
                'DEP_TIME_BLK', 'ARR_TIME_BLK',
                'OP_UNIQUE_CARRIER', 'OP_CARRIER_FL_NUM', 'CRS_DEP_TIME', 'CRS_ARR_TIME', 
               ]]

output.drop_duplicates(inplace = True) 
output['PREDICTED_DELAY'] = total_prob[:,1]
output.sort_values('PREDICTED_DELAY', ascending = True, inplace=True)
# write output
res = output.groupby(['MONTH', 'DAY_OF_WEEK', 'ORIGIN_CITY', 'DEST_CITY', 'DEP_TIME_BLK']).head(5)
res.to_csv('predict.csv', index = False)
