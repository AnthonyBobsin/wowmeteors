# wowmeteors

## Setup
- Create a MySQL database named `nasa_datasets`
```
mysql> create schema nasa_datasets;
```
- Import the provided schema dump file, replacing `username` with your MySQL username
```
mysql -u username -p nasa_datasets < config/dbschema/nasa_datasets_dump.sql
```
