package document

import (
	"database/sql"
	con "tisko/connection_database"
	h "tisko/helper"
	path "tisko/paths"
)


type Document struct {
	Id            uint64      `gorm:"primaryKey" json:"id"`
	Name            string    `gorm:"column:name" json:"name"`
	Link            string    `gorm:"column:link" json:"link"`
	Note            string    `gorm:"column:note" json:"note"`
	ReleaseDate     sql.NullTime `gorm:"column:release_date" json:"release_date"`
	Deadline        sql.NullTime `gorm:"column:deadline" json:"deadline"`
	OrderNumber     uint64      `gorm:"column:order_number" json:"order_number"`
	Version         string    `gorm:"column:version" json:"version"`
	PrevVersionId   uint64      `gorm:"column:prev_version_id" json:"prev_version_id"`
	Assigned        string    `gorm:"column:assigned_to" json:"assigned_to"`
	RequireSuperior bool      `gorm:"column:require_superior" json:"require_superior"`
	Edited          bool      `gorm:"column:edited" json:"-"`
}

func init() {
	confirm=h.ReturnTrimFile("./config/confirm.txt")
	addSignAfterConfirmDoc = h.ReturnTrimFile("./config/add_sign_after_confirm_doc.txt")
}

func AddHandle() {
	con.AddHeaderPost(path.DocumentAdd, createDoc)
	con.AddHeaderPost(path.DocumentUpdate, updateDoc)
	con.AddHeaderGetID(path.DocumentConfirm, confirmDoc)
	con.AddHeaderPost(path.DocumentUpdateConfirm, updateConfirmDoc)
	con.AddHeaderPost(path.DocumentCreateConfirm, createConfirmDoc)
}
