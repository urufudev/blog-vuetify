<template>
  <div>
    <v-card-title class="text-h5 mb-1">Lista de Publicaciones</v-card-title>
    <CreateModal @onCreate="onCreate" />
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nombre</th>
            <th class="text-left">Descripción</th>
            <th class="text-center">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in posts" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>
              <div class="text-center">
                <v-row>
                  <EditModal :post="item" @onEdit="onEdit" />
                  <DeleteModal :id="item.id" @onDelete="onDelete" />
                </v-row>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>


<script>
import CreateModal from "../components/CreateModal";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
export default {
  components: {
    CreateModal,
    EditModal,
    DeleteModal,
  },
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    async getAll() {
      try {
        let res = await axios.get("/api/posts");
        this.posts = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    onCreate(post) {
      this.posts.unshift(post);
    },
    onEdit() {
      this.getAll();
    },
    onDelete() {
      this.getAll();
    },
  },
};
</script>