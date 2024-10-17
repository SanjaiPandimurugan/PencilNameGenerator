const nameInput = document.getElementById('nameInput');
const xCoordinate = document.getElementById('xCoordinate');
const yCoordinate = document.getElementById('yCoordinate');
const generateBtn = document.getElementById('generateBtn');
const outputContainer = document.getElementById('outputContainer');
const outputImage = document.getElementById('outputImage');
const downloadLink = document.getElementById('downloadLink');
const downloadTextLink = document.getElementById('downloadTextLink');

generateBtn.addEventListener('click', () => {
    generateImage();
    updateDownloadLinks();
});

// Add event listeners for increment and decrement buttons
document.querySelectorAll('.increment, .decrement').forEach(button => {
    button.addEventListener('click', (e) => {
        const target = document.getElementById(e.target.dataset.target);
        const step = parseFloat(target.step) || 1;
        if (e.target.classList.contains('increment')) {
            target.value = (parseFloat(target.value) + step).toFixed(1);
        } else {
            target.value = (parseFloat(target.value) - step).toFixed(1);
        }
        generateImage();
        updateDownloadLinks();
    });
});

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

    const baseX = parseFloat(xCoordinate.value) || 10;
    const baseY = parseFloat(yCoordinate.value) || 25;

    for (let set = 0; set < sets; set++) {
        for (let pencil = 0; pencil < PerSet; pencil++) {
            const x = baseX + (set * (PerSet * (pencilWidth +  withinspace) + setspace)) + (pencil * (pencilWidth + withinspace));
            const y = baseY;

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
}

function generateTextOnlyImage() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match the original image
    canvas.width = outputImage.naturalWidth;
    canvas.height = outputImage.naturalHeight;
    
    // Set background to transparent
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw text overlays
    outputContainer.querySelectorAll('.textOverlay').forEach(textElement => {
        const rect = textElement.getBoundingClientRect();
        const containerRect = outputContainer.getBoundingClientRect();
        
        ctx.save();
        ctx.translate(rect.left - containerRect.left, rect.top - containerRect.top);
        ctx.rotate(-Math.PI / 2); // Rotate 270 degrees
        
        ctx.font = window.getComputedStyle(textElement).font;
        ctx.fillStyle = window.getComputedStyle(textElement).color;
        ctx.textBaseline = 'top';
        ctx.fillText(textElement.textContent, 0, 0);
        
        ctx.restore();
    });
    
    return canvas.toDataURL('image/png');
}

function updateDownloadLinks() {
    html2canvas(outputContainer).then(canvas => {
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.style.display = 'inline-block';
    });
    
    downloadTextLink.href = generateTextOnlyImage();
    downloadTextLink.style.display = 'inline-block';
}


downloadLink.addEventListener('click', () => {
    console.log('Image with background downloaded');
});

downloadTextLink.addEventListener('click', () => {
    console.log('Text-only image downloaded');
});