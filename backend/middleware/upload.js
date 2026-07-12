const multer=require("multer");
const path=require("path");


const storage=multer.diskStorage({

destination:(req,file,cb)=>{

cb(null,"uploads/");

},


filename:(req,file,cb)=>{

cb(
null,
Date.now()+path.extname(file.originalname)
);

}

});



const upload=multer({

storage:storage,

fileFilter:(req,file,cb)=>{


const allowed=[
"image/jpeg",
"image/png"
];


if(
allowed.includes(file.mimetype)
){

cb(null,true);

}
else{

cb(
new Error("Only JPG and PNG images allowed")
);

}

}


});


module.exports=upload;