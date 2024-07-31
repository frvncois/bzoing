<template>
    <div class="container is-contact">
        <button class="is-close" @click="$emit('close')">X</button>
        <div class="row">
            <div class="col is-12">
                <h1>4641 Av. Papineau<br>Montréal, QC H2H 1V4</h1>
            </div>
            <div class="col is-6 inline">
                <h1>info@bzoing.ca</h1>
                <h1>514 830-7833</h1>
            </div>
            <div class="col is-6 inline align-right">
                <h1>Instagram</h1>
                <h1>Behance</h1>
            </div>
        </div>
    </div>
</template>

<script setup>
    defineProps(['']);
    defineEmits(['close']);
</script>