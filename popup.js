
const URL = "https://qaseapiextension.onrender.com";

const token = {
    senghong: "67fb1f9b0dd6a3e292e1fa4c9752d1af3f1ea0a787ca95f698f5b8883af5d40d",
    vannak: "67fb1f9b0dd6a3e292e1fa4c9752d1af3f1ea0a787ca95f698f5b8883af5d40d",
    sopha: "38c77aaeb9d5e0dfcaf99627a74e70949b3e668ad2fed73a1845bd6ac7ae7f22"
}

// Get token
const tokenElement = document.getElementById("token");
const getToken = () => {
    for (let key in token) {
        const option = document.createElement("option");
        option.value = token[key];
        option.textContent = key;
        tokenElement.appendChild(option);
        // console.log(token[key])
    }
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



// Test Run 
const button = document.getElementById('CreateTestRun')
const testPlan = document.getElementById('selectPlan');
const envID = document.getElementById('env');
let Title = document.getElementById('title');

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

        if (data.title && data.token && data.plan_id !== '') {

            const response = await fetch(`${URL}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const responseData = await response.json();
            console.log(responseData);
            showNotification('Create test run successfully', 'green')
            button.disabled = false
            button.style.backgroundColor = 'green';

        }
        else {
            showNotification('Please input correct format', 'red')
            button.disabled = false
            button.style.backgroundColor = 'green';
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        showNotification('Worng your authur', 'yellow')
        button.style.backgroundColor = 'green';
    }

}


button.addEventListener('click', createNewTestRun)


Title.addEventListener("keypress", function (event) {
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
