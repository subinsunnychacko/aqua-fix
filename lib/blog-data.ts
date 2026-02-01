import type { StaticImageData } from "next/image";

import crm_sales_process_img from "@/assets/images/blog/crm-sales-process.jpg";
import erp_systems_startups_img from "@/assets/images/blog/erp-systems-startups.jpg";
import replacing_spreadsheets_crms_img from "@/assets/images/blog/replacing-spreadsheets-crms.jpg";
import ai_hr_tools_img from "@/assets/images/blog/ai-hr-tools.jpg";
import ecommerce_software_stack_2025_img from "@/assets/images/blog/ecommerce-software-stack-2025.jpg";

// lib/blog-data.ts
export interface BlogPostType {
  id: number;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  tag: string;
  slug: string;
  isFeature?: boolean;
  image: StaticImageData;
  imageAlt: string;
  author?: string;
  readTime?: string;
  ogImage: string;
}

export const blogPosts: BlogPostType[] = [
  {
    id: 1,
    category: "Blog",
    date: "August 04, 2025",
    title: "Why Your CRM Should Be Built Around Your Sales Process",
    excerpt:
      "Your site should convert, automate, and talk to your CRM. Here's how to make it pull its weight.",
    tag: "CRM",
    slug: "crm-sales-process",
    isFeature: true,
    image: crm_sales_process_img,
    imageAlt: "Visual representation of different CRM sales process.",
    author: "Cod Sphere Team",
    readTime: "5 min read",
    ogImage: "/og/blog-og-crm-sales-process.png",
  },
  {
    id: 2,
    category: "Blog",
    date: "August 04, 2025",
    title: "ERP Systems Built for Startups: Less Overhead, More Output",
    excerpt:
      "Startups need speed, not complexity. Modern ERP systems deliver streamlined operations without draining resources.",
    tag: "ERP",
    slug: "erp-systems-startups",
    image: erp_systems_startups_img,
    imageAlt: "Human managing ERP systems through a transparent screen.",
    author: "Cod Sphere Team",
    readTime: "7 min read",
    ogImage: "/og/blog-og-erp-systems-startups.png",
  },
  {
    id: 3,
    category: "Blog",
    date: "August 04, 2025",
    title: "Why Smart Businesses Are Replacing Spreadsheets with All-in-One CRMs",
    excerpt:
      "Still juggling customer data in messy spreadsheets? It's time to upgrade to a smarter, scalable solution.",
    tag: "Innovation",
    slug: "replacing-spreadsheets-crms",
    image: replacing_spreadsheets_crms_img,
    imageAlt: "Hand holding a glowing lightbulb symbolizing smart CRM business solutions",
    author: "Cod Sphere Team",
    readTime: "6 min read",
    ogImage: "/og/blog-og-replacing-spreadsheets-crms.png",
  },
  {
    id: 4,
    category: "Blog",
    date: "August 04, 2025",
    title: "Say Goodbye to Manual HR: AI Tools Every Small Business Needs",
    excerpt:
      "From hiring to payroll, AI is transforming HR—making it faster, easier, and more accurate than ever.",
    tag: "HR",
    slug: "ai-hr-tools",
    image: ai_hr_tools_img,
    imageAlt: "Hand holding different HR tools symbolizing AI HR tools",
    author: "Cod Sphere Team",
    readTime: "5 min read",
    ogImage: "/og/blog-og-ai-hr-tools.png",
  },
  {
    id: 5,
    category: "Blog",
    date: "August 04, 2025",
    title: "The Software Stack Every E-commerce Business Should Have in 2025",
    excerpt:
      "Running a successful online store in 2025 requires more than just a good product—it needs the right tech foundation.",
    tag: "E-commerce",
    slug: "ecommerce-software-stack-2025",
    image: ecommerce_software_stack_2025_img,
    imageAlt:
      "Stack of cardboard packages on top of laptop symbolizing e-commerce development stack",
    author: "Cod Sphere Team",
    readTime: "8 min read",
    ogImage: "/og/blog-og-ecommerce-software-stack-2025.png",
  },
];
