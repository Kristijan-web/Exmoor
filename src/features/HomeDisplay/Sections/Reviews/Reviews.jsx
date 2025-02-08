export default function Reviews() {
  return (
    <section>
      <div className="mb-10 grid grid-cols-12">
        <div className="bg-first-review col-start-1 col-end-4 flex h-24 items-center justify-center">
          <h3 className="text-8xl">Reviews</h3>
        </div>
        <div className="bg-second-review col-start-4 col-end-8 h-24"></div>
        <div className="bg-main-color-shade col-start-8 col-end-13 h-24"></div>
      </div>
      {/* ovo ispod su kartice za reviewers */}
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
}
