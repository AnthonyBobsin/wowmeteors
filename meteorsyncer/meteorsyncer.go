package main

import (
	"encoding/json"
	"net/http"
	"strings"

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

	batchInsSize := 5000
	var sqlInsStr string
	var meteors []JSONMeteor
	var currentBatch []JSONMeteor

	getJSON("https://data.nasa.gov/resource/y77d-th95.json", &meteors)

	for i := 0; i < len(meteors); i += batchInsSize {
		currentBatch = meteors[i : i+batchInsSize]
		sqlInsStr = "INSERT IGNORE INTO meteor_landings(nasa_id, name, type, class, fall, mass_g, date_utc, location_lat, location_long) VALUES "
		values := []interface{}{}

		for _, meteor := range currentBatch {
			sqlInsStr += "( ?, ?, ?, ?, ?, ?, ?, ?, ? ),"
			values = append(values, meteor.NasaID, meteor.Name, meteor.NameType, meteor.Class, meteor.Fall, meteor.MassG, meteor.Date, meteor.Lat, meteor.Long)
		}
		sqlInsStr = strings.TrimSuffix(sqlInsStr, ",")

		stmtIns, err := config.DB.Prepare(sqlInsStr)
		if err != nil {
			panic(err.Error())
		}
		defer stmtIns.Close()

		_, err = stmtIns.Exec(values...)
		if err != nil {
			panic(err.Error())
		}

	}
}
