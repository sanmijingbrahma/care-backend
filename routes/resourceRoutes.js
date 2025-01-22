const express = require("express");
const {checkRole} = require("../middlewares/roleMiddleware");
const {createResource,getAllResource,getResourceById,updateResourceByID,deleteResourceByID }= require("../controllers/resourceController");
const { validateResource } = require("../middlewares/validationMiddleware");
const { authenticateToken } = require("../middlewares/authMiddleware");
const router = express.Router();



router.post("/create",authenticateToken,checkRole(["Admin"]),validateResource,createResource);
router.put("/update/:id",authenticateToken,checkRole(["Admin"]),validateResource,updateResourceByID);
router.delete("/delete/:id",authenticateToken,checkRole(["Admin"]),deleteResourceByID);

router.get("/all",authenticateToken,checkRole(["Admin","User"]),getAllResource);
router.get("/byId/:id",authenticateToken,checkRole(["Admin","User"]),getResourceById);

module.exports = router;


