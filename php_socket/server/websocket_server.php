<?php
set_time_limit(0);

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
require_once '../vendor/autoload.php';

require_once '../../backend/class/room.php';
require_once '../../backend/class/user.php';



class AbaloneServer implements MessageComponentInterface {
	protected $clients;
	protected $users;

	public function __construct() {
		$this->clients = new \SplObjectStorage;

		$room0 = new room(new user("gello"),"");
		$room1 = new room(new user("Mika"),"");
		$room2 = new room(new user("GHE"),"");

		$this->players = array();

		$this->Rooms = array(
			$room0->id => $room0,
			$room1->id => $room1,
			$room2->id => $room2,
		);

		echo "Socket created \n";
	}

	public function onOpen(ConnectionInterface $conn) {
		$this->clients->attach($conn);

		//echo "Client connected \n";
	}

	public function onClose(ConnectionInterface $conn) {
		$this->clients->detach($conn);

		foreach($this->Rooms as $roomID => $room ){
			foreach($this->players as $ressID => $player){
				if(in_array($player,$room->players)){
					unset($this->Rooms[$roomID]->players[$player->id]);	//we the player from the room

					echo "Player ".$player->name . " has leaved room ".$roomID."\n";

					if(count($this->Rooms[$roomID]->players) == 0){
						unset($this->Rooms[$roomID]);
						echo "Room ".$roomID." has been closed\n";
					}

					
				}
			}
		}

		unset($this->players[$conn->resourceId]);

		//echo "Client disconnected \n";
	}

	public function onMessage(ConnectionInterface $from,  $data) {
		//$from_id = $from->resourceId;
		
		$data = json_decode($data);
		
		//print_r($data);
		
		switch ($data->type) {

			case 'socket' :

				if(isset($data->user)){
					$userName 	= explode("#",$data->user)[0];
					$userID 	= explode("#",$data->user)[1];
					$user = new user($userName);
					$user->id = $userID;

					
					$this->players[$from->resourceId] = $user;
				}

				break;

			case 'request':
				
				switch($data->msg){
					case "roomlist":
						$this->GetRoomList($from);
						break;
					case "EnterRoom":
						$this->EnterRoom($from,$data);
						break;

				}

				break;
		}
	}

	private function GetRoomList($from){
		$from->send(
			json_encode(
				array(
					"responce" 	=> "roomlist",
					"body"		=> $this->Rooms
				)
			)
		);
	}

	private function EnterRoom($from,$data){
		$roomID = $data->roomid;

		if(isset($this->Rooms[$roomID])){	//check if the room exist

			if(count($this->Rooms[$roomID]->players) < 2) {

				if(isset($this->players[$from->resourceId])){
					$this->Rooms[$roomID]->players[$this->players[$from->resourceId]->id] = $this->players[$from->resourceId];
					echo "Player ".$this->players[$from->resourceId]->name." joined room : ".$roomID."\n";

					$from->send(
						json_encode(
							array(
								"responce" 	=> "EnterRoom",
								"body"		=> $this->Rooms[$roomID]
							)
						)
					);

				}		

			}else{	//the room is full
				$from->send(
					json_encode(
						array(
							"responce" 	=> "EnterRoom",
							"body"		=> "full"
						)
					)
				);

				echo "Room ".$roomID." is full \n";
			}


		}else{	//check if the room don't exist
			$from->send(
				json_encode(
					array(
						"responce" 	=> "EnterRoom",
						"body"		=> 404
					)
				)
			);
			echo "Room ".$roomID." don't exist \n";
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