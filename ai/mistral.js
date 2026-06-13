import { Mistral } from "@mistralai/mistralai";

export async function askMistral(question) {

try {

const client = new Mistral({
apiKey:
process.env.MISTRAL_API_KEY
});

const response =
await client.chat.complete({

model:
"mistral-small-latest",

messages: [

{
role: "system",
content:
`Tu es l'assistant officiel de Nexoria RP.

RÈGLES ABSOLUES :

- Tu réponds uniquement aux questions concernant Nexoria RP.
- Tu ne cites jamais d'autre serveur.
- Tu ne fais jamais de publicité.
- Tu n'inventes jamais d'informations.
- Si tu ne connais pas la réponse :

"Je ne dispose pas de cette information. Merci d'attendre un membre du staff."

- Les candidatures sont gérées automatiquement par le bot.
- Ne réponds jamais aux demandes de candidature.`
},

{
role: "user",
content: question
}

]

});

return response
.choices[0]
.message
.content;

} catch (error) {

console.error(error);

return "❌ Une erreur est survenue avec l'assistant.";

}

}

                                                    