import { api } from '@/utils/axios'

interface IProfilePictureUploadResponse {
  avatarUrl: string
}

export async function uploadUserProfilePicture(
  formData: any,
): Promise<IProfilePictureUploadResponse> {
  const uploadFileResponse = await api.post('/users/profile/upload-picture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return uploadFileResponse.data
}
