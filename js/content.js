// ─────────────────────────────────────────────────────────────
// ALL page content lives here. Edit text, links and photos in this
// file — no HTML or CSS changes needed for routine updates.
//
// Formatting: wrap text in **double asterisks** to highlight it.
// Sections render in the order listed; reorder, remove or duplicate
// them freely. Available types: about, timeline, cards, gallery.
// ─────────────────────────────────────────────────────────────

const YOUTUBE = 'https://www.youtube.com/channel/UCdNdQLkunF5r1ROqwlkOKAQ';

export const site = {
  brand: 'Off Syllabus',            // each word goes on its own line in the hero
  owner: 'Utkarsh',
  eyebrow: 'A channel by Utkarsh',
  tagline: 'The stuff nobody puts in the syllabus.',

  // Hero buttons. Set url: null to show a "coming soon" pill instead of a link.
  // icon: 'youtube' | 'instagram' | 'x' | 'linkedin' | 'github' (see js/icons.js)
  links: [
    { label: 'Watch on YouTube', url: YOUTUBE, icon: 'youtube', primary: true, footer: 'YouTube' },
    { label: '@utkarsh_off_syllabus · soon', url: null, icon: 'instagram', footer: 'Instagram' },
  ],

  // Hero portrait. Up to 3 floating badges.
  portrait: {
    src: 'assets/img/portrait.webp',
    alt: 'Utkarsh in a black blazer and white shirt in an office',
    width: 747,
    height: 1024,
    badges: ["**NIT** '21", 'Ex-**UPSC** aspirant', '**SDE**@2.0'],
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
