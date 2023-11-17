// New (i.e., OpenAI NodeJS SDK v4)
import OpenAI from "openai";

export const configureOpenAi = () => {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
    organization: process.env.OPEN_AI_ORG_ID,
  });
  return openai;
};
