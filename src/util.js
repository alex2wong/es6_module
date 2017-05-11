
export default class util {

    /**
     * use promise to implement xmlHttpRequest process
     * promise.then receive 2 params.(resolve func, reject func)
     */
    // static xhr(){
    //     // promise will excute immediately after init.
    //     let promise = new Promise(() => {

    //     })
    // }

    /**
     * Promise.prototype.then()
     * receive resolve callback and reject callback.
     * SO important, if series of Async Process is required, 
     * Promise is better than callback hell !
     * 
     * xhr().then(data => { // resolve actions.. }, 
     *          err => { // reject actions.. }
     *      ).then()
     * 
     */

    /**
     * return promise obj.
     */
    static getJSON(url) {
        let promise = new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onreadystatechange = handler;
            xhr.responseType = "json";
            xhr.setRequestHeader("Accept", "application/json");
            xhr.send();

            function handler() {
                if (this.readyState !== 4) {
                    return;
                }
                if (this.status === 200) {
                    // if server response success
                    resolve(this.response);
                } else {
                    reject(new Error(this.statusText));
                }
            };
        })

        return promise;
    }

    /**
     * getJSON("somedata.json").then((data) => {
     *      console.log("got data: " + data);
     * })
     * .catch((err) => {
     *      console.error("encounter error..");
     * })
     */

    /**
     * compared with traditional imageload. what is the advantage ?
     */
    static loadImageAsync(url, resolve, reject) {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.onload = resolve;
            image.onerror = reject;
            image.src = path;
        })
    }

    /**
     * This decorator func.
     */
    static readonly(target, name, descriptor) {
        descriptor.writable = false;
        return descriptor;
    }

    /**
     * target.descriptor..
     * this decorator used for log before calling target function.
     */
    static log(target, name, descriptor) {
        let oldValue = descriptor.value;

        descriptor.value = function() {
            console.log(`Calling "${name}" with`, arguments);
            // descriptor.value refer to the target itself.. func or attri
            return oldValue.apply(null, arguments);
        }
    }

    /**
     * @param fn {Function}
     * @param delay {Number}
     * @return {Function}
     */
    static debounce(fn, delay) {
        let timer;
        // timer is closure in mem.. returned function is the listener..
        return function() {
            var context = this;
            var args = arguments;
            // clear the previous timer to prevent the function call.
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, delay);
        }
    }
    
}
