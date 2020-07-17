
// I applied this to print the element of the array https://pugjs.org/language/iteration.html
var express = require('express');
var router = express.Router();

var orders = [];


/* GET home page. */
router.get('/', function(req, res, next) {
  if (typeof req.session.user_name == "undefined"){
    res.render('login', {message:""});
} else {
  user_name = req.session.user_name;
  res.render('shop', { message:"",order_message:"", user_name: user_name,
cart: req.session.cart });
}
});

router.post('/end_login', function(req, res, next) {
  if (req.body['user_name']=="") {
    res.render('login', {message:"⚠ Enter a Name"});
  } else {
    // have a name parameter
    var all_users_order = req.app.get('all_orders');
    console.log(all_users_order);

    // chaeck if req.app.get('all_orders') undefined or not
    if(typeof req.app.get('all_orders') == "undefined"){
      req.app.set('all_orders', []);
      all_users_order = req.app.get('all_orders');
      console.log("undefined all orders", all_users_order);
      req.session.user_name = req.body['user_name'];
      req.session.cart = [];
      var user_tuple = [req.session.user_name, []];
      all_users_order.push(user_tuple);
      console.log("user tuple",user_tuple);
      req.app.set('all_orders', all_users_order);
      console.log("all orders with one user", all_users_order);
      res.render('shop', { message:"",order_message:"", user_name: req.session.user_name,
      cart: req.session.cart });
    } else { // chaeck if req.app.get('all_orders') defined
      all_users_order = req.app.get('all_orders');
      req.session.user_name = req.body['user_name'];
      var check = false;
      for (var i = 0; i < all_users_order.length; i++) {
        // if the user already logged in before
        console.log("compate", all_users_order[i][0] , req.session.user_name);
        console.log("true or false", all_users_order[i][0] == req.session.user_name);
        check = check || all_users_order[i][0].toString() == req.session.user_name.toString();
      }
      console.log(check);
      if (check){
        console.log("passed test");
        req.session.user_name = req.body['user_name'];
        req.session.cart = [];
        res.render('shop', { message:"",order_message:"", user_name: req.session.user_name,
        cart: req.session.cart });
      } else{
        req.session.user_name = req.body['user_name'];
        req.session.cart = [];
        var user_tuple = [req.session.user_name, []];
        all_users_order.push(user_tuple);
        req.app.set('all_orders', all_users_order);
        console.log("all order more than user", req.app.get('all_orders'));
        res.render('shop', { message:"",order_message:"", user_name: req.session.user_name,
        cart: req.session.cart });
    }
      // if it is the first time for the user and the req.app.get('all_orders') defined

    }
}
});

router.post('/add_to_cart', function(req, res, next) {
  if (typeof req.session.user_name == "undefined"){
    res.render('login', {message:""});
} else {
    if(req.body['item']==""){
      res.render('shop', { message:"⚠ Enter an Item Name", order_message:"", user_name: req.session.user_name,
      cart: req.session.cart });

    } else{
      var item = req.body['item'];
      var current_cart = req.session.cart;
      current_cart.push(item);
      res.render('shop', { message:"", order_message:"", user_name: req.session.user_name,
      cart: req.session.cart });
}
}
});

router.post('/place_order', function(req, res, next) {
  if (typeof req.session.user_name == "undefined"){
    res.render('login', {message:""});
  } else {
    if(req.session.cart.length == 0){
      res.render('shop', { message:"",order_message:"⚠ Your Cart is Empty", user_name: req.session.user_name,
      cart: req.session.cart });
    } else{
      var orders = req.app.get('all_orders');
      console.log(orders);
      for (var i = 0; i < orders.length; i++) {
        console.log(orders[i][0], req.session.user_name);
        if(orders[i][0] == req.session.user_name){
          orders[i][1].push(req.session.cart);
          console.log(orders[i][1]);
          req.app.set('all_orders', orders);
          console.log(orders);
          req.session.cart = [];
          res.render('shop', { message:"",order_message:"", user_name: req.session.user_name,
          cart: req.session.cart });
        }
      }
    }
}
});

router.get('/display_orders', function(req, res, next) {
  if (typeof req.session.user_name == "undefined"){
    res.render('login', {message:""});
} else {
  var orders = req.app.get('all_orders');
  for (var i = 0; i < orders.length; i++) {
    console.log(orders[i][0], req.session.user_name);
    if(orders[i][0] == req.session.user_name){
  res.render('previousOrder', { user_name: req.session.user_name,
all_orders: orders[i][1]});
}
}
}
});

module.exports = router;
