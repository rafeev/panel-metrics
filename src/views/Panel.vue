<script setup>
import {ref, onMounted} from 'vue';
import {useAuthStore} from '@/stores/auth.js';
import axios from 'axios';

import Loader from '@/components/Loader.vue';

const authStore = useAuthStore();
const showLoader = ref(false);
let data = null;

const getAllData = async () => {
    showLoader.value = true;
    try {
        const response = await axios.get(`http://51.112.2.76:8081/api/v1/query?query=proxy_worker_difficulty`);
        data = response.data.data.result;
    }
    catch (err)
    {
        console.log(err.response);
    }
    finally
    {
        showLoader.value = false;
    }
}

onMounted(async() => {
    await getAllData();
});

</script>

<template>
    <div>
        <h2>Panel. Login complete.</h2>
        <Loader v-if="showLoader"/>
        <div class="flex flex-column gap-3">
            <div v-for="(item, index) in data" :key="index">
                <p>{{ item }}</p>
            </div>
        </div>
    </div>
</template>