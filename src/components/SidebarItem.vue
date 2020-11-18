<template>
  <q-item
    class="flex"
    :to="{name: link}"

  >
    <q-item-section
      v-if="icon"
      side
    >
      <q-icon color="primary"  :name="icon" />
    </q-item-section>

    <q-item-section >
      <q-item-label class="text-dark">{{ title }}</q-item-label>
    </q-item-section>
  </q-item >
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },


    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
