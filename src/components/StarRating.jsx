import { FaStar } from 'react-icons/fa';

export function StarRating({ rating = 5, className = 'text-move-gold' }) {
  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      {[...Array(5)].map((_, index) => (
        <FaStar key={index} className={index < rating ? 'text-yellow-400' : 'text-gray-300'} />
      ))}
    </div>
  );
}
