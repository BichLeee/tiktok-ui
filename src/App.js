import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layout';
import { login as loginAccount } from './store/user';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            const data = {
                data: JSON.parse(user),
                token: JSON.parse(token),
            };
            dispatch(loginAccount(data));
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout || DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
