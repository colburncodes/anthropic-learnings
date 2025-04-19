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

/**
 * Translates content for the specified country and locales.
 *
 * @function translateLocales
 * @param {string} country - The country for which translations are being generated.
 * @param {Array<string>} locales - An array of locale codes (e.g., ['en', 'es', 'fr']).
 * @param {string} targetLocale - The specific locale for which the translation is required.
 * @returns {string} The translated content for the given country and locale.
 *
 * @description
 * This function generates translations for the given country and locales by sending
 * a request to the Anthropic API. If the target locale is found, the function immediately
 * returns the translation, avoiding unnecessary iterations.
 */
async function translateLocales(country, locales, targetLocale) {
    for (const locale of locales) {
      if (locale === targetLocale) {
        // Generate a translation prompt specific to the country and locale
        const prompt = `Translate the following message to ${locale} for the country ${country}: "Hello, Claude"`;
  
        const response = await anthropic.messages.create({
          model: "claude-3-7-sonnet-20250219",
          max_tokens: 1024,
          messages: [{ role: "user", content: prompt }],
        });
        return response.content[0].text;
      }
    }
  
    // Return a default message if the target locale is not found
    return `No translation found for locale: ${targetLocale}`;
  }
  
  // Define the locales, country, and target locale for translation
  const locales = ['en', 'es', 'fr', 'de', 'it'];
  const country = 'FR';
  const targetLocale = 'fr';
  
  // Generate the translation and log the result
  const translation = await translateLocales(country, locales, targetLocale);
  console.log(translation);
