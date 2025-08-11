const { Router } = require("express");
const router = Router();

router.post("/register", (req, res) => {
  res.json(req.body);
});

module.exports = router;
