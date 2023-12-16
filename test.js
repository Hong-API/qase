const name = "Senghong"
const JiraID = "T-1234"
let GPID = 1041
let title = '123/senghong -- 12323/data -- 1234/dara';

const segments = title.split('--');

function convertData(inputString, ID, firstTitle) {
    const dataArray = inputString.split('--');

    const result = dataArray.map((item) => {
        const [gameId, title] = item.split('/');
        const [JiraID, GPID] = firstTitle.split('/')
        return { ID: ID, title: `[${JiraID}] GPID ${GPID} Gameid ${gameId.trim()} (${title.trim()})` };
    });
    return result;
}

const inputString = '1/STAR HUNTER--2/CHINESE NEW YEAR--3/CHINESE NEW YEAR 2';
const ID = 1;

const data = convertData(inputString, ID, "T-1234/003");
// console.log(data);



const myName = "[PROD] testing"
if (myName.toLowerCase().includes('[uat]')) {
    console.log("Is Uat")
} else if (myName.toLowerCase().includes('[prod]')) {
    console.log("Is Production")
} else {
    console.log(false)
}
