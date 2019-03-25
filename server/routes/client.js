import express from 'express';
import path from "path"

const router = express.Router({strict:true});
router
  .get('/', (req, res) => {
    res.render('index.ejs');
  })
  .get('/*', (req, res) => {
    res.render(path.join(process.cwd(), '/public',req.originalUrl));
  });
export default router;