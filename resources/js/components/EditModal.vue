<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mr-1" color="primary" dark v-bind="attrs" v-on="on">
          Editar <v-icon dark right> mdi-pencil </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar</span>
        </v-card-title>
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <ValidationProvider
                    name="Name"
                    rules="required"
                    v-slot="{ errors, valid }"
                  >
                    <v-text-field
                      v-model="form.name"
                      :error-messages="errors"
                      :success="valid"
                      label="Nombre *"
                      outlined
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider
                    name="Description"
                    rules="required"
                    v-slot="{ errors, valid }"
                  >
                    <v-textarea
                      v-model="form.description"
                      :error-messages="errors"
                      :success="valid"
                      label="Descripcion *"
                      outlined
                      required
                    ></v-textarea>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
            <small>* Campos requeridos</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Cancelar
            </v-btn>
            <v-btn color="primary" @click="handleSubmit(submit)">
              Editar
            </v-btn>
          </v-card-actions>
        </ValidationObserver>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  props: {
    post: {
      require: true,
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    dialog: false,
    form: {
      name: "",
      description: "",
    },
  }),
  mounted() {
    this.form.name = this.$props.post.name;
    this.form.description = this.$props.post.description;
  },
  methods: {
    async submit() {
      try {
        let res = await axios.put(
          "/api/posts/" + this.$props.post.id,
          this.form
        );
        this.$emit("onEdit");
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>