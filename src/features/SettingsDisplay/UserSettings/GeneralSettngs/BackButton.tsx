type Props = {
  setShowSidebar: (value: boolean) => void;
};
export default function BackButton({ setShowSidebar }: Props) {
  function handleBackToSettings() {
    setShowSidebar(true);
  }

  return (
    <div className="absolute top-5 left-7 lg:hidden">
      <span onClick={handleBackToSettings} className="text-2xl">
        {/* @ts-expect-error  Typescript ne propaznaje iconu kao validan jsx element*/}
        <ion-icon name="arrow-back-outline"></ion-icon>
      </span>
    </div>
  );
}
