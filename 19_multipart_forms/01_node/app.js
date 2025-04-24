import express from 'express';

const app = express();


app.use(express.urlencoded({extended: true }));

import multer from 'multer';
//const upload = multer({dest: "uploads/" })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(undefined, './uploads');
    },
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const uniqueFilename = `${uniquePrefix}_${file.originalname}`;

        cb(undefined, uniqueFilename);
    }
})

function fileFilter(req, file, cb) {
    const validTypes = ["image/png", "image/svg", "image/jpeg"];

    if (!validTypes)
    {
        cb(new Error("file type not allowed" + file.mimetype), false);
    }
    else
    {
        cb(null, true);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 20 * 1024 * 1024 // 20mb
    },
    fileFilter
})


app.post("/form", (req, res) => {
    console.log(req.body);
    delete req.body.password; // remove password, so we don't send it back
    res.send(req.body); // data type is json
})

app.post("/fileform", upload.single("file"), (req, res) => {
    console.log(req.body);
    res.send({ })
});



const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => console.log("server is running on port", PORT));