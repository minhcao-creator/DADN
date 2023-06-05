// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};


// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const register = {
    id: 'register',
    type: 'group',
    children: [
        {
            id: 'register-page',
            title: 'Register Account',
            type: 'item',
            url: '/register',
            icon: icons.IconWindmill,
            breadcrumbs: false
        },
    ]
};

export default register;
