import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { SupabaseService } from '../../supabase/supabase.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, SupabaseService],
})
export class CommentsModule {}