import svgPaths from "../../../imports/svg-qwgn0kxhzg";

export function CloudIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
      <path
        d={svgPaths.p22bef200}
        stroke="#99A1AF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function WindIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
      <path
        d={svgPaths.p22bc2d80}
        stroke="#99A1AF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d={svgPaths.pd3e8700}
        stroke="#99A1AF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d={svgPaths.p36f10600}
        stroke="#99A1AF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function HumidityIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
      <path
        d={svgPaths.p1d3f6c80}
        stroke="#99A1AF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d={svgPaths.p37cfb400}
        stroke="#99A1AF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
      <path
        d={svgPaths.p1da67b80}
        stroke="#99A1AF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function LocationIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 14 14">
      <path
        d={svgPaths.p1539e500}
        stroke="#99A1AF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
      <path
        d={svgPaths.p37b99980}
        stroke="#99A1AF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function DashboardStarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg
      className="w-3 h-3"
      fill={filled ? "#FFC107" : "none"}
      viewBox="0 0 12 12"
    >
      <path
        d={svgPaths.p111600}
        stroke="#FFC107"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      />
    </svg>
  );
}
