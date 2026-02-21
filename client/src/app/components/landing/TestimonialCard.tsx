import { ImageWithFallback } from "../figma/ImageWithFallback";

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  image: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-[#f5f5f5] rounded-2xl p-6 flex flex-col">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4"
            fill={i < testimonial.rating ? "#FFC107" : "#E0E0E0"}
            viewBox="0 0 20 20"
          >
            <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
          </svg>
        ))}
      </div>

      <p className="text-[#454545] text-sm flex-1 mb-4 leading-relaxed">
        "{testimonial.text}"
      </p>

      <div className="flex items-center gap-3">
        <ImageWithFallback
          src={testimonial.image}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-black text-sm">{testimonial.name}</p>
          <p className="text-xs text-[#98aab3]">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
