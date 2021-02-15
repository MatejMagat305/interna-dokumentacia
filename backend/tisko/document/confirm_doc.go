package document

import (
	"github.com/gorilla/mux"
	"gorm.io/gorm"
	"net/http"
	"strconv"
	con "tisko/connection_database"
	h "tisko/helper"
)

func confirmDoc(writer http.ResponseWriter, request *http.Request) {
	tx := con.Db.Begin()
	defer tx.Rollback()
	if con.SetHeadersReturnIsContunue(writer, request) {
		id, err := strconv.ParseUint(mux.Vars(request)["id"],10,64)
		if err != nil {
			h.WriteErrWriteHaders(err, writer)
			return
		}
		err = doConfirm(id, tx)
		if err != nil {
			h.WriteErrWriteHaders(err, writer)
			return
		}
		tx.Commit()
		con.SendAccept(id, writer)
	}
}

func doConfirm(id uint64, tx *gorm.DB) (err error) {
	var respon h.StringsBool
	re := tx.Raw(confirm, id).Find(&respon)
	err = re.Error
	if err != nil {
		return
	}
	return AddSignature(respon, id, tx)
}