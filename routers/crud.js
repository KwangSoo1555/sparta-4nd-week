import express from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import { goodsModel } from '../schemas/crud.query.js';
import { createValidation, updateValidation, deleteValidation } from '../schemas/joi.js';

dotenv.config();

const saltRounds = 10;
const goodsPW = process.env.goodsPW;

const router = express.Router();

router.post('/goodsPost', async (req, res, next) => {
  try {
    const postValidation = await createValidation.validateAsync(req.body);
    const { goodsId, name, details, manager, putPW } = postValidation;

    // const { id: user_id } = req.user;

    const goodsDuplex = await goodsModel.find({ goodsId }).exec();
    if (goodsDuplex.length > 0) {
      return res.status(403).json({ error: 'This goods has been already registered.' });
    }

    const hashedGoodsPW = await bcrypt.hash(goodsPW, saltRounds);

    const match = await bcrypt.compare(String(putPW), hashedGoodsPW);
    if (!match) {
      return res.status(403).json({ error: 'You are not authorized to create this goods.' });
    }

    const goodsCreate = await goodsModel.create({
      goodsId: goodsId,
      name: name,
      details: details,
      manager: manager,
      saleStatus: 'FOR_SALE',
      goodsPW: hashedGoodsPW,
    });

    return res.status(201).json({
      goodsCreate,
      message: 'This goods has been successfully registered',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/goodsSearch', async (req, res) => {
  try {
    const goodsList = await goodsModel.find({}, '-goodsPW');

    goodsList.sort((a, b) => b.createDate - a.createDate);

    return res.status(200).json(goodsList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/goodsSearch/:goodsId', async (req, res) => {
  const goodsId = Number(req.params.goodsId);

  try {
    const goodsDetailsList = await goodsModel.findOne({ goodsId }, '-goodsPW');

    if (!goodsDetailsList) {
      return res.status(404).json({ error: 'Goods not found' });
    }

    return res.json(goodsDetailsList);
  } catch (error) {
    console.error('Error fetching goods details:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/goodsUpdate/:goodsId', async (req, res, next) => {
  const putValidation = await updateValidation.validateAsync(req.body);
  const { name, details, manager, putPW } = putValidation;

  const goodsId = Number(req.params.goodsId);

  try {
    if (String(putPW) !== goodsPW) {
      return res.status(400).json({ error: 'The password you entered is not vaild' });
    } else {
      const goodsUpdate = await goodsModel.findOneAndUpdate(
        { goodsId },
        { name, details, manager },
        { saleStatus: 'SOLD_OUT' },
        { new: true }
      );
      // 상품이 원래 FOR_SALE 상태였다가 SOLD_OUT 상태로 변경되게끔 기작이 되는 매커니즘이 없기 때문에
      // 상품이 수정되면 SOLD_OUT 상태로 바꾸는 것으로 적용.

      if (goodsUpdate) {
        return res.status(200).json({ message: 'Goods updated successfully', goodsUpdate });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/goodsDelete/:goodsId', async (req, res, next) => {
  const explugValidation = await deleteValidation.validateAsync(req.body);
  const { putPW } = explugValidation;

  const goodsId = Number(req.params.goodsId);

  try {
    if (String(putPW) !== goodsPW) {
      return res.status(400).json({ error: 'The password you entered is not valid' });
    } else {
      const goodsDelete = await goodsModel.findOneAndDelete({ goodsId });

      if (goodsDelete) {
        return res.status(200).json({ message: 'Goods deleted successfully', goodsDelete });
      } else {
        return res.status(404).json({ error: 'Goods not found' });
      }
    }
  } catch (error) {
    next(error);
  }
});

export { router };
