# Private API OMDB API
- I want to create private API server that will return image url of movie poster, use third party service OMDB to get that URL.
- I need to be able to fetch all poster of all my favorite movies

## Mendesign Endpoint
- GET 
    - /movies
       - Forbidden
    - /movies/{movie title}
       - Return poster url of that movie
    - /movies/favorite
       - Return all poster url of that user’s favorite movies
- POST
    - /movies/favorite
       - Insert into user’s favorite movies
       
## Buat database dan table
untuk membuat database bisa dilakukan dengan menggunakan phpmyadmin atau dengan menggunakan sequelize

## Mengginstall dependency yang akan digunakan
- Express JS, untuk mengatur fungsionalitas website, seperti pengelolaan routing dan session, permintaan HTTP, penanganan error, serta pertukaran data di server
- mysql2, merupakan mysql client untuk nodejs
- sequelize, untuk bekerja dengan database dan relasi-relasi di dalamnya.
- axios, library opensource yang digunakan untuk request data melalui http
- jwt, untuk sistem otentikasi dan juga untuk pertukaran informasi

## Struktur Aplikasi
![image](https://user-images.githubusercontent.com/92351638/194597547-a4ad9ff3-c15e-4617-902d-0c42fb1b04ab.png)
