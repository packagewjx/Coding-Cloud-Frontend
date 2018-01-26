/**
 Create Date: 1/25/18
 @author <a href="mailto:wu812730157@gmail.com">Wujunxian</a>
 Description: To encapsulate jQuery Ajax method and our configuration to do REST request.
 */

import {SERVER_ADDRESSES} from "../Common/constants";

// import {METHOD, SERVER} from "RestClient";

export const SERVER = {
    MASTER: 'master',
    BACKEND: 'backend'
};

export const METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};

/**
 * A data structure to store request param. Like the setting in $.ajax function.
 * see http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings
 */
class Request {
    /**
     * One of the server in SERVER. SERVER.MASTER, SERVER.BACKEND
     */
    server;
    /**
     * API path.
     */
    path;
    /**
     * can be object, string or array.
     * data that is to be sent. When use HTTP GET method, it will be automatically converted to url parameters. When use
     * other method that contains body, it will be converted to json string if it is an object or array.
     */
    data;
    contentType;
    /**
     * One of the method in METHOD
     */
    method;
    /**
     * function(object data, string status, jqXHR jqXHR)
     */
    success;
    /**
     * function(object data, string status, jqXHR jqXHR)
     */
    error;
    /**
     * function(object data, string status, jqXHR jqXHR)
     */
    complete;
    /**
     * Boolean. Indicate whether if this request is a crossDomain request.
     */
    crossDomain;
    /**
     * data type expected from the server, same function as header "Accept-
     */
    dataType;
    /**
     * an object to store header as key/value pair
     */
    headers;

    constructor() {
        this.server = SERVER.MASTER;
        this.method = METHOD.GET;
        this.crossDomain = true;
        this.dataType = "json";
    }
}

class RestClient {
    static token;

    /**
     * Original http method, provide the customization.
     * @param {Request} request
     */
    static http(request) {
        //add host address
        request.url = request.server === SERVER.MASTER ? SERVER_ADDRESSES.master : SERVER_ADDRESSES.backend + request.path;
        if (typeof RestClient.token !== 'undefined') {
            Object.assign(request.headers,
                request.server === SERVER.MASTER ?
                    //if requesting master, use authentication header
                    {Authentication: "Bearer " + RestClient.token}
                    //else use token header
                    : {Token: RestClient.token});
        }
        $.ajax(request);
    }

    /**
     * short-hand method for http
     * @param server
     * @param path
     * @param param
     * @param success
     * @param error
     * @param complete
     */
    static get(server, path, param, success, error, complete) {
        let request = new Request();
        Object.assign(request, {server, path, data: param, success, error, complete});
        request.method = METHOD.GET;
        RestClient.http(request);
    }

    static post(server, path, data, success, error, complete) {
        let request = new Request();
        Object.assign(request, {server, path, data, success, error, complete});
        request.contentType = 'application/json';
        request.method = METHOD.POST;
        RestClient.http(request);
    }

    static put(server, path, data, success, error, complete) {
        let request = new Request();
        Object.assign(request, {server, path, data, success, error, complete});
        request.contentType = 'application.json';
        request.method = METHOD.PUT;
        RestClient.http(request);
    }

    static delete(server, path, data, success, error, complete) {
        let request = new Request();
        Object.assign(request, {server, path, data, success, error, complete});
        request.contentType = "application/json";
        request.method = METHOD.DELETE;
        RestClient.http(request);
    }


}

export {RestClient, Request};