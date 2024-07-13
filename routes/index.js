var express = require('express');
var router = express.Router();
var Cart = require("../models/cart");
// var csrf = require('csurf');
// var passport = require('passport');
//
// var csrfProtection = csrf();
// router.use(csrfProtection);

var Product = require("../models/product");
/* GET home page. */

router.get('/', function(req, res, next) {
  // res.redirect('/shop');
  var products = Product.find(function(err, docs) {
    // console.log(docs);
    res.render('index', { products:docs});
  });
});

router.get('/add-to-cart/:id',function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function(err, product){
      if(err){
        return res.redirect("/");
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect("/");
    });
});

router.get('/shopping-cart', function(req, res, next){
  if(!req.session.cart){
    return res.render('shopping-cart',{products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shopping-cart',{products: cart.generateArray(), totalPrice: cart.totalPrice})
})

module.exports = router;
