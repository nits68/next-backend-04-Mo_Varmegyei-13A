@echo off
chcp 65001
mongoimport --uri="mongodb://localhost:27017" --db=countiesDB --collection=cities --drop --file=cities.json --jsonArray
mongoimport --uri="mongodb://localhost:27017" --db=countiesDB --collection=counties --drop --file=counties.json --jsonArray
echo PLEASE KILL AND RESTART YOUR BACKEND SERVER DEV TASK IF RUNNING!
pause