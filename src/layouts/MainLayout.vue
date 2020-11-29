<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="z-index: 3001" >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          :icon="leftDrawerOpen?'close':'menu'"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"

        />

        <q-toolbar-title>
          Govorun App
          <q-icon
            style="top: -1px"
            size="sm"
            name="perm_phone_msg"
          />
        </q-toolbar-title>

        <div>Govorun v- 0.3</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="200"
      elevated
      overlay
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="q-mt-lg"> </q-item-label>
        <SidebarItem
          v-for="link in sidebarItems"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import SidebarItem from "components/SidebarItem.vue";

const linksData = [
  {
    title: "Профиль",
    icon: "account_circle",
    link: "profile"
  },
  {
    title: "Аудиозаписи",
    icon: "audiotrack",
    link: "audios"
  },

  {
    title: "Рассылки",
    icon: "add_task",
    link: "tasks"
  }
  ,

  {
    title: "Звонки",
    icon: "phone_in_talk",
    link: "calls"
  }
];

export default {
  name: "MainLayout",
  components: { SidebarItem },
  data() {
    return {
      leftDrawerOpen: false,
      sidebarItems: linksData
    };
  }
};
</script>
