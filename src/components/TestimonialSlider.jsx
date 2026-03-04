import { StarRating } from './StarRating';

export function TestimonialSlider({ testimonials }) {
  return (
    <div className="relative">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-8 scrollbar-hide md:gap-8 md:px-0">
        {testimonials.items.map((testimonial, index) => (
          <div key={index} className="relative min-w-[85%] snap-center rounded-3xl bg-slate-50/50 border border-slate-100 p-6 text-center shadow-sm sm:min-w-[400px] md:p-10 lg:min-w-[450px]">
            <img
              src={testimonial.avatar}
              alt={testimonial.author}
              className="mx-auto h-20 w-20 rounded-full object-cover ring-4 ring-white md:h-24 md:w-24"
            />
            <div className="mt-6 flex justify-center">
              <StarRating rating={testimonial.rating} />
            </div>
            <p className="mt-6 text-base italic leading-relaxed text-slate-600 md:text-lg">"{testimonial.quote}"</p>
            <p className="mt-8 font-bold text-slate-900 md:text-xl">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
