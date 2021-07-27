'use strict';
const axios=require('axios');
const coffeeModel=require('../models/coffee.model');

// Endpoint for testing
const home=(req,res)=>{
    // provide your logic here
    res.send('the server is running');
}
// Call the coffee api here and return the results
const retreiveItemsController=async(req,res)=>{
    // provide your logic here
    const url='https://coffeepedias.herokuapp.com/coffee-list';
    await axios.get(url).then(response=>{
        let allData=response.data.map(el=>{
            return new Coffee(el);
        });
        res.send(allData);
    });

};
// Get favorite coffee from MongoDB
const getFavoriteCoffee=async(req,res)=>{
    // provide your logic here
    coffeeModel.find({},(err,data)=>{
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    })
}
// Create new fav coffee endpoint
const createItemController=async(req,res)=>{
    // provide logic here
    const{id,title,img,description,ingredients}=req.body;
    const favCoffee=new coffeeModel({
        id:id,
        title:title,
        description:description,
        ingredients:ingredients,
        img:img
    });
    favCoffee.save();
    res.json(favCoffee);
};

// update coffee from MongoDB
const updateItemController=(req,res)=>{
    // provide logic here
    const id=req.params.id;
    const{title,description,ingredients,img}=req.body;
    coffeeModel.findOne({id:id},(err,data)=>{
        if(err){
            res.send(err);
        }else{
            data.title=title;
            data.description=description;
            data.ingredients=ingredients;
            data.img=img;

            data.save().then(()=>{
                coffeeModel.find({},(err,data)=>{
                    if(err){
                        res.send('Somthing wrong, Please try later');
                    }else{
                        res.send(data);
                    }
                });
            });

        }
    });
};

// delete coffee from MongoDB
const deleteItemController=(req,res)=>{
    // provide your logic here
    const id=req.params.id;
    coffeeModel.deleteOne({id:id},(err,data)=>{
        if(err){
            res.send(err);
        }else{
            coffeeModel.find({},(err,data)=>{
                if(err){
                    res.send('Deleting filed , please try agin later');
                }else{
                    res.send(data);
                }
            });
        }
    });
};


// class to shape the data
class Coffee{
    constructor(data){
        this.id=data.id;
        this.title=data.title;
        this.description=data.description;
        this.ingredients=data.ingredients;
        this.img=data.image_url;
    }
}




module.exports={
    home,
    getFavoriteCoffee,
    createItemController,
    updateItemController,
    deleteItemController,
    retreiveItemsController
};