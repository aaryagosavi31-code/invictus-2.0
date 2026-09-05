import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Homepage from './components/Homepage'
import Navbar from './components/Navbar'
import FAQ from './components/FAQ'

function App() {
  return (
    <>
  <Register />
  <ContactUs />
  <FAQ/>
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