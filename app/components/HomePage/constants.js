/**
 Create Date: 1/31/18
 @author <a href="mailto:wu812730157@gmail.com">Wujunxian</a>
 Description: Store constants for HomePage
 */

/**
 * tag-primaryType conversion map
 * @type {{java: string}}
 */
export const Category = {
    'language':
        {
            'java': {iconUrl: 'logo/openjdk.svg', tags: ['java']},
            'dotnet': {iconUrl: 'logo/dotnet.svg', tags: ['dotnet', '.net']},
            'javascript': {iconUrl: 'logo/js.svg', tags: ['nodejs']},
            'perl': {iconUrl: 'logo/perl.svg', tags: ['perl']},
            'ruby': {iconUrl: 'logo/ruby.svg', tags: ['ruby']},
            'php': {iconUrl: 'logo/php.svg', tags: ['php']},
            'python': {iconUrl: 'logo/python.svg', tags: ['python']}
        },
    'database':
        {
            'mongo': {iconUrl: 'logo/mongodb.svg', tags: ['mongodb']},
            'mysql': {iconUrl: 'logo/mysql-database.svg', tags: ['mysql']},
            'postgres': {iconUrl: 'logo/postgresql.svg', tags: ['postgresql']},
            'mariadb': {iconUrl: 'logo/mariadb.svg', tags: ['mariadb']},
        },
    'middleware': {
        'runtime': {tags: ['httpd']}
    },
    'cicd': {
        'jenkins': {iconUrl: 'logo/jenkins.svg', tags: ['jenkins']}
    }
};

/**
 * iconClass-iconUrl map, by default, it is 'icon-<name>' => 'logo/<name>.svg'
 * this class store the exceptions.
 */
export const iconClassUrl = {

};

/**
 * find iconClass's icon url.
 * @param {string} iconClass
 * @return {string} the icon url
 */
export function findIconClass(iconClass) {
    if (typeof iconClass === 'undefined')
        return '';
    if (typeof iconClassUrl[iconClass] !== 'undefined') {
        return iconClassUrl[iconClass];
    } else {
        let name = iconClass.substr(iconClass.indexOf("-") + 1);
        return 'logo/' + name + '.svg';
    }
}