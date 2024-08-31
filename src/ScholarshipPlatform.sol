// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract ScholarshipPlatform is Ownable, AccessControl, ReentrancyGuard {
    bytes32 public constant ORGANIZATION_ROLE = keccak256("ORGANIZATION_ROLE");

    struct UserProfile {
        string name;
        string role; // Organization, Student
        string email; // Email of the user
        bool verified; // Verification status for organizations
        uint256[] createdScholarships; // List of scholarships created by the organization
        uint256[] receivedScholarships; // List of scholarships received by the student
        uint256 totalReceived; // Total amount received by the student
        uint256[] appliedScholarships; // List of scholarships the student applied for
    }

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
        string[] applicationRequirements; // List of additional requirements for applying
        mapping(address => string) feedback; // Mapping of student addresses to their feedback
        uint8 ratingSum; // Sum of all ratings received
        uint8 ratingCount; // Number of ratings received
    }

    struct Application {
        uint256 scholarshipId;
        address applicant;
        string reason;
        bool approved;
        bool rejected;
        uint256 appliedAt;
    }

    enum ScholarshipCategory { College, School, Project, Work, Research }

    mapping(address => UserProfile) public profiles;
    ScholarshipInfo[] public scholarships;
    mapping(uint256 => Application) public applications;
    mapping(uint256 => uint256[]) public scholarshipApplications; // Maps scholarshipId to list of application IDs
    uint256 public applicationCount;

    event UserRegistered(address indexed user, string name, string role);
    event RoleAssigned(address indexed user, string role);
    event RoleRemoved(address indexed user, string role);
    event ScholarshipAdded(uint256 indexed scholarshipId, string description, uint256 amount);
    event ScholarshipUpdated(uint256 indexed scholarshipId, string description, uint256 amount);
    event ScholarshipDeactivated(uint256 indexed scholarshipId);
    event ApplicationSubmitted(uint256 indexed applicationId, address indexed applicant, uint256 scholarshipId);
    event ApplicationApproved(uint256 indexed applicationId, uint256 amount);
    event ApplicationRejected(uint256 indexed applicationId);
    event FundsTransferred(address indexed recipient, uint256 amount);
    event ScholarshipFeedbackSubmitted(uint256 indexed scholarshipId, address indexed student, string feedback, uint8 rating);

    constructor(address admin) Ownable(admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    // Register a user
    function registerUser(string calldata name, string calldata role, string calldata email) external nonReentrant {
    require(bytes(profiles[msg.sender].name).length == 0, "User already registered");

    // Initialize the UserProfile struct without using 'new' for dynamic arrays
    UserProfile storage userProfile = profiles[msg.sender];
    userProfile.name = name;
    userProfile.role = role;
    userProfile.email = email;
    userProfile.verified = false;
    userProfile.totalReceived = 0;

    emit UserRegistered(msg.sender, name, role);
    }

    // Verify an organization (Admin verifies an organization and assigns the role)
    function verifyOrganization(address organization) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(bytes(profiles[organization].name).length != 0, "Organization not registered");
        profiles[organization].verified = true;
        grantRole(ORGANIZATION_ROLE, organization);
    }

    // Register scholarship by verified organization
    function addScholarship(
        uint256 amount,
        string memory description,
        ScholarshipCategory category,
        uint256 startDate,
        uint256 endDate,
        uint256 maxApprovalCount,
        string[] memory requirements
    ) public onlyRole(ORGANIZATION_ROLE) payable {
        require(profiles[msg.sender].verified, "Organization not verified");
        require(amount > 0, "Amount should be greater than 0");
        require(msg.value == amount * maxApprovalCount, "Incorrect total fund amount sent");

        scholarships.push();
        ScholarshipInfo storage scholarship = scholarships[scholarships.length - 1];
        scholarship.amount = amount;
        scholarship.description = description;
        scholarship.category = category;
        scholarship.startDate = startDate;
        scholarship.endDate = endDate;
        scholarship.maxApprovalCount = maxApprovalCount;
        scholarship.currentApprovalCount = 0;
        scholarship.active = true;
        scholarship.listedBy = msg.sender;
        scholarship.applicationRequirements = requirements;

        profiles[msg.sender].createdScholarships.push(scholarships.length - 1);

        emit ScholarshipAdded(scholarships.length - 1, description, amount);
    }

    // Update scholarship details
    function updateScholarship(
        uint256 scholarshipId,
        string memory description,
        uint256 endDate,
        uint256 maxApprovalCount,
        string[] memory requirements
    ) public onlyRole(ORGANIZATION_ROLE) {
        ScholarshipInfo storage scholarship = scholarships[scholarshipId];
        require(scholarship.active, "Scholarship is inactive");
        require(scholarship.listedBy == msg.sender, "Not the lister");

        scholarship.description = description;
        scholarship.endDate = endDate;
        scholarship.maxApprovalCount = maxApprovalCount;
        scholarship.applicationRequirements = requirements;

        emit ScholarshipUpdated(scholarshipId, description, scholarship.amount);
    }

    // Deactivate scholarship
    function deactivateScholarship(uint256 scholarshipId) public onlyRole(ORGANIZATION_ROLE) {
        ScholarshipInfo storage scholarship = scholarships[scholarshipId];
        require(scholarship.listedBy == msg.sender, "Not the lister");
        scholarship.active = false;

        emit ScholarshipDeactivated(scholarshipId);
    }

    // Apply for scholarship
    function applyForScholarship(uint256 scholarshipId, string memory reason) public nonReentrant {
        ScholarshipInfo storage scholarship = scholarships[scholarshipId];
        require(scholarship.active, "Scholarship is inactive");
        require(block.timestamp < scholarship.endDate, "Scholarship application period has ended");

        // Check if the student has already applied for this scholarship
        for (uint256 i = 0; i < profiles[msg.sender].appliedScholarships.length; i++) {
            require(profiles[msg.sender].appliedScholarships[i] != scholarshipId, "Already applied for this scholarship");
        }

        applicationCount++;
        applications[applicationCount] = Application({
            scholarshipId: scholarshipId,
            applicant: msg.sender,
            reason: reason,
            approved: false,
            rejected: false,
            appliedAt: block.timestamp
        });

        profiles[msg.sender].appliedScholarships.push(scholarshipId);
        scholarshipApplications[scholarshipId].push(applicationCount);

        emit ApplicationSubmitted(applicationCount, msg.sender, scholarshipId);
    }

    // Approve application and transfer funds to student
    function approveApplication(uint256 applicationId) public onlyRole(ORGANIZATION_ROLE) nonReentrant {
        Application storage application = applications[applicationId];
        require(!application.approved, "Application already approved");
        require(!application.rejected, "Application already rejected");

        ScholarshipInfo storage scholarship = scholarships[application.scholarshipId];
        require(scholarship.currentApprovalCount < scholarship.maxApprovalCount, "Max approval limit reached");

        scholarship.currentApprovalCount++;
        application.approved = true;

        // Transfer the funds to the student
        (bool success, ) = application.applicant.call{value: scholarship.amount}("");
        require(success, "Transfer to student failed");

        // Record the scholarship received by the student
        profiles[application.applicant].receivedScholarships.push(application.scholarshipId);
        profiles[application.applicant].totalReceived += scholarship.amount;

        emit ApplicationApproved(applicationId, scholarship.amount);
        emit FundsTransferred(application.applicant, scholarship.amount);
    }

    // Reject application
    function rejectApplication(uint256 applicationId) public onlyRole(ORGANIZATION_ROLE) nonReentrant {
        Application storage application = applications[applicationId];
        require(!application.approved, "Application already approved");
        require(!application.rejected, "Application already rejected");

        application.rejected = true;
        emit ApplicationRejected(applicationId);
    }

    // Withdraw unused funds after scholarship ends
    function withdrawUnusedFunds(uint256 scholarshipId) public onlyRole(ORGANIZATION_ROLE) nonReentrant {
        ScholarshipInfo storage scholarship = scholarships[scholarshipId];
        require(block.timestamp > scholarship.endDate, "Scholarship period has not ended");
        require(scholarship.listedBy == msg.sender, "Not the lister");
        require(scholarship.active, "Scholarship is inactive");

        uint256 remainingFunds = scholarship.amount * (scholarship.maxApprovalCount - scholarship.currentApprovalCount);
        scholarship.active = false;

        (bool success, ) = msg.sender.call{value: remainingFunds}("");
        require(success, "Withdrawal failed");
    }

    // Submit feedback and rating for a scholarship
    function submitFeedback(uint256 scholarshipId, string memory feedback, uint8 rating) public nonReentrant {
        require(rating > 0 && rating <= 5, "Invalid rating"); // Ratings must be between 1 and 5
        ScholarshipInfo storage scholarship = scholarships[scholarshipId];
        require(isStudent(msg.sender), "Only students can submit feedback");

        scholarship.feedback[msg.sender] = feedback;
        scholarship.ratingSum += rating;
        scholarship.ratingCount += 1;

        emit ScholarshipFeedbackSubmitted(scholarshipId, msg.sender, feedback, rating);
    }

    // Get an organization's created scholarships
    function getOrganizationScholarships(address organization) external view returns (uint256[] memory) {
        require(hasRole(ORGANIZATION_ROLE, organization), "Not an organization");
        return profiles[organization].createdScholarships;
    }

    // Get a student's received scholarships and total amount received
    function getStudentScholarships(address student) external view returns (uint256[] memory, uint256) {
        require(keccak256(abi.encodePacked(profiles[student].role)) == keccak256("Student"), "Not a student");
        return (profiles[student].receivedScholarships, profiles[student].totalReceived);
    }

    // Get a student's feedback on a scholarship
    function getScholarshipFeedback(uint256 scholarshipId, address student) external view returns (string memory) {
        require(keccak256(abi.encodePacked(profiles[student].role)) == keccak256("Student"), "Not a student");
        ScholarshipInfo storage scholarship = scholarships[scholarshipId];
        return scholarship.feedback[student];
    }

    // Get the average rating of a scholarship
    function getScholarshipRating(uint256 scholarshipId) external view returns (uint8) {
        ScholarshipInfo storage scholarship = scholarships[scholarshipId];
        if (scholarship.ratingCount == 0) {
            return 0; // No ratings yet
        }
        return scholarship.ratingSum / scholarship.ratingCount;
    }

    // Get all applications for a specific scholarship
    function getApplicationsForScholarship(uint256 scholarshipId) external view returns (Application[] memory) {
        uint256[] memory applicationIds = scholarshipApplications[scholarshipId];
        Application[] memory scholarshipApplicationsList = new Application[](applicationIds.length);

        for (uint256 i = 0; i < applicationIds.length; i++) {
            scholarshipApplicationsList[i] = applications[applicationIds[i]];
        }

        return scholarshipApplicationsList;
    }

    // Fallback function to receive funds
    receive() external payable {}

    // Helper function to check if an address is a student
    function isStudent(address user) internal view returns (bool) {
        return keccak256(abi.encodePacked(profiles[user].role)) == keccak256("Student");
    }
}
