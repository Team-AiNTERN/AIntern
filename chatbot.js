// Toggle Chat Visibility
function toggleChat() {
  const chatWindow = document.getElementById("chatbot-window");
  const icon = document.getElementById("chatbot-icon");

  const isHidden = chatWindow.style.display === "none" || chatWindow.style.display === "";
  chatWindow.style.display = isHidden ? "flex" : "none";
  icon.style.display = isHidden ? "none" : "block";

  if (isHidden) {
    document.getElementById("chatbot-input").focus();
  }
}

// Handle Enter Key
function handleKey(event) {
  if (event.key === "Enter") sendMessage();
}

// Send Message
function sendMessage() {
  const input = document.getElementById("chatbot-input");
  const msg = input.value.trim();
  if (!msg) return;

  addMessage(msg, "user");
  saveConversation();
  input.value = "";
  input.disabled = true;

  showTypingIndicator();

  setTimeout(() => {
    const reply = getBotReply(msg);
    hideTypingIndicator();
    addMessage(reply, "bot");
    saveConversation();
    input.disabled = false;
    input.focus();
  }, 700);
}

// Add Message to Chat
function addMessage(text, sender) {
  const container = document.getElementById("chatbot-messages");
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.setAttribute("role", "text");
  div.innerText = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// Typing Indicator
function showTypingIndicator() {
  const container = document.getElementById("chatbot-messages");
  const typing = document.createElement("div");
  typing.id = "typing-indicator";
  typing.className = "message bot";
  typing.innerText = "Typing...";
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;
}

function hideTypingIndicator() {
  const typing = document.getElementById("typing-indicator");
  if (typing) typing.remove();
}

// Bot Reply Logic
function getBotReply(input) {
  input = input.toLowerCase();

  const responses = [
    { keywords: ["internship"], reply: "You can explore internships in the 'Find Internships' page." },
    { keywords: ["application"], reply: "Check your application status under 'My Applications'." },
    { keywords: ["skill"], reply: "Visit 'Skill Insights' to see your skill progress." },
    { keywords: ["profile"], reply: "You can update details in your 'Profile' page." },
    { keywords: ["setting"], reply: "Go to 'Settings' to change your preferences." },
    { keywords: ["pm scheme"], reply: "The PM Internship Scheme connects students with government internships easily." },
    { keywords: ["hello", "hi"], reply: "Hello 👋! I’m AiNTERN Assistant. How can I help you today?" },
    { keywords: ["bye"], reply: "Goodbye 👋! Come back anytime." }
  ];

  for (const { keywords, reply } of responses) {
    if (keywords.some(k => input.includes(k))) return reply;
  }

  return "I’m not sure about that 🤔. Try asking about internships, applications, skills, or profile!";
}

// Save & Load Conversation
function saveConversation() {
  const chatMessages = document.getElementById("chatbot-messages").innerHTML;
  localStorage.setItem("chatHistory", chatMessages);
}

function loadConversation() {
  const chatMessages = localStorage.getItem("chatHistory");
  if (chatMessages) {
    document.getElementById("chatbot-messages").innerHTML = chatMessages;
  }
}

// Greeting on Load
window.addEventListener("load", () => {
  loadConversation();

  const name = localStorage.getItem("username") || "Student";
  if (!localStorage.getItem("chatHistory")) {
    addMessage(`Welcome back, ${name}! 👋 I’m AiNTERN Assistant. How can I help you today?`, "bot");
    saveConversation();
  }

  document.getElementById("chatbot-input").addEventListener("keydown", handleKey);
});
