/* ============================================================
   For Mireina — a storybook
   ============================================================ */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FLIP_MS = 760;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"
  }[c]));

  const roman = (n) => {
    const map = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
    let out = "";
    for (const [value, glyph] of map) {
      while (n >= value) { out += glyph; n -= value; }
    }
    return out;
  };

  // Safely wraps emojis in animated spans
  function styleEmoji(raw) {
    const emojiRegex = /([\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2764}\u{FE0F}]+)/gu;
    const parts = raw.split(emojiRegex);
    
    return parts.map(part => {
      if (!part) return "";
      if (emojiRegex.test(part)) {
        let cls = "emoji";
        if (/[\u{1F602}\u{1F923}\u{1F606}]/u.test(part)) cls += " emoji--laugh";
        else if (/[\u{2764}\u{2665}\u{1F495}\u{1F49E}\u{1F496}]/u.test(part)) cls += " emoji--heart";
        else if (/[\u{2728}\u{2B50}\u{1F31F}]/u.test(part)) cls += " emoji--sparkle";
        emojiRegex.lastIndex = 0; // Reset regex state
        return `<span class="${cls}" aria-hidden="true">${part}</span>`;
      }
      emojiRegex.lastIndex = 0;
      return esc(part);
    }).join("");
  }

  // Render text with word-by-word reveal and emoji styling
  function renderText(text, counter) {
    const segments = text.split(/(\*\*[^*]+\*\*)/g);
    const words = [];

    for (const segment of segments) {
      if (!segment) continue;
      const emphasized = segment.startsWith("**") && segment.endsWith("**");
      const content = emphasized ? segment.slice(2, -2) : segment;

      for (const raw of content.split(/\s+/)) {
        if (!raw) continue;
        const delay = Math.min(counter.n * 10, 720);
        counter.n += 1;

        const plain = raw.replace(/[^\p{L}\p{N}]/gu, "");
        const isName = plain.toLowerCase() === "mireina";
        
        const inner = `${isName ? '<span class="name">' : ""}${styleEmoji(raw)}${isName ? "</span>" : ""}`;

        words.push(
          `<span class="w${emphasized ? " w--em" : ""}" style="--d:${delay}ms">` +
          `<span class="w-in">${inner}</span></span>`
        );
      }
    }
    return words.join(" ");
  }

  const PAGES = [
    {
      type: "cover",
      theme: { bg: ["#1c0b22", "#4a1c3c", "#0d0611"], accent: "#f4bfd0", deep: "#a84462", gold: "#e7c184", particles: ["#f4bfd0", "#e7c184"], particle: "heart" }
    },
    {
      title: "The Words I Couldn't Find",
      caption: "somewhere between a thought and a heartbeat",
      art: "quill",
      theme: { bg: ["#241028", "#4a1d3f", "#120814"], accent: "#f0b6c8", deep: "#a8455f", gold: "#e8c48c", particles: ["#f0b6c8", "#e8c48c"], particle: "petal" },
      paras: [
        "I have tried so many times to find the perfect words to explain **what you mean to me**. And somehow, every time I begin, I realise that words are terribly inadequate for the job.",
        "How do I put something as enormous as my love for you into sentences? How do I explain a feeling that seems to grow bigger every time I think I've reached the limits of it?",
        "Sometimes I wish I could take you on **a little journey into my heart** — just so you could see what happens in there whenever your name crosses my mind. You would understand why I smile at my phone. Why a simple message from you can change the direction of my entire day."
      ]
    },
    {
      title: "The One I Don't Joke With",
      caption: "serious about you",
      art: "vow",
      theme: { bg: ["#2a0e1c", "#591a2d", "#150810"], accent: "#ffb3a8", deep: "#a83f45", gold: "#ffd39b", particles: ["#ffb3a8", "#ffd39b"], particle: "ember" },
      paras: [
        "You are one person I do not joke with, my love. And I don't mean that as a cute romantic statement — I mean it with **every seriousness in my heart**.",
        "You matter to me in ways I cannot always explain, and I have tried to show you that through my actions, my sacrifices, my decisions, and the many times I have chosen to show up for you.",
        "My love for you is not something I only remember when things are sweet and easy. I want to be there when you are happy, when you are overwhelmed, and even when you don't have the words to explain what is happening inside you.",
        "I want to be someone you can count on. Not just someone who tells you that you can."
      ]
    },
    {
      title: "A Day Without You",
      caption: "the state of emergency",
      art: "drifter",
      theme: { bg: ["#0e1524", "#22314a", "#070b12"], accent: "#a9c8ea", deep: "#4f6a92", gold: "#ffd489", particles: ["#a9c8ea", "#ffd489"], particle: "rain" },
      paras: [
        "Honestly, I don't even know how I would function if I had to go a whole day without you. 😂",
        "I would probably end up on the street with a stick in my hand, a cloth hanging at the end of it, a very long face and black sack eyes — looking like a man whose entire reason for existence has packed its bags and travelled abroad.",
        "Somebody would ask me what happened, and I would have to explain that I haven't seen or heard from my Mireina. The situation would be terrible. **The nation would have to declare a state of emergency.**",
        "But jokes aside, you have become such a beautiful part of my everyday life. You have a way of making ordinary days feel like they have something special hidden inside them."
      ]
    },
    {
      title: "Ridiculously Beautiful",
      caption: "my favourite sight",
      art: "eyes",
      theme: { bg: ["#2c1226", "#5e2542", "#150913"], accent: "#ffc0b3", deep: "#b05065", gold: "#ffe0aa", particles: ["#ffc0b3", "#ffe0aa"], particle: "butterfly" },
      paras: [
        "And can we talk about how ridiculously beautiful you are? Because sweetheart, I genuinely don't think you understand the extent of my admiration for you.",
        "I love your face. I love your eyes — those beautiful eyes that can hold my attention longer than almost anything else in this world. I could stare at them and still find something new to admire. I love your hair, the way it frames your beauty.",
        "I love your lips, your smile, your cheeks, and all those little expressions your face makes without you even realising. I love the way you look when you're excited, when you're thinking, and even in the little moments when you're simply existing.",
        "Somehow, you still manage to be **my favourite sight**."
      ]
    },
    {
      title: "Every Inch of You",
      caption: "every inch, no exceptions",
      art: "flower",
      theme: { bg: ["#2b0f1d", "#5c2436", "#160910"], accent: "#ffa6b8", deep: "#b04462", gold: "#ffcfa0", particles: ["#ffa6b8", "#ffcfa0"], particle: "petal" },
      paras: [
        "And your body, my goodness, woman. ❤️ I love every inch of you.",
        "I love your curves, your shape, your breasts, your beautiful ass, and those thighs of yours that deserve their own special chapter in this book. **My favourite.** ❤️",
        "I love the way your body comes together, the way you carry yourself, the beautiful confidence and femininity in the way you move. Your waist. Your hips. Your legs.",
        "I don't want you to ever feel that you have to look different to be loved by me. You don't need to compete with anyone or wonder whether you are enough. **You are incredibly attractive to me — and I hope you never forget it.**"
      ]
    },
    {
      title: "The Way You Move",
      caption: "the language of you",
      art: "ribbons",
      theme: { bg: ["#0d222c", "#1f4450", "#071016"], accent: "#a8e3d6", deep: "#3f7b72", gold: "#ffd8a6", particles: ["#a8e3d6", "#ffd8a6"], particle: "firefly" },
      paras: [
        "But what really gets me is that my admiration doesn't stop at what I can see.",
        "I love the way you walk. I love the way you talk, the sound of your voice, the way you pronounce certain words, the way you move your hands, the little gestures you make — and even the way you blink. 😂",
        "I love those tiny things that most people would probably overlook. I love the way you breathe, the way you laugh, the way you react to things, and the little habits that make you uniquely you.",
        "I could watch you doing something completely ordinary and still find myself thinking, **“This is my girl. This is the woman I adore.”** ✨"
      ]
    },
    {
      title: "Beyond the Beauty",
      caption: "still discovering",
      art: "constellation",
      theme: { bg: ["#171030", "#32205a", "#0a0714"], accent: "#c8b8ff", deep: "#6753a8", gold: "#ffe0a6", particles: ["#c8b8ff", "#ffe0a6"], particle: "star" },
      paras: [
        "I love your personality, too. I love the person you are beyond your beauty. The conversations, the jokes, the random moments, the silly things we laugh about.",
        "I want to keep discovering you. I want to learn the things that make you happy, the things that upset you, the dreams you sometimes struggle to put into words, and the little things you wish someone would notice.",
        "I don't want to assume I know everything about you simply because I love you. I want to keep asking, listening, learning and growing with you. 🌟"
      ]
    },
    {
      title: "My First Thought",
      caption: "you, in all the small corners",
      art: "planes",
      theme: { bg: ["#291521", "#5e2b2c", "#140a10"], accent: "#ffb692", deep: "#a85a42", gold: "#ffe3b3", particles: ["#ffb692", "#ffe3b3"], particle: "petal" },
      paras: [
        "There is something beautiful about having a person who becomes your first thought when something wonderful happens. **You are that person for me.**",
        "When I see something funny, I want to tell you. When something good happens, I want to share it with you. When I discover something interesting, I want to hear what you think.",
        "Sometimes I don't even have anything important to say. I just want to talk to you because talking to you is enough. The boring details of my day. The ridiculous thoughts that cross my mind.",
        "I want you in the little corners of my life — not just the big celebrations. 💌"
      ]
    },
    {
      title: "To Love You Well",
      caption: "somewhere safe",
      art: "house",
      theme: { bg: ["#211505", "#4a2c13", "#100903"], accent: "#ffcb90", deep: "#9a6734", gold: "#ffe8bd", particles: ["#ffcb90", "#ffe8bd"], particle: "firefly" },
      paras: [
        "I don't just want to love you loudly. **I want to love you well.**",
        "I want my love to be something you can actually experience, not just something you read in messages. I want you to feel safe enough to be yourself around me. To tell me when something hurts, or when you simply need space.",
        "I want us to be able to have difficult conversations without making each other feel like enemies. Love is not always going to be a perfect collection of beautiful moments.",
        "But I want to keep choosing patience, honesty, understanding and effort. I want us to become better at loving each other — not just more accustomed to each other. 🏡"
      ]
    },
    {
      title: "I Want to Celebrate You",
      caption: "loudest in the crowd",
      art: "fireworks",
      theme: { bg: ["#28101f", "#681d38", "#13070e"], accent: "#ffd27a", deep: "#b06a2f", gold: "#ffe9b0", particles: ["#ffd27a", "#ff9ec0"], particle: "confetti" },
      paras: [
        "I want to celebrate your wins — even the ones that seem small to everybody else. I want to encourage you when you doubt yourself. I want to remind you of how capable you are when you forget. 🎉",
        "I want to see you grow into every beautiful thing you dream of becoming. I don't want your world to become smaller because you love me.",
        "And I want to be somewhere in the crowd, **clapping the loudest**, reminding you that I knew you could do it.",
        "Your dreams matter to me because you matter to me. ✨"
      ]
    },
    {
      title: "The Future I Smile About",
      caption: "all the ordinary forevers",
      art: "horizon",
      theme: { bg: ["#260f20", "#702f2c", "#160810"], accent: "#ffb488", deep: "#b05e45", gold: "#ffe0a8", particles: ["#ffb488", "#ffe0a8"], particle: "petal" },
      paras: [
        "Sometimes I think about the future and find myself smiling.",
        "I imagine all the ordinary things we haven't experienced yet. The random mornings. The playful arguments over absolutely nothing. The meals, the laughter, the adventures, the quiet evenings, and the inside jokes that nobody else will understand.",
        "I want to experience life with you. I want to look back years from now and remember that there was a time when we were still discovering each other, still learning each other's habits.",
        "I want to keep collecting those moments with you. 🌅"
      ]
    },
    {
      title: "My Promise",
      caption: "a promise, sealed",
      art: "seal",
      theme: { bg: ["#260c16", "#541726", "#14070c"], accent: "#ffa3a3", deep: "#a8444f", gold: "#ffd6a0", particles: ["#ffa3a3", "#ffd6a0"], particle: "ember" },
      paras: [
        "And if I could make one promise to you, it would be this: **you will never have to beg to feel valued in a relationship with me.**",
        "I want to be intentional about showing you that you matter. I want to pay attention. I want to communicate. I want to take responsibility when I am wrong.",
        "Loving someone is not about promising that you will never make mistakes. It is about being willing to recognise them, learn from them and do better.",
        "I want to keep doing that with you. 💍"
      ]
    },
    {
      title: "If I Had to Choose You Again",
      caption: "again, and again",
      art: "infinity",
      theme: { bg: ["#1e0e2c", "#44204f", "#0d0715"], accent: "#ffb8dc", deep: "#a84d7c", gold: "#ffe0aa", particles: ["#ffb8dc", "#ffe0aa"], particle: "heart" },
      paras: [
        "If I had to choose you again, I would want to know you again. Laugh with you again. Flirt with you again. Discover your little habits again. Fall for all those tiny details again. ♾️",
        "I would want another opportunity to hear your voice for the first time, to see your smile, to learn what makes you laugh — and to realise, slowly, that you are becoming someone incredibly important to me.",
        "And when I finally understood how much you meant to me, **I would still choose to love you.**",
        "Again. And again. And again. ❤️"
      ]
    },
    {
      title: "Somewhere in This World",
      caption: "somewhere in this enormous world",
      art: "globe",
      theme: { bg: ["#080e20", "#182548", "#04060e"], accent: "#a9c9ff", deep: "#4d6499", gold: "#ffe2a2", particles: ["#a9c9ff", "#ffe2a2"], particle: "star" },
      paras: [
        "So my Mireina, whenever you read this, I want you to remember that somewhere in this enormous world, there is a man who thinks you are an extraordinary human being.",
        "A man who adores your face, your body, your personality, and your little habits — and even the things you probably don't notice about yourself. A man who wants to show up for you and make you laugh. 🌍",
        "I love you when you are dressed up and when you are completely relaxed. When you are smiling and when you are quiet. When you are being playful, when you are being serious, and when you have absolutely nothing to say.",
        "I love the grand things about you. And I love the tiny things — the things you know I notice, and the things you probably never imagined I would. 💫"
      ]
    },
    {
      title: "You Are My Girl",
      caption: "my girl",
      art: "crown",
      theme: { bg: ["#26101a", "#582430", "#140810"], accent: "#ffb6a2", deep: "#a84f45", gold: "#ffdda8", particles: ["#ffb6a2", "#ffdda8"], particle: "heart" },
      paras: [
        "You are my girl. My favourite face. My favourite voice. My favourite set of thighs. 😂❤️ My favourite person to disturb, adore, tease, appreciate and love.",
        "You are the woman whose absence would have me walking around with my travelling stick and terrible sack eyes — and whose presence can make the simplest day feel special.",
        "I don't know how many pages it would take to explain everything I feel for you. I suspect this entire book might still not be enough. But I hope that whenever you turn these pages, you feel a little of what I feel whenever I think about you. 👑"
      ]
    },
    {
      type: "finale",
      theme: { bg: ["#260a18", "#601a34", "#12050d"], accent: "#ffc2d3", deep: "#b04a68", gold: "#ffe6b2", particles: ["#ffc2d3", "#ffe6b2"], particle: "heart" },
      paras: [
        "Thank you for being Mireina. Thank you for being the woman you are. Thank you for being part of my life. 🌹",
        "I love you beyond the limits of my vocabulary, beyond the reach of these pages, and beyond what I could ever properly fit into a letter.",
        "You are, and will always be, my favourite person in this entire universe. ✨❤️"
      ]
    },
    {
      type: "gift",
      theme: { bg: ["#260a18", "#601a34", "#12050d"], accent: "#ffc2d3", deep: "#b04a68", gold: "#ffe6b2", particles: ["#ffc2d3", "#ffe6b2"], particle: "heart" }
    }
  ];

  // --- SVG Ingredients ---
  const sparkle = (x, y, s, delay, cls = "gold") => `<g transform="translate(${x} ${y})"><path class="line thin twinkle ${cls}" style="--tw:${delay}s" d="M0 -${s} V${s} M-${s} 0 H${s}"/></g>`;
  const heartShape = (x, y, s, cls = "solid", delay = null) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 14 C-9 6 -16 0 -16 -6 C-16 -11 -12 -14 -8 -14 C-4 -14 -1 -12 0 -9 C1 -12 4 -14 8 -14 C12 -14 16 -11 16 -6 C16 0 9 6 0 14 Z" class="${cls}${delay !== null ? " twinkle" : ""}" style="--tw:${delay || 0}s"/></g>`;
  
  const arts = {
    quill: () => `<svg class="art-svg" viewBox="0 0 240 280"><circle cx="120" cy="138" r="86" class="line hair"/><g class="float"><path class="line draw" d="M120 42 C154 68 158 122 132 160 C120 178 106 196 98 222"/><path class="line draw" d="M120 42 C86 68 82 122 108 160 C120 178 134 196 142 222"/><path class="line thin draw" d="M120 48 L120 226"/><path class="line hair draw" d="M117 88 L94 102 M123 88 L146 102 M115 114 L90 130 M125 114 L150 130 M114 140 L96 154 M126 140 L144 154"/></g>${sparkle(54, 94, 5, 0.2)}${sparkle(188, 76, 4, 0.9)}</svg>`,
    vow: () => `<svg class="art-svg" viewBox="0 0 240 280"><circle cx="120" cy="118" r="88" class="line hair" stroke-dasharray="2 7"/><g class="heartbeat"><path class="line draw" d="M120 190 C74 150 54 124 54 97 C54 73 71 56 93 56 C106 56 116 63 120 75 C124 63 134 56 147 56 C169 56 186 73 186 97 C186 124 166 150 120 190 Z"/><path class="soft" d="M120 178 C83 145 64 121 64 98 C64 80 78 66 95 66 C108 66 117 74 120 87 C123 74 132 66 145 66 C162 66 176 80 176 98 C176 121 157 145 120 178 Z"/></g>${sparkle(70, 74, 4, 0.3)}${sparkle(176, 146, 5, 1.1)}</svg>`,
    drifter: () => `<svg class="art-svg" viewBox="0 0 240 280"><path class="line hair" d="M20 232 H222"/><ellipse cx="150" cy="240" rx="36" ry="4" class="line hair"/><path class="line" d="M192 232 V134"/><path class="line" d="M184 134 h16 l-3 -13 h-10 Z"/><circle cx="192" cy="121" r="7" class="gold-fill"/><g transform="rotate(3 213 176)"><rect x="195" y="158" width="38" height="34" rx="2" class="line thin" style="fill:rgba(240,228,208,.05)"/><text x="214" y="170" class="svg-label" font-size="5.6" text-anchor="middle">MISSING</text><text x="214" y="179" class="svg-label" font-size="5.6" text-anchor="middle">MIREINA</text></g><g class="sad-man"><ellipse cx="96" cy="104" rx="13" ry="16.5" class="line" style="fill:rgba(6,9,16,.5)"/><path class="line hair" d="M84 96 q-4 -6 1 -9 M108 96 q4 -6 -1 -9"/><ellipse cx="90" cy="102" rx="3.2" ry="2.6" style="fill:#080a12;stroke:currentColor"/><ellipse cx="102" cy="102" rx="3.2" ry="2.6" style="fill:#080a12;stroke:currentColor"/><path class="line thin" d="M89 115 q7 -4.5 14 0"/><path class="line" d="M96 120 V164"/><path class="line" d="M96 164 L80 204 M96 164 L112 204"/><path class="line" d="M54 68 L122 148"/><circle cx="50" cy="62" r="13" class="line"/></g><g class="rain">${Array.from({length:6}).map((_,i)=>`<line x1="${30+i*30}" y1="${30+i*15}" x2="${30+i*30}" y2="${45+i*15}" class="line hair rain-line" style="--rd:${i*0.2}s"/>`).join("")}</g></svg>`,
    eyes: () => `<svg class="art-svg" viewBox="0 0 240 280"><g class="blink"><path class="line draw" d="M34 148 Q74 114 114 148 Q74 182 34 148 Z"/><path class="line draw" d="M126 148 Q166 114 206 148 Q166 182 126 148 Z"/><circle cx="74" cy="148" r="15" class="line thin"/><circle cx="166" cy="148" r="15" class="line thin"/><circle cx="74" cy="148" r="7" class="solid"/><circle cx="166" cy="148" r="7" class="solid"/></g>${sparkle(42, 52, 4, 0.2)}${sparkle(150, 34, 3, 0.6)}</svg>`,
    flower: () => `<svg class="art-svg" viewBox="0 0 240 280"><g class="petal-spin" style="animation-duration:52s">${[0,60,120,180,240,300].map(d=>`<ellipse cx="120" cy="88" rx="27" ry="46" class="line thin" transform="rotate(${d} 120 134)"/>`).join("")}</g><circle cx="120" cy="134" r="19" class="line"/>${heartShape(120, 226, 0.34, "gold-fill")}${sparkle(58, 106, 4, 0.4)}${sparkle(186, 92, 4, 1.2)}</svg>`,
    ribbons: () => `<svg class="art-svg" viewBox="0 0 240 280"><g class="sway"><path class="line draw" d="M24 196 C64 138 96 260 146 190 S206 96 222 140"/><path class="line thin draw" d="M24 150 C70 100 104 214 152 148 S208 52 226 96"/></g>${sparkle(46, 88, 4, 0.3)}${sparkle(204, 218, 4, 1)}</svg>`,
    constellation: () => `<svg class="art-svg" viewBox="0 0 240 280"><ellipse cx="120" cy="122" rx="102" ry="76" class="line hair" stroke-dasharray="1 8"/><g class="float"><path d="M120 34 l4 12 12 4 -12 4 -4 12 -4 -12 -12 -4 12 -4 Z" class="gold-fill"/></g>${sparkle(42, 182, 4, 0.7)}${sparkle(198, 196, 4, 1.3)}</svg>`,
    planes: () => `<svg class="art-svg" viewBox="0 0 240 280"><g class="plane-fly"><path class="line" d="M-15 0 L17 7 L-13 19 L-7 6 Z"><animateMotion dur="15s" repeatCount="indefinite" rotate="auto" path="M62 196 C34 160 62 112 102 132 C142 152 150 210 100 222 C58 232 38 190 70 172"/></path></g>${heartShape(176, 72, 0.5, "gold-fill", 0.4)}${heartShape(196, 106, 0.32, "line thin", 1.2)}${sparkle(150, 228, 4, 1.1)}</svg>`,
    house: () => `<svg class="art-svg" viewBox="0 0 240 280"><path class="line hair" d="M18 236 Q120 226 222 236"/><path class="line draw" d="M80 234 V154 L120 120 L160 154 V234"/><path class="line draw" d="M67 158 L120 112 L173 158"/><rect x="104" y="160" width="32" height="32" rx="2" class="line"/><path class="line" d="M112 234 v-25 a8 8 0 0 1 16 0 v25"/>${heartShape(92, 92, 0.4, "gold-fill", 0.6)}${sparkle(60, 130, 4, 0.9)}</svg>`,
    fireworks: () => `<svg class="art-svg" viewBox="0 0 240 280"><g class="burst">${Array.from({length:12}).map((_,i)=>`<path class="line thin gold" d="M${120+Math.cos(i*Math.PI/6)*15} ${108+Math.sin(i*Math.PI/6)*15} L${120+Math.cos(i*Math.PI/6)*50} ${108+Math.sin(i*Math.PI/6)*50}"/>`).join("")}</g>${sparkle(40, 70, 4, 0.2)}${sparkle(204, 66, 4, 0.9)}</svg>`,
    horizon: () => `<svg class="art-svg" viewBox="0 0 240 280"><path class="line gold draw" d="M120 146 m-42 0 a42 42 0 1 1 84 0"/><path d="M0 196 Q46 172 94 190 T186 184 T240 192 V280 H0 Z" style="fill:currentColor;opacity:.1"/>${heartShape(120, 232, 0.34, "line thin")}${sparkle(48, 44, 4, 0.2)}</svg>`,
    seal: () => `<svg class="art-svg" viewBox="0 0 240 280"><g class="stamp"><circle cx="120" cy="116" r="54" class="line"/><circle cx="120" cy="116" r="46" class="line thin" stroke-dasharray="2 5"/><text x="120" y="134" text-anchor="middle" class="seal-letter">M</text>${heartShape(120, 152, 0.3, "gold-fill")}</g>${sparkle(72, 156, 4, 0.9)}${sparkle(166, 76, 4, 0.4)}</svg>`,
    infinity: () => `<svg class="art-svg" viewBox="0 0 240 280"><path id="inf-path" d="M120 140 C120 100 62 100 62 140 C62 180 120 180 120 140 C120 100 178 100 178 140 C178 180 120 180 120 140" fill="none" stroke="none"/><path class="line draw" d="M120 140 C120 100 62 100 62 140 C62 180 120 180 120 140 C120 100 178 100 178 140 C178 180 120 180 120 140"/><g><path d="M0 14 C-9 6 -16 0 -16 -6 C-16 -11 -12 -14 -8 -14 C-4 -14 -1 -12 0 -9 C1 -12 4 -14 8 -14 C12 -14 16 -11 16 -6 C16 0 9 6 0 14 Z" class="gold-fill"/><animateMotion dur="10s" repeatCount="indefinite"><mpath href="#inf-path"/></animateMotion></g>${sparkle(48, 82, 4, 0.4)}${sparkle(192, 200, 4, 1.2)}</svg>`,
    globe: () => `<svg class="art-svg" viewBox="0 0 240 280"><circle cx="120" cy="138" r="78" class="line"/><ellipse cx="120" cy="138" rx="78" ry="30" class="line hair"/><ellipse cx="120" cy="138" rx="48" ry="78" class="line hair"/><path class="line gold draw" d="M62 168 Q96 74 166 106"/><g transform="translate(166 106)"><circle r="13" class="pulse-ring" style="stroke:var(--gold-soft);stroke-width:1;fill:none"/>${heartShape(0, 0, 0.42, "gold-fill")}</g>${sparkle(40, 48, 4, 0.2)}${sparkle(186, 38, 4, 0.6)}</svg>`,
    crown: () => `<svg class="art-svg" viewBox="0 0 240 280"><g class="float"><path class="line draw" d="M84 104 L94 76 L108 96 L120 68 L132 96 L146 76 L156 104 Z"/><path class="line thin" d="M84 110 H156"/></g><g class="heartbeat"><path class="line draw" d="M120 232 C80 200 58 176 58 150 C58 128 74 112 94 112 C107 112 116 119 120 130 C124 119 133 112 146 112 C166 112 182 128 182 150 C182 176 160 200 120 232 Z"/><path class="soft" d="M120 220 C86 191 68 169 68 150 C68 133 80 122 95 122 C108 122 117 130 120 142 C123 130 132 122 145 122 C160 122 172 133 172 150 C172 169 154 191 120 220 Z"/></g>${heartShape(58, 88, 0.34, "line thin", 0.4)}${sparkle(120, 40, 3, 0.2)}</svg>`,
    bloom: () => `<svg class="art-svg" viewBox="0 0 240 280"><circle cx="120" cy="132" r="76" style="fill:currentColor;opacity:.07;filter:blur(10px)"/><circle cx="120" cy="132" r="30" class="line thin"/><g class="heartbeat"><path class="line draw" d="M120 170 C96 151 84 138 84 125 C84 113 92 105 103 105 C110 105 116 109 120 116 C124 109 130 105 137 105 C148 105 156 113 156 125 C156 138 144 151 120 170 Z"/></g>${heartShape(54, 86, 0.4, "gold-fill", 0.3)}${sparkle(40, 176, 4, 0.5)}</svg>`
  };

  const coverArt = () => `<svg viewBox="0 0 200 150" fill="none" style="width:100%;height:auto"><path d="M28 138 V72 A72 72 0 0 1 172 72 V138" class="line hair" stroke-dasharray="1 7" style="stroke:currentColor"/><path d="M112 34 a26 26 0 1 0 18 43 a21 21 0 1 1 -18 -43 Z" class="line gold" style="stroke:var(--gold-soft);stroke-width:1.2"/><path d="M60 52 l2.6 6 6 2.6 -6 2.6 -2.6 6 -2.6 -6 -6 -2.6 6 -2.6 Z" style="fill:var(--gold-soft)"/><g transform="translate(100 108)"><path d="M0 16 C-10 8 -18 1 -18 -6 C-18 -12 -13 -16 -8 -16 C-4 -16 -1 -13 0 -10 C1 -13 4 -16 8 -16 C13 -16 18 -12 18 -6 C18 1 10 8 0 16 Z" stroke="var(--gold-soft)" stroke-width="1.1" fill="none"/></g></svg>`;

  const pagesRoot = $("#pages");
  const pageEls = [];
  let chapterNo = 0;

  function buildPages() {
    PAGES.forEach((page, index) => {
      const el = document.createElement("section");
      el.className = "page";
      el.setAttribute("aria-hidden", "true");
      el.inert = true;
      el.dataset.index = String(index);
      
      el.style.setProperty("--bg1", page.theme.bg[0]);
      el.style.setProperty("--bg2", page.theme.bg[1]);
      el.style.setProperty("--bg3", page.theme.bg[2]);
      el.style.setProperty("--accent", page.theme.accent);
      el.style.setProperty("--accent-deep", page.theme.deep);
      el.style.setProperty("--gold", page.theme.gold);

      if (page.type === "cover") {
        el.classList.add("page--cover");
        el.innerHTML = `<div class="page-frame"></div><div class="page-inner"><div class="cover"><div class="cover-ornament">${coverArt()}</div><p class="cover-top">a storybook for</p><h1 class="cover-name">Mireina</h1><p class="cover-sub">my favourite person in this entire universe</p><div class="cover-line"></div><button class="open-btn" type="button" data-action="open">Open the book <span class="arrow">→</span></button><p class="cover-hint">${PAGES.length} pages · one heart · yours</p></div></div><div class="shade"></div>`;
      } 
      else if (page.type === "finale") {
        const counter = { n: 0 };
        const copy = page.paras.map((para) => `<p>${renderText(para, counter)}</p>`).join("");
        el.classList.add("page--finale");
        el.innerHTML = `<div class="page-frame"></div><div class="spine"></div><div class="page-inner"><div class="finale"><div class="finale-bloom">${arts.bloom()}</div><p class="kicker">The Last Page</p><h2 class="finale-name">Mireina</h2><div class="finale-text">${copy}</div><div class="finale-sign"><p class="sign-line">Forever your admirer, your biggest fan,<br>and the man who loves you ridiculously.</p><p class="sign-closing">Yours, with all my heart. ❤️</p></div><div class="finale-next"><button class="btn-ghost" type="button" data-action="open-gift">One last thing <span aria-hidden="true">→</span></button></div></div></div><div class="shade"></div>`;
      }
      else if (page.type === "gift") {
        el.classList.add("page--gift");
        el.innerHTML = `<div class="page-frame"></div><div class="spine"></div><div class="page-inner"><div class="gift" id="gift"><p class="gift-kicker">One last thing</p><h2 class="gift-title">I have something for you.</h2><div class="gift-stage"><button class="gift-btn" type="button" data-action="unbox" aria-label="Open the gift"><svg class="gift-svg" viewBox="0 0 240 240"><ellipse cx="120" cy="204" rx="72" ry="9" class="line hair" opacity=".35"/><g class="gift-lid"><rect x="58" y="94" width="124" height="30" rx="4" class="line" style="fill:rgba(255,240,220,.06)"/><path class="line hair" d="M120 94 V124"/><path class="line" d="M120 94 C104 82 86 78 80 88 C74 98 92 100 120 94 Z"/><path class="line" d="M120 94 C136 82 154 78 160 88 C166 98 148 100 120 94 Z"/><circle cx="120" cy="94" r="5" class="gold-fill"/></g><rect x="64" y="124" width="112" height="76" rx="4" class="line" style="fill:rgba(255,240,220,.04)"/><path class="line hair" d="M120 124 V200"/>${heartShape(120, 162, 0.55, "gold-fill", 0.6)}${sparkle(72, 138, 4, 0.2)}${sparkle(168, 138, 4, 1.1)}</svg><div class="gift-burst" aria-hidden="true">${Array.from({ length: 14 }, (_, i) => { const a = (Math.PI * 2 / 14) * i; const x = 120 + Math.cos(a) * 92; const y = 120 + Math.sin(a) * 92; return i % 2 ? heartShape(x, y, 0.42, "gold-fill") : sparkle(x, y, 5, (i * 0.09).toFixed(2), ""); }).join("")}</div></button></div><p class="gift-hint">tap the box</p><div class="gift-reveal"><p class="gift-final-line">I will always love you forever.<span class="gift-final-heart">❤️</span></p></div><button class="gift-replay" type="button" data-action="replay">Read it again</button></div></div><div class="shade"></div>`;
      }
      else {
        chapterNo += 1;
        const counter = { n: 0 };
        const copy = page.paras.map((para) => `<p>${renderText(para, counter)}</p>`).join("");
        el.innerHTML = `<div class="page-frame"></div><div class="spine"></div><div class="page-inner"><div class="spread"><figure class="illustration">${arts[page.art] ? arts[page.art]() : ""}<figcaption class="art-caption">${esc(page.caption)}</figcaption></figure><div class="copy"><p class="kicker">Chapter ${roman(chapterNo)}</p><h2 class="page-title">${esc(page.title)}</h2><div class="rule"><span></span><i>♥</i><span></span></div><div class="page-text">${copy}</div></div></div><div class="folio">${roman(chapterNo)}</div></div><div class="shade"></div>`;
      }

      pagesRoot.appendChild(el);
      pageEls.push(el);
    });
  }

  // Ambient Canvas
  const Ambient = (() => {
    const canvas = $("#ambient");
    const ctx = canvas ? canvas.getContext("2d") : null;
    if (!ctx) return { set() {}, resize() {} };
    let W = 0, H = 0, DPR = 1, particles = [], mode = "petal", palette = ["#f0b6c8", "#e8c48c"], raf = null, last = 0;
    const rnd = (min, max) => min + Math.random() * (max - min);
    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2); W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    function make() {
      const color = palette[(Math.random() * palette.length) | 0] || "#f0b6c8";
      const p = { type: mode, x: rnd(0, W), y: rnd(0, H), s: rnd(0.5, 1.4), vx: rnd(-9, 9), vy: rnd(10, 26), rot: rnd(0, Math.PI * 2), vr: rnd(-0.7, 0.7), phase: rnd(0, Math.PI * 2), a: REDUCE ? 1 : 0, max: rnd(0.3, 0.6), color, dying: false };
      if (mode === "heart") { p.vy = rnd(-15, -4); p.vx = rnd(-6, 6); p.s = rnd(0.4, 0.95); p.max = rnd(0.3, 0.62); }
      if (mode === "star") { p.vy = rnd(-2.5, 2.5); p.vx = rnd(-2.5, 2.5); p.s = rnd(0.5, 1.35); p.max = rnd(0.25, 0.8); }
      if (mode === "rain") { p.vy = rnd(320, 560); p.vx = rnd(-40, -12); p.s = rnd(0.7, 1.2); p.max = rnd(0.07, 0.17); }
      if (mode === "confetti") { p.vy = rnd(18, 48); p.vx = rnd(-14, 14); p.s = rnd(1.1, 2.6); p.max = rnd(0.35, 0.8); p.rot = rnd(0, 6); }
      if (mode === "firefly") { p.vy = rnd(-8, 8); p.vx = rnd(-12, 12); p.s = rnd(0.7, 1.5); p.max = rnd(0.25, 0.75); }
      if (mode === "butterfly") { p.vy = rnd(-12, -2); p.vx = rnd(-14, 14); p.s = rnd(0.7, 1.3); p.max = rnd(0.3, 0.65); }
      return p;
    }
    function seed() { const count = W < 640 ? 14 : 24; particles = particles.filter((p) => !p.dying).slice(0, count); for (let i = particles.length; i < count; i++) particles.push(make()); }
    function paint(p) {
      const { s, color } = p; ctx.globalAlpha = p.a;
      if (p.type === "petal") { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(0, -7 * s); ctx.bezierCurveTo(7 * s, -2 * s, 5 * s, 6 * s, 0, 7 * s); ctx.bezierCurveTo(-5 * s, 6 * s, -7 * s, -2 * s, 0, -7 * s); ctx.fill(); ctx.restore(); }
      else if (p.type === "heart") { const k = s * 0.75; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot * 0.25); ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(0, 8 * k); ctx.bezierCurveTo(-9 * k, 1 * k, -11 * k, -4 * k, -7 * k, -7 * k); ctx.bezierCurveTo(-3 * k, -10 * k, -0.5 * k, -8 * k, 0, -5 * k); ctx.bezierCurveTo(0.5 * k, -8 * k, 3 * k, -10 * k, 7 * k, -7 * k); ctx.bezierCurveTo(11 * k, -4 * k, 9 * k, 1 * k, 0, 8 * k); ctx.fill(); ctx.restore(); }
      else if (p.type === "star") { ctx.save(); ctx.translate(p.x, p.y); const r = 4 + s * 6; const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 2.4); grad.addColorStop(0, color); grad.addColorStop(0.25, color); grad.addColorStop(1, "rgba(255,255,255,0)"); ctx.globalAlpha = p.a * 0.5; ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(0, 0, r * 2.4, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = p.a; ctx.fillStyle = color; ctx.beginPath(); for (let i = 0; i < 4; i++) { const ang = (Math.PI / 2) * i; const x1 = Math.cos(ang) * r; const y1 = Math.sin(ang) * r; ctx.lineTo(x1 * 0.25, y1 * 0.25); ctx.lineTo(Math.cos(ang + Math.PI / 4) * r * 0.35, Math.sin(ang + Math.PI / 4) * r * 0.35); } ctx.closePath(); ctx.fill(); ctx.restore(); }
      else if (p.type === "rain") { ctx.globalAlpha = p.a; ctx.strokeStyle = color; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + p.vx * 0.02, p.y + 15 * s); ctx.stroke(); }
      else if (p.type === "confetti") { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = p.a; ctx.fillStyle = color; ctx.fillRect(-1.2 * s, -3 * s, 2.4 * s, 6 * s); ctx.restore(); }
      else if (p.type === "firefly") { const pulse = 0.55 + 0.45 * Math.sin(performance.now() * 0.0016 + p.phase); const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 12 * s); grad.addColorStop(0, color); grad.addColorStop(0.3, color); grad.addColorStop(1, "rgba(255,240,180,0)"); ctx.globalAlpha = p.a * pulse * 0.85; ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(p.x, p.y, 12 * s, 0, Math.PI * 2); ctx.fill(); }
      else if (p.type === "butterfly") { const flap = 0.35 + Math.abs(Math.sin(performance.now() * 0.006 + p.phase)) * 0.9; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(Math.sin(performance.now() * 0.001 + p.phase) * 0.3); ctx.fillStyle = color; ctx.globalAlpha = p.a * 0.85; ctx.beginPath(); ctx.ellipse(-3.5 * s * flap, -2 * s, 4 * s, 6 * s, -0.5, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(3.5 * s * flap, -2 * s, 4 * s, 6 * s, 0.5, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    }
    function step(p, dt, now) {
      const target = p.dying ? 0 : p.max; p.a += (target - p.a) * Math.min(1, dt * 2.2); if (p.dying && p.a < 0.01) return false;
      p.x += (p.vx + Math.sin(now * 0.0012 + p.phase) * 7) * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
      if (p.y > H + 50) { p.y = -50; p.x = rnd(0, W); } if (p.y < -50) { p.y = H + 50; p.x = rnd(0, W); } if (p.x > W + 50) p.x = -50; if (p.x < -50) p.x = W + 50;
      return true;
    }
    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now; ctx.clearRect(0, 0, W, H);
      particles = particles.filter((p) => step(p, dt, now)); for (const p of particles) paint(p); raf = requestAnimationFrame(frame);
    }
    function start() { if (raf || REDUCE) return; last = performance.now(); raf = requestAnimationFrame(frame); }
    function stop() { if (raf) cancelAnimationFrame(raf); raf = null; }
    function set(colors, type) { palette = colors || palette; const next = type || "petal"; if (next !== mode) { mode = next; particles.forEach((p) => { p.dying = true; }); particles = particles.filter((p) => !p.dying); } seed(); if (!REDUCE) start(); }
    window.addEventListener("resize", resize, { passive: true }); resize(); return { set, resize };
  })();

  const book = $("#book"), prevBtn = $("#prev"), nextBtn = $("#next"), bar = $("#bar"), counterEl = $("#counter"), hintEl = $("#hint"), liveEl = $("#live"), moodHost = $(".scene");
  let current = -1, busy = false, moodLayers = [];

  function setTheme(index, instant = false) {
    const theme = PAGES[index].theme;
    const background = `radial-gradient(105% 90% at 16% 8%, ${theme.bg[1]} 0%, transparent 58%), radial-gradient(95% 80% at 86% 92%, ${theme.bg[2]} 0%, transparent 62%), linear-gradient(162deg, ${theme.bg[0]} 0%, #08050e 88%)`;
    const layer = document.createElement("div"); layer.className = "mood"; layer.style.background = background; layer.style.transition = instant ? "none" : "opacity 1.4s ease"; layer.style.opacity = instant ? "1" : "0"; moodHost.appendChild(layer); moodLayers.push(layer);
    if (!instant) { requestAnimationFrame(() => { layer.style.opacity = "1"; }); }
    const oldLayers = moodLayers.slice(0, -1); moodLayers = [layer];
    if (instant) { oldLayers.forEach((old) => old.remove()); } else { setTimeout(() => oldLayers.forEach((old) => old.remove()), 1500); }
    document.documentElement.style.setProperty("--accent", theme.accent); document.documentElement.style.setProperty("--gold", theme.gold);
    Ambient.set(theme.particles, theme.particle);
  }

  function goTo(index, { instant = false } = {}) {
    index = clamp(index, 0, PAGES.length - 1); if (busy) return; if (index === current) return;
    if (current === -1) { current = index; const el = pageEls[index]; el.classList.add("is-active", "words-in"); el.removeAttribute("inert"); el.setAttribute("aria-hidden", "false"); setTheme(index, true); updateChrome(index); return; }
    const prevIndex = current; const out = pageEls[prevIndex]; const inn = pageEls[index]; const dir = index > prevIndex ? "next" : "prev";
    current = index; out.setAttribute("aria-hidden", "true"); out.inert = true; inn.removeAttribute("inert"); inn.setAttribute("aria-hidden", "false");
    inn.classList.add("is-active"); out.classList.add("is-leaving"); setTheme(index, instant); updateChrome(index);
    if (instant) { out.classList.remove("is-active", "words-in"); inn.classList.add("words-in"); busy = false; return; }
    busy = true; inn.classList.add(dir === "next" ? "enter-next" : "enter-prev"); out.classList.add(dir === "next" ? "leave-next" : "leave-prev");
    setTimeout(() => { inn.classList.add("words-in"); }, 240);
    setTimeout(() => { out.classList.remove("is-active", "is-leaving", "words-in", "leave-next", "leave-prev"); inn.classList.remove("enter-next", "enter-prev"); busy = false; }, FLIP_MS + 60);
  }

  function updateChrome(index) {
    counterEl.textContent = `${String(index + 1).padStart(2, "0")} / ${PAGES.length}`; bar.style.width = `${((index + 1) / PAGES.length) * 100}%`;
    hintEl.textContent = index === 0 ? "tap open · swipe" : index === PAGES.length - 1 ? "the end · read it again?" : "swipe · click · arrow keys";
    prevBtn.disabled = index === 0; nextBtn.disabled = index === PAGES.length - 1;
  }

  const next = () => goTo(current + 1); const prev = () => goTo(current - 1);
  function openGift() { const el = $("#gift"); if (!el || el.classList.contains("is-open")) return; el.classList.add("is-open"); Ambient.set(PAGES[PAGES.length - 1].theme.particles, "heart"); }

  function bindUI() {
    prevBtn.addEventListener("click", prev); nextBtn.addEventListener("click", next);
    book.addEventListener("click", (event) => { if (busy || event.target.closest("button") || String(window.getSelection())) return; const rect = book.getBoundingClientRect(); const x = event.clientX - rect.left; if (x > rect.width * 0.82) next(); else if (x < rect.width * 0.18) prev(); });
    
    let startX = 0, startY = 0, tracking = false;
    book.addEventListener("pointerdown", (event) => { if (event.target.closest("button")) return; tracking = true; startX = event.clientX; startY = event.clientY; });
    book.addEventListener("pointerup", (event) => {
      if (!tracking) return; tracking = false; const dx = event.clientX - startX; const dy = event.clientY - startY;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.35) { if (dx < 0) next(); else prev(); }
    });
    
    window.addEventListener("keydown", (event) => { if (event.key === "ArrowRight" || event.key === " ") next(); else if (event.key === "ArrowLeft") prev(); });
    document.addEventListener("click", (event) => {
      const action = event.target.closest("[data-action]"); if (!action) return;
      if (action.dataset.action === "open" || action.dataset.action === "open-gift") next();
      else if (action.dataset.action === "unbox") openGift();
      else if (action.dataset.action === "replay") goTo(0);
    });
  }

  function init() {
    buildPages();
    bindUI();
    Ambient.resize();
    goTo(0);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();