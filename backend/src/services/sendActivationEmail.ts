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
      subject: "Activate your Flowee account ✨",
      htmlContent: `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2 style="color: #D16565;">Welcome to Flowee, ${name}!</h2>
      <p>Thank you for signing up 🥳</p>
      <p>
        To complete your account creation, please click the button below:
      </p>
      <p style="text-align: center; margin: 32px 0;">
        <a
          href="https://staging.052024-jaune-3.wns.wilders.dev/activate?token=${token}"
          style="
            display: inline-block;
            padding: 12px 28px;
            background-color: #D16565;
            color: #fff;
            border-radius: 8px;
            text-decoration: none;
            font-size: 1.1em;
          "
        >Activate my account</a>
      </p>
      <p style="font-size: 0.98em; color: #555;">
        This link is valid for 24 hours.
      </p>
      <hr style="border: none; border-top: 1px solid #f2f2f2; margin: 32px 0;" />
      <p style="font-size: 0.92em; color: #888; text-align: center;">
        By creating an account, you accept our
        <a href="https://staging.052024-jaune-3.wns.wilders.dev/terms-and-conditions" style="color: #E19251;">Terms of Use</a>
        and can consult our
        <a href="https://staging.052024-jaune-3.wns.wilders.dev/legal-notice" style="color: #E19251;">Legal Notice</a>.
      </p>
      <p style="font-size: 0.86em; color: #aaa; text-align: center; margin-top: 16px;">
        Flowee – Project management app.<br/>
        For any questions, contact us at: <a href="mailto:appflowee@gmail.com" style="color: #D16565;">appflowee@gmail.com</a>
      </p>
    </div>
  `,
      sender: {
        name: "Flowee",
        email: "appflowee@gmail.com",
      },
    });
  } catch (error) {
    console.error("Unable to send the activation email :", error);
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
