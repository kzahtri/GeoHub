document.addEventListener("DOMContentLoaded", async () => {
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const chatBox = document.getElementById("chat-box");

    // Function to append messages to the chat
    const appendMessage = (text, sender) => {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
    };

    // Function to call the chatbot API
    const callChatbotAPI = async (message) => {
        appendMessage(message, "user"); // Show user message

        try {
            const { Client } = await import("@gradio/client");
            const client = await Client.connect("kzahtri/Geo-Hub");

            // API Call
            const result = await client.predict("/chat", {
                message,
                max_tokens: 1,
                temperature: 0.1,
                top_p: 0.1,
            });

            appendMessage(result.data, "bot"); // Show bot response
        } catch (error) {
            console.error("Error calling chatbot API:", error);
            appendMessage("Sorry, I couldn't connect to the server.", "bot");
        }
    };

    // Send button event listener
    sendButton.addEventListener("click", () => {
        const message = userInput.value.trim();
        if (message) {
            callChatbotAPI(message);
            userInput.value = ""; // Clear input field
        }
    });

    // Enter key event listener
    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });
});
