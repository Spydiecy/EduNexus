// src/scholarshipPlatform.js

import Web3 from 'web3';
import ScholarshipPlatformABI from './scholarshipPlatform.json';

const web3 = new Web3(window.ethereum);
const contractAddress = '0x756F971D1C603f297Ad1020BAf96021a3D9F7AE6';
const scholarshipPlatform = new web3.eth.Contract(ScholarshipPlatformABI, contractAddress);

export default scholarshipPlatform;
