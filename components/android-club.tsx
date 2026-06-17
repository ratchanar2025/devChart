'use client';

import { useState } from 'react';
import Image from 'next/image';

// SVG Icons as components
const AchievementIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const UploadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  coordinators: Array<{ name: string; phone: string; email: string }>;
  posterUrl?: string;
}

interface Event {
  id: string;
  name: string;
  venue: string;
  date: string;
  time: string;
}

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Hackathon Winners',
    description: 'Developed innovative Android app at state-level hackathon',
    icon: <AchievementIcon />,
    coordinators: [
      { name: 'Raj Kumar', phone: '+91 99999 11111', email: 'raj.kumar@vitc.ac.in' },
      { name: 'Priya Sharma', phone: '+91 99999 22222', email: 'priya.sharma@vitc.ac.in' }
    ]
  },
  {
    id: '2',
    title: 'Workshop Series',
    description: 'Conducted 15+ technical workshops on Android development',
    icon: <AchievementIcon />,
    coordinators: [
      { name: 'Amit Patel', phone: '+91 99999 33333', email: 'amit.patel@vitc.ac.in' }
    ]
  },
  {
    id: '3',
    title: 'Community Growth',
    description: 'Expanded club membership to 500+ active members',
    icon: <AchievementIcon />,
    coordinators: [
      { name: 'Sarah Johnson', phone: '+91 99999 44444', email: 'sarah.johnson@vitc.ac.in' },
      { name: 'Vikram Singh', phone: '+91 99999 55555', email: 'vikram.singh@vitc.ac.in' }
    ]
  }
];

const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Material Design 3 Deep Dive',
    venue: 'Innovation Hub, Building A',
    date: '2026-07-15',
    time: '14:00'
  },
  {
    id: '2',
    name: 'Jetpack Compose Workshop',
    venue: 'Tech Lab, Room 301',
    date: '2026-07-22',
    time: '10:00'
  },
  {
    id: '3',
    name: 'App Showcase & Networking',
    venue: 'Main Auditorium',
    date: '2026-08-05',
    time: '16:00'
  },
  {
    id: '4',
    name: 'Firebase Integration Bootcamp',
    venue: 'Computer Lab, Block C',
    date: '2026-08-12',
    time: '13:00'
  }
];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
  const [showCoordinators, setShowCoordinators] = useState(false);
  const [posterFile, setPosterFile] = useState<File | null>(null);

  return (
    <div className="border border-accent/40 rounded-lg p-6 bg-card hover:border-accent/70 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
      <div className="flex items-start gap-4 mb-4">
        <div className="text-accent flex-shrink-0">
          {achievement.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">{achievement.title}</h3>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
        </div>
      </div>

      <div className="space-y-3 border-t border-border/50 pt-4">
        {/* Poster Upload Section */}
        <div className="bg-background/50 rounded border border-dashed border-accent/30 p-4">
          <label className="flex items-center justify-center gap-2 cursor-pointer group">
            <UploadIcon />
            <span className="text-xs font-medium text-muted-foreground group-hover:text-accent transition-colors">
              {posterFile ? posterFile.name : 'Upload Event Poster'}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setPosterFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        {/* Coordinators Section */}
        <button
          onClick={() => setShowCoordinators(!showCoordinators)}
          className="w-full text-left text-xs font-semibold text-accent hover:text-accent/80 transition-colors flex items-center justify-between group"
        >
          <span>View Coordinators</span>
          <span className="text-lg group-hover:translate-x-1 transition-transform">{showCoordinators ? '−' : '+'}</span>
        </button>

        {showCoordinators && (
          <div className="bg-background/30 rounded p-3 space-y-2">
            {achievement.coordinators.map((coord, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-xs font-semibold text-foreground">{coord.name}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <a
                    href={`tel:${coord.phone}`}
                    className="flex items-center gap-1 hover:text-accent transition-colors"
                  >
                    <PhoneIcon />
                    {coord.phone}
                  </a>
                  <a
                    href={`mailto:${coord.email}`}
                    className="flex items-center gap-1 hover:text-accent transition-colors"
                  >
                    <MailIcon />
                    {coord.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div className="border border-border rounded-lg p-6 bg-card hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{event.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <MapPinIcon />
            {event.venue}
          </div>
        </div>
        {/* Terminal-style Date Badge */}
        <div className="flex-shrink-0 bg-accent/10 border border-accent/50 rounded px-3 py-2 font-mono text-xs">
          <div className="text-accent font-semibold">{formatDate(event.date)}</div>
          <div className="text-muted-foreground text-xs">{event.time}</div>
        </div>
      </div>
    </div>
  );
};

export default function AndroidClubPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <header className="border-b border-border/50 sticky top-0 z-50 bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/android-club-logo.jfif"
              alt="Android Club VIT Chennai"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold">Android Club</h1>
              <p className="text-xs text-muted-foreground">VIT Chennai</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#achievements" className="text-muted-foreground hover:text-accent transition-colors">
              Achievements
            </a>
            <a href="#events" className="text-muted-foreground hover:text-accent transition-colors">
              Upcoming Events
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Grid Layout: 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Club Achievements Section */}
          <section id="achievements" className="space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Club Achievements</h2>
              <p className="text-muted-foreground text-sm">Milestones and accomplishments that define our community</p>
            </div>
            <div className="space-y-4">
              {mockAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </section>

          {/* Upcoming Events Section */}
          <section id="events" className="space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Upcoming Events</h2>
              <p className="text-muted-foreground text-sm">Join us for learning, networking, and building together</p>
            </div>
            <div className="space-y-4">
              {mockEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background/50 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-muted-foreground">
          <p>© 2026 Android Club, VIT Chennai. Building exceptional Android developers.</p>
        </div>
      </footer>
    </div>
  );
}
