'use strict';

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.send('Healthy'));

module.exports = router;
