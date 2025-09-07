// Mock database connection for edge runtime
export async function connectToDatabase() {
  // For edge runtime, we'll return a mock connection object
  // In a real implementation, you might want to use a different database client
  // that's compatible with the edge runtime, such as a REST API client
  console.warn('Database connection not available in edge runtime');
  return {
    connection: {
      readyState: 0,
    },
  };
}

// Export a mock mongoose object
export const mongoose = {
  connection: {
    readyState: 0,
  },
};

export default mongoose;