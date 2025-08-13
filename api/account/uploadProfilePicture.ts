import { api } from '@/utils/axios'

export async function uploadUserProfilePicture(formData: any) {
  const uploadFileResponse = await api.post('/users/profile/upload-picture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return uploadFileResponse.data
}
