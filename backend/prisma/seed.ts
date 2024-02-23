import { Prisma, PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import 'dotenv/config';
import { getEnv } from 'src/config/config.utils';
const prisma = new PrismaClient();

const env = getEnv();

const products: Prisma.ProductCreateInput[] = [
  {
    priceInr: 1000,
    name: 'Classic Analog Watch',
    images: [
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTPwvJaQ9O-9BTwcFhrfFyZO-wTXmNqRUST3K7g5xNL29XkLqqUuwP1vrpuKteif7CFuuV-gSu80LIiIYrNEfBNBIXKN_cg&usqp=CAE',
    ],
    description:
      'Introducing our Classic Analog Watch – a timeless companion that seamlessly merges sophistication with functionality. With a sleek stainless steel case and a genuine leather strap, this watch exudes elegance. The easy-to-read dial features luminous hands for effortless timekeeping, making it perfect for both casual and formal occasions. Elevate your style with this enduring accessory that transcends trends.',
  },
  {
    priceInr: 2000,
    name: 'Essential Plain Black Shirt',
    images: ['https://pub-052bc15d6b604762ae76f9b3a603d345.r2.dev/1.webp'],
    description:
      'Discover the epitome of simplicity and versatility with our Essential Plain Black Shirt. Crafted from premium cotton, this shirt offers unmatched comfort while maintaining a polished look. The classic design makes it a wardrobe essential, effortlessly transitioning from boardroom meetings to weekend outings. Pair it with jeans for a casual look or dress it up with tailored trousers – the possibilities are endless with this timeless black shirt.',
  },
  {
    priceInr: 1800,
    name: 'Timeless Plain White Shirt',
    images: ['https://pub-052bc15d6b604762ae76f9b3a603d345.r2.dev/2.webp'],
    description:
      'Elevate your wardrobe with the Timeless Plain White Shirt – a sartorial staple that exudes understated elegance. Tailored to perfection, this shirt boasts a crisp, clean look that suits any occasion. The breathable cotton fabric ensures comfort throughout the day, while the versatile design allows for easy pairing with a variety of bottoms. Make a statement with simplicity and embrace the enduring charm of a well-crafted white shirt.',
  },
  {
    priceInr: 4000,
    name: 'Brown Leather Jacket',
    images: ['https://pub-052bc15d6b604762ae76f9b3a603d345.r2.dev/3.webp'],
    description:
      'Unleash your inner adventurer with our Rugged Brown Leather Jacket. Crafted from high-quality leather, this jacket is designed to withstand the test of time while exuding a timeless appeal. The distressed finish adds a touch of rugged charm, making it a versatile choice for casual outings or motorcycle rides. Embrace the rebellious spirit and make a bold fashion statement with this durable and stylish brown leather jacket.',
  },
  {
    priceInr: 6000,
    name: 'Nike Red Shoes',
    images: ['https://pub-052bc15d6b604762ae76f9b3a603d345.r2.dev/5.webp'],
    description:
      "Step into the future of style with our Nike Red Shoes. Engineered for both performance and fashion, these shoes feature a vibrant red color that demands attention. The breathable mesh upper ensures comfort, while the iconic Nike swoosh adds a touch of athletic flair. Whether you're hitting the gym or navigating city streets, these red shoes are the perfect fusion of comfort and bold, energetic style.",
  },
  {
    priceInr: 3000,
    name: 'Red Designer Jacket',
    images: ['https://pub-052bc15d6b604762ae76f9b3a603d345.r2.dev/6.webp'],
    description:
      "Redefine your fashion statement with our Fashion-forward Red Designer Jacket. This striking piece combines contemporary design with luxurious comfort. The intricate detailing and modern silhouette make it a standout addition to your wardrobe. Whether you're attending a glamorous event or seeking to make an impact in everyday life, this red designer jacket effortlessly merges sophistication with a bold fashion-forward edge.",
  },
  {
    priceInr: 1000,
    name: 'Dune Audiobook',
    images: ['https://pub-052bc15d6b604762ae76f9b3a603d345.r2.dev/8.webp'],
    description:
      "Immerse yourself in the spellbinding universe of Dune with our audiobook edition. Let the dulcet tones of a skilled narrator transport you to the desert planet of Arrakis, where political intrigue, mysticism, and adventure unfold. Perfect for both long journeys and quiet evenings at home, this audiobook captures the essence of Frank Herbert's masterpiece, delivering an audio experience that transcends the pages of the written word.",
  },
  {
    priceInr: 10_000,
    name: 'Sony Headphones',
    images: ['https://pub-052bc15d6b604762ae76f9b3a603d345.r2.dev/9.webp'],
    description:
      "Elevate your audio experience with Sony Headphones, where cutting-edge technology meets unparalleled comfort. These over-ear headphones deliver rich, immersive sound quality, allowing you to lose yourself in your favorite music, movies, or games. With adjustable headbands and plush ear cushions, these headphones ensure a luxurious fit for extended listening sessions. Immerse yourself in a world of pure audio bliss with Sony's commitment to quality and innovation.",
  },
  {
    priceInr: 1000,
    name: 'Green Water Bottle',
    images: ['https://pub-052bc15d6b604762ae76f9b3a603d345.r2.dev/11.avif'],
    description:
      'Embrace sustainability with our Green Water Bottle – the perfect blend of style and eco-conscious living. Crafted from durable and lightweight materials, this bottle is your trusty companion for staying hydrated on the go. The refreshing green hue adds a touch of vibrancy, while the leak-proof design ensures no spills. Stay fashionable and environmentally friendly with this green water bottle that complements your active lifestyle.',
  },
  {
    priceInr: 80_000,
    name: 'iPhone 13 Pro',
    images: ['https://pub-052bc15d6b604762ae76f9b3a603d345.r2.dev/12.avif'],
    description:
      'Embrace sustainability with our Green Water Bottle – the perfect blend of style and eco-conscious living. Crafted from durable and lightweight materials, this bottle is your trusty companion for staying hydrated on the go. The refreshing green hue adds a touch of vibrancy, while the leak-proof design ensures no spills. Stay fashionable and environmentally friendly with this green water bottle that complements your active lifestyle.',
  },
];

const stripe = new Stripe(env.STRIPE_API_KEY);

const stripeCreateProduct = async (
  id: string,
  name: string,
  priceInr: number,
) => {
  await stripe.products.create({
    name,
    id,
    default_price_data: {
      currency: 'inr',
      unit_amount: priceInr * 100,
    },
  });
};

async function main() {
  console.info('Seeding the database :D');
  await Promise.allSettled(
    products.map(async (data) => {
      let prod = await prisma.product.findFirst({
        where: {
          name: data.name,
        },
      });

      if (!prod) {
        prod = await prisma.product.create({
          data,
        });
      }

      const stripeProduct = await stripe.products
        .retrieve(prod.id)
        .catch(() => null);
      if (!stripeProduct) {
        await stripeCreateProduct(prod.id, prod.name, prod.priceInr);
      }

      return prod;
    }),
  );
  console.info(`Added ${products.length} products to the db and to stripe`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
