'use strict'
const nftHelper = require('../../helpers/dna-parser')

class NFTController {
  async get (req, res, next) {
    const { type, id } = req.params
    let { width = 200, height = 200 } = req.query
    if (!type || !id) {
      res.status(404).json({ error: 'Wrong format' })
    }

    if (type === 'item' || type === 'avatar') {
      const nft = await nftHelper.get(type, id);
      if (nft) {
        res.setHeader('Content-Type', 'image/svg+xml');
        if (type === 'item') {
          res.render('layouts/item', {
            ...nft,
            layout: 'item.hbs',
            color: nft?.primary_color || '#FFD011',
            width: width,
            height: height
        })
        }
        if (type === 'avatar') {
          res.render('layouts/avatar', {
            layout: 'avatar.hbs',
            ...nft,
            width: width,
            height: height
          })
        }
      } else {
        res.status(404).json({ error: 'File not found' })
        
      }
      
    } else {
      res.status(404).json({ error: 'File not found' })
    }
  }
}

module.exports = new NFTController()
