// Anjileen's Code

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './views/HomeScreen';
import SingleListingScreen from './views/SingleListingScreen';
import SignInScreen from './views/SignInScreen';
import SignUpScreen from './views/SignUpScreen';
import PostListingScreen from './views/PostListingScreen';
import ProfileScreen from './views/ProfileScreen';
import EditListingScreen from './views/EditListingScreen';
import BrowseListingsScreen from './views/BrowseListingsScreen';
import DeleteListingScreen from './views/DeleteListingScreen';
import AboutUsScreen from './views/AboutUsScreen';
import ManualsScreen from './views/ManualsScreen';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <main>
                    {/* setting up page routes */}
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/listing/:slug" element={<SingleListingScreen />} />
                        <Route path="/signin" element={<SignInScreen />} />
                        <Route path="/signup" element={<SignUpScreen />} />
                        <Route path="/postlisting" element={<PostListingScreen />} />
                        <Route path="/profile" element={<ProfileScreen />} />
                        <Route path="/editlisting/:slug" element={<EditListingScreen />} />
                        <Route path="/browselistings" element={<BrowseListingsScreen />} />
                        <Route path="/deletelisting/:slug" element={<DeleteListingScreen />} />
                        <Route path="/aboutus" element={<AboutUsScreen />} />
                        <Route path="/manuals" element={<ManualsScreen />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
