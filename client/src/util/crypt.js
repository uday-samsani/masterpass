import CryptoJS from 'crypto-js';

const decrypt = data => {
	const key = sessionStorage.getItem('key');
	return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
};

const encrypt = data => {
	const key = sessionStorage.getItem('key');
	return CryptoJS.AES.encrypt(data, key).toString();
};

export { decrypt, encrypt };
