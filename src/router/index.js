import { createRouter, createWebHistory } from 'vue-router';
import SignUp from '@/views/SignUp.vue';
import SignIn from '@/views/SignIn.vue';
import Panel from '@/views/Panel.vue';
import {useAuthStore} from '@/stores/auth.js';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'signin',
			component: SignIn,
			meta: {
				auth: false
			}
		},
		{
			path: '/signup',
			name: 'signup',
			component: SignUp,
			meta: {
				auth: false
			}
		},
		{
			path: '/panel',
			name: 'panel',
			component: Panel,
			meta: {
				auth: true
			}
		}
	]
});

router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();

	if (to.meta.auth && !authStore.userInfo.token)
	{
		next('/')
	}
	else if (!to.meta.auth && authStore.userInfo.token)
	{
		next('/panel')
	}
	else
	{
		next();
	}
})

export default router;
