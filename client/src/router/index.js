import { createRouter, createWebHistory } from 'vue-router'
import admin from '../components/pages/admin.vue'
import user from '../components/pages/user.vue'
import ActiveUsers from '../views/admin_view/ActiveUsers.vue'
import adminMessages from '../views/admin_view/adminMessages.vue'
import profile from '../views/admin_view/adminProfile.vue'
import catalog from '../views/admin_view/bookCatalog.vue'
import account from '../views/client_view/account.vue'
import bookDetails from '../views/client_view/bookDetails.vue'
import homePage from '../views/client_view/homePage.vue'
import loans from '../views/client_view/loans.vue'
import login from '../views/client_view/login.vue'
import notfound from '../views/client_view/notFound.vue'
import register from '../views/client_view/register.vue'
import userMessage from '../views/client_view/userMessage.vue'

// TODO: modify the route guard to block user from visiting admin routes and vice versa [add isadmin and isuser to check]
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'homePage',
			component: homePage,
			meta: { guestOnly: true },
		},
		{
			path: '/login',
			name: 'login',
			component: login,
			meta: { guestOnly: true },
		},
		{
			path: '/register',
			name: 'register',
			component: register,
			meta: { guestOnly: true },
		},
		{
			path: '/admin',
			name: 'admin',
			component: admin,
			meta: { requiresAuth: true },
		},
		{
			path: '/user',
			name: 'user',
			component: user,
			meta: { requiresAuth: true },
		},
		{
			path: '/account',
			name: 'account',
			component: account,
			meta: { requiresAuth: true },
		},
		{
			path: '/user-message',
			name: 'userMessage',
			component: userMessage,
			meta: { requiresAuth: true },
		},
		{
			path: '/admin-messages',
			name: 'adminMessages',
			component: adminMessages,
			meta: { requiresAuth: true },
		},
		{
			path: '/Active-users',
			name: 'ActiveUsers',
			component: ActiveUsers,
			meta: { requiresAuth: true },
		},
		{
			path: '/catalog',
			name: 'catalog',
			component: catalog,
			meta: { requiresAuth: true },
		},
		{
			path: '/profile',
			name: 'profile',
			component: profile,
			meta: { requiresAuth: true },
		},
		{
			path: '/loans',
			name: 'loans',
			component: loans,
			meta: { requiresAuth: true },
		},
		{
			path: '/book-details/:id',
			name: 'bookDetails',
			component: bookDetails,
			meta: { requiresAuth: true },
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'notfound',
			component: notfound,
		},
	],
})

router.beforeEach((to, from, next) => {
	const isAuthenticated = sessionStorage.getItem('isLoggedin') === 'true'
	if (to.matched.some((record) => record.meta.guestOnly) && isAuthenticated) {
		// If the user is already authenticated and trying to access a guest-only page,
		// redirect them to their account page
		next({ name: 'account' })
	} else if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
		// If the user is not authenticated and trying to access a page that requires
		// authentication, redirect them to the login page
		next({ name: 'login' })
	} else {
		next()
	}
})

export default router
