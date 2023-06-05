// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const history = {
    id: 'history',
    type: 'group',
    children: [
        {
            id: 'history-page',
            title: 'History Page',
            type: 'item',
            url: '/history',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        }
    ]
};

export default history;
