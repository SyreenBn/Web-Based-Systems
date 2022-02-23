
// I applied this to print the element of the array https://pugjs.org/language/iteration.html
// https://teamtreehouse.com/library/creating-a-registration-form-with-pug-jade-2 for the form
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
  var userName = req.body['user_name'];

  if (userName =="") {
    res.render('login', {message:"⚠ Enter a Name"});
  } else {
    console.log("I entered end_login before database");
    //----------------------------------------------------------------------------
    //---------Database Monoose --------------------------------------------------
    async function main() {
      var StuffModel = req.app.get("StuffModel");
      let doc = await StuffModel.findOne({}).where('name').equals(userName).exec();
      if (doc == null){
        await StuffModel.create({name:userName, order:[]});
        req.session.user_name = req.body['user_name'];
        req.session.cart = [];
      } else {
        req.session.user_name = req.body['user_name'];
        req.session.cart = [];
      }
    }
    main()
    .then(() =>
          res.render('shop', { message:"",order_message:"", user_name: req.session.user_name, cart: req.session.cart }))
    .catch(err => {
        console.log('Database error');
        console.log(err);
        res.render('error',
		       { title: "Error",
			 message: "Database error",
			 error: err
		       });
    });
    console.log("I entered end_login after database");
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
      var userName = req.session.user_name;
      async function main() {
        var StuffModel = req.app.get("StuffModel");
        let doc = await StuffModel.findOne({}).where('name').equals(userName).exec();
        var order_user = doc.order;
        order_user.push(req.session.cart);
        let doc_update = await StuffModel.findOneAndUpdate({}, { order: order_user},
					        {new:true,
						      useFindAndModify:false}).where('name').equals(userName).exec();
                  console.log("Update return document: ");
                  req.session.cart = [];
      }
      main()
      .then(() =>
            res.render('shop', { message:"",order_message:"", user_name: req.session.user_name, cart: req.session.cart }))
      .catch(err => {
          console.log('Database error');
          console.log(err);
          res.render('error',
		       { title: "Error",
			 message: "Database error",
			 error: err
		       });
      });
    }
}
});

router.get('/display_orders', function(req, res, next) {
  if (typeof req.session.user_name == "undefined"){
    res.render('login', {message:""});
} else {
    async function main() {
      var StuffModel = req.app.get("StuffModel");
      let doc = await StuffModel.findOne({}).where('name').equals(req.session.user_name).exec();
      req.session.all_orders = doc.order;
      console.log(req.session.all_orders);
    }
    main()
    .then(() =>
          res.render('previousOrder', { user_name: req.session.user_name, all_orders: req.session.all_orders}))
    .catch(err => {
        console.log('Database error');
        console.log(err);
        res.render('error',
		       { title: "Error",
			 message: "Database error",
			 error: err
		       });
    });

}
});

module.exports = router;
