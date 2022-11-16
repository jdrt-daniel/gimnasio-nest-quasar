<template>
  <q-table
    :title="title"
    :rows="rows"
    :columns="columns"
    row-key="name"
    :filter="filter"
    :loading="loading"
    :grid="$q.screen.xs"
    style="height: calc(100vh - 100px)"
  >
    <template v-slot:top>
      <div
        class="row justify-between col-12"
        :class="$q.screen.xs ? 'q-my-md' : ''"
      >
        <q-input
          dense
          color="cyan-8"
          v-model="filter"
          placeholder="Buscar registro"
          class="col-xs-12 col-md-3"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn-group
          spread
          :class="$q.screen.xs ? 'q-mt-md col-12' : 'q-mx-md'"
        >
          <q-btn
            label="activos"
            :color="activos ? 'positive' : undefined"
            @click="listEmit"
          />
          <q-btn
            label="inactivos"
            :color="!activos ? 'negative' : undefined"
            @click="listEmit"
          />
        </q-btn-group>
        <q-space />
        <q-btn
          color="cyan-9"
          icon="add_circle"
          label="Agregar"
          @click="$emit('openDialog')"
          v-if="$q.platform.is.desktop"
        />
        <q-page-sticky position="bottom-right" :offset="[18, 18]" v-else>
          <q-btn
            fab
            icon="add_circle"
            color="cyan-9"
            @click="$emit('openDialog')"
          />
        </q-page-sticky>
      </div>
    </template>
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th v-for="{ name, label } in props.cols" :key="name" :props="props">
          {{ label }}
        </q-th>
        <q-th> Acciones </q-th>
      </q-tr>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td v-for="{ name } in props.cols" :key="name" :props="props">
          {{ props.row[name] }}
        </q-td>
        <q-td class="text-center">
          <q-btn
            color="primary"
            icon="edit"
            dense
            flat
            round
            @click="$emit('openDialog', props.row.id)"
          />
          <q-btn
            color="negative"
            icon="close"
            dense
            flat
            round
            @click="
              $emit('deleteDialog', {
                id: props.row.id,
                estado: props.row.estado,
              })
            "
            v-if="props.row.estado"
          />
          <q-btn
            color="positive"
            icon="refresh"
            dense
            flat
            round
            @click="
              $emit('deleteDialog', {
                id: props.row.id,
                estado: props.row.estado,
              })
            "
            v-else
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
defineComponent({
  name: 'TableView',
});
</script>

<script lang="ts" setup>
defineProps(['rows', 'columns', 'title', 'loading']);
const emit = defineEmits(['getList']);
const activos = ref(true);

const filter = ref('');

const listEmit = () => {
  activos.value = !activos.value;
  emit('getList', activos.value);
};
</script>
