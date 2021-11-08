
import * as halfmoon from 'halfmoon';

export class Fetcher {

    /**
     * 
     * @param url The base url for the Fetch Call. Should always be this.$store.getters.apiUrl
     * @param toastOnError 
     * @returns 
     */
    public static async getServerStatus(url: string, toastOnError: boolean): Promise<FetchResponse> {

        const response = new FetchResponse(false);

        console.log('Checking Server Status.');

        return fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(r => r.json().then(data => ({ ok: r.ok, status: r.status, statusText: r.statusText, body: data })))
        .then(obj => {
            if (Math.floor((obj.status / 100) % 10) != 2) {
                throw new Error(obj.status + " " + obj.statusText);
            }
            response.ok = true;
            response.status = obj.status;
            response.statusText = obj.statusText;

            console.log(response);
            return response;
        })
        .catch(err => {
            response.ok = false;
            response.status = err.status;
            response.statusText = err;

            if (toastOnError) {
                this.errorToast(response.statusText);
            }

            console.log(response);
            return response;
        });
    }

    public static async getSystems(url: string, toastOnError: boolean): Promise<FetchResponse> {

        const response = new FetchResponse(false);

        console.log('Fetching systems from ' + url + '/systems' + ". Response:");

        return fetch(url + '/systems', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(r => r.json().then(data => ({ ok: r.ok, status: r.status, statusText: r.statusText, body: data })))
        .then(obj => {
            if (Math.floor((obj.status / 100) % 10) != 2) {
                throw new Error(obj.status + " " + obj.statusText);
            }
            response.body = obj.body;
            response.ok = true;
            response.status = obj.status;
            response.statusText = obj.statusText;

            console.log(response);
            return response;
        })
        .catch(err => {
            response.ok = false;
            response.status = err.status;
            response.statusText = err;

            if (toastOnError) {
                this.errorToast(response.statusText);
            }

            console.log(response);
            return response;
        });
    }

    public static async getCategories(url: string, systemId: number, toastOnError: boolean): Promise<FetchResponse> {

        const response = new FetchResponse(false);

        console.log('Fetching categories from ' + url + '/categoriesBySystem/' + systemId + ". Response:");

        return fetch(url + '/categoriesBySystem/' + systemId, {
            method: 'get',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        })
        .then(r =>  r.json().then(data => ({ok: r.ok, status: r.status, statusText: r.statusText, body: data})))
        .then(obj => {
            if (Math.floor((obj.status / 100) % 10) != 2) {
                throw new Error(obj.status + " " + obj.statusText);
            }
            response.body = obj.body;
            response.ok = true;
            response.status = obj.status;
            response.statusText = obj.statusText;

            console.log(response);
            return response;
        })
        .catch(err => {
            response.ok = false;
            response.status = err.status;
            response.statusText = err;

            if (toastOnError) {
                this.errorToast(response.statusText);
            }

            console.log(response);
            return response;
        });
    }

    public static async addCategory(url: string, name: string, systemId: number, code: string, toastOnError: boolean, toastOnSuccess: boolean): Promise<FetchResponse> {

        const response = new FetchResponse(false);

        return fetch(url + '/categories/', {
            method: 'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                systemId: systemId,
                code: code,
            }),
        })
        .then(r =>  r.json().then(data => ({ok: r.ok, status: r.status, statusText: r.statusText, body: data})))
        .then(obj => {
            if (Math.floor((obj.status / 100) % 10) != 2) {
                throw new Error(obj.body.message);
            }

            response.body = obj.body;
            response.ok = true;
            response.status = obj.status;
            response.statusText = obj.statusText;

            if (toastOnSuccess) {
                this.successToast(name, "added");
            }

            return response;
        })
        .catch(err => {
            response.ok = false;
            response.status = err.status;
            response.statusText = err;

            if (toastOnError) {
                this.errorToast(response.statusText);
            }

            return response;
        });
    }

    public static async updateCategory(url: string, categoryId: number, name: string, description: string, code: string, toastOnError: boolean, toastOnSuccess: boolean): Promise<FetchResponse> {

        const response = new FetchResponse(false);

        return fetch(url + '/categories/' + categoryId, {
            method: 'put',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                code: code,
            }),
        })
        .then(r =>  r.json().then(data => ({ok: r.ok, status: r.status, statusText: r.statusText, body: data})))
        .then(obj => {
            if (Math.floor((obj.status / 100) % 10) != 2) {
                throw new Error(obj.body.message);
            }

            response.body = obj.body;
            response.ok = true;
            response.status = obj.status;
            response.statusText = obj.statusText;

            if (toastOnSuccess) {
                this.successToast(name, "updated");
            }

            return response;
        })
        .catch(err => {
            response.ok = false;
            response.status = err.status;
            response.statusText = err;

            if (toastOnError) {
                this.errorToast(response.statusText);
            }

            return response;
        });
    }

    public static async deleteCategory(url: string, categoryId: number, name: string, code: string, toastOnError: boolean, toastOnSuccess: boolean): Promise<FetchResponse> {

        const response = new FetchResponse(false);

        return fetch(url + '/categories/' + categoryId, {
            method: 'delete',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code,
            }),
        })
        .then(r =>  r.json().then(data => ({ok: r.ok, status: r.status, statusText: r.statusText, body: data})))
        .then(obj => {
            if (Math.floor((obj.status / 100) % 10) != 2) {
                throw new Error(obj.body.message);
            }

            response.body = obj.body;
            response.ok = true;
            response.status = obj.status;
            response.statusText = obj.statusText;

            if (toastOnSuccess) {
                this.successToast(name, "deleted");
            }

            return response;
        })
        .catch(err => {
            response.ok = false;
            response.status = err.status;
            response.statusText = err;

            if (toastOnError) {
                this.errorToast(response.statusText);
            }

            return response;
        });
    }

    public static async getSubcategories(url: string, categoryId: number, addAllCategory: boolean, toastOnError: boolean): Promise<FetchResponse> {

        const response = new FetchResponse(false);

        console.log('Fetching subcategories from ' + url + '/subcategoriesByCategory/' + categoryId + ". Response:");

        return fetch(url + '/subcategoriesByCategory/' + categoryId, {
            method: 'get',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        })
        .then(r =>  r.json().then(data => ({ok: r.ok, status: r.status, statusText: r.statusText, body: data})))
        .then(obj => {
            if (Math.floor((obj.status / 100) % 10) != 2) {
                throw new Error(obj.status + " " + obj.statusText);
            }
            response.body = this.sort(obj.body, addAllCategory);
            response.ok = true;
            response.status = obj.status;
            response.statusText = obj.statusText;

            console.log(response);
            return response;
        })
        .catch(err => {
            response.ok = false;
            response.status = err.status;
            response.statusText = err;

            if (toastOnError) {
                this.errorToast(response.statusText);
            }

            console.log(response);
            return response;
        });
    }

    public static async addSubCategory(url: string, name: string, categoryId: number, code: string, toastOnError: boolean, toastOnSuccess: boolean): Promise<FetchResponse> {

        const response = new FetchResponse(false);

        return fetch(url + '/subcategories/', {
            method: 'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                categoryId: categoryId,
                code: code,
            }),
        })
        .then(r =>  r.json().then(data => ({ok: r.ok, status: r.status, statusText: r.statusText, body: data})))
        .then(obj => {
            if (Math.floor((obj.status / 100) % 10) != 2) {
                throw new Error(obj.body.message);
            }

            response.body = obj.body;
            response.ok = true;
            response.status = obj.status;
            response.statusText = obj.statusText;

            if (toastOnSuccess) {
                this.successToast(name, "added");
            }

            return response;
        })
        .catch(err => {
            response.ok = false;
            response.status = err.status;
            response.statusText = err;

            if (toastOnError) {
                this.errorToast(response.statusText);
            }

            return response;
        });
    }

    public static async updateSubCategory(url: string, subcategoryId: number, name: string, description: string, code: string, toastOnError: boolean, toastOnSuccess: boolean): Promise<FetchResponse> {

        const response = new FetchResponse(false);

        return fetch(url + '/subcategories/' + subcategoryId, {
            method: 'put',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                code: code,
            }),
        })
        .then(r =>  r.json().then(data => ({ok: r.ok, status: r.status, statusText: r.statusText, body: data})))
        .then(obj => {
            if (Math.floor((obj.status / 100) % 10) != 2) {
                throw new Error(obj.body.message);
            }

            response.body = obj.body;
            response.ok = true;
            response.status = obj.status;
            response.statusText = obj.statusText;

            if (toastOnSuccess) {
                this.successToast(name, "updated");
            }

            return response;
        })
        .catch(err => {
            response.ok = false;
            response.status = err.status;
            response.statusText = err;

            if (toastOnError) {
                this.errorToast(response.statusText);
            }

            return response;
        });
    }

    public static async deleteSubCategory(url: string, subcategoryId: number, name: string, code: string, toastOnError: boolean, toastOnSuccess: boolean): Promise<FetchResponse> {

        const response = new FetchResponse(false);

        return fetch(url + '/subcategories/' + subcategoryId, {
            method: 'delete',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code,
            }),
        })
        .then(r =>  r.json().then(data => ({ok: r.ok, status: r.status, statusText: r.statusText, body: data})))
        .then(obj => {
            if (Math.floor((obj.status / 100) % 10) != 2) {
                throw new Error(obj.body.message);
            }

            response.body = obj.body;
            response.ok = true;
            response.status = obj.status;
            response.statusText = obj.statusText;

            if (toastOnSuccess) {
                this.successToast(name, "deleted");
            }

            return response;
        })
        .catch(err => {
            response.ok = false;
            response.status = err.status;
            response.statusText = err;

            if (toastOnError) {
                this.errorToast(response.statusText);
            }

            return response;
        });
    }

    public static async getLoot(url: string, subcategoryId: number, categoryId: number, rarityIdMin: number, rarityIdMax: number, toastOnError: boolean): Promise<FetchResponse> {

        const response = new FetchResponse(false);

        console.log('Fetching loot from ' + url + '/loot/' + subcategoryId + '/' + categoryId + '/' +  rarityIdMin + '/' +  rarityIdMax +". Response:");

        return fetch(url + '/loot/' + subcategoryId + '/' + categoryId + '/' +  rarityIdMin + '/' +  rarityIdMax, {
            method: 'get',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        })
        .then(r =>  r.json().then(data => ({ok: r.ok, status: r.status, statusText: r.statusText, body: data})))
        .then(obj => {
            if (Math.floor((obj.status / 100) % 10) != 2) {
                throw new Error(obj.status + " " + obj.statusText);
            }
            response.body = obj.body;
            response.ok = true;
            response.status = obj.status;
            response.statusText = obj.statusText;

            console.log(response);
            return response;
        })
        .catch(err => {
            console.log('err');
            console.log(err);
            response.ok = false;
            response.status = err.status;
            response.statusText = err;

            if (toastOnError) {
                this.errorToast(err.status + " " + err.statusText);
            }

            console.log(response);
            return response;
        });
    }

    public static async addLoot(url: string, name: string, description: string, tags: string, subcategoryId: number, rarityId: number,  toastOnError: boolean, toastOnSuccess: boolean): Promise<FetchResponse> {

        const response = new FetchResponse(false);

        return fetch(url + '/loot/', {
            method: 'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                subCategoryId: subcategoryId,
                rarityId: rarityId,
                description: description,
                tags: tags
            }),
        })
        .then(r =>  r.json().then(data => ({ok: r.ok, status: r.status, statusText: r.statusText, body: data})))
        .then(obj => {
            if (Math.floor((obj.status / 100) % 10) != 2) {
                throw new Error(obj.body.message);
            }
            
            response.body = obj.body;
            response.ok = true;
            response.status = obj.status;
            response.statusText = obj.statusText;

            if (toastOnSuccess) {
                this.successToast(name, "added");
            }

            return response;
        })
        .catch(err => {
            response.ok = false;
            response.status = err.status;
            response.statusText = err;

            if (toastOnError) {
                this.errorToast(response.statusText);
            }

            return response;
        });
    }

    public static async getRarities(url: string, toastOnError: boolean): Promise<FetchResponse> {

        const response = new FetchResponse(false);

        console.log('Fetching rarities from ' + url + '/rarities/' + ". Response:");

        return fetch(url + '/rarities/', {
            method: 'get',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        })
        .then(r =>  r.json().then(data => ({ok: r.ok, status: r.status, statusText: r.statusText, body: data})))
        .then(obj => {
            if (Math.floor((obj.status / 100) % 10) != 2) {
                throw new Error(obj.status + " " + obj.statusText);
            }
            response.body = obj.body;
            response.ok = true;
            response.status = obj.status;
            response.statusText = obj.statusText;

            console.log(response);
            return response;
        })
        .catch(err => {
            response.ok = false;
            response.status = err.status;
            response.statusText = err;

            if (toastOnError) {
                this.errorToast(response.statusText);
            }

            console.log(response);
            return response;
        });
    }

    
    private static errorToast(text: string) {
        halfmoon.initStickyAlert({
            content: text,
            title: "Error!",
            alertType: "alert-danger",
            fillType: "filled",
            timeShown: 100000
          });
    }

    private static successToast(name: string, operation: string) {
        halfmoon.initStickyAlert({
            content: "Successfully " + operation + " " + name,
            title: "Success!",
            alertType: "alert-success",
            fillType: "filled",
            timeShown: 5000
          });
    }

    private static sort(list: any, addAllCategory: boolean): any {
        if (list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                const element = list[i];
                if (element.name == "Other" || element.name == "Sonstige"|| element.name == "Sonstiges") {
                    list.splice(i, 1);
                    list.push(element);
                }
            } 
        }
        if (addAllCategory) {
            list.unshift({
            id: 0,
            name: 'All'
            });
        }
        return list;
    }

}

export class FetchResponse {

    public body: any;
    public ok: boolean;
    public status: number = 0;
    public statusText: string = "";
    public err: any;

    constructor(ok: boolean) {
        this.ok = ok;
    }

}