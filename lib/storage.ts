import { supabase } from './supabase';

/**
 * Upload a File object to a specific Supabase Storage bucket.
 * @param file - standard Web File object
 * @param bucketName - Name of the Supabase bucket
 * @returns Public URL of the uploaded image
 */
export const uploadToSupabase = async (file: File, bucketName: string): Promise<string> => {
    const fileExt = file.name.substring(file.name.lastIndexOf('.'));
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
    const filePath = fileName;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, buffer, {
            contentType: file.type,
            upsert: false,
        });

    if (error) {
        throw new Error(`Supabase Storage Error: ${error.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

    return publicUrl;
};

/**
 * Upload multiple files to a Supabase bucket.
 */
export const uploadMultipleToSupabase = async (
    files: File[],
    bucketName: string
): Promise<string[]> => {
    if (!files || files.length === 0) return [];
    const uploadPromises = files.map((file) => uploadToSupabase(file, bucketName));
    return Promise.all(uploadPromises);
};
