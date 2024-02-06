// Replace this with your Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const messagesRef = database.ref('messages');

const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const messagesList = document.getElementById('messagesList');

// Event listener for form submission
messageForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const messageText = messageInput.value;

    if (messageText.trim() !== '') {
        messagesRef.push({
            text: messageText,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        messageInput.value = '';
    }
});

// Event listener for new messages
messagesRef.on('child_added', function (snapshot) {
    const message = snapshot.val();
    const li = document.createElement('li');
    li.innerText = `${message.text} (Timestamp: ${new Date(message.timestamp).toLocaleString()})`;
    messagesList.appendChild(li);
});
