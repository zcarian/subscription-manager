import openai from "../../utils/openai";

export default async function handler(req, res) {
    const prompt = req.body.prompt;
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 64,
    });

    res.status(200).json(completion.data);
}

