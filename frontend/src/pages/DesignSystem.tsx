export default function DesignSystem() {
  //want to link icons
  //want to link colors
  //want to link typography
  //want to link buttons
  //want to link inputs
  //want to link cards
  //want to link modals
  //want to link forms
  return (
    <div className="flex flex-col gap-4 p-4 bg-[#e9bc8e8a] h-full ">
      <h1 className="font-semibold text-h1 p-4">Design System</h1>

      <section className="flex flex-col rounded-2xl w-[500px] bg-[#ffffff] shadow-xl p-4">
        <h1 className="font-bold text-h1">Heading 01</h1>
        <p>Titre de page, il ne doit y en avoir qu'un par page.</p>
        <hr className="my-2" />
        <h2 className="font-semibold text-h2">Heading 02</h2>
        <p>
          Titre de page, celui qu'il faut utiliser quand il y a plusieurs grands
          titres.
        </p>
        <hr className="my-4" />
        <h3 className="font-bold text-h3">Heading 03</h3>
        <p>Sous-titres </p>
        <hr className="my-4" />
        <label className="font-semibold text-label">Labels</label>
        <p>Format à utiliser pour les labels des formulaires</p>
        <hr className="my-4" />

        <p className="text-p">Paragraphs</p>
        <p>Texte normal</p>
      </section>
      <section className="flex flex-col rounded-2xl w-[500px] bg-[#ffffff] shadow-xl p-4">
        {/**buttons */}
      </section>
      {/* <h2>Colors</h2>
      <h3>Oranges</h3>
      <h2>Icons</h2>

      <h2>Buttons</h2>
      <h2>Inputs</h2>
      <h2>Cards</h2>
      <h2>Modals</h2>
      <h2>Forms</h2> */}
    </div>
  );
}
