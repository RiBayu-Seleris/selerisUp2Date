// src/data/blogPosts.js
import { generateSlug } from "@/components/Helper/slugUtil.js";

export const blogPosts = [
  {
    id: 1,
    image: new URL("@/assets/images/blog/example.png", import.meta.url).href,
    title: "Your Financial Safety Net in an Unpredictable World",
    category: "Insurance",
    date: "Dec 22, 2023",
    likes: 600,
    views: 400,
    comments: 300,
    description: `
    <p>Life is full of uncertainties. From unexpected illnesses and accidents to natural disasters and property damage, things can go wrong when you least expect them. That's where insurance steps in. More than just a piece of paper, insurance is a financial safety net designed to protect you and your loved ones from the potentially devastating costs of unforeseen events.</p>
    <p>While it might seem like an extra expense, thinking of insurance as an investment in your peace of mind and financial stability is far more accurate. It's about mitigating risk and ensuring that a single unfortunate event doesn't derail your entire financial future.</p>
    <p>Why Is Insurance So Important?</p>
    <p>The value of insurance becomes clear when you consider its core benefits:</p>
    <ul>
      <li>
        Financial Protection: This is the primary role of insurance. Whether it's covering medical bills, repairing your car, rebuilding your home, or replacing lost income, insurance shields you from significant out-of-pocket expenses that could otherwise lead to debt or bankruptcy.
      </li>
      <li>
        Peace of Mind: Knowing you're protected provides immense relief. You can focus on recovering from an event rather than being consumed by financial worry. This peace of mind is invaluable, allowing you to live your life with greater confidence.
      </li>
      <li>
        Asset Protection: For big investments like your home or car, insurance is crucial. It ensures that these valuable assets are protected against damage, theft, or loss, safeguarding your wealth.
      </li>
      <li>
        Legal Compliance: In many cases, certain types of insurance (like auto insurance) are legally mandated. Having the correct coverage ensures you comply with the law and avoid penalties.
      </li>
      <li>
        Support for Loved Ones: Life insurance, for example, provides financial security for your dependents should you pass away, helping them maintain their lifestyle and cover essential expenses like education or mortgage payments.
      </li>
    </ul>
    <p>Common Types of Insurance You Should Consider</p>
    <p>There are many different types of insurance, each designed to cover specific risks. Here are some of the most common ones:</p>
    <ul>
      <li>
        Health Insurance: Covers medical expenses, including doctor visits, hospital stays, prescription drugs, and sometimes preventive care. This is essential for managing healthcare costs.
      </li>
      <li>
        Auto Insurance: Mandatory in most places, it covers damages to your vehicle or other vehicles/property in an accident, as well as injuries to yourself or others.
      </li>
      <li>
        Homeowner's/Renter's Insurance: Protects your dwelling and personal belongings against perils like fire, theft, and natural disasters. Renter's insurance covers your belongings even if you don't own the property.
      </li>
      <li>
        Life Insurance: Provides a lump sum payment to your beneficiaries upon your death. This is vital for those with dependents who rely on their income.
      </li>
      <li>
        Disability Insurance: Replaces a portion of your income if you become unable to work due to illness or injury.
      </li>
      <li>
        Travel Insurance: Offers protection against unforeseen events during trips, such as trip cancellations, medical emergencies abroad, or lost luggage.
      </li>
    </ul>
    <p>Choosing the Right Coverage</p>
  <p>Navigating the world of insurance can seem complex, but here are some tips:</p>
  <ul>
    <li>
      Assess Your Needs: What assets do you have to protect? Who depends on your income? What risks are you most exposed to?
      Research and Compare: Don't just pick the first option. Get quotes from multiple providers and compare coverage details, deductibles, and premiums.
      Understand the Fine Print: Read policies carefully to know exactly what is and isn't covered.
      Consult an Expert: An insurance agent or financial advisor can help you understand your options and tailor a plan to your specific situation.
    </li>
  </ul>
  <p>Insurance isn't about hoping something bad happens; it's about being prepared if it does. It’s an essential tool for building financial resilience and protecting your future in an unpredictable world.</p>
  <p>Summary : insurance as a crucial financial safety net in an unpredictable world. It emphasizes how insurance provides financial protection, peace of mind, and asset security against unforeseen events like illness or accidents. Different types, from health to auto and life insurance, offer specific coverage. The blog advises assessing needs and comparing policies to choose the right protection.</p>
    `,
  },
  {
    id: 2,
    image: new URL("@/assets/images/blog/example.png", import.meta.url).href,
    title: "Introducing CodeWizard, streamline with AI assistance",
    category: "Design",
    date: "Jan 3, 2024",
    likes: 600,
    views: 300,
    comments: 1500,
    description:
      "Introducing CodeWizard, streamline with AI assistance Explore AI-powered design tools that simplify modern app development.",
  },
  {
    id: 3,
    image: new URL("@/assets/images/blog/example.png", import.meta.url).href,
    title: "Discover HelpBot, the AI assistant for customer service",
    category: "Insurance",
    date: "Feb 10, 2024",
    likes: 600,
    views: 300,
    comments: 2000,
    description: `Discover HelpBot, the AI assistant for customer service Transform service experience using intelligent, real-time customer insights.`,
  },
  {
    id: 4,
    image: new URL("@/assets/images/blog/example.png", import.meta.url).href,
    title: "Discover HelpBot, the AI assistant for customer service",
    category: "Technology",
    date: "Feb 10, 2024",
    likes: 600,
    views: 200,
    comments: 300,
    description: `Discover HelpBot, the AI assistant for customer service AI-driven platform to uncover deep marketing and customer behavior patterns.`,
  },
  {
    id: 5,
    image: new URL("@/assets/images/blog/example.png", import.meta.url).href,
    title: "Discover HelpBot, the AI assistant for customer service",
    category: "Technology",
    date: "Feb 10, 2024",
    likes: 600,
    views: 200,
    comments: 300,
    description: `
    <p>`,
  },
  // Tambah lainnya...
].map((post) => ({
  ...post,
  slug: `${generateSlug(post.title)}`, // pastikan unik
}));
