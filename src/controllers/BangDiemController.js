const mongoose = require('mongoose'); 
const BangDiem = require("../model/BangDiem")

async function saveBangDiem (req, res) {
    console.log(req.body);
    await BangDiem.find({code: req.body.code})
    .then(async data=>{ 
        let bangdiem;
        if(data.length > 0){
            bangdiem = new BangDiem({
                _id: new mongoose.Types.ObjectId ,
                code: req.body.code,
                diem: [
                    ...data[0].diem,
                    ...req.body.diem
                ]
            });
        }else {
            bangdiem = new BangDiem({
                _id: new mongoose.Types.ObjectId ,
                code: req.body.code,
                diem: [ 
                    ...req.body.diem
                ]
            });
        }
          
          try {
              const newBangDiem = await bangdiem
                  .save();
              return res.status(201).json({
                  success: true,
                  message: 'New cause created successfully',
                  bangdiem: newBangDiem,
              });
          } catch (error) {
              console.log(error);
              res.status(500).json({
                  success: false,
                  message: 'Server error. Please try again.',
                  error: error.message,
              });
          }
    }) 
}

async function getBangDiem (req, res) {
    const code = req.code;
    await BangDiem.find({code: code})
      .then(data=>{
          if(data.length > 0){
            res.json({result: true, bangdiem: data[0].diem});
          }else {
            res.json({result: false, bangdiem: []});
          }
      })
      .catch (err => {
        console.error(err);
        res.json({result: false, bangdiem: []});
      })
}

module.exports = {
    saveBangDiem,
    getBangDiem
}