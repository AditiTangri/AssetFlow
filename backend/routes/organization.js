const express=require("express");

const router=express.Router();


const {

createDepartment,
getDepartments,
updateDepartment,

createCategory,
getCategories,
updateCategory,

getEmployees,
updateRole,
updateEmployee

}=require("../controllers/organizationController");





router.post(
"/departments",
createDepartment
);


router.get(
"/departments",
getDepartments
);


router.put(
"/departments/:id",
updateDepartment
);





router.post(
"/categories",
createCategory
);


router.get(
"/categories",
getCategories
);

router.put(
"/categories/:id",
updateCategory
);



router.get(
"/employees",
getEmployees
);


router.put(
"/employees/:id/role",
updateRole
);
router.put(
"/employees/:id",
updateEmployee
);


module.exports=router;