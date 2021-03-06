const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  createCategory,
  categoryList,
} = require("../controllers/categoryController");

router.param("categoryId", async (req, res, next, categoryId) => {
  const category = await fetchGoal(categoryId, next);
  if (category) {
    req.category = category;
    next();
  } else {
    const err = new Error("Goal is not found");
    err.status = 404;
    next(err);
  }
});

// Create Category
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createCategory
);

// Category Lis
router.get("/", passport.authenticate("jwt", { session: false }), categoryList);

module.exports = router;
