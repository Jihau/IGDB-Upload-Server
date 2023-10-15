import * as dotenv from "dotenv";
import express from "express";
import crypto from "crypto";
import GridFsStorage from "multer-gridfs-storage";
import path from "path";
import multer from "multer";
import {GridFSBucket} from "mongodb";
import mongoose from "mongoose";

const {ObjectId} = mongoose.Types;

const app = express();
dotenv.config();
app.use(express.json());
app.listen(process.env.PORT);

const mongoURI = `mongodb+srv://${encodeURIComponent(process.env.MONGO_USER as string)}:${encodeURIComponent(process.env.MONGO_PASS as string)}@${encodeURIComponent(process.env.MONGODB_HOST as string)}/${encodeURIComponent(process.env.MONGODB_DATABASE as string)}?retryWrites=true&w=majority`;

const conn = mongoose.createConnection(mongoURI);

let gfs: GridFSBucket;

const bucketName = process.env.BUCKET_NAME as string;
conn.once("open", () => {
    // init stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: bucketName
    });
    console.log("Connection Successful");
});

// Storage
const storage = new GridFsStorage({
    db: conn, file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename, bucketName: bucketName
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({
    storage
});

app.post("/file", upload.single("file"), (req, res) => {
    res.json({file: req.file})
});

app.get("/file/:id", (req, res) => {
    gfs.find(new ObjectId(req.params.id)).toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({err: "No files exist"});
        }
        gfs.openDownloadStream(new ObjectId(req.params.id)).pipe(res);
    });
});

app.get("/file", (req, res) => {
    gfs.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({err: "No files exist"});
        }
        return res.json(files);
    });
});

app.delete("/file/:id", (req, res) => {
    gfs.delete(new ObjectId(req.params.id), (err, data) => {
        if (err) return res.status(404).json({err: err.message});
        res.json({message: "File deleted successfully"});
    });
});