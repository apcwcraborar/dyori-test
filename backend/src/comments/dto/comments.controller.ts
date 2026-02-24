import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './create-comment.dto';

@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAll() {
    try {
      return await this.commentsService.findAll();
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw new HttpException(
        'Failed to fetch comments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    try {
      console.log('Received comment data:', createCommentDto);
      return await this.commentsService.create(createCommentDto);
    } catch (error) {
      console.error('Error creating comment:', error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Failed to create comment: ${error.message}`,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.commentsService.remove(+id);
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw new HttpException(
        'Failed to delete comment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}