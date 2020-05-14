import { Router } from "express";
import PostModel from "../model/PostModel";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const doc = await PostModel.create({
      ...req.body
    });
    res.status(201).json({ data: doc });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).send({ message: "Duplicated Data", error });
    }
    res.status(400).send({ message: "sth wrong", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const docs = await PostModel.find()
      .lean()
      .exec();

    res.status(200).json({
      posts: docs
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "sth wrong", error });
  }
});

router.get("/:user", async (req, res) => {
  try {
    const doc = await PostModel.find({
      user: req.params.user
    })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).json({ message: "The data is not found" });
    }

    res.status(200).json({ ...doc });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "sth wrong", error });
  }
});

router.put("/:title", async (req, res) => {
  try {
    const updatedDoc = await PostModel.update(
      {
        title: req.params.title
      },
      req.body,
      { new: true }
    )
      .lean()
      .exec();

    if (!updatedDoc) {
      return res.status(400).json({ message: "cannot update the data" });
    }

    res.status(200).json({ ...updatedDoc });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "sth wrong", error });
  }
});

router.delete("/:title", async (req, res) => {
  try {
    const removed = await PostModel.findOneAndRemove({
      title: req.params.title
    })
      .lean()
      .exec();

    if (!removed) {
      return res.status(400).json({ message: "cannot remove the data" });
    }

    return res.status(200).json({ ...removed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "sth wrong", error });
  }
});

export default router;
