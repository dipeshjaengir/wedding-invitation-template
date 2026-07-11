// Import all local assets to let Vite resolve and bundle them correctly
import monogramImg from '../assets/images/monogram.svg';
import brideImg from '../assets/images/bride.svg';
import groomImg from '../assets/images/groom.svg';
import mandapBgImg from '../assets/images/mandap_bg.svg';

// Story milestones images
import storyProposalImg from '../assets/images/proposal.svg';
import storyFirstDateImg from '../assets/images/first_date.svg';
import storyEngagementImg from '../assets/images/engagement.svg';

// Events images
import eventHaldiImg from '../assets/images/haldi.svg';
import eventMehendiImg from '../assets/images/mehendi.svg';
import eventSangeetImg from '../assets/images/sangeet.svg';
import eventWeddingImg from '../assets/images/wedding.svg';
import eventReceptionImg from '../assets/images/reception.svg';

// Gallery images
import gallery1 from '../assets/images/gallery1.svg';
import gallery2 from '../assets/images/gallery2.svg';
import gallery3 from '../assets/images/gallery3.svg';
import gallery4 from '../assets/images/gallery4.svg';
import gallery5 from '../assets/images/gallery5.svg';
import gallery6 from '../assets/images/gallery6.svg';

// Music file
import backgroundMusic from '../assets/music/instrumental.mp3';

export const weddingData = {
  theme: 'gold',

  // Couple info
  bride: {
    name: 'Ritika',
    fullName: 'Ritika Rathore',
    description: 'A creative soul, lover of classical music, and the light of her family\'s eyes. She brings joy and laughter wherever she goes.',
    image: brideImg,
  },
  groom: {
    name: 'Yogendra',
    fullName: 'Yogendra Shekhawat',
    description: 'Yogendra, son of Mr. Dipesh, is a visionary architect, passionate photographer, and a true gentleman. Guided by warmth, intellect, and timeless values.',
    image: groomImg,
  },

  // Monogram & decorative backgrounds
  monogram: monogramImg,
  mandapBg: mandapBgImg,

  // Schedule & dates
  weddingDate: 'December 18, 2026 10:30:00', // Format for UI countdown
  countdownTarget: '2026-12-18T10:30:00',  // ISO string for dayjs

  // Love Story
  story: [
    {
      id: 1,
      date: 'June 26, 2026',
      title: 'Our First Meeting',
      description: 'In the heart of an old colonial library, we reached for the same poetry collection. A simple smile ignited a conversation that lasted for hours.',
      image: storyFirstDateImg,
    },
    {
      id: 2,
      date: 'April 9, 2026',
      title: 'The Unspoken Bond',
      description: 'Months of shared cups of filter coffee, walks in the rain, and long quiet drives made us realize that home was no longer a place, but a person.',
      image: storyProposalImg,
    },
    {
      id: 3,
      date: 'November 10, 2026',
      title: 'The Engagement',
      description: 'With the blessings of our families and a ring that symbolized eternity, we promised to hold hands and walk through all seasons of life together.',
      image: storyEngagementImg,
    },
  ],

  // Events list
  events: [
    {
      id: 'haldi',
      title: 'Haldi Ceremony',
      subtitle: 'A Splash of Yellow',
      date: 'December 16, 2026',
      time: '10:00 AM onwards',
      venue: 'The Courtyard, Taj Palace',
      address: 'Sardar Patel Marg, Diplomatic Enclave, New Delhi',
      image: eventHaldiImg,
      mapLink: 'https://maps.google.com/?q=Taj+Palace+New+Delhi+Sardar+Patel+Marg',
    },
    {
      id: 'mehendi',
      title: 'Mehendi & High Tea',
      subtitle: 'Threads of Henna',
      date: 'December 16, 2026',
      time: '04:00 PM onwards',
      venue: 'The Grand Lawn, Taj Palace',
      address: 'Sardar Patel Marg, Diplomatic Enclave, New Delhi',
      image: eventMehendiImg,
      mapLink: 'https://maps.google.com/?q=Taj+Palace+New+Delhi+Sardar+Patel+Marg',
    },
    {
      id: 'sangeet',
      title: 'Sangeet Night',
      subtitle: 'Dance & Celebrations',
      date: 'December 17, 2026',
      time: '07:00 PM onwards',
      venue: 'Durbar Hall, Taj Palace',
      address: 'Sardar Patel Marg, Diplomatic Enclave, New Delhi',
      image: eventSangeetImg,
      mapLink: 'https://maps.google.com/?q=Taj+Palace+New+Delhi+Sardar+Patel+Marg',
    },
    {
      id: 'wedding',
      title: 'The Muhurtham',
      subtitle: 'The Wedding Ceremony',
      date: 'December 18, 2026',
      time: '10:30 AM onwards',
      venue: 'The Royal Pavilions, Taj Palace',
      address: 'Sardar Patel Marg, Diplomatic Enclave, New Delhi',
      image: eventWeddingImg,
      mapLink: 'https://maps.google.com/?q=Taj+Palace+New+Delhi+Sardar+Patel+Marg',
    },
    {
      id: 'reception',
      title: 'Grand Reception',
      subtitle: 'The Grand Celebration',
      date: 'December 19, 2026',
      time: '08:00 PM onwards',
      venue: 'Shahjehan Ballroom, Taj Palace',
      address: 'Sardar Patel Marg, Diplomatic Enclave, New Delhi',
      image: eventReceptionImg,
      mapLink: 'https://maps.google.com/?q=Taj+Palace+New+Delhi+Sardar+Patel+Marg',
    },
  ],

  // Gallery images with titles
  gallery: [
    {
      id: 1,
      title: 'A Glimpse of Joy',
      image: gallery1,
    },
    {
      id: 2,
      title: 'Moments of Love',
      image: gallery2,
    },
    {
      id: 3,
      title: 'Laughter Shared',
      image: gallery3,
    },
    {
      id: 4,
      title: 'Hand in Hand',
      image: gallery4,
    },
    {
      id: 5,
      title: 'Whispered Promises',
      image: gallery5,
    },
    {
      id: 6,
      title: 'Elegance & Style',
      image: gallery6,
    },
  ],

  // Venue global information
  venue: {
    name: 'Taj Palace, New Delhi',
    address: 'Sardar Patel Marg, Diplomatic Enclave, New Delhi, Delhi 110021',
    description: 'An iconic luxury palace hotel in New Delhi, embodying the grandeur of Mughal heritage and royal hospitality. The perfect backdrop for our eternal union.',
    mapLink: 'https://maps.google.com/?q=Taj+Palace+New+Delhi+Sardar+Patel+Marg',
  },

  // RSVP Configuration
  rsvp: {
    title: 'RSVP',
    subtitle: 'Share Our Joy',
    note: 'Please respond by November 30, 2026 so we can finalize arrangements for your arrival.',
    successMessage: 'Your RSVP has been submitted with grace. We look forward to celebrating with you!',
  },

  // Contact details
  contact: {
    message: 'For any queries regarding travel, accommodations, or event schedules, please connect with our wedding coordinators.',
    coordinators: [
      { name: 'Muliiiiii (Bride\'s Brother)', phone: '+91 98765 43210' },
      { name: 'Babita (Groom\'s Sister)', phone: '+91 98123 45678' }
    ]
  },

  // Audio settings
  music: {
    file: backgroundMusic,
    title: 'Royal Wedding Instrumental',
  },

  // Social / Family sharing links
  socialLinks: {
    instagramHashtag: '#RitikaWedYogendra',
    hashtagLink: 'https://www.instagram.com/explore/tags/RitikaWedYogendra',
  }
};
