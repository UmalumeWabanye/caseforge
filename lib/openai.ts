// OpenAI API client configuration

const openai = require('openai');

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openaiClient = new openai.OpenAIApi(configuration);

module.exports = openaiClient;
