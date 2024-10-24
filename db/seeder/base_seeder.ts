import { PrismaClient } from "@prisma/client";
import { AVAILABLE_LOCALES, AVAILABLE_NEWS_TYPE } from "const";

const prisma = new PrismaClient();

class BaseSeeder {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async locale() {
    await this.prisma.locale.createMany({
      data: Object.values(AVAILABLE_LOCALES).map((locale) => ({
        locale: locale,
      })),
      skipDuplicates: true,
    });
  }

  public async newsType() {
    await this.prisma.news_type.createMany({
      data: AVAILABLE_NEWS_TYPE.map((news_type) => ({ news_type })),
      skipDuplicates: true,
    });
  }

  public async disconnect() {
    await this.prisma.$disconnect();
  }
}

const baseSeeder = new BaseSeeder(prisma);
baseSeeder.locale();
baseSeeder.newsType();
baseSeeder.disconnect();
