import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os

with open("top30.csv") as file:
    top30 = file.read().strip().split("\n")

top10 = set(top30[:10])
top20 = set(top30[:20])
top30 = set(top30)

dir = "data_top_30/"
alldata = pd.concat([pd.read_csv(dir + file) for file in os.listdir(dir)])
airports = pd.read_csv("top30_airports.csv")
cities = {airports["Code"].iloc[i]: airports["City"].iloc[i] for i in range(len(airports))}
alldata["ORIGIN_CITY"] = alldata["ORIGIN"].map(lambda x: cities[x])
alldata["DEST_CITY"] = alldata["DEST"].map(lambda x: cities[x])
alldata = alldata[(alldata["CANCELLED"] == 0) & (alldata["DIVERTED"] == 0)]
alldata.sample(n=1000, random_state=1).to_csv("alldata_sampled.csv", index=False)
alldata["ARR_DELAY_BOOL"] = alldata["ARR_DELAY_NEW"] > 0
output = alldata.groupby(["MONTH", "DAY_OF_WEEK", "OP_UNIQUE_CARRIER", "ORIGIN_CITY", "DEST_CITY", "DEP_TIME_BLK"]) \
    .agg({"ARR_DELAY": "sum", "ARR_DELAY_NEW": "sum", "TAXI_OUT": "size", "ARR_DELAY_BOOL": "sum"}).rename(
    columns={"ARR_DELAY": "DELAY_SUM_WITH_NEG", "ARR_DELAY_NEW": "DELAY_SUM", "TAXI_OUT": "NUM_TOTAL",
             "ARR_DELAY_BOOL": "NUM_DELAY"}).reset_index()
output.sample(n=5000, random_state=1).to_csv("delay_sampled.csv", index=False)

dow = alldata.groupby("DAY_OF_WEEK")["ARR_DELAY"].mean()
plt.bar(["Mon","Tue","Wed","Thu","Fri",'Sat',"Sun"],dow)
plt.ylabel("Average Delay Time")
plt.title("Airline Delay Time over Day of the Week")
plt.savefig("dow.png")

alldata["DEP_TIME_BLK_SMALL"] = alldata["DEP_TIME"]//100+((alldata["DEP_TIME"]%100)//20)/3
dtb = alldata[(alldata["DEP_TIME_BLK_SMALL"]>=6) &(alldata["DEP_TIME_BLK_SMALL"]<24)].groupby("DEP_TIME_BLK_SMALL")["ARR_DELAY"].mean()
dtb = pd.DataFrame(dtb)
plt.xlabel('Departure Time (local time)')
plt.ylabel('Average Delay Time')
plt.title("Airline Delay Time over Departure Time")
plt.grid(True)
plt.plot(dtb, "-o")
# plt.legend(loc=4)
time = list(range(6,25))
plt.xticks(time)
plt.show()

dr = []
reasons =  ["CARRIER_DELAY","WEATHER_DELAY","NAS_DELAY","SECURITY_DELAY","LATE_AIRCRAFT_DELAY"]
for reason in reasons:
    dr.append(alldata[reason].sum())
plt.pie(reasons,dr)