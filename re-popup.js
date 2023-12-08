let api_token = "38c77aaeb9d5e0dfcaf99627a74e70949b3e668ad2fed73a1845bd6ac7ae7f22"

async function fetchTestPlanOptions() {
  const form = document.getElementById('testForm');
  const testPlanSelect = document.getElementById('testPlan');
  const apiUrl = 'https://api.qase.io/v1/plan/RPP?limit=100&offset=0';
  const options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Token': api_token
    }
  };
  const res = await fetch(apiUrl, options)
  const data = await res.json()
  data.result.entities.forEach(plan => {
    const option = document.createElement('option');
    option.value = plan.id; // Assuming the title is the value you want to use
    option.text = plan.title;
    testPlanSelect.appendChild(option);
  })
}
fetchTestPlanOptions()


async function createTestRun(title, environment_id, plan_id) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Token: api_token
    },
    body: JSON.stringify({ title: title, environment_id: environment_id, plan_id: plan_id })
  };

  try {
    const response = await fetch('https://api.qase.io/v1/run/RPP', options);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
    // Handle the error, show a message to the user, or perform any necessary actions.
  }
}




function submitForm() {
  let requestId = document.getElementById('requestId').value;
  let gpid = document.getElementById('gpid').value;
  let gameId = document.getElementById('gameId').value;
  let gameName = document.getElementById('gameName').value;
  let testPlan = document.getElementById('testPlan').options[document.getElementById('testPlan').selectedIndex].value;
  let environment = document.getElementById('environment').options[document.getElementById('environment').selectedIndex].value;

  let testRunTitle = `[${requestId}] GPID ${gpid} Game ID ${gameId} (${gameName})`;

  // await createTestRun(testRunTitle, environment, testPlan);
}



let submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', submitForm);



