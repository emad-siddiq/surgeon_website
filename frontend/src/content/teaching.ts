import { contact } from './contact';

export const teachingHeading = 'Teaching the next generation of surgeons.';

export const teachingLead =
  'Beyond the operating theatre, Dr. Siddiq invests in the surgical community through a public surgical-education channel, training workshops across Pakistan, and the leadership of an international conference.';

export const youtubeChannel = {
  url: contact.social.youtube,
  handle: '@dr.ghulamsiddiq4770',
  body: 'On his YouTube channel, Dr. Siddiq publishes narrated recordings of his own laparoscopic and bariatric procedures. Each video is captured in theatre and voiced over with the reasoning behind the operation: why this approach, what to watch for, and how the key decisions were made. The channel is offered as a working reference for surgeons in training.',
  cta: 'Visit the channel',
};

/**
 * Podcast series published on the same channel. The playlist id is an
 * old-style short YouTube id, verified resolving 2026-08-01 (page title
 * "My Journey with Laparoscopic and Bariatric Surgery - YouTube").
 */
export const podcast = {
  title: 'My Journey with Laparoscopic and Bariatric Surgery',
  playlistUrl: 'https://www.youtube.com/playlist?list=PLWiwfcR9mm1g',
  /** Direct link supplied by the practice; opens the series mid-run (Episode 7). */
  episodeUrl: 'https://www.youtube.com/watch?v=oMffUttqG3s&list=PLWiwfcR9mm1g',
  body: 'Alongside the surgical library, Dr. Siddiq records a serialised podcast in which he tells the story of his life in surgery: the training years, the cases that shaped his practice, and the people behind the operating lists, one episode at a time, in his own words.',
  cta: 'Listen to the series',
  note: 'Episodes are published on the YouTube channel.',
};

/** Compact copy for the Home page media teaser (#home-media). */
export const mediaTeaser = {
  eyebrow: 'Beyond the operating theatre',
  heading: 'Watch the surgery. Hear the story.',
  channelCard: {
    title: 'Surgical education on YouTube',
    body: 'Narrated laparoscopic and bariatric cases, recorded in theatre and voiced over with the reasoning behind the key decisions.',
    cta: 'Visit the channel',
  },
  podcastCard: {
    title: podcast.title,
    body: 'A serialised podcast in which Dr. Siddiq reflects on a life in surgery, episode by episode, in his own words.',
    cta: 'Listen on YouTube',
  },
  moreLink: 'More about teaching & education',
};
