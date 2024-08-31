// src/scholarshipPlatform.js

import Web3 from 'web3';
import ScholarshipPlatformABI from './scholarshipPlatform.json';

const web3 = new Web3(window.ethereum);
const contractAddress = '0xb7F47AAa68959aa69D2dF00dfa92FdD024a47889';
const scholarshipPlatform = new web3.eth.Contract(ScholarshipPlatformABI, contractAddress);

export default scholarshipPlatform;
