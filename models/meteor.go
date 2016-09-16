package models

import (
	"bytes"
	"fmt"
	"log"

	"github.com/AnthonyBobsin/wowmeteors/config"
)

// Meteor struct that wraps meteors table row
type Meteor struct {
	NasaID   int     `json:"nasaId"`
	Name     string  `json:"name"`
	NameType string  `json:"nameType"`
	Class    string  `json:"class"`
	Fall     string  `json:"fall"`
	MassG    int32   `json:"massG"`
	Date     string  `json:"date"`
	Lat      float32 `json:"lat"`
	Long     float32 `json:"long"`
}

// AllMeteors Query MySQL database for all rows from the meteors table within limit
func AllMeteors(lowerLimit string, upperLimit string) []Meteor {
	var buffer bytes.Buffer

	buffer.WriteString("SELECT * FROM meteor_landings")

	if len(lowerLimit) > 0 && len(upperLimit) > 0 {
		buffer.WriteString(fmt.Sprintf(" LIMIT %s, %s", lowerLimit, upperLimit))
	}

	rows, err := config.DB.Query(buffer.String())
	if err != nil {
		log.Panic(err.Error())
	}
	defer rows.Close()

	var (
		meteor  Meteor
		meteors []Meteor
	)

	for rows.Next() {
		err = rows.Scan(&meteor.NasaID,
			&meteor.Name,
			&meteor.NameType,
			&meteor.Class,
			&meteor.Fall,
			&meteor.MassG,
			&meteor.Date,
			&meteor.Lat,
			&meteor.Long)

		if err != nil {
			log.Panic(err.Error())
		}
		meteors = append(meteors, meteor)
	}
	err = rows.Err()
	if err != nil {
		log.Panic(err)
	}

	return meteors
}
