#!/usr/bin/env node

/**
 * Socket.IO Connectivity Test for Axon ↔ Quantum-Brain
 * Tests real-time communication through the Universal Adapter
 */

const { io } = require('socket.io-client');

const BACKEND_URL = process.env.NEXT_PUBLIC_PY_BACKEND_URL || 'http://localhost:5000';
const FRONTEND_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

console.log('🔌 Testing Socket.IO connectivity...');
console.log(`Backend: ${BACKEND_URL}`);
console.log(`Frontend: ${FRONTEND_URL}`);

// Test direct connection to Python backend
const directSocket = io(BACKEND_URL, {
  transports: ['websocket', 'polling']
});

directSocket.on('connect', () => {
  console.log('✅ Direct connection to Python backend successful');
  console.log(`Socket ID: ${directSocket.id}`);
  
  // Test sending a message
  directSocket.emit('user_message', {
    message: 'Hello from Axon test script',
    timestamp: new Date().toISOString()
  });
});

directSocket.on('ai_response', (data) => {
  console.log('📨 Received AI response:', data);
});

directSocket.on('task_update', (data) => {
  console.log('📋 Task update:', data);
});

directSocket.on('connect_error', (error) => {
  console.log('❌ Connection error:', error.message);
});

directSocket.on('disconnect', (reason) => {
  console.log('🔌 Disconnected:', reason);
});

// Auto-disconnect after 10 seconds
setTimeout(() => {
  console.log('🏁 Test complete, disconnecting...');
  directSocket.disconnect();
  process.exit(0);
}, 10000);

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n👋 Terminating test...');
  directSocket.disconnect();
  process.exit(0);
});
