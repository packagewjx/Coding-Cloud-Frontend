import {Filter, Item} from "./CatalogBrowser";

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

let TagMap = (function () {
    let result = {};

    for (let primaryType in Category) {
        for (let secondaryType in Category[primaryType]) {
            if (Category[primaryType].hasOwnProperty(secondaryType)) {
                for (let i = 0; i < Category[primaryType][secondaryType].tags.length; i++) {
                    result[Category[primaryType][secondaryType].tags[i]] = {primaryType, secondaryType};
                }
            }
        }
    }

    return result;
})();


/**
 *
 * @param {array} templates
 * @param {array} imageStreams
 */
function convertToItems(templates, imageStreams) {
    let result = [];

    for (let i = 0; i < templates.length; i++) {
        result.push(convertTemplateToItem(templates[i]));
    }

    for (let i = 0; i < imageStreams.length; i++) {
        result.push(convertImageStreamToItem(imageStreams[i]));
    }

    return result;
}

function convertTemplateToItem(template) {
    let result = new Item();
    let annotations = template.metadata.annotations;
    if (annotations) {
        result.iconClass = annotations.iconClass;
        result.displayName = annotations['openshift.io/display-name'] || template.metadata.name;
        if (annotations.tags) {
            result = findTag(annotations, result);
        }
    } else {
        result.displayName = template.metadata.name;
    }
    result.data = template;
    return result;
}

/**
 *
 * @param annotations
 * @param {Item} item
 */
function findTag(annotations, item) {
    let thisTags = annotations.tags.split(",");
    for (let i = 0; i < thisTags.length; i++) {
        if (TagMap[thisTags[i]]) {
            item.primaryType = TagMap[thisTags[i]].primaryType;
            item.secondaryType = TagMap[thisTags[i]].secondaryType;
            break;
        }
    }
    return item;
}

function convertImageStreamToItem(imageStream) {
    let result = new Item();
    result.data = imageStream;
    result.displayName = imageStream.metadata.name;

    let annotations = imageStream.metadata.annotations;
    if (annotations) {
        result.displayName = annotations['openshift.io/display-name'];
    }

    let tag = imageStream.spec.tags[0];
    annotations = tag.annotations;
    if (tag) {
        if (annotations) {
            result.iconClass = annotations.iconClass;
            if (annotations.tags) {
                result = findTag(annotations, result);
            }
        }
    }

    return result;
}

/**
 *
 * @param {Item[]} items
 * @param {Filter} filter
 * @return {Item[]} after applying the filter, the items left.
 */
function doFilter(items, filter) {
    //define filter function, each filter one property
    let filters = [];
    if (typeof filter.keyword !== 'undefined')
        filters.push((item) =>
            item.displayName.includes(filter.keyword));
    if (typeof filter.primaryType !== 'undefined')
        filters.push((item) =>
            item.primaryType === filter.primaryType);
    if (typeof filter.secondaryType !== 'undefined')
        filters.push((item) =>
            item.secondaryType === filter.secondaryType);

    if (filters.length === 0)
        return items;

    let result = [];
    for (let i = 0; i < items.length; i++) {
        let filtered = false;
        for (let j = 0; j < filters.length; j++) {
            if (!filters[j](items[i])) {
                filtered = true;
                break;
            }
        }
        if (!filtered)
            result.push(items[i]);
    }

    return result;
}

export {convertToItems, doFilter}