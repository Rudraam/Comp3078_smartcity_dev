import svgPaths from "./svg-qwgn0kxhzg";

function Container1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[166.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#99a1af] text-[16px] top-[-2.2px]">⛅ Weather Conditions</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[100.675px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#99a1af] text-[16px] top-[-2.2px]">🌍 Air Quality</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex h-[24px] items-center justify-between left-[24px] top-[24px] w-[1040px]" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[60px] left-0 text-[60px] text-white top-[-6.4px]">24°C</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#99a1af] text-[16px] top-[-2.2px]">Feels like 26°</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[8px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[60px] left-0 text-[60px] text-white top-[-6.4px]">85</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#99a1af] text-[16px] top-[-2.2px]">Moderate</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#51a2ff] text-[14px] top-[-1.2px]">Air quality is acceptable</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[8px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Container8 />
      <Container9 />
      <Container10 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[124px] left-[24px] top-[72px] w-[1040px]" data-name="Container">
      <Container4 />
      <Container7 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p22bef200} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[36.325px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px]">Clouds</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[24px] relative shrink-0 w-[30.35px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2.2px]">40%</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[75.988px] items-center left-0 top-[24px] w-[325.325px]" data-name="Container">
      <Icon />
      <Container13 />
      <Container14 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p22bc2d80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pd3e8700} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p36f10600} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[27.975px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px]">Wind</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[24px] relative shrink-0 w-[58.663px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2.2px]">12 km/h</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[75.988px] items-center left-[357.33px] top-[24px] w-[325.337px]" data-name="Container">
      <Icon1 />
      <Container16 />
      <Container17 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p1d3f6c80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p37cfb400} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[48.4px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px]">Humidity</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[24px] relative shrink-0 w-[30.35px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2.2px]">65%</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[75.988px] items-center left-[714.66px] top-[24px] w-[325.325px]" data-name="Container">
      <Icon2 />
      <Container19 />
      <Container20 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute border-[#314158] border-solid border-t-[0.8px] h-[100.787px] left-[24px] top-[228px] w-[1040px]" data-name="Container">
      <Container12 />
      <Container15 />
      <Container18 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#99a1af] text-[12px] whitespace-pre-wrap">PM2.5</p>
    </div>
  );
}

function Container24() {
  return <div className="bg-[#2b7fff] h-[12px] rounded-[26843500px] shrink-0 w-full" data-name="Container" />;
}

