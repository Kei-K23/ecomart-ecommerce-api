import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}
  create(createReviewDto: CreateReviewDto) {
    return this.prisma.review.create({
      data: createReviewDto,
    });
  }

  findAll() {
    return this.prisma.review.findMany();
  }

  findOne(id: string) {
    return this.prisma.review.findUnique({ where: { id } });
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const existingReview = await this.findOne(id);
    if (!existingReview) {
      throw new NotFoundException('Review not found to update');
    }

    return this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  async remove(id: string) {
    const existingReview = await this.findOne(id);
    if (!existingReview) {
      throw new NotFoundException('Review not found to delete');
    }

    return this.prisma.review.delete({ where: { id } });
  }
}
