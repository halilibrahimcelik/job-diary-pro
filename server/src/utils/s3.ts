import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

// Actually configure dotenv
dotenv.config();

console.log('S3.ts - BUCKET_REGION:', process.env.BUCKET_REGION);

export const s3Client = new S3Client({
  region: process.env.BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});
