const express = require ('express');
const router = express.Router();


//@route GET      api/Commandes
//@descreption    test route
//@access         Public
router.get('/',(req, res) => {
    res.send('Commandes route')
});


module.exports = router;