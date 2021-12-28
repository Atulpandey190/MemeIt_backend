import dotenv from "dotenv";
import aws from "aws-sdk";
import crypto from "crypto";
import { promisify } from "util";
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

export async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  //Unique Image Name 
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName, //Bucket Name
    Key: imageName,     
    Expires: 60,        //Access URL Expires In
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}
