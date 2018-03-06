Running on Docker Environment (with composer pre-requisites installed):-

$composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName utxo-network
$composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile utxo-network@0.0.1.bna --file networkadmin.card
$composer card import --file networkadmin.card
$composer network ping --card admin@utxo-network

Generate rest API-
$composer-rest-server

*Optional :- recreate .bna file, if .bna file missing $ composer archive create -t dir -n.



Running on Online composer playground:-

Click https://composer-playground.mybluemix.net/login
Deploy a new Business network

Drag and drop the .bna file and then manually add queiries.js

