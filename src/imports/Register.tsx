import svgPaths from "./svg-mvg2nwuq53";

function Login1() {
  return (
    <div className="absolute bg-[#5281e0] h-[225px] left-[2187px] rounded-[8px] top-[2591px] w-[2244px]" data-name="Login">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[12px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.2] not-italic relative shrink-0 text-[#0f1319] text-[72px] tracking-[-2.16px]">Register</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function RoundIcon() {
  return (
    <div className="relative size-[400px]" data-name="Round Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 400">
        <g id="Round Icon">
          <circle cx="200" cy="200" fill="var(--fill-0, #5281E0)" id="Icon" r="200" />
          <g id="User">
            <path d={svgPaths.p2ab38a80} id="Icon_2" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Input() {
  return (
    <div className="min-w-[120px] relative rounded-[8px] shrink-0 w-full" data-name="Input" style={{ backgroundImage: "linear-gradient(90deg, rgb(15, 19, 25) 0%, rgb(15, 19, 25) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="flex flex-row items-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center min-w-[inherit] pl-[200px] py-[48px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[1.2] min-h-px min-w-px not-italic relative text-[#98aab3] text-[72px] tracking-[-2.16px] whitespace-pre-wrap">Enter your username...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
    </div>
  );
}

function InputField() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[192px] items-start justify-center left-[2188px] top-[1629px] w-[2244px]" data-name="Input Field">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.2] min-w-full not-italic relative shrink-0 text-[#d3dbde] text-[72px] tracking-[-2.16px] w-[min-content] whitespace-pre-wrap">Username</p>
      <Input />
    </div>
  );
}

function User() {
  return (
    <div className="relative size-[125px]" data-name="User">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 125 125">
        <g id="User">
          <g id="Icon">
            <path d={svgPaths.p2c9be880} stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" />
            <path d={svgPaths.p2c9be880} stroke="var(--stroke-1, #98AAB3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function UsernameBar() {
  return (
    <div className="absolute contents left-[2188px] top-[1629px]" data-name="Username Bar">
      <InputField />
      <div className="absolute flex items-center justify-center left-[2227px] size-[125px] top-[1706px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <User />
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="min-w-[120px] relative rounded-[8px] shrink-0 w-full" data-name="Input" style={{ backgroundImage: "linear-gradient(90deg, rgb(15, 19, 25) 0%, rgb(15, 19, 25) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="flex flex-row items-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center min-w-[inherit] pl-[200px] py-[48px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[1.2] min-h-px min-w-px not-italic relative text-[#98aab3] text-[72px] tracking-[-2.16px] whitespace-pre-wrap">Reenter your password...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
    </div>
  );
}

function InputField1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[192px] items-start justify-center left-[2186px] top-[2264px] w-[2244px]" data-name="Input Field">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.2] min-w-full not-italic relative shrink-0 text-[#d3dbde] text-[72px] tracking-[-2.16px] w-[min-content] whitespace-pre-wrap">Confirm Password</p>
      <Input1 />
    </div>
  );
}

function Lock() {
  return (
    <div className="relative size-[114px]" data-name="Lock">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 114 114">
        <g id="Lock">
          <g id="Icon">
            <mask fill="white" id="path-1-inside-1_1_955">
              <path d={svgPaths.p91b800} />
              <path d={svgPaths.p2f6ef180} />
            </mask>
            <path d={svgPaths.p19cf9d80} fill="var(--stroke-0, #98AAB3)" mask="url(#path-1-inside-1_1_955)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ConfirmPasswordBar() {
  return (
    <div className="absolute contents left-[2186px] top-[2264px]" data-name="Confirm Password Bar">
      <InputField1 />
      <div className="absolute flex items-center justify-center left-[2232px] size-[114px] top-[2348px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <Lock />
        </div>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="min-w-[120px] relative rounded-[8px] shrink-0 w-full" data-name="Input" style={{ backgroundImage: "linear-gradient(90deg, rgb(15, 19, 25) 0%, rgb(15, 19, 25) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="flex flex-row items-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center min-w-[inherit] pl-[200px] py-[48px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[1.2] min-h-px min-w-px not-italic relative text-[#98aab3] text-[72px] tracking-[-2.16px] whitespace-pre-wrap">Enter your password...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
    </div>
  );
}

function InputField2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[192px] items-start justify-center left-[2186px] top-[1946px] w-[2244px]" data-name="Input Field">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.2] min-w-full not-italic relative shrink-0 text-[#d3dbde] text-[72px] tracking-[-2.16px] w-[min-content] whitespace-pre-wrap">Password</p>
      <Input2 />
    </div>
  );
}

function Lock1() {
  return (
    <div className="relative size-[114px]" data-name="Lock">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 114 114">
        <g id="Lock">
          <g id="Icon">
            <mask fill="white" id="path-1-inside-1_1_955">
              <path d={svgPaths.p91b800} />
              <path d={svgPaths.p2f6ef180} />
            </mask>
            <path d={svgPaths.p19cf9d80} fill="var(--stroke-0, #98AAB3)" mask="url(#path-1-inside-1_1_955)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function PasswordBar() {
  return (
    <div className="absolute contents left-[2186px] top-[1946px]" data-name="Password Bar">
      <InputField2 />
      <div className="absolute flex items-center justify-center left-[2232px] size-[114px] top-[2030px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <Lock1 />
        </div>
      </div>
    </div>
  );
}

function Login2() {
  return (
    <div className="absolute h-[200px] left-[2212px] rounded-[8px] top-[1258px] w-[1070px]" data-name="Login" style={{ backgroundImage: "linear-gradient(90deg, rgb(31, 37, 51) 0%, rgb(31, 37, 51) 100%), linear-gradient(90deg, rgb(15, 19, 25) 0%, rgb(15, 19, 25) 100%), linear-gradient(90deg, rgb(44, 44, 44) 0%, rgb(44, 44, 44) 100%)" }}>
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[12px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.2] not-italic relative shrink-0 text-[#d3dbde] text-[72px] tracking-[-2.16px]">Login</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Register1() {
  return (
    <div className="absolute h-[200px] left-[3333px] rounded-[8px] top-[1258px] w-[1070px]" data-name="Register" style={{ backgroundImage: "linear-gradient(90deg, rgb(12, 15, 20) 0%, rgb(12, 15, 20) 100%), linear-gradient(90deg, rgb(15, 19, 25) 0%, rgb(15, 19, 25) 100%), linear-gradient(90deg, rgb(31, 37, 51) 0%, rgb(31, 37, 51) 100%), linear-gradient(90deg, rgb(44, 44, 44) 0%, rgb(44, 44, 44) 100%)" }}>
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[12px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.2] not-italic relative shrink-0 text-[#d3dbde] text-[72px] tracking-[-2.16px]">Register</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Toggle() {
  return (
    <div className="absolute contents left-[2184px] top-[1233px]" data-name="Toggle">
      <div className="absolute h-[250px] left-[2184px] rounded-[20px] top-[1233px] w-[2244px]" data-name="Background" style={{ backgroundImage: "linear-gradient(90deg, rgb(31, 37, 51) 0%, rgb(31, 37, 51) 100%), linear-gradient(90deg, rgb(217, 217, 217) 0%, rgb(217, 217, 217) 100%)" }} />
      <Login2 />
      <Register1 />
    </div>
  );
}

function Login() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Login">
      <div className="absolute flex h-[3334px] items-center justify-center left-0 top-0 w-[6613px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="bg-[#0f1319] h-[3334px] w-[6613px]" data-name="Background" />
        </div>
      </div>
      <div className="absolute flex h-[2724px] items-center justify-center left-[2003px] top-[225px] w-[2612px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[2724px] relative w-[2612px]" data-name="Widget">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2612 2724">
              <path d={svgPaths.p3e4257c0} fill="var(--fill-0, #171C26)" id="Widget" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </div>
      <Login1 />
      <div className="absolute flex items-center justify-center left-[3107px] size-[400px] top-[364px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <RoundIcon />
        </div>
      </div>
      <UsernameBar />
      <ConfirmPasswordBar />
      <PasswordBar />
      <Toggle />
    </div>
  );
}

export default function Register() {
  return (
    <div className="relative size-full" data-name="Register">
      <Login />
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[2312px] not-italic text-[128px] text-white top-[860px]">Welcome to Smart City Explorer</p>
    </div>
  );
}