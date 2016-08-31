package models

// Meteor struct that wraps meteors table row, and maps to json format
type Meteor struct {
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
