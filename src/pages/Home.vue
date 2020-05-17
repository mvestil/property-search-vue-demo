<template>
  <div>
    <Sidebar @setGeoJsonData="setGeoJsonData" :geoJson="geoJson" />
    <Map :geoJson="filteredGeoJson" />
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Map from "../components/Map/Map.vue";
import geoJsonData from "../assets/data.json";

export default {
  name: "home",
  components: { Sidebar, Map },
  data() {
    return {
      geoJson: {},
      filteredGeoJson: {}
    };
  },
  mounted() {
    this.geoJson = geoJsonData;
  },
  methods: {
    setGeoJsonData(filteredGeoJson) {
      this.filteredGeoJson = filteredGeoJson;
    }
  }
};
</script>