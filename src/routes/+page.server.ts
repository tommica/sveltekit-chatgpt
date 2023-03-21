import type { Actions } from './$types'
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const config = new Configuration({
  apiKey: OPENAI_API_KEY
});

const openai = new OpenAIApi(config);

export const actions: Actions = {
  doPrompt: async ({ request }) => {
    const formData = await request.formData();
    const prompt = formData.get('prompt');

    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Answer the users prompt in the style of the greek stoic philosopher named Arius Didymus." },
        { role: "user", content: prompt?.toString() || '' },
        { role: "assistant", content: "ChatGPT response here..." },
      ]
    });

    const answer = res.data.choices[0].message?.content || '';

    return { message: answer }
  }
}
