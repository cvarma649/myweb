const express =require("express");
const path = require("path")
const cors= require("cors");
const pool = require("./db");
const pg = require("pg");
//morgan & multer
const morgan = require("morgan")
const multer = require("multer")

const knex = require("knex")


//jwtgenerator file
const jwtGenerator = require("./jwtGenerator") 


const bcrypt = require("bcrypt");
const saltRounds=10;

const bodyParser= require("body-parser");
const urlencoder = bodyParser.urlencoded({extended:false});
const bodyJson = bodyParser.json();

require("dotenv").config();
const authorize = require("./authorization")

const cookieParser = require("cookie-parser");
const session = require("express-session");


const app=express();

app.use(express.json());
app.use(cors({
    origin:"https://chhavivarma.com",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

app.use(urlencoder);
app.use(bodyJson);
app.use(cookieParser(process.env.sessionSecret))
app.use(session({
    key: "user_id",
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 12,
    }
}))

app.use(morgan('dev'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });


//for bhideo


app.post("/api/v1/signup", urlencoder, async(req,res, next)=>{
     const {name, crude_email, password} = req.body
    const email = (req.crude_email).toLowerCase();
    const validateEmail=(email)=>{
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return  re.test(String(email));}
        try {
            const emailValidated= validateEmail(email)
            if(emailValidated){
                try {
                    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
                    
                    if (user.rows.length>0){
                        return res.status(200).json("User already exists")
                    }
                    else{
                        try {
                            const bcryptPassword = await bcrypt.hash(password, saltRounds);
                            const newUser = await pool.query("INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING * ",
                             [name, email, bcryptPassword]);
                             
                             const token = jwtGenerator(newUser.rows[0].user_id);
            
                            return res.json({token:token, user: newUser.rows[0]})
                        } catch (error) {
                            console.error(error.message)
                        }
                    }
                } catch (error) {
                    res.json(error.message)
            }} else{
            res.send("Email Invalid")
            }
        } catch {
            res.send("Please provide a valid email")
        }
       
   
    }
    )

app.get("/api/v1/signup", async(req, res, next)=>{
   
    try {
        const allUsers= await pool.query("SELECT * FROM users;")
        res.send(allUsers.rows)
        next()
    } catch (err) {
        console.error(err)
    }
})

app.put("/api/v1/prod-desc/:id", async(req,res)=>{
    try {
        const {id}= req.params
        const {desc}=req.body
        const updateDesc = await pool.query("UPDATE products SET product_description=$1 WHERE product_id=$2",[desc, id])
        res.json("Desc changed!")
    } catch (err) {
        console.error(err.message)
    }
   
})



app.post("/api/v1/gsignin", async(req,res)=>{
    const {g_user_name,g_user_email}=req.body
    try {
        const user = await pool.query("SELECT * FROM google_users WHERE g_user_email = $1", [g_user_email]);
        if (user.rows.length>0){
            const token = jwtGenerator(user.rows[0].g_user_id);
             req.session.user = user
            return res.json({auth:true, token: token, user:user.rows[0], message:"Google User Logged In"})
        }
        else{
             try {
                const gUser = await pool.query("INSERT INTO google_users(g_user_name, g_user_email) VALUES($1,$2)  RETURNING * ",[g_user_name,g_user_email])
                const token = jwtGenerator(gUser.rows[0].g_user_id);
                req.session.user = gUser
                return res.json({auth:true, token:token, user:gUser.rows[0], message:"Google User Added!"})
                        
                } catch (err) {
                    console.error(err.message)}
                }
            }catch(err){
                console.error(err.message)
            }
        
})

app.post("/api/v1/signin",  async(req,res)=>{
    const {email, password} = req.body;
   
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        if(user.rows.length===0){
            res.status(200).json("Sign Up First!");
        }
        else{ 
            const validPassword = await bcrypt.compare(password, user.rows[0].password);
            if (!validPassword){
            return res.status(201).json("Invalid Credentials")
            }
            else{
            const token = jwtGenerator(user.rows[0].user_id)
            req.session.user = user
            return res.json({auth:true, token: token, user:user.rows[0]})
        }
    }
    } catch (error) {   
           res.send("User does not exist")  
    }
})



app.get("/api/v1/is_verify", authorize, async(req,res, next)=>{
    try{
         res.json(true)
         next();
    } catch (err) {
        console.error(err.message)
        res.status(403).json("Server Error")
    }
})


app.get("/api/v1/name", authorize, async(req,res, next)=>{
    try {
        const bhalu = await pool.query("SELECT name FROM users WHERE user_id = $1", [req.user])
        res.json(bhalu.rows[0].name)
        next();
    } catch (error) {
        console.error(error.message)
    }
})



app.post("/api/v1/products", async(req,res, next)=>{
    try {
        const {product_name, product_description, product_stock, product_price, prod_image_id} = req.body
        const newProduct = await pool.query("INSERT INTO products(product_name, product_description, product_stock, product_price, prod_image_id) VALUES($1,$2,$3,$4,$5) RETURNING *",[
        product_name, product_description, product_stock, product_price, prod_image_id
    ])  
      res.json(newProduct.rows[0])
      
      next();
    } catch (error) {
        console.error(error.message)
    }
})

app.get("/api/v1/products/:id", async(req, res, next)=>{
    try {
        const {id} = req.params
        const product = await pool.query("SELECT * FROM products WHERE product_id=$1",[id])
        res.json(product.rows[0])
        next();
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/api/v1/products", async(req,res,next )=>{
    try {
        const products = await pool.query("SELECT * FROM products")
        res.json(products.rows)
        next();
    } catch (err) {
        console.error(err.message)
    }
})


//image upload & retrieval
const knex11 = knex({
    client: "pg",
    connection: "postgres:ubuntu:0707@localhost:5432/myweb",
    pool:{min: 0, max:100}
})

const imageUpload = multer({
    dest: "../images"
})

app.post('/api/v1/image', imageUpload.single('image'), (req, res) => {
    const { filename, mimetype, size } = req.file;
    const filepath = req.file.path;
    const prod_image_name =req.file.originalname;
    knex11.insert({
      filename,
      filepath,
      mimetype,
      size,
      prod_image_name
    })
      .into('/prod_images')
      .then(() => res.json({ success: true, filename, prod_image_name}))
      .catch(err =>
        res.json({ success: false, message: 'upload failed', stack: err.stack }),
      );
  });


app.get("/api/v1/image/:prod_images_id", async(req,res)=>{
    const {prod_images_id} = req.params
    knex11.select('*').from(
        'prod_images'
    ).where({prod_images_id}).then(
        images=>{
            if(images[0]){
                const dirname = path.resolve();
                const fullfilepath = path.join(dirname, images[0].filepath)
                const prod_image = res.type(images[0].mimetype).sendFile(fullfilepath)
                return prod_image
            }
            return Promise.reject(
                new Error("Image doesn't exist")
            )
        }
    ).catch(
        err=> res.status(400).json({success:false, message:"Not fund", stack:err.stack})
)})


//Video//

app.post("/api/v1/upload", async(req,res,next)=>{
    try {
        const video=req.body
        const video_url = video.data.public_id
        const video_size=video.data.bytes
        const newVideo = await pool.query("INSERT INTO videos(video, size) VALUES($1,$2) ",[video_url,video_size])
        res.json("Video Uploaded")
        next();  
    } catch (error) {
        console.error(error.message)
    }
})

app.get("/api/v1/uploads/:tid", async(req,res)=>{
    try {
        const {tid} = req.params;
        const getVideo = await pool.query("SELECT * FROM videos WHERE video_id=$1",[tid])
        res.json(getVideo.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/api/v1/uploads",async(req,res,next)=>{
    try {
        const allVideos= await pool.query("SELECT * FROM videos")
        res.json(allVideos.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.put("/api/v1/uploads/:id", async(req,res,next)=>{
    try {
        const {id}= req.params
        const {thumbnail}= req.body
        const updateVideo=await pool.query("UPDATE videos SET thumbnail=$1 WHERE video_id=$2",[thumbnail,id])
        res.json("Thumbnail Added")
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = app;
