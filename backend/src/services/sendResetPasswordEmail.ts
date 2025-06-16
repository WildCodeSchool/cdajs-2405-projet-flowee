import SibApiV3Sdk from "sib-api-v3-sdk";

export async function sendResetPasswordEmail(
  to: string,
  name: string,
  token: string
) {
  const api = new SibApiV3Sdk.TransactionalEmailsApi();
  await api.sendTransacEmail({
    to: [{ email: to, name }],
    subject: "Reset your Flowee password",
    htmlContent: `
      <p>Hello ${name},</p>
      <p>Click the button below to reset your password. This link is valid for 30 minutes.</p>
      <a href="https://staging.052024-jaune-3.wns.wilders.dev/forgot-password?token=${token}">Reset password</a> 
    `, //need change for prod
    sender: {
      name: "Flowee",
      email: "appflowee@gmail.com",
    },
  });
}
