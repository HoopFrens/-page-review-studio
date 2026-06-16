export type ReviewPost = {
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
  body: string[];
};

export const reviewPosts: ReviewPost[] = [
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
    body: [
      "A memorable book review should do more than say whether a book is good. It should help a reader understand what kind of experience the book offers, what the author is attempting, and why the work lingers after the final page.",
      "Lessons in Chemistry gives reviewers plenty to discuss: a protagonist with an unmistakable voice, a period setting full of social pressure, and a structure that balances humor with grief. What makes the novel compelling is not simply that Elizabeth Zott is brilliant. It is that the book allows her intelligence to have edges.",
      "The strongest moments arrive when the prose trusts contradiction. Elizabeth can be precise and emotionally guarded, but she is not cold. The book lets her be funny without making her a novelty, principled without turning her into a slogan, and wounded without flattening her into victimhood.",
      "For readers who care about craft, the lesson is clear: voice becomes powerful when it is attached to pressure. Every sharp sentence in the novel has something underneath it. A good review should pay attention to that pressure, because that is where the real reading experience lives.",
    ],
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
    body: [
      "The Light We Carry is built around a generous question: what helps a person remain whole while moving through uncertainty? The book does not pretend that confidence is a permanent state. Instead, it treats steadiness as a practice.",
      "That distinction matters. The strongest nonfiction often succeeds because it gives readers language for something they already feel but have not yet organized. Michelle Obama writes about fear, friendship, identity, and visibility with a tone that feels both composed and intimate.",
      "As a reading experience, the book is most effective when it stays close to specific scenes and habits. The personal details give weight to the larger advice. They keep the book from becoming abstract encouragement and remind the reader that resilience is usually built in ordinary, repeated choices.",
      "A full review of this kind of book should make room for both message and method. The message is useful, but the method is what creates trust: clear stories, measured reflection, and an authorial voice that understands encouragement as companionship rather than performance.",
    ],
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
    body: [
      "Tomorrow, and Tomorrow, and Tomorrow is often described as a novel about video games, but its deeper subject is creative intimacy. The games matter because they give the characters a shared language for ambition, grief, repair, and escape.",
      "The novel's emotional power comes from the way it treats friendship as a living structure. It can hold admiration, resentment, loyalty, misunderstanding, and tenderness at once. That complexity gives the story its momentum.",
      "From a craft perspective, the book is especially interesting because it lets form echo theme. The narrative moves across years, projects, partnerships, and losses, but the throughline remains the question of what people make together and what that making asks of them.",
      "A long review has space to honor that complexity. Rather than reducing the book to plot or recommendation, it can trace the emotional architecture beneath the story: how creative people find each other, wound each other, need each other, and sometimes learn how to keep going anyway.",
    ],
  },
];

export function getReviewPost(slug: string) {
  return reviewPosts.find((post) => post.slug === slug);
}

export function formatReviewDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(`${date}T12:00:00`));
}
