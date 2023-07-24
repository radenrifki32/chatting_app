package web

type RegisterRequest struct {
	Username  string `json:"username"`
	Password  string `json:"password"`
	Image_url string `json:"image_url"`
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
