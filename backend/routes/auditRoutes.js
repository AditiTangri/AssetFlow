const express = require("express");

const router = express.Router();


const {

createAudit,
getAudits,
verifyAsset,
closeAudit

}
=
require("../controllers/auditController");




router.post(
"/",
createAudit
);



router.get(
"/",
getAudits
);



router.put(
"/verify/:id",
verifyAsset
);



router.put(
"/close/:id",
closeAudit
);



module.exports = router;