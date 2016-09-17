package main

import (
	"encoding/json"
	"net/http"

	"github.com/AnthonyBobsin/wowmeteors/config"
	"github.com/AnthonyBobsin/wowmeteors/models"
	_ "github.com/go-sql-driver/mysql"
)

func getMeteors(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(
		models.AllMeteors(
			r.FormValue("lowerLimit"),
			r.FormValue("upperLimit"),
		),
	)
}

func addDefaultHeaders(fn http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fn(w, r)
	}
}

func main() {
	config.InitDB("mysql")
	defer config.DB.Close()

	http.HandleFunc("/meteors", addDefaultHeaders(getMeteors))
	http.ListenAndServe(":8080", nil)
}
