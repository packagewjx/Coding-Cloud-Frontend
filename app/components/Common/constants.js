// GLOBAL CONSTANTS
// -----------------------------------

export const APP_COLORS = {
    'primary': '#5d9cec',
    'success': '#27c24c',
    'info': '#23b7e5',
    'warning': '#ff902b',
    'danger': '#f05050',
    'inverse': '#131e26',
    'green': '#37bc9b',
    'pink': '#f532e5',
    'purple': '#7266ba',
    'dark': '#3a3f51',
    'yellow': '#fad732',
    'gray-darker': '#232735',
    'gray-dark': '#3a3f51',
    'gray': '#dde6e9',
    'gray-light': '#e4eaec',
    'gray-lighter': '#edf1f2'
};

export const APP_MEDIAQUERY = {
    'desktopLG': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
};

export const SERVER_ADDRESSES = {
    'backend': 'https://localhost:8080',
    'master': 'https://116.56.140.108:8443'
};

export const RESULT_CODE = {
    'success': 0,
    'unauthorize': 1001,
    'unauthenticate': 1002,
    'bad-argument': 1003,
    'other': 1004,
    'json-convert-error': 1005,
    'bad-credential': 1006,
    'bad-token': 1007
};

export const ANNOTATION_KEYS = {
    description: 'description',
    iconClass: 'iconClass',
    tags: 'tags',
    'openshift.io': {
        'display-name': 'openshift.io/display-name'
    },
    'template.openshift.io': {
        'documentation-url': 'template.openshift.io/documentation-url',
        'long-description': 'template.openshift.io/long-description',
        'support-url': 'template.openshift.io/support-url',
        'provider-display-name': 'template.openshift.io/provider-display-name'
    }
};