import Button from "@components/atoms/Button";
import LogoIcon from "@components/atoms/Icons/Logo";

function TermsAndConditions() {
  return (
    <div className="flex flex-col ">
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
      <div className="flex flex-col gap-10  max-w-5xl  px-20 py-8">
        <h1 className="text-3xl md:block font-bold text-left underline">
          Terms of Use
        </h1>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">1. Purpose</h2>
          <p>
            These Terms of Use define the rules for using the Flowee platform.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">2. Access to the Service</h2>
          <p>
            Access to Flowee requires creating an account. You agree to provide
            accurate information and to keep it up to date.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">3. Use of the Service</h2>
          <ul>
            <li>
              You agree to use Flowee in compliance with the law and the rights
              of others.
            </li>
            <li>
              It is forbidden to:
              <ul>
                <li>Share illegal, offensive, or harmful content</li>
                <li>Attempt unauthorized access to IT systems</li>
                <li>Disrupt the proper functioning of the platform</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">4. Intellectual Property</h2>
          <p>
            The content of Flowee (texts, images, code, logo, etc.) remains the
            exclusive property of the publisher.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">5. Liability</h2>
          <p>
            The publisher cannot be held responsible for service interruptions
            or indirect damages related to the use of the platform.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">6. Account Termination</h2>
          <p>
            In case of non-compliance with these Terms of Use, Flowee reserves
            the right to suspend or delete your account without notice.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">7. Changes to the Terms</h2>
          <p>
            Flowee may modify these Terms of Use at any time. Users will be
            notified of changes by email or via the platform.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">8. Contact</h2>
          <p>
            For any questions regarding these Terms, please contact us at{" "}
            <a href="mailto:appflowee@gmail.com">appflowee@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}

export default TermsAndConditions;
