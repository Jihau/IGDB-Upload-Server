# IGDB's Upload Server

this is a server that allows you to upload files to a mongodb database using GridFS. It also allows you to list, render and delete files from the database.

## Using new GridFS bucket

About GridFS [read more](https://docs.mongodb.com/manual/core/gridfs/)

To read more about the GridFS bucket [read more](https://mongodb.github.io/node-mongodb-native/3.2/api/GridFSBucket.html)

## API Endpoints

- Able to list all files
- Able to upload file
- Able to render file
- Able to Delete file and chunks from the db

## How to run

1. Place `.env` file in the root directory with the following variables

2. Install Dependencies:
```
npm install
```
3. Start the server:
```
npm start
```
Server URL [http://localhost:3001](http://localhost:5001)

## Notes

The images/files are stored in two collections (depending on the bucket name) in your mongodb database.

- `uploads.files`: contains the file's information and metadata
- `uploads.chunks`: contains the binary chunks of the file
