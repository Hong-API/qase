
const URL = "https://qqknevh7guimnafkkwce5ajl6a0rrjxb.lambda-url.us-east-1.on.aws";

// Get token
const tokenElement = document.getElementById("token");
const button = document.getElementById('CreateTestRun')
const testPlan = document.getElementById('selectPlan');
const envID = document.getElementById('env');
const title = document.getElementById('title');

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
// requestData.addEventListener('click', async (event) => {
//     event.preventDefault();
//     requestData.textContent = 'Getting..';
//     getToken()

// })

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



// Create Test run
const createNewTestRun = async () => {
    button.disabled = true
    button.style.backgroundColor = 'gray';
    const data = {
        title: convertString(title.value),
        plan_id: testPlan.value,
        environment_id: envID.value,
        token: tokenElement.value
    };
    console.log(data)

    try {

        if (data.title && data.plan_id !== '') {

            const response = await fetch(`${URL}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            console.log(responseData);
            showNotification('Create test run successfully', 'green')
            button.disabled = false
            button.style.backgroundColor = '#00d157';

        }
        else {
            showNotification('Please input correct format', 'red')
            button.disabled = false
            button.style.backgroundColor = '#00d157';
        }
    } catch (error) {
        showNotification("Create new test run failed", 'red')
        button.disabled = false
        button.style.backgroundColor = '#00d157';
    }

}


button.addEventListener('click', createNewTestRun)


title.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        button.click();
    }
});

function showNotification(message, msbackgrond) {
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    notification.style.backgroundColor = msbackgrond
    notification.textContent = message

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
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
