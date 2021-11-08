<template>

    <div v-if="!dataReady" class="container-fluid w-full" wfd-id="5">
        <div class="row mt-20 mb-5 justify-content-center">
            <div class="col-11 col-md-10 col-lg-8 col-lg-6 text-center">
                <p v-if="!serverError" class="description" > Loading! </p>
                <div v-if="serverError" class="alert alert-danger" role="alert">
                    <h4 class="alert-heading">Server Error</h4>
                    The Server seems to be unavailabe at the moment.
                </div>
            </div>
        </div>
    </div>

    <div v-if="dataReady" class="container-fluid w-full" wfd-id="5">
    <div class="row">
        <div class="col-12">
            <img class="img-fluid w-full" style="object-fit: cover; max-height: 600px" :src="currentSystem.image_path">
        </div>
    </div>

    <div v-if="response != null" class="row mt-20 mb-5 justify-content-center">
        <div class="col-11 col-md-10 col-lg-8 col-lg-6 text-center">
            <div v-if="response.ok" class="alert alert-success" role="alert">
                <h4 class="alert-heading">Success</h4>
                {{ response.status }}: {{ response.statusText }}
            </div>
            <div v-if="!response.ok" class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Error!</h4>
                {{ response.status }}: {{ response.statusText }}
            </div>
            
        </div>
    </div>

    <div class="row mt-20 mb-5 justify-content-center">
        <div class="col-11 col-md-10 col-lg-8 col-lg-6 text-center">
            <div class="form-inline-sm" style="font-size: 2rem;">
                <label for="select-system">Select a System:</label>
                <select class="form-control" id="select-system" v-on:change="changeSelectedSystem($event)">
                    <option v-for="(system, index) in systemsResponse.body" :key="system" :value="index" :selected="index === 0">{{ system.name }}</option>
                </select>
            </div>

            <p class="description" v-if="currentSystem != null">
                {{ currentSystem.description }}
            </p>
            
        </div>
    </div>

    <div class="row mt-20 mb-5 justify-content-center">
        <div class="col-11">
            <h4>Add Category:</h4>
            <div class="form-inline-md">
                <label class="required" for="input-code">Code:</label>
                <input v-model="inputCode" type="text" class="form-control" placeholder="Code" id="input-code" required="required">
                <label class="required" for="input-category">Category:</label>
                <input v-model="inputCategory" type="text" class="form-control" placeholder="Category name" id="input-category" required="required">
                <button class="btn btn-primary ml-auto" role="button" v-on:click="addCategory()">Add</button>
            </div>
        </div>
    </div>

    <div class="row mt-20 mb-20 justify-content-center">
        <div class="col-8">
            <h4>Categories:</h4>

            <table class="table">
                <tbody>
                    <tr v-for="(category, index) in categoriesResponse.body" :key="category">
                        <th>{{ category.id }}</th>
                        <td><input v-model="categoriesResponse.body[index].name" type="text" class="form-control"></td>
                        <td>
                            <button class="btn btn-primary" role="button" v-on:click="updateCategory(index)">Update</button>
                        </td>
                        <td>
                            <button class="btn btn-primary" role="button" v-on:click="deleteCategory(index)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    </div>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Fetcher, FetchResponse } from './../../../types/fetching'
import halfmoon from 'halfmoon';

export default class Category extends Vue {

    dataReady: boolean = false;
    serverError: boolean = false;

    systemsResponse: FetchResponse = new FetchResponse(false);
    currentSystem: any;

    categoriesResponse: FetchResponse = new FetchResponse(false);
    currentCategory: any;

    inputCode: string = "";
    inputCategory: string = "";
    
    async mounted() {
        var res = await Fetcher.getServerStatus(this.$store.getters.apiUrl, true);
        if (res.ok) {
            await this.getSystems();
            await this.getCategoriesBySystem(this.currentSystem.id);
            this.dataReady = true;
        } else {
            this.serverError = true;
        }
    }

    async getSystems(): Promise<void> {
        this.systemsResponse = await Fetcher.getSystems(this.$store.getters.apiUrl, true);
        this.currentSystem = this.systemsResponse.body[0];
    }

    async changeSelectedSystem(event: any): Promise<void> {
        this.currentSystem = this.systemsResponse.body[event.target.value];
        await this.getCategoriesBySystem(this.currentSystem.id);
    }

    async getCategoriesBySystem(systemId: number): Promise<void> {

        this.categoriesResponse = await Fetcher.getCategories(this.$store.getters.apiUrl, systemId, true);
        this.currentCategory = this.categoriesResponse.body[0];
    }

    async changeSelectedCategory(event: any): Promise<void> {
        this.currentCategory = this.categoriesResponse.body[event.target.value];
    }

    async addCategory(): Promise<void> {
        await Fetcher.addCategory(this.$store.getters.apiUrl, this.inputCategory, this.currentSystem.id, this.inputCode, true, true)
        await this.getCategoriesBySystem(this.currentSystem.id);
        this.inputCategory = "";
    }

    async updateCategory(index: number): Promise<void> {
        if (confirm("Are your sure you want to update " + this.categoriesResponse.body[index].name + "?")) {
            await Fetcher.updateCategory(this.$store.getters.apiUrl, this.categoriesResponse.body[index].id, this.categoriesResponse.body[index].name, this.categoriesResponse.body[index].description, this.inputCode, true, true)
            await this.getCategoriesBySystem(this.currentSystem.id);
            this.inputCategory = "";
        }
    }

    async deleteCategory(index: number): Promise<void> {
        if (confirm("Are your sure you want to delete " + this.categoriesResponse.body[index].name + "?\nPlease note that you need to delete all coresponding SubCategories first.")) {
            await Fetcher.deleteCategory(this.$store.getters.apiUrl, this.categoriesResponse.body[index].id, this.categoriesResponse.body[index].name, this.inputCode, true, true)
            await this.getCategoriesBySystem(this.currentSystem.id);
            this.inputCategory = "";
        }
    }
    
}
  
</script>

<style scoped lang="scss">

td .form-group {
    margin: 0;
}

p.description {
    font-size: 2rem;
}

</style>