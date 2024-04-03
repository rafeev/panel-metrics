import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE;

export const useAuthStore = defineStore('auth', () => {
	const userInfo = ref({
		token: '',
		email: '',
		userId: '',
		refreshToken: '',
		expiresIn: ''
	});

	const error = ref('');
	const loader = ref(false);

	const auth = async (payload, type) => {
		const strungUrl = type === 'signup' ? 'signUp' : 'signInWithPassword';
		error.value = '';
		loader.value = true;
		try	{
			let response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${strungUrl}?key=${apiKey}`, {
				...payload,
				returnSecureToken: true
			});
			userInfo.value = {
				token: response.data.idToken,
				email: response.data.email,
				userId: response.data.userId,
				refreshToken: response.data.refreshToken,
				expiresIn: response.data.expiresIn
			};
			localStorage.setItem('userTokens', JSON.stringify({
				token: userInfo.value.token,
				refreshToken: userInfo.value.refreshToken,
				expiresIn: response.data.expiresIn
			}));
		}
		catch (err)
		{
			console.log('err.response.data.error.message', err.response.data.error.message);
			switch (err.response.data.error.message)
			{
				case 'EMAIL_EXISTS':
					error.value = 'Email exist'
					break;
				case 'MISSING_EMAIL':
					error.value = 'Missing email'
					break;
				case 'OPERATION_NOT_ALLOWED':
					error.value = 'Operation not allowed';
					break;
				case 'EMAIL_NOT_FOUND':
					error.value = 'Email not found';
					break;
				case 'INVALID_PASSWORD':
					error.value = 'Invalid password';
					break;
				case 'INVALID_LOGIN_CREDENTIALS':
					error.value = 'INVALID_LOGIN_CREDENTIALS';
					break;
				default:
					error.value = 'Error';
			}
			throw error.value;
		}
		finally
		{
			loader.value = false;
		}
	}

	return { auth, userInfo, error, loader };
});
