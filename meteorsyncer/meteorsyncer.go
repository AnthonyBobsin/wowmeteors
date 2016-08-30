package main

import (
  "database/sql"
  _ "github.com/go-sql-driver/mysql"
  "fmt"
  "encoding/json"
  "net/http"
  "os"
)

type Meteor struct {
  Name string     `json:"name"`
  Id string       `json:"id"`
  NameType string `json:"nametype"`
  Class string    `json:"recclass"`
  Fall string     `json:"fall"`
  MassG string    `json:"mass"`
  Date string     `json:"year"`
  Lat string      `json:"reclat"`
  Long string     `json:"reclong"`
}

func (m Meteor) formattedMassG() string {
  if len(m.MassG) == 0 {
    return "0"
  } else {
    return m.MassG
  }
}

func getJson(url string, target interface{}) error {
  r, err := http.Get(url)
  if err != nil {
    return err
  }
  defer r.Body.Close()

  return json.NewDecoder(r.Body).Decode(target)
}

func main() {
  db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@/nasa_datasets", os.Getenv("MYSQL_USER"), os.Getenv("MYSQL_PASS")))
  if err != nil {
    panic(err.Error())  // Just for example purpose. You should use proper error handling instead of panic
  }
  defer db.Close()

  // Prepare statement for inserting data TODO: use multi insert
  stmtIns, err := db.Prepare("INSERT IGNORE INTO meteor_landings VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ? )")
  if err != nil {
    panic(err.Error()) // proper error handling instead of panic in your app
  }
  defer stmtIns.Close()

  var meteors []Meteor
  getJson("https://data.nasa.gov/resource/y77d-th95.json", &meteors)

  for _,meteor := range meteors {
    _, err := stmtIns.Exec(meteor.Id, meteor.Name, meteor.NameType, meteor.Class, meteor.Fall, meteor.formattedMassG(), meteor.Date, meteor.Lat, meteor.Long)
    if err != nil {
      panic(err.Error()) // proper error handling instead of panic in your app
    }
  }
}
