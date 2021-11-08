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
            <h4>Add SubCategory:</h4>
            <div class="form-inline-lg">
                <label class="required" for="input-code">Code:</label>
                <input v-model="inputCode" type="text" class="form-control" placeholder="Code" id="input-code" required="required">
                <label for="select-category">Category:</label>
                <select class="form-control" id="select-category" v-on:change="changeSelectedCategory($event)">
                    <option v-for="(category, index) in categoriesResponse.body" :key="category" :value="index" :selected="index === 0">{{ category.name }}</option>
                </select>
                <label class="required" for="input-subcategory">SubCategory:</label>
                <input v-model="inputSubCategory" type="text" class="form-control" placeholder="SubCategory name" id="input-subcategory" required="required">
                <button v-on:click="addSubCategory()" class="btn btn-primary" role="button">Add</button>
            </div>
        </div>
    </div>

    <div class="row mt-20 mb-20 justify-content-center">
        <div class="col-8">
            <h4>Categories:</h4>

            <table class="table">
                <tbody>
                    <tr v-for="(subCategory, index) in subCategoriesResponse.body" :key="subCategory">
                        <th>{{ subCategory.id }}</th>
                        <td><input v-model="subCategoriesResponse.body[index].name" type="text" class="form-control"></td>
                        <td>
                            <button class="btn btn-primary" role="button" v-on:click="updateSubCategory(index)">Update</button>
                        </td>
                        <td>
                            <button class="btn btn-primary" role="button" v-on:click="deleteSubCategory(index)">Delete</button>
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
import { Fetcher, FetchResponse } from '../../../types/fetching'
import * as halfmoon from 'halfmoon';

export default class SubCategory extends Vue {

    dataReady: boolean = false;
    serverError: boolean = false;

    systemsResponse: FetchResponse = new FetchResponse(false);
    currentSystem: any;

    categoriesResponse: FetchResponse = new FetchResponse(false);
    currentCategory: any;

    subCategoriesResponse: FetchResponse = new FetchResponse(false);
    currentSubCategory: any;

    inputCode: string = "";
    inputSubCategory: string = "";
    
    async mounted() {
        var res = await Fetcher.getServerStatus(this.$store.getters.apiUrl, true);
        if (res.ok) {
            await this.getSystems();
            await this.getCategoriesBySystem(this.currentSystem.id);
            await this.getSubCategoriesByCategory(this.currentCategory.id);
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
        await this.getSubCategoriesByCategory(this.currentCategory.id);
    }

    async getCategoriesBySystem(systemId: number): Promise<void> {
        this.categoriesResponse = await Fetcher.getCategories(this.$store.getters.apiUrl, systemId, true);
        this.currentCategory = this.categoriesResponse.body[0];
    }

    async changeSelectedCategory(event: any): Promise<void> {
        this.currentCategory = this.categoriesResponse.body[event.target.value];
        await this.getSubCategoriesByCategory(this.currentCategory.id);
    }

    async getSubCategoriesByCategory(categoryId: number): Promise<void> {
        this.subCategoriesResponse = await Fetcher.getSubcategories(this.$store.getters.apiUrl, categoryId, false, true)
        this.currentSubCategory = this.subCategoriesResponse.body[0];
    }

    async addSubCategory(): Promise<void> {
        await Fetcher.addSubCategory(this.$store.getters.apiUrl, this.inputSubCategory, this.currentCategory.id, this.inputCode, true, true)
        await this.getCategoriesBySystem(this.currentSystem.id);
        await this.getSubCategoriesByCategory(this.currentCategory.id);
        this.inputSubCategory = "";
    }

    async updateSubCategory(index: number): Promise<void> {
        if (confirm("Are your sure you want to update " + this.subCategoriesResponse.body[index].name + "?")) {
            await Fetcher.updateSubCategory(this.$store.getters.apiUrl, this.subCategoriesResponse.body[index].id, this.subCategoriesResponse.body[index].name, this.subCategoriesResponse.body[index].description, this.inputCode, true, true)
            await this.getSubCategoriesByCategory(this.currentCategory.id);
            this.inputSubCategory = "";
        }
    }

    async deleteSubCategory(index: number): Promise<void> {
        if (confirm("Are your sure you want to delete " + this.subCategoriesResponse.body[index].name + "?\nPlease note that you need to delete all coresponding SubCategories first.")) {
            await Fetcher.deleteSubCategory(this.$store.getters.apiUrl, this.subCategoriesResponse.body[index].id, this.subCategoriesResponse.body[index].name, this.inputCode, true, true)
            await this.getSubCategoriesByCategory(this.currentCategory.id);
            this.inputSubCategory = "";
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