import type { PortableTextBlock } from "@portabletext/react";

export type ReviewPost = {
  _id?: string;
  slug: string;
  title: string;
  bookTitle: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  socialExcerpt: string;
  pullQuote: string;
  coverTone: string;
  readingTime: string;
  coverImage?: string;
  coverAlt?: string;
  coverAspect?: number;
  heroImage?: string;
  heroAlt?: string;
  heroAspect?: number;
  gallery?: {
    _key?: string;
    src: string;
    alt: string;
    width: number;
    height: number;
    quote?: string;
    sceneTitle?: string;
    sceneNote?: string;
  }[];
  body: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
};

function paragraphsToPortableText(paragraphs: string[]): PortableTextBlock[] {
  return paragraphs.map((text, index) => ({
    _type: "block",
    _key: `paragraph-${index + 1}`,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `paragraph-${index + 1}-span`,
        text,
        marks: [],
      },
    ],
  }));
}

export const reviewPosts: ReviewPost[] = [
  {
    slug: "the-seven-husbands-of-evelyn-hugo-review",
    title: "A reverent look at identity, ambition, love, and the truths performance cannot hide",
    bookTitle: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    date: "2026-06-21",
    category: "Fiction",
    excerpt:
      "Krystal's first full review considers why Evelyn Hugo feels so vivid: a woman shaped by ambition, love, sacrifice, self-awareness, and the hard-won truth of her own life.",
    socialExcerpt:
      "The Seven Husbands of Evelyn Hugo is intimate, emotionally resonant, and wholly immersive - a story about identity, ambition, relationships, and the messy contradictions that make us human.",
    pullQuote:
      "The experience of reading this book feels like inhabiting Evelyn's life alongside her.",
    coverTone: "bg-espresso",
    readingTime: "6 min read",
    coverImage: "/images/reviews/evelyn-hugo/cover.jpg",
    coverAlt: "The Seven Husbands of Evelyn Hugo by Taylor Jenkins Reid book cover",
    coverAspect: 1592 / 2475,
    heroImage: "/images/reviews/evelyn-hugo/hero-rings-focused.jpg",
    heroAlt: "Gold wedding rings resting on deep green velvet",
    heroAspect: 3 / 2,
    gallery: [
      {
        src: "/images/reviews/evelyn-hugo/post-2-emerald-hd.png",
        alt: "Quote graphic: The greatest pleasure of the novel is watching Evelyn navigate not only her life but herself. She is a mosaic of competing truths.",
        width: 917,
        height: 1716,
        quote: "She is a mosaic of competing truths.",
        sceneTitle: "The Woman Behind the Legend",
        sceneNote: "On identity: the contradictions that make Evelyn feel fully human.",
      },
      {
        src: "/images/reviews/evelyn-hugo/post-1-emerald-hd.png",
        alt: "Quote graphic: The experience of reading this book feels like inhabiting Evelyn's life alongside her. The story unfolds through her memories, her choices, and her evolving understanding of herself.",
        width: 916,
        height: 1717,
        quote: "The experience of reading this book feels like inhabiting Evelyn's life alongside her.",
        sceneTitle: "Life From the Inside",
        sceneNote: "On immersion: a life experienced from the inside, not observed at a distance.",
      },
      {
        src: "/images/reviews/evelyn-hugo/post-5.png",
        alt: "Quote graphic: Evelyn's character development spans a beautiful and believable arc, culminating in a conclusion that feels authentically, undeniably Evelyn.",
        width: 916,
        height: 1716,
        quote: "Evelyn's character development spans a beautiful and believable arc.",
        sceneTitle: "What Remains After Performance",
        sceneNote: "On transformation: a character arc that remains believable from first choice to final truth.",
      },
    ],
    body: paragraphsToPortableText([
      "I closed The Seven Husbands of Evelyn Hugo with an overwhelming sense of reverence and awe, both for Evelyn Hugo as a character and for Taylor Jenkins Reid as a writer. In fact, I am feeling a bit of trepidation even writing this review because Evelyn is so expertly crafted and her story is told with such skill that any attempt to summarize its brilliance feels destined to fall short. Nonetheless, I write.",
      "In picking up this book, I had been hoping for an immersive reading experience: a compelling storyline and a deep character study. Taylor Jenkins Reid gave me that and more. The experience of reading this book feels like inhabiting Evelyn's life alongside her. The story unfolds through her memories, her choices, and her evolving understanding of herself. It is intimate, emotionally resonant, and wholly immersive. At no point did the story drag. There was always movement, always another emotional truth waiting to be uncovered.",
      "Without question, characterization is this novel's greatest strength. Evelyn Hugo looms splendidly regal from the first page. Her presence commands attention, her words consideration. Each chapter of her story unfolds like a new revelation, and she is wonderfully complex: ambitious and compassionate, calculating and humane. Her character development spans a beautiful and believable arc, culminating in a conclusion that feels authentically, undeniably Evelyn.",
      "I identified strongly with Evelyn as a character. The greatest pleasure of the novel is watching Evelyn navigate not only her life but herself. She is a mosaic of competing truths. It is a large part of what makes her feel so familiar, so real, and so profoundly human. In fact, if I had to choose one word to describe her, it would be real because of her unapologetic honesty about who she is. However you feel about Evelyn as the story unfolds, you know she is always giving you the truth of herself and her experience. Her self-awareness is not performative; it is authentic.",
      "The emotional imprint this story left behind reminds me of The Silent Patient. The lingering effect feels remarkably similar. There is something about these characters that is both gripping and haunting. They return to me unexpectedly in remembered lines of dialogue, in my recall of their choices, in quiet moments when I find myself pondering all the ways I might have done exactly what they did. When I think back on characters like Monique, Harry, and Celia, I feel something distinct. I picture them vividly and even recall some of their conversations with other characters. They have taken up residence in my mind, and I have no intention of asking them to leave.",
      "Several themes emerge throughout the novel, but the most compelling theme explores the complexity of relationships: how we define relationships, what sustains or destroys them, and what happens when relational boundaries begin to blur. Love, loyalty, sacrifice, resentment, and forgiveness are all examined with gritty nuance and refreshing honesty. Ambition is another prominent theme in the book. Success demands sacrifice. Evelyn's story invites us to consider what we are willing to sacrifice for success and whether we truly understand what we might be forfeiting in the process. Against the backdrop of old Hollywood - a culture obsessed with reinvention, appearances, and ambition - these questions feel critically important.",
      "Perhaps the most powerful insight this novel offered me was the recognition that I am not fundamentally different from any of these characters, not even the ones whose choices I questioned. In some small way, I could see myself reflected in the people on the page. Their fears. Their desires. Their mistakes. The book is, ultimately, a candid exploration of the human condition, and I was captivated by its willingness to place so many complicated, uncomfortable facets of humanity on the examination table.",
      "Few books earn a lasting place in my thoughts. The Seven Husbands of Evelyn Hugo did. It is not simply a novel about old Hollywood. It is a story about identity, ambition, relationships, and the messy contradictions that make us human. And long after the final page, what lingers is not the carefully crafted legend of Evelyn Hugo, but the hard-won truths she leaves behind about love, loss, and what matters when all the performances fall away.",
    ]),
  },
  {
    slug: "lessons-in-chemistry-review",
    title: "A sharp, generous look at voice, agency, and reinvention",
    bookTitle: "Lessons in Chemistry",
    author: "Bonnie Garmus",
    date: "2026-06-12",
    category: "Fiction",
    excerpt:
      "A full-length review on the craft choices that make Elizabeth Zott feel exacting, wounded, funny, and impossible to ignore.",
    socialExcerpt:
      "Krystal's longer review of Lessons in Chemistry looks at voice, structure, and why this story keeps its emotional charge beyond the premise.",
    pullQuote:
      "The novel works because its wit never replaces tenderness. It sharpens it.",
    coverTone: "bg-terracotta",
    readingTime: "6 min read",
    body: paragraphsToPortableText([
      "A memorable book review should do more than say whether a book is good. It should help a reader understand what kind of experience the book offers, what the author is attempting, and why the work lingers after the final page.",
      "Lessons in Chemistry gives reviewers plenty to discuss: a protagonist with an unmistakable voice, a period setting full of social pressure, and a structure that balances humor with grief. What makes the novel compelling is not simply that Elizabeth Zott is brilliant. It is that the book allows her intelligence to have edges.",
      "The strongest moments arrive when the prose trusts contradiction. Elizabeth can be precise and emotionally guarded, but she is not cold. The book lets her be funny without making her a novelty, principled without turning her into a slogan, and wounded without flattening her into victimhood.",
      "For readers who care about craft, the lesson is clear: voice becomes powerful when it is attached to pressure. Every sharp sentence in the novel has something underneath it. A good review should pay attention to that pressure, because that is where the real reading experience lives.",
    ]),
  },
  {
    slug: "the-light-we-carry-review",
    title: "A reflective review on steadiness, self-trust, and public life",
    bookTitle: "The Light We Carry",
    author: "Michelle Obama",
    date: "2026-06-05",
    category: "Nonfiction",
    excerpt:
      "A longer review of the book's invitation to build durable practices for uncertainty, ambition, relationships, and visibility.",
    socialExcerpt:
      "This full review considers how The Light We Carry turns personal reflection into practical encouragement without losing warmth.",
    pullQuote:
      "Its most persuasive moments are the ones that trade certainty for steadiness.",
    coverTone: "bg-bronze",
    readingTime: "5 min read",
    body: paragraphsToPortableText([
      "The Light We Carry is built around a generous question: what helps a person remain whole while moving through uncertainty? The book does not pretend that confidence is a permanent state. Instead, it treats steadiness as a practice.",
      "That distinction matters. The strongest nonfiction often succeeds because it gives readers language for something they already feel but have not yet organized. Michelle Obama writes about fear, friendship, identity, and visibility with a tone that feels both composed and intimate.",
      "As a reading experience, the book is most effective when it stays close to specific scenes and habits. The personal details give weight to the larger advice. They keep the book from becoming abstract encouragement and remind the reader that resilience is usually built in ordinary, repeated choices.",
      "A full review of this kind of book should make room for both message and method. The message is useful, but the method is what creates trust: clear stories, measured reflection, and an authorial voice that understands encouragement as companionship rather than performance.",
    ]),
  },
  {
    slug: "tomorrow-and-tomorrow-and-tomorrow-review",
    title: "An expansive review of friendship, ambition, and creative cost",
    bookTitle: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    date: "2026-05-28",
    category: "Fiction",
    excerpt:
      "A deeper look at how the novel turns collaboration, games, grief, and creative partnership into a layered emotional landscape.",
    socialExcerpt:
      "Krystal's full review explores how Tomorrow, and Tomorrow, and Tomorrow captures friendship as both refuge and friction.",
    pullQuote:
      "The book understands that collaboration can be a love language and a battlefield.",
    coverTone: "bg-espresso",
    readingTime: "7 min read",
    body: paragraphsToPortableText([
      "Tomorrow, and Tomorrow, and Tomorrow is often described as a novel about video games, but its deeper subject is creative intimacy. The games matter because they give the characters a shared language for ambition, grief, repair, and escape.",
      "The novel's emotional power comes from the way it treats friendship as a living structure. It can hold admiration, resentment, loyalty, misunderstanding, and tenderness at once. That complexity gives the story its momentum.",
      "From a craft perspective, the book is especially interesting because it lets form echo theme. The narrative moves across years, projects, partnerships, and losses, but the throughline remains the question of what people make together and what that making asks of them.",
      "A long review has space to honor that complexity. Rather than reducing the book to plot or recommendation, it can trace the emotional architecture beneath the story: how creative people find each other, wound each other, need each other, and sometimes learn how to keep going anyway.",
    ]),
  },
];

export function formatReviewDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(`${date}T12:00:00`));
}
