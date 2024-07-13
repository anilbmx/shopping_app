var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping_cart',{ useNewUrlParser: true });
var products = [
  new Product({
    imagePath:"http://localhost:3000/cart/shirt1.jpg",
    title:"blue shirt",
    description:'mens fashion',
    price:500
  }),
  new Product({
    imagePath:"http://localhost:3000/cart/shirt2.jpg",
    title:"white shirt",
    description:'mens fashion',
    price:600
  }),
  new Product({
    imagePath:"http://localhost:3000/cart/pant1.jpg",
    title:"tan pant",
    description:'mens fashion',
    price:700
  }),
  new Product({
    imagePath:"http://localhost:3000/cart/pant2.jpg",
    title:"grey pant",
    description:'mens fashion',
    price:750
  }),
];
var flg =0;
for(var i=0;i<products.length;i++){
  products[i].save(function(err,result){
    flg++;
    if(flg === products.length){
      exit_db()
    }
  });
}
function exit_db(){
  mongoose.disconnect();
}
