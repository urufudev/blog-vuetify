<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red" dark v-bind="attrs" v-on="on">
          ELiminar <v-icon dark right> mdi-minus-circle </v-icon></v-btn
        >
      </template>
      <v-card>
        <v-sheet
          class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
          color="blue-grey darken-3"
          dark
        >
          <div class="grey--text text--lighten-2 text-body-2 mb-4">
            <h4>Estas seguro de eliminar la publicación?</h4>
          </div>

          <v-btn @click="dialog = false" class="ma-1" color="grey" plain>
            Cancelar
          </v-btn>

          <v-btn outlined class="ma-1" color="error" @click="onDelete">
            Si, Eliminar
          </v-btn>
        </v-sheet>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
export default {
  props: {
    id: {
      require: true,
    },
  },

  data: () => ({
    dialog: false,
  }),

  methods: {
    async onDelete() {
      try {
        await axios.delete("/api/posts/" + this.$props.id);
        this.$emit("onDelete");
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>