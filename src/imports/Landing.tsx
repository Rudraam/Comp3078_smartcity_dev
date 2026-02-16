import svgPaths from "./svg-xoly50mf9e";
import imgPedroLastraNyvq2Juw4OUnsplash1 from "figma:asset/62dc7a1487c1792e6c0d3b7b27e5e8f649bdb796.png";

function Button() {
  return (
    <div className="absolute bg-[#1152d4] h-[277px] left-[2187px] rounded-[40px] top-[2143px] w-[934px]" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[12px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.2] not-italic relative shrink-0 text-[#f5f5f5] text-[72px] tracking-[-2.16px]">Get Started</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#1152d4] border-solid inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}

function Button1() {
  return (
    <button className="absolute bg-[#2c2c2c] cursor-pointer h-[277px] left-[3665px] rounded-[40px] top-[2135px] w-[934px]" data-name="Button">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[12px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.2] not-italic relative shrink-0 text-[#f5f5f5] text-[72px] text-left tracking-[-2.16px]">Learn More</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[40px]" />
    </button>
  );
}

function MapPin() {
  return (
    <div className="absolute left-[816px] size-[100px] top-[4858px]" data-name="Map pin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g id="Map pin">
          <g id="Icon">
            <path d={svgPaths.p2a9ded00} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
            <path d={svgPaths.p25352600} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Pin() {
  return (
    <div className="absolute contents left-[741px] top-[4783px]" data-name="Pin">
      <div className="absolute bg-[#1152d4] left-[741px] rounded-[30px] size-[250px] top-[4783px]" />
      <MapPin />
    </div>
  );
}

function FigmaAdvancedShapesPsThumbnail() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Figma - Advanced Shapes [PS_THUMBNAIL]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g id="Figma - Advanced Shapes [PS_THUMBNAIL]">
          <path d={svgPaths.p1f21d300} id="Shape [PS_STROKE_COLOR] [PS_FILL]" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
        </g>
      </svg>
    </div>
  );
}

function Template() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[27px] items-center min-h-px min-w-px relative w-full" data-name="Template">
      <FigmaAdvancedShapesPsThumbnail />
    </div>
  );
}

function Instant() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[2340px] size-[100px] top-[4862px]" data-name="Instant">
      <Template />
    </div>
  );
}

function Live() {
  return (
    <div className="absolute contents left-[2265px] top-[4783px]" data-name="Live">
      <div className="absolute bg-[#1152d4] left-[2265px] rounded-[30px] size-[250px] top-[4783px]" />
      <Instant />
    </div>
  );
}

function Shield() {
  return (
    <div className="absolute left-[5729px] size-[100px] top-[4858px]" data-name="Shield">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g id="Shield">
          <path d={svgPaths.p2ae6de80} id="Icon" stroke="var(--stroke-0, #FFF7F7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
        </g>
      </svg>
    </div>
  );
}

function Data() {
  return (
    <div className="absolute contents left-[5654px] top-[4783px]" data-name="Data">
      <div className="absolute bg-[#1152d4] left-[5654px] rounded-[30px] size-[250px] top-[4783px]" />
      <Shield />
    </div>
  );
}

function Users() {
  return (
    <div className="absolute left-[4082px] size-[100px] top-[4858px]" data-name="Users">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g id="Users">
          <path d={svgPaths.p1a0ea280} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
        </g>
      </svg>
    </div>
  );
}

function Comm() {
  return (
    <div className="absolute contents left-[4007px] top-[4783px]" data-name="Comm">
      <div className="absolute bg-[#1152d4] left-[4007px] rounded-[30px] size-[250px] top-[4783px]" />
      <Users />
    </div>
  );
}

export default function Landing() {
  return (
    <div className="bg-[#fafafa] relative size-full" data-name="Landing">
      <div className="absolute h-[4067px] left-0 pointer-events-none top-[-603px] w-[6613px]" data-name="pedro-lastra-Nyvq2juw4_o-unsplash 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgPedroLastraNyvq2Juw4OUnsplash1} />
        <div aria-hidden="true" className="absolute border border-black border-solid inset-0 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
      </div>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[2187px] not-italic text-[250px] text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-white top-[1279px]">Explore Smart Cities</p>
      <div className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[3404.5px] not-italic text-[128px] text-center text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-white top-[1632px] whitespace-nowrap">
        <p className="mb-0">Discover comprehensive city information including weather, pollution levels,</p>
        <p>events,transportation, restaurants, and hotels - all in one place.</p>
      </div>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[2065px] not-italic text-[150px] text-black top-[3853px]">Why Choose Smart City Explorer?</p>
      <Button />
      <Button1 />
      <div className="-translate-x-1/2 absolute font-['Inter:Light',sans-serif] font-light leading-[normal] left-[3261.5px] not-italic text-[#98aab3] text-[96px] text-center top-[4100px] whitespace-nowrap">
        <p className="mb-0">Experience cities like never before with our comprehensive platform</p>
        <p>design for modern travelers and residents.</p>
      </div>
      <div className="absolute bg-[#f5f5f5] h-[943px] left-[5142px] rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[4631px] w-[1275px]" />
      <div className="absolute bg-[#f5f5f5] h-[943px] left-[1753px] rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[4631px] w-[1275px]" />
      <div className="absolute bg-[#f5f5f5] h-[943px] left-[3495px] rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[4631px] w-[1275px]" />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[605px] not-italic text-[64px] text-black top-[5103px]">Smart Navigation</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[2188px] not-italic text-[64px] text-black top-[5103px]">Live Updates</p>
      <Pin />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[3845px] not-italic text-[64px] text-black top-[5103px]">Community Driven</p>
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[5579px] not-italic text-[64px] text-black top-[5103px]">Trusted Data</p>
      <Live />
      <div className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[866.5px] not-italic text-[#454545] text-[64px] text-center top-[5268px] whitespace-nowrap">
        <p className="mb-0">{`Real time city exploration with `}</p>
        <p>{`live data `}</p>
      </div>
      <Data />
      <div className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[2390.5px] not-italic text-[#454545] text-[64px] text-center top-[5268px] whitespace-nowrap">
        <p className="mb-0">{`Weather, pollution, and events `}</p>
        <p>{`in real time `}</p>
      </div>
      <div className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[4132px] not-italic text-[#454545] text-[64px] text-center top-[5268px] whitespace-nowrap">
        <p className="mb-0">{`Reviews and recommendation `}</p>
        <p>from locals</p>
      </div>
      <div className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[5779px] not-italic text-[#454545] text-[64px] text-center top-[5268px] whitespace-nowrap">
        <p className="mb-0">{`Verified information from `}</p>
        <p>reliable sources</p>
      </div>
      <Comm />
    </div>
  );
}