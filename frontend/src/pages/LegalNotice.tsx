// src/components/LegalNotice.tsx

import Button from "@components/atoms/Button";
import LogoIcon from "@components/atoms/Icons/Logo";

export default function LegalNotice() {
  return (
    <div className="flex flex-col">
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
      <div className="flex flex-col gap-8 p-20 mx-auto py-8">
        <h1 className="text-3xl md:block font-bold text-left underline">
          LEGAL NOTICE
        </h1>
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Publisher Information</h2>
          <ul>
            <li>
              <strong>Site name:</strong> Flowee
            </li>
            <li>
              <strong>Owner:</strong> Flowee
            </li>
            <li>
              <strong>Address:</strong> Somewhere in the world
            </li>
            <li>
              <strong>Phone:</strong> +33 6 06 06 06 06
            </li>
            <li>
              <strong>Email:</strong> app.flowee@gmail.com
            </li>
            <li>
              <strong>Company registration number:</strong> [Company
              registration/SIREN/SIRET number]
            </li>
            <li>
              <strong>Publication director:</strong> Flowee Team
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Hosting Provider</h2>
          <ul>
            <li>
              <strong>Name:</strong> Flowee VPS
            </li>
            <li>
              <strong>Address:</strong> [Hosting provider’s address]
            </li>
            <li>
              <strong>Phone:</strong> [Hosting provider’s phone]
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Intellectual Property</h2>
          <p>
            The content of this website (texts, images, graphics, logo, etc.) is
            protected by copyright. Any reproduction, distribution, or use
            without written permission from Flowee is strictly prohibited.
          </p>
        </section>

        <section className="flex flex-col gap-4" s>
          <h2 className="text-xl font-bold">Contact</h2>
          <p>
            For any questions, please contact:{" "}
            <a href="mailto:appflowee@gmail.com">appflowee@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