function Container23() {
  return (
    <div className="bg-[#314158] h-[12px] relative rounded-[26843500px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pr-[416px] relative size-full">
        <Container24 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[35.987px] items-start left-[24px] top-[352.79px] w-[1040px]" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function WeatherWidget({ className }: { className?: string }) {
  return (
    <div className={className || "absolute bg-[#171c26] h-[412.775px] left-[32px] rounded-[10px] top-[267px] w-[1088px]"} data-name="WeatherWidget">
      <Container />
      <Container3 />
      <Container11 />
      <Container21 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M6.66667 1.66667V5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 1.66667V5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1da67b80} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 8.33333H17.5" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[24px] relative shrink-0 w-[123.075px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-white top-[-2.2px]">Upcoming Events</p>
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Menu">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Menu">
          <path d="M2 8H14M2 4H14M2 12H14" id="Icon" stroke="var(--stroke-0, #F5F5F5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1f2533] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[12px] relative rounded-[inherit]">
        <Menu />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#f5f5f5] text-[16px]">See All</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex gap-[8px] h-[52px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon3 />
      <Heading />
      <Button />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Arial:Regular',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#99a1af] text-[12px] whitespace-pre-wrap">Conference</p>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-white top-[-2.2px]">Google Devs 2025</p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-0 size-[14px] top-[3px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M4.66667 1.16667V3.5" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M9.33333 1.16667V3.5" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p24a2b500} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 5.83333H12.25" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Icon4 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[22px] not-italic text-[#99a1af] text-[14px] top-[-1.2px]">Dec 15</p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-0 size-[14px] top-[3px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1539e500} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p37b99980} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Icon5 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[22px] not-italic text-[#99a1af] text-[14px] top-[-1.2px]">Cecil Community Centre</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[44px] items-start relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Container27({ className }: { className?: string }) {
  return (
    <div className={className || "absolute bg-[#171c26] content-stretch flex flex-col gap-[8px] h-[136px] items-start left-0 pt-[16px] px-[16px] rounded-[10px] top-0 w-[308px]"} data-name="Container">
      <Container28 />
      <Heading1 />
      <Container29 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Arial:Regular',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#99a1af] text-[12px] whitespace-pre-wrap">Music</p>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-white top-[-2.2px]">Jazz Festival</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-0 size-[14px] top-[3px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M4.66667 1.16667V3.5" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M9.33333 1.16667V3.5" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p24a2b500} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 5.83333H12.25" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Icon6 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[22px] not-italic text-[#99a1af] text-[14px] top-[-1.2px]">Dec 18</p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-0 size-[14px] top-[3px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1539e500} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p37b99980} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Icon7 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[22px] not-italic text-[#99a1af] text-[14px] top-[-1.2px]">Sankofa Square</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[44px] items-start relative shrink-0 w-full" data-name="Container">
      <Container35 />
      <Container36 />
    </div>
  );
}

function Container32({ className }: { className?: string }) {
  return (
    <div className={className || "absolute bg-[#171c26] content-stretch flex flex-col gap-[8px] h-[136px] items-start left-[346px] pt-[16px] px-[16px] rounded-[10px] top-0 w-[308px]"} data-name="Container">
      <Container33 />
      <Heading2 />
      <Container34 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Arial:Regular',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#99a1af] text-[12px] whitespace-pre-wrap">Food</p>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-white top-[-2.2px]">Food Market</p>
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-0 size-[14px] top-[3px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M4.66667 1.16667V3.5" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M9.33333 1.16667V3.5" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p24a2b500} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 5.83333H12.25" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Icon8 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[22px] not-italic text-[#99a1af] text-[14px] top-[-1.2px]">Dec 20</p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-0 size-[14px] top-[3px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1539e500} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p37b99980} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Icon9 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[22px] not-italic text-[#99a1af] text-[14px] top-[-1.2px]">Nathan Phillips Square</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[44px] items-start relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Container41 />
    </div>
  );
}

function Container37({ className }: { className?: string }) {
  return (
    <div className={className || "absolute bg-[#171c26] content-stretch flex flex-col gap-[8px] h-[136px] items-start left-[692px] pt-[16px] px-[16px] rounded-[10px] top-0 w-[308px]"} data-name="Container">
      <Container38 />
      <Heading3 />
      <Container39 />
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Arrow right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 56">
        <g id="Arrow right">
          <path d={svgPaths.p3fe98080} id="Icon" stroke="var(--stroke-0, #F5F5F5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center justify-center left-[1002px] overflow-clip p-[12px] rounded-[8px] size-[80px] top-[32px]" data-name="Button">
      <ArrowRight />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[135.988px] relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Container32 />
      <Container37 />
      <Button1 />
    </div>
  );
}

function UpcomingEvents() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[206px] items-start left-[32px] top-[705px] w-[1088px]" data-name="UpcomingEvents">
      <Container25 />
      <Container26 />
    </div>
  );
}

function ImageWithFallback() {
  return <div className="bg-[#f3f4f6] h-[56px] shrink-0 w-full" data-name="ImageWithFallback" />;
}

function Container44() {
  return (
    <div className="bg-[#314158] relative rounded-[10px] shrink-0 size-[56px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ImageWithFallback />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2.2px]">Italian Bistro</p>
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-0 size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2_2402)" id="Icon">
          <path d={svgPaths.p111600} fill="var(--fill-0, #F0B100)" id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2_2402">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[20px] left-[20px] top-0 w-[18.138px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">4.5</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[20px] left-[46.14px] top-0 w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">•</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[20px] left-[59.83px] top-0 w-[37.425px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">Italian</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[20px] left-[105.25px] top-0 w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">•</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[20px] left-[118.94px] top-0 w-[15.1px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">$$</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Icon10 />
      <Text />
      <Text1 />
      <Text2 />
      <Text3 />
      <Text4 />
    </div>
  );
}

