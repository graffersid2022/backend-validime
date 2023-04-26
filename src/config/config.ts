import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'validiMe';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'validiMe';
const CLOUD_PASSWORD = 'validiMe'
const LOCAL_URL = 'mongodb://127.0.0.1:27017/ideaDB'
let MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${CLOUD_PASSWORD}@cluster0.yhnajx7.mongodb.net/?retryWrites=true&w=majority`

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 80 || 9090;

const imageURL = 'http://192.168.1.79/uploads/'
const JWT_SECRET = '9e703762cd254ed1420ad1be4884fd4d'
const JWT_TOKEN_EXPIRED = '24h'

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    token: {
        JWT_SECRET: JWT_SECRET,
        JWT_TOKEN_EXPIRED: JWT_TOKEN_EXPIRED
    },
    bucket:{
        aws: imageURL
    }
}
