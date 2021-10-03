const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const allCatagories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCatagories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoryId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryId) {
      res.status(404).json({ message: "No tag found" });
      return;
    }

    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCat = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCat);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put(
  "/:id",
  async (req, res) => {
    try {
      let cat = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(cat);
    } catch (err) {
      res.status(400).json(err);
    }
  }
  // update a category by its `id` value
);

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!category) {
      res.status(404).json({ message: "No location found with this id!" });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete a category by its `id` value

module.exports = router;
