const router = require('express').Router();

const started = new Date();

router.get('/status', (req, res) => {
  res.send({
    started,
    uptime: process.uptime(),
  });
});

module.exports = router;
