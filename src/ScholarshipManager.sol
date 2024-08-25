// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ScholarshipManager is Ownable, ReentrancyGuard, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant COLLEGE_ROLE = keccak256("COLLEGE_ROLE");

    struct ScholarshipInfo {
        uint256 amount;
        string description;
        ScholarshipCategory category;
        uint256 startDate;
        uint256 endDate;
        uint256 maxApprovalCount;
        uint256 currentApprovalCount;
        bool active;
        address listedBy;
    }

    struct Application {
        address applicant;
        uint256 amount;
        ApplicationStatus status;
        string reason;
        bool exists;
    }

    enum ScholarshipCategory { College, School, Project, Work, Research }
    enum ApplicationStatus { Pending, UnderReview, Approved, Rejected, Expired }

    ScholarshipInfo[] public scholarships;
    mapping(uint256 => Application) public applications;

    event ScholarshipAdded(uint256 indexed scholarshipId, string description, uint256 amount);
    event ApplicationSubmitted(uint256 indexed applicationId, address indexed applicant, uint256 amount, string reason);
    event ApplicationApproved(uint256 indexed applicationId, uint256 amount);

    // Functions for adding scholarships, applying for them, and approving applications go here...

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function addScholarship(
        uint256 amount,
        string memory description,
        ScholarshipCategory category,
        uint256 startDate,
        uint256 endDate,
        uint256 maxApprovalCount
    ) public onlyRole(COLLEGE_ROLE) {
        scholarships.push(ScholarshipInfo({
            amount: amount,
            description: description,
            category: category,
            startDate: startDate,
            endDate: endDate,
            maxApprovalCount: maxApprovalCount,
            currentApprovalCount: 0,
            active: true,
            listedBy: msg.sender
        }));

        emit ScholarshipAdded(scholarships.length - 1, description, amount);
    }

    function applyForScholarship(uint256 scholarshipId, string memory reason) public payable {
        ScholarshipInfo storage scholarship = scholarships[scholarshipId];
        require(scholarship.active, "Scholarship is inactive");
        require(msg.value == scholarship.amount, "Incorrect application amount");

        applications[scholarshipId] = Application({
            applicant: msg.sender,
            amount: msg.value,
            status: ApplicationStatus.Pending,
            reason: reason,
            exists: true
        });

        emit ApplicationSubmitted(scholarshipId, msg.sender, msg.value, reason);
    }

    function approveApplication(uint256 applicationId) public onlyRole(ADMIN_ROLE) {
        Application storage application = applications[applicationId];
        require(application.exists, "Application does not exist");

        application.status = ApplicationStatus.Approved;

        emit ApplicationApproved(applicationId, application.amount);

        payable(application.applicant).transfer(application.amount);
    }
}
