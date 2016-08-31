package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"net/http"
	"os"
)

type Meteor struct {
	NasaId   int
	Name     string
	NameType string
	Class    string
	Fall     string
	MassG    int32
	Date     string
	Lat      float32
	Long     float32
}

func getDBConnection() (*sql.DB, error) {
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@/nasa_datasets", os.Getenv("MYSQL_USER"), os.Getenv("MYSQL_PASS")))
	if err != nil {
		panic(err.Error())
	}

	return db, err
}

func getMeteors(w http.ResponseWriter, r *http.Request) {
	db, err := getDBConnection()
	defer db.Close()

	rows, err := db.Query("SELECT * FROM meteor_landings")
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

	var (
		meteor  Meteor
		meteors []Meteor
	)

	for rows.Next() {
		err := rows.Scan(&meteor.NasaId,
			&meteor.Name,
			&meteor.NameType,
			&meteor.Class,
			&meteor.Fall,
			&meteor.MassG,
			&meteor.Date,
			&meteor.Lat,
			&meteor.Long)
		if err != nil {
			panic(err.Error())
		}
		meteors = append(meteors, meteor)
	}
	err = rows.Err()
	if err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(meteors)
}

func main() {
	http.HandleFunc("/meteors", getMeteors)
	http.ListenAndServe(":8080", nil)
}
