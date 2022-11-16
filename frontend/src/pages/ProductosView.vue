<template>
  <q-dialog v-model="dialog" persistent>
    <q-card style="width: 700px; max-width: 80vw">
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
            v-model="data.cod_producto"
            type="text"
            label="Cod producto"
            dense
            class="col-12"
            lazy-rules
            :rules="[(val) => val > 0 || 'Campo requerido']"
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
            v-model="data.precio"
            type="number"
            label="Precio"
            dense
            class="col-12"
            lazy-rules
            :rules="[(val) => val > 0 || 'Campo requerido']"
          />
          <q-input
            v-model="data.descripcion"
            type="textarea"
            label="Descripcion"
            dense
            class="col-12"
          />
          <q-input
            v-model="data.descuento"
            type="number"
            label="Descuento"
            dense
            class="col-12"
            lazy-rules
            :rules="[(val) => val >= 0 || 'Campo requerido']"
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
  <TableView
    title="Lista de clientes"
    @openDialog="openDialog"
    @deleteDialog="onDelete"
    @getList="onGetList"
    :columns="columns"
    :rows="list"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TableView from './TableView.vue';
import dataService from '../services/producto.service';
import ToastNotification from 'src/utils/Toast';
import { genericModel } from 'src/types';

const { getList, saveData, getData, updateData, deleteData } = dataService();

const dialog = ref(false);
const deleteDialog = ref(false);
const selected = ref({} as genericModel);
const confirm = ref(null);
const data = ref({
  id: null,
  cod_producto: null,
  nombre: null,
  descripcion: null,
  precio: null,
  product_img: null,
  descuento: 0,
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
    name: 'precio',
    align: 'center',
    label: 'Precio',
    field: 'precio',
    sortable: true,
  },
  {
    name: 'cod_producto',
    align: 'center',
    label: 'COD producto',
    field: 'cod_producto',
    sortable: true,
  },
  {
    name: 'descripcion',
    align: 'center',
    label: 'Descripcion',
    field: 'descripcion',
    sortable: true,
  },
  {
    name: 'descuento',
    align: 'center',
    label: 'Descuento',
    field: 'descuento',
    sortable: true,
  },
];

onMounted(async () => {
  list.value = await getList('1');
});

const onGetList = async (val: boolean) => {
  console.log(val);
  if (val) {
    list.value = await getList('1');
    return;
  }
  list.value = await getList('0');
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
    id: null,
    cod_producto: null,
    nombre: null,
    descripcion: null,
    precio: null,
    product_img: null,
    descuento: 0,
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
