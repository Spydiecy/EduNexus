# EduNexus - Decentralized Scholarship Platform

Welcome to **EduNexus**, a decentralized platform designed to revolutionize the scholarship application and distribution process. Built on the Open Campus EduChain, EduNexus leverages blockchain technology to provide transparency, fairness, and efficiency in awarding scholarships to deserving students.

![image](https://github.com/user-attachments/assets/b259712e-5098-47e0-abea-6ad08be2fc6e)

## Overview

The Scholarship Platform DApp is a decentralized application (DApp) built on the Open Campus EduChain, designed to facilitate the creation, application, and management of scholarships. This platform provides an efficient, transparent, and secure environment for organizations to offer scholarships and for students to apply for them. By leveraging blockchain technology, the Scholarship Platform ensures that every transaction is immutable, transparent, and accessible to all stakeholders.

![image](https://github.com/user-attachments/assets/1beebe4e-68f2-458a-a8f7-a187c00ebf21)

## Key Features

### Admin Dashboard
EduNexus provides an extensive Admin Dashboard that allows administrators to manage the platform effortlessly. Administrators can verify organizations, manage user roles, and view detailed statistics on the platform's usage.

![image](https://github.com/user-attachments/assets/906f626b-a544-4305-9758-d57638181594)

### Organization Dashboard
Organizations can create, update, and manage scholarships through a dedicated dashboard. The platform supports features like setting scholarship requirements, reviewing applications, and approving or rejecting them.

![image](https://github.com/user-attachments/assets/5db17113-a795-4c6b-8ed7-a6faf240b0e7)

### Student Dashboard
Students can browse available scholarships, apply for them, and track the status of their applications. The student dashboard is designed to be intuitive, ensuring a smooth experience for applicants.

![image](https://github.com/user-attachments/assets/adf1e36a-354b-4191-b04d-92d923cdfd90)

### 1. **User Roles**
   - **Organizations**: Verified entities that can create and manage scholarships. They have the ability to approve or reject applications, withdraw unused funds, and update scholarship details.
   - **Students**: Individuals who can apply for scholarships, track their application status, and provide feedback on received scholarships.

### 2. **Profile Management**
   - Users can register on the platform with roles such as `Student` or `Organization`.
   - Organizations need to be verified by an admin to gain the ability to create scholarships.
   - Profiles store essential information such as name, email, role, and verification status.
   - For organizations, the profile also tracks created scholarships, while for students, it tracks received scholarships and total funds received.

### 3. **Scholarship Management**
   - **Creation**: Organizations can create scholarships by specifying the amount in EDU (the platform's token), description, category, start and end dates, maximum approvals, and additional application requirements.
   - **Update**: Scholarships can be updated with new details before the application period ends.
   - **Deactivation**: Organizations can deactivate a scholarship if it is no longer available.

### 4. **Application Process**
   - **Apply**: Students can apply for available scholarships by providing the required information and application reason.
   - **Approval/Rejection**: Organizations review applications and approve or reject them based on their criteria. Approved applications result in the transfer of funds to the student.
   - **Feedback and Rating**: After receiving a scholarship, students can provide feedback and rate the scholarship, contributing to the overall rating of the scholarship.

### 5. **Fund Management**
   - Organizations deposit the total required funds when creating a scholarship.
   - Upon application approval, funds are automatically transferred to the student’s account.
   - Organizations can withdraw unused funds after the scholarship period ends.

### 6. **Transparency and Security**
   - All transactions and operations are recorded on the Open Campus EduChain, ensuring transparency and immutability.
   - The platform uses smart contracts to automate processes, reducing the risk of manual errors and ensuring that operations are executed as intended.

![image](https://github.com/user-attachments/assets/00ce4d62-2373-4169-889a-65e55b6d3715)

### 7. **Front-End Interface**
   - **Student Dashboard**: Students can view available scholarships, apply for them, and track their application status. They can also see scholarships they have applied to and the feedback they have provided.
   - **Organization Dashboard**: Organizations can manage their profile, create and update scholarships, approve or reject applications, and withdraw unused funds.
   - **Admin Dashboard**: The admin can verify organizations, assign roles, and manage the overall platform.

### 8. **Blockchain and Smart Contracts**
   - The entire platform is powered by Solidity smart contracts deployed on the Open Campus EduChain.
   - The smart contracts handle user registration, scholarship creation, application processing, fund transfers, and feedback collection.
   - The DApp leverages Web3.js to interact with the Open Campus EduChain, enabling seamless integration with MetaMask for managing transactions.

![Smart Contract Overview](path/to/smart-contract-overview.png)

## Contract Structure

### 1. **UserProfile**
   - Stores user details, including name, role, email, verification status, and lists of scholarships created, received, and applied for.

### 2. **ScholarshipInfo**
   - Holds scholarship details, such as the amount, description, category, start and end dates, application requirements, and feedback from students.

### 3. **Application**
   - Tracks scholarship applications, including the scholarship ID, applicant address, reason for application, approval status, and application date.

### 4. **Events**
   - The contract emits events for key actions, such as user registration, role assignment, scholarship creation, application submission, approval/rejection, and fund transfers.

![image](https://github.com/user-attachments/assets/2bb82196-6af4-4955-a8e5-43f8dad33b56)

## Technology Stack

- **Solidity**: The primary programming language for writing the smart contracts.
- **Web3.js**: A JavaScript library that interacts with the Open Campus EduChain and smart contracts.
- **React.js**: The front-end library used for building the user interface.
- **MetaMask**: A browser extension for managing Open Campus EduChain accounts and transactions.

![image](https://github.com/user-attachments/assets/492f64fd-8bfb-4a27-afd0-49c66d31a04b)

## User Flow

1. **Registration**: Users register as either a student or an organization. Organizations must be verified by an admin.
2. **Scholarship Creation**: Verified organizations create scholarships with all necessary details.
3. **Application**: Students browse available scholarships and apply by providing the required information.
4. **Approval/Rejection**: Organizations review applications and either approve or reject them.
5. **Fund Transfer**: Upon approval, funds are automatically transferred to the student's account.
6. **Feedback**: Students provide feedback and ratings for the scholarships they receive.
7. **Withdrawal**: After the scholarship period ends, organizations can withdraw any unused funds.

![User Flow Overview](path/to/user-flow-screenshot.png)

## Key Benefits

- **Decentralization**: Removes the need for intermediaries, allowing direct interaction between organizations and students.
- **Transparency**: Every action is recorded on the blockchain, providing a clear and immutable audit trail.
- **Security**: Smart contracts ensure that all processes are executed according to predefined rules, reducing the risk of fraud.
- **Efficiency**: Automates the scholarship application and approval process, saving time for both organizations and students.

![Key Benefits Overview](path/to/key-benefits-screenshot.png)

## Future Enhancements

- **Scholarship Marketplace**: A marketplace where organizations can list scholarships and students can apply, filter, and sort based on various criteria.
- **Advanced Analytics**: Dashboards providing insights into the number of applications, approval rates, and fund distribution.
- **Multi-chain Support**: Expanding the platform to support multiple blockchain networks, allowing for cross-chain scholarships.
- **Mobile App**: A mobile version of the DApp to enhance accessibility and user experience.

![Future Enhancements Overview](path/to/future-enhancements-screenshot.png)

## Conclusion

The Scholarship Platform DApp is a robust and innovative solution for managing scholarships in a decentralized manner. By utilizing blockchain technology, the platform ensures transparency, security, and efficiency, making it easier for organizations to manage scholarships and for students to access educational funding. The platform is designed to be user-friendly, with an intuitive interface and automated processes that streamline the entire scholarship lifecycle.

![EduNexus Summary](path/to/summary-screenshot.png)

---

Thank you for exploring EduNexus! We hope this platform helps bridge the gap between deserving students and the financial aid they need to succeed in their educational endeavors.
