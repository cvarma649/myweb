const express=require("express")
const router = express.Router();

const multer = require("multer");



const storage = multer.diskStorage({
    dest: (req,res,cb)=>{
        cb(null,"/videos")
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname.replace(/ /g, "_"))
    }
})

const upload = multer({
    storage:storage
})


router.post("/",upload.single('file'), async(req,res,next)=>{
    const file= req.file
    
    const filename=file.name
    res.status(200).json({message: "Video Upload Successful", filename})
    
})

module.exports = router;

