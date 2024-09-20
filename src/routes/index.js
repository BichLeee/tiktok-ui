//Layout
import config from '~/config';
import { DefaultLayout, HeaderOnlyLayout } from '~/layout';
import Following from '~/pages/Following';
import Home from '~/pages/Home';
import NotFound from '~/pages/NotFound';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
        layout: DefaultLayout,
        auth: false,
    },
    {
        path: config.routes.following,
        component: Following,
        layout: DefaultLayout,
        auth: false,
    },
    {
        path: config.routes.profile,
        component: Profile,
        layout: DefaultLayout,
        auth: true,
    },
    {
        path: config.routes.upload,
        component: Upload,
        layout: HeaderOnlyLayout,
        auth: true,
    },
    {
        path: '*',
        component: NotFound,
        layout: HeaderOnlyLayout,
        auth: false,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
