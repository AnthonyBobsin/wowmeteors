package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/AnthonyBobsin/wowmeteors/models"
	_ "github.com/go-sql-driver/mysql"
)

func getDBConnection() (*sql.DB, error) {
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@/nasa_datasets", os.Getenv("MYSQL_USER"), os.Getenv("MYSQL_PASS")))
	if err != nil {
		panic(err.Error())
	}

	return db, err
}

func getJSON(url string, target interface{}) error {
	r, err := http.Get(url)
	if err != nil {
		return err
	}
	defer r.Body.Close()

	return json.NewDecoder(r.Body).Decode(target)
}

func main() {
	db, err := getDBConnection()
	defer db.Close()

	// Prepare statement for inserting data TODO: use multi insert
	stmtIns, err := db.Prepare("INSERT IGNORE INTO meteor_landings VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ? )")
	if err != nil {
		panic(err.Error())
	}
	defer stmtIns.Close()

	var meteors []models.Meteor
	getJSON("https://data.nasa.gov/resource/y77d-th95.json", &meteors)

	for _, meteor := range meteors {
		_, err := stmtIns.Exec(meteor.NasaID, meteor.Name, meteor.NameType, meteor.Class, meteor.Fall, meteor.MassG, meteor.Date, meteor.Lat, meteor.Long)
		if err != nil {
			panic(err.Error())
		}
	}
}
