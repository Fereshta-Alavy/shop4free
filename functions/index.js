const functions = require("firebase-functions");

const gchconfig = {
  projectId: "donate4free",
  keyFileName: "donate4free-firebase-adminsdk-t1z9t-040c31c2cd.json"
};

const gcs = require("@google-cloud/storage")(gchconfig);
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const path = require("path");
const os = require("os");
const fs = require("fs");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onFileChange = functions.storage.object().onArchive(event => {
  console.log(event);
  return;
});

exports.uploadFiles = functions.https.onRequest((req, res) => {
  //   res.set("Access-Control-Allow-Origin", "*");
  //   res.set("Access-Control-Allow-Credentials", "true");
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        message: " Not allowed"
      });
    }

    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on("finish", () => {
      const bucket = gcs.bucket("donate4free.appspot.com");
      bucket
        .upload(uploadData.file, {
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        .then(() => {
          return res.status(200).json({
            message: "it worked"
          });
        })
        .catch(err => {
          return res.status(500).json({
            error: err
          });
        });
    });
    busboy.end(req.rawBody);
  });
});
