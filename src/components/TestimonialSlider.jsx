import { StarRating } from './StarRating';

export function TestimonialSlider({ testimonials }) {
  return (
    <div className="relative">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-8 scrollbar-hide md:gap-8 md:px-0 justify-center">
        {testimonials.items.map((testimonial, index) => (
          <div key={index} className="relative min-w-[85%] snap-center rounded-3xl bg-slate-50/50 border border-slate-100 p-6 text-center shadow-sm sm:min-w-[400px] md:p-10 lg:min-w-[600px]">
            <div className="mx-auto h-32 w-32 overflow-hidden rounded-full ring-4 ring-white shadow-lg md:h-48 md:w-48">
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="h-full w-full object-cover"
              />
            </div>
            
            <p className="mt-8 text-xl italic leading-relaxed text-slate-700 md:text-2xl">
              {testimonial.quote}
            </p>
            
            {testimonial.description && (
              <p className="mt-6 text-sm leading-relaxed text-slate-500 md:text-base">
                {testimonial.description}
              </p>
            )}
            
            <p className="mt-8 text-lg font-black tracking-tight text-brand-primary md:text-2xl">
              - {testimonial.author}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
