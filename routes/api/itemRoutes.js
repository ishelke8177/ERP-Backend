const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware } = require('../../jwt');
const Item = require('../../models/item');
const multer = require('multer');
const sharp = require('sharp')
const crypto = require('crypto');
const { uploadFile, deleteFile } = require('../../utils/s3');
const { checkAdminRole } = require('../../utils/helper');
  
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// @route    POST api/item/addItem
// @desc     Add item to the database
// @access   Private
router.post('/addItem', [jwtAuthMiddleware, upload.single('image')], async (req, res) => {
    try{
        if(!(await checkAdminRole(req.user.id)))
            return res.status(403).json({message: 'user does not have admin role'});
        
        const file = req.file
        const imageName = generateFileName()
      
        const fileBuffer = await sharp(file.buffer)
          .resize({ height: 1920, width: 1080, fit: "contain" })
          .toBuffer()
      
        const uploadResult = await uploadFile(fileBuffer, imageName, file.mimetype)

        const newItem = new Item({
            ...req.body,
            image: uploadResult?.Location
        })

        await newItem.save();

        res.status(200).json({ response: newItem })
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// @route    PUT api/item/updateItem
// @desc     Update Item from the DB
// @access   Private



// @route    DELETE api/item/deleteItem/:itemId
// @desc     Delete Item from the DB
// @access   Private
router.delete('/deleteItem/:itemId', jwtAuthMiddleware, async (req, res) => {
    try{
        if(!(await checkAdminRole(req.user.id)))
            return res.status(403).json({message: 'user does not have admin role'});
        
        const itemId = req.params.itemId

        const response = await Item.findByIdAndDelete(itemId);

        if (!response) {
            return res.status(404).json({ error: 'Item not found' });
        }

        // delete the corresponding image from the bucket as well

        res.status(200).json(response)
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// @route    Get api/item/getItems
// @desc     Get all items
// @access   Public
router.get('/getItems', async (req, res) => {
    try{
        const items = await Item.find()
        res.status(200).json(items)
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;