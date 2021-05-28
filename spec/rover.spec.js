const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
//test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let position = 20;
    let mode = "Normal";
    let generatorWatts = 110;
    let rover = new Rover(position, mode, generatorWatts);
    expect(rover.position).toEqual(position);
    expect(rover.mode).toEqual(mode);
    expect(rover.generatorWatts).toEqual(generatorWatts);
  });
//test 8
  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('Test message with two commands');
    
  });
  //test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(message.commands.length);
    
  });
//test 10
  it("responds correctly to status check command", function() {
    let commandOne = new Command('MODE_CHANGE', 'LOW_POWER');
    let commandTwo = new Command('STATUS_CHECK');
    let commandThree = new Command("MOVE", 222);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('STATUS_CHECK', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    // console.log(response.results);
    expect(response.results[1].roverStatus.mode).toEqual('LOW_POWER');
    expect(response.results[1].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[1].roverStatus.position).toEqual(98382);
    
    // [ Object({ completed: true }), 
    // Object({ completed: true, roverStatus: Object({ mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }) }) ]
  });

//test 11
  it("responds correctly to mode change command", function() {
    let commandOne = new Command('MODE_CHANGE', 'LOW_POWER');
    let commandTwo = new Command('STATUS_CHECK');
    let commandThree = new Command("MOVE", 222);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('MODE_CHANGE', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    // console.log(response.results[0]);
    expect(response.results[0]).toEqual({ completed: true });
    expect(rover.mode).toEqual('LOW_POWER');
    
  });  

//test 12
it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commandOne = new Command('MODE_CHANGE', 'LOW_POWER');
    let commandTwo = new Command('STATUS_CHECK');
    let commandThree = new Command("MOVE", 222);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'), new Command("MOVE", 222)];
    let message = new Message('MOVE', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    // console.log(response.results[0].completed)
    expect(response.results[2].completed).toEqual(false);
    expect(rover.position).toEqual(98382);

  });

//test 13
it("responds with position for move command", function() {
    let commandOne = new Command('MODE_CHANGE', 'NORMAL');
    let commandTwo = new Command('STATUS_CHECK');
    let commandThree = new Command("MOVE", 222);
    let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK'), new Command("MOVE", 222)];
    let message = new Message('MOVE', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    // console.log(rover.position);
    expect(rover.position).toEqual(222);
    expect(response.results[2].completed).toEqual(true);
    // console.log(rover.receiveMessage(message));
  });


});
