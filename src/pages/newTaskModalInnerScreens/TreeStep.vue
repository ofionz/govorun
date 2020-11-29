<template>
  <div class="q-gutter-sm">
    <q-btn-toggle
      v-model="model"
      push
      glossy
      @input="resetTree"
      class="toggles"
      toggle-color="primary"
      :options="[
        { label: 'Без распознавания', value: 'info' },
        { label: 'Распознавание речи', value: 'words' },
        { label: 'Распознование нажатий', value: 'number' }
      ]"
    />
    <q-tree
      class="q-mt-lg"
      :nodes="nodes"
      node-key="id"
      default-expand-all
      ref="tree"
      selected=""
    >
      <template v-slot:default-header="prop">
        <div class="row items-center">
          <div class="text-weight-bold text-primary">{{ prop.node.label }}</div>
          <q-icon
            @click="createNode(prop.node)"
            v-if="model !== 'info'"
            name="add_circle_outlined"
            color="secondary"
            size="24px"
            class="q-ml-lg"
          />

          <q-icon
            v-if="prop.node.id !== '0'"
            @click="deleteNode(prop.node)"
            name="delete"
            color="primary"
            size="22px"
          />
        </div>
      </template>

      <template v-slot:default-body="prop">
        <div>
          <span v-for="(story, index) in prop.node.story" :key="index">
            {{ story }} <br
          /></span>

          <span
            v-if="prop.node.story.length"
            @click="
              () => {
                selectedNode = prop.node;
                newEventModel = true;
              }
            "
            class="text-primary cursor-pointer"
          >
            редактировать событие<q-icon
              name="create"
              class="q-ml-xs"
              color="primary"
              size="18px"
          /></span>
          <span
            v-else
            @click="
              () => {
                selectedNode = prop.node;
                newEventModel = true;
              }
            "
            class="text-primary cursor-pointer"
          >
            добавить событие<q-icon
              name="add"
              class="q-ml-xs"
              color="primary"
              size="18px"
          /></span>
        </div>
      </template>
    </q-tree>

    <q-dialog v-model="newEventModel">
      <new-event
        :mode="model"
        :node="selectedNode"
        @saved="addToNode"
      ></new-event>
    </q-dialog>
  </div>
</template>

<script>
import newEvent from "./newEvent";
export default {
  name: "TreeStep",
  components: {
    newEvent
  },
  props: {
    tree: {
      type: Array,
      default: () => {return [
        {
          label: "Звонок начат",
          id: "0",
          story: [],
          children: []
        }
      ]}
    }
  },

  data() {
    return {
      model: "info",
      previousModel: 'info',
      newEventModel: false,
      selectedNode: undefined,
      nodes: undefined
    };
  },
  created() {
    this.nodes = this.tree;
  },
  methods: {
    resetTree() {
      if (this.nodes[0].children.length)
        this.$q
          .dialog({
            message: "Введенные события будут потеряны!",
            ok: { label: "Ок" },
            cancel: { label: "Отмена" }
          })
          .onOk(() => {
            this.nodes[0].children = [];
            this.previousModel = this.model;
          })
          .onCancel(() => {
            this.model = this.previousModel;
            this.previousModel =  this.model;
          });
      else  this.previousModel =  this.model;
    },
    addToNode({ events, words, selectedNum }) {
      this.selectedNode.events = {};
      this.selectedNode.story = [];
      for (const event in events) {
        this.selectedNode.events[event] = events[event].state;
        if (events[event].state)
          this.selectedNode.story.push(
            `${events[event].label} ${events[event].state} `
          );
      }
      if (words) {
        this.selectedNode.label = "Сказаны слова: " + words;
        this.selectedNode.words = words;
      } else if (selectedNum) {
        this.selectedNode.label = `Нажата цифра ${selectedNum}`;
        this.selectedNode.selectedNum = selectedNum;
      }

      this.deleteNode(this.selectedNode);
      this.selectedNode.parent?.children.push(this.selectedNode);

      this.$refs.tree.setExpanded(
        this.selectedNode.parent?.id ? this.selectedNode.parent.id : "0",
        true
      );

      this.newEventModel = false;
      this.selectedNode = undefined;
      this.$emit("setTree", this.nodes);
    },

    createNode(node) {
      const newNode = {
        parent: node,
        id: Date.now(),
        label: ``,
        children: [],
        story: []
      };
      this.selectedNode = newNode;
      this.newEventModel = true;
    },

    deleteNode(node) {
      this.removeFromTree(this.nodes[0].children, node);
      this.$emit("setTree", this.nodes);
    },

    removeFromTree(steps, removeItem) {
      steps.forEach((step, i) => {
        if (step.id === removeItem.id) {
          // steps.splice(i,1,...step.children);
          steps.splice(i, 1);
        } else {
          this.removeFromTree(step.children, removeItem);
        }
      });

      return steps;
    }
  }
};
</script>

<style scoped></style>
