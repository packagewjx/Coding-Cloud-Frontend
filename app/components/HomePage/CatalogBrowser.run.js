import {Filter, Item} from "./CatalogBrowser";
import {Category} from "./constants";


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
        result.description = annotations.description;
        result.tags = annotations.tags;
        if (annotations['kubectl.kubernetes.io/last-applied-configuration']) {
            result.lastAppliedConfiguration = eval( "(" + annotations['kubectl.kubernetes.io/last-applied-configuration'] + ")" )
            
            }
            
        }
       
        if (annotations.tags) {
            result = findTag(annotations, result);
        }
        else {
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
    if (tag) {
        annotations = tag.annotations;
        if (annotations) {
            result.iconClass = annotations.iconClass;
            result.description = annotations.description;
            result.tags = annotations.tags;
          
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
    console.log("here");
    //define filter function, each filter one property
    let filters = [];
    if (typeof filter.keyword !== 'undefined')
        filters.push((item) =>
            item.displayName.includes(filter.keyword));
    if (filter.primaryType === 'other') {
        filters.push((item) =>
            !(item.hasOwnProperty("primaryType") && item.hasOwnProperty("secondaryType")));
    } else {
        if (typeof filter.primaryType !== 'undefined')
            filters.push((item) =>
                item.primaryType === filter.primaryType);
        if (typeof filter.secondaryType !== 'undefined')
            filters.push((item) =>
                item.secondaryType === filter.secondaryType);
    }

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