import React, { lazy } from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-notifications/lib/notifications.css';
import 'simplebar-react/dist/simplebar.min.css';
import { NotificationContainer } from 'react-notifications';

import DashboardLayout from '@/layouts/dashboard';
import AuthLayout from './layouts/auth';

export const IndexPage = lazy(() => import('@/pages/app'));
export const MilestonesPage = lazy(() => import('@/pages/milestones'));
export const CreateMilestonePage = lazy(() => import('@/pages/create-milestones'));
export const MilestoneDetailPage = lazy(() => import('@/pages/milestone-detail'));
export const ForgotPasswordPage = lazy(() => import('@/pages/forgot-password'));
export const VerifyEmailPage = lazy(() => import('@/pages/verify-email'));
export const LoginPage = lazy(() => import('@/pages/login'));
export const RegisterPage = lazy(() => import('@/pages/register'));
export const Page404 = lazy(() => import('@/pages/page-not-found'));

function App() {

	const location = useLocation();

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return (
		<>
			<Routes>
				<Route element={<DashboardLayout />}>
					<Route index element={<IndexPage />} />

					<Route path="milestones" element={<MilestonesPage />} />
					<Route path="milestones/create" element={<CreateMilestonePage />} />
					<Route path="milestones/receivable" element={<MilestonesPage />} />
					<Route path="milestones/payable" element={<MilestonesPage />} />
					<Route path="milestones/:id" element={<MilestoneDetailPage />} />

					<Route path="*" element={<Page404 />} />
				</Route>
				<Route element={<AuthLayout />}>
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/verify-email" element={<VerifyEmailPage />} />
					<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				</Route>
			</Routes>
			<ToastContainer />
			<NotificationContainer />
		</>
	);
}

export default App;