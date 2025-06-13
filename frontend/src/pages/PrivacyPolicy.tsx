// src/components/LegalNotice.tsx

import Button from "@components/atoms/Button";
import LogoIcon from "@components/atoms/Icons/Logo";

const sections = [
  {
    title: "1. Introduction",
    content:
      "This privacy policy informs users of the Flowee platform about how their personal data is collected, used, and protected, in accordance with the General Data Protection Regulation (GDPR).",
  },
  {
    title: "2. Data Controller",
    content: (
      <>
        The data controller is:
        <ul>
          <li>
            <strong>Flowee</strong>
          </li>
          <li>Somewhere</li>
          <li>
            Email:{" "}
            <a href="mailto:app.flowee@gmail.com">app.flowee@gmail.com</a>
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Data Collected",
    content: (
      <>
        We only collect data strictly necessary for the operation of Flowee,
        including:
        <ul className="list-disc pl-8">
          <li>
            Identification data (first name, last name, email address, hashed
            password)
          </li>
          <li>
            Connection data (IP address, access logs for security and
            traceability)
          </li>
          <li>
            Activity data on the platform (projects, clients, actions performed)
          </li>
          <li>
            Cookies (technical cookies required for proper functioning, and, if
            applicable, analytics cookies with your consent)
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Purpose of Data Collection",
    content: (
      <>
        Personal data is processed exclusively for the following purposes:
        <ul className="list-disc pl-8">
          <li>Account creation and management</li>
          <li>Project and client management and tracking</li>
          <li>Security (access control, logs)</li>
          <li>
            Transactional communications (account activation, notifications)
          </li>
          <li>Improving the service (anonymous statistics)</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Legal Basis",
    content: (
      <>
        Data processing is based on:
        <ul className="list-disc pl-8">
          <li>
            The performance of the contract (providing the platform and its
            services)
          </li>
          <li>
            The legitimate interest of Flowee (platform security, improvement)
          </li>
          <li>User consent (for cookies or optional communications)</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Data Recipients",
    content: (
      <>
        Your data is only accessible to:
        <ul className="list-disc pl-8">
          <li>
            The Flowee team, responsible for platform operation and support
          </li>
          <li>
            Subcontractors compliant with the GDPR (hosting provider, email
            service provider)
          </li>
        </ul>
        Your data will never be sold or shared with third parties without your
        explicit consent.
      </>
    ),
  },
  {
    title: "7. Data Security",
    content: (
      <>
        We implement all necessary measures to protect your data:
        <ul className="list-disc pl-8">
          <li>Passwords are stored securely (hashed using argon2)</li>
          <li>
            Access to the platform is protected (JWT, roles, access control)
          </li>
          <li>
            Data is hosted on secure servers ([hosting provider], located in
            Europe)
          </li>
          <li>Access to the database is restricted and logged</li>
        </ul>
      </>
    ),
  },
  {
    title: "8. User Rights",
    content: (
      <>
        In accordance with the GDPR, you have the following rights:
        <ul>
          <li>
            <strong>Access:</strong> You can obtain information about your
            personal data at any time.
          </li>
          <li>
            <strong>Rectification:</strong> You can request corrections to your
            data if it is inaccurate.
          </li>
          <li>
            <strong>Erasure (“right to be forgotten”):</strong> You can request
            the deletion of your data.
          </li>
          <li>
            <strong>Portability:</strong> You can obtain a copy of your data in
            a structured, commonly used format.
          </li>
          <li>
            <strong>Objection and restriction:</strong> You can object to
            certain types of processing or request the limitation of processing.
          </li>
        </ul>
        To exercise your rights, contact:{" "}
        <a href="mailto:[your@email.com]">[your@email.com]</a>.<br />
        Requests are processed within 30 days.
      </>
    ),
  },
  {
    title: "9. Data Retention Period",
    content:
      "Data is retained as long as your account is active. If you request deletion, your data will be deleted within 30 days. Technical logs are kept for a maximum of 12 months for security reasons.",
  },
  {
    title: "10. Cookies",
    content:
      "Flowee uses technical cookies necessary for its operation. Analytics or marketing cookies may be used with your consent. You can configure your browser to block or delete cookies.",
  },
  {
    title: "11. Subcontractors and Data Transfers",
    content:
      "We use subcontractors (such as [hosting provider], [email service provider]) that are GDPR-compliant. Your data is not transferred outside the European Economic Area unless adequate safeguards are in place.",
  },
  {
    title: "12. Changes to this Policy",
    content:
      "This policy may be updated. You will be notified of any significant changes via the platform or by email.",
  },
  {
    title: "13. Contact",
    content: (
      <>
        For any questions regarding the protection of your personal data, please
        contact: <a href="mailto:app.flowee@gmail.com">app.flowee@gmail.com</a>.
      </>
    ),
  },
];
export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col pb-20">
      <div className="flex flex-col  gap-4 h-full justify-center  items-center md:justify-between  px-6 md:px-0 md:pt-10 md:pb-0 py-10">
        <div className="flex w-full md:justify-between justify-center md:px-10 ">
          <div className="md:w-1/3 flex justify-center md:justify-start ">
            <LogoIcon className="md:w-40" />
          </div>

          {/* Right Side (Sign-in Button) */}
          <div className="hidden md:w-1/3 md:flex items-center justify-center md:justify-end">
            <Button
              label="Sign in"
              variant="OUTLINE"
              to="/login"
              className="bg-white border-black border rounded-lg px-12 py-2 text-base md:w-48  text-center"
            >
              Sign in
            </Button>
          </div>
        </div>

        {/* Content Section (Only Visible on Desktop) */}
        <section className=" md:flex   md:justify-start flex-col w-full ">
          <h1 className="text-3xl md:block font-bold md:px-10">
            Welcome to Flowee, <br /> the best project management tool.
          </h1>
          <p className="text-lg max-w-2xl mt-4 text-center md:text-left md:px-10">
            Keep your projects moving effortlessly. <br /> Smooth collaboration
            between teams and clients.
          </p>
        </section>

        {/* Mobile Buttons (Stacked) */}
        <aside className="flex flex-col items-center justify-center gap-3 w-3/5 md:hidden mt-6">
          <Button
            label="Sign in"
            to="/login"
            variant="OUTLINE"
            className="bg-white border-black border rounded-lg px-12 py-2 text-base w-full text-center"
          >
            Sign in
          </Button>
        </aside>
      </div>
      <div className="w-[80vw] border-t border-gray-300 mx-auto my-8" />
      <div className="flex flex-col gap-8 p-20  py-8">
        <h1 className="text-3xl md:block font-bold text-left underline">
          PRIVACY POLICY
        </h1>
      </div>
      <div className="flex flex-col gap-4 px-20">
        {sections.map(({ title, content }) => (
          <section key={title} className="">
            <h2 className="text-xl font-bold">{title}</h2>
            <div>{content}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
