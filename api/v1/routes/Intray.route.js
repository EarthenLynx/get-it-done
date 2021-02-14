const router = require('express').Router();
const { verifyUser, verifyGuest } = require('../../../middleware/verifyUser');

router.post('/', verifyGuest, (req, res) => {
  console.log(req.session);
  res.send('OK');
});

module.exports = router;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJndWVzdCJdLCJpZCI6IjBkNGNlYjBjLTJhMzUtNDkwOS05NmJjLTdiMzI0MDc1NjRmYyIsInVzZXJuYW1lIjoiSmFuZSBEb2UiLCJlbWFpbCI6IkphbmVAZG9lLmNvbSIsImxhc3RMb2dpbiI6IjIwMjEtMDItMTJUMTY6NTI6MzUuOTk3WiIsImlhdCI6MTYxMzE1MTMxMywiZXhwIjoxNjEzMTU4NTEzfQ.-e9Wm-DEGmbGFhlucMUioAvqlNhT3lORtduREYEgP5A
