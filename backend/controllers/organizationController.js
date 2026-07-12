const Department=require("../models/Department");
const Category=require("../models/Category");
const User=require("../models/User");


// DEPARTMENT


exports.createDepartment=async(req,res)=>{

try{


const department =
await Department.create({

name:req.body.name,

head:req.body.head || null,

parent:req.body.parent || null,

status:"Active"

});


res.json(department);


}
catch(error){

res.status(500).json({

message:error.message

});

}

};


exports.getDepartments=async(req,res)=>{

const data=
await Department.find()

.populate("head","name email")

.populate("parent","name");


res.json(data);

};


exports.updateCategory = async(req,res)=>{

try{

await Category.findByIdAndUpdate(
req.params.id,
req.body
);


res.json({

message:"Category updated successfully"

});


}
catch(error){

res.status(500).json({

message:error.message

});

}

};


exports.updateDepartment=async(req,res)=>{

try{


const oldDepartment =
await Department.findById(req.params.id);



if(
oldDepartment.head &&
oldDepartment.head.toString() !== req.body.head
){

await User.findByIdAndUpdate(

oldDepartment.head,

{
role:"EMPLOYEE"
}

);

}



// update department

const department =
await Department.findByIdAndUpdate(

req.params.id,

{

name:req.body.name,

head:req.body.head || null,

parent:req.body.parent || null,

status:req.body.status

},

{
new:true
}

);




// assign new department head

if(req.body.head){


await User.findByIdAndUpdate(

req.body.head,

{

role:"DEPARTMENT_HEAD",

department:department._id

}

);


}



res.json({

message:"Department updated",

department

});


}
catch(error){

res.status(500).json({

message:error.message

});

}

};





// CATEGORY


exports.createCategory=async(req,res)=>{


const category=
await Category.create(req.body);


res.json(category);


};



exports.getCategories=async(req,res)=>{


const data=
await Category.find();


res.json(data);


};






// EMPLOYEE DIRECTORY


exports.getEmployees=async(req,res)=>{


const users =
await User.find()

.populate(
"department",
"name"
);


res.json(users);


};




// ADMIN PROMOTES ROLE


// UPDATE EMPLOYEE ROLE

exports.updateRole = async(req,res)=>{

try{

const user =
await User.findByIdAndUpdate(

req.params.id,

{
role:req.body.role
},

{
new:true
}

);


res.json({

message:"Role updated successfully",

user

});


}
catch(error){

res.status(500).json({

message:error.message

});

}

};
exports.updateEmployee = async(req,res)=>{

try{


const {
department,
role,
status
}=req.body;


const user =
await User.findById(req.params.id);



if(!user){

return res.status(404).json({

message:"Employee not found"

});

}


// remove old department head reference
if(
user.role==="DEPARTMENT_HEAD" &&
user.department
){

await Department.findOneAndUpdate(

{
head:user._id
},

{
head:null
}

);

}



// update user

user.department =
department || null;


user.role =
role;


user.status =
status;


await user.save();




// if promoted to department head

if(role==="DEPARTMENT_HEAD" && department){


await Department.findByIdAndUpdate(

department,

{
head:user._id
}

);


}



res.json({

message:"Employee updated successfully",

user

});


}
catch(error){


res.status(500).json({

message:error.message

});


}


};