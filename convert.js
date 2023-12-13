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
    // convertToFormat(input)
    datastore.textContent = convertToFormat(input.value)
    console.log(convertToFormat(input.value))
})

