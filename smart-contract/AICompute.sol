// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract AICompute {
    struct Task {
        address submitter;
        string fileCID;
        string resultCID;
        address computeNode;
        bool completed;
    }

    mapping(uint256 => Task) public tasks;
    uint256 public taskCount = 0;

    function submitTask(string memory fileCID) public {
        tasks[taskCount] = Task(msg.sender, fileCID, "", address(0), false);
        taskCount++;
    }

    function completeTask(uint256 taskId, string memory resultCID, address computeNode) public {
        require(tasks[taskId].computeNode == address(0), "Task already completed");
        tasks[taskId].computeNode = computeNode;
        tasks[taskId].resultCID = resultCID;
        tasks[taskId].completed = true;
    }
}