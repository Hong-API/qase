//   New test
function convertToFormat(input) {
    const lines = input.split('\n');
    let result = '';
    lines.forEach((line, index) => {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 2) {
            const number = parts.shift();
            const value = parts.join(' ');
            result += `${number}/${value}`;
            if (index !== lines.length - 1) {
                result += '--';
            }
        }
    });
    return result;
}
const input = document.getElementById('converter')
const datastore = document.getElementById('data')
document.getElementById('button').addEventListener('click', () => {
    datastore.textContent = convertToFormat(input.value)
    console.log(convertToFormat(input.value))
})


function copyTextToClipboard() {
    const copyElement = document.getElementById("data");
    copyElement.select();
    navigator.clipboard.writeText(copyElement.value);
    showNotification('copied', 'gray')

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


document.getElementById('copyBtn').addEventListener('click', copyTextToClipboard)