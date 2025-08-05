// Debug the chatbot in the browser console
console.log('🔍 Debugging Chatbot...');

// Check if the chatbot button exists
const chatButton = document.querySelector('[data-testid="chat-button"]');
console.log('Chat button found:', !!chatButton);

// Check for any chatbot elements
const chatElements = document.querySelectorAll('[class*="chatbot"], [class*="chat"]');
console.log('Chat elements found:', chatElements.length);

// Check for the floating button
const floatingButtons = document.querySelectorAll('.fixed.bottom-8.right-8');
console.log('Floating buttons found:', floatingButtons.length);

// Check for any error messages in console
console.log('Check the Network tab for any failed API calls to /api/portfolio-chat');

// Manual test function
window.testChatAPI = async function(message = 'Hi') {
  console.log('🧪 Testing chat API with:', message);
  try {
    const response = await fetch('/api/portfolio-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message }]
      })
    });
    
    const data = await response.json();
    console.log('✅ API Response:', data);
    return data;
  } catch (error) {
    console.error('❌ API Error:', error);
  }
};

console.log('💡 Run window.testChatAPI("Hello") to test the API manually');
