package helper

import (
	"context"
	"fmt"
	"time"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/rifki321/warungku/config"
)

func UploadHelper(input interface{}) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	cld, err := cloudinary.NewFromParams(config.EnvCloudName(), config.EnvCloudPublicKey(), config.EnvCloudPrivateKey())
	if err != nil {
		panic(err)
	}
	fmt.Println(config.EnvCloudName())
	uploadParams, err := cld.Upload.Upload(ctx, input, uploader.UploadParams{Folder: config.EnvFolderName()})
	if err != nil {
		panic(err)
	}
	return uploadParams.SecureURL, nil
}
