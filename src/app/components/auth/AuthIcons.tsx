import svgPaths from "../../../imports/svg-cwprtmtcru";

export function UserIcon() {
  return (
    <svg className="w-full h-full" fill="none" viewBox="0 0 125 125">
      <path
        d={svgPaths.p2c9be880}
        stroke="#98AAB3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
      />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg className="w-full h-full" fill="none" viewBox="0 0 114 114">
      <mask fill="white" id="lock-mask">
        <path d={svgPaths.p91b800} />
        <path d={svgPaths.p2f6ef180} />
      </mask>
      <path d={svgPaths.p19cf9d80} fill="#98AAB3" mask="url(#lock-mask)" />
    </svg>
  );
}

export function UserIconLarge() {
  return (
    <svg className="w-full h-full" fill="none" viewBox="0 0 400 400">
      <circle cx="200" cy="200" fill="#5281E0" r="200" />
      <path
        d={svgPaths.p2ab38a80}
        stroke="#1E1E1E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="20"
      />
    </svg>
  );
}
