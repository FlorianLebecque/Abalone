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



		$this->players = array();
		$this->Rooms = array();

		echo "Socket created \n";
	}

	public function onOpen(ConnectionInterface $conn) {
		$this->clients->attach($conn);
	}

	public function onClose(ConnectionInterface $conn) {
		$this->clients->detach($conn);

		foreach($this->Rooms as $roomID => $room ){
			foreach($this->players as $ressID => $player){
				if((in_array($player,$room->players))&&($ressID == $conn->remoteAddress)){


					unset($this->Rooms[$roomID]->players[$player->id]);	//we the player from the room

					echo "Player ".$player->name . " has leaved room ".$roomID."\n";

					if(count($this->Rooms[$roomID]->players) == 0){			//we can close the room
						unset($this->Rooms[$roomID]);
						echo "Room ".$roomID." has been closed\n";	
					}else if(count($this->Rooms[$roomID]->players) == 1){	//we need to informe the other player

					}

					
				}
			}
		}

		unset($this->players[$conn->remoteAddress]);
	}

	public function onMessage(ConnectionInterface $from,  $data) {
		//$from_id = $from->remoteAddress;
		
		$data = json_decode($data);
		
		//print_r($data);
		
		switch ($data->type) {

			case 'socket' :

				if(isset($data->user)){
					$userName 	= explode("#",$data->user)[0];
					$userID 	= explode("#",$data->user)[1];
					$user = new user($userName);
					$user->id = $userID;

					
					$this->players[$from->remoteAddress] = $user;
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
					case "CreateRoom":
						$this->CreateRoom($from);
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

				if(isset($this->players[$from->remoteAddress])){

						//we need to informe the first player that someone joined
					if(count($this->Rooms[$roomID]->players) == 1){

					}

						//add the player to the room
					$this->Rooms[$roomID]->players[$this->players[$from->remoteAddress]->id] = $this->players[$from->remoteAddress];
					echo "Player ".$this->players[$from->remoteAddress]->name." joined room : ".$roomID."\n";

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

	private function CreateRoom($from){
		$room = new room("");
		$this->Rooms[$room->id] = $room;

		$from->send(
			json_encode(
				array(
					"responce" 	=> "CreateRoom",
					"body"		=> $room->id
				)
			)
		);
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