<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-card-actions>
        <v-col class="text-right">
          <v-btn color="primary text-right" dark v-bind="attrs" v-on="on">
            Nueva publicacion <v-icon dark right> mdi-plus </v-icon>
          </v-btn>
        </v-col>
      </v-card-actions>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Crear Nuevo</span>
      </v-card-title>
      <ValidationObserver
        ref="form"
        v-slot="{ invalid, validated, handleSubmit }"
      >
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
                    label="Nombre*"
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
                    label="Descripcion*"
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
          <v-btn
            color="primary"
            @click="handleSubmit(submit)"
            :disabled="invalid || !validated"
          >
            Crear
          </v-btn>
        </v-card-actions>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
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
  methods: {
    async submit() {
      try {
        let res = await axios.post("/api/posts", this.form);
        this.$emit("onCreate", res.data.data);
        this.dialog = false;
        this.form = {};
        requestAnimationFrame(() => {
          this.$refs.form.reset();
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>