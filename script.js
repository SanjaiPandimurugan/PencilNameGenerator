const nameInput = document.getElementById('nameInput');
const generateBtn = document.getElementById('generateBtn');
const outputContainer = document.getElementById('outputContainer');
const outputImage = document.getElementById('outputImage');
const downloadLink = document.getElementById('downloadLink');

generateBtn.addEventListener('click', generateImage);

function generateImage() {
    const name = nameInput.value.trim();
    if (name === '') {
        alert('Please enter a name');
        return;
    }

    outputContainer.querySelectorAll('.textOverlay').forEach(el => el.remove());

    const PerSet = 10;
    const sets = 2;
    const fontSize = 15; 
    const pencilWidth = 3.6; 
    const setspace = 13; 
    const withinspace = 0;

    for (let set = 0; set < sets; set++) {
        for (let pencil = 0; pencil < PerSet; pencil++) {
            const x = 10 + (set * (PerSet * (pencilWidth +  withinspace) + setspace)) + (pencil * (pencilWidth + withinspace));
            const y = 25; // Adjust vertical position (in %)

            const textElement = document.createElement('div');
            textElement.className = 'textOverlay';
            textElement.textContent = name;
            textElement.style.left = `${x}%`;
            textElement.style.top = `${y}%`;
            textElement.style.fontSize = `${fontSize}px`;
            textElement.style.transform = 'rotate(270deg)';
            outputContainer.appendChild(textElement);
        }
    }

    // Show download link (Note: actual image download would require server-side processing)
    downloadLink.style.display = 'block';
}