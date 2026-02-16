import svgPaths from "./svg-kmut1e4klf";
import imgImageTorontoMap from "figma:asset/7bfefac454b84ebf5eb46c3499c7b62cee521f43.png";

function Paragraph() {
  return (
    <div className="absolute content-stretch flex h-[41.6px] items-start left-0 top-[40.7px] w-[444px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Bold',sans-serif] font-bold leading-[normal] min-h-px min-w-px relative text-[36px] text-black text-center whitespace-pre-wrap">Smart City Dashboard</p>
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

function Button() {
  return (
    <div className="bg-[#1f2533] relative rounded-[8px] shrink-0" data-name="Button">
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

function Button1() {
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

function Button2() {
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

function Button3() {
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
    <div className="absolute content-stretch flex gap-[48px] items-center justify-end right-[43.2px] top-[42px] w-[496px]" data-name="Items">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute bg-[#0065ff] h-[123px] left-0 overflow-clip top-0 w-[1167.2px]" data-name="Navigation">
      <Paragraph />
      <Items />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute content-stretch flex h-[77.6px] items-start left-[80px] top-[147px] w-[233.637px]" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[64px] text-white">Toronto</p>
    </div>
  );
}

function MapPin() {
  return (
    <div className="absolute left-[363.2px] size-[48px] top-[169.2px]" data-name="Map pin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Map pin">
          <g id="Icon">
            <path d={svgPaths.p12086400} stroke="var(--stroke-0, #FF0000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
            <path d={svgPaths.pd151bb0} stroke="var(--stroke-0, #FF0000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ImageTorontoMap() {
  return (
    <div className="absolute h-[312.8px] left-0 overflow-clip top-0 w-[683.6px]" data-name="Image (Toronto Map)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageTorontoMap} />
      <MapPin />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_20.83%_20.83%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
            <path d={svgPaths.p32110270} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[69.37%_12.5%_12.5%_69.38%]" data-name="Vector">
        <div className="absolute inset-[-22.99%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.29167 5.29167">
            <path d={svgPaths.p2acb3a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_54.17%_41.67%_45.83%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 6.66667">
            <path d="M0.833333 0.833333V5.83333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_54.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 1.66667">
            <path d="M0.833333 0.833333H5.83333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#1f2533] relative rounded-[8px] shrink-0 size-[41.6px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#2c2c2c] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.8px] pt-[10.8px] px-[10.8px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_20.83%_20.83%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
            <path d={svgPaths.p32110270} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[69.37%_12.5%_12.5%_69.38%]" data-name="Vector">
        <div className="absolute inset-[-22.99%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.29167 5.29167">
            <path d={svgPaths.p2acb3a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_54.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 1.66667">
            <path d="M0.833333 0.833333H5.83333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#1f2533] relative rounded-[8px] shrink-0 size-[41.6px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#2c2c2c] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.8px] pt-[10.8px] px-[10.8px] relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_12.5%_62.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
            <path d={svgPaths.p26fac1f0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_12.5%_58.33%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.5 7.5">
            <path d={svgPaths.p28e68380} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_58.33%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.5 7.5">
            <path d={svgPaths.p306b8b00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.5%_62.5%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 6.66667">
            <path d={svgPaths.p1fe8aa80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#1f2533] relative rounded-[8px] shrink-0 size-[41.6px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#2c2c2c] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.8px] pt-[10.8px] px-[10.8px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[140.8px] items-start left-[622px] top-[20px] w-[41.6px]" data-name="Container">
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Container5() {
  return <div className="bg-[#fb2c36] rounded-[26843500px] shrink-0 size-[12px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="h-[18px] relative shrink-0 w-[67.225px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-white top-[-1.2px]">Heavy Traffic</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[18px] relative shrink-0 w-[106.537px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container5 />
        <Text />
      </div>
    </div>
  );
}

function Container7() {
  return <div className="bg-[#ff6900] rounded-[26843500px] shrink-0 size-[12px]" data-name="Container" />;
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-white top-[-1.2px]">Moderate Traffic</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[18px] relative shrink-0 w-[106.537px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container7 />
        <Text1 />
      </div>
    </div>
  );
}

function Container9() {
  return <div className="bg-[#00c950] rounded-[26843500px] shrink-0 size-[12px]" data-name="Container" />;
}

function Text2() {
  return (
    <div className="h-[18px] relative shrink-0 w-[26.9px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-white top-[-1.2px]">Clear</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[18px] relative shrink-0 w-[106.537px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container9 />
        <Text2 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[70px] items-start relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container6 />
      <Container8 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-[#1f2533] content-stretch flex flex-col h-[95.6px] items-start left-[20px] pb-[0.8px] pt-[12.8px] px-[12.8px] rounded-[8px] top-[197.2px] w-[132.137px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2c2c2c] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container3 />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[18px] relative shrink-0 w-[179.175px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#a1a1a1] text-[12px] top-[-1.2px]">Current View</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[179.175px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[14px] text-white top-[-1.2px]">{`Eglinton Ave E & Manville Rd`}</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[43px] items-start relative shrink-0 w-full" data-name="Container">
      <Text3 />
      <Text4 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-[#1f2533] content-stretch flex flex-col h-[68.6px] items-start left-[20px] pb-[0.8px] pt-[12.8px] px-[12.8px] rounded-[8px] top-[20px] w-[204.775px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2c2c2c] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container11 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[312.8px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageTorontoMap />
      <Container1 />
      <Container2 />
      <Container10 />
    </div>
  );
}

function MapView() {
  return (
    <div className="absolute bg-[#1a1d26] h-[314.4px] left-[63px] rounded-[12px] top-[323px] w-[685.2px]" data-name="MapView">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[0.8px] relative rounded-[inherit] size-full">
        <Container />
      </div>
      <div aria-hidden="true" className="absolute border-[#2c2c2c] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[30px] left-0 text-[20px] text-white top-[-2.4px]">Alerts</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#0065ff] h-[33px] relative rounded-[6px] shrink-0 w-[39.813px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[20px] text-[14px] text-center text-white top-[4.8px]">All</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[12px] size-[14px] top-[9.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p34fcd700} id="Vector" stroke="var(--stroke-0, #D4D4D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 5.25V7.58333" id="Vector_2" stroke="var(--stroke-0, #D4D4D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 9.91667H7.00583" id="Vector_3" stroke="var(--stroke-0, #D4D4D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#2c2c2c] h-[33px] relative rounded-[6px] shrink-0 w-[80.738px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon3 />
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[50.5px] text-[#d4d4d4] text-[14px] text-center top-[4.8px]">Traffic</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[12px] size-[14px] top-[9.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.pa87380} id="Vector" stroke="var(--stroke-0, #D4D4D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#2c2c2c] h-[33px] relative rounded-[6px] shrink-0 w-[95.838px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon4 />
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[58.5px] text-[#d4d4d4] text-[14px] text-center top-[4.8px]">Weather</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[8px] h-[33px] items-start relative shrink-0 w-full" data-name="Container">
      <Button7 />
      <Button8 />
      <Button9 />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[#1f2533] h-[107.8px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2c2c2c] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-[0.8px] pt-[16px] px-[16px] relative size-full">
        <Heading />
        <Container13 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.44%_8.34%_12.5%_8.26%]" data-name="Vector">
        <div className="absolute inset-[-5.55%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6773 13.3427">
            <path d={svgPaths.p19ed2c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[45.83%] left-1/2 right-1/2 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33333 4">
            <path d="M0.666667 0.666667V3.33333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[29.17%] left-1/2 right-[49.96%] top-[70.83%]" data-name="Vector">
        <div className="absolute inset-[-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.34 1.33333">
            <path d="M0.666667 0.666667H0.673334" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[rgba(251,44,54,0.2)] relative rounded-[6px] shrink-0 size-[33.6px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#fb2c36] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.8px] pt-[8.8px] px-[8.8px] relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[14px] text-white top-[-1.2px]">Heavy Traffic on Highway 401</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#a1a1a1] text-[12px] top-[-1.2px] w-[251px] whitespace-pre-wrap">Expect delays of 20-30 minutes eastbound near DVP</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="flex-[1_0_0] h-[61px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[12px] h-[61px] items-start relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col h-[93.8px] items-start left-0 pb-[0.8px] pt-[16px] px-[16px] top-0 w-[348.4px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2c2c2c] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
      <Container16 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.83%_8.33%_20.83%_8.34%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6655 10.6667">
            <path d={svgPaths.p4dc6f80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-[rgba(255,105,0,0.2)] relative rounded-[6px] shrink-0 size-[33.6px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#ff6900] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.8px] pt-[8.8px] px-[8.8px] relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[14px] text-white top-[-1.2px]">Weather Advisory</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#a1a1a1] text-[12px] top-[-1.2px] w-[222px] whitespace-pre-wrap">Light snow expected this evening, 5-10cm accumulation</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[1_0_0] h-[61px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading2 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[12px] h-[61px] items-start relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col h-[93.8px] items-start left-0 pb-[0.8px] pt-[16px] px-[16px] top-[93.8px] w-[348.4px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2c2c2c] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
      <Container20 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.44%_8.34%_12.5%_8.26%]" data-name="Vector">
        <div className="absolute inset-[-5.55%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6773 13.3427">
            <path d={svgPaths.p19ed2c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[45.83%] left-1/2 right-1/2 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33333 4">
            <path d="M0.666667 0.666667V3.33333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[29.17%] left-1/2 right-[49.96%] top-[70.83%]" data-name="Vector">
        <div className="absolute inset-[-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.34 1.33333">
            <path d="M0.666667 0.666667H0.673334" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-[rgba(255,105,0,0.2)] relative rounded-[6px] shrink-0 size-[33.6px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#ff6900] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.8px] pt-[8.8px] px-[8.8px] relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[14px] text-white top-[-1.2px]">Construction on Eglinton Ave</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#a1a1a1] text-[12px] top-[-1.2px]">Lane closures between Yonge and Bayview</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="flex-[1_0_0] h-[43px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading3 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[12px] h-[43px] items-start relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col h-[75.8px] items-start left-0 pb-[0.8px] pt-[16px] px-[16px] top-[187.6px] w-[348.4px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2c2c2c] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
      <Container24 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.83%_8.33%_20.83%_8.34%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6655 10.6667">
            <path d={svgPaths.p4dc6f80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="bg-[rgba(43,127,255,0.2)] relative rounded-[6px] shrink-0 size-[33.6px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2b7fff] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.8px] pt-[8.8px] px-[8.8px] relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-0 text-[14px] text-white top-[-1.2px]">Temperature Drop</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#a1a1a1] text-[12px] top-[-1.2px]">Temperatures dropping to -15°C overnight</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="flex-[1_0_0] h-[43px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading4 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[43px] items-start left-[16px] top-[279.4px] w-[316.4px]" data-name="Container">
      <Container28 />
      <Container29 />
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[338.4px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Container19 />
      <Container23 />
      <Container27 />
    </div>
  );
}

function AlertsPanel() {
  return (
    <div className="absolute bg-[#1a1d26] h-[447.8px] left-[776.2px] rounded-[12px] top-[208px] w-[350px]" data-name="AlertsPanel">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[0.8px] relative rounded-[inherit] size-full">
        <Container12 />
        <Container14 />
      </div>
      <div aria-hidden="true" className="absolute border-[#2c2c2c] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-2.2px]">Choose Transportation</p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.17%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-10%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 12">
            <path d={svgPaths.p56a9200} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.5%_62.5%_20.83%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.pafef4f0} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_37.5%_29.17%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-1px_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 2">
            <path d="M1 1H7" id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.5%_20.83%_20.83%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.pafef4f0} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[21px] relative shrink-0 w-[20.663px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[10.5px] text-[#d4d4d4] text-[14px] text-center top-[-1.2px]">Car</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[33.237px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16.5px] left-[17px] text-[#737373] text-[11px] text-center top-[-1.2px]">27 min</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[33.237px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16.5px] left-[16.51px] text-[#525252] text-[11px] text-center top-[-1.2px]">14.8 km</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[33.237px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Text6 />
        <Text7 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[96px] items-center relative shrink-0 w-full" data-name="Container">
      <Container32 />
      <Text5 />
      <Container33 />
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute bg-[#1f2533] content-stretch flex flex-col h-[129.6px] items-start left-0 pb-[0.8px] pt-[16.8px] px-[16.8px] rounded-[8px] top-0 w-[212.637px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#2c2c2c] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container31 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0.83%_1.74%_-0.42%_-1.33%]" data-name="Vector">
        <div className="absolute inset-[-4.18%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.9 25.9">
            <path d={svgPaths.p2e893000} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[21px] relative shrink-0 w-[21.9px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[11px] text-[#d4d4d4] text-[14px] text-center top-[-1.2px]">Flying</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[33.237px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16.5px] left-[17.5px] text-[#737373] text-[11px] text-center top-[-1.2px]">- min</p>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[33.237px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16.5px] left-[16.51px] text-[#525252] text-[11px] text-center top-[-1.2px]">- km</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[33.237px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Text9 />
        <Text10 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[96px] items-center relative shrink-0 w-full" data-name="Container">
      <Container35 />
      <Text8 />
      <Container36 />
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute bg-[#1f2533] content-stretch flex flex-col h-[129.6px] items-start left-[914px] pb-[0.8px] pt-[16.8px] px-[16.8px] rounded-[8px] top-0 w-[212.637px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#2c2c2c] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container34 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[58.33%_8.33%_12.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
            <path d={svgPaths.p12f67b00} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_62.5%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
            <path d={svgPaths.p12f67b00} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p32cd9cf0} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_29.17%_27.08%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-10.53%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 11.5">
            <path d={svgPaths.p2f37d400} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[21px] relative shrink-0 w-[25.7px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[13px] text-[#d4d4d4] text-[14px] text-center top-[-1.2px]">Bike</p>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[33.237px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16.5px] left-[17px] text-[#737373] text-[11px] text-center top-[-1.2px]">1 h 2 min</p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[33.237px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16.5px] left-[16.51px] text-[#525252] text-[11px] text-center top-[-1.2px]">16.8 km</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[33.237px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Text12 />
        <Text13 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[96px] items-center relative shrink-0 w-full" data-name="Container">
      <Container38 />
      <Text11 />
      <Container39 />
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute bg-[#1f2533] content-stretch flex flex-col h-[129.6px] items-start left-[228px] pb-[0.8px] pt-[16.8px] px-[16.8px] rounded-[8px] top-0 w-[212.637px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#2c2c2c] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container37 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/4 left-[12.5%] right-[58.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-6.25%_-14.28%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.00064 18">
            <path d={svgPaths.p2288a200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[58.33%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-14.28%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.00064 18">
            <path d={svgPaths.p361951c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_16.67%_29.17%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-1px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M1 1H5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_66.67%_45.83%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-1px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M1 1H5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[21px] relative shrink-0 w-[30.013px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[15.5px] text-[14px] text-center text-white top-[-1.2px]">Walk</p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[33.237px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16.5px] left-[17px] text-[11px] text-center text-white top-[-1.2px]">3 h 32 min</p>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[33.237px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16.5px] left-[16.51px] text-[11px] text-[rgba(255,255,255,0.7)] text-center top-[-1.2px]">14.6 km</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[33.237px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Text15 />
        <Text16 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[96px] items-center relative shrink-0 w-full" data-name="Container">
      <Container41 />
      <Text14 />
      <Container42 />
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute bg-[#0065ff] content-stretch flex flex-col h-[129.6px] items-start left-[456.64px] pb-[0.8px] pt-[16.8px] px-[16.8px] rounded-[8px] top-0 w-[212.637px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#0065ff] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container40 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_16.67%_20.83%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path d={svgPaths.p313d1700} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_16.67%_54.17%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-1px_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 2">
            <path d="M1 1H17" id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[54.17%] left-1/2 right-1/2 top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-12.5%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 10">
            <path d="M1 1V9" id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-1/4 right-[66.67%] top-[79.17%]" data-name="Vector">
        <div className="absolute inset-[-33.34%_-50.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.00021 5.00021">
            <path d={svgPaths.p25a98b00} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[66.67%] right-1/4 top-[79.17%]" data-name="Vector">
        <div className="absolute inset-[-33.34%_-50.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.00021 5.00021">
            <path d={svgPaths.p106c5180} id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.5%_66.62%_37.5%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-1px_-9999.77%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.01 2">
            <path d="M1 1H1.01" id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.5%_33.29%_37.5%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-1px_-9999.77%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.01 2">
            <path d="M1 1H1.01" id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[21px] relative shrink-0 w-[29.425px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[21px] left-[15.5px] text-[#d4d4d4] text-[14px] text-center top-[-1.2px]">Transit</p>
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[33.237px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16.5px] left-[17px] text-[#737373] text-[11px] text-center top-[-1.2px]">58 min</p>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[33.237px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16.5px] left-[16.7px] text-[#525252] text-[11px] text-center top-[-1.2px]">- km</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[33.237px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Text18 />
        <Text19 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[96px] items-center relative shrink-0 w-full" data-name="Container">
      <Container44 />
      <Text17 />
      <Container45 />
    </div>
  );
}

function Button14() {
  return (
    <div className="absolute bg-[#1f2533] content-stretch flex flex-col h-[129.6px] items-start left-[685.27px] pb-[0.8px] pt-[16.8px] px-[16.8px] rounded-[8px] top-0 w-[212.637px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#2c2c2c] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container43 />
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[129.6px] relative shrink-0 w-full" data-name="Container">
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
      <Button14 />
    </div>
  );
}

function TransportationSelector() {
  return (
    <div className="absolute bg-[#1a1d26] content-stretch flex flex-col gap-[16px] h-[209px] items-start left-0 pt-[20px] px-[20px] top-[687px] w-[1167px]" data-name="TransportationSelector">
      <div aria-hidden="true" className="absolute border-black border-solid border-t-[0.8px] inset-0 pointer-events-none" />
      <Heading5 />
      <Container30 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M17.5 17.5L13.8833 13.8833" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pcddfd00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function TextInput() {
  return (
    <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#99a1af] text-[16px]">Search hotels...</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] relative size-full">
          <Icon14 />
          <TextInput />
        </div>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="bg-[#0f1419] flex-[1_0_0] h-[49.6px] min-h-px min-w-px relative rounded-[8px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#314158] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[0.8px] relative size-full">
        <Container48 />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[26.5px] not-italic text-[16px] text-center text-white top-[-0.6px]">Search</p>
    </div>
  );
}

function Button15() {
  return (
    <div className="bg-[#2b7fff] h-[49.6px] relative rounded-[8px] shrink-0 w-[116.625px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12.8px] px-[32px] relative size-full">
        <Paragraph6 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[50px] items-start left-[63px] pr-[0.013px] top-[234px] w-[687px]" data-name="Container">
      <Container47 />
      <Button15 />
    </div>
  );
}

export default function Maps() {
  return (
    <div className="bg-[#0f1319] relative size-full" data-name="Maps">
      <Navigation />
      <Paragraph1 />
      <MapView />
      <AlertsPanel />
      <TransportationSelector />
      <Container46 />
    </div>
  );
}