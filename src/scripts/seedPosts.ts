import { PostStatus } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";


async function main() {
  // ⚠️ Use an existing user ID from your database
  const authorId = "EnuuPPBEz2EGML9Zv5opjMQrI6jJpwM8";

  const posts = Array.from({ length: 30 }).map((_, i) => ({
    title: `Sample Blog Post ${i + 1}`,
    content: `This is the content of blog post number ${i + 1}. 
It is seeded data for development and testing purposes.`,
    thumbnail: `https://picsum.photos/seed/post-${i + 1}/600/400`,
    isFeatured: i % 5 === 0, // every 5th post featured
    status: PostStatus.PUBLISHED,
    tags: ["prisma", "node", "backend", "blog"],
    views: Math.floor(Math.random() * 500),
    authorId,
  }));

  await prisma.post.createMany({
    data: posts,
  });

  console.log("✅ 30 posts seeded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
