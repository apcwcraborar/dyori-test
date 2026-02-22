import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateCommentDto } from './create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private supabaseService: SupabaseService) {}

  async findAll(profileId: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('comments')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  async create(createCommentDto: CreateCommentDto) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('comments')
      .insert([createCommentDto])
      .select();

    if (error) throw new Error(error.message);
    return data;
  }

  async remove(id: number) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('comments')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw new Error(error.message);
    return data;
  }
}