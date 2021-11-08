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
                <select class="form-control w-" id="select-system" v-on:change="changeSelectedSystem($event)">
                    <option v-for="(system, index) in systemsResponse.body" :key="system" :value="index" :selected="index === 0">{{ system.name }}</option>
                </select>
            </div>

            <p class="description" v-if="currentSystem != null">
                {{ currentSystem.description }}
            </p>
            
        </div>
    </div>

    <div class="row mt-20 mb-5 justify-content-center">
        <div class="col-11 col-lg-8">
            <div class="form-inline-md mt-20">   
                <label for="select-category">Category:</label>
                <select class="form-control" id="select-category" v-on:change="changeSelectedCategory($event)">
                    <option v-for="(category, index) in categoriesResponse.body" :key="category" :value="index" :selected="index === 0">{{ category.name }}</option>
                </select>
            
                <label for="select-subcategory">SubCategory:</label>
                <select class="form-control" id="select-subcategory" v-on:change="changeSelectedSubCategory($event)">
                    <option v-for="(subcategory, index) in subCategoriesResponse.body" :key="subcategory" :value="index" :selected="index === 0">{{ subcategory.name }}</option>
                </select>
            </div>
            <div class="form-inline-md mt-20">   
                <label for="select-rarityMin">Minimum Rarity:</label>
                <select class="form-control" id="select-rarityMin" v-on:change="changeSelectedRarityMin($event)">
                    <option v-for="(rarity, index) in raritiesResponse.body" :key="rarity" :value="index" :selected="index === 0">{{ rarity.name }}</option>
                </select>
                <label for="select-rarityMax">Maximum Rarity:</label>
                <select class="form-control" id="select-rarityMax" v-on:change="changeSelectedRarityMax($event)">
                    <option v-for="(rarity, index) in raritiesResponse.body" :key="rarity" :value="index" :selected="index === 0">{{ rarity.name }}</option>
                </select>
            </div>
        </div>
    </div>

    <div class="row mt-20 mb-20 justify-content-center">
        <div v-if="lootResponse == null || lootResponse.body == null || lootResponse.body.length == 0" class="col-11 col-lg-8">
            <p class="text-center font-size-18">
                 There is no Loot in the Database that matches your categories and rarity.
                The Item Database is filled by users like you. You can submit your own item <router-link to="/trpg/addloot" class="">here.</router-link></p>
        </div>
        <div v-if="lootResponse != null && lootResponse.body != null && lootResponse.body.length != 0" class="col-8">
            <h4>Loot:</h4>

            <div v-for="(loot, index) in lootResponse.body" :key="loot">

                <span class=font-weight-bold>Name: </span> {{ lootResponse.body[index].name }} <br><br>
                <span class=font-weight-bold>Description: </span> <br> <span style="white-space: pre-line;">{{ lootResponse.body[index].description }}</span>
                <hr style="height: 2px">
                
            </div>
        </div>
    </div>

    </div>
  

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Fetcher, FetchResponse } from '../../types/fetching'

export default class LootGenerator extends Vue {

    dataReady: boolean = false;
    serverError: boolean = false;

    lootResponse: FetchResponse = new FetchResponse(false);
    randomNumber = 0;

    systemsResponse: FetchResponse = new FetchResponse(false);
    currentSystem: any = false;

    categoriesResponse: FetchResponse = new FetchResponse(false);
    currentCategory: any = false;

    subCategoriesResponse: FetchResponse = new FetchResponse(false);
    currentSubCategory: any = false;

    raritiesResponse: FetchResponse = new FetchResponse(false);
    currentRarityMin: any = false;
    currentRarityMax: any = false;

    async mounted() {
        var res = await Fetcher.getServerStatus(this.$store.getters.apiUrl, true);
        if (res.ok) {
            await this.getSystems();
            await this.getCategoriesBySystem(this.currentSystem.id);
            await this.getSubCategoriesByCategory(this.currentCategory.id);
            await this.getRarities();
            this.currentRarityMin = this.raritiesResponse.body[0];
            this.currentRarityMax = this.raritiesResponse.body[0];
            await this.getLoot(this.currentSubCategory.id, this.currentCategory.id, this.currentRarityMin.id, this.currentRarityMax.id);
            this.dataReady = true;
        } else {
            this.serverError = true;
        }
    }

    async getSystems(): Promise<void> {
        this.systemsResponse = await Fetcher.getSystems(this.$store.getters.apiUrl, true);
        this.currentSystem = this.systemsResponse.body[0];
    }

    async changeSelectedSystem(event: any): Promise<void>  {
        this.currentSystem = this.systemsResponse.body[event.target.value];
        await this.getCategoriesBySystem(this.currentSystem.id);
        await this.getSubCategoriesByCategory(this.currentCategory.id);
        await this.getLoot(this.currentSubCategory.id, this.currentCategory.id, this.currentRarityMin.id, this.currentRarityMax.id);
    }

    async getCategoriesBySystem(systemId: number): Promise<void> {
        this.categoriesResponse = await Fetcher.getCategories(this.$store.getters.apiUrl, systemId, true);
        this.currentCategory = this.categoriesResponse.body[0];
    }

    async changeSelectedCategory(event: any): Promise<void> {
        this.currentCategory = this.categoriesResponse.body[event.target.value];
        await this.getSubCategoriesByCategory(this.currentCategory.id);
        await this.getLoot(this.currentSubCategory.id, this.currentCategory.id, this.currentRarityMin.id, this.currentRarityMax.id);
    }

    async getSubCategoriesByCategory(categoryId: number): Promise<void> {
        this.subCategoriesResponse = await Fetcher.getSubcategories(this.$store.getters.apiUrl, categoryId, true, true)
        this.currentSubCategory = this.subCategoriesResponse.body[0];
    }

    async changeSelectedSubCategory(event: any): Promise<void> {
        this.currentSubCategory = this.subCategoriesResponse.body[event.target.value];
        await this.getLoot(this.currentSubCategory.id, this.currentCategory.id, this.currentRarityMin.id, this.currentRarityMax.id);
    }

    async getLoot(subcategorId: number, categoryId: number, rarityIdMin: number, rarityIdMax: number): Promise<void> {
        this.lootResponse = await Fetcher.getLoot(this.$store.getters.apiUrl, subcategorId, categoryId, rarityIdMin, rarityIdMax, true);
    }

    async getRarities(): Promise<void> {
        this.raritiesResponse = await Fetcher.getRarities(this.$store.getters.apiUrl, true);
        this.currentRarityMin = this.raritiesResponse.body[0];
        this.currentRarityMax = this.raritiesResponse.body[0];
    }

    async changeSelectedRarityMin(event: any): Promise<void> {
        this.currentRarityMin = this.raritiesResponse.body[event.target.value];
        await this.getLoot(this.currentSubCategory.id, this.currentCategory.id, this.currentRarityMin.id, this.currentRarityMax.id);
    }
    async changeSelectedRarityMax(event: any): Promise<void> {
        this.currentRarityMax = this.raritiesResponse.body[event.target.value];
        await this.getLoot(this.currentSubCategory.id, this.currentCategory.id, this.currentRarityMin.id, this.currentRarityMax.id);
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