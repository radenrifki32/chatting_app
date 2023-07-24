package webproduct

import "mime/multipart"

type RequestProduct struct {
	Id           int32
	NamaProduct  string
	HargaProduct string
	Quantity     int32
}

type File struct {
	File multipart.File `json:"file,omitempty"`
}

type Url struct {
	Url string `json:"url,omitempty"`
}
