import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Homepage from './components/Homepage'
import Navbar from './components/Navbar'

function AppLayout() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	)
}

function App(){
	const router = createBrowserRouter([
		{
			element: <AppLayout />,
			children: [
				{ path: "/", element: <Homepage /> },
			]
		}
	])
	
	return (
		<RouterProvider router={router} />
	)
}

export default App