<template>
  <q-dialog v-model="dialog" persistent>
    <q-card :style="!$q.screen.xs ? 'width: 700px; max-width: 80vw' : ''">
      <q-form @submit="onSubmit" @reset="onReset">
        <q-toolbar class="bg-grey-3">
          <q-toolbar-title>
            <q-icon :name="data.id ? 'edit' : 'person_add'" />
            {{ data.id ? 'Modificar cliente' : 'Agregar cliente' }}
          </q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section class="row q-col-gutter-sm">
          <q-input
            v-model="data.ci"
            type="text"
            label="CI"
            dense
            class="col-12"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
          />
          <q-input
            v-model="data.nombre"
            type="text"
            label="Nombre completo"
            dense
            class="col-12"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
          />
          <q-input
            v-model="data.ap"
            type="text"
            label="Ap Paterno"
            dense
            class="col-12"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
          />
          <q-input
            v-model="data.am"
            type="text"
            label="Ap Materno"
            dense
            class="col-12"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
          />
        </q-card-section>
        <q-card-section class="bg-grey-3 text-center">
          <q-btn
            color="primary"
            type="submit"
            icon="save"
            label="Guardar"
            class="q-mr-sm"
          />
          <q-btn color="negative" type="reset" label="cancelar" v-close-popup />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
  <q-dialog persistent v-model="deleteDialog">
    <q-card style="width: 400px">
      <q-card-section class="bg-grey-3">
        {{
          selected.estado ? '¿Habilitar registro?' : '¿Inhabilitar registro?'
        }}
      </q-card-section>
      <q-card-section class="items-center text-center">
        <q-icon
          :name="selected.estado ? 'cancel' : 'check'"
          size="80px"
          :color="selected.estado ? 'red-5' : 'positive'"
        />
        <div class="q-ml-sm q-py-sm">
          {{
            selected.estado
              ? 'Este registro pasará a la lista de inhabilitados.'
              : 'Este registro pasará a la lista de habilitados.'
          }}
        </div>
      </q-card-section>
      <q-card-actions align="center" class="bg-grey-3">
        <q-btn
          :label="selected.estado ? 'Si, Eliminar' : 'Si, Habilitar'"
          :color="selected.estado ? 'negative' : 'positive'"
          @click="handleDelete"
        />
        <q-btn label="cancelar" class="text-dark" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <TableComponent
    title="Lista de clientes"
    @openDialog="openDialog"
    @deleteDialog="onDelete"
    @getList="onGetList"
    with-actions
    :default-rows="false"
    :columns="columns"
    :rows="list"
    :loading="loading"
  >
    <template #rows="{ propsTable }">
      <td class="text-primary text-h6 text-uppercase">
        {{ propsTable.row.nombre }}
        {{ propsTable.row.ap }} {{ propsTable.row.am }}
      </td>
      <td class="text-center">
        {{ propsTable.row.ci }}
      </td>
    </template>
  </TableComponent>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import userSerive from '../services/cliente.service';
import ToastNotification from 'src/utils/Toast';
import { genericModel } from 'src/types';
import TableComponent from 'src/components/TableComponent.vue';

const { getList, saveData, getData, updateData, deleteData } = userSerive();

const dialog = ref(false);
const deleteDialog = ref(false);
const selected = ref({} as genericModel);
const confirm = ref(null);
const loading = ref(false);
const data = ref({
  id: null,
  ci: null,
  nombre: null,
  ap: null,
  am: null,
});
const list = ref([]);

const columns = [
  {
    name: 'nombre',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row: genericModel) => row.nombre,
    format: (val: genericModel) => `${val}`,
    sortable: true,
  },
  {
    name: 'ci',
    align: 'center',
    label: 'Cedula',
    field: 'ci',
    sortable: true,
  },
];

onMounted(async () => {
  loading.value = true;
  list.value = await getList('1');
  loading.value = false;
});

const onGetList = async (val: boolean) => {
  loading.value = true;
  if (val) {
    list.value = await getList('1');
    loading.value = false;
    return;
  }
  list.value = await getList('0');
  loading.value = false;
};

const openDialog = async (id: string) => {
  if (id) {
    data.value = await getData(id);
  }
  dialog.value = !dialog.value;
};

const onSubmit = async () => {
  try {
    if (data.value.id) {
      await updateData(data.value.id, data.value);
      ToastNotification(
        'info',
        'edit',
        'Se modificó el registro correctamente'
      );
      return;
    }
    await saveData(data.value);

    ToastNotification(
      'positive',
      'check',
      'Se guardó el registro correctamente'
    );
  } catch (error) {
    ToastNotification('negative', 'warning', 'Ocurrio un error en la petición');
  } finally {
    onGetList(true);
    onReset();
  }
};

const onReset = () => {
  dialog.value = false;
  data.value = {
    ci: null,
    id: null,
    nombre: null,
    ap: null,
    am: null,
  };
  confirm.value = null;
};

const handleDelete = async () => {
  try {
    await deleteData(selected.value.id);
    onGetList(true);
    ToastNotification(
      'positive',
      'check',
      'Se realizo la accion correctamente'
    );
  } catch (error) {
    ToastNotification('negative', 'warning', 'Ocurrio un error en la petición');
  } finally {
    selected.value = {};
    deleteDialog.value = false;
  }
};

const onDelete = (id: genericModel) => {
  selected.value = id;
  deleteDialog.value = !deleteDialog.value;
};
</script>

<style scoped></style>
