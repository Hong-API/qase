
const URL = "https://qqknevh7guimnafkkwce5ajl6a0rrjxb.lambda-url.us-east-1.on.aws";

// Get token
const tokenElement = document.getElementById("token");
const button = document.getElementById('CreateTestRun')
const testPlan = document.getElementById('selectPlan');
const envID = document.getElementById('env');
const firstTitle = document.getElementById('first_title');
const lastTitle = document.getElementById('last_title');
const requestData = document.getElementById('requestData');

const getToken = async () => {
    requestData.style.display = 'block';
    await fetch(`${URL}/author`,).then(response => response.json())
        .then(data => {
            const mydata = data.data
            for (item in mydata) {
                const option = document.createElement('option');
                option.value = mydata[item];
                option.textContent = item
                tokenElement.appendChild(option)
            }

        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching data:', error);
        });
    requestData.style.display = 'none';

}

getToken()


// Get plan
const getTestPlan = () => {
    fetch(URL, {
        method: 'GET',

    }).then(response => response.json())
        .then(data => {
            const mydata = data.data.result
            console.log(mydata);

            mydata.entities.forEach(element => {
                const option = document.createElement('option');
                option.style.color = 'green';
                option.style.fontWeight = 'bold';
                option.value = element.id;
                option.textContent = element.title;
                document.getElementById('selectPlan').appendChild(option);
            });
        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching data:', error);
        });
}
getTestPlan();

// Get Environments

const getEnvironments = async () => {
    await fetch(`${URL}/env`,).then(response => response.json())
        .then(data => {
            const mydata = data.data.result
            console.log(mydata);

            mydata.entities.forEach(element => {
                const option = document.createElement('option');
                option.value = element.id;
                option.textContent = element.title;
                document.getElementById('env').appendChild(option);
            });
        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching data:', error);
        });
}

getEnvironments();

// Generate title 
function generateTitle(Title1, Title2, plan, env, author) {
    const dataArray = Title2.split('--');
    const result = dataArray.map((item) => {
        const [gameId, name] = item.split('/');
        const [JiraID, GPID] = Title1.split('/')
        return { title: `[${JiraID}] GPID ${GPID} GameID ${gameId.trim()} (${name})`, plan_id: plan, environment_id: env, token: author };
    });
    return result;
}


// Create Test run
const createNewTestRun = async () => {
    button.disabled = true
    button.style.backgroundColor = 'gray';
    button.textContent = 'sending'
    const Title1 = firstTitle.value
    const Title2 = lastTitle.value
    const plan = testPlan.value
    const env = envID.value
    const author = tokenElement.value
    const data = generateTitle(Title1, Title2, plan, env, author)
    try {
        for (const item of data) {
            await sendDataToAPI(item);
            await delay(1000)
            showNotification(`created ${item.title}`, 'blue');
            await delay(1000)
            console.log(item.title)
        }
        showNotification('All data has been created', 'green');
        button.disabled = false
        button.style.backgroundColor = 'green';
        button.textContent = 'Create'
    } catch (error) {
        console.error(error.message)
        button.disabled = false
        button.style.backgroundColor = 'green';
        button.textContent = 'Create'


    }


}

async function sendDataToAPI(data) {
    try {
        const response = await fetch(`${URL}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)

        });
        if (!response.ok) {
            throw new Error('Failed to send data');
        }

        const responseData = await response.json();
        console.log('Data sent:', responseData);
    } catch (error) {
        console.error('Error sending data:', error.message);
        throw error;
    }
}

button.addEventListener('click', createNewTestRun)


// lastTitle.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         event.preventDefault();
//         button.click();
//     }
// });
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


function showNotification(message, msbackgrond) {
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    notification.style.backgroundColor = msbackgrond
    notification.textContent = message

    setTimeout(() => {
        notification.style.display = 'none';
    }, 1000);
}

// Format title 
function convertString(inputString) {
    // Split the input string by "/"
    const parts = inputString.split('/');
    let result = '';
    // Form the desired string format
    if (parts.length !== 4) {
        result
    } else {
        // Extracting the required elements
        const tValue = parts[0]; // T1234
        const gpidValue = parts[1]; // 1232
        const gameIdValue = parts[2]; // 02
        const helloValue = parts.slice(3).join(' '); // Hello Senghong
        result = `[${tValue}] GPID ${gpidValue} Game ID ${gameIdValue} (${helloValue})`
    }
    return result

}
