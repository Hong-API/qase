
const URL = "https://qqknevh7guimnafkkwce5ajl6a0rrjxb.lambda-url.us-east-1.on.aws";

// Get token
const tokenElement = document.getElementById("token");
const button = document.getElementById('CreateTestRun')
const testPlan = document.getElementById('selectPlan');
const envID = document.getElementById('env');
const displayEndElement = document.getElementById('displayENV');
const jiraID = document.getElementById('jira_id');
const gameID = document.getElementById('game_id');
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
            throw error;
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
                option.style.fontWeight = '600';
                option.style.fontSize = '14px';
                option.value = element.id;
                option.textContent = element.title;
                document.getElementById('selectPlan').appendChild(option);
            });

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
getTestPlan();

testPlan.addEventListener('change', function () {
    const selectedOption = this.options[this.selectedIndex];
    if (`${selectedOption.textContent}`.toLowerCase().includes('[uat]')) {
        displayEndElement.placeholder = 'Demo Site / UAT';
        envID.value = 3
    } else if (`${selectedOption.textContent}`.toLowerCase().includes('[prod]')) {
        displayEndElement.placeholder = 'Production';
        envID.value = 1

    } else {
        console.log('Not select uat or prod')
    }
});

// Get Environments

const getEnvironments = async () => {
    await fetch(`${URL}/env`,).then(response => response.json())
        .then(data => {
            const mydata = data.data.result
            return mydata

        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching data:', error);
        });
}

getEnvironments();

// Generate title 
function generateData(Title2, plan, env, author) {
    const dataArray = Title2.split('--');
    const result = dataArray.map((item) => {
        const [gameId, name] = item.split('/');
        return { title: `[${jiraID.value}] GPID ${gameID.value} GameID ${gameId.trim()} (${name})`, plan_id: plan, environment_id: env, token: author };
    });
    return result;
}


// Create Test run
const createNewTestRun = async () => {
    button.disabled = true
    button.style.backgroundColor = 'gray';
    button.textContent = 'Sending...'
    const Title2 = lastTitle.value
    const plan = testPlan.value
    const env = envID.value
    const author = tokenElement.value
    const data = generateData(Title2, plan, env, author)
    const checkEmpty = jiraID.value && gameID.value && Title2 && author && plan
    try {
        if (checkEmpty !== '') {
            for (const item of data) {
                await sendDataToAPI(item);
                await delay(1000)
                showNotification(`created ${item.title}`, 'blue');

            }
            await delay(1000)
            showNotification('All data has been created', 'green');
            button.disabled = false
            button.style.backgroundColor = 'green';
            button.textContent = 'Create'
        } else {
            showNotification('Please input all fields', 'red')
            button.style.backgroundColor = 'green';
            button.textContent = 'Create'
            button.disabled = false
        }
    } catch (error) {
        showNotification('Create failed', 'red');
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
