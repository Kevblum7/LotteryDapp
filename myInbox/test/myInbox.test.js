const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode} = require('../compile');

let accounts;
let myInbox;
const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy
  // the contract
  myInbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: '1000000' })


});

describe('myInbox', () => {
  it('deploys a contract', () => {
    assert.ok(myInbox.options.address);
  });
  it('has a default message', async () => {
    const message = await myInbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });
  it('can change the message', async () => {
    await myInbox.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await myInbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});

/*
class Car {
  park() {
    return 'stopped';
  }
  drive() {
    return 'vroom';
  }
}

let car;
beforeEach(() => {
  car = new Car();
});

describe('Car', () => {
  it('can park', () => {
    assert.equal(car.park(), 'stopped');
  });
  it('can drive', () => {
    assert.equal(car.drive(), 'vroom');
  });
});
*/
