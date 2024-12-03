const bcrypt = require("bcrypt");

const myPlaintextPassword = "weAllWin";


const genSaltAndHashPW = async (plaintextPW) => {
    try {
        const saltRounds = 10; // default: 10
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(plaintextPW, salt);

        return hashedPassword;

    } catch (error) {
        console.error('Error generating salt and hashing password', error);
    }
}


// return true or false, used within checkPW function
const comparePasswords = async (myPlaintextPass, hashedPass) => {
    console.log('comparingPasswords')
    try {
        const isMatch = await bcrypt.compare(myPlaintextPass, hashedPass);
        // 
        return isMatch;

    } catch (error) {
        console.error('Error attempting to compare PW', error);
        throw new Error('Error occurred comparing PW..')
    }
}

const testCheckPassword = async (plaintextPass) => {

    const hashedDone = await genSaltAndHashPW(plaintextPass);

    const match = await comparePasswords(plaintextPass, hashedDone);
    console.log('Password match', match);
    return match;
}


// Rec to use async, hard-coded attempt
const generateSaltAndHashPassword = async () => {
    const myPlaintextPassword = "danielPaizWins";

    try {
        // Gen a salt w. number of rounds (default:10)
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the pw with gen salt
        const hashedPassword = await bcrypt.hash(myPlaintextPassword, salt);

        console.log(`Gen salt: ${salt}`);
        console.log(`Plaintext PW: ${myPlaintextPassword}`);
        console.log(`Hashed PW: ${hashedPassword}`);

    } catch (err) {
        console.error('Error gen salt and hashing pw', err);
    }
};

// generateSaltAndHashPassword();



/** Expected: values..
 *  Received: [Object PROMISE]
 * use .then() to view the objects value
 */

const hashedPW = genSaltAndHashPW(myPlaintextPassword);
console.log(`hashedPW result: ${hashedPW.then(
)}`);

const testResult = testCheckPassword(myPlaintextPassword);
console.log(`tested: ${testResult}`);

// [object PROMISE] - technique to view value 
hashedPW.then((value) => {
    console.log(`${value} testing hashedPW`);
})

testResult.then((value) => {
    console.log(`${value} testing testResult`);
})