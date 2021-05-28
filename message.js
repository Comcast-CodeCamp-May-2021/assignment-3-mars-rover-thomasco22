class Message {
  constructor(name, commands) {
    this.name = name;
    if(!name) {
      throw Error('Message name required.');
    } else {
      // console.log("New message!");
    }
    this.commands = commands;
  }

}

module.exports = Message;