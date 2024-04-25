// Import QrScanner class from qr-scanner module
import QrScanner from "../node_modules/qr-scanner/qr-scanner.min.js";

// Request camera access
navigator.mediaDevices.getUserMedia({video: true})
    .then(function (stream) {
        const video = document.getElementById('qr-video');
        video.srcObject = stream;
    })
    .catch(function (error) {
        console.error('Error accessing camera:', error);
        alert('Failed to access camera. Please grant permission to use your camera.');
    });

// Initialize QR Scanner
const qrScanner = new QrScanner(document.getElementById('qr-video'), result => {
    console.log('Scanned QR code:', result);

    const id = extractAndValidateUUID(result)

    if (id !== null) {
        console.log('Valid ID:', id);

        // Retrieve existing IDs from local storage
        let storedIDs = JSON.parse(localStorage.getItem('ids')) || [];

        // Check if ID is present in the list of stored IDs
        if (!storedIDs.includes(id)) {
            storedIDs.push(id);
            localStorage.setItem('ids', JSON.stringify(storedIDs));
        }

        window.location.href = `explanation.html?id=${id}`;
    } else {
        console.log('Invalid or missing ID.');
        alert('Failed to detect the object.');
    }
});

// Start scanning
qrScanner.start();

function extractAndValidateUUID(url) {
    // Regular expression to match UUID version 4
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    // Extract ID from URL
    const urlParams = new URL(url);
    const id = urlParams.searchParams.get('id');

    // Check if ID is a valid UUID version 4
    if (id && uuidRegex.test(id)) {
        return id;
    } else {
        return null; // ID is either missing or not a valid UUID version 4
    }
}