let schema = ` 
@public
collection Games {
  id: string;
  profile: string;
  socketid: string;
  bet?: number;
  roomCode: string;

  constructor (  profile: string, socketid: string, bet?: number) {
      this.id = socketid;
      this.profile = profile;
      this.socketid = socketid;
      this.roomCode = roomCode;
      this.bet = bet;
  }

  setRoomCode (roomCode: string){
    this.roomCode = roomCode;
  }

  setBet (bet: number) {
      this.bet = bet;
  }

  del () {
      if (owner != ctx.auth) {
          throw error();
      }
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

  del () {
      if (owner != ctx.auth) {
          throw error();
      }
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
      if (owner != ctx.auth) {
          throw error();
      }
      selfdestruct();
  }
} 


@public
collection Users {
  id: string;
  name: string;
  room: string;
  address: string;
  isStaked: boolean;

  constructor (id: string, name: string, room: string, address: string, isStaked: boolean) {
        this.id = id;
        this.name = name;
        this.room = room;
        this.address = address;
        this.isStaked = isStaked;
  }
    
  del () {
      if (owner != ctx.auth) {
          throw error();
      }
      selfdestruct();
  }
} 
`;
