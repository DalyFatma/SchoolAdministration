import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginSchoolAsync = createAsyncThunk(
  'authSchool/loginSchool',
  async ({ login, password }: { login: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/authSchool/loginSchool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      return response.json();
    } catch (error:any) {
      console.error('API Error:', error);
      return rejectWithValue(error.message);
    }
  }
);


