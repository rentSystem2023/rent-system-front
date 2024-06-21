import axios from 'axios';
import { IMAGE_URL } from 'src/constant';

// function : 파일 업로드 API 함수 //
export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await axios.post(IMAGE_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        return response.data ? response.data : '';
    } catch (error) {
        console.error("File upload failed:", error);
        return '';
    }
};