function Container45() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container46 />
        <Container47 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container43({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex gap-[16px] h-[80px] items-center relative shrink-0 w-full"} data-name="Container">
      <Container44 />
      <Container45 />
      <Icon11 />
    </div>
  );
}

function ImageWithFallback1() {
  return <div className="bg-[#f3f4f6] h-[56px] shrink-0 w-full" data-name="ImageWithFallback" />;
}

function Container49() {
  return (
    <div className="bg-[#314158] relative rounded-[10px] shrink-0 size-[56px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ImageWithFallback1 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2.2px]">Sushi Master</p>
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-0 size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2_2402)" id="Icon">
          <path d={svgPaths.p111600} fill="var(--fill-0, #F0B100)" id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2_2402">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[20px] left-[20px] top-0 w-[18.138px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">4.8</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute h-[20px] left-[46.14px] top-0 w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">•</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute h-[20px] left-[59.83px] top-0 w-[55.987px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">Japanese</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute h-[20px] left-[123.81px] top-0 w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">•</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute h-[20px] left-[137.5px] top-0 w-[22.65px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">$$$</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Icon12 />
      <Text5 />
      <Text6 />
      <Text7 />
      <Text8 />
      <Text9 />
    </div>
  );
}

function Container50() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container51 />
        <Container52 />
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container48({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex gap-[16px] h-[80px] items-center relative shrink-0 w-full"} data-name="Container">
      <Container49 />
      <Container50 />
      <Icon13 />
    </div>
  );
}

function ImageWithFallback2() {
  return <div className="bg-[#f3f4f6] h-[56px] shrink-0 w-full" data-name="ImageWithFallback" />;
}

function Container54() {
  return (
    <div className="bg-[#314158] relative rounded-[10px] shrink-0 size-[56px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ImageWithFallback2 />
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2.2px]">The Garden Cafe</p>
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-0 size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2_2402)" id="Icon">
          <path d={svgPaths.p111600} fill="var(--fill-0, #F0B100)" id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2_2402">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute h-[20px] left-[20px] top-0 w-[18.138px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">4.3</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute h-[20px] left-[46.14px] top-0 w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">•</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute h-[20px] left-[59.83px] top-0 w-[78.412px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">International</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute h-[20px] left-[146.24px] top-0 w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">•</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute h-[20px] left-[159.92px] top-0 w-[15.1px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">$$</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Icon14 />
      <Text10 />
      <Text11 />
      <Text12 />
      <Text13 />
      <Text14 />
    </div>
  );
}

function Container55() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container56 />
        <Container57 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container53({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex gap-[16px] h-[80px] items-center relative shrink-0 w-full"} data-name="Container">
      <Container54 />
      <Container55 />
      <Icon15 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[272px] items-start left-[24px] top-[108px] w-[484px]" data-name="Container">
      <Container43 />
      <Container48 />
      <Container53 />
    </div>
  );
}

function Menu1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Menu">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Menu">
          <path d="M2 8H14M2 4H14M2 12H14" id="Icon" stroke="var(--stroke-0, #F5F5F5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#1f2533] left-[408px] rounded-[8px] top-[22px]" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[12px] relative rounded-[inherit]">
        <Menu1 />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#f5f5f5] text-[16px]">See All</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[30px] w-[144px]" data-name="Container">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-white top-[-2.2px]">🍽️ Top Restaurants</p>
    </div>
  );
}

function RestaurantsList() {
  return (
    <div className="absolute bg-[#171c26] h-[380px] left-[32px] rounded-[10px] top-[954px] w-[532px]" data-name="RestaurantsList">
      <Container42 />
      <Button2 />
      <Container58 />
    </div>
  );
}

function Container59() {
  return <div className="absolute h-[24px] left-[24px] top-[24px] w-[182.363px]" data-name="Container" />;
}

function ImageWithFallback3() {
  return <div className="bg-[#f3f4f6] h-[56px] shrink-0 w-full" data-name="ImageWithFallback" />;
}

