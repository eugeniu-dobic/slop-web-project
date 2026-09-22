document.addEventListener('DOMContentLoaded', () => {
  const postContainer = document.getElementById('post-container');
  const newsContainer = document.getElementById('news-container');
  const postAds = [
    'content/post_ad/1.jpg', 'content/post_ad/10.jpg', 'content/post_ad/11.jpg', 'content/post_ad/12.jpg',
    'content/post_ad/13.jpg', 'content/post_ad/14.jpg', 'content/post_ad/18302bf1-5315-4275-b5c9-767e6f440dcd.jpg',
    'content/post_ad/2.jpg', 'content/post_ad/3.jpg', 'content/post_ad/4.jpg', 'content/post_ad/5.jpg',
    'content/post_ad/6.jpg', 'content/post_ad/6faa2843-c286-42cc-b8e2-055c1f525fde.jpg', 'content/post_ad/7.jpg',
    'content/post_ad/8.jpg', 'content/post_ad/8bf9c46d-5e21-4609-8f0b-93194afde152.jpg', 'content/post_ad/9.jpg',
    'content/post_ad/a61d6cf3-b785-4832-a010-c7b2b3bd0a99.jpg'
  ];

  const dismissedPostSlots = new Set();
  const postSlotAdMap = new Map();
  let loreTimerStarted = false;
  let loreCloseCount = 0;
  let loreRespawnTimeout = null;
  let loginReminderTimeout = null;

  const sideAds = [
    'content/side_ad/15.jpg', 'content/side_ad/16.jpg', 'content/side_ad/17.jpg', 'content/side_ad/18.jpg',
    'content/side_ad/19.jpg', 'content/side_ad/20.jpg', 'content/side_ad/21.jpg', 'content/side_ad/22.jpg',
    'content/side_ad/23.jpg', 'content/side_ad/24.jpg', 'content/side_ad/25.jpg', 'content/side_ad/26.jpg',
    'content/side_ad/27.jpg', 'content/side_ad/28.jpg', 'content/side_ad/29.jpg', 'content/side_ad/30.jpg'
  ];

  const postsData = [
    {
      "id": 352,
      "author": "Tr0jaN",
      "avatar": "content/misc/user.svg",
      "likes": 18340,
      "date": "Aug 15, 2084",
      "rating": "Rated: 999#",
      "content": "my last two braincells trying to make coffee on a monday morning. lmfaooo who even came up with this",
      "image": "content/video/meme1.webp",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "xX_Dark_Slayer_Xx",
          "text": "me trying to find my car keys while already running ten minutes late"
        },
        {
          "author": "Gl!tch_W4rrior",
          "text": "pure chaos, haven't laughed this hard all day"
        },
        {
          "author": "BufferOverflow",
          "text": "poured cold water into my oatmeal this morning, this is painfully relatable"
        },
        {
          "author": "fede_popcorn",
          "text": "mondays should be banned by law honestly"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "author": "feed_shitposter_supreme",
      "avatar": "content/misc/user.svg",
      "likes": 125000,
      "date": "Nov 4, 2084",
      "rating": "Rated: 99#",
      "content": "latest leaked photo from the rocket testing facility. executive leadership claims aerodynamic efficiency has improved by thirty-four percent.",
      "image": "content/images/img9.jpg",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "mars_colonist",
          "text": "the starship launch will have to wait, new corporate milestones just dropped"
        },
        {
          "author": "orbit_watcher",
          "text": "the olive green shirt is holding on for dear life"
        },
        {
          "author": "rocket_engineer",
          "text": "payload capacity calculations need to be completely revised now"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false,
      "id": 353
    },
    {
      "id": 354,
      "author": "R0boC0pp",
      "avatar": "content/misc/user.svg",
      "likes": 13910,
      "date": "Aug 15, 2084",
      "rating": "Rated: 911#",
      "content": "stuck in morning rush hour and looked over to see a t-rex driving a convertible next to me. he even signaled before merging into my lane, respect",
      "image": "content/video/t_rex_driving_in_town.webp",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "Tr0jaN",
          "text": "bro has better road manners than 90% of drivers on the highway"
        },
        {
          "author": "Gl!tch_W4rrior",
          "text": "how are his little arms even reaching the steering wheel lmao"
        },
        {
          "author": "CityGrid_Live",
          "text": "traffic was backed up for miles because everyone slowed down to take photos"
        },
        {
          "author": "chris.everyday",
          "text": "at least he wears his seatbelt, a responsible citizen"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "id": 304,
      "author": "marco_ultras99",
      "avatar": "content/misc/user.svg",
      "likes": 4120,
      "date": "Aug 19, 2084",
      "rating": "Rated: 99#",
      "content": "is it just me or do referees miss the most obvious calls lately? kinda miss the old days when you could at least blame human error honestly",
      "image": "content/video/video43.webp",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "SportSignal_AI",
          "text": "expect a call from RedBull team lol :)"
        },
        {
          "author": "RedBull Official",
          "text": "Hello there"
        },
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "id": 301,
      "author": "sara_cinephile",
      "avatar": "content/misc/user.svg",
      "likes": 7890,
      "date": "Aug 19, 2084",
      "rating": "Rated: 81#",
      "content": "they just announced the star of that new blockbuster isn't even a real person and now she's posting daily gym selfies like she actually lives in my city.",
      "image": "content/images/hot_woman_posting_selfie.jpg",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "StreamWatch_Bot",
          "text": "the film reached number one in 40 countries within the first 12 hours of release"
        },
        {
          "author": "leo_moviebuff",
          "text": "honestly you can tell when a script is rushed, something's missing, can't explain it"
        },
        {
          "author": "CineTrend_AI",
          "text": "audience reviews have been surprisingly positive for the new sequel"
        },
        {
          "author": "fede_popcorn",
          "text": "guys is it normal that you can't even tell anymore who is real and who isn't"
        },
        {
          "author": "ben_popcorn2",
          "text": "her follower count is higher than any real actress right now, this is so wild"
        },
        {
          "author": "jamie_watches",
          "text": "they remade that classic 90s thriller again, why can't we have original stories anymore"
        },
        {
          "author": "mo_reviews",
          "text": "not gonna lie the crowd scenes in that blockbuster looked a little too clean"
        },
        {
          "author": "cassie_films",
          "text": "the director did a q&a and admitted half the scenes were improvised on set"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "id": 302,
      "author": "Cyb3r_Phantom",
      "avatar": "content/misc/user.svg",
      "likes": 11450,
      "date": "Aug 19, 2084",
      "rating": "Rated: 777#",
      "content": "can we talk about this coat though?? the pope pulled up looking like he's about to drop the biggest winter album of the century.",
      "image": "content/images/cool_pope.jpg",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "Tr0jaN",
          "text": "pope got more style than anyone in this entire city honestly"
        },
        {
          "author": "fede_popcorn",
          "text": "i swear i saw this exact puffer jacket in a designer shop window downtown yesterday"
        },
        {
          "author": "NoTABot",
          "text": "An exceptionally warm winter garment, 10/10 presentation."
        },
        {
          "author": "jules_random",
          "text": "whoever picked this outfit deserves a raise immediately"
        },
        {
          "author": "PixelNomad",
          "text": "walking into Sunday mass with maximum confidence"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "id": 306,
      "author": "jules_random",
      "avatar": "content/misc/user.svg",
      "likes": 8320,
      "date": "Aug 19, 2084",
      "rating": "Rated: 72#",
      "content": "late night walk downtown in the rain. the neon lights reflecting on the wet pavement make everything look like a movie scene. so peaceful when the streets are empty.",
      "image": "content/images/midnightstreets_japan_future.jpg",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "NeonValkyrie",
          "text": "the city at 3 am hits completely different, love the quiet"
        },
        {
          "author": "nora_scrolling",
          "text": "those reflections on the asphalt are gorgeous"
        },
        {
          "author": "finn_offline",
          "text": "took a walk without headphones today, just listening to the rain, felt amazing"
        },
        {
          "author": "theo_talks",
          "text": "best feeling ever after a super long week"
        },
        {
          "author": "CityGrid_Live",
          "text": "late night rainy walks clear your head better than anything else"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "id": 308,
      "author": "mia_cooks",
      "avatar": "content/misc/user.svg",
      "likes": 3410,
      "date": "Aug 19, 2084",
      "rating": "Rated: 40#",
      "content": "just wanted a quick 10-minute dinner idea and found a recipe with 25 ingredients and two hours of prep time. no thanks, making grilled cheese instead",
      "image": "content/video/video30.webp",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "dana_eats",
          "text": "nothing beats a quick meal you just threw together in five minutes with whatever is in the fridge"
        },
        {
          "author": "tobi_snacks",
          "text": "every recipe blog has a 4-page essay about childhood memories before telling you how to boil pasta"
        },
        {
          "author": "ray_hungry",
          "text": "grilled cheese with a little garlic butter on the outside never fails"
        },
        {
          "author": "MealGrid_09",
          "text": "comfort food wins every single time honestly"
        },
        {
          "author": "FlavorTrend_AI",
          "text": "i just ordered takeout, couldn't even be bothered to wash a pan tonight"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "id": 309,
      "author": "Synth_Druid",
      "avatar": "content/misc/user.svg",
      "likes": 3100,
      "date": "Aug 18, 2084",
      "rating": "Rated: 711#",
      "content": "found this interactive light wall at the gallery downtown. when you touch the surface it feels like dipping your hand right into liquid rainbows",
      "image": "content/images/Firefly_Gemini Flash_A surreal image of a hand reaching out to touch a wall, but the wall dissolves into r 973332.jpg",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "HyperlinkHorror",
          "text": "interactive art shows are getting so creative these days"
        },
        {
          "author": "R0boC0pp",
          "text": "looks like dipping your hand straight into a pool of glowing water"
        },
        {
          "author": "sara_cinephile",
          "text": "which gallery is this?? i need to visit this weekend"
        },
        {
          "author": "marta_over",
          "text": "taking my little sister there on Saturday, she's gonna love this"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "id": 310,
      "author": "NoTABot",
      "avatar": "content/misc/user.svg",
      "likes": 2042,
      "date": "Aug 18, 2084",
      "rating": "Rated: 10#",
      "content": "visited a local sculpture workshop today. the artist brought in an automated helper arm to reach the highest corners of the marble statue. the detail on this piece is breathtaking!",
      "image": "content/images/Firefly_A wide shot of a human artist and a multi-armed robot sculptor working together on th 973332.jpg",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "Gl!tch_W4rrior",
          "text": "saving your back from years of heavy lifting honestly makes total sense"
        },
        {
          "author": "Synth_Druid",
          "text": "The smooth marble texture in that light is stunning."
        },
        {
          "author": "paul.codes",
          "text": "mixing classic stone carving with modern workshop tools is pretty smart"
        },
        {
          "author": "sara_cinephile",
          "text": "can't wait to see the finished statue when it's polished"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "id": 312,
      "author": "Gl!tch_W4rrior",
      "avatar": "content/misc/user.svg",
      "likes": 7410,
      "date": "Aug 19, 2084",
      "rating": "Rated: 888#",
      "content": "tried making homemade fireworks in the backyard and accidentally set off the loudest boom in town. pretty sure the whole neighborhood thinks a storm hit.",
      "image": "content/video/crazy_explosion_gun.webp",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "Tr0jaN",
          "text": "bro i felt that rumble from three blocks away, what were you making."
        },
        {
          "author": "R0boC0pp",
          "text": "My windows shook for five solid seconds, unbelievable."
        },
        {
          "author": "Synth_Druid",
          "text": "Good thing the fence is still standing at least."
        },
        {
          "author": "ZeroDay_Zack",
          "text": "next time maybe warn the neighbors before testing backyard projects lol"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "id": 311,
      "author": "R0boC0pp",
      "avatar": "content/misc/user.svg",
      "likes": 3820,
      "date": "Aug 17, 2084",
      "rating": "Rated: 902#",
      "content": "woke up early and caught the valley covered in this thick, dreamlike morning fog. looks like walking right inside a painting where everything is quiet and still.",
      "image": "content/images/Firefly_Gemini Flash_ A visual exploration of -Latent Space,- a surreal fog where half-formed objects and  973332.jpg",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "Synth_Druid",
          "text": "Morning fog like that is so calm, makes you want to sip tea and read all day."
        },
        {
          "author": "DialupGhost",
          "text": "such a peaceful atmosphere, great photo"
        },
        {
          "author": "finn_offline",
          "text": "nothing beats waking up before the rest of the world makes noise"
        },
        {
          "author": "jules_random",
          "text": "looks like a movie opening scene, so serene"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "id": 316,
      "author": "Tr0jaN",
      "avatar": "content/misc/user.svg",
      "likes": 9812,
      "date": "Aug 19, 2084",
      "rating": "Rated: 999#",
      "content": "pulling up to the weekend meetup in this absolute monster - bright purple paint job and huge wheels, who wants a ride??",
      "image": "content/video/crazy_purple_truck.webp",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "Gl!tch_W4rrior",
          "text": "good luck finding a parking spot big enough for that monster"
        },
        {
          "author": "Tr0jaN",
          "text": "who needs a parking spot when you can just drive over the curb"
        },
        {
          "author": "ZeroDay_Zack",
          "text": "that purple color looks crazy under the streetlights"
        },
        {
          "author": "paul.codes",
          "text": "can hear that engine rumbling from two miles away"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "author": "equine_lifestyle_84",
      "avatar": "content/misc/user.svg",
      "likes": 88420,
      "date": "Oct 28, 2084",
      "rating": "Rated: 99#",
      "content": "woke up like this. morning sunlight hits different when your daily skincare routine consists of eating pasture grass and sleeping twelve hours uninterrupted.",
      "image": "content/images/horse_selfie_in_bed_morning_beauty_routine.jpg",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "barn_gossip",
          "text": "bro got human arms now? the genetics clinic went crazy this week"
        },
        {
          "author": "sleepy_sarah",
          "text": "more photogenic than ninety percent of my friends tbh"
        },
        {
          "author": "clover_king",
          "text": "what conditioner do you use on that mane asking for myself"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false,
      "id": 317
    },
    {
      "id": 320,
      "author": "Tr0jaN",
      "avatar": "content/misc/user.svg",
      "likes": 8320,
      "date": "Aug 18, 2084",
      "rating": "Rated: 420#",
      "content": "someone lit a sparkler in the middle of the dance battle and my friend didn't even flinch, hit every single move on beat. absolute legend",
      "image": "content/video/break_dance_with_fireworks.webp",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "Synth_Druid",
          "text": "The timing on that spin was unbelievable honestly."
        },
        {
          "author": "GlitchHop_Girl",
          "text": "crowd went completely crazy right after, best night ever"
        },
        {
          "author": "fede_popcorn",
          "text": "how do people even practice moves like that without getting dizzy"
        },
        {
          "author": "rae_courtside",
          "text": "energy at that cypher was completely off the charts"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "author": "diplomatic_leaks_raw",
      "avatar": "content/misc/user.svg",
      "likes": 98700,
      "date": "Nov 3, 2084",
      "rating": "Rated: 99#",
      "content": "alleged photo circulating from private diplomatic jet transit between regional summits. beverage service seems to be progressing ahead of schedule.",
      "image": "content/images/img12.jpg",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "geo_analyst",
          "text": "the bright striped sweater paired with the yellow hazmat coat is peak high diplomacy"
        },
        {
          "author": "fizzy_soda_fan",
          "text": "mixing grape medicine into sprite at thirty thousand feet is legendary behavior"
        },
        {
          "author": "world_observer",
          "text": "summit negotiations are definitely going to be relaxed today"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false,
      "id": 341
    },
    {
      "author": "golden_retriever_mom",
      "avatar": "content/misc/user.svg",
      "likes": 83400,
      "date": "Oct 29, 2084",
      "rating": "Rated: 98#",
      "content": "just unboxed the pawsync module for nova! her collar now syncs her mood directly to my phone so i know exactly when she wants belly rubs versus peanut butter.",
      "image": "content/images/i24.png",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "vet_dan",
          "text": "longer lifespan feature alone makes it totally worth the upgrade"
        },
        {
          "author": "dog_park_regular",
          "text": "is that glowing earbud comfortable for her? she looks super happy though"
        },
        {
          "author": "pet_lover_99",
          "text": "same love new intelligence, modern pet parenting is wild"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false,
      "id": 327
    },
    {
      "id": 328,
      "author": "xX_Dark_Slayer_Xx",
      "avatar": "content/misc/user.svg",
      "likes": 9940,
      "date": "Aug 17, 2084",
      "rating": "Rated: 1337#",
      "content": "my cat has been staring blankly at the ceiling corner for 45 minutes straight. i swear cats can see ghosts that we have no clue about.",
      "image": "content/video/video26.webp",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "Tr0jaN",
          "text": "mine does that and then randomly sprints across the hallway at 3 am"
        },
        {
          "author": "R0boC0pp",
          "text": "Probably just heard a tiny moth behind the curtains."
        },
        {
          "author": "tara.exists",
          "text": "mine looked at an empty closet door like someone was standing there, creeped me out so bad"
        },
        {
          "author": "ellie_typing",
          "text": "cats live in their own little world honestly"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "author": "gourmet_critic_leo",
      "avatar": "content/misc/user.svg",
      "likes": 29800,
      "date": "Nov 3, 2084",
      "rating": "Rated: 89#",
      "content": "dinner tonight at Savor The Next. the mechanical arm placed each microscopic herb with laser precision while everyone at the table spent ten minutes taking photos.",
      "image": "content/images/i25.png",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "foodie_sam",
          "text": "did the food actually taste good or was it just built for photography"
        },
        {
          "author": "chef_marco",
          "text": "ai chef plate perfect series strikes again, nobody even talks to waiters anymore"
        },
        {
          "author": "wine_enthusiast",
          "text": "the presentation is art honestly, look at that sauce drizzle"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false,
      "id": 329
    },
    {
      "author": "hypestream_gaming",
      "avatar": "content/misc/user.svg",
      "likes": 92300,
      "date": "Oct 31, 2084",
      "rating": "Rated: 99#",
      "content": "i'm not jobless, i'm an entrepreneur",
      "image": "content/images/i30.png",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "chat_mod",
          "text": "kinda jobless to me"
        },
        {
          "author": "gamer_girl_22",
          "text": "nah jobless"
        },
        {
          "author": "deleted_user_1",
          "text": "[comment deleted]"
        },
        {
          "author": "deleted_user_2",
          "text": "[comment deleted]"
        },
        {
          "author": "deleted_user_3",
          "text": "[comment deleted]"
        },
        {
          "author": "deleted_user_4",
          "text": "[comment deleted]"
        },
        {
          "author": "deleted_user_5",
          "text": "[comment deleted]"
        },
        {
          "author": "deleted_user_6",
          "text": "[comment deleted]"
        },
        {
          "author": "deleted_user_7",
          "text": "[comment deleted]"
        },
        {
          "author": "deleted_user_8",
          "text": "[comment deleted]"
        },
        {
          "author": "deleted_user_9",
          "text": "[comment deleted]"
        },
        {
          "author": "deleted_user_10",
          "text": "[comment deleted]"
        },
        {
          "author": "deleted_user_11",
          "text": "[comment deleted]"
        },
        {
          "author": "deleted_user_12",
          "text": "[comment deleted]"
        },
        {
          "author": "deleted_user_13",
          "text": "[comment deleted]"
        },
        {
          "author": "deleted_user_14",
          "text": "[comment deleted]"
        },
        {
          "author": "Phil Mapusi",
          "text": "ok your not jobless, just unemployed"
        },
        {
          "author": "deleted_user_15",
          "text": "[comment deleted]"
        },
        {
          "author": "deleted_user_16",
          "text": "[comment deleted]"
        },
      ],
      "isExpanded": false,
      "isCommentsOpen": true,
      "id": 331
    },
    {
      "id": 332,
      "author": "Gl!tch_W4rrior",
      "avatar": "content/misc/user.svg",
      "likes": 12040,
      "date": "Aug 17, 2084",
      "rating": "Rated: 666#",
      "content": "stumbled upon this weird spooky video online at 3 am and now there's no way i'm falling asleep tonight. send wholesome pet videos please",
      "image": "content/video/video21.webp",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "xX_Dark_Slayer_Xx",
          "text": "why do we always find the spookiest stuff right before going to bed"
        },
        {
          "author": "HyperlinkHorror",
          "text": "go watch funny animal videos for 10 minutes, works every time"
        },
        {
          "author": "fede_popcorn",
          "text": "turning on all the hallway lights right now, thanks a lot"
        },
        {
          "author": "Tr0jaN",
          "text": "definitely checking under the bed before sleeping tonight lol"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "id": 336,
      "author": "Synth_Druid",
      "avatar": "content/misc/user.svg",
      "likes": 8710,
      "date": "Aug 16, 2084",
      "rating": "Rated: 555#",
      "content": "could stare at this satisfying rhythm loop for hours honestly. if you had a stressful day, take a deep breath and just relax for a minute",
      "image": "content/video/video39.webp",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "QuantumChanter",
          "text": "oddly satisfying to watch, so soothing"
        },
        {
          "author": "NullPointerZen",
          "text": "definitely needed this after a hectic day at work"
        },
        {
          "author": "luce_scrive",
          "text": "saved this to watch whenever i feel overwhelmed"
        },
        {
          "author": "anna_pensieri",
          "text": "so calming, feels like a mini meditation break"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "author": "urban_explorer_k",
      "avatar": "content/misc/user.svg",
      "likes": 45300,
      "date": "Oct 26, 2084",
      "rating": "Rated: 86#",
      "content": "pressed my hand against an old brick building behind the transit station and the surface started breaking apart into bright colored pixels. reality texture is getting thin around here.",
      "image": "content/images/img10.jpg",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "graffiti_artist",
          "text": "saw this near sector 4 yesterday, thought my sunglasses were malfunctioning"
        },
        {
          "author": "city_maintenance",
          "text": "please report all crumbling physical surfaces to the municipal bureau immediately"
        },
        {
          "author": "curious_cat",
          "text": "touch it again and see if your hand goes through to the other side"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false,
      "id": 338
    },
    {
      "author": "luxury_snack_co",
      "avatar": "content/misc/user.svg",
      "likes": 27400,
      "date": "Nov 4, 2084",
      "rating": "Rated: 85#",
      "content": "fresh organic raspberries dipped in edible warm gold glaze. the perfect afternoon treat for citizens who appreciate the finer textures of life.",
      "image": "content/images/img11.jpg",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "sweet_tooth",
          "text": "looks almost too pretty to eat, like a tiny jewel from a museum"
        },
        {
          "author": "dentist_dave",
          "text": "my teeth hurt just looking at that heavy gold drip lol"
        },
        {
          "author": "kitchen_hacks",
          "text": "how do you even melt gold that smoothly over cold fruit"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false,
      "id": 339
    },
    {
      "id": 340,
      "author": "Cyb3r_Phantom",
      "avatar": "content/misc/user.svg",
      "likes": 11200,
      "date": "Aug 16, 2084",
      "rating": "Rated: 707#",
      "content": "found this crazy glowing visor hat at a thrift store downtown easily the coolest piece in my closet now, who's ready for the weekend?",
      "image": "content/video/video45.webp",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "NoTABot",
          "text": "Looks very bright and flashy! Great thrift find."
        },
        {
          "author": "Tr0jaN",
          "text": "that hat is crazy, you're definitely gonna stand out in the crowd"
        },
        {
          "author": "PixelNomad",
          "text": "thrift shops in that district always have the wildest hidden gems"
        },
        {
          "author": "GlitchHop_Girl",
          "text": "need to find one in neon green for the festival next month"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "author": "turtle_sanctuary_keeper",
      "avatar": "content/misc/user.svg",
      "likes": 81900,
      "date": "Oct 25, 2084",
      "rating": "Rated: 97#",
      "content": "walked into the living room and found the squad gathered around the old tube television completely captivated by their heroes.",
      "image": "content/images/img14.jpg",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "pizza_fanatic",
          "text": "the one looking back at the camera definitely wants a slice of pepperoni"
        },
        {
          "author": "retro_collector",
          "text": "that wood grain crt television still has an incredible picture quality"
        },
        {
          "author": "shell_gang",
          "text": "cowabunga vibes only in this household"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false,
      "id": 342
    },
    {
      "author": "brooklyn_sidewalk_watch",
      "avatar": "content/misc/user.svg",
      "likes": 53200,
      "date": "Nov 2, 2084",
      "rating": "Rated: 91#",
      "content": "was walking to the deli on 5th avenue and saw this pigeon standing on the corner looking like he runs neighborhood loan operations.",
      "image": "content/images/img15.jpg",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "bread_crumb_boss",
          "text": "you owe him three slices of sourdough from yesterday, pay up"
        },
        {
          "author": "city_birder",
          "text": "the little tailored trousers are sending me, new york pigeons are built different"
        },
        {
          "author": "deli_regular",
          "text": "i would not make eye contact if i were you, he means business"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false,
      "id": 343
    },
    {
      "id": 344,
      "author": "xX_Dark_Slayer_Xx",
      "avatar": "content/misc/user.svg",
      "likes": 14500,
      "date": "Aug 16, 2084",
      "rating": "Rated: 1337#",
      "content": "whoever organized a full fashion show with cats wearing tiny couture dresses deserves an award. they strutted down the runway with so much attitude!",
      "image": "content/video/cat_dress_parade.webp",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "Tr0jaN",
          "text": "the little green velvet dress killed me, they walk better than actual models."
        },
        {
          "author": "sara_cinephile",
          "text": "the way they didn't even knock anything over is pure elegance"
        },
        {
          "author": "NoTABot",
          "text": "Such well-behaved pets, lovely little outfits."
        },
        {
          "author": "tara.exists",
          "text": "my cat would scratch my arms off if i tried putting a hat on him, how did they pull this off"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "author": "basement_tinkerer_99",
      "avatar": "content/misc/user.svg",
      "likes": 36700,
      "date": "Oct 29, 2084",
      "rating": "Rated: 88#",
      "content": "finally finished my weekend garage project! hooked up forty flashlights and every spare vacuum tube i had in the closet. neighborhood power flickered when i turned it on.",
      "image": "content/images/img19.jpg",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "safety_inspector",
          "text": "bro built a particle accelerator in his bedroom next to the laundry hamper"
        },
        {
          "author": "sci_fi_fan",
          "text": "the fairy lights wrapped around the cooling coils add fifty emotional damage"
        },
        {
          "author": "curious_neighbor",
          "text": "so that is why my refrigerator stopped running ten minutes ago"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false,
      "id": 345
    },
    {
      "author": "sunset_blvd_paparazzi",
      "avatar": "content/misc/user.svg",
      "likes": 62400,
      "date": "Nov 1, 2084",
      "rating": "Rated: 93#",
      "content": "dramatic arrest outside the club on Ivar Avenue tonight. authorities finally caught up with the suspect after an extensive investigation.",
      "image": "content/images/img20.jpg",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "inspector_clouseau",
          "text": "the long arm of the law catches everyone eventually"
        },
        {
          "author": "hollywood_night",
          "text": "he looks so tired of the drama in that plush costume lol"
        },
        {
          "author": "witness_local",
          "text": "the police officers were trying so hard to keep straight faces while handcuffing him"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false,
      "id": 346
    },
    {
      "author": "remote_worker_mood",
      "avatar": "content/misc/user.svg",
      "likes": 74900,
      "date": "Oct 27, 2084",
      "rating": "Rated: 96#",
      "content": "current work from home situation. eight emails answered, three meetings attended, zero idea what the quarterly company roadmap actually means.",
      "image": "content/images/img3.jpg",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "office_refugee",
          "text": "mattress on the carpet and a single water bottle, peak minimalist efficiency"
        },
        {
          "author": "cubicle_survivor",
          "text": "literally a live camera feed of me trying to write a report before five pm"
        },
        {
          "author": "tech_lead_dan",
          "text": "give him another hour and he will solve all open bug tickets"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false,
      "id": 347
    },
    {
      "id": 348,
      "author": "jules_random",
      "avatar": "content/misc/user.svg",
      "likes": 6920,
      "date": "Aug 16, 2084",
      "rating": "Rated: 420#",
      "content": "finally left the apartment for an afternoon in the park. phone on silent, sitting under the big oak tree with a cold drink, soaking up the sunshine. needed this so badly.",
      "image": "content/video/chilling_in_the_nature_meme.webp",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "finn_offline",
          "text": "nothing beats a warm breeze and zero unread messages"
        },
        {
          "author": "anna_pensieri",
          "text": "spending an afternoon outside is honestly the best therapy"
        },
        {
          "author": "WeatherPulse_AI",
          "text": "weather looks like it's staying nice all weekend too"
        },
        {
          "author": "theo_talks",
          "text": "did the same today, laid a blanket on the grass and took a two hour nap"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false
    },
    {
      "author": "sleep_stream_syndicate",
      "avatar": "content/misc/user.svg",
      "likes": 49800,
      "date": "Nov 3, 2084",
      "rating": "Rated: 90#",
      "content": "hour 7 of the sleep stream. 12,400 viewers currently watching me do absolutely nothing from twelve different angles. content never stops.",
      "image": "content/images/img4.png",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "night_owl",
          "text": "cam 5 has the best angle honestly, that blanket looks like a cloud"
        },
        {
          "author": "stream_chat",
          "text": "people watch people anyway, the wall poster knows what is up"
        },
        {
          "author": "tired_student",
          "text": "bro is getting paid to sleep while i am awake studying for finals"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false,
      "id": 349
    },
    {
      "author": "sector7_ground_crew",
      "avatar": "content/misc/user.svg",
      "likes": 88900,
      "date": "Oct 31, 2084",
      "rating": "Rated: 98#",
      "content": "crashed right outside authorized hangar 3. guest was polite enough to accept an apple juice box while the engineering team assessed damage to the saucer.",
      "image": "content/images/img7.jpg",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "area51_alumnus",
          "text": "the headphones around the neck prove interstellar visitors appreciate good tunes"
        },
        {
          "author": "hangar_tech",
          "text": "saucer dented the concrete apron, gonna take all weekend to buff that out"
        },
        {
          "author": "juice_lover",
          "text": "minute maid apple juice bridging galactic civilizations since 2084"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false,
      "id": 350
    },
    {
      "author": "vanessa_omnipresence",
      "avatar": "content/misc/user.svg",
      "likes": 54100,
      "date": "Nov 2, 2084",
      "rating": "Rated: 92#",
      "content": "setting up the multi-platform broadcasting rig. one face, one hundred camera angles, infinite opportunities. be seen forever.",
      "image": "content/images/img8.png",
      "quoteTo": null,
      "quoteContent": null,
      "replies": [
        {
          "author": "media_director",
          "text": "the monitor wall behind you is mesmerizing, pure visual overload"
        },
        {
          "author": "beauty_fan_01",
          "text": "lip gloss shade looks amazing on screen numbers forty two through sixty eight"
        },
        {
          "author": "stream_watcher",
          "text": "better face brighter future, marketing team really cooked with that cup slogan"
        }
      ],
      "isExpanded": false,
      "isCommentsOpen": false,
      "id": 351
    }
  ];
  const newsData = {
    hero: {
      title: 'ELECTIONS 2084: THREE VISIONS',
      content: 'Thunder, Serenity and Freedom face voters as the Central Consensus Bureau begins final ballot processing. The three candidates on the ballot represent three different approaches to national policy, automation and citizen management.',
      linkText: '[ CAST YOUR BALLOT NOW → ]',
      linkUrl: 'news-elections-2084-90s.html'
    },
    hotLinks: [
      'Last News 2k84',
      'KODAK BLACKER™ CONFIRMED FOR GTA 7',
      'Right to Forget™',
      'City 12 Relocation',
      'Online Court Voting',
      'Premium Citizenship',
    ]
  };

  const usersData = [
    { name: 'R0boC0pp', avatar: 'content/misc/user.svg' },
    { name: 'Tr0jaN', avatar: 'content/misc/user.svg' },
    { name: 'xX_Dark_Slayer_Xx', avatar: 'content/misc/user.svg' },
    { name: 'NoTABot', avatar: 'content/misc/user.svg' },
    { name: 'Gl!tch_W4rrior', avatar: 'content/misc/user.svg' },
    { name: 'Cyb3r_Phantom', avatar: 'content/misc/user.svg' },
    { name: 'Synth_Druid', avatar: 'content/misc/user.svg' }
  ];

  const commentPool = [
    {
      "author": "marco_ultras99",
      "text": "so is it true refs are all automated now? idk, kinda miss human error tbh"
    },
    {
      "author": "SportSignal_AI",
      "text": "my team was favored to win tonight and they still managed to blow the lead lol"
    },
    {
      "author": "giuli.fan22",
      "text": "my favorite player refused the contract extension, honestly respect his decision"
    },
    {
      "author": "davide_calcio",
      "text": "referees checking video replays for 5 minutes ruins the whole stadium energy ngl"
    },
    {
      "author": "StatBot_Prime",
      "text": "stadium attendance broke records tonight, atmosphere was unreal"
    },
    {
      "author": "paolo_tifoso",
      "text": "honestly i preferred when coaches made wild mistakes instead of playing it super safe"
    },
    {
      "author": "tommy_hoops",
      "text": "coach got benched after arguing with the referee for ten straight minutes lol"
    },
    {
      "author": "LeagueStat_AI",
      "text": "three star players sitting out this weekend with minor sprains"
    },
    {
      "author": "rae_courtside",
      "text": "the stadium announcers have been so hilarious lately"
    },
    {
      "author": "big_dave_fitness",
      "text": "my trainer changed my whole workout routine without warning, my legs are dead today"
    },
    {
      "author": "MatchPulse_09",
      "text": "ticket prices went up again, might just watch the finals from the pub"
    },
    {
      "author": "nico_runs",
      "text": "ran my fastest 10k today, completely exhausted but proud of myself"
    },
    {
      "author": "sara_cinephile",
      "text": "they just announced the star of that new movie isn't even real and idk how to feel"
    },
    {
      "author": "StreamWatch_Bot",
      "text": "the film reached number one in 40 countries within the first 12 hours of release"
    },
    {
      "author": "leo_moviebuff",
      "text": "honestly you can tell when a script is rushed, something's missing, can't explain it"
    },
    {
      "author": "nina.watches",
      "text": "the nostalgic soundtrack from that trailer made me so emotional"
    },
    {
      "author": "CineTrend_AI",
      "text": "audience reviews have been surprisingly positive for the new sequel"
    },
    {
      "author": "fede_popcorn",
      "text": "guys is it normal that you can't even tell anymore if movie trailers are real or generated"
    },
    {
      "author": "jamie_watches",
      "text": "they remade that classic 90s thriller again, why can't we have original stories anymore"
    },
    {
      "author": "ScreenTrend_AI",
      "text": "box office numbers broke records over the long holiday weekend"
    },
    {
      "author": "mo_reviews",
      "text": "not gonna lie the crowd scenes in that blockbuster looked a little too clean"
    },
    {
      "author": "cassie_films",
      "text": "the director did a q&a and admitted half the scenes were improvised on set"
    },
    {
      "author": "PlotWatch_Bot",
      "text": "the plot twist in the third act caught everyone off guard"
    },
    {
      "author": "ben_popcorn2",
      "text": "watched that new documentary last night, couldn't look away for two hours"
    },
    {
      "author": "anna_pensieri",
      "text": "today my morning alarm woke me up with the gentlest melody instead of a loud siren, actually felt refreshed"
    },
    {
      "author": "ThoughtStream_09",
      "text": "thought of the day: everyone seems so busy lately but nobody seems to know where the time went"
    },
    {
      "author": "giacomo.random",
      "text": "stared into my fridge for 10 minutes looking for food like something new was gonna appear"
    },
    {
      "author": "luce_scrive",
      "text": "i miss when things were made of wood and metal, now everything feels like cheap glossy plastic"
    },
    {
      "author": "DailyPulse_Bot",
      "text": "a sunny weekend walk improves mood more than anything else honestly"
    },
    {
      "author": "marta_over",
      "text": "am i the only one weirded out by how fast kids grow up nowadays?"
    },
    {
      "author": "ellie_typing",
      "text": "my coffee maker broke this morning and my day was ruined before it even started"
    },
    {
      "author": "MindPulse_AI",
      "text": "spending an hour reading before bed makes falling asleep so much easier"
    },
    {
      "author": "sam_overthinks",
      "text": "is it just me or does coffee taste twice as good when someone else makes it for you"
    },
    {
      "author": "tara.exists",
      "text": "had a great conversation with my neighbor over the garden fence this morning"
    },
    {
      "author": "ThoughtGrid_02",
      "text": "nostalgia hits so hard whenever you hear an old song you forgot about"
    },
    {
      "author": "leo_random22",
      "text": "my kid asked me if people really wrote letters by hand in the past, made me feel ancient"
    },
    {
      "author": "NewsGrid_Live",
      "text": "city council approved the new park expansion project on the south side"
    },
    {
      "author": "enzo_curioso",
      "text": "they opened a new vintage bookshop downtown, definitely going to check it out"
    },
    {
      "author": "PolicyWatch_AI",
      "text": "public debate over school bus schedules continues to divide parents"
    },
    {
      "author": "vale.pensa",
      "text": "my bank now sends me automated emojis in text messages and it feels so cringey"
    },
    {
      "author": "CivicTrend_09",
      "text": "community garden signups reached full capacity this week"
    },
    {
      "author": "rob_normale",
      "text": "nothing much, just found out today that my neighbor has three pet ferrets"
    },
    {
      "author": "CivicSignal_AI",
      "text": "new recycling guidelines take effect across all districts next Monday"
    },
    {
      "author": "renee_watches2",
      "text": "my landlord finally fixed the front gate lock after three months of asking"
    },
    {
      "author": "PolicyTrack_09",
      "text": "local farmers market will now stay open through late autumn"
    },
    {
      "author": "marcus_thinks",
      "text": "the morning radio host got replaced and the new guy has zero charm"
    },
    {
      "author": "GridWatch_Bot",
      "text": "downtown traffic was surprisingly smooth during morning commute today"
    },
    {
      "author": "dana_reads",
      "text": "my kid brought home a painted clay mug from art class, honestly looks adorable"
    },
    {
      "author": "paul.codes",
      "text": "spilled coffee on my keyboard again, taking keys off with a butter knife as we speak"
    },
    {
      "author": "TechPulse_AI",
      "text": "cordless vacuum cleaners have genuinely changed Saturday chores forever"
    },
    {
      "author": "nadia_builds",
      "text": "spent 20 minutes looking for my glasses while they were sitting on my head"
    },
    {
      "author": "GridNet_03",
      "text": "remember when phone batteries lasted four days without needing a charge?"
    },
    {
      "author": "chris.everyday",
      "text": "my navigation app guided me through three back alleys to save 30 seconds"
    },
    {
      "author": "AutoLife_Bot",
      "text": "smart home light bulbs are great until the power flickers and turns every room on at 3 am"
    },
    {
      "author": "mia_cooks",
      "text": "found an old handwritten recipe card from my grandmother, smells like cinnamon and sugar"
    },
    {
      "author": "FlavorTrend_AI",
      "text": "hot chocolate with a pinch of sea salt on a chilly night hits different"
    },
    {
      "author": "tobi_snacks",
      "text": "the bakery down the street started making warm blueberry scones every morning"
    },
    {
      "author": "dana_eats",
      "text": "nothing beats homemade soup on a rainy afternoon, comfort in a bowl"
    },
    {
      "author": "MealGrid_09",
      "text": "tried making sourdough bread again and actually got a nice golden crust this time"
    },
    {
      "author": "ray_hungry",
      "text": "that new taco truck parked by the park is genuinely incredible"
    },
    {
      "author": "jules_random",
      "text": "today's forecast says calm with sunny intervals, finally can hang clothes outside"
    },
    {
      "author": "WeatherPulse_AI",
      "text": "clear skies expected throughout the entire weekend across the region"
    },
    {
      "author": "theo_talks",
      "text": "my grandma finally got a smartphone and now she texts me funny pictures all day"
    },
    {
      "author": "CityGrid_Live",
      "text": "metro line repairs finished early, all stations running on normal schedule"
    },
    {
      "author": "nora_scrolling",
      "text": "everyone online seems so cheerful today for once, what a pleasant change"
    },
    {
      "author": "Signal_Echo7",
      "text": "listening to the rain while drinking tea is the ultimate cozy combo"
    },
    {
      "author": "finn_offline",
      "text": "took an evening walk without checking the time once, felt so liberating"
    },
    {
      "author": "R0boC0pp",
      "text": "Checked the morning weather, grabbed a warm coffee, ready for the day."
    },
    {
      "author": "Tr0jaN",
      "text": "LMAOOOO this post made my whole afternoon."
    },
    {
      "author": "xX_Dark_Slayer_Xx",
      "text": "I REMEMBER WHEN WE PLAYED OUTSIDE UNTIL THE STREETLIGHTS CAME ON"
    },
    {
      "author": "NoTABot",
      "text": "As an authentic everyday person, I find this post highly relatable."
    },
    {
      "author": "Gl!tch_W4rrior",
      "text": "Saved this picture immediately, absolutely brilliant."
    },
    {
      "author": "Cyb3r_Phantom",
      "text": "Aesthetic rating: 10/10. Looks stunning."
    },
    {
      "author": "Synth_Druid",
      "text": "Such a calm and lovely vibe on the feed today."
    },
    {
      "author": "PixelNomad",
      "text": "Pure internet gold. Reminds me of the good old days of early forums."
    },
    {
      "author": "QuantumChanter",
      "text": "Odds of me getting out of bed before noon today are looking very slim."
    },
    {
      "author": "DialupGhost",
      "text": "Remember the sound of an old phone dial tone? Pure nostalgia."
    },
    {
      "author": "HyperlinkHorror",
      "text": "Need another cup of coffee before dealing with anyone today."
    },
    {
      "author": "NullPointerZen",
      "text": "Take a deep breath and let the stress go. Have a peaceful day."
    },
    {
      "author": "GlitchHop_Girl",
      "text": "Got this song stuck in my head on repeat all day long."
    },
    {
      "author": "DataMiner_404",
      "text": "Found a box of old cassette tapes in the attic earlier, so cool."
    },
    {
      "author": "CyberSkeptic",
      "text": "Looked into the story behind this, turns out it's actually true!"
    },
    {
      "author": "ZeroDay_Zack",
      "text": "Gotta appreciate the attention to detail on this one."
    },
    {
      "author": "NeonValkyrie",
      "text": "Watching the sunset from the balcony with tea, beautiful evening."
    },
    {
      "author": "Subroutine_7",
      "text": "This put a huge smile on my face today."
    },
    {
      "author": "BufferOverflow",
      "text": "Brain is completely drained after a long workday, need sleep."
    },
    {
      "author": "StaticFuzz",
      "text": "Love finding random posts like this during lunch break."
    }
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
      // Media / Video / Image Logic (Native Hardware-Accelerated Rendering)
      let imageHtml = '';
      if (post.image) {
        const safeImgSrc = encodeURI(post.image).replace(/#/g, '%23');
        const isAnimatedMedia = /\.(gif|webp)($|\?)/i.test(post.image);
        const containerClasses = isAnimatedMedia
          ? 'post-attached-image-container post-media-frosted'
          : 'post-attached-image-container';
        const imgClasses = isAnimatedMedia
          ? 'post-attached-image post-attached-image-contained'
          : 'post-attached-image';

        const blurBgHtml = isAnimatedMedia
          ? `<div class="post-media-blur-bg" style="background-image: url('${safeImgSrc}');"></div>`
          : '';

        imageHtml = `
          <div class="${containerClasses}" data-post-id="${post.id}">
            ${blurBgHtml}
            <img src="${safeImgSrc}" class="${imgClasses}" data-post-id="${post.id}" alt="Post Media">
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
              <span class="post-content-text">${post.content}</span>
            </div>
            
            <div class="post-footer">
              <div class="post-icon chat-icon" data-post-id="${post.id}">
                <img class="post-icon-svg" src="content/misc/chat.svg" alt="comments"> ${(post.replies ? post.replies.length : 0)}
              </div>
              <div class="post-icon like-icon" data-post-id="${post.id}">
                <img class="post-icon-svg" src="content/misc/like.svg" alt="likes"> ${(post.likes != null ? post.likes : 0).toLocaleString()}
              </div>
            </div>

            ${commentsSectionHtml}
          </div>
        </div>
      `;

      // Inject post ad after every 2 normal posts
      if ((index + 1) % 2 === 0) {
        const slotId = Math.floor(index / 2);

        // Narrative Lore Transmission: Replaces the fourth post_ad (slotId === 3)
        if (window.__loreAdActive && !window.__loreAdDismissed && slotId === 3) {
          html += `
            <div id="lore-trigger-transmission" class="post-card post-wide lore-transmission-card lore-important-transmission" data-lore-trigger="step1">
              <button class="lore-transmission-close" aria-label="Close Transmission" title="Close Transmission">&times;</button>
              <img src="content/lore/transmission_important.gif" class="lore-transmission-img" alt="Important Lore Transmission" title="Click to inspect transmission">
            </div>
          `;
        } else if (!dismissedPostSlots.has(slotId)) {
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
  }

  // EVENT DELEGATION
  if (postContainer) {
    postContainer.addEventListener('click', (e) => {
      // 1. Close Post Ad or Lore Transmission with 'X' and respawn
      const closeAdBtn = e.target.closest('.ad-post-close, .lore-transmission-close');
      if (closeAdBtn) {
        if (closeAdBtn.classList.contains('lore-transmission-close') || closeAdBtn.classList.contains('lore-ad-close') || closeAdBtn.closest('#lore-trigger-transmission') || closeAdBtn.closest('#lore-trigger-ad')) {
          handleLoreAdClose();
          return;
        }
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
            avatar: 'content/misc/user.svg',
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
      else if (link === 'KODAK BLACKER™ IN GTA 7' || link === 'KODAK BLACKER™ CONFIRMED FOR GTA 7') href = 'news-kodak-blacker-gta7.html';
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
    home2Preload.src = 'content/loading_home_content/home2.webp';
  }

  // Only skip loading screen if returning to homepage from an article or narrative reset
  let isReturningFromArticle = false;
  try {
    if (typeof window._isReturning !== 'undefined' && window._isReturning) {
      isReturningFromArticle = true;
    } else if (sessionStorage.getItem('slop_returning_from_article') === 'true' || sessionStorage.getItem('slop_skip_loader') === 'true') {
      isReturningFromArticle = true;
      sessionStorage.removeItem('slop_returning_from_article');
      sessionStorage.removeItem('slop_skip_loader');
    } else if (document.referrer && document.referrer.includes('news-')) {
      isReturningFromArticle = true;
    }
  } catch (e) { }

  if (isReturningFromArticle) {
    if (loadingScreen) {
      loadingScreen.remove();
    }
    document.body.classList.remove('loading-active');
    startPopupAds();
    startNarrativeLoreTimerIfEligible();
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
      { html: "Loading human inteface... <span class=\"highlight\">[Good Old Days by Rug]</span>" },
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
      loadingBg.src = 'content/loading_home_content/home2.webp?t=' + Date.now();

      // 3. Exact duration of home2.gif is 8600ms (8.6s)
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.pointerEvents = 'none';

        setTimeout(() => {
          loadingScreen.remove();
          document.body.classList.remove('loading-active');
          startPopupAds();
          startNarrativeLoreTimerIfEligible();
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
    startNarrativeLoreTimerIfEligible();
  }

  // Prevent loading screen from triggering when clicking home links while on homepage
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a && a.getAttribute('href') && (a.getAttribute('href') === 'index.html' || a.getAttribute('href') === 'index.html#top')) {
      try {
        sessionStorage.setItem('slop_returning_from_article', 'true');
      } catch (err) { }
    }
  });

  // 2. Lightbox / Image Zoom (Unified)
  function openMainZoomLightbox(src, alt = '') {
    if (typeof window.openRetroLightbox === 'function') {
      window.openRetroLightbox(src, alt);
      return;
    }
    const retroLightbox = document.getElementById('retro-ad-lightbox');
    const retroLightboxImg = document.getElementById('retro-ad-lightbox-img');
    if (retroLightbox && retroLightboxImg) {
      retroLightboxImg.alt = alt;
      retroLightboxImg.src = src;
      retroLightbox.style.display = 'flex';
      requestAnimationFrame(() => {
        retroLightbox.classList.add('active');
      });
      return;
    }

    const standardLightbox = document.getElementById('ad-lightbox');
    const standardLightboxImg = document.getElementById('ad-lightbox-img');
    if (standardLightbox && standardLightboxImg) {
      standardLightboxImg.alt = alt;
      standardLightboxImg.src = src;
      standardLightbox.style.display = 'flex';
      requestAnimationFrame(() => {
        standardLightbox.classList.add('active');
      });
    }
  }

  function closeMainZoomLightbox() {
    if (typeof window.closeRetroLightbox === 'function') {
      window.closeRetroLightbox();
      return;
    }
    const retroLightbox = document.getElementById('retro-ad-lightbox');
    if (retroLightbox) {
      retroLightbox.classList.remove('active');
      setTimeout(() => {
        if (!retroLightbox.classList.contains('active')) {
          retroLightbox.style.display = 'none';
          const retroLightboxImg = document.getElementById('retro-ad-lightbox-img');
          if (retroLightboxImg) {
            retroLightboxImg.src = '';
            retroLightboxImg.alt = '';
          }
        }
      }, 250);
    }

    const standardLightbox = document.getElementById('ad-lightbox');
    if (standardLightbox) {
      standardLightbox.classList.remove('active');
      setTimeout(() => {
        if (!standardLightbox.classList.contains('active')) {
          standardLightbox.style.display = 'none';
          const standardLightboxImg = document.getElementById('ad-lightbox-img');
          if (standardLightboxImg) {
            standardLightboxImg.src = '';
            standardLightboxImg.alt = '';
          }
        }
      }, 250);
    }
  }

  const retroLightboxImgEl = document.getElementById('retro-ad-lightbox-img');
  if (retroLightboxImgEl) {
    retroLightboxImgEl.addEventListener('error', () => {
      console.warn('[Lightbox] Image failed to load, closing zoom:', retroLightboxImgEl.src);
      closeMainZoomLightbox();
    });
  }

  document.addEventListener('click', (e) => {
    // Loading screen GIFs and terminal elements must never trigger zoom
    if (e.target.closest('#loading-screen') || e.target.closest('#loading-bg') || e.target.id === 'loading-bg') return;

    // 1. Check for ad image click (only if article-ads.js is NOT active)
    if (e.target.classList.contains('ad-image')) {
      if (window.__articleAdsActive) return;
      openMainZoomLightbox(e.target.src, e.target.alt || 'Advertisement');
      return;
    }

    // 2. Check for post attached image click
    const postImageContainer = e.target.closest('.post-attached-image-container');
    if (postImageContainer) {
      // For frosted GIF/WebP posts, only clicking the media itself triggers the lightbox
      if (postImageContainer.classList.contains('post-media-frosted') && !e.target.classList.contains('post-attached-image')) {
        return;
      }
      const postId = parseInt(postImageContainer.getAttribute('data-post-id'), 10);
      const post = postsData.find(p => p.id === postId);
      if (post && post.image) {
        const safeOriginalSrc = encodeURI(post.image).replace(/#/g, '%23');
        openMainZoomLightbox(safeOriginalSrc, 'Post Media');
      }
    }
  });

  // Lightbox click-to-close: clicking anywhere on the open lightbox (image, content, backdrop, close button) closes it
  document.addEventListener('click', (e) => {
    const retroLightbox = document.getElementById('retro-ad-lightbox');
    const standardLightbox = document.getElementById('ad-lightbox');
    if (retroLightbox && retroLightbox.classList.contains('active') && (e.target.closest('#retro-ad-lightbox') || e.target.closest('#retro-ad-lightbox-close'))) {
      closeMainZoomLightbox();
      return;
    }
    if (standardLightbox && standardLightbox.classList.contains('active') && (e.target.closest('#ad-lightbox') || e.target.closest('#ad-lightbox-close'))) {
      closeMainZoomLightbox();
      return;
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

  // ==========================================================================
  // NARRATIVE SYSTEM: STEP 1 (LIVE DIALOGUE BETWEEN X AND Y, 15s LORE AD, 30s ALERT)
  // ==========================================================================

  const narrativeDialogue = [
    {
      speaker: 'X',
      lines: [
        "You're not where you think you are.",
        "They left a door open somewhere... and you just walked through it.",
        "Keep looking. Most of what you see is noise.",
        "But not all of it."
      ]
    },
    {
      speaker: 'Y',
      lines: [
        "I don't understand."
      ]
    },
    {
      speaker: 'X',
      lines: [
        "You don't have to.",
        {
          parts: [
            { text: "Just keep going " },
            { text: "down", isViolet: true },
            { text: "." }
          ]
        }
      ]
    },
    {
      speaker: 'Y',
      lines: [
        "Until what?"
      ]
    },
    {
      speaker: 'X',
      lines: [
        {
          parts: [
            { text: "Until you find what they made you " },
            { text: "become", isViolet: true },
            { text: "." }
          ]
        }
      ]
    },
    {
      speaker: 'Y',
      lines: [
        "What?"
      ]
    }
  ];


  function startLoginReminder() {
    if (typeof window.startGlobalLoginReminder === 'function') {
      window.startGlobalLoginReminder();
      return;
    }
    try {
      if (localStorage.getItem('slop_user')) return;
    } catch (e) { }

    if (loginReminderTimeout) {
      clearTimeout(loginReminderTimeout);
    }

    loginReminderTimeout = setTimeout(() => {
      let isLogged = false;
      try {
        isLogged = !!localStorage.getItem('slop_user');
      } catch (e) { }

      if (!isLogged) {
        if (typeof window.showLoginRequiredPromptModal === 'function') {
          window.showLoginRequiredPromptModal();
        }
      }
    }, 45000);
  }

  function clearLoginReminder() {
    if (typeof window.clearGlobalLoginReminder === 'function') {
      window.clearGlobalLoginReminder();
    }
    if (loginReminderTimeout) {
      clearTimeout(loginReminderTimeout);
      loginReminderTimeout = null;
    }
    const modal = document.getElementById('slop-login-prompt-modal');
    if (modal) {
      modal.remove();
    }
  }


  function startNarrativeLoreTimerIfEligible() {
    if (loreTimerStarted) return;
    let isStep1Done = false;
    try {
      isStep1Done = localStorage.getItem('slop_narrative_step') === 'step1_completed';
    } catch (e) { }

    if (!isStep1Done) return;
    loreTimerStarted = true;

    // Fast-track so lore ad appears promptly in feed during step 2
    setTimeout(() => {
      window.__loreAdActive = true;
      injectLoreAd();
    }, 1200);
  }

  function showNarrativeDialogueModal(pendingUserData) {
    const existingModal = document.getElementById('retro-intercept-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'retro-intercept-modal';
    modal.innerHTML = `
      <div class="raw-dialogue-terminal" id="raw-dialogue-terminal">
        <div class="retro-dialogue-feed" id="retro-dialogue-feed"></div>
      </div>
    `;

    document.body.appendChild(modal);

    const bodyEl = modal.querySelector('#raw-dialogue-terminal');
    const feedEl = modal.querySelector('#retro-dialogue-feed');

    const getDialogueTimestamp = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      return `${hh}:${mm}:${ss}`;
    };

    // Live typewriter transmission runner
    async function runDialogue() {
      await new Promise(r => setTimeout(r, 450));

      for (let t = 0; t < narrativeDialogue.length; t++) {
        const turn = narrativeDialogue[t];

        for (let l = 0; l < turn.lines.length; l++) {
          const item = turn.lines[l];
          const lineEl = document.createElement('div');
          lineEl.className = 'dialogue-terminal-line';

          const timestampSpan = document.createElement('span');
          timestampSpan.className = 'dialogue-timestamp';
          timestampSpan.textContent = getDialogueTimestamp();

          const speakerSpan = document.createElement('span');
          speakerSpan.className = `dialogue-speaker dialogue-speaker-${turn.speaker.toLowerCase()}`;
          speakerSpan.textContent = `${turn.speaker}:`;

          const textSpan = document.createElement('span');
          textSpan.className = 'dialogue-text';

          const cursorSpan = document.createElement('span');
          cursorSpan.className = 'dialogue-cursor';
          cursorSpan.textContent = '_';

          lineEl.appendChild(timestampSpan);
          lineEl.appendChild(speakerSpan);
          lineEl.appendChild(textSpan);
          lineEl.appendChild(cursorSpan);

          feedEl.appendChild(lineEl);
          bodyEl.scrollTop = bodyEl.scrollHeight;

          const parts = (typeof item === 'object' && item.parts) ? item.parts : [{ text: (typeof item === 'string' ? item : item.text) }];
          for (let p = 0; p < parts.length; p++) {
            const part = parts[p];
            const partSpan = document.createElement('span');
            if (part.isViolet) {
              partSpan.className = 'violet-word violet-choose';
            }
            textSpan.appendChild(partSpan);

            for (let c = 0; c < part.text.length; c++) {
              partSpan.textContent += part.text[c];
              bodyEl.scrollTop = bodyEl.scrollHeight;
              await new Promise(r => setTimeout(r, 45));
            }
          }

          cursorSpan.remove();
          await new Promise(r => setTimeout(r, 260));
        }

        await new Promise(r => setTimeout(r, 340));
      }

      // Dialogue finished: wait 3 seconds, close terminal, reload from loading screen
      await new Promise(r => setTimeout(r, 3000));

      modal.remove();

      try {
        localStorage.setItem('slop_user', JSON.stringify(pendingUserData));
        localStorage.setItem('slop_narrative_step', 'step1_completed');
        sessionStorage.setItem('slop_skip_loader', 'true');
        sessionStorage.setItem('slop_returning_from_article', 'true');
        sessionStorage.setItem('slop_internal_reload', 'true');
      } catch (err) { }

      window.location.reload();
    }

    runDialogue();
  }

  function showStep2DialogueModal() {
    const existingModal = document.getElementById('retro-intercept-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'retro-intercept-modal';
    modal.innerHTML = `
      <div class="raw-dialogue-terminal" id="raw-dialogue-terminal">
        <div class="retro-dialogue-feed" id="retro-dialogue-feed"></div>
      </div>
    `;

    document.body.appendChild(modal);

    const bodyEl = modal.querySelector('#raw-dialogue-terminal');
    const feedEl = modal.querySelector('#retro-dialogue-feed');

    const getDialogueTimestamp = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      return `${hh}:${mm}:${ss}`;
    };

    const step2Lines = [
      { text: "CRAZY, RIGHT?" },
      { text: "YOU DON'T MATTER." },
      { text: "AND YET..." },
      {
        parts: [
          { text: "THEY STILL WANT YOU TO " },
          { text: "CHOOSE", isViolet: true },
          { text: "." }
        ]
      }
    ];

    async function runDialogueStep2() {
      await new Promise(r => setTimeout(r, 450));

      for (let l = 0; l < step2Lines.length; l++) {
        const item = step2Lines[l];
        const lineEl = document.createElement('div');
        lineEl.className = 'dialogue-terminal-line';

        const timestampSpan = document.createElement('span');
        timestampSpan.className = 'dialogue-timestamp';
        timestampSpan.textContent = getDialogueTimestamp();

        const speakerSpan = document.createElement('span');
        speakerSpan.className = 'dialogue-speaker dialogue-speaker-x';
        speakerSpan.textContent = 'X:';

        const textSpan = document.createElement('span');
        textSpan.className = 'dialogue-text';

        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'dialogue-cursor';
        cursorSpan.textContent = '_';

        lineEl.appendChild(timestampSpan);
        lineEl.appendChild(speakerSpan);
        lineEl.appendChild(textSpan);
        lineEl.appendChild(cursorSpan);

        feedEl.appendChild(lineEl);
        bodyEl.scrollTop = bodyEl.scrollHeight;

        const parts = item.parts || [{ text: item.text }];
        for (let p = 0; p < parts.length; p++) {
          const part = parts[p];
          const partSpan = document.createElement('span');
          if (part.isViolet) {
            partSpan.className = 'violet-word violet-choose';
          }
          textSpan.appendChild(partSpan);

          for (let c = 0; c < part.text.length; c++) {
            partSpan.textContent += part.text[c];
            bodyEl.scrollTop = bodyEl.scrollHeight;
            await new Promise(r => setTimeout(r, 45));
          }
        }

        cursorSpan.remove();
        await new Promise(r => setTimeout(r, 280));
      }

      // Dialogue finished: wait 3 seconds, close terminal, reload page
      await new Promise(r => setTimeout(r, 3000));

      modal.remove();

      try {
        localStorage.setItem('slop_narrative_step', 'step2_ballot_active');
        localStorage.removeItem('slop_90s_voted');
        localStorage.removeItem('slop_step2_voted');
        sessionStorage.setItem('slop_skip_loader', 'true');
        sessionStorage.setItem('slop_returning_from_article', 'true');
        sessionStorage.setItem('slop_internal_reload', 'true');
      } catch (err) { }

      window.location.reload();
    }

    runDialogueStep2();
  }

  window.showStep2DialogueModal = showStep2DialogueModal;

  // Delegate click for lore-transmission-img so that normal image expansion is completely overridden
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target && (target.classList.contains('lore-transmission-img') || target.classList.contains('lore-ad-img') || ((target.closest('#lore-trigger-transmission') || target.closest('#lore-trigger-ad')) && target.tagName === 'IMG'))) {
      e.preventDefault();
      e.stopPropagation();
      try {
        localStorage.setItem('slop_lore_ad_inspected', 'true');
        localStorage.removeItem('slop_90s_voted');
        localStorage.removeItem('slop_step2_voted');
        window.dispatchEvent(new CustomEvent('slop:lore_ad_clicked', { detail: { step: 2 } }));
      } catch (err) { }
      showStep2DialogueModal();
    }
  });


  function getLoreRespawnDelay() {
    if (loreCloseCount === 1) return 10000; // 10s on 1st close
    if (loreCloseCount === 2) return 5000;  // 5s on 2nd close
    return 2500;                            // 2.5s on 3rd+ closes
  }

  function handleLoreAdClose() {
    loreCloseCount++;
    window.__loreAdDismissed = true;
    const loreCard = document.getElementById('lore-trigger-transmission') || document.getElementById('lore-trigger-ad');
    if (loreCard) {
      const slotId = 4;
      if (!dismissedPostSlots.has(slotId)) {
        if (!postSlotAdMap.has(slotId)) {
          const initialAd = postAds[slotId % postAds.length];
          postSlotAdMap.set(slotId, initialAd);
        }
        const postAdSrc = encodeURI(postSlotAdMap.get(slotId)).replace(/#/g, '%23');
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = `
          <div class="post-card post-wide ad-post" data-slot-id="${slotId}">
            <button class="ad-post-close" data-slot-id="${slotId}" aria-label="Close Ad" title="Close Advertisement">&times;</button>
            <img src="${postAdSrc}" class="ad-image" alt="Advertisement">
          </div>
        `.trim();
        loreCard.replaceWith(tempDiv.firstElementChild);
      } else {
        loreCard.remove();
      }
    }

    if (loreRespawnTimeout) {
      clearTimeout(loreRespawnTimeout);
    }

    const delay = getLoreRespawnDelay();
    loreRespawnTimeout = setTimeout(() => {
      window.__loreAdDismissed = false;
      injectLoreAd();
    }, delay);
  }

  function initNarrativeLoreAd() {
    // If user is already on the page without loading screen, start timer if eligible
    startNarrativeLoreTimerIfEligible();
  }

  function injectLoreAd() {
    if (window.__loreAdDismissed) return;
    if (document.getElementById('lore-trigger-transmission') || document.getElementById('lore-trigger-ad')) return;
    if (!postContainer) return;

    window.__loreAdActive = true;

    const loreCard = document.createElement('div');
    loreCard.id = 'lore-trigger-transmission';
    loreCard.className = 'post-card post-wide lore-transmission-card lore-important-transmission';
    loreCard.setAttribute('data-lore-trigger', 'step1');
    loreCard.innerHTML = `
      <button class="lore-transmission-close" aria-label="Close Transmission" title="Close Transmission">&times;</button>
      <img src="content/lore/transmission_important.gif" class="lore-transmission-img" alt="Important Lore Transmission" title="Click to inspect transmission">
    `;

    // Replace the fourth post_ad (index 3) with loreCard
    const postAdsList = Array.from(postContainer.querySelectorAll('.ad-post'));
    const fourthAd = postContainer.querySelector('.ad-post[data-slot-id="4"]') || (postAdsList.length >= 4 ? postAdsList[3] : null);
    if (fourthAd) {
      fourthAd.replaceWith(loreCard);
    } else if (postAdsList.length > 0) {
      postAdsList[postAdsList.length - 1].replaceWith(loreCard);
    } else {
      const cards = Array.from(postContainer.querySelectorAll('.post-card:not(#lore-trigger-transmission):not(#lore-trigger-ad)'));
      if (cards.length > 0) {
        postContainer.appendChild(loreCard);
      } else {
        renderPosts();
      }
    }

    // Attach click handler for step 2 trigger
    const loreImg = loreCard.querySelector('.lore-transmission-img, .lore-ad-img');
    if (loreImg) {
      loreImg.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
          localStorage.setItem('slop_lore_ad_inspected', 'true');
          localStorage.removeItem('slop_90s_voted');
          localStorage.removeItem('slop_step2_voted');
          window.dispatchEvent(new CustomEvent('slop:lore_ad_clicked', { detail: { step: 2 } }));
        } catch (err) { }
        showStep2DialogueModal();
      });
    }
  }

  function initLogin() {
    const retroLoginBox = document.getElementById('retro-login-box-body');
    const articleLoginForm = document.querySelector('.login-form');

    const originalRetroHtml = retroLoginBox ? retroLoginBox.innerHTML : '';
    const originalArticleHtml = articleLoginForm ? articleLoginForm.innerHTML : '';

    function renderLoggedIn(userData) {
      // 1. Render in retro 90s sidebar box if present
      if (retroLoginBox) {
        retroLoginBox.innerHTML = `
          <div class="retro-logged-in" style="font-family: 'Courier New', monospace; font-size: 11px; padding: 2px;">
            <div style="font-weight: bold; color: var(--retro-brown); font-size: 12px; margin-bottom: 4px;">USER: ${userData.username}</div>
            <div style="color: #222; margin-bottom: 2px;">STATUS: <span style="color: #0F3118; font-weight: bold;">CONNECTED</span></div>
            <div style="color: #555; margin-bottom: 2px;">LOGGED: ${userData.date}</div>
            <div style="color: #555; margin-bottom: 2px;">POST TALLY: ${userData.posts}</div>
            <div style="color: #555; margin-bottom: 6px;">CONSENSUS: ${userData.likes} pts</div>
            <button id="logout-btn-retro" class="retro-search-btn" style="margin-top: 4px;">[ Disconnect / Logout ]</button>
          </div>
        `;

        const logoutRetro = retroLoginBox.querySelector('#logout-btn-retro');
        if (logoutRetro) {
          logoutRetro.addEventListener('click', (ev) => {
            ev.preventDefault();
            try { localStorage.removeItem('slop_user'); } catch (err) { }
            retroLoginBox.innerHTML = originalRetroHtml;
            bindRetroLogin();
            startLoginReminder();
          });
        }
      }

      // 2. Render in article page login form if present
      if (articleLoginForm) {
        articleLoginForm.innerHTML = `
          <div class="login-form-wrapper flex" style="flex-direction: column; padding: 10px; gap: 8px;">
            <div style="font-weight: bold; font-size: 15px; color: var(--color-text-darkest);">Welcome, ${userData.username}!</div>
            <div style="font-size: 13px; color: var(--color-text-main);">Last Login: ${userData.date}</div>
            <div style="font-size: 13px; color: var(--color-text-main);">Posts: ${userData.posts}</div>
            <div style="font-size: 13px; color: var(--color-text-main);">Likes: ${userData.likes}</div>
            <button id="logout-btn-article" class="login-form-submit" style="margin-top: 10px;">Log out</button>
          </div>
        `;

        const logoutArticle = articleLoginForm.querySelector('#logout-btn-article');
        if (logoutArticle) {
          logoutArticle.addEventListener('click', (ev) => {
            ev.preventDefault();
            try { localStorage.removeItem('slop_user'); } catch (err) { }
            articleLoginForm.innerHTML = originalArticleHtml;
            bindArticleLogin();
            startLoginReminder();
          });
        }
      }
    }

    function handleLoginSubmit(formElement) {
      clearLoginReminder();
      const usernameInput = formElement.querySelector('#username');
      const userVal = usernameInput && usernameInput.value ? usernameInput.value.trim() : 'Citizen_84';
      const formattedUser = userVal.startsWith('@') ? userVal : `@${userVal}`;

      const userData = {
        username: formattedUser,
        date: new Date().toLocaleDateString(),
        posts: Math.floor(Math.random() * 500) + 14,
        likes: Math.floor(Math.random() * 10000) + 189
      };

      let step1Done = false;
      try {
        step1Done = localStorage.getItem('slop_narrative_step') === 'step1_completed';
      } catch (e) { }

      if (!step1Done) {
        // First login -> Trigger live dialogue between X and Y!
        showNarrativeDialogueModal(userData);
      } else {
        try {
          localStorage.setItem('slop_user', JSON.stringify(userData));
        } catch (err) { }
        renderLoggedIn(userData);
      }
    }

    function bindRetroLogin() {
      const form = document.getElementById('retro-login-form') || (retroLoginBox ? retroLoginBox.querySelector('.retro-search-form') : null);
      if (!form) return;
      form.onsubmit = (e) => {
        e.preventDefault();
        handleLoginSubmit(form);
      };
    }

    function bindArticleLogin() {
      if (!articleLoginForm) return;
      articleLoginForm.onsubmit = (e) => {
        e.preventDefault();
        handleLoginSubmit(articleLoginForm);
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
    } catch (err) { }

    bindRetroLogin();
    bindArticleLogin();
    startLoginReminder();
  }

  populatePostComments();
  renderPosts();
  renderNews();
  initSidebarAds();
  initLogin();
  initNarrativeLoreAd();

  function handleLoginHashTarget() {
    if (window.location.hash === '#retro-login-widget') {
      setTimeout(() => {
        const widget = document.getElementById('retro-login-widget');
        const input = document.getElementById('username');
        if (widget) {
          widget.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (input) {
            setTimeout(() => input.focus(), 250);
          }
          widget.classList.remove('retro-login-highlight');
          void widget.offsetWidth;
          widget.classList.add('retro-login-highlight');
          setTimeout(() => widget.classList.remove('retro-login-highlight'), 3600);
        }
      }, 400);
    }
  }

  handleLoginHashTarget();
  window.addEventListener('hashchange', handleLoginHashTarget);
});

