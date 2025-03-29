type Props = {
  setShowFilters: (value: boolean) => void;
};

export default function FilterButton({ setShowFilters }: Props) {
  // mora prvo da mu skinem hidden pa onda neka ide absolute sa top-0 left-0

  function showFilters() {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    setShowFilters(true);
  }

  return (
    <div
      onClick={showFilters}
      className="flex items-center justify-between px-4 lg:hidden"
    >
      <span>Filters</span>
      <span className="flex items-center justify-center">
        {/* @ts-expect-error  Typescript doesn't recognize icon as valid jsx element*/}
        <ion-icon name="chevron-down-outline"></ion-icon>
      </span>
    </div>
  );
}
