
export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  pdfUrl: string;
  tags?: string[];
}

export const books: Book[] = [
  {
    id: 1,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness. The book explores how our relationship with money influences our financial decisions.",
    coverImage: "https://m.media-amazon.com/images/I/71TRUbzcvaL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia801305.us.archive.org/33/items/psychology-of-money/Psychology%20of%20Money.pdf",
    tags: ["finance", "psychology", "self-help"]
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    description: "An easy & proven way to build good habits & break bad ones. The book explores the compound effects of small changes.",
    coverImage: "https://m.media-amazon.com/images/I/81bGKUa1e0L._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://pdflake.com/wp-content/uploads/2022/01/atomic-habits-by-james-clear-pdflake.pdf",
    tags: ["habits", "self-improvement", "psychology"]
  },
  {
    id: 3,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    description: "This book has been called the 'Granddaddy of All Motivational Literature.' It explores mindset principles of wealth.",
    coverImage: "https://m.media-amazon.com/images/I/71UypkUjStL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia801307.us.archive.org/4/items/think-and-grow-rich_202109/Think%20and%20Grow%20Rich.pdf",
    tags: ["finance", "motivation", "self-help"]
  },
  {
    id: 4,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    description: "What the rich teach their kids about money that the poor and middle class do not.",
    coverImage: "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia801302.us.archive.org/24/items/rich-dad-poor-dad-robert-kiyosaki-sharon-lechter/Rich%20Dad%20Poor%20Dad%20-%20Robert%20Kiyosaki%20Sharon%20Lechter.pdf",
    tags: ["finance", "wealth", "investing"]
  },
  {
    id: 5,
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    description: "A guide for aspiring leaders, politicians, or anyone who wants to gain, observe, or resist ultimate control.",
    coverImage: "https://m.media-amazon.com/images/I/71aG+xDKSYL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia800905.us.archive.org/30/items/MasterCollectionRobertGreene/Greene%2C%20Robert%20-%20The%2048%20Laws%20of%20Power.pdf",
    tags: ["psychology", "leadership", "strategy"]
  },
  {
    id: 6,
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    description: "One of the first bestselling self-help books. Its purpose is to enable you to make friends quickly and easily.",
    coverImage: "https://m.media-amazon.com/images/I/71xEj+LKiiL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://images.kw.com/docs/2/1/2/212345/1285134779158_howtowin.pdf",
    tags: ["relationships", "self-help", "communication"]
  },
  {
    id: 7,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    description: "A holistic approach to life and work that has influenced millions around the world.",
    coverImage: "https://m.media-amazon.com/images/I/71oATK4cWjL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://ia803404.us.archive.org/18/items/the-7-habits-of-highly-effective-people-personal-workbook/The-7-Habits-of-Highly-Effective-People-Personal-Workbook.pdf",
    tags: ["productivity", "self-improvement", "leadership"]
  },
  {
    id: 8,
    title: "Mindset: The New Psychology of Success",
    author: "Carol S. Dweck",
    description: "How we can learn to fulfill our potential by changing our mindset from fixed to growth.",
    coverImage: "https://m.media-amazon.com/images/I/61bDwfLudLL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://scottbarrykaufman.com/wp-content/uploads/2015/01/Dweck-2012.pdf",
    tags: ["psychology", "self-improvement", "education"]
  },
  {
    id: 9,
    title: "The Power of Habit",
    author: "Charles Duhigg",
    description: "Why we do what we do in life and business. Explores the science behind habit creation and reformation.",
    coverImage: "https://m.media-amazon.com/images/I/819ZN5ZOXBL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://greatergood.berkeley.edu/images/uploads/Duhigg-ThePowerofHabit.pdf",
    tags: ["habits", "psychology", "self-help"]
  },
  {
    id: 10,
    title: "Deep Work",
    author: "Cal Newport",
    description: "Rules for focused success in a distracted world. The book argues that deep work is becoming more valuable.",
    coverImage: "https://m.media-amazon.com/images/I/71lSlcG9IyL._AC_UF1000,1000_QL80_.jpg",
    pdfUrl: "https://YES-pdf.org/en/deep-work",
    tags: ["productivity", "focus", "career"]
  }
];
