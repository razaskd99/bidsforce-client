'use server'

import { put } from '@vercel/blob';

export const uploadImagesOnBlob = async(formData) =>{
    const imageFiles = formData.getAll('file');
    const uploadPromises = imageFiles.map(async (imageFile) => {
      const blob = await put(imageFile.name, imageFile, {
        access: 'public',
        //addRandomSuffix: false,
        multipart: true,
      });
      return blob;
    });
  
    const uploaded = await Promise.all(uploadPromises);
    console.log('uploaded',uploaded)
    return uploaded
  }