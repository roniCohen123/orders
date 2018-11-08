# orders

#Input validation:
name - (2-50 letters),
cell number - (exactly 10 digits (as a string), when calling get orders- add +1 at the beginning),
address - (10-100 letters),
order details - (5-300 letters)

#An example of curl request for place order:
curl --header "Content-Type: application/json" --request POST --data '{"name":"Roni","cellNumber":"0521234567","address":"Tel Aviv","orderDetails":"some details..."}' 'localhost:3001/placeorder'

#An example of curl request for get orders:
curl --header "Content-Type: application/json" --request GET --data '{"cellNumber":"+10521234567"}' 'localhost:3001/getorders'

