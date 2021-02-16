package training

import (
	"encoding/json"
	"net/http"
	con "tisko/connection_database"
	h "tisko/helper"
)

func updateEditedTraining(writer http.ResponseWriter, request *http.Request) {
	if con.SetHeadersReturnIsContunue(writer, request) {
		var (
			newTraining  OnlineTraining
			map0  map[string]interface{}
		)
		e := json.NewDecoder(request.Body).Decode(&map0)
		if e != nil {
			h.WriteErrWriteHaders(e, writer)
			return
		}
		e = json.NewDecoder(request.Body).Decode(&newTraining)
		if e != nil {
			h.WriteErrWriteHaders(e, writer)
			return
		}
		delete(map0,"id")
		result := con.Db.Model(&newTraining).Updates(&map0)
		if result.Error != nil {
			h.WriteErrWriteHaders(result.Error, writer)
			return
		}
		con.SendAccept(newTraining.Id, writer)
	}
}