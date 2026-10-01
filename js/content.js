// ─────────────────────────────────────────────────────────────
// ALL page content lives here. Edit text, links and photos in this
// file — no HTML or CSS changes needed for routine updates.
//
// Formatting: wrap text in **double asterisks** to highlight it.
// Sections render in the order listed; reorder, remove or duplicate
// them freely. Available types: about, video, timeline, cards, gallery.
// ─────────────────────────────────────────────────────────────

const YOUTUBE = 'https://www.youtube.com/channel/UCdNdQLkunF5r1ROqwlkOKAQ';

export const site = {
  brand: 'Utkarsh_Off_Syllabus',    // split onto lines after each "_" or space in the hero
  eyebrow: 'The YouTube channel',
  tagline: 'The stuff nobody puts in the syllabus.',

  // Hero buttons. url: null shows a "coming soon" pill; '#id' scrolls to a section.
  // icon: 'youtube' | 'instagram' | 'play' | 'x' | 'linkedin' | 'github' (see js/icons.js)
  // footer: text for the footer link (omit to keep it out of the footer).
  links: [
    { label: 'Watch on YouTube', url: YOUTUBE, icon: 'youtube', primary: true, footer: 'YouTube' },
    { label: 'Video resume', url: '#video-resume', icon: 'play' },
    { label: '@utkarsh_off_syllabus · soon', url: null, icon: 'instagram', footer: 'Instagram' },
  ],

  // Hero portrait. Up to 4 floating badges; `note` shows on hover / tap.
  portrait: {
    src: 'assets/img/portrait.webp',
    alt: 'Utkarsh in a black blazer and white shirt in an office',
    width: 747,
    height: 1024,
    badges: [
      { label: "**NIT** '21", note: 'Graduated from NIT in 2021. Engineering was the plan from day one.' },
      { label: '**SDE**@1.0', note: 'First run as a software engineer, from 2022. A good job — and a question I couldn\'t ignore.' },
      { label: '**UPSC** Aspirant', note: 'Left the job to prepare for UPSC full-time. 1.5 years, no safety net.' },
      { label: '**SDE**@2.0', note: 'Back in tech since 2025, with a very different view of risk, time and ambition.' },
    ],
  },

  sections: [
    {
      type: 'about',
      title: 'About',
      paragraphs: [
        '**Engineer by choice.** I left a good job to prepare for UPSC, spent 1.5 years at it, and came back to tech.',
        'This channel is everything I learned on both sides of that gap.',
      ],
    },
    {
      type: 'video',
      id: 'video-resume',
      title: 'Video resume',
      // Use ONE of these. Leave both empty to show the "coming soon" placeholder.
      youtubeId: '',                    // e.g. 'dQw4w9WgXcQ' from youtube.com/watch?v=dQw4w9WgXcQ (unlisted works)
      src: '',                          // e.g. 'assets/video/resume.mp4' (keep it under ~50 MB)
      poster: '',                       // optional thumbnail for `src`, e.g. 'assets/img/resume-poster.jpg'
      placeholder: 'Video resume **coming soon**.',
      note: '',                         // optional line under the video
    },
    {
      type: 'timeline',
      title: 'The route so far',
      items: [
        { year: '2021', text: 'NIT Graduate' },
        { year: '2022', text: 'SDE@1.0' },
        { year: '2024', text: 'UPSC hustle, no safety net' },
        { year: '2025', text: 'SDE@2.0 with a very different view of risk, time and ambition' },
        { year: 'Now', text: 'Building in public, and talking about the parts of this career nobody prepares you for', current: true },
      ],
    },
    {
      type: 'cards',
      title: "What's here",
      items: [
        { icon: '🎙️', title: 'Conversations', text: 'Long-form talks with people who took strange routes.' },
        { icon: '⚙️', title: 'System Design & DSA', text: 'Interview prep, explained the way I wish someone had explained it to me.' },
        { icon: '💭', title: 'Off Script', text: 'Stories, decisions, and the uncomfortable questions about careers and lives in India.' },
      ],
    },
    {
      type: 'gallery',
      title: 'Off the clock',
      autoplayMs: 4000,                 // 0 to disable auto-rotate
      photos: [
        { src: 'assets/img/mountains.jpg', title: 'Mountains', caption: 'Where the big decisions get made',
          alt: 'Utkarsh silhouetted on a stone wall with snow-capped Himalayan peaks behind' },
        { src: 'assets/img/beach.jpg', title: 'Football', caption: 'Messi supremacy, no debate',
          alt: 'Utkarsh on a beach in a Messi number 10 Argentina jersey, pointing at the sky' },
        { src: 'assets/img/pool.jpg', title: 'Pool', caption: 'Angles, patience, one clean shot',
          alt: 'Utkarsh lining up a pool shot at a green table' },
      ],
    },
  ],
};
