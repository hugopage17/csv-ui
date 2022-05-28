<script setup lang="ts">
</script>


<template>
    <q-layout>
        <q-header elevated class="text-white bg-dark" id="navbar">
            <q-toolbar>
                <q-toolbar-title>
                    
                </q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-drawer
            show-if-above
            :mini="true"
            :width="200"
            :breakpoint="500"
            bordered
            class="bg-dark"
        >
            <slot name="listIcons">
                
            </slot >
            <q-separator />
            <q-item clickable v-ripple class="fixed-bottom">
                <q-item-section avatar>
                    <q-icon name="settings" color="grey" size="sm"/>
                </q-item-section>
            </q-item>
        </q-drawer>
        <q-page-container>
            <slot></slot>
        </q-page-container>
    </q-layout>
</template>

<style lang="scss">
    #navbar{
        border-bottom: 1px solid $primary;
    }
</style>