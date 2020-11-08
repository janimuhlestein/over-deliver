 const router = require('express').Router();
 const {Provider, Review, Rating} = require('../../models');

 router.get('/', (req,res)=>{
     Provider.findAll({
         attributes: ['id', 'name', 'type'],
         include: {
            model: Rating,
            attributes: ['id', 'average', 'quality', 'value', 'speed', 'packaging', 'accuracy'],
            include: {
                model: Review,
               attributes: ['id', 'title','text'],
            }
         }
     })
     .then(dbProviderData=>{
         res.json(dbProviderData);
     })
     .catch(err=>{
         console.log(err);
         res.status(500).json(err);
     });
 });

 router.get('/:id', (req,res)=>{
     Provider.findOne({
         where: {
             id: req.params.id
         },
         attributes: ['id', 'name', 'type'],
         include: {
            model: Rating,
            attributes: ['id', 'average', 'quality', 'value', 'speed', 'packaging', 'accuracy'],
            include: {
                model: Review,
               attributes: ['id', 'title','text'],
            }
        }

     })
     .then(dbProviderData=>{
         if(!dbProviderData) {
            res.status(404).json({message: 'No provider found with that id'});
            return;
         }
         res.json(dbProviderData);
     })
     .catch(err=>{
         console.log(err);
         res.status(500).json(err);
     });
 });

 router.post('/', (req,res)=>{
     Provider.create({
         name: req.body.name,
         type: req.body.type
     })
     .then(dbProviderData=>{
         res.json(dbProviderData);
     })
     .catch(err=>{
         console.log(err);
         res.status(500).json(err);
     });
 });

 router.put('/:id', (req,res)=>{
     Provider.update(req.body,{
         where: {
             id: req.params.id
         }
     })
     .then(dbProviderData=>{
         if(!dbProviderData) {
             res.status(404).json({message: 'No provider found with that id'});
             return;
         }
         res.json(dbProviderData);
     })
     .catch(err=>{
         console.log(err);
         res.status(500).json(err);
     });
 });

 router.delete('/:id', (req,res)=>{
   Provider.destroy({
       where: {
           id: req.params.id
       }
   })
   .then(dbProviderData=>{
       if(!dbProviderData) {
           res.status(404).json({message: 'No provider found with that id'});
           return;
       }
       res.json(dbProviderData);
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json(err);
   });
 });

 module.exports = router;