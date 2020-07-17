var express = require('express');
var router = express.Router();



var visits;

/* GET visit-counter page. */
router.get('/', function(req, res) {
  var mongoClient = req.app.get("mongoClient");
  var db = req.app.get("db");
  var collection = req.app.get("collection");
  async function main() {

  // Perform an upsert
  let obj = await collection.findOneAndUpdate({},
                                                  {$inc: { c:1 }},
				                                          {returnOriginal:false,
					                                          upsert:true});
  console.log("Upsert return value: ");
  console.log(obj.value);
  visits = obj.value.c;
  }
  main()
  .then(() => {
    res.render('hello-counter-4a', { visits: visits });
  })
  .catch(err => {
      console.log('Database error');
      console.log(err);
      res.render('hello-counter-4a', { error: err });
  });

});

module.exports = router;
