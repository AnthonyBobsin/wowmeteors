package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"
)

// DB reference to initialized MySQL database
var DB *sql.DB

// InitDB Initialize database connection
func InitDB(adapter string) {
	var err error

	DB, err = sql.Open(adapter, fmt.Sprintf("%s:%s@/nasa_datasets", os.Getenv("MYSQL_USER"), os.Getenv("MYSQL_PASS")))
	if err != nil {
		log.Panic(err.Error())
	}

	if err = DB.Ping(); err != nil {
		log.Panic(err)
	}
}
