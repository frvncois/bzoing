<template>
    <div class="container">
        <div class="row">
            <div class="col is-1">
                <h2>À Propos</h2>
            </div>
            <div class="col is-3">
                <p>Nous sommes un studio de création graphique montréalais, qui conçoit des projets passionnés de toutes tailles dans une approche globale avec un fort intérêt pour le développement de marque. Nous favorisons les relations d’affaires humaines et responsables qui durent dans le temps.  Ainsi, nous avons développé des liens de confiance forts avec des clients, qui se sont établis sur plusieurs années en les accompagnant dans leurs projets ambitieux et leurs folies. </p>
            </div>
            <div class="col is-2"></div>
            <div class="col is-3 space-between">
                <span>© 2024</span>
                <span>4641 av.Papineau<br>Montréal, QC H2H 1V4</span>
                <div>
                    <div class="space-between"><span>info</span><span>@</span><span>bzoing.ca</span></div>
                    <div class="space-between"><span>514</span><span>830-7833</span></div>
                </div>
            </div>
            <div class="col is-3 align-right space-between">
                <a class="nav is-contact" @click.prevent="showContact">Get in touch</a>
                <div>
                    <p>Instagram</p>
                    <p>Behance</p>
                </div>
            </div>
        </div>
    </div>
    <MainContact v-if="isContactVisible" @close="hideContact" />
</template>


<script setup>
import { ref } from 'vue';
import MainContact from '@/components/MainContact.vue';

const isContactVisible = ref(false);

const showContact = () => {
isContactVisible.value = true;
};

const hideContact = () => {
isContactVisible.value = false;
};
</script>
