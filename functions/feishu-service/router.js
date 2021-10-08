const router = require("express").Router();
const notice = require("./controller/notice");

router.post("/notice/callback", notice.callback);
router.post("/notice/addContent", notice.addContent);

router.use((req, res) => {
  res.render("404");
});
module.exports = router;
