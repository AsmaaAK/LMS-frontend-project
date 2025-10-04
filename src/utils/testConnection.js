// Simple test connection utility
export async function testConnection() {
  try {
    // Simulate a connection test
    await new Promise(resolve => setTimeout(resolve, 100))
    return true
  } catch (error) {
    console.error('Connection test failed:', error)
    return false
  }
}