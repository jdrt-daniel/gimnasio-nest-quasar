<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-cyan-8">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> {{ route.meta.title }} </q-toolbar-title>

        <q-space></q-space>
        <q-btn flat round dense icon="search" class="q-mr-xs" />
        <q-btn icon="person" round flat>
          <q-menu>
            <div class="row q-pa-md" style="width: 250px">
              <!-- <div class="column">
                <div class="text-h7 q-mb-xs q-pl-md">Configuraciones</div>
                <q-separator />
                <q-list style="min-width: 100px">
                  <q-item clickable>
                    <q-item-section>New tab</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>New incognito tab</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Recent tabs</q-item-section>
                  </q-item>
                </q-list>
              </div>

              <q-separator vertical class="q-ml-none q-mr-md" /> -->

              <div class="items-center text-center col-12">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ user.user.nombre }} {{ user.user.ap }}
                </div>

                <q-btn
                  color="primary"
                  label="Logout"
                  size="sm"
                  v-close-popup
                  @click="logOut"
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :breakpoint="400"
      class="shadow-1"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list>
          <q-expansion-item icon="perm_identity" label="Usuarios">
            <q-separator />
            <q-item
              to="/users"
              exact
              class="q-pl-lg bg-grey-2"
              active-class="bg-cyan-3 text-cyan-8 "
            >
              <q-item-section avatar>
                <q-icon name="donut_large" />
              </q-item-section>

              <q-item-section> Gestion usuarios </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-separator />
          <q-expansion-item icon="groups" label="Instructores">
            <q-separator />
            <q-item
              to="/instructor"
              exact
              class="q-pl-lg bg-grey-2"
              active-class="bg-cyan-3 text-cyan-8 "
            >
              <q-item-section avatar>
                <q-icon name="donut_large" />
              </q-item-section>

              <q-item-section> Gestion instructores </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-separator />
          <q-expansion-item icon="supervisor_account" label="Clientes">
            <q-separator />
            <q-item
              to="/cliente"
              exact
              class="q-pl-lg bg-grey-2"
              active-class="bg-cyan-3 text-cyan-8 "
            >
              <q-item-section avatar>
                <q-icon name="donut_large" />
              </q-item-section>

              <q-item-section> Gestion clientes </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-expansion-item icon="pedal_bike" label="Disciplinas">
            <q-separator />
            <q-item
              to="/disciplina"
              exact
              class="q-pl-lg bg-grey-2"
              active-class="bg-cyan-3 text-cyan-8 "
            >
              <q-item-section avatar>
                <q-icon name="donut_large" />
              </q-item-section>

              <q-item-section> Gestion disciplinas </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-expansion-item icon="local_grocery_store" label="Productos">
            <q-separator />
            <q-item
              to="/producto"
              exact
              class="q-pl-lg bg-grey-2"
              active-class="bg-cyan-3 text-cyan-8 "
            >
              <q-item-section avatar>
                <q-icon name="donut_large" />
              </q-item-section>

              <q-item-section> Gestion productos</q-item-section>
            </q-item>
          </q-expansion-item>

          <q-separator />
        </q-list>
      </q-scroll-area>
      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent row q-gutter-sm">
          <q-avatar
            size="60px"
            class="q-mb-sm column shadow-2"
            text-color="white"
            color="cyan-8"
            icon="person"
          >
            <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png" /> -->
          </q-avatar>
          <div class="column">
            <span class="q-mt-sm">
              {{ user.user.nombre }} {{ user.user.ap }}
            </span>
            <span class="text-blue-10">Administrador</span>
          </div>
        </div>
      </q-img>
    </q-drawer>
    <q-scroll-area style="height: 100vh">
      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
    </q-scroll-area>
  </q-layout>
</template>

<script setup lang="ts">
import userStore from 'src/stores/userStore';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const leftDrawerOpen = ref(false);
const user = userStore();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

onBeforeMount(() => {
  user.verifyUser();
});

const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  user.user = {};
  user.token = '';
  router.push('/login');
};
</script>
