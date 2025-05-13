
export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  alternateImage?: string;
  pdfUrl: string;
  tags?: string[];
  category: string;
}

// Define our book categories
export const categories = [
  "Personal Growth",
  "Finance & Wealth",
  "Leadership",
  "Relationships",
  "Psychology",
  "Health & Wellness"
];

export const books: Book[] = [
  // === Personal Growth Category ===
  {
    id: 1,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness. The book explores how our relationship with money influences our financial decisions.",
    coverImage: "https://m.media-amazon.com/images/I/71TRUbzcvaL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia801305.us.archive.org/33/items/psychology-of-money/Psychology%20of%20Money.pdf",
    tags: ["finance", "psychology", "self-help"],
    category: "Finance & Wealth"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    description: "An easy & proven way to build good habits & break bad ones. The book explores the compound effects of small changes.",
    coverImage: "https://m.media-amazon.com/images/I/81bGKUa1e0L._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://pdflake.com/wp-content/uploads/2022/01/atomic-habits-by-james-clear-pdflake.pdf",
    tags: ["habits", "self-improvement", "psychology"],
    category: "Personal Growth"
  },
  {
    id: 3,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    description: "This book has been called the 'Granddaddy of All Motivational Literature.' It explores mindset principles of wealth.",
    coverImage: "https://m.media-amazon.com/images/I/71UypkUjStL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia801307.us.archive.org/4/items/think-and-grow-rich_202109/Think%20and%20Grow%20Rich.pdf",
    tags: ["finance", "motivation", "self-help"],
    category: "Finance & Wealth"
  },
  {
    id: 4,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    description: "What the rich teach their kids about money that the poor and middle class do not.",
    coverImage: "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia801302.us.archive.org/24/items/rich-dad-poor-dad-robert-kiyosaki-sharon-lechter/Rich%20Dad%20Poor%20Dad%20-%20Robert%20Kiyosaki%20Sharon%20Lechter.pdf",
    tags: ["finance", "wealth", "investing"],
    category: "Finance & Wealth"
  },
  {
    id: 5,
    title: "The Five Dysfunctions of a Team",
    author: "Patrick Lencioni",
    description: "The model reveals how team dysfunctions silently sabotage success—and shows techpreneurs how to build results-driven, resilient teams.",
    coverImage: "/lovable-uploads/c687db92-eee6-4e8f-b545-95f577e40dfe.png",
    alternateImage: "/lovable-uploads/36772974-3ae1-4f58-af81-044ba124ab09.png",
    pdfUrl: "https://ia800905.us.archive.org/30/items/MasterCollectionRobertGreene/Greene%2C%20Robert%20-%20The%2048%20Laws%20of%20Power.pdf",
    tags: ["self-improvement", "relationships", "leadership"],
    category: "Leadership"
  },
  {
    id: 6,
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    description: "One of the first bestselling self-help books. Its purpose is to enable you to make friends quickly and easily.",
    coverImage: "https://m.media-amazon.com/images/I/71xEj+LKiiL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://images.kw.com/docs/2/1/2/212345/1285134779158_howtowin.pdf",
    tags: ["relationships", "self-help", "communication"],
    category: "Relationships"
  },
  {
    id: 7,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    description: "A holistic approach to life and work that has influenced millions around the world.",
    coverImage: "https://m.media-amazon.com/images/I/71oATK4cWjL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia803404.us.archive.org/18/items/the-7-habits-of-highly-effective-people-personal-workbook/The-7-Habits-of-Highly-Effective-People-Personal-Workbook.pdf",
    tags: ["productivity", "self-improvement", "leadership"],
    category: "Personal Growth"
  },
  {
    id: 8,
    title: "Mindset: The New Psychology of Success",
    author: "Carol S. Dweck",
    description: "How we can learn to fulfill our potential by changing our mindset from fixed to growth.",
    coverImage: "https://m.media-amazon.com/images/I/61bDwfLudLL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://scottbarrykaufman.com/wp-content/uploads/2015/01/Dweck-2012.pdf",
    tags: ["psychology", "self-improvement", "education"],
    category: "Psychology"
  },
  {
    id: 9,
    title: "The Power of Habit",
    author: "Charles Duhigg",
    description: "Why we do what we do in life and business. Explores the science behind habit creation and reformation.",
    coverImage: "https://m.media-amazon.com/images/I/819ZN5ZOXBL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://greatergood.berkeley.edu/images/uploads/Duhigg-ThePowerofHabit.pdf",
    tags: ["habits", "psychology", "self-help"],
    category: "Psychology"
  },
  {
    id: 10,
    title: "Deep Work",
    author: "Cal Newport",
    description: "Rules for focused success in a distracted world. The book argues that deep work is becoming more valuable.",
    coverImage: "https://m.media-amazon.com/images/I/71lSlcG9IyL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://YES-pdf.org/en/deep-work",
    tags: ["productivity", "focus", "career"],
    category: "Personal Growth"
  },
  // === Personal Growth Category (Additional books) ===
  {
    id: 11,
    title: "Outliers",
    author: "Malcolm Gladwell",
    description: "The story of success and what makes high-achievers different from ordinary people.",
    coverImage: "https://m.media-amazon.com/images/I/71iE3jVCF3L._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia800108.us.archive.org/1/items/OutliersTheStoryOfSuccessMalcolmGladwell/Outliers-The%20Story%20of%20Success-Malcolm%20Gladwell.pdf",
    tags: ["success", "psychology", "self-help"],
    category: "Personal Growth"
  },
  {
    id: 12,
    title: "Grit: The Power of Passion and Perseverance",
    author: "Angela Duckworth",
    description: "Angela Duckworth shows anyone striving to succeed that the secret to outstanding achievement is not talent, but a special blend of passion and persistence.",
    coverImage: "https://m.media-amazon.com/images/I/51r1FcTmYNL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia801305.us.archive.org/33/items/grit-the-power-of-passion-and-perseverance/Grit_%20The%20Power%20of%20Passion%20and%20Perseverance.pdf",
    tags: ["perseverance", "success", "psychology"],
    category: "Personal Growth"
  },
  
  // === Finance & Wealth Category (Additional books) ===
  {
    id: 13,
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    description: "The definitive book on value investing and fundamental analysis strategies.",
    coverImage: "https://m.media-amazon.com/images/I/91yj3mbz4JL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia801305.us.archive.org/33/items/intelligent-investor-revised-edition-benjamin-graham/Intelligent%20Investor%20-%20Revised%20Edition%20-%20Benjamin%20Graham.pdf",
    tags: ["investing", "finance", "wealth"],
    category: "Finance & Wealth"
  },
  {
    id: 14,
    title: "The Total Money Makeover",
    author: "Dave Ramsey",
    description: "A proven plan for financial fitness with practical steps to get out of debt and build wealth.",
    coverImage: "https://m.media-amazon.com/images/I/81cN8-VO37L._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia601401.us.archive.org/10/items/the-total-money-makeover_202002/The%20Total%20Money%20Makeover.pdf",
    tags: ["finance", "money", "debt"],
    category: "Finance & Wealth"
  },
  
  // === Leadership Category (Additional books) ===
  {
    id: 15,
    title: "Leaders Eat Last",
    author: "Simon Sinek",
    description: "Why some teams pull together and others don't. Simon explores how leaders can inspire cooperation and trust.",
    coverImage: "https://m.media-amazon.com/images/I/71ctnhRaGHL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia801509.us.archive.org/33/items/simon-sinek-leaders-eat-last-why-some-teams-pull-together-and-others-dont-portfolio-2014/Simon%20Sinek%20-%20Leaders%20Eat%20Last_%20Why%20Some%20Teams%20Pull%20Together%20and%20Others%20Don%27t-Portfolio%20%282014%29.pdf",
    tags: ["leadership", "management", "teamwork"],
    category: "Leadership"
  },
  {
    id: 16,
    title: "Good to Great",
    author: "Jim Collins",
    description: "Why some companies make the leap and others don't. A fascinating study of what distinguishes great companies from good ones.",
    coverImage: "https://m.media-amazon.com/images/I/713JS4mX8pL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia600105.us.archive.org/14/items/goodtogreat0000coll/goodtogreat0000coll.pdf",
    tags: ["business", "leadership", "success"],
    category: "Leadership"
  },
  
  // === Relationships Category (Additional books) ===
  {
    id: 17,
    title: "The 5 Love Languages",
    author: "Gary Chapman",
    description: "The secret to love that lasts. Learn the five ways people express and experience love.",
    coverImage: "https://m.media-amazon.com/images/I/61IuSEbkvUL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia601407.us.archive.org/34/items/gary-chapman-the-5-love-languages-the-secret-to-love-that-lasts-northfield-publishing-2015/Gary%20Chapman%20-%20The%205%20Love%20Languages_%20The%20Secret%20to%20Love%20that%20Lasts-Northfield%20Publishing%20%282015%29.pdf",
    tags: ["relationships", "love", "communication"],
    category: "Relationships"
  },
  {
    id: 18,
    title: "Difficult Conversations",
    author: "Douglas Stone, Bruce Patton, Sheila Heen",
    description: "How to discuss what matters most when stakes are high. A guide to handling tough conversations.",
    coverImage: "https://m.media-amazon.com/images/I/71uL72QY9jL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia801308.us.archive.org/27/items/DifficultConversationsHowToDiscussWhatMattersMost/Difficult%20Conversations_%20How%20to%20Discuss%20What%20Matters%20Most.pdf",
    tags: ["communication", "relationships", "conflict"],
    category: "Relationships"
  },
  
  // === Psychology Category (Additional books) ===
  {
    id: 19,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    description: "An exploration of the two cognitive systems that drive the way we think and how they shape our judgments.",
    coverImage: "https://m.media-amazon.com/images/I/61fWpBZLe-L._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia801905.us.archive.org/22/items/daniel-kahneman-thinking-fast-and-slow/Daniel%20Kahneman%20-%20Thinking%2C%20Fast%20and%20Slow.pdf",
    tags: ["psychology", "decision-making", "behavior"],
    category: "Psychology"
  },
  {
    id: 20,
    title: "Emotional Intelligence",
    author: "Daniel Goleman",
    description: "Why emotional intelligence can matter more than IQ for success in work and relationships.",
    coverImage: "https://m.media-amazon.com/images/I/61y3DcFBxoL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia800901.us.archive.org/25/items/DanielGolemanEmotionalIntelligence/Daniel%20Goleman%20-%20Emotional%20Intelligence.pdf",
    tags: ["emotional-intelligence", "psychology", "self-awareness"],
    category: "Psychology"
  },
  
  // === Health & Wellness Category (Additional books) ===
  {
    id: 21,
    title: "Why We Sleep",
    author: "Matthew Walker",
    description: "Unlocking the power of sleep and dreams. A fascinating exploration of the science behind sleep.",
    coverImage: "https://m.media-amazon.com/images/I/71sBV1OOJ7L._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia803404.us.archive.org/18/items/matthew-walker-why-we-sleep-unlocking-the-power-of-sleep-and-dreams-scribner-2017/Matthew%20Walker%20-%20Why%20We%20Sleep_%20Unlocking%20the%20Power%20of%20Sleep%20and%20Dreams-Scribner%20%282017%29.pdf",
    tags: ["sleep", "health", "neuroscience"],
    category: "Health & Wellness"
  },
  {
    id: 22,
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    description: "Brain, mind, and body in the healing of trauma. A revolutionary examination of trauma.",
    coverImage: "https://m.media-amazon.com/images/I/61NdJMwAThS._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia601408.us.archive.org/15/items/the-body-keeps-the-score-brain-mind-and-body-in-the-healing-of-trauma/The%20Body%20Keeps%20the%20Score_%20Brain%2C%20Mind%2C%20and%20Body%20in%20the%20Healing%20of%20Trauma.pdf",
    tags: ["trauma", "psychology", "healing"],
    category: "Health & Wellness"
  },
  
  // === Adding more Personal Growth books ===
  {
    id: 23,
    title: "Daring Greatly",
    author: "Brené Brown",
    description: "How the courage to be vulnerable transforms the way we live, love, parent, and lead.",
    coverImage: "https://m.media-amazon.com/images/I/71Ty-Ez+unL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/daringgreatlyhowthecouragetobevu_202005",
    tags: ["vulnerability", "personal-growth", "courage"],
    category: "Personal Growth"
  },
  {
    id: 24,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    description: "A counterintuitive approach to living a good life by focusing on what truly matters.",
    coverImage: "https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/subtle-art-of-not-giving-a-f-ck-by-mark-manson",
    tags: ["values", "life-advice", "philosophy"],
    category: "Personal Growth"
  },
  {
    id: 25,
    title: "Essentialism: The Disciplined Pursuit of Less",
    author: "Greg McKeown",
    description: "A systematic discipline for discerning what is essential and eliminating everything else.",
    coverImage: "https://m.media-amazon.com/images/I/61J15UfMBtL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/essentialismthedisciplinedpursu_202005",
    tags: ["focus", "productivity", "simplicity"],
    category: "Personal Growth"
  },
  {
    id: 26,
    title: "The Gifts of Imperfection",
    author: "Brené Brown",
    description: "Let go of who you think you're supposed to be and embrace who you are.",
    coverImage: "https://m.media-amazon.com/images/I/61zQuwqTeWL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/gifts-of-imperfection-let-go-of-who-you-think",
    tags: ["self-acceptance", "authenticity", "courage"],
    category: "Personal Growth"
  },
  {
    id: 27,
    title: "Quiet: The Power of Introverts",
    author: "Susan Cain",
    description: "How introverts can harness their natural strengths in a world that often favors extroverts.",
    coverImage: "https://m.media-amazon.com/images/I/61oppi3zBBL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/quietpowerofintrovertsinworldth_202005",
    tags: ["introversion", "psychology", "strength"],
    category: "Personal Growth"
  },
  {
    id: 28,
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    description: "A Holocaust survivor's memoir and exploration of the human search for purpose even in extreme suffering.",
    coverImage: "https://m.media-amazon.com/images/I/71tdb1udGLL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/manssearchformeaning_202001",
    tags: ["purpose", "resilience", "psychology"],
    category: "Personal Growth"
  },
  {
    id: 29,
    title: "The Four Agreements",
    author: "Don Miguel Ruiz",
    description: "A practical guide to personal freedom based on ancient Toltec wisdom.",
    coverImage: "https://m.media-amazon.com/images/I/81hHy5XrdKL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/thefouragreementsapracticalguide_202002",
    tags: ["freedom", "wisdom", "self-awareness"],
    category: "Personal Growth"
  },
  {
    id: 30,
    title: "The War of Art",
    author: "Steven Pressfield",
    description: "Break through the blocks and win your creative battles with this guide to overcoming resistance.",
    coverImage: "https://m.media-amazon.com/images/I/61h+eKzbpLL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/thewarofartbreakthrough_202003",
    tags: ["creativity", "discipline", "resistance"],
    category: "Personal Growth"
  },
  
  // === Adding more Finance & Wealth books ===
  {
    id: 31,
    title: "The Millionaire Next Door",
    author: "Thomas J. Stanley & William D. Danko",
    description: "The surprising secrets of America's wealthy and how they accumulated their wealth.",
    coverImage: "https://m.media-amazon.com/images/I/81hKJt2NjFL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/millionairenextdoorsurprising_202001",
    tags: ["wealth", "frugality", "financial-independence"],
    category: "Finance & Wealth"
  },
  {
    id: 32,
    title: "The Little Book of Common Sense Investing",
    author: "John C. Bogle",
    description: "The only way to guarantee your fair share of stock market returns by the founder of Vanguard.",
    coverImage: "https://m.media-amazon.com/images/I/71MUvO5Jd+L._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/littlebookcommonsenseinvesting_202002",
    tags: ["investing", "index-funds", "finance"],
    category: "Finance & Wealth"
  },
  {
    id: 33,
    title: "Your Money or Your Life",
    author: "Vicki Robin & Joe Dominguez",
    description: "9 steps to transforming your relationship with money and achieving financial independence.",
    coverImage: "https://m.media-amazon.com/images/I/71ihnHXEe3L._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/yourmoneyyourlife_202004",
    tags: ["personal-finance", "frugality", "life-purpose"],
    category: "Finance & Wealth"
  },
  {
    id: 34,
    title: "I Will Teach You to Be Rich",
    author: "Ramit Sethi",
    description: "No guilt. No excuses. No BS. Just a 6-week program that works for managing personal finances.",
    coverImage: "https://m.media-amazon.com/images/I/71EiL0xKRBL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/iwillteachyoutoberichnoexcusesn_202003",
    tags: ["personal-finance", "automation", "investing"],
    category: "Finance & Wealth"
  },
  {
    id: 35,
    title: "Money: Master the Game",
    author: "Tony Robbins",
    description: "7 simple steps to financial freedom compiled from interviews with 50 of the world's most successful investors.",
    coverImage: "https://m.media-amazon.com/images/I/71XDgqrN+tL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/moneymasterthegame7stepstofina_202004",
    tags: ["investing", "wealth-building", "financial-security"],
    category: "Finance & Wealth"
  },
  
  // === Adding more Leadership books ===
  {
    id: 36,
    title: "Start with Why",
    author: "Simon Sinek",
    description: "How great leaders inspire everyone to take action by starting with their purpose.",
    coverImage: "https://m.media-amazon.com/images/I/71xEkoAu44L._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/startwhyhowgreatleadersinspire_202002",
    tags: ["purpose", "inspiration", "leadership"],
    category: "Leadership"
  },
  {
    id: 37,
    title: "Extreme Ownership",
    author: "Jocko Willink & Leif Babin",
    description: "How U.S. Navy SEALs lead and win by taking responsibility for everything in their world.",
    coverImage: "https://m.media-amazon.com/images/I/81b3QGCiOCL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/extremeownershipusnavyseals_202004",
    tags: ["leadership", "responsibility", "discipline"],
    category: "Leadership"
  },
  {
    id: 38,
    title: "Dare to Lead",
    author: "Brené Brown",
    description: "Brave work. Tough conversations. Whole hearts. A guide to courageous leadership.",
    coverImage: "https://m.media-amazon.com/images/I/71fAwXLEdnL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/daretoleadbraveworktoughconver_202003",
    tags: ["vulnerability", "courage", "leadership"],
    category: "Leadership"
  },
  {
    id: 39,
    title: "The 21 Irrefutable Laws of Leadership",
    author: "John C. Maxwell",
    description: "Follow them and people will follow you. A comprehensive guide to leadership principles.",
    coverImage: "https://m.media-amazon.com/images/I/71xPGhI+DKL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/21irrefutablelawsofleadership_202002",
    tags: ["leadership", "influence", "teamwork"],
    category: "Leadership"
  },
  {
    id: 40,
    title: "Tribal Leadership",
    author: "Dave Logan, John King & Halee Fischer-Wright",
    description: "Leveraging natural groups to build a thriving organization by understanding cultural stages.",
    coverImage: "https://m.media-amazon.com/images/I/81P0qrg2TiL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/triballeadershiplevergingnat_202004",
    tags: ["culture", "organizational-development", "leadership"],
    category: "Leadership"
  },
  
  // === Adding more Relationships books ===
  {
    id: 41,
    title: "Attached",
    author: "Amir Levine & Rachel Heller",
    description: "The new science of adult attachment and how it can help you find and keep love.",
    coverImage: "https://m.media-amazon.com/images/I/71Df3k+dxuL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/attachednewscienceofadult_202001",
    tags: ["attachment-theory", "relationships", "psychology"],
    category: "Relationships"
  },
  {
    id: 42,
    title: "Nonviolent Communication",
    author: "Marshall B. Rosenberg",
    description: "A language of life that helps people connect compassionately with themselves and each other.",
    coverImage: "https://m.media-amazon.com/images/I/71xT2ybHZkL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/nonviolentcommunicationlangua_202003",
    tags: ["communication", "compassion", "conflict-resolution"],
    category: "Relationships"
  },
  {
    id: 43,
    title: "Boundaries",
    author: "Henry Cloud & John Townsend",
    description: "When to say yes, how to say no to take control of your life and relationships.",
    coverImage: "https://m.media-amazon.com/images/I/71JqOk71ONL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/boundarieswhentosayyeshowto_202002",
    tags: ["boundaries", "self-care", "relationships"],
    category: "Relationships"
  },
  {
    id: 44,
    title: "The Seven Principles for Making Marriage Work",
    author: "John Gottman & Nan Silver",
    description: "A practical guide for improving marriages based on decades of research.",
    coverImage: "https://m.media-amazon.com/images/I/71XLPIY8CmL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/sevenprinciples_202002",
    tags: ["marriage", "communication", "intimacy"],
    category: "Relationships"
  },
  {
    id: 45,
    title: "Hold Me Tight",
    author: "Dr. Sue Johnson",
    description: "Seven conversations for a lifetime of love using Emotionally Focused Therapy.",
    coverImage: "https://m.media-amazon.com/images/I/71iwl2ENGyL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/holdmetightseven_202003",
    tags: ["intimacy", "attachment", "love"],
    category: "Relationships"
  },
  
  // === Adding more Psychology books ===
  {
    id: 46,
    title: "Flow",
    author: "Mihaly Csikszentmihalyi",
    description: "The psychology of optimal experience and how to achieve states of heightened focus and creativity.",
    coverImage: "https://m.media-amazon.com/images/I/61IrPNGkPXL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/flowpsychologyofoptimalexperience_202001",
    tags: ["flow-state", "positive-psychology", "happiness"],
    category: "Psychology"
  },
  {
    id: 47,
    title: "Influence: The Psychology of Persuasion",
    author: "Robert B. Cialdini",
    description: "The classic book on the psychology of why people say yes and how to apply these insights.",
    coverImage: "https://m.media-amazon.com/images/I/61ZS7NQEAtL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/influencepsychologyofpersuasion_202002",
    tags: ["persuasion", "social-psychology", "marketing"],
    category: "Psychology"
  },
  {
    id: 48,
    title: "Predictably Irrational",
    author: "Dan Ariely",
    description: "The hidden forces that shape our decisions and why humans make systematic and predictable mistakes.",
    coverImage: "https://m.media-amazon.com/images/I/61T1REPX7FL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/predictablyirrationalhiddenforc_202003",
    tags: ["behavioral-economics", "decision-making", "irrationality"],
    category: "Psychology"
  },
  {
    id: 49,
    title: "Blink",
    author: "Malcolm Gladwell",
    description: "The power of thinking without thinking and how our unconscious minds make split-second decisions.",
    coverImage: "https://m.media-amazon.com/images/I/71kuX0ELcbL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/blinkpowerofthinkingwithoutth_202001",
    tags: ["intuition", "decision-making", "psychology"],
    category: "Psychology"
  },
  {
    id: 50,
    title: "The Happiness Hypothesis",
    author: "Jonathan Haidt",
    description: "Finding modern truth in ancient wisdom by examining ten great ideas from across civilizations.",
    coverImage: "https://m.media-amazon.com/images/I/71328GyYXsL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/happinesshypothesisfindingmode_202004",
    tags: ["happiness", "positive-psychology", "philosophy"],
    category: "Psychology"
  },
  
  // === Adding more Health & Wellness books ===
  {
    id: 51,
    title: "Breath",
    author: "James Nestor",
    description: "The new science of a lost art exploring how breathing affects every aspect of our health.",
    coverImage: "https://m.media-amazon.com/images/I/71MSP2N0YGL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/breaththenewscienceofalostartjamesnestora_202002",
    tags: ["breathing", "health", "wellness"],
    category: "Health & Wellness"
  },
  {
    id: 52,
    title: "The Blue Zones",
    author: "Dan Buettner",
    description: "Lessons for living longer from people who've lived the longest in special regions of the world.",
    coverImage: "https://m.media-amazon.com/images/I/81tyH2KdclL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/bluezoneslessonsforlivinglonger_202003",
    tags: ["longevity", "diet", "lifestyle"],
    category: "Health & Wellness"
  },
  {
    id: 53,
    title: "Atomic Wellness",
    author: "Lauren Meyers",
    description: "Simple habits for radical health improvements based on the latest research in wellness.",
    coverImage: "https://m.media-amazon.com/images/I/61TzLFRiRML._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/atomicwellnesslaurenmeyers_202104",
    tags: ["habits", "health", "wellness"],
    category: "Health & Wellness"
  },
  {
    id: 54,
    title: "The Circadian Code",
    author: "Satchin Panda",
    description: "Unlock the power of your body's natural rhythm for improved health, weight loss, and mood.",
    coverImage: "https://m.media-amazon.com/images/I/81qXbMulqtL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/circadiancodepanda_202002",
    tags: ["circadian-rhythm", "sleep", "metabolism"],
    category: "Health & Wellness"
  },
  {
    id: 55,
    title: "Lifespan",
    author: "David A. Sinclair",
    description: "Why we age—and why we don't have to. The latest science on extending human health and longevity.",
    coverImage: "https://m.media-amazon.com/images/I/718YKgxKabL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/lifespanwhyweageandwhywe_202004",
    tags: ["longevity", "aging", "health-science"],
    category: "Health & Wellness"
  },
  {
    id: 56,
    title: "How Not to Die",
    author: "Michael Greger",
    description: "Discover the foods scientifically proven to prevent and reverse disease.",
    coverImage: "https://m.media-amazon.com/images/I/71Rz7WXAdpL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/hownottodiediscoverthefood_202001",
    tags: ["nutrition", "plant-based", "disease-prevention"],
    category: "Health & Wellness"
  },
  {
    id: 57,
    title: "The Brain That Changes Itself",
    author: "Norman Doidge",
    description: "Stories of personal triumph from the frontiers of brain science on neuroplasticity.",
    coverImage: "https://m.media-amazon.com/images/I/81bYay4jwbL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://archive.org/details/brainthatchangesitself_202002",
    tags: ["neuroplasticity", "brain-health", "neuroscience"],
    category: "Health & Wellness"
  }
];
