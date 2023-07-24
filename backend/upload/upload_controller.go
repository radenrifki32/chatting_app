package upload

import (
	"fmt"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/rifki321/warungku/helper"
	"github.com/rifki321/warungku/product/webproduct"
)

type Upload interface {
	FileUpload(w http.ResponseWriter, r *http.Request, _ httprouter.Params)
}
type UploadController struct {
	ServiceUpload MediaUpload
}

func NewContrrolerUplaod(serviceUpload MediaUpload) *UploadController {
	return &UploadController{ServiceUpload: serviceUpload}
}
func (service *UploadController) FileUpload(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	if r.Method != http.MethodPost {
		helper.Response(w, http.StatusBadRequest, "METHOD NOT FOUND", nil)
		return
	}
	if err := r.ParseMultipartForm(40 << 32); err != nil {
		helper.Response(w, http.StatusBadRequest, "FILES TOO BIG", nil)
		return
	}
	file, _, err := r.FormFile("file")
	if err != nil {
		helper.Response(w, http.StatusBadRequest, "error retrivice file", nil)
		return
	}
	defer file.Close()
	uploadFile := webproduct.File{File: file}
	uploadUrl, err := service.ServiceUpload.FileUpload(uploadFile)
	fmt.Println(uploadUrl)
	if err != nil {
		helper.Response(w, http.StatusInternalServerError, "INTERNAL SERVER ERROR", nil)
		return
	}
	helper.Response(w, http.StatusOK, "SUCCESS", uploadUrl)

}
