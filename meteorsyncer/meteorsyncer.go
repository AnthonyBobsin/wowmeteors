package main

import (
	"encoding/json"
	"net/http"

	"github.com/AnthonyBobsin/wowmeteors/config"
	_ "github.com/go-sql-driver/mysql"
)

// JSONMeteor struct that maps json format to meteors table schema
type JSONMeteor struct {
	NasaID   int     `json:"id,string"`
	Name     string  `json:"name"`
	NameType string  `json:"nametype"`
	Class    string  `json:"recclass"`
	Fall     string  `json:"fall"`
	MassG    int32   `json:"mass,string"`
	Date     string  `json:"year"`
	Lat      float32 `json:"reclat,string"`
	Long     float32 `json:"reclong,string"`
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
	config.InitDB("mysql")
	defer config.DB.Close()

	// Prepare statement for inserting data TODO: use multi insert
	stmtIns, err := config.DB.Prepare("INSERT IGNORE INTO meteor_landings VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ? )")
	if err != nil {
		panic(err.Error())
	}
	defer stmtIns.Close()

	var meteors []JSONMeteor
	getJSON("https://data.nasa.gov/resource/y77d-th95.json", &meteors)

	for _, meteor := range meteors {
		_, err := stmtIns.Exec(meteor.NasaID, meteor.Name, meteor.NameType, meteor.Class, meteor.Fall, meteor.MassG, meteor.Date, meteor.Lat, meteor.Long)
		if err != nil {
			panic(err.Error())
		}
	}
}
