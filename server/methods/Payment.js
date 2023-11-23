const Razorpay = require('razorpay');
var instance = new Razorpay({ 
    key_id: 'rzp_test_rBSuIlLakAJ94a', 
    key_secret: 'rk8o2hHBWWQHhSWbjB1ATbRL' })

var options = {
  amount: 50000,  // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11"
};
instance.orders.create(options, function(err, order) {
  console.log(order);
});