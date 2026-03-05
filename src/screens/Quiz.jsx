import { DiagnosisQuiz } from '../components/DiagnosisQuiz'

export function QuizScreen({ onBack, checkoutUrl }) {
  return (
    <div className="fixed inset-0 bg-move-beige z-[9999] overflow-hidden flex flex-col">
      <DiagnosisQuiz checkoutUrl={checkoutUrl} onComplete={onBack} />
    </div>
  )
}
