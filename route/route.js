const router = require("express").Router();
const index =require("../index")
router.post("/word-count",index.wordCount)
module.exports=router