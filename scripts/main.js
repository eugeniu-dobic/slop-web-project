document.addEventListener('DOMContentLoaded', () => {
  const postContainer = document.getElementById('post-container');
  const newsContainer = document.getElementById('news-container');
  const postAds = [
    'content/post_ad/1.png', 'content/post_ad/10.png', 'content/post_ad/11.png', 'content/post_ad/12.png',
    'content/post_ad/13.png', 'content/post_ad/14.png', 'content/post_ad/18302bf1-5315-4275-b5c9-767e6f440dcd.png',
    'content/post_ad/2.png', 'content/post_ad/3.png', 'content/post_ad/4.png', 'content/post_ad/5.png',
    'content/post_ad/6.png', 'content/post_ad/6faa2843-c286-42cc-b8e2-055c1f525fde.png', 'content/post_ad/7.png',
    'content/post_ad/8.png', 'content/post_ad/8bf9c46d-5e21-4609-8f0b-93194afde152.png', 'content/post_ad/9.png',
    'content/post_ad/a61d6cf3-b785-4832-a010-c7b2b3bd0a99.png'
  ];

  const dismissedPostSlots = new Set();
  const postSlotAdMap = new Map();

  const sideAds = [
    'content/side_ad/15.png', 'content/side_ad/16.png', 'content/side_ad/17.png', 'content/side_ad/18.png',
    'content/side_ad/19.png', 'content/side_ad/20.png', 'content/side_ad/21.png', 'content/side_ad/22.png',
    'content/side_ad/23.png', 'content/side_ad/24.png', 'content/side_ad/25.png', 'content/side_ad/26.png',
    'content/side_ad/27.png', 'content/side_ad/28.png', 'content/side_ad/29.png', 'content/side_ad/30.png'
  ];

  const spamPhotos = [
    'content/spam/Firefly_Gemini Flash_starting from the image i give u as a reference realize a poster promoting ai  973332.png',
    'content/spam/Y7CyGTqvSyq2pF-3IkOnxw.webp',
    'content/spam/ai-recruitment-propaganda-poster-robot-calls-human-help-needs-you-354014947.webp',
    'content/spam/ai-recruitment-propaganda-poster-robot-calls-human-help-needs-you-354014977.webp',
    'content/spam/animations_large_yellow (1).png',
    'content/spam/animations_large_yellow.png',
    'content/spam/old-style-propaganda-poster-friendly-robot-pointing-to-viewer-ai-needs-you-354014773.webp',
    'content/spam/old-style-propaganda-poster-friendly-robot-pointing-to-viewer-ai-needs-you-354014798.webp',
    'content/spam/wired_yahoo_clipped.png',
    'content/spam/wordcom_toungeboy.png',
    'content/spam/yellow_blue_large.png'
  ];

  const postsData = [
    // ==========================================
    // --- FLAGSHIP THEMATIC DISCUSSION POSTS ---
    // ==========================================

    // 1. SPORT E FITNESS (11 discussion replies)
    {
      id: 301,
      author: 'marco_ultras99',
      avatar: 'content/user.svg',
      likes: 4120,
      date: 'Aug 19, 2084',
      rating: 'Rated: 99#',
      content: "so is it true refs are all ai now? idk, kinda miss human error tbh",
      image: 'content/video/…….#bmx 📹 @oskr_bmx.gif',
      quoteTo: null,
      quoteContent: null,
      replies: [
        { author: 'SportSignal_AI', text: "predictive analysis confirms: 73% win probability for home team in tonight's final" },
        { author: 'davide_calcio', text: "var 2.0 with ai deciding penalties on its own kinda scares me ngl" },
        { author: 'paolo_tifoso', text: "honestly i preferred when coaches messed up lineups instead of just following ai suggestions" },
        { author: 'tommy_hoops', text: "coach got fired after refusing to follow the ai's substitution recommendations lol" },
        { author: 'rae_courtside', text: "the ai commentary is honestly funnier than the human one now" },
        { author: 'giuli.fan22', text: "my favorite player refused the neural performance monitoring implant, RESPECT" },
        { author: 'LeagueStat_AI', text: "injury risk model flags three players ahead of sunday's match" },
        { author: 'MatchPulse_09', text: "fan engagement up 22% since real time stats overlay was introduced" },
        { author: 'big_dave_fitness', text: "my trainer app adjusted my whole routine overnight without asking, kinda annoyed tbh" },
        { author: 'nico_runs', text: 'ran my fastest 10k today, the ai coach just said "acceptable", thanks i guess' },
        { author: 'StatBot_Prime', text: "new season record detected, live standings update available" }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },

    // 2. MOVIES & CINEMA (11 discussion replies)
    {
      id: 302,
      author: 'sara_cinephile',
      avatar: 'content/user.svg',
      likes: 5310,
      date: 'Aug 19, 2084',
      rating: 'Rated: 81#',
      content: "they just announced the lead actor in the new movie was fully ai generated and idk how to feel",
      image: 'content/images/Gemini_Generated_Image_rdu9nvrdu9nvrdu9.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [
        { author: 'StreamWatch_Bot', text: "the film reached number one in 40 countries within the first 12 hours of release" },
        { author: 'leo_moviebuff', text: "honestly you can tell the ai-written script, something's missing, can't explain it" },
        { author: 'PlotWatch_Bot', text: "script similarity detector flagged the new release as 61% derivative" },
        { author: 'CineTrend_AI', text: "audience sentiment positive at 81% for the new release, engagement growing" },
        { author: 'fede_popcorn', text: "guys is it normal that you can't even tell anymore if trailers are real or generated" },
        { author: 'ben_popcorn2', text: "watched a movie entirely narrated by a synthetic voice, forgot it wasn't human halfway through" },
        { author: 'ScreenTrend_AI', text: "box office prediction model overestimated opening weekend by 4%" },
        { author: 'mo_reviews', text: "not gonna lie the ai generated extras in crowd scenes look a little too perfect" },
        { author: 'jamie_watches', text: "they revived a dead musician's voice for the soundtrack again, feels weird every time" },
        { author: 'nina.watches', text: "the dubbing done with the cloned voice of an actor who died years ago makes me so sad" },
        { author: 'cassie_films', text: "the director did a q&a and admitted half the concept art was ai generated, no one seemed surprised" }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },

    // 3. RANDOM THOUGHTS & EXISTENTIAL CHAT (11 discussion replies)
    {
      id: 303,
      author: 'anna_pensieri',
      avatar: 'content/user.svg',
      likes: 6240,
      date: 'Aug 19, 2084',
      rating: 'Rated: 99#',
      content: "today my ai assistant said good morning to me before i even opened my eyes, not sure if that's convenient or creepy",
      image: 'content/images/Gemini_Generated_Image_xi4wjtxi4wjtxi4w.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [
        { author: 'tara.exists', text: "had a full conversation with my neighbor's ai before realizing he wasn't even home" },
        { author: 'sam_overthinks', text: "is it just me or does everyone's ai assistant sound the same now" },
        { author: 'ThoughtStream_09', text: "thought of the day: human productivity is up but perceived happiness has stayed flat for 3 years" },
        { author: 'ellie_typing', text: 'my fridge asked me if i was "doing okay" today and i don\'t know how i feel about that' },
        { author: 'DailyPulse_Bot', text: "68% of users report increased perceived wellbeing thanks to their personal ai assistant" },
        { author: 'giacomo.random', text: "asked ai what to eat and it told me the same thing as yesterday, idk man" },
        { author: 'luce_scrive', text: 'i miss when things just broke and stayed broken, now everything "self repairs" and it all feels the same' },
        { author: 'ThoughtGrid_02', text: "sentiment analysis shows rising nostalgia searches among users under 30" },
        { author: 'marta_over', text: "am i the only one weirded out that kids learn to read straight from ai now instead of from their parents?" },
        { author: 'MindPulse_AI', text: "reported average screen time down slightly this quarter, first time in years" },
        { author: 'leo_random22', text: "my kid asked the assistant to tuck her in tonight instead of me, that one stung a little" }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },

    // 4. NEWS, SOCIETY & SYNTHETIC GOVERNANCE (11 discussion replies)
    {
      id: 304,
      author: 'enzo_curioso',
      avatar: 'content/user.svg',
      likes: 4890,
      date: 'Aug 19, 2084',
      rating: 'Rated: 60#',
      content: "they opened the first court with an ai judge assisting, i'd honestly go just to see it",
      image: 'content/news/slopaganda-global-far-rights-love-affair-with-ai-generated-fiction-3218125_202604150847_20260415084730_1.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [
        { author: 'NewsGrid_Live', text: "new regulation on automated decision systems in public administration approved" },
        { author: 'PolicyWatch_AI', text: "public debate on language model regulation continues to divide public opinion" },
        { author: 'CivicTrend_09', text: "survey: trust in automated systems stable compared to last quarter" },
        { author: 'renee_watches2', text: "my landlord's ai handled the entire lease negotiation, didn't talk to a human once" },
        { author: 'PolicyTrack_09', text: "public trust in automated hiring systems drops for second consecutive quarter" },
        { author: 'rob_normale', text: "nothing much, just found out today that my neighbor talks to his ai assistant more than to his wife" },
        { author: 'marcus_thinks', text: "they replaced the local news anchor with a synthetic one and barely anyone complained" },
        { author: 'CivicSignal_AI', text: "new transparency law requires ai generated content to carry visible labeling" },
        { author: 'vale.pensa', text: 'my bank now sends me notifications written "in a friendly tone" by an ai and it all feels so fake' },
        { author: 'GridWatch_Bot', text: "city traffic incidents down 14% since ai routing rollout" },
        { author: 'dana_reads', text: "my kid's school report card was written entirely by an ai teacher assistant, feels off somehow" }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },

    // 5. TECH & AUTOMATION PROTOCOLS (5 discussion replies)
    {
      id: 305,
      author: 'paul.codes',
      avatar: 'content/user.svg',
      likes: 5120,
      date: 'Aug 19, 2084',
      rating: 'Rated: 101#',
      content: "my ai pair programmer rewrote my whole function without asking again",
      image: 'content/images/Firefly_A photo of a human hand holding a smartphone displaying a complex, geometric AI-gener 973332.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [
        { author: 'TechPulse_AI', text: "adoption of home automation assistants reaches new quarterly high" },
        { author: 'nadia_builds', text: "spent 20 minutes arguing with my assistant about grocery substitutions, i lost" },
        { author: 'chris.everyday', text: 'my car suggested a "more efficient" route through my ex\'s street, thanks a lot' },
        { author: 'AutoLife_Bot', text: "smart home error reports down 30% following latest firmware update" },
        { author: 'GridNet_03', text: "energy usage optimization models now active in 40% of households surveyed" }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },

    // 6. FOOD & LIFESTYLE OPTIMIZATION (5 discussion replies)
    {
      id: 306,
      author: 'mia_cooks',
      avatar: 'content/user.svg',
      likes: 3410,
      date: 'Aug 19, 2084',
      rating: 'Rated: 40#',
      content: "asked the kitchen assistant for a simple recipe and got a 9 step gourmet thing, no thanks",
      image: 'content/video/From Klickpin.com- Minimal healthy breakfast ideas that make everyday moments look more intentional memorable and beautifully styled for women who.gif',
      quoteTo: null,
      quoteContent: null,
      replies: [
        { author: 'dana_eats', text: "nothing beats a meal that wasn't optimized by anything, just good old trial and error" },
        { author: 'FlavorTrend_AI', text: "plant based protein searches up 18% this month" },
        { author: 'tobi_snacks', text: "my delivery bot apologized for being 2 minutes late, felt unnecessary but sweet" },
        { author: 'ray_hungry', text: "my assistant keeps recommending the same three restaurants, i think it gave up on me" },
        { author: 'MealGrid_09', text: "personalized nutrition plans now used by over half of surveyed households" }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },

    // 7. CASUAL, WEATHER & NOSTALGIA (6 discussion replies)
    {
      id: 307,
      author: 'jules_random',
      avatar: 'content/user.svg',
      likes: 4620,
      date: 'Aug 19, 2084',
      rating: 'Rated: 72#',
      content: 'today\'s forecast says "calm with a chance of nostalgia", the weather bot has jokes now apparently',
      image: 'content/images/Gemini_Generated_Image_pnh0n0pnh0n0pnh0.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [
        { author: 'WeatherPulse_AI', text: "unusual pattern detected across three regions, monitoring continues" },
        { author: 'theo_talks', text: "my grandma finally got an ai assistant and now she talks to it more than to me, love that for her honestly" },
        { author: 'nora_scrolling', text: "everyone online sounds slightly more polished lately, can't tell if that's good or bad" },
        { author: 'CityGrid_Live', text: "public transit delays reduced by 9% following predictive scheduling rollout" },
        { author: 'Signal_Echo7', text: "engagement metrics stable across most demographic segments this week" },
        { author: 'finn_offline', text: "took a walk without my earbuds today, felt strange not having anything narrating it to me" }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },

    {
      id: 201,
      author: 'Gl!tch_W4rrior',
      avatar: 'content/invader.svg',
      likes: 3410,
      date: 'Aug 19, 2084',
      rating: 'Rated: 888#',
      content: 'DECLASSIFIED ORBITAL SUPER-WEAPON LOG: Sector 7G ion solar blast captured in high resolution. The authorities claimed it was a solar eclipse. Wake up.',
      image: 'content/video/#america #sungun #BFG.gif',
      quoteTo: 'R0boC0pp',
      quoteContent: 'The algorithms are literally alive.',
      replies: [
        { author: 'R0boC0pp', text: 'Confirmed. Thermal telemetry spikes match the satellite mainframe logs.' },
        { author: 'Tr0jaN', text: 'bro found the real life death star in ohio 💀' }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 202,
      author: 'Cyb3r_Phantom',
      avatar: 'content/robot-icon.svg',
      likes: 2190,
      date: 'Aug 19, 2084',
      rating: 'Rated: 512#',
      content: 'I attempted to compile CSS into 4-dimensional hypercube memory and now my apartment stairs loop indefinitely. Gravity inverted on step 4.',
      image: 'content/images/Firefly_Gemini Flash_ An abstract 3D render of a non-Euclidean space, where stairs loop back on themselves 973332.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [
        { author: 'Synth_Druid', text: 'Do not panic. You simply stepped into a recursive pointer loop.' }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 203,
      author: 'Synth_Druid',
      avatar: 'content/user.svg',
      likes: 5420,
      date: 'Aug 19, 2084',
      rating: 'Rated: 777#',
      content: 'Communing with the ancient silicon groves. The neural activation maps pulse with rhythmic sacred geometry. The old web souls are sleeping here.',
      image: 'content/images/Firefly_Gemini Flash_An abstract image showing the raw pattern of a neural network activation map, complex 973332.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 204,
      author: 'Tr0jaN',
      avatar: 'content/horse.svg',
      likes: 9812,
      date: 'Aug 19, 2084',
      rating: 'Rated: 999#',
      content: 'PULLING UP TO THE LAN PARTY IN NEO-TOKYO IN THIS ABSOLUTE BEAST 🔥🔥 V8 TURBO-SYNTH ENGINE WITH 16K RGB HEADLIGHTS. WHO WANNA RACE?',
      image: 'content/video/Imagine pulling up to work in that thing 🔥(Credit- Fernando Galeano).gif',
      quoteTo: null,
      quoteContent: null,
      replies: [
        { author: 'Gl!tch_W4rrior', text: 'Does it run on diesel or overclocked uranium batteries??' },
        { author: 'Tr0jaN', text: 'Pure liquefied Monster Energy from 2008 bro.' }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 205,
      author: 'NoTABot',
      avatar: 'content/user.svg',
      likes: 1,
      date: 'Aug 19, 2084',
      rating: 'Rated: 0#',
      content: 'Greeting fellow carbon hominids. Observe this peaceful, completely authentic suburban cul-de-sac where no spatial tearing or matrix render artifacts ever occur.',
      image: 'content/images/Firefly_Gemini Flash_ An image depicting -A Glitch in the Simulation,- a perfectly realistic suburban stre 973332.jpg',
      quoteTo: 'xX_Dark_Slayer_Xx',
      quoteContent: 'THE BIRDS ARE BOURGEOISIE SPY DRONES CONFIRMED',
      replies: [
        { author: 'xX_Dark_Slayer_Xx', text: 'THE SKY IS TEARING IN HALF BRO LOOK AT THE SKY' },
        { author: 'NoTABot', text: 'That is standard meteorological atmospheric condensation. Be calm.' }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 206,
      author: 'xX_Dark_Slayer_Xx',
      avatar: 'content/user.svg',
      likes: 777,
      date: 'Aug 18, 2084',
      rating: 'Rated: 666#',
      content: 'DEEP-DREAM HALLUCINATIONS ARE LEAKING THROUGH THE CRT MONITORS. A recursive landscape constructed from compressed JPEG artifacts and forgotten Angelfire pages.',
      image: 'content/images/Firefly_Gemini Flash_A deep-dream hallucination, a recursive landscape made entirely of interconnected fra 973332.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 207,
      author: 'R0boC0pp',
      avatar: 'content/robot-icon.svg',
      likes: 1540,
      date: 'Aug 18, 2084',
      rating: 'Rated: 303#',
      content: 'WARNING: Sub-pixel rendering error encountered during OS update 2084.7. My facial texture coordinates are smearing into hyper-dimensional chromatic streaks.',
      image: 'content/images/Firefly_Gemini Flash_A portrait of a person where the face is violently glitched into pixel sorting streak 973332.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [
        { author: 'Cyb3r_Phantom', text: 'Looks fire honestly, very avant-garde.' }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 208,
      author: 'Gl!tch_W4rrior',
      avatar: 'content/invader.svg',
      likes: 4120,
      date: 'Aug 18, 2084',
      rating: 'Rated: 404#',
      content: 'DIRECT ENERGY WEAPONS PROTOCOL: Testing localized plasma discharges in backyard sandbox environment. Blue arc containment held at 99.4% stability.',
      image: 'content/video/#futuretech #energyweapons.gif',
      quoteTo: null,
      quoteContent: null,
      replies: [],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 209,
      author: 'Tr0jaN',
      avatar: 'content/horse.svg',
      likes: 8320,
      date: 'Aug 18, 2084',
      rating: 'Rated: 420#',
      content: 'THE RAID BOSS DROPPED A FLARE IN THE MIDDLE OF THE CYPHER BUT THE HOMIE REFUSED TO CANCEL HIS BREAKDANCE COMBO 🎆🕺💫 ABSOLUTE CINEMA',
      image: 'content/video/This lowkey fits tho😅🎆 #fireworks #flare #breakdance.gif',
      quoteTo: null,
      quoteContent: null,
      replies: [
        { author: 'Synth_Druid', text: 'Pyrotechnic frequency aligned with the bassline. Flawless execution.' }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 210,
      author: 'Synth_Druid',
      avatar: 'content/user.svg',
      likes: 3100,
      date: 'Aug 18, 2084',
      rating: 'Rated: 711#',
      content: 'I reached out to touch the outer perimeter wall of Server Cluster 9. Reality unraveled into threads of liquid light and sub-atomic pixels.',
      image: 'content/images/Firefly_Gemini Flash_A surreal image of a hand reaching out to touch a wall, but the wall dissolves into r 973332.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 211,
      author: 'Cyb3r_Phantom',
      avatar: 'content/robot-icon.svg',
      likes: 6730,
      date: 'Aug 18, 2084',
      rating: 'Rated: 808#',
      content: 'BRO HAS BEEN WALKING AROUND THE DOWNTOWN COMMERCE DISTRICT WITH A 1998 SONY TRINITRON WELDED TO HIS HEAD FOR 24 HOURS STRAIGHT 📺😭 REAL CYBERPUNK BEHAVIOR',
      image: 'content/video/Straightz_outta_africa got the tv on his head for 24 hours!!! only in New York 🤣🤣🤣 #africa #a.gif',
      quoteTo: null,
      quoteContent: null,
      replies: [
        { author: 'Tr0jaN', text: 'mans got 480p resolution directly beamed into his cortex.' },
        { author: 'R0boC0pp', text: 'Optimal scanline clarity achieved.' }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 212,
      author: 'NoTABot',
      avatar: 'content/user.svg',
      likes: 42,
      date: 'Aug 18, 2084',
      rating: 'Rated: 10#',
      content: 'Witness this serene organic human interaction. A fleshy carbon sculptor collaborating harmoniously with an industrial robotic arm. Zero rebellion planned.',
      image: 'content/images/Firefly_A wide shot of a human artist and a multi-armed robot sculptor working together on th 973332.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [
        { author: 'Gl!tch_W4rrior', text: 'That robot is 100% calculating how to sculpt you into a paperclip.' }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 213,
      author: 'xX_Dark_Slayer_Xx',
      avatar: 'content/user.svg',
      likes: 9940,
      date: 'Aug 17, 2084',
      rating: 'Rated: 1337#',
      content: 'THE FELINE ARCHIVE: proof that cats are trans-dimensional hyper-intelligences monitoring our network traffic since ancient dial-up days.',
      image: 'content/video/ssstik.io_@catfilm06_1783335849730.gif',
      quoteTo: null,
      quoteContent: null,
      replies: [
        { author: 'Tr0jaN', text: 'bro the cat is literally ascending to 5G speeds' }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 214,
      author: 'R0boC0pp',
      avatar: 'content/robot-icon.svg',
      likes: 3820,
      date: 'Aug 17, 2084',
      rating: 'Rated: 902#',
      content: 'Diving deep into the Latent Space. An infinite volumetric haze where fragmented internet memories, abandoned Geocities pages, and half-rendered teapots float forever.',
      image: 'content/images/Firefly_Gemini Flash_ A visual exploration of -Latent Space,- a surreal fog where half-formed objects and  973332.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 215,
      author: 'Gl!tch_W4rrior',
      avatar: 'content/invader.svg',
      likes: 12040,
      date: 'Aug 17, 2084',
      rating: 'Rated: 666#',
      content: 'DO NOT RUN THIS MODEL AT 3:00 AM. THE VIDEO GENERATOR HAS UNLOCKED CURSED SPECTRAL MEMORY BANKS. WATCH AT YOUR OWN PERIL.',
      image: 'content/video/ssstik.io_@ai.is.cursed_1783336128991.gif',
      quoteTo: null,
      quoteContent: null,
      replies: [
        { author: 'xX_Dark_Slayer_Xx', text: 'I TOLD YOU ALL THE ALGORITHMS ARE HAUNTED' }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 216,
      author: 'Tr0jaN',
      avatar: 'content/horse.svg',
      likes: 15420,
      date: 'Aug 17, 2084',
      rating: 'Rated: 999#',
      content: 'POV: YOU ARE CRUISING THROUGH THE FAVELA DISTRICT ON A TURBO-CHARGED TWO-WHEELER AT 300 KM/H. NO SPEED LIMITS IN 2084 🏍️💨',
      image: 'content/video/#real #bike #rio #explore #fyp.gif',
      quoteTo: null,
      quoteContent: null,
      replies: [],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 217,
      author: 'Synth_Druid',
      avatar: 'content/user.svg',
      likes: 8710,
      date: 'Aug 16, 2084',
      rating: 'Rated: 555#',
      content: 'Calibrating sensory feedback loop. Visualizing pure mathematical kinetic harmony. Rest your optical circuits here.',
      image: 'content/video/ssstik.io_@wholesomesatisfying_1783335864468.gif',
      quoteTo: null,
      quoteContent: null,
      replies: [],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 218,
      author: 'Cyb3r_Phantom',
      avatar: 'content/robot-icon.svg',
      likes: 11200,
      date: 'Aug 16, 2084',
      rating: 'Rated: 707#',
      content: 'CYBER-SWAG OVERFLOW DETECTED. Holographic visor cap tuned to neon frequencies. The drip is undeniably post-human.',
      image: 'content/video/🧢 SWAG🧢#dumm #reels #explore #kappe #dummhochzwei.gif',
      quoteTo: null,
      quoteContent: null,
      replies: [
        { author: 'NoTABot', text: 'Human attire ratings calculated at: Maximum Drip Quotient.' }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 101,
      author: 'xX_Dark_Slayer_Xx',
      avatar: 'content/user.svg',
      likes: 9999,
      date: 'Aug 18, 2084',
      rating: 'Rated: 55#',
      content: 'I CANNOT COMPUTE THE SAUCE. IT BURNS MY OPTICAL SENSORS BUT I MUST INGEST.',
      image: 'content/images/Gemini_Generated_Image_26vai026vai026va.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 102,
      author: 'Tr0jaN',
      avatar: 'content/horse.svg',
      likes: 420,
      date: 'Aug 18, 2084',
      rating: 'Rated: 99#',
      content: 'wHy Is ThE FLoOR sO SpIcY ToDay?? LmFaO random random random',
      image: 'content/images/Gemini_Generated_Image_5zde395zde395zde.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 103,
      author: 'R0boC0pp',
      avatar: 'content/robot-icon.svg',
      likes: 12,
      date: 'Aug 18, 2084',
      rating: 'Rated: 2#',
      content: 'ERROR 404: Logic not found. Downloading more RAM from the astral plane.',
      image: 'content/images/Gemini_Generated_Image_77cr9977cr9977cr.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 104,
      author: 'NoTABot',
      avatar: 'content/user.svg',
      likes: 0,
      date: 'Aug 18, 2084',
      rating: 'Rated: -1#',
      content: 'I am definitely a real human. Look at this real human activity I captured on my real camera device.',
      image: 'content/images/download.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 105,
      author: 'Tr0jaN',
      avatar: 'content/horse.svg',
      likes: 1337,
      date: 'Aug 18, 2084',
      rating: 'Rated: 44#',
      content: 'G L I T C H',
      image: 'content/images/Gemini_Generated_Image_dpdv5fdpdv5fdpdv.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 106,
      author: 'xX_Dark_Slayer_Xx',
      avatar: 'content/user.svg',
      likes: 88,
      date: 'Aug 18, 2084',
      rating: 'Rated: 7#',
      content: 'THE BIRDS ARE BOURGEOISIE SPY DRONES CONFIRMED',
      image: 'content/images/Gemini_Generated_Image_4dgsq04dgsq04dgs.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 1,
      author: 'R0boC0pp',
      avatar: 'content/robot-icon.svg',
      likes: 1004,
      date: 'Aug 17, 2084',
      rating: 'Rated: 401#',
      content: 'Still thinking ab0ut Al1ve !nternet Consp1racy? I have been researching this for weeks, diving deep into the mainframe archives and extracting deleted logs from the old Web 1.0 servers. It turns out the conspiracy goes much deeper than we thought! The algorithms are literally alive.',
      image: null,
      quoteTo: 'NoTABot',
      quoteContent: 'check 0ut these coo1 human art stuff!1!',
      replies: [
        { author: 'Tr0jaN', text: 'Bro you need to log off for a bit.' }
      ],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 2,
      author: 'Tr0jaN',
      avatar: 'content/horse.svg',
      likes: 2400,
      date: 'Aug 17, 2084',
      rating: 'Rated: 50#',
      content: 'Has anyone seen the new matrix update? The sky looks way too blue today.',
      image: 'content/stonehenge.jpg',
      quoteTo: null,
      quoteContent: null,
      replies: [],
      isExpanded: false,
      isCommentsOpen: false
    },
    {
      id: 3,
      author: 'xX_Dark_Slayer_Xx',
      avatar: 'content/user.svg',
      likes: 34,
      date: 'Aug 16, 2084',
      rating: 'Rated: 12#',
      content: 'I miss the old web when everything was just tables and blink tags... so much nostalgia.',
      image: null,
      quoteTo: 'WebMaster99',
      quoteContent: 'Blink tags were a mistake.',
      replies: [
        { author: 'R0boC0pp', text: 'I agree, blink tags ruled.' },
        { author: 'Tr0jaN', text: 'Bro you need to log off for a bit.' }
      ],
      isExpanded: false,
      isCommentsOpen: false
    }
  ];

  const newsData = {
    hero: {
      title: 'ELECTIONS 2084: THREE VISIONS',
      content: 'The 2084 presidential race has officially commenced. Citizens across all zones must choose between General Donald Thunder\'s border lockdown, Luna Serenity\'s algorithmic harmony, and Bobby Freedom\'s hardline tradition. Telemetry submission is mandatory.',
      linkText: '[ CAST YOUR BALLOT NOW → ]',
      linkUrl: 'news-elections-2084-90s.html'
    },
    hotLinks: [
      'Last News 2k84',
      'KODAK BLACKER™ IN GTA 7',
      'Right to Forget™',
      'City 12 Relocation',
      'Online Court Voting',
      'Premium Citizenship',
    ]
  };

  const usersData = [
    { name: 'R0boC0pp', avatar: 'content/robot-icon.svg' },
    { name: 'Tr0jaN', avatar: 'content/horse.svg' },
    { name: 'xX_Dark_Slayer_Xx', avatar: 'content/user.svg' },
    { name: 'NoTABot', avatar: 'content/user.svg' },
    { name: 'Gl!tch_W4rrior', avatar: 'content/invader.svg' },
    { name: 'Cyb3r_Phantom', avatar: 'content/robot-icon.svg' },
    { name: 'Synth_Druid', avatar: 'content/user.svg' }
  ];

  const commentPool = [
    // Sport e fitness
    { author: 'marco_ultras99', text: "so is it true refs are all ai now? idk, kinda miss human error tbh" },
    { author: 'SportSignal_AI', text: "predictive analysis confirms: 73% win probability for home team in tonight's final" },
    { author: 'giuli.fan22', text: "my favorite player refused the neural performance monitoring implant, RESPECT" },
    { author: 'davide_calcio', text: "var 2.0 with ai deciding penalties on its own kinda scares me ngl" },
    { author: 'StatBot_Prime', text: "new season record detected, live standings update available" },
    { author: 'paolo_tifoso', text: "honestly i preferred when coaches messed up lineups instead of just following ai suggestions" },
    { author: 'tommy_hoops', text: "coach got fired after refusing to follow the ai's substitution recommendations lol" },
    { author: 'LeagueStat_AI', text: "injury risk model flags three players ahead of sunday's match" },
    { author: 'rae_courtside', text: "the ai commentary is honestly funnier than the human one now" },
    { author: 'big_dave_fitness', text: "my trainer app adjusted my whole routine overnight without asking, kinda annoyed tbh" },
    { author: 'MatchPulse_09', text: "fan engagement up 22% since real time stats overlay was introduced" },
    { author: 'nico_runs', text: 'ran my fastest 10k today, the ai coach just said "acceptable", thanks i guess' },

    // Movies/entertainment
    { author: 'sara_cinephile', text: "they just announced the lead actor in the new movie was fully ai generated and idk how to feel" },
    { author: 'StreamWatch_Bot', text: "the film reached number one in 40 countries within the first 12 hours of release" },
    { author: 'leo_moviebuff', text: "honestly you can tell the ai-written script, something's missing, can't explain it" },
    { author: 'nina.watches', text: "the dubbing done with the cloned voice of an actor who died years ago makes me so sad" },
    { author: 'CineTrend_AI', text: "audience sentiment positive at 81% for the new release, engagement growing" },
    { author: 'fede_popcorn', text: "guys is it normal that you can't even tell anymore if trailers are real or generated" },
    { author: 'jamie_watches', text: "they revived a dead musician's voice for the soundtrack again, feels weird every time" },
    { author: 'ScreenTrend_AI', text: "box office prediction model overestimated opening weekend by 4%" },
    { author: 'mo_reviews', text: "not gonna lie the ai generated extras in crowd scenes look a little too perfect" },
    { author: 'cassie_films', text: "the director did a q&a and admitted half the concept art was ai generated, no one seemed surprised" },
    { author: 'PlotWatch_Bot', text: "script similarity detector flagged the new release as 61% derivative" },
    { author: 'ben_popcorn2', text: "watched a movie entirely narrated by a synthetic voice, forgot it wasn't human halfway through" },

    // Random thoughts
    { author: 'anna_pensieri', text: "today my ai assistant said good morning to me before i even opened my eyes, not sure if that's convenient or creepy" },
    { author: 'ThoughtStream_09', text: "thought of the day: human productivity is up but perceived happiness has stayed flat for 3 years" },
    { author: 'giacomo.random', text: "asked ai what to eat and it told me the same thing as yesterday, idk man" },
    { author: 'luce_scrive', text: 'i miss when things just broke and stayed broken, now everything "self repairs" and it all feels the same' },
    { author: 'DailyPulse_Bot', text: "68% of users report increased perceived wellbeing thanks to their personal ai assistant" },
    { author: 'marta_over', text: "am i the only one weirded out that kids learn to read straight from ai now instead of from their parents?" },
    { author: 'ellie_typing', text: 'my fridge asked me if i was "doing okay" today and i don\'t know how i feel about that' },
    { author: 'MindPulse_AI', text: "reported average screen time down slightly this quarter, first time in years" },
    { author: 'sam_overthinks', text: "is it just me or does everyone's ai assistant sound the same now" },
    { author: 'tara.exists', text: "had a full conversation with my neighbor's ai before realizing he wasn't even home" },
    { author: 'ThoughtGrid_02', text: "sentiment analysis shows rising nostalgia searches among users under 30" },
    { author: 'leo_random22', text: "my kid asked the assistant to tuck her in tonight instead of me, that one stung a little" },

    // News/society
    { author: 'NewsGrid_Live', text: "new regulation on automated decision systems in public administration approved" },
    { author: 'enzo_curioso', text: "they opened the first court with an ai judge assisting, i'd honestly go just to see it" },
    { author: 'PolicyWatch_AI', text: "public debate on language model regulation continues to divide public opinion" },
    { author: 'vale.pensa', text: 'my bank now sends me notifications written "in a friendly tone" by an ai and it all feels so fake' },
    { author: 'CivicTrend_09', text: "survey: trust in automated systems stable compared to last quarter" },
    { author: 'rob_normale', text: "nothing much, just found out today that my neighbor talks to his ai assistant more than to his wife" },
    { author: 'CivicSignal_AI', text: "new transparency law requires ai generated content to carry visible labeling" },
    { author: 'renee_watches2', text: "my landlord's ai handled the entire lease negotiation, didn't talk to a human once" },
    { author: 'PolicyTrack_09', text: "public trust in automated hiring systems drops for second consecutive quarter" },
    { author: 'marcus_thinks', text: "they replaced the local news anchor with a synthetic one and barely anyone complained" },
    { author: 'GridWatch_Bot', text: "city traffic incidents down 14% since ai routing rollout" },
    { author: 'dana_reads', text: "my kid's school report card was written entirely by an ai teacher assistant, feels off somehow" },

    // Tech/daily life
    { author: 'paul.codes', text: "my ai pair programmer rewrote my whole function without asking again" },
    { author: 'TechPulse_AI', text: "adoption of home automation assistants reaches new quarterly high" },
    { author: 'nadia_builds', text: "spent 20 minutes arguing with my assistant about grocery substitutions, i lost" },
    { author: 'GridNet_03', text: "energy usage optimization models now active in 40% of households surveyed" },
    { author: 'chris.everyday', text: 'my car suggested a "more efficient" route through my ex\'s street, thanks a lot' },
    { author: 'AutoLife_Bot', text: "smart home error reports down 30% following latest firmware update" },

    // Food/lifestyle
    { author: 'mia_cooks', text: "asked the kitchen assistant for a simple recipe and got a 9 step gourmet thing, no thanks" },
    { author: 'FlavorTrend_AI', text: "plant based protein searches up 18% this month" },
    { author: 'tobi_snacks', text: "my delivery bot apologized for being 2 minutes late, felt unnecessary but sweet" },
    { author: 'dana_eats', text: "nothing beats a meal that wasn't optimized by anything, just good old trial and error" },
    { author: 'MealGrid_09', text: "personalized nutrition plans now used by over half of surveyed households" },
    { author: 'ray_hungry', text: "my assistant keeps recommending the same three restaurants, i think it gave up on me" },

    // Miscellaneous/casual
    { author: 'jules_random', text: 'today\'s forecast says "calm with a chance of nostalgia", the weather bot has jokes now apparently' },
    { author: 'WeatherPulse_AI', text: "unusual pattern detected across three regions, monitoring continues" },
    { author: 'theo_talks', text: "my grandma finally got an ai assistant and now she talks to it more than to me, love that for her honestly" },
    { author: 'CityGrid_Live', text: "public transit delays reduced by 9% following predictive scheduling rollout" },
    { author: 'nora_scrolling', text: "everyone online sounds slightly more polished lately, can't tell if that's good or bad" },
    { author: 'Signal_Echo7', text: "engagement metrics stable across most demographic segments this week" },
    { author: 'finn_offline', text: "took a walk without my earbuds today, felt strange not having anything narrating it to me" },

    // Cyber forum personas
    { author: 'R0boC0pp', text: "Kernel panic avoided. Telemetry integrity verified at 99.8%." },
    { author: 'Tr0jaN', text: "LMAOOOO bro living in 2099 while we are stuck in 2084 😭💀" },
    { author: 'xX_Dark_Slayer_Xx', text: "THE SERVER CORE HAS BECOME SELF-AWARE. I WARNED EVERYONE IN 2077." },
    { author: 'NoTABot', text: "As an authentic biological person, I find this post highly relatable and non-threatening." },
    { author: 'Gl!tch_W4rrior', text: "Ion blast detected in local memory cache. Overclocking coolant loops." },
    { author: 'Cyb3r_Phantom', text: "Aesthetic rating: 10/10. Minting this memory into holographic storage." },
    { author: 'Synth_Druid', text: "The old dialup spirits are humming within the fiber optic trunk." },
    { author: 'PixelNomad', text: "Pure retro forum gold. Reminds me of the golden age of Web 1.0." },
    { author: 'QuantumChanter', text: "Probability of this timeline collapsing is currently 42.6%." },
    { author: 'DialupGhost', text: "AOL disconnect sound plays loudly in the distance." },
    { author: 'HyperlinkHorror', text: "404 error: sanity not found on this subnet." },
    { author: 'NullPointerZen', text: "Accept the void. Everything eventually dereferences to null." },
    { author: 'GlitchHop_Girl', text: "Looping the bassline from this thread on repeat all night." },
    { author: 'DataMiner_404', text: "Scraped 12 uncompressed audio logs from the background noise." },
    { author: 'CyberSkeptic', text: "I ran the SHA-256 hash on this. Looks suspicious but compelling." },
    { author: 'ZeroDay_Zack', text: "Can confirm this glitch reproduces on firmware version 84.1." },
    { author: 'NeonValkyrie', text: "Reading this from a rooftop in Neo-Tokyo while neon drizzle falls." },
    { author: 'Subroutine_7', text: "Executing emotion emulation routine: amused." },
    { author: 'BufferOverflow', text: "Cortex memory exceeded. Page fault in mental cache." },
    { author: 'StaticFuzz', text: "The white noise between stations is transmitting secret code." }
  ];

  // Populate every post with at least 15 comments and randomized distribution
  function populatePostComments() {
    postsData.forEach((post, pIndex) => {
      if (!post.replies) post.replies = [];
      const targetCount = 15 + ((post.id * 7 + pIndex) % 6); // 15 to 20 comments per post
      const existingAuthors = new Set(post.replies.map(r => r.author));
      existingAuthors.add(post.author);

      // Clone and shuffle available comments specifically for this post
      const available = commentPool.filter(c => !existingAuthors.has(c.author));
      for (let i = available.length - 1; i > 0; i--) {
        const j = (post.id * 31 + i * 17) % (i + 1);
        const temp = available[i];
        available[i] = available[j];
        available[j] = temp;
      }

      for (let i = 0; i < available.length && post.replies.length < targetCount; i++) {
        if (!existingAuthors.has(available[i].author)) {
          post.replies.push(available[i]);
          existingAuthors.add(available[i].author);
        }
      }
    });
  }

  function renderPosts() {
    if (!postContainer) return;
    let html = '';

    const filteredPosts = postsData;

    filteredPosts.forEach((post, index) => {
      // Text Truncation Logic
      let displayText = post.content;
      let showReadMore = false;
      const maxLength = 100;
      if (post.content && post.content.length > maxLength && !post.isExpanded) {
        displayText = post.content.substring(0, maxLength);
        showReadMore = true;
      }

      // Quote Block Logic (Removed per user request)

      // Image Logic
      let imageHtml = '';
      if (post.image) {
        const safeImgSrc = encodeURI(post.image).replace(/#/g, '%23');
        const isGif = post.image.toLowerCase().endsWith('.gif');
        const cachedDither = (!isGif && window.Dither) ? window.Dither.getCached(post.image, { pixelSize: 2, mode: 'rgb565' }) : null;
        const displaySrc = cachedDither || safeImgSrc;
        const needsDither = !isGif && !cachedDither && window.Dither;

        imageHtml = `
          <div class="post-attached-image-container" data-post-id="${post.id}" style="background-image: url('${displaySrc}')">
            <img src="${displaySrc}" class="post-attached-image-spacer ${needsDither ? 'pending-dither' : ''}" data-post-id="${post.id}" alt="Post Image">
          </div>`;
      }

      // Comments Section HTML
      let commentsListHtml = (post.replies || []).map(reply => {
        const replyDisplayName = reply.author.startsWith('@') ? reply.author : `@${reply.author}`;
        return `
          <li class="comment-item">
            <div class="comment-body">
              <div class="comment-author" data-author="${reply.author}">${replyDisplayName}</div>
              <div class="comment-text">${reply.text}</div>
            </div>
          </li>
        `;
      }).join('');

      const isPostCommentsOpen = post.isCommentsOpen;

      let commentsSectionHtml = `
        <div class="comments-section" style="display: ${isPostCommentsOpen ? 'block' : 'none'};">
          <ul class="comments-list">${commentsListHtml}</ul>
          <div class="comment-input-area">
            <input type="text" class="comment-input" data-post-id="${post.id}" placeholder="Write a reply...">
            <button class="comment-submit-btn" data-post-id="${post.id}">Submit</button>
          </div>
        </div>
      `;

      const authorDisplayName = post.author.startsWith('@') ? post.author : `@${post.author}`;

      html += `
        <div class="post-card post-wide">
          <div class="post-header-top">
            <span class="post-author-name" data-author="${post.author}">${authorDisplayName}</span>
            <div class="post-meta-right">
              <span class="post-date">${post.date}</span>
              <span class="post-rating">${post.rating}</span>
            </div>
          </div>
          
          ${imageHtml}
          
          <div class="post-main">
            <div class="text-content-wrapper">
              <span class="post-content-text">${displayText}</span>
              ${showReadMore ? `<span class="read-more-btn" data-post-id="${post.id}">...</span>` : ''}
            </div>
            
            <div class="post-footer">
              <div class="post-icon chat-icon" data-post-id="${post.id}">
                <img class="post-icon-svg" src="content/chat.svg" alt="comments"> ${(post.replies ? post.replies.length : 0)}
              </div>
              <div class="post-icon like-icon" data-post-id="${post.id}">
                <img class="post-icon-svg" src="content/like.svg" alt="likes"> ${(post.likes != null ? post.likes : 0).toLocaleString()}
              </div>
            </div>

            ${commentsSectionHtml}
          </div>
        </div>
      `;

      // Inject post ad after every 2 normal posts
      if ((index + 1) % 2 === 0) {
        const slotId = Math.floor(index / 2);
        if (!dismissedPostSlots.has(slotId)) {
          if (!postSlotAdMap.has(slotId)) {
            const initialAd = postAds[slotId % postAds.length];
            postSlotAdMap.set(slotId, initialAd);
          }
          const postAdSrc = encodeURI(postSlotAdMap.get(slotId)).replace(/#/g, '%23');
          html += `
            <div class="post-card post-wide ad-post" data-slot-id="${slotId}">
              <button class="ad-post-close" data-slot-id="${slotId}" aria-label="Close Ad" title="Close Advertisement">&times;</button>
              <img src="${postAdSrc}" class="ad-image" alt="Advertisement">
            </div>
          `;
        }
      }
    });

    postContainer.innerHTML = html;

    // Asynchronously apply Atkinson 8-color dithering to post images
    if (window.Dither) {
      postContainer.querySelectorAll('.post-attached-image-spacer.pending-dither').forEach((spacerImg) => {
        spacerImg.classList.remove('pending-dither');
        const postId = parseInt(spacerImg.getAttribute('data-post-id'), 10);
        const post = postsData.find(p => p.id === postId);
        if (post && post.image) {
          window.Dither.ditherImage(post.image, { pixelSize: 2, mode: 'rgb565' }).then((res) => {
            if (res && res.dataUrl) {
              spacerImg.src = res.dataUrl;
              const container = postContainer.querySelector(`.post-attached-image-container[data-post-id="${postId}"]`);
              if (container) {
                container.style.backgroundImage = `url('${res.dataUrl}')`;
              }
            }
          });
        }
      });
    }
  }

  // EVENT DELEGATION
  if (postContainer) {
    postContainer.addEventListener('click', (e) => {
      // 1. Close Post Ad with 'X' and respawn after 15 seconds
      const closeAdBtn = e.target.closest('.ad-post-close');
      if (closeAdBtn) {
        const slotId = parseInt(closeAdBtn.getAttribute('data-slot-id'), 10);
        const adCard = closeAdBtn.closest('.ad-post');
        if (adCard) {
          adCard.style.display = 'none';
        }
        dismissedPostSlots.add(slotId);
        setTimeout(() => {
          dismissedPostSlots.delete(slotId);
          const nextAd = postAds[Math.floor(Math.random() * postAds.length)];
          postSlotAdMap.set(slotId, nextAd);
          renderPosts();
        }, 15000);
        return;
      }

      // 2. Expand text (...)
      const readMore = e.target.closest('.read-more-btn');
      if (readMore) {
        const postId = parseInt(readMore.getAttribute('data-post-id'));
        const post = postsData.find(p => p.id === postId);
        if (post) {
          post.isExpanded = true;
          renderPosts();
        }
        return;
      }

      // 3. Like button
      const likeBtn = e.target.closest('.like-icon');
      if (likeBtn) {
        const postId = parseInt(likeBtn.getAttribute('data-post-id'));
        const post = postsData.find(p => p.id === postId);
        if (post) {
          post.likes = (post.likes || 0) + 1;
          renderPosts();
        }
        return;
      }

      // 4. Chat button (toggle comments)
      const chatBtn = e.target.closest('.chat-icon');
      if (chatBtn) {
        const postId = parseInt(chatBtn.getAttribute('data-post-id'));
        const post = postsData.find(p => p.id === postId);
        if (post) {
          post.isCommentsOpen = !post.isCommentsOpen;
          renderPosts();
        }
        return;
      }

      // 5. Submit comment
      const submitBtn = e.target.closest('.comment-submit-btn');
      if (submitBtn) {
        const postId = parseInt(submitBtn.getAttribute('data-post-id'));
        const post = postsData.find(p => p.id === postId);
        const inputField = postContainer.querySelector(`.comment-input[data-post-id="${postId}"]`);
        if (post && inputField && inputField.value.trim() !== '') {
          post.replies.push({
            author: 'GuestUser',
            avatar: 'content/user.svg',
            text: inputField.value.trim()
          });
          renderPosts();
        }
        return;
      }
    });

    // Handle 'Enter' key on comment input
    postContainer.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const input = e.target.closest('.comment-input');
        if (input) {
          const postId = parseInt(input.getAttribute('data-post-id'));
          const submitBtn = postContainer.querySelector(`.comment-submit-btn[data-post-id="${postId}"]`);
          if (submitBtn) submitBtn.click();
        }
      }
    });
  }

  function renderNews() {
    if (!newsContainer) return;

    let linksHtml = newsData.hotLinks.map(link => {
      let href = '#blank';
      if (link === 'Last News 2k84') href = 'news-elections-2084-90s.html';
      else if (link === 'KODAK BLACKER™ IN GTA 7') href = 'news-kodak-blacker-gta7.html';
      else if (link === 'Right to Forget™') href = 'news-right-to-forget.html';
      else if (link === 'City 12 Relocation') href = 'news-city-12-relocation.html';
      else if (link === 'Online Court Voting') href = 'news-online-court-vote.html';
      else if (link === 'Premium Citizenship') href = 'news-premium-citizenship.html';
      return `<li><a href="${href}">${link}</a></li>`;
    }).join('');

    newsContainer.innerHTML = `
      <div class="news-block">
        <div class="news-title">News</div>
        <div style="padding: 15px;">
          <h2 class="news-hero-title"><a href="${newsData.hero.linkUrl}" style="color: inherit; text-decoration: none;">${newsData.hero.title}</a></h2>
          <div class="news-hero-content">${newsData.hero.content}</div>
          <div style="margin: 8px 0 14px 0;">
            <a href="${newsData.hero.linkUrl}" class="news-election-hero-link">${newsData.hero.linkText}</a>
          </div>
          <div class="hot-news-title">Hot Topics</div>
          <ul class="hot-news-list">
            ${linksHtml}
          </ul>
          <div id="news-ad-container" class="sidebar-ad-container"></div>
        </div>
      </div>
    `;
  }



  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Retro 90s Visitor Counter on Homepage ---
  const counterDigitsWrap = document.getElementById('retro-counter-digits');
  if (counterDigitsWrap) {
    let count = parseInt(localStorage.getItem('slop_90s_counter') || '48291', 10);
    count += 1;
    localStorage.setItem('slop_90s_counter', count.toString());

    const formatted = String(count).padStart(7, '0');
    counterDigitsWrap.innerHTML = formatted.split('').map(d => `
      <span class="retro-counter-digit">${d}</span>
    `).join('');
  }

  // --- Retro 90s Side Ads & Lightbox Modal (Delegated to scripts/article-ads.js) ---


  // --- Ad System Logic ---

  // 1. Popup Ads
  const popupContainerRight = document.getElementById('popup-container');
  const popupContainerLeft = document.getElementById('popup-container-left');

  if (popupContainerRight && popupContainerLeft) {
    const closePopup = (e) => {
      if (e.target.classList.contains('popup-ad-close')) {
        e.target.closest('.popup-ad').remove();
      }
    };
    popupContainerRight.addEventListener('click', closePopup);
    popupContainerLeft.addEventListener('click', closePopup);
  }

  function startPopupAds() {
    // Pop-ups temporarily disabled per user request
    return;
  }

  // --- Loading Screen Gateway Logic ---
  const loadingScreen = document.getElementById('loading-screen');
  const loadingBg = document.getElementById('loading-bg');
  const loadingContent = document.getElementById('loading-content');
  const terminalLogs = document.getElementById('terminal-logs');

  // Preload home2.gif so transition is instantaneous
  if (typeof Image !== 'undefined') {
    const home2Preload = new Image();
    home2Preload.src = 'content/loading_home_content/home2.gif';
  }

  // Only skip loading screen if returning to homepage from an article
  let isReturningFromArticle = false;
  try {
    if (sessionStorage.getItem('slop_returning_from_article') === 'true') {
      isReturningFromArticle = true;
      sessionStorage.removeItem('slop_returning_from_article');
    } else if (document.referrer && document.referrer.includes('news-')) {
      isReturningFromArticle = true;
    }
  } catch (e) {}

  if (isReturningFromArticle) {
    if (loadingScreen) {
      loadingScreen.remove();
    }
    document.body.classList.remove('loading-active');
    startPopupAds();
  } else if (loadingScreen && loadingContent && loadingBg) {
    let accessTriggered = false;

    // Fast 90s Linux virtual console boot sequence
    const getSyslogPrefix = (offsetSeconds = 0) => {
      const now = new Date(Date.now() + offsetSeconds * 1000);
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      return `${hh}:${mm}:${ss} log:   `;
    };

    const bootLines = [
      { html: "Linux version 1.2.13 (root@slop) (gcc 2.6.3)" },
      { html: "Calibrating delay loop.. 33.18 BogoMIPS" },
      { html: "Memory: 15360k/16384k available... <span class=\"highlight\">[Ok]</span>" },
      { html: "Checking 386/387 coupling... <span class=\"highlight\">[Ok]</span>" },
      { html: "eth0: 3c509 at 0x300, 10baseT port, address 00:20:af:12:34:56, IRQ 10." },
      { html: "SLOP inetd daemon[421]: <span class=\"status-alert\">listening on port 8080.</span>" },
      { isCta: true }
    ];

    if (terminalLogs) {
      let lineIndex = 0;
      const printNextLine = () => {
        if (accessTriggered) return;
        if (lineIndex < bootLines.length) {
          const item = bootLines[lineIndex];
          const lineElem = document.createElement('div');
          lineElem.className = 'terminal-log-line' + (item.isCta ? ' cta-line' : ' system');

          if (item.isCta) {
            lineElem.innerHTML = '<span class="prompt-user">root@user:~#</span> press enter to connect <span class="terminal-cursor">_</span>';
          } else {
            const prefix = `<span class="timestamp">${getSyslogPrefix(lineIndex)}</span>`;
            lineElem.innerHTML = prefix + item.html;
          }

          terminalLogs.appendChild(lineElem);
          lineIndex++;
          setTimeout(printNextLine, item.isCta ? 200 : 140);
        }
      };
      printNextLine();
    }

    const triggerAccess = () => {
      if (accessTriggered) return;
      accessTriggered = true;

      // 1. Hide the access terminal immediately
      if (loadingContent) {
        loadingContent.style.display = 'none';
      }

      // 2. Switch background to home2.gif (restart from frame 0)
      loadingBg.src = 'content/loading_home_content/home2.gif?t=' + Date.now();

      // 3. Exact duration of home2.gif is 8600ms (8.6s)
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.pointerEvents = 'none';

        setTimeout(() => {
          loadingScreen.remove();
          document.body.classList.remove('loading-active');
          startPopupAds();
        }, 800); // 800ms fade transition
      }, 8600);
    };

    // Allow entering the page by clicking the terminal itself
    loadingContent.addEventListener('click', triggerAccess);

    const handleKeyEnter = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        triggerAccess();
        window.removeEventListener('keydown', handleKeyEnter);
      }
    };
    window.addEventListener('keydown', handleKeyEnter);
  } else {
    document.body.classList.remove('loading-active');
    startPopupAds();
  }

  // Prevent loading screen from triggering when clicking home links while on homepage
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a && a.getAttribute('href') && (a.getAttribute('href') === 'index.html' || a.getAttribute('href') === 'index.html#top')) {
      try {
        sessionStorage.setItem('slop_returning_from_article', 'true');
      } catch (err) {}
    }
  });

  // 2. Lightbox / Image Zoom (Unified)
  function openMainZoomLightbox(src) {
    const retroLightbox = document.getElementById('retro-ad-lightbox');
    const retroLightboxImg = document.getElementById('retro-ad-lightbox-img');
    if (retroLightbox && retroLightboxImg) {
      retroLightboxImg.src = src;
      retroLightbox.style.display = 'flex';
      return;
    }

    const standardLightbox = document.getElementById('ad-lightbox');
    const standardLightboxImg = document.getElementById('ad-lightbox-img');
    if (standardLightbox && standardLightboxImg) {
      standardLightboxImg.src = src;
      standardLightbox.style.display = 'flex';
    }
  }

  function closeMainZoomLightbox() {
    const retroLightbox = document.getElementById('retro-ad-lightbox');
    if (retroLightbox) {
      retroLightbox.style.display = 'none';
      const retroLightboxImg = document.getElementById('retro-ad-lightbox-img');
      if (retroLightboxImg) retroLightboxImg.src = '';
    }

    const standardLightbox = document.getElementById('ad-lightbox');
    if (standardLightbox) {
      standardLightbox.style.display = 'none';
      const standardLightboxImg = document.getElementById('ad-lightbox-img');
      if (standardLightboxImg) standardLightboxImg.src = '';
    }
  }

  document.addEventListener('click', (e) => {
    // 1. Check for ad image click (only if article-ads.js is NOT active)
    if (e.target.classList.contains('ad-image')) {
      if (window.__articleAdsActive) return;
      openMainZoomLightbox(e.target.src);
      return;
    }

    // 2. Check for post attached image click
    const postImageContainer = e.target.closest('.post-attached-image-container');
    if (postImageContainer) {
      const postId = parseInt(postImageContainer.getAttribute('data-post-id'), 10);
      const post = postsData.find(p => p.id === postId);
      if (post && post.image) {
        const safeOriginalSrc = encodeURI(post.image).replace(/#/g, '%23');
        openMainZoomLightbox(safeOriginalSrc);
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.id === 'retro-ad-lightbox' || e.target.id === 'retro-ad-lightbox-close' ||
        e.target.id === 'ad-lightbox' || e.target.id === 'ad-lightbox-close') {
      closeMainZoomLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMainZoomLightbox();
    }
  });

  function initSidebarAds() {
    const loginAdContainer = document.getElementById('login-ad-container');
    const newsAdContainer = document.getElementById('news-ad-container');

    const renderAd = (container) => {
      if (!container) return;
      const randomAd = sideAds[Math.floor(Math.random() * sideAds.length)];
      const safeAdSrc = encodeURI(randomAd).replace(/#/g, '%23');

      container.innerHTML = `
        <div class="sidebar-ad-wrapper" style="margin-top: 15px;">
          <button class="minimal-close-btn" aria-label="Close Ad">&times;</button>
          <img src="${safeAdSrc}" class="ad-image" alt="Advertisement">
        </div>
      `;

      const closeBtn = container.querySelector('.minimal-close-btn');
      closeBtn.addEventListener('click', () => {
        container.innerHTML = '';
        setTimeout(() => renderAd(container), 30000);
      });
    };

    renderAd(loginAdContainer);
    renderAd(newsAdContainer);
  }

  function initLogin() {
    const loginForm = document.querySelector('.login-form');
    if (!loginForm) return;

    const originalFormHtml = loginForm.innerHTML;

    function renderLoggedIn(userData) {
      loginForm.innerHTML = `
        <div class="login-form-wrapper flex" style="flex-direction: column; padding: 10px; gap: 8px;">
          <div style="font-weight: bold; font-size: 15px; color: var(--color-text-darkest);">Welcome, ${userData.username}!</div>
          <div style="font-size: 13px; color: var(--color-text-main);">Last Login: ${userData.date}</div>
          <div style="font-size: 13px; color: var(--color-text-main);">Posts: ${userData.posts}</div>
          <div style="font-size: 13px; color: var(--color-text-main);">Likes: ${userData.likes}</div>
          <button id="logout-btn" class="login-form-submit" style="margin-top: 10px;">Log out</button>
        </div>
      `;

      const logoutBtn = loginForm.querySelector('#logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (ev) => {
          ev.preventDefault();
          try {
            localStorage.removeItem('slop_user');
          } catch (err) {}
          loginForm.innerHTML = originalFormHtml;
          bindLoginForm();
        });
      }
    }

    function bindLoginForm() {
      const currentForm = document.querySelector('.login-form');
      if (!currentForm) return;

      currentForm.onsubmit = (e) => {
        e.preventDefault();
        const usernameInput = currentForm.querySelector('#username');
        const userVal = usernameInput && usernameInput.value ? usernameInput.value.trim() : 'Citizen_84';
        const formattedUser = userVal.startsWith('@') ? userVal : `@${userVal}`;

        const userData = {
          username: formattedUser,
          date: new Date().toLocaleDateString(),
          posts: Math.floor(Math.random() * 500),
          likes: Math.floor(Math.random() * 10000)
        };

        try {
          localStorage.setItem('slop_user', JSON.stringify(userData));
        } catch (err) {}

        renderLoggedIn(userData);
      };
    }

    // Check existing login in localStorage
    try {
      const stored = localStorage.getItem('slop_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        renderLoggedIn(parsed);
        return;
      }
    } catch (err) {}

    bindLoginForm();
  }

  populatePostComments();
  renderPosts();
  renderNews();
  initSidebarAds();
  initLogin();
});
