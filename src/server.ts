import express from "express";
import http from 'http';
import mongoose from 'mongoose';
import passport from 'passport';
const session = require('express-session');
import bodyParser from "body-parser";
import morgan from 'morgan'
const LocalStrategy = require('passport-local').Strategy;
import { config } from './config/config';
import Logging from "./library/Loggin";
import User from "./models/User";
import * as bcrypt from 'bcrypt'
import cors from "cors"
var path = require('path');

const router = express();


import userRoutes from './routes/userRouter';


/* connect to mongodb */
mongoose.connect(config.mongo.url)
.then(()=> {
    //startServer();
    Logging.info('Connected to mongoDB');
})
.catch(error => {
    Logging.error('Unable to connect: ');
    Logging.error(error);
})
/* only start the server if Mongo Connects */

const saltRounder = 10;

router.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false, maxAge:null}  //maxAge 60 second
})) 

router.use(passport.initialize());
router.use(passport.session());

// Body Parser 
router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
router.use(express.json());
router.use(cors());
router.use(morgan('combined'))

router.use(express.static(path.join(__dirname, 'public')));

/*
passport.use(new LocalStrategy(
    function(email: any, password: any, done: any) {
        console.log('-- call passport --')
        console.log('-> email :', email)
        User.findOne({email: email}, function (err: any, user: any) {
            console.log('=> user :', user)
            if (err) {
                return done(err); 
            }
            if (!user) {
                return done(null, false, {message: 'incorrect email.'}); 
            }
            if (!user.password == password) { 
                return done(null, false, {message: 'incorrect password.' }); 
            }
            return done(null, user);
        });
    }
));

passport.serializeUser((user: any, done) => {
    if(user) {
        return done(null, user)
    }
    return done(null, false);
});

passport.deserializeUser((user:any, done) => {
    return done(null, user);
});


router.post('/api/v1/login', passport.authenticate('local'), function(req, res, next) {
    if(req.user){
        return res.send({status: 200, message: 'login successfully', data: req.user})
    }
    else {
        return res.send({status: 400, message: 'username password incorrect'})
    }
});
*/

export default function isAuthenticated(req: any, res: any, done: any) {
    console.log('header :', req.headers.token);

    console.log('Auth :', req.session)
    if (req.headers.token) {
        return res.status(400).json({success: true, message: 'you are authenticated'})
        return true
    } else {
        return res.status(400).json({success: false, message: 'you are not authenticated'})
        return false  
    }

    // if(req.session){
    //     return res.status(400).json({status: false, message: 'you are authenticated'})
    //     return true
    // }
    // return res.status(400).json({status: false, message: 'you are not authenticated'})
    // return false
}

const startServer = () => {}

router.use((req, res, next) => {
    /* log the request */
    Logging.info(`Incomming -> METHOD: [${req.method}] - URL: [${req.url}]
        - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', ()=> {
        /* Log the Response */
        Logging.info(`Result -> METHOD: [${req.method}] - URL: [${req.url}]
            - IP: [${req.socket.remoteAddress}] - STATUS: [${req.statusCode}]`);
    });
    next();
});

/* Rules of our API */

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');

    if(req.method =='OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
})

/* Routes */
router.use('/api/v1', userRoutes);


/* signup functionaliy  */
/*
router.post('/api/v1/signup', (req: any, res: any, done: any)=> { 
    let number = req.body.contactNumber;
    if(number.length != 10) {
        return res.status(400).json({
            status: false,
            message: 'contact number must be 10 digits.'
        });
    }
    let emailId = req.body.email
    if (emailId) {
		var validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var results = validRegex.test(emailId)
		if (results == false) {
			return res.status(400).json({
                success: false,
                msg: "you have entered an invalid email address!"
            });
		}
	}
     User.findOne({email: req.body.email}, (err: any, user: any) =>{
        if(err) done(null, false);
        else if(user)
            return res.status(400).json({
                status: false,
                message: 'user already registered'
            });
        else {
            const hash = bcrypt.hashSync(req.body.password, saltRounder)
            User.create({
                username: req.body.email,
                fullName: req.body.fullName,
                contactNumber: req.body.contactNumber,
                email: req.body.email,
                password: req.body.password 
            }, (err, user) => {
                if(err) done(null, false);
                done(null, user)
            })
        }
    })
    }, passport.authenticate('local'), function(req, res) {
    return res.status(200).json({
        status: true,
        message: 'user register successfully',
        data: req.user
    })
})
*/

/*Healthcheck*/
router.get('/api/v1/authenticated', isAuthenticated, (req, res, next) => {
    console.log('-- call api --')
    return res.status(200).json({status: true, message: 'you are authenticated'})
});

/* Logout */
router.post('/logout',
    passport.authenticate('local'),
    function(req, res, next){
        req.logout();
        return res.status(200).json({status: true, message: 'Logged out'})
        //res.send("Logged out")
})
    
/* Error Handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    Logging.error(error);

    return res.status(404).json({message: error.message});
});

http.createServer(router).listen(config.server.port, () => Logging.info(`server is running on port ${config.server.port}.`));

