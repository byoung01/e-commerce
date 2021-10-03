const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const pTagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(pTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  let updateTag = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.json(updateTag);

  //tag_name
  // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: { id: req.params.id },
    });
    if (!tag) {
      res.status(404).json({ message: "No tag with this id!" });
      return;
    }
    console.log("id deleted");
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
    // delete on tag by its `id` value
  }
});
module.exports = router;
