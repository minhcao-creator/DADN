// project imports
import config from 'config';

// action - state management
import * as actionTypes from './actions';

const isToken = () => {

    if(localStorage.getItem('accessToken') != null)
        return true
    else return false
}

const x = isToken()

export const initialState = {
    isOpen: [], // for active default menu
    defaultId: 'default',
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true,
    authentication: x
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
        case actionTypes.LOGIN:
            return{
                ...state,
                authentication: true
            }
        case actionTypes.LOGOUT:
            localStorage.removeItem('accessToken')
            return{
                ...state,
                authentication: false
            }
        case actionTypes.MENU_OPEN:
            id = action.id;
            return {
                ...state,
                isOpen: [id]
            };
        case actionTypes.SET_MENU:
            return {
                ...state,
                opened: action.opened
            };
        case actionTypes.SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: action.fontFamily
            };
        case actionTypes.SET_BORDER_RADIUS:
            return {
                ...state,
                borderRadius: action.borderRadius
            };
        default:
            return state;
    }
};

export default customizationReducer;
