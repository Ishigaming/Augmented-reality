import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  async listTargets(): Promise<any[]> {
    const { data: userData, error: userError } = await this.supabase.auth.getUser();
    if (userError) throw userError;

    const user = userData?.user;
    if (!user) throw new Error('No hay usuario autenticado');

    const { data, error } = await this.supabase
      .from('targets')
      .select('*')
      .eq('user_id', user.id);

    if (error) throw error;
    return data || [];
  }

  async uploadImage(uid: string, file: File, bucket: string = 'ar-assets'): Promise<string> {
    if (!file || file.size === 0) {
      throw new Error('El archivo está vacío o inválido');
    }

    const path = `${uid}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });

    if (error) throw error;

    const { data: publicUrl } = this.supabase.storage.from(bucket).getPublicUrl(path);
    return publicUrl.publicUrl;
  }

  async uploadFile(uid: string, file: File, bucket: string = 'ar-assets'): Promise<string> {
    if (!file || file.size === 0) {
      throw new Error('El archivo está vacío o inválido');
    }

    const safeName = file.name.replace(/\s+/g, '-');
    const path = `${uid}/${Date.now()}-${safeName}`;
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });

    if (error) throw error;

    const { data: publicUrl } = this.supabase.storage.from(bucket).getPublicUrl(path);
    return publicUrl.publicUrl;
  }

  async deleteFile(publicUrl: string, bucket: string = 'ar-assets'): Promise<void> {
    const base = environment.supabaseUrl.replace(/\/$/, '');
    const prefix = `${base}/storage/v1/object/public/${bucket}/`;
    const cleanUrl = decodeURIComponent(publicUrl.split('?')[0]);
    const filePath = cleanUrl.slice(prefix.length);
    const { error } = await this.supabase.storage.from(bucket).remove([filePath]);
    if (error) throw error;
  }

  async deleteNftDescriptors(nfturlbase: string, bucket: string = 'ar-assets'): Promise<void> {
    const extensions = ['.fset', '.fset3', '.iset'];
    const base = environment.supabaseUrl.replace(/\/$/, '');
    const prefix = `${base}/storage/v1/object/public/${bucket}/`;
    const cleanBase = decodeURIComponent(nfturlbase.split('?')[0]);
    const relativePath = cleanBase.slice(prefix.length);
    const files = extensions.map(ext => `${relativePath}${ext}`);
    const { error } = await this.supabase.storage.from(bucket).remove(files);
    if (error) throw error;
  }

  async verifyNftDescriptors(nfturlbase: string): Promise<void> {
    const extensions = ['.fset', '.fset3', '.iset'];
    for (const ext of extensions) {
      const url = `${nfturlbase}${ext}`;
      try {
        const res = await fetch(url, { method: 'HEAD' });
        if (res.ok) {
          console.log(`Descriptor encontrado: ${url}`);
        } else {
          console.error(`Error ${res.status} al acceder: ${url}`);
        }
      } catch (err) {
        console.error(`Fallo al intentar acceder a ${url}`, err);
      }
    }
  }

  async saveTarget(target: any) {
    const { data, error } = await this.supabase.from('targets').insert(target).select();
    if (error) throw error;
    return data;
  }

  async updateTarget(id: string, updates: any) {
    const { data, error } = await this.supabase.from('targets').update(updates).eq('id', id).select();
    if (error) throw error;
    return data;
  }

  async deleteTarget(id: string): Promise<boolean> {
    const { data, error } = await this.supabase.from('targets').select('*').eq('id', id).single();
    if (error) throw error;

    try {
      if (data?.contenturl) {
        await this.deleteFile(data.contenturl);
      }
      if (data?.nfturlbase) {
        await this.deleteNftDescriptors(data.nfturlbase);
      }
      if (data?.patternurl) {
        await this.deleteFile(data.patternurl);
      }
    } catch (fileErr) {
      console.warn('Error eliminando archivos del bucket:', fileErr);
    }

    const { error: delError } = await this.supabase.from('targets').delete().eq('id', id);
    if (delError) throw delError;

    return true;
  }

  // 🔎 Función de prueba para confirmar que el bucket funciona
  async testUploadDummyFile(): Promise<void> {
    const blob = new Blob(['Hola mundo desde Supabase'], { type: 'text/plain' });
    const file = new File([blob], 'test.txt', { type: 'text/plain' });

    const path = `test/${Date.now()}-test.txt`;
    const { data, error } = await this.supabase.storage
      .from('ar-assets')
      .upload(path, file, { upsert: true });

    if (error) {
      console.error('Error al subir archivo de prueba:', error.message);
    } else {
      const { data: publicUrl } = this.supabase.storage.from('ar-assets').getPublicUrl(path);
      console.log('Archivo subido correctamente. URL pública:', publicUrl.publicUrl);
    }
  }
}
