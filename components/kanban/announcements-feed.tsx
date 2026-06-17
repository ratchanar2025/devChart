'use client';

export default function AnnouncementsFeed() {
  const announcements = [
    'DevJams 2026 Core Committee Briefing tonight at 6 PM!',
    'New Android 15 features workshop this Friday',
    'Project submission deadline extended to next week',
    'Team lunch celebration after completing sprint 3!',
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 overflow-hidden shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">📢</span>
        <h3 className="text-lg font-semibold text-foreground">
          Android Club Announcements
        </h3>
      </div>

      <div className="overflow-hidden">
        <div className="flex animate-scroll space-x-4">
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg text-accent text-sm font-medium whitespace-nowrap"
            >
              {announcement}
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {announcements.map((announcement, index) => (
            <div
              key={`repeat-${index}`}
              className="flex-shrink-0 px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg text-accent text-sm font-medium whitespace-nowrap"
            >
              {announcement}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
