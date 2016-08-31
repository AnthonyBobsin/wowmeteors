package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

// Meteor struct that maps db schema to json format
type Meteor struct {
	Name     string `json:"name"`
	ID       string `json:"id"`
	NameType string `json:"nametype"`
	Class    string `json:"recclass"`
	Fall     string `json:"fall"`
	MassG    string `json:"mass"`
	Date     string `json:"year"`
	Lat      string `json:"reclat"`
	Long     string `json:"reclong"`
}

func (m Meteor) formattedMassG() string {
	if len(m.MassG) == 0 {
		return "0"
	}
	return m.MassG
}

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

	var meteors []Meteor
	getJSON("https://data.nasa.gov/resource/y77d-th95.json", &meteors)

	for _, meteor := range meteors {
		_, err := stmtIns.Exec(meteor.ID, meteor.Name, meteor.NameType, meteor.Class, meteor.Fall, meteor.formattedMassG(), meteor.Date, meteor.Lat, meteor.Long)
		if err != nil {
			panic(err.Error())
		}
	}
}
