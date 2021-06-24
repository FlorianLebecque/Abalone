<?php
set_time_limit(0);

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
require_once '../vendor/autoload.php';
require_once '../room.php';

require_once '../../backend/class/user.php';



class AbaloneServer implements MessageComponentInterface {
	protected $clients;
	protected $users;

	


	public function __construct() {
		$this->clients = new \SplObjectStorage;

		$room0 = new room(new user("gello"),"");
		$room1 = new room(new user("Mika"),"");
		$room2 = new room(new user("GHE"),"");

		$this->Rooms = array(
			$room0->id => $room0,
			$room1->id => $room1,
			$room2->id => $room2,
		);

		echo "Socket created \n";
	}

	public function onOpen(ConnectionInterface $conn) {
		$this->clients->attach($conn);
		// $this->users[$conn->resourceId] = $conn;
		echo "Client connected \n";
	}

	public function onClose(ConnectionInterface $conn) {
		$this->clients->detach($conn);
		// unset($this->users[$conn->resourceId]);
		echo "Client disconnected \n";
	}

	public function onMessage(ConnectionInterface $from,  $data) {
		//$from_id = $from->resourceId;
		
		$data = json_decode($data);
		
		print_r($data);
		
		switch ($data->type) {

			case 'request':
				
				if($data->msg == "roomlist"){
					$from->send(
						json_encode(
							array(
								"responce" 	=> "roomlist",
								"body"		=> $this->Rooms
							)
						)
					);
				}

				break;

			case 'AbaloneServer':
				$user_id = $data->user_id;
				$AbaloneServer_msg = $data->AbaloneServer_msg;

				$array_msg = preg_split ('/-/',$AbaloneServer_msg,-1,PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);   //decompose the str_id (prd_all_PWR)

				$t0 = microtime(True);
				
				$t1 = microtime(True);

				echo $array_msg[0] ." ) ".($t1-$t0)."s\n";
				
				// Output
				$from->send(json_encode(array("type"=>$type,"msg"=>$response_from)));

				break;
		}
	}

	public function onError(ConnectionInterface $conn, \Exception $e) {
		$conn->close();
	}
}
//create the server object
$server = IoServer::factory(
	new HttpServer(new WsServer(new AbaloneServer())),
	5002
);

	//start the websocket
$server->run();
?>