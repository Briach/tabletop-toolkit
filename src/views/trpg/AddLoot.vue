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

    <div class="row mt-20 mb-5 justify-content-center">
        <div class="col-11 col-md-10 col-lg-8 col-lg-6 text-center">
            <div class="form-inline-sm" style="font-size: 2rem;">
                <label for="select-system">Select a System:</label>
                <select class="form-control" id="select-system" v-on:change="changeSelectedSystem($event)">
                    <option v-for="(system, index) in systemsResponse.body" :key="system" :value="index" :selected="index === 0">{{ system.name }}</option>
                </select>
                <button v-on:click="changeCurrentSystem()" class="btn btn-primary" role="button">Select</button>
            </div>

            <p class="description" v-if="currentSystem != null">
                {{ currentSystem.description }}
            </p>
        </div>
    </div>

    <div class="row mt-20 mb-5 justify-content-center">
        <div class="col-11 col-md-8">
            <h4>Add Loot:</h4>
            <div class="form-inline-md mt-20">
                <label for="select-category">Category:</label>
                <select class="form-control" id="select-category" v-on:change="changeSelectedCategory($event)">
                    <option v-for="(category, index) in categoriesResponse.body" :key="category" :value="index" :selected="index === 0">{{ category.name }}</option>
                </select>
                <label for="select-subcategory">SubCategory:</label>
                <select class="form-control" id="select-subcategory" v-on:change="changeSelectedSubCategory($event)">
                    <option v-for="(subcategory, index) in subCategoriesResponse.body" :key="subcategory" :value="index" :selected="index === 0">{{ subcategory.name }}</option>
                </select>
                <label for="select-rarity">Rarity:</label>
                <select class="form-control" id="select-rarity" v-on:change="changeSelectedRarity($event)">
                    <option v-for="(rarity, index) in raritiesResponse.body" :key="rarity" :value="index" :selected="index === 0">{{ rarity.name }}</option>
                </select>
            </div>
            <div class="form-inline-md mt-20">
                <label class="required" for="input-loot">Loot:</label>
                <input v-model="inputLoot" type="text" class="form-control" placeholder="Loot name" id="input-loot" required="required">
        
                <label class="required" for="input-tags">Tags:</label>
                <input v-model="inputTags" type="text" class="form-control" placeholder="Input Tags" id="input-tags" required="required">
            </div>
            <div class="col-lg-12 mt-20">
                <div class="text-muted font-size-12">
                    Tags are keywoards to make it easier to search this. Tags should not contain backsspaces, please use - instead. They should be divided by Commas, e.g. 'deadly-poison, deadly, alchemistic'.
                </div>
            </div>
            <div class="form-inline-md mt-20">
                <textarea v-model="inputDescription" class="form-control" placeholder="Write Description about the Loot, including Optics, Stats, Weight and Value" id="textarea-description"></textarea>
            </div>
            <div class="form-inline-md mt-20">
                <button v-on:click="addLoot()" class="btn btn-primary ml-auto" role="button">Add</button>
            </div>
        </div>
    </div>

    </div>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Fetcher, FetchResponse } from './../../types/fetching'
import * as halfmoon from 'halfmoon';

export default class AddLoot extends Vue {

    dataReady: boolean = false;
    serverError: boolean = false;

    lootRespone: FetchResponse = new FetchResponse(false);
    randomNumber: number = 0;

    systemsResponse: FetchResponse = new FetchResponse(false);
    currentSystem: any;

    categoriesResponse: FetchResponse = new FetchResponse(false);
    currentCategory: any;

    subCategoriesResponse: FetchResponse = new FetchResponse(false);
    currentSubCategory: any;

    raritiesResponse: FetchResponse = new FetchResponse(false);
    currentRarity: any;

    inputLoot: string = "";
    inputDescription: string = "";
    inputTags: string = "";
    
    async mounted() {
        var res = await Fetcher.getServerStatus(this.$store.getters.apiUrl, true);
        if (res.ok) {
            await this.getSystems();
            await this.getCategoriesBySystem(this.currentSystem.id);
            await this.getSubCategoriesByCategory(this.currentCategory.id);
            await this.getRarities();
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

    changeSelectedSubCategory(event: any): void {
        this.currentSubCategory = this.subCategoriesResponse.body[event.target.value];
    }
    
    async getRarities(): Promise<void> {
        this.raritiesResponse = await Fetcher.getRarities(this.$store.getters.apiUrl, true);
        this.currentRarity = this.raritiesResponse.body[0];
    }

    changeSelectedRarity(event: any): void {
        this.currentRarity = this.raritiesResponse.body[event.target.value];
    }

    async addLoot(): Promise<void> {
        var response = await Fetcher.addLoot(this.$store.getters.apiUrl, this.inputLoot, this.inputDescription, this.inputTags, this.currentSubCategory.id, this.currentRarity.id, true, true);
        
        if (response.ok) {
            this.inputLoot = "";
            this.inputDescription = "";
            this.inputTags = "";
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