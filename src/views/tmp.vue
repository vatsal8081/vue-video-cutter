<template>
  <!-- <div class="row">
    <div class="col-8">
      <h3>Draggable</h3>
      <draggable
        v-model="rows"
        tag="v-layout"
        class="row wrap fill-height align-center sortable-list"
        style="background: grey"
      >
        <v-flex
          v-for="(row, i) in rows"
          :key="i"
          class="sortable"
          xs12
          my-2
          style="background: red"
        >
          <draggable
            :list="row.items"
            tag="v-layout"
            :group="{ name: 'row' }"
            class="row wrap justify-space-around"
          >
            <v-flex
              v-for="(item, index) in row.items"
              :key="index"
              xs4
              pa-3
              class="row-v"
            >
              <v-card style="height: 100px">{{ item.title }}</v-card>
            </v-flex>
          </draggable>
        </v-flex>
      </draggable>
    </div> -->

  <!-- <rawDisplayer class="col-3" :value="rows" title="List" /> -->
  <!-- </div> -->
  <div>
    <draggable
      v-model="rows"
      tag="div"
      class="row wrap fill-height align-center sortable-list"
      style="background: grey"
    >
      <div
        v-for="(data, i) in rows"
        :key="i"
        class="sortable"
        xs12
        my-2
        style="background: red"
      >
        <draggable
          :list="data.items"
          tag="div"
          :group="{ name: 'row' }"
          class="row wrap justify-space-around"
        >
          <div
            v-for="(item, index) in data.items"
            :key="index"
            xs4
            pa-3
            class="row-v"
          >
            <div style="height: 100px">{{ item.title }}</div>
          </div>
        </draggable>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);
export default {
  name: "functional",
  display: "Functional third party",
  order: 17,
  components: {
    draggable,
  },
  data() {
    return {
      enabled: true,
      rows: [
        {
          index: 1,
          items: [
            {
              title: "item 1",
            },
          ],
        },
        {
          index: 2,
          items: [
            {
              title: "item 2",
            },
            {
              title: "item 3",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}
.row-v {
  height: 150px;
  width: 200px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>