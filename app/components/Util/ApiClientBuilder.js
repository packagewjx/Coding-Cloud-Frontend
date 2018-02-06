class ApiClientBuilder {


    /**
     *
     * @param {string} token Bearer token for this client
     */
    static set token(token) {
        let OpenShiftApiWithKubernetes = require('open_shift_api__with_kubernetes');
        this._apiClient = OpenShiftApiWithKubernetes.ApiClient.instance;
        this._apiClient.authentications['BearerToken'].apiKey = token;
    }

    /**
     * must invoke after setting the token
     * @return {module:ApiClient|instance|*}
     */
    static get apiClient() {
        if (typeof this._apiClient === 'undefined') {
            console.error("No token provided for openshift api client!");
            return;
        }
        return this._apiClient;
    }

    /**
     *
     * @return {*}
     */
    static get apiGroup() {
        let OpenShiftApiWithKubernetes = require('open_shift_api__with_kubernetes');
        return OpenShiftApiWithKubernetes;
    }
}

export default ApiClientBuilder;