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

export async function sendPasswordChangeNotification(
  to: string,
  name: string | undefined,
) {
  try {
    const api = new SibApiV3Sdk.TransactionalEmailsApi();

    await api.sendTransacEmail({
      to: [{ email: to, name }],
      subject: "Confirmation de changement de mot de passe 🔒",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Confirmation de changement de mot de passe</h2>
          <p>Bonjour ${name},</p>
          <p>Nous vous confirmons que votre mot de passe a été modifié avec succès le ${new Date().toLocaleString("fr-FR")}.</p>
          <p>Si vous n'êtes pas à l'origine de ce changement, veuillez contacter immédiatement notre support.</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Cet email a été envoyé automatiquement, merci de ne pas y répondre.
          </p>
        </div>
      `,
      sender: {
        name: "Flowee",
        email: "appflowee@gmail.com",
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi du mail de notification :", error);
    throw error;
  }
}
