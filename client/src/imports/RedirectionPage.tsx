function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[26.5px] not-italic text-[16px] text-center text-white top-[-0.6px]">Dashboard</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#2b7fff] content-stretch flex flex-col h-[49.6px] items-start left-[1006px] pt-[12.8px] px-[32px] rounded-[8px] top-[511px] w-[116.625px]" data-name="Button">
      <Paragraph />
    </div>
  );
}

export default function RedirectionPage() {
  return (
    <div className="bg-[#0f1319] relative size-full" data-name="Redirection Page">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Arimo:Regular',sans-serif] font-normal justify-center leading-[0] left-[307px] text-[#2b7fff] text-[40px] text-center top-[203px] whitespace-nowrap">
        <p className="leading-[48px]">Now Redirecting you....</p>
      </div>
      <Button />
    </div>
  );
}