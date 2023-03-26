
@public
collection Games {
  id: string;
  player1_address?: string;
  player2_address?: string;
  player1_name?: string;
  player2_name?: string;
  player1_isStaked?: boolean;
  player2_isStaked?: boolean; 
  bet?: number;
  roomCode?: string;

  constructor (id:string, player1_address: string,  bet?: number) {
      this.id = id;
      this.player1_address = player1_address;
      this.socketid = socketid; 
      this.bet = bet;
  }

  setStake(address: string){
    if(this.player1_address == address){
      player1_isStaked = true;
    } else {
      player2_isStaked = true;
    }
  }
  
  setRoomCode (roomCode: string, player2_address:string){
    this.roomCode = roomCode;
    this.player2_address = player2_address;
  }

  setBet (bet: number) {
      this.bet = bet;
  }

  del () { 
      selfdestruct();
  }
}

@public
collection Profiles {
  id: string;
  wallet_address: string;
  name: string;
  image: string;
  description: string;

  constructor ( wallet_address: string, name: string, image: string, description: string) {
      this.id = wallet_address;
      this.wallet_address = wallet_address;   
      this.name = name;
      this.image = image;
      this.description = description;
  }

  updateProfile (name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  del () { 
      selfdestruct();
  }
}

@public
collection Follows {
  id: string;
  user_walllet_address: string;
  follower_wallet_address: string;

  constructor (id: string, user_walllet_address: string, follower_wallet_address: string) {
      this.id = id;
      this.user_walllet_address = user_walllet_address;
      this.follower_wallet_address = follower_wallet_address;
  }

  del () { 
      selfdestruct();
  }
} 



// @public
// collection Users {
//   id: string;
//   name: string;
//   room: string;
//   address: string;
//   isStaked: boolean;

//   constructor (id: string, name: string, room: string, address: string, isStaked: boolean) {
//         this.id = id;
//         this.name = name;
//         this.room = room;
//         this.address = address;
//         this.isStaked = isStaked;
//   }

//    setStake (isStaked: boolean) {
//         this.isStaked = isStaked;
//     } 
    
//   del () { 
//       selfdestruct();
//   }
// } 