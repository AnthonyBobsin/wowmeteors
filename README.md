# WowMeteors!

## Database Setup
- Create a MySQL database named `nasa_datasets`
```
mysql> create schema nasa_datasets;
```
- Import the provided schema dump file, replacing `username` with your MySQL username
```
mysql -u username -p nasa_datasets < config/dbschema/nasa_datasets_dump.sql
```
- Set environment variables `MYSQL_USER` and `MYSQL_PASS` to the correct credentials
- Trigger the meteor syncer to ETL [NASA's Meteor Landings Dataset](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh) to our local database
```
go run meteorsyncer/meteorsyncer.go
```
