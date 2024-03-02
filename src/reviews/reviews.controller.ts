import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReviewEntity } from './entities/review.entity';

@Controller('api/reviews')
@ApiTags('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiCreatedResponse({ type: ReviewEntity })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @ApiOkResponse({ type: ReviewEntity, isArray: true })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ReviewEntity })
  async findOne(@Param('id') id: string) {
    const review = await this.reviewsService.findOne(id);
    if (!review) throw new NotFoundException(`Review ${id} not found`);

    return review;
  }

  @Patch(':id')
  @ApiOkResponse({ type: ReviewEntity })
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const exReview = await this.findOne(id);
    if (exReview) return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ReviewEntity })
  async remove(@Param('id') id: string) {
    const exReview = await this.findOne(id);
    if (exReview) return this.reviewsService.remove(id);
  }
}
