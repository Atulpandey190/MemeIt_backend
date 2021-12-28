const dotenv = require("dotenv");
const aws = require("aws-sdk");
const crypto = require("crypto");
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);

dotenv.config();

const region = "us-east-1";
const bucketName = "memeit-direct-upload";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

 async function generateUploadURL() {
   console.log("generate url working")
  const rawBytes = await randomBytes(16);
  //Unique Image Name
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName, //Bucket Name
    Key: imageName,
    Expires: 60, //Access URL Expires In
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

module.exports=generateUploadURL;