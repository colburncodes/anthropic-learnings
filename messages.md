# Working with messages

## Learning goals
- Understand the messages API format
- Work with and understand model response
- Build a simple multi-turn chatbot

## Messages
The Messages API can be used for either single queries or stateless multi-turn conversations.

## Basic setup
We'll start by importing the packages we need and interact with Anthropic API
```javascript
import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config'

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY, 
});

console.log(anthropic)
```

## Messages format
We can use `anthropic.messages.create()` to send a message to Claude and get a response: 
```javascript
const msg = await anthropic.messages.create({
  model: "claude-3-7-sonnet-20250219",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, Claude" }],
});
console.log(msg.content[0].text);
```

## Exercise
Write a function called translateLocales that expects three arguments:
- country `string`
- locales `Array<string>`
- targetLocale `string`

When you call the `translateLocales` function, it should return the of asking Claude the 
translated result.

```javascript
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
  
  const locales = ['en', 'es', 'fr', 'de', 'it'];
  const country = 'FR';
  const targetLocale = 'fr';
  
  // Generate the translation and log the result
  const translation = await translateLocales(country, locales, targetLocale);
  console.log(translation);
```