function Container62() {
  return (
    <div className="bg-[#314158] relative rounded-[10px] shrink-0 size-[56px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ImageWithFallback3 />
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2.2px]">Grand Plaza Hotel</p>
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-0 size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2_2402)" id="Icon">
          <path d={svgPaths.p111600} fill="var(--fill-0, #F0B100)" id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2_2402">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute h-[20px] left-[20px] top-0 w-[18.138px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">4.7</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute h-[20px] left-[46.14px] top-0 w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">•</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute h-[20px] left-[59.83px] top-0 w-[36.875px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">5-Star</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute h-[20px] left-[104.7px] top-0 w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">•</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute h-[20px] left-[118.39px] top-0 w-[22.65px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">$$$</p>
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Icon16 />
      <Text15 />
      <Text16 />
      <Text17 />
      <Text18 />
      <Text19 />
    </div>
  );
}

function Container63() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container64 />
        <Container65 />
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container61({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex gap-[16px] h-[80px] items-center relative shrink-0 w-full"} data-name="Container">
      <Container62 />
      <Container63 />
      <Icon17 />
    </div>
  );
}

function ImageWithFallback4() {
  return <div className="bg-[#f3f4f6] h-[56px] shrink-0 w-full" data-name="ImageWithFallback" />;
}

function Container67() {
  return (
    <div className="bg-[#314158] relative rounded-[10px] shrink-0 size-[56px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ImageWithFallback4 />
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2.2px]">Downtown Inn</p>
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute left-0 size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2_2402)" id="Icon">
          <path d={svgPaths.p111600} fill="var(--fill-0, #F0B100)" id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2_2402">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute h-[20px] left-[20px] top-0 w-[18.138px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">4.2</p>
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute h-[20px] left-[46.14px] top-0 w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">•</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute h-[20px] left-[59.83px] top-0 w-[36.875px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">3-Star</p>
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute h-[20px] left-[104.7px] top-0 w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">•</p>
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute h-[20px] left-[118.39px] top-0 w-[15.1px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">$$</p>
    </div>
  );
}

function Container70() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Icon18 />
      <Text20 />
      <Text21 />
      <Text22 />
      <Text23 />
      <Text24 />
    </div>
  );
}

function Container68() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container69 />
        <Container70 />
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container66({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex gap-[16px] h-[80px] items-center relative shrink-0 w-full"} data-name="Container">
      <Container67 />
      <Container68 />
      <Icon19 />
    </div>
  );
}

function ImageWithFallback5() {
  return <div className="bg-[#f3f4f6] h-[56px] shrink-0 w-full" data-name="ImageWithFallback" />;
}

function Container72() {
  return (
    <div className="bg-[#314158] relative rounded-[10px] shrink-0 size-[56px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <ImageWithFallback5 />
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2.2px]">City Center Lodge</p>
    </div>
  );
}

