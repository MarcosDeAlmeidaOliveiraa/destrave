import { DiagnosisQuiz } from '../components/DiagnosisQuiz'

export function QuizScreen({ onBack, checkoutUrl }) {
  return (
    <div className="min-h-screen bg-[#efe7de] flex flex-col md:py-12 md:px-4">
      <DiagnosisQuiz checkoutUrl={checkoutUrl} onComplete={onBack} />
    </div>
  )
}
