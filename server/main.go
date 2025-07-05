package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	InitDB()
	defer CloseDB()

	http.HandleFunc("/helloworld", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Fprintln(w, "Hello, World!")
	})

	port := "8000"
	fmt.Println("Go server running at http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
