class Rover {
   constructor(position) {
     this.position = position;
     this.mode = "Normal";
     this.generatorWatts = 110;
   }
   receiveMessage(message) {
     //argument is an object
     let messageName = message.name;
     let resultsArray = [];
     let newObject = {
       message: messageName,
       results: resultsArray
       };
     let completed = {completed: false};
      for (let i = 0; i < message.commands.length; i++){
        if (message.commands[i].commandType ===("STATUS_CHECK")) {
         let status = {
           completed: true,
           roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}
          }  
         resultsArray.push(status);
        }
        else if (message.commands[i].commandType ===("MOVE") && this.mode === ("LOW_POWER")) {
          completed.completed = false;
          resultsArray.push(completed);
        }
        else if (message.commands[i].commandType === "MOVE") {
          completed.completed = true;
          this.position = message.commands[i].value;
        resultsArray.push(completed);
        }
        else if (message.commands[i].commandType === "MODE_CHANGE") {
          this.mode = message.commands[i].value;
          completed.completed = true;
          resultsArray.push(completed);
        }
      }
      
    //  let messageCommands = message.commands;
    //  let results = [];
    //  console.log(messageName);
    // console.log(newObject);
     return newObject;
   }
}



module.exports = Rover;