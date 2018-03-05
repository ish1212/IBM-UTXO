/**
 * Track the trade of a commodity from one trader to another
 * @param {org.acme.biznet.executeUTXO} executeUTXO - the trade to be processed
 * @transaction
 */

var serializer = getSerializer();


function transfer(executeUTXO) {
    prevOwner = executeUTXO.prevOwner;
    newOwner = executeUTXO.newOwner;
    cost = executeUTXO.value;
    // Transaction.utxo.owner = transaction.newOwner;
     return getAssetRegistry('org.acme.biznet.utxo')
         .then(function (assetRegistry) {
           return query('getUTXO',{owner: prevOwner})               // guery to get UXTOs
                     .then(function (results) {
                         total = 0;
             			// var json = serializer.toJSON(results);
                         for (var n = 0; n < results.length; n++) {
                         var spent = results[n];
                         total = spent.value + total;   // calculate total value of all UTXOs
                         spent.status = false;
                         return assetRegistry.update(spent.utxo);  // update the UTXOs to be now marked as spent
                       }

                       return getAssetRegistry('org.acme.biznet.utxo')  //make UTXO for original owner
                                           .then(function(assetRegistry2){
                                            var newUTXO =factory.newResource(org.acme.biznet,'utxo');
                                               newUTXO.value = total-cost;
                                               newUTXO.owner = prevOwner;
                                               return assetRegistry2.add(newUTXO);
                                           })
                       return getAssetRegistry('org.acme.biznet.utxo')  //make UTXO for new user
                                           .then(function(assetRegistry3){
                                            var newUTXO =factory.newResource(org.acme.biznet,'utxo');
                                               newUTXO.value = total;
                                               newUTXO.owner = newOwner;
                                               return assetRegistry3.add(newUTXO);
                                           })

                     });

         });
 }
