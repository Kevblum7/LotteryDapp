pragma solidity ^0.4.17;

contract MyInbox {
    string public message;

    function MyInbox (string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }


}