function Icon20() {
  return (
    <div className="absolute left-0 size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_2_2402)" id="Icon">
          <path d={svgPaths.p111600} fill="var(--fill-0, #F0B100)" id="Vector" stroke="var(--stroke-0, #F0B100)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_2_2402">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute h-[20px] left-[20px] top-0 w-[18.138px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">4.4</p>
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute h-[20px] left-[46.14px] top-0 w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">•</p>
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute h-[20px] left-[59.83px] top-0 w-[36.875px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">4-Star</p>
    </div>
  );
}

function Text28() {
  return (
    <div className="absolute h-[20px] left-[104.7px] top-0 w-[5.688px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">•</p>
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute h-[20px] left-[118.39px] top-0 w-[22.65px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-[-1.2px]">$$$</p>
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Icon20 />
      <Text25 />
      <Text26 />
      <Text27 />
      <Text28 />
      <Text29 />
    </div>
  );
}

function Container73() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container74 />
        <Container75 />
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container71({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex gap-[16px] h-[80px] items-center relative shrink-0 w-full"} data-name="Container">
      <Container72 />
      <Container73 />
      <Icon21 />
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[272px] items-start left-[24px] top-[108px] w-[484px]" data-name="Container">
      <Container61 />
      <Container66 />
      <Container71 />
    </div>
  );
}

function HotelsList() {
  return (
    <div className="absolute bg-[#171c26] h-[380px] left-[588px] rounded-[10px] top-[954px] w-[532px]" data-name="HotelsList">
      <Container59 />
      <Container60 />
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-[24px] not-italic text-[16px] text-white top-[30px] w-[223px] whitespace-pre-wrap">🏨 Recommended Hotels</p>
    </div>
  );
}

function Activity() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Activity">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Activity">
          <path d={svgPaths.p293937f0} id="Icon" stroke="var(--stroke-0, #F5F5F5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#0f1219] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[12px] relative rounded-[inherit]">
        <Activity />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#f5f5f5] text-[16px]">Dashboard</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Map() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Map">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2_2378)" id="Map">
          <path d={svgPaths.p4791a00} id="Icon" stroke="var(--stroke-0, #F5F5F5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_2_2378">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#1f2533] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[12px] relative rounded-[inherit]">
        <Map />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#f5f5f5] text-[16px]">Map</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function User() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="User">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="User">
          <path d={svgPaths.pea22800} id="Icon" stroke="var(--stroke-0, #F5F5F5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#1f2533] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[12px] relative rounded-[inherit]">
        <User />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#f5f5f5] text-[16px]">Profile</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Command() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Command">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Command">
          <path d={svgPaths.p320b8600} id="Icon" stroke="var(--stroke-0, #F5F5F5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#1f2533] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[12px] relative rounded-[inherit]">
        <Command />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#f5f5f5] text-[16px]">Ask Assistant</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Items() {
  return (
    <div className="absolute content-stretch flex gap-[48px] items-center justify-end right-[50px] top-[43px] w-[504px]" data-name="Items">
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function SmartCityDashboard({ className }: { className?: string }) {
  return (
    <div className={className || "absolute h-[123px] left-0 top-0 w-[444px]"} data-name="Smart City Dashboard">
      <div className="absolute flex flex-col font-['Arial_Rounded_MT_Bold:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[36px] text-black text-center">
        <p className="leading-[normal] whitespace-pre-wrap">Smart City Dashboard</p>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute bg-[#0065ff] h-[123px] left-0 overflow-clip right-0 top-0" data-name="Navigation">
      <Items />
      <SmartCityDashboard />
    </div>
  );
}

function Menu2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Menu">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Menu">
          <path d="M2 8H14M2 4H14M2 12H14" id="Icon" stroke="var(--stroke-0, #F5F5F5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-[#1f2533] left-[996px] rounded-[8px] top-[980px]" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[12px] relative rounded-[inherit]">
        <Menu2 />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-none not-italic relative shrink-0 text-[#f5f5f5] text-[16px]">See All</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Content() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px mr-[-16px] relative" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[20px] relative size-full">
          <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#fef7ff] text-[16px] tracking-[0.5px] whitespace-nowrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
            <p className="leading-[24px]">Enter city or area...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pc423380} fill="var(--fill-0, #FEF7FF)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function StateLayer1() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center relative shrink-0 w-full" data-name="State-layer">
      <Icon22 />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[100px] shrink-0 w-[40px]" data-name="Content">
      <StateLayer1 />
    </div>
  );
}

function Component1stTrailingIcon() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[48px]" data-name="1st trailing-icon">
      <Content1 />
    </div>
  );
}

function TrailingElements() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-end right-[4px] top-1/2" data-name="Trailing-Elements">
      <Component1stTrailingIcon />
    </div>
  );
}

function StateLayer() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="state-layer">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[4px] pr-[20px] py-[4px] relative size-full">
          <Content />
          <TrailingElements />
        </div>
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="absolute bg-[#1f2533] h-[56px] left-[400px] max-w-[720px] rounded-[28px] top-[176px] w-[720px]" data-name="Search bar">
      <div className="content-stretch flex items-center max-w-[inherit] overflow-clip relative rounded-[inherit] size-full">
        <StateLayer />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-[-1px] pointer-events-none rounded-[29px]" />
    </div>
  );
}

export default function MainDash() {
  return (
    <div className="bg-[#0f1319] relative size-full" data-name="Main Dash">
      <WeatherWidget />
      <UpcomingEvents />
      <RestaurantsList />
      <HotelsList />
      <Navigation />
      <Button7 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[52px] not-italic text-[64px] text-white top-[165px]">Toronto</p>
      <SearchBar />
    </div>
  );
}