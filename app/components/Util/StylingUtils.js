/**
 Create Date: 1/30/18
 @author <a href="mailto:wu812730157@gmail.com">Wujunxian</a>
 Description:
 */

/**
 *
 * @param element jQuery element object
 * @return {number} absolute top pixel to client top
 */
export function getAbsoluteOffsetTop(element) {
    if (typeof element === 'undefined' || typeof element.offsetTop === 'undefined')
        return 0;

    let current = element.offsetParent;
    let top = element.offsetTop;

    while (current !== null) {
        top += current.offsetTop;
        current = current.offsetParent;
    }

    return top;
}