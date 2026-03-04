export function YoutubeEmbed({ videoId, children }) {
  return (
    <div className="relative w-full mt-8 mb-8 px-4">
      <div className="relative max-w-5xl mx-auto">
        {/* container for overlays (children should be absolutely positioned) */}
        {children}
        <div className="relative pb-[56.25%]">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-[2.5rem] border border-white/10 shadow-2xl"
          />
        </div>
      </div>
    </div>
  )
}