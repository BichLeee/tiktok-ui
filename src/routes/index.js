//Layout
import { HeaderOnlyLayout, DefaultLayout } from '~/layout';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import config from '~/config';

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.following, component: Following, layout: DefaultLayout },
    { path: config.routes.profile, component: Profile, layout: DefaultLayout },
    { path: config.routes.profile, component: Upload, layout: HeaderOnlyLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
