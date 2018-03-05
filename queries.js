/**
 * QUERING UTXOs
 */

query getUTXO {
  description: "Find all UTXOs for the required user "
  statement:
      SELECT org.acme.biznet.utxo
        WHERE (owner == _$owner)
}
