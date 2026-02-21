require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY
  apiKey: process.env.GITHUB_TOKEN,
  baseURL: "https://models.inference.ai.azure.com"
});

const config = {
  model: process.env.MODEL || 'gpt-4o-mini',
  temperature: parseFloat(process.env.TEMPERATURE) || 0.7,
  maxTokens: parseInt(process.env.MAX_TOKENS) || 500
};

module.exports = { openai, config };
module.exports.default = openai;
