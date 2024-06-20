<template>
  <div id="app">
    <div class="input-container">
      <input v-model="address" placeholder="Enter an address" />
      <button @click="getCoordinates">Get Coordinates</button>
    </div>
    <div class="info">
      <p>Latitud: {{ coordinates.lat }}</p>
      <p>Longitud: {{ coordinates.lon }}</p>
      <p>
        Nombre de la dirección:
        {{ reverseResponse.display_name || "Busca una dirección" }}
      </p>
    </div>
    <MapComponent
      ref="mapComponent"
      :center="[coordinates.lat, coordinates.lon]"
      :zoom="zoom"
    />
  </div>
</template>

<script>
import { geocode, reverseGeocode } from "./services/geolocation";
import MapComponent from "./components/Map.vue";

export default {
  name: "App",
  components: {
    MapComponent,
  },
  data() {
    return {
      address: "",
      coordinates: {
        lat: 4.570868,
        lon: -74.297333,
      },
      zoom: 15,
      reverseResponse: {},
    };
  },
  methods: {
    async getCoordinates() {
      try {
        const response = await geocode(this.address);
        if (response.data && response.data.length > 0) {
          this.coordinates = {
            lat: parseFloat(response.data[0].lat),
            lon: parseFloat(response.data[0].lon),
          };
          this.$refs.mapComponent.recenterMap();
          const reverseResponse = await reverseGeocode(
            this.coordinates.lat,
            this.coordinates.lon
          );
          this.reverseResponse = reverseResponse.data;
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  margin: 0 auto;
  padding: 20px;
}

.input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #8501B0;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #8501B0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #6a0186;
}

.info {
  margin-bottom: 20px;
}

.info p {
  margin: 5px 0;
  font-size: 16px;
}

l-map {
  border: 1px solid #8501B0;
  border-radius: 4px;
}
</style>
