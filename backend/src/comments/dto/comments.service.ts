import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateCommentDto } from './create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private supabaseService: SupabaseService) {}

  async findAll() {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('guestbook_entries')
        .select('*')
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
      console.log('Creating comment with data:', createCommentDto);
      const { data, error } = await this.supabaseService
        .getClient()
        .from('guestbook_entries')
        .insert([createCommentDto])
        .select('*');

      if (error) {
        console.error('Supabase error in create:', error);
        throw new Error(error.message);
      }
      console.log('Comment created successfully:', data);
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
        .from('guestbook_entries')
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