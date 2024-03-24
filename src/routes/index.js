//Layout
import { HeaderOnlyLayout, DefaultLayout } from '~/components/Layout';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';

const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/following', component: Following, layout: DefaultLayout },
    { path: '/profile', component: Profile, layout: DefaultLayout },
    { path: '/upload', component: Upload, layout: HeaderOnlyLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
