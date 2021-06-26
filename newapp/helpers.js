const videoFilter=(req, file, cb)=>{
    if(!file.originalname.match(/\.(mp4|avi|mov|gif|GIF)$/)){
        req.fileValidationError="Only videoFiles allowed Bro";
        return cb(new Error("Only video Files allowed"), false)   
    }else{
        cb(null, true)
    }

}
module.exports=videoFilter;