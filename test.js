const name = "Senghong"
const JiraID = "T-1234"
let GPID = 1041
let title = '123/senghong -- 12323/data -- 1234/dara';

const segments = title.split('--');

// const data = segments.map(segment => {
//     const [id, name] = segment.trim().split('/');
//     return { id: Number(id), name: name.trim() };
// });

// console.log(data);

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
console.log(data);


