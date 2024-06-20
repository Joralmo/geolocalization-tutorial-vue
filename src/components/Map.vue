<template>
  <div>
    <l-map ref="map" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" />
      <l-marker :lat-lng="center"></l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue3-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "MapComponent",
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  props: {
    center: {
      type: Array,
      required: true
    },
    zoom: {
      type: Number
    },
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    };
  },
  methods: {
    recenterMap() {
      setTimeout(() => {
        this.$refs.map.setZoom(this.zoom);
        this.$refs.map.setView(this.center);
      }, 100);
    }
  }
};
</script>

<style>
  div[center] {
    height: 80vh;
  }
  div#map {
    height: 80vh !important;
  }
</style>
