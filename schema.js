let schema = ` 
@public
collection Games {
  id: string;
  profile: string;
  socketid: string;
  bet?: number;
  roomCode?: string;

  constructor (  profile: string, socketid: string, bet?: number) {
      this.id = socketid;
      this.profile = profile;
      this.socketid = socketid; 
      this.bet = bet;
  }

  setRoomCode (roomCode: string){
    this.roomCode = roomCode;
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

   setStake (isStaked: boolean) {
        this.isStaked = isStaked;
    } 
    
  del () { 
      selfdestruct();
  }
} 

@public
collection Games {
  id: string;
  profile: string;
  socketid: string;
  bet?: number;
  roomCode?: string;

  constructor (  profile: string, socketid: string, bet?: number) {
      this.id = socketid;
      this.profile = profile;
      this.socketid = socketid; 
      this.bet = bet;
  }

  setRoomCode (roomCode: string){
    this.roomCode = roomCode;
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

   setStake (isStaked: boolean) {
        this.isStaked = isStaked;
    } 
    
  del () { 
      selfdestruct();
  }
} 

@public
collection Games {
  id: string;
  profile: string;
  socketid: string;
  bet?: number;
  roomCode?: string;

  constructor (  profile: string, socketid: string, bet?: number) {
      this.id = socketid;
      this.profile = profile;
      this.socketid = socketid; 
      this.bet = bet;
  }

  setRoomCode (roomCode: string){
    this.roomCode = roomCode;
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

   setStake (isStaked: boolean) {
        this.isStaked = isStaked;
    } 
    
  del () { 
      selfdestruct();
  }
} 

// This is an example collection definition.
// You should edit it for your use case.

// The language (Polylang) is similar to JavaScript,
// but semi-colons are mandatory.

// The `collection` keyword defines a named collection.
// Collection properties define the "columns" in a record.

// @`public` means that the collection is public, anyone can view and read
// the records in the collection. You can still implement rules on who can 
// edit the data by defining functions on the collection and checking the public key.

 @public
  collection Games {
    id: string;
    profile: string;
    socketid: string;
    bet?: number;
    roomCode: string;

    constructor (  roomCode: string, profile: string, socketid: string, name: string, bet?: number) {
        this.id = roomCode;
        this.profile = profile;
        this.socketid = socketid;
        this.roomCode = roomCode;
        this.bet = bet;
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
collection User {
  // `id` is unique and required on all collections
  id: string;

  // We will use a public key to authenticate function
  // calls later
  publicKey: PublicKey;

  // A mandatory property
  name: string; 

  // An optional property denoted with ?
  age?: number; 

  // `constructor` is called when a new record is
  // created, make sure to assign a value to `this.id`
  constructor (id: string) {
    // `this.id` must be assigned in the constructor
    // `this.id` must be unique in collection
    this.id = id;
    
    // You can assign the publicKey of the user who is
    // creating the record, this can then be used to
    // control permissions for the record (see below)
    this.publicKey = ctx.publicKey;
  }

  // You can add your own functions to determine rules
  // on who can update the records data
  function setName (name: string) {
    // Check if the caller is the original creator of the record.
    if (ctx.publicKey != this.publicKey) {
      error('You are not the creator of this record.');
    }
    this.name = name;
  }
}

@public
collection Games {
  id: string;
  profile: string;
  socketid: string;
  bet?: number;
  roomCode?: string;

  constructor (  profile: string, socketid: string, bet?: number) {
      this.id = socketid;
      this.profile = profile;
      this.socketid = socketid; 
      this.bet = bet;
  }

  setRoomCode (roomCode: string){
    this.roomCode = roomCode;
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

   setStake (isStaked: boolean) {
        this.isStaked = isStaked;
    } 
    
  del () { 
      selfdestruct();
  }
} 
`;
