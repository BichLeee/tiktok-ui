import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';

import routes from './config/routes';
import { useUser } from './store/hooks';
import { login as loginAccount } from './store/user';

import { DefaultLayout } from '~/layout';
import { publicRoutes } from '~/routes';

function App() {
    const [dehydrated, setDehyrated] = useState(false);
    const dispatch = useDispatch();
    const user = useUser();

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
        setDehyrated(true);
    }, []);

    return (
        dehydrated && (
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Layout = route.layout || DefaultLayout;
                            const Page = route.component;
                            if (!route.auth || user.email != '') {
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
                            } else {
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={<Navigate to={routes.home} />}
                                    />
                                );
                            }
                        })}
                    </Routes>
                </div>
            </Router>
        )
    );
}

export default App;
