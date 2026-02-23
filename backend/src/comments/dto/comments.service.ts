import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateCommentDto } from './create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private supabaseService: SupabaseService) {}

  async findAll(profileId: string) {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('comments')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error in findAll:', error);
        throw new Error(error.message);
      }
      return data || [];
    } catch (err) {
      console.error('Error in findAll:', err);
      throw err;
    }
  }

  async create(createCommentDto: CreateCommentDto) {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('comments')
        .insert([createCommentDto])
        .select('*');

      if (error) {
        console.error('Supabase error in create:', error);
        throw new Error(error.message);
      }
      return data;
    } catch (err) {
      console.error('Error in create:', err);
      throw err;
    }
  }

  async remove(id: number) {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('comments')
        .delete()
        .eq('id', id)
        .select();

      if (error) {
        console.error('Supabase error in remove:', error);
        throw new Error(error.message);
      }
      return data;
    } catch (err) {
      console.error('Error in remove:', err);
      throw err;
    }
  }
}