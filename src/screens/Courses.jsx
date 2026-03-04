import { CourseCard } from '../components/CourseCard'

export function CoursesScreen({ courses }) {
  return (
    <section id="courses" className="mx-auto mt-16 max-w-6xl px-4">
      <div className="mb-8 flex items-center justify-between">
  <h2 className="text-3xl font-semibold text-move-green">{courses.title}</h2>
        <span className="text-sm text-slate-400">Swipe sideways on mobile to explore</span>
      </div>
      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-3">
        {courses.list.map((course) => (
          <div key={course.id} className="min-w-[280px] snap-center md:min-w-0">
            <CourseCard course={course} comingSoonNote={courses.comingSoonNote} />
          </div>
        ))}
      </div>
    </section>
  )
}
