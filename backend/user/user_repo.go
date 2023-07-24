package user

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
)

type UserRepo interface {
	Register(ctx context.Context, sql *sql.Tx, user User) (User, error)
	Login(ctx context.Context, sql *sql.Tx, username string) (User, error)
	UpdateProfile(ctx context.Context, sql *sql.Tx, urlImage string, username string) error
	GetUserByUsername(ctx context.Context, sql *sql.DB, username string) (User, error)
}
type UserImplementation struct {
}

func NewUserRepoRepository() UserRepo {
	return &UserImplementation{}
}

func (userRepo *UserImplementation) Register(ctx context.Context, sql *sql.Tx, user User) (User, error) {
	SqlQuery := "insert into users(username,password,image_url) values(?,?,?)"
	result, err := sql.ExecContext(ctx, SqlQuery, user.Username, user.Password, user.ImageUrl)
	if err != nil {
		return User{}, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return User{}, err
	}
	user.Id = int32(id)
	return user, nil

}

func (userRepo *UserImplementation) Login(ctx context.Context, sql *sql.Tx, username string) (User, error) {
	sqlQuery := "SELECT username,password,image_url FROM users WHERE username = ? LIMIT 1"
	rows, err := sql.QueryContext(ctx, sqlQuery, username)
	if err != nil {
		return User{}, err
	}
	defer rows.Close()
	userlogin := User{}
	if rows.Next() {
		if err := rows.Scan(&userlogin.Username, &userlogin.Password, &userlogin.ImageUrl); err != nil {
			return User{}, err
		}
		fmt.Println(userlogin.Password)
		return userlogin, nil
	} else {
		return User{}, errors.New("User Not Found")
	}
}
func (userRepo *UserImplementation) GetUserByUsername(ctx context.Context, sql *sql.DB, username string) (User, error) {
	sqlQuery := "SELECT username,image_url from users where username = ?"
	rows, err := sql.QueryContext(ctx, sqlQuery, username)
	if err != nil {
		return User{}, err
	}
	defer rows.Close()
	user := User{}
	if rows.Next() {
		if err := rows.Scan(&user.Username, &user.ImageUrl); err != nil {
			return User{}, err
		}
		return user, nil
	} else {
		return User{}, err
	}
}

func (userRepo *UserImplementation) UpdateProfile(ctx context.Context, sql *sql.Tx, urlImage string, username string) error {
	sqlUpdate := "UPDATE users SET image_url= ? WHERE username = ?"
	_, err := sql.ExecContext(ctx, sqlUpdate, urlImage, username)
	if err != nil {
		return err
	}
	return nil

}
