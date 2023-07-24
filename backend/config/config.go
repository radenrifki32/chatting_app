package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func EnvCloudName() string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error Load Env Name")
	}
	return os.Getenv("NAME_CLOUDINARY")
}

func EnvCloudPrivateKey() string {
	if err := godotenv.Load(); err != nil {
		log.Fatal("error Loading Private Key")
	}
	return os.Getenv("PRIVATE_KEY_CLOUDINARY")
}

func EnvCloudPublicKey() string {
	if err := godotenv.Load(); err != nil {
		log.Fatal("error Load Public Key")
	}
	return os.Getenv("PRIVATE_PUBLIC_CLODINARY")
}

func EnvFolderName() string {
	if err := godotenv.Load(); err != nil {
		log.Fatal("error load env Folder Name")
	}
	return os.Getenv("FOLDER_CLOUDINARY")
}
