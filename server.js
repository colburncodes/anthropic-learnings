import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config'

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY, 
});

/**
 * Sends a messages.create() to the Anthropic API and retrieves a response.
 *
 * @constant {Promise<Object>} msg - The response object from the Anthropic API.
 * @property {string} model - The model identifier used for the request (e.g., "claude-3-7-sonnet-20250219").
 * @property {number} max_tokens - The maximum number of tokens to generate in the response.
 * @property {Array<Object>} messages - An array of message objects to send to the model.
 * @property {string} messages[].role - The role of the message sender (e.g., "user").
 * @property {string} messages[].content - The content of the message sent to the model.
 *
 */
const msg = await anthropic.messages.create({
  model: "claude-3-7-sonnet-20250219",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, Claude" }],
});
console.log(msg.content[0].text);
