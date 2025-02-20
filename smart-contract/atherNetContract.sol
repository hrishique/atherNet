// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskManager {
    struct Task {
        uint256 id;
        string fileCID;  // Original image CID
        string taskType;
        address assignedNode; // Address of the compute node
        string resultCID; // Processed image CID
        string status; // "pending", "assigned", "completed"
        bool completed;
    }

    Task[] public tasks;
    mapping(uint256 => bool) public taskAssigned;
    
    event TaskCreated(uint256 indexed taskId, string fileCID, string taskType, string status);
    event TaskAssigned(uint256 indexed taskId, address assignedNode);
    event TaskCompleted(uint256 indexed taskId, string resultCID);
    event TaskUpdated(uint256 indexed taskId, string newStatus);

    function createTask(string memory _fileCID, string memory _taskType) public {
        uint256 taskId = tasks.length;
        tasks.push(Task(taskId, _fileCID, _taskType, address(0), "", "pending", false));
        emit TaskCreated(taskId, _fileCID, _taskType, "pending");
    }

    function claimTask(uint256 _taskId) public {
        require(_taskId < tasks.length, "Invalid Task ID");
        require(!taskAssigned[_taskId], "Task already assigned");

        tasks[_taskId].assignedNode = msg.sender;
        tasks[_taskId].status = "assigned";
        taskAssigned[_taskId] = true;

        emit TaskAssigned(_taskId, msg.sender);
    }

    function completeTask(uint256 _taskId, string memory _resultCID) public {
        require(_taskId < tasks.length, "Invalid Task ID");
        require(tasks[_taskId].assignedNode == msg.sender, "Not assigned to you");
        require(!tasks[_taskId].completed, "Task already completed");

        tasks[_taskId].resultCID = _resultCID;
        tasks[_taskId].status = "completed";
        tasks[_taskId].completed = true;

        emit TaskCompleted(_taskId, _resultCID);
    }

    function updateTask(uint256 _taskId, string memory _newStatus) public {
        require(_taskId < tasks.length, "Invalid Task ID");

        tasks[_taskId].status = _newStatus;
        emit TaskUpdated(_taskId, _newStatus);
    }

    function getTask(uint256 _taskId) public view returns (uint256, string memory, string memory, address, string memory, string memory, bool) {
        require(_taskId < tasks.length, "Invalid Task ID");

        Task memory task = tasks[_taskId];
        return (task.id, task.fileCID, task.taskType, task.assignedNode, task.resultCID, task.status, task.completed);
    }

    function getAllTasks() public view returns (Task[] memory) {
        return tasks;
    }
}
