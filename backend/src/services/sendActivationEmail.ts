import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

export async function sendActivationEmail(
  to: string,
  name: string | undefined,
  token: string,
) {
  try {
    const api = new SibApiV3Sdk.TransactionalEmailsApi();

    await api.sendTransacEmail({
      to: [{ email: to, name }],
      subject: "Active ton compte Flowee ✨",
      htmlContent: `
        <p>Bonjour ${name},</p>
        <p>Bienvenue sur Flowee ! Clique ci-dessous pour activer ton compte :</p>
        <a href="https://staging.052024-jaune-3.wns.wilders.dev/activate?token=${token}">Activer mon compte</a>
        <p>Ce lien est valable pendant 24h.</p>
      `,
      sender: {
        name: "Flowee",
        email: "appflowee@gmail.com",
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi du mail d'activation :", error);
    throw error;
  }
}
