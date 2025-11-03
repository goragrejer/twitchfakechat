// Get references to the HTML elements
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const chatMessages = document.getElementById('chat-messages');

// A list of predefined colors for usernames
const colors = [
    '#FF4500', '#DA70D6', '#1E90FF', '#FFD700', '#32CD32',
    '#00FF7F', '#FF69B4', '#00BFFF', '#ADFF2F', '#FF00FF'
];

/**
 * Gets a consistent color for a username based on a simple hash.
 * This ensures a user always has the same color.
 * @param {string} username - The username string.
 * @returns {string} A color from the `colors` array.
 */
function getColorForUsername(username) {
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Get an index from the hash
    const index = Math.abs(hash % colors.length);
    return colors[index];
}

/**
 * Creates and appends a new message element to the chat.
 * @param {string} username - The name of the user.
 * 'system' for bot/info messages.
 * @param {string} text - The message content.
 */
function addMessage(username, text) {
    // Create the main message container
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    // Create the username span
    const usernameElement = document.createElement('span');
    usernameElement.classList.add('username');
    usernameElement.textContent = username;
    usernameElement.style.color = getColorForUsername(username);
    
    // Create the message text span
    const textElement = document.createElement('span');
    textElement.classList.add('message-text');
    textElement.textContent = `: ${text}`; // Add colon separator

    // Append elements
    messageElement.appendChild(usernameElement);
    messageElement.appendChild(textElement);
    chatMessages.appendChild(messageElement);

    // Auto-scroll to the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add a submit event listener to the form
chatForm.addEventListener('submit', function(event) {
    // Prevent the form from reloading the page
    event.preventDefault();

    // Get the message text from the input, trimming whitespace
    const messageText = messageInput.value.trim();

    // If the message isn't empty, add it to the chat
    if (messageText) {
        // Use "You" as the username for messages you send
        addMessage('You', messageText);
        
        // Clear the input field
        messageInput.value = '';
    }
});

// --- SIMULATION ---
// Add some fake messages to make the chat feel alive on load

setTimeout(() => {
    addMessage('StreamBot', 'Welcome to the chat! Remember to be kind.');
}, 1000);

setTimeout(() => {
    addMessage('CoolUser123', 'Hey everyone! This stream is awesome!');
}, 2500);

setTimeout(() => {
    addMessage('GamerPro', 'What game is next?');
}, 4000);
