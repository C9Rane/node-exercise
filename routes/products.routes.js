import express from "express";
import * as products from "../controllers/products.controller";

const router = express.Router();

router.get("/:id?", async (req, res, next) => {
  let { id } = req.params;
  let data;
  try {
    const {id} = req.params;
    let data;
    if (id) {
        data = await products.findOne(id);
    } else {
        data = await products.findAll();
    }
    res.json(data);
  } catch (error) {
    next(error);
  }

  res.json(data);
});

router.post("/", async (req, res, next) => {
    try{
        let productDTO = req.body;
        let data = await products.addOne(productDTO);
    } catch (error) {
        next(error);
    }
    res.json(data);
});

router.put("/:id", async (req, res, next) => {
    try{
        let { id } = req.params;
        let productDTO = req.body;
        let data = await products.updateOne(id, productDTO);
    } catch (error) {
    next(error);
    }
    res.json(data);
});

router.delete("/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await products.removeOne(id);        
    } catch (err) {
        next(error);
    }
    res.json(data);
});

export default router;