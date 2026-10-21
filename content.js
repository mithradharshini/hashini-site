/**
 * HASHINI'S WEBSITE CONTENT
 * All text, captions, quiz questions, stat labels, Bubble lines, the poem, and photo paths
 * are stored here so they can be edited without modifying the application logic.
 */

const SITE_CONTENT = {
  landing: {
    headline: "THE DIVA",
    subline: "Hashini",
    tagline: "In the end, Let it be US",
    enterButtonText: "You are finally legal!",
    welcomeNote: "Explore everything, touch everything, and don't trust every button you see."
  },

  navigation: {
    museum: "Museum",
    profile: "Profile",
    chaos: "Chaos Zone",
    bubble: "Bubble",
    trackerLabel: "Stars found"
  },

  museum: {
    title: "The Museum of Us",
    subtitle: "A quiet archive of our favourite chaos, quiet talks, and memories that refuse to fade.",
    randomMemoryButton: "Random memory",
    exhibits: [
      {
        id: "exhibit-1",
        title: "The Rivals",
        starId: "s03",
        photos: [
          {
            src: "assets/photos/museum-01-little-her.jpg",
            alt: "Little Hashini in childhood",
            caption: "Little her and little me."
          },
          {
            src: "assets/photos/museum-02-little-me.jpg",
            alt: "Little Mithra in childhood",
            caption: "Little her and little me."
          }
        ],
        intro: "In our early childhood we fought constantly (she was the crazier one), and one day she beat me up and then ran crying to all the adults saying I was the mean one, when I had done nothing. I'm still waiting for the apology. But the performance deserved an award. We laughed about it later, obviously.",
        rememberNote: "The sheer audacity of that fake cry deserved a whole Oscar trophy. The entire adult jury fell for it instantly while I stood there in pure betrayal.",
        reaction: "Dramatic Oscar Winner 🏆"
      },
      {
        id: "exhibit-2",
        title: "The Cringe Episodes",
        starId: "s04",
        photos: [
          {
            src: "assets/photos/museum-09-cringe-us.jpg",
            alt: "Cringe photos of us together",
            caption: "Cringe us."
          }
        ],
        intro: "Proof that we survived every single awkward phase side by side, completely unapologetic and delightfully unhinged.",
        rememberNote: "Looking at this now, we really felt like the most iconic duo in history. To be fair, we were.",
        reaction: "Unfiltered Main Characters 🕶️"
      },
      {
        id: "exhibit-3",
        title: "The All-Night Talks",
        starId: "s05",
        photos: [
          {
            src: "assets/photos/museum-03-night-talks.jpg",
            alt: "Night talks and video chats",
            caption: "I know we will never see those videos again."
          }
        ],
        intro: "Every time I visited, we talked all night about everything, even the smallest things.",
        rememberNote: "Deep life philosophy at 3 AM mixed with hysterical giggles over the most random nonsense. Sleep was never an option.",
        reaction: "3 AM Conspiracies 🌙"
      },
      {
        id: "exhibit-4",
        title: "Certified Chaos",
        starId: "s06",
        photos: [
          {
            src: "assets/photos/museum-07-rapunzel-prank.jpg",
            alt: "The Rapunzel hair prank",
            caption: "When you pranked that you cut your Rapunzel hair."
          },
          {
            src: "assets/photos/museum-08-video-call.jpg",
            alt: "Video calls with Hashini",
            caption: "Video calls with you are top tier (I love your video calls)."
          }
        ],
        intro: "Her questionable decisions, my front-row seat; every time she was in trouble she called me and expected a magical fix, and sometimes I delivered.",
        rememberNote: "The sheer panic when you announced the hair cut was cinematic gold. Your video calls are genuinely the highest tier of entertainment.",
        reaction: "Chaos Energy: 1000% 🌪️"
      },
      {
        id: "exhibit-5",
        title: "The Diva Files",
        starIds: ["s07", "s08"],
        photos: [
          {
            src: "assets/photos/museum-04-cute-and-deadly.jpg",
            alt: "Hashini looking cute and deadly",
            caption: "Cute and deadly."
          },
          {
            src: "assets/photos/museum-05-prettiest-smile.jpg",
            alt: "Hashini with the prettiest smile",
            caption: "You look prettiest when you smile."
          },
          {
            src: "assets/photos/museum-06-favourite-pic.jpg",
            alt: "Favourite picture of Hashini",
            caption: "My favourite pic of you."
          }
        ],
        intro: "The full spectrum of Hashini: effortlessly cute, dangerously sharp, and always commanding the room like a true diva.",
        rememberNote: "No one can switch from adorable angel to fierce queen as effortlessly as you do.",
        reaction: "Diva Royalty 👑"
      },
      {
        id: "exhibit-6",
        title: "Now",
        starId: "s17",
        photos: [
          {
            src: "assets/photos/museum-10-you-now.jpg",
            alt: "Hashini now",
            caption: "You now and me now."
          },
          {
            src: "assets/photos/museum-11-me-now.jpg",
            alt: "Mithra now",
            caption: "You now and me now."
          }
        ],
        intro: "Most things changed. We didn't.",
        rememberNote: "We grew up, our worlds expanded, but that quiet understanding between us remained exactly where we left it.",
        reaction: "Always Us ✨"
      }
    ]
  },

  profile: {
    title: "Hashini's Profile",
    subtitle: "The official, verified dossier of an ocean-hearted diva.",
    name: "Hashini",
    starIds: {
      bio: "s09",
      stats: "s10",
      chips: "s11",
      callJae: "s12"
    },
    loves: [
      "Blue",
      "Cats",
      "Books",
      "Cute little things",
      "Selfies",
      "Documenting the little things",
      "Drawing",
      "Music (a \"majaa\" music taste)"
    ],
    phrases: [
      { text: "MAJAAA", reaction: "Pure peak joy! 🎉" },
      { text: "NE GAY", reaction: "The ultimate signature comeback! 💫" }
    ],
    stats: [
      { label: "Chaos", value: 100, display: "100%", width: "100%" },
      { label: "Overthinking", value: 100, display: "100%, overflowing", width: "115%", overflow: true },
      { label: "Main-character energy", value: 100, display: "100%", width: "100%" },
      { label: "Taste in men", value: 8, display: "loading... failed", width: "15%", failed: true },
      { label: "Selfies", value: 100, display: "uncountable", width: "100%", special: true },
      { label: "Crisis calls to Jae", value: 100, display: "24/7", width: "100%", special: true }
    ],
    emergencyCard: {
      title: "EMERGENCY CONTACT: JAE",
      subtitle: "Front-row seat to all questionable life decisions. Always on speed dial.",
      buttonText: "Call Jae",
      callingText: "Calling Jae...",
      inProgressText: "Jae is on it…",
      solvedText: "Problem solved. Magically.",
      successNote: "Success rate: surprisingly high."
    }
  },

  chaosZone: {
    title: "The Chaos Zone",
    subtitle: "Two quick tests of memory, survival skills, and mutual madness.",
    survivedMessage: "Congratulations. You have officially survived the chaos.",
    gameA: {
      id: "gameA",
      title: "Who Said This?",
      starId: "s13",
      questions: [
        {
          question: '"MAJAAA!"',
          options: ["Hashini", "Jae", "Both"],
          answer: "Hashini",
          feedback: "Classic Hashini energy! It's practically her personal trademark."
        },
        {
          question: '"I\'m in trouble, please fix it magically."',
          options: ["Hashini", "Jae", "Both"],
          answer: "Hashini",
          feedback: "Her immediate reaction to any mild crisis. Speed dial Jae!"
        },
        {
          question: '"Two green chillies. One each."',
          options: ["Hashini", "Jae", "Both"],
          answer: "Both",
          feedback: "The sacred noodle ritual agreed upon by both sides."
        }
      ],
      resultTitle: "Chaos Certified!",
      resultText: "You mastered the quotes with true diva precision."
    },
    gameB: {
      id: "gameB",
      title: "How Well Do You Know Us?",
      starId: "s14",
      questions: [
        {
          question: "How many green chillies go into our noodles?",
          options: ["1", "2", "3", "None"],
          answer: "2",
          feedback: "Exactly 2 green chillies! One each, the supreme noodle standard."
        },
        {
          question: "What was our first midnight snack?",
          options: ["Maggi noodles", "Lemon juice and coffee", "Leftover pizza", "Ice cream"],
          answer: "Lemon juice and coffee",
          feedback: "Lemon juice and coffee! Only our combined chaos could invent that concoction."
        },
        {
          question: "In which year did we get close?",
          options: ["2018", "2019", "2020", "2021"],
          answer: "2020",
          feedback: "2020! When everything shifted and our friendship became unbreakable."
        }
      ],
      resultTitle: "Memory Master!",
      resultText: "You passed the ultimate test of our iconic moments."
    }
  },

  bubbleCorner: {
    title: "Bubble's Corner",
    subtitle: "The fluffy supervisor of this entire operation. Look at her, she knows she's royalty.",
    starIds: ["s15", "s16"],
    photos: [
      {
        src: "assets/photos/bubble-01.jpg",
        alt: "Bubble doing her innocent face",
        caption: "Bubble, doing her best innocent face."
      },
      {
        src: "assets/photos/bubble-02.jpg",
        alt: "Bubble exquisite content certified",
        caption: "Bubble: exquisite content, officially certified."
      },
      {
        src: "assets/photos/bubble-03.jpg",
        alt: "Bubble looking at you like the main character",
        caption: "Looking at you like you are the main character."
      }
    ],
    mascotLines: [
      "Meow? I am supervising your star hunting.",
      "Purrr... Did someone say treats?",
      "If it fits, I sits. That is the universal cat law.",
      "Currently judging your overthinking levels. Very high.",
      "Just taking my 16th scheduled nap of the afternoon.",
      "MAJAAA! (I learned that from my humans).",
      "Blinking slowly at you because you are my favorite.",
      "I am the queen of this ocean kingdom, obviously."
    ]
  },

  stars: {
    total: 18,
    solution: "YOU WILL NOT BE ALONE ♡",
    mapping: {
      s01: { letter: "Y", hint: "Somewhere watching over our very beginning..." },
      s02: { letter: "O", hint: "Lingering near the words that define us..." },
      s03: { letter: "U", hint: "A sparkle from our earliest childhood battles..." },
      s04: { letter: "W", hint: "Hidden where we were young and delightfully awkward..." },
      s05: { letter: "I", hint: "Listening quietly to conversations that lasted until dawn..." },
      s06: { letter: "L", hint: "Where sudden panics and questionable plans were made..." },
      s07: { letter: "L", hint: "Carried by someone who always commands the spotlight..." },
      s08: { letter: "N", hint: "Resting quietly among memories of her radiant smile..." },
      s09: { letter: "O", hint: "A little spark where our diva's passions are gathered..." },
      s10: { letter: "T", hint: "Drifting near the thoughts that never seem to stop spinning..." },
      s11: { letter: "B", hint: "Echoing in the words we say without thinking..." },
      s12: { letter: "E", hint: "Waiting on standby for when things go completely wrong..." },
      s13: { letter: "A", hint: "Earned by knowing who speaks pure chaos..." },
      s14: { letter: "L", hint: "Surfaced by remembering our shared history..." },
      s15: { letter: "O", hint: "Under the watchful green eyes of royalty..." },
      s16: { letter: "N", hint: "Resting near certified evidence of four-legged perfection..." },
      s17: { letter: "E", hint: "Proof that through every passing year, we never changed..." },
      s18: { letter: "♡", hint: "Deep in the quiet tide where the night meets the horizon..." }
    }
  },

  secretEnding: {
    message: "YOU WILL NOT BE ALONE ♡",
    backButtonText: "Back to the site",
    poemLines: [
      "Never the same, never the same",
      "For I, stared at the blue sky",
      "Looking at the stars wondering",
      "Whether they do justice for your eyes.",
      "Wandering through the snaps of life",
      "I watched the little naive kids dancing",
      "Jumping around in a pink t-shirt and blue frock,",
      "When life meant only to be just us",
      "When we cried over pretty dolls",
      "And when we were just rivals in the name of cousins,",
      "To love you is the best thing ever happened to me!",
      "",
      "Look at the moon hung by your window and remember;",
      "I will always follow you though I might have my phases, I will return to you!"
    ],
    signoff: "— Mithra"
  }
};
