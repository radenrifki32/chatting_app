package upload

import (
	"fmt"

	"github.com/rifki321/warungku/helper"
	"github.com/rifki321/warungku/product/webproduct"
)

type MediaUpload interface {
	FileUpload(file webproduct.File) (string, error)
	RemoteUpload(url webproduct.Url) (string, error)
}

type media struct{}

func NewMedia() *media {
	return &media{}
}

func (media *media) FileUpload(file webproduct.File) (string, error) {
	upload, err := helper.UploadHelper(file.File)
	fmt.Println(upload, "upload")
	if err != nil {
		return "", err
	}
	return upload, nil
}

func (media *media) RemoteUpload(url webproduct.Url) (string, error) {
	remote, err := helper.UploadHelper(url.Url)
	if err != nil {
		return "", err
	}
	return remote, nil
}
