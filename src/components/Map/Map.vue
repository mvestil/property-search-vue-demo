<template>
  <div id="map">
    <MglMap
      :minZoom="1"
      :zoom="15"
      :accessToken="accessToken"
      :mapStyle="mapStyle"
      :center="coordinates"
      @load="onMapLoaded"
    >
      <MglMarker
        :key="index"
        :coordinates="feature.geometry.coordinates"
        v-for="(feature, index) in geoJson.features"
      >
        <MglPopup>
          <div>
            <div>
              Project ID:
              <b>{{feature.properties.project['Project ID']}}</b>
            </div>
            <div>
              Address:
              <b>{{feature.properties.project['Address']}}</b>
            </div>
            <div>
              Suburb:
              <b>{{feature.properties.project['Suburb']}}</b>
            </div>
            <div>
              State:
              <b>{{feature.properties.project['State']}}</b>
            </div>
            <div>
              Stage:
              <b>{{feature.properties.project['Stage']}}</b>
            </div>
            <div>
              Completion Date:
              <b>{{feature.properties.project['Completion Date'] | dateFormatToYmd}}</b>
            </div>
            <div>
              Floor Area:
              <b>{{feature.properties.project['Floor Area']}}</b>
            </div>
          </div>
        </MglPopup>
      </MglMarker>
    </MglMap>
  </div>
</template>

<script>
//import Mapbox from "mapbox-gl";
import { MglMap, MglPopup, MglMarker } from "vue-mapbox";
import { mapConfig } from "./map-config";
import "./map.css";

export default {
  components: { MglMap, MglPopup, MglMarker },
  props: { geoJson: Object },
  data() {
    return {
      accessToken: mapConfig.accessToken,
      mapStyle: mapConfig.mapStyle,
      coordinates: mapConfig.coordinates
    };
  },

  methods: {
    onMapLoaded(event) {
      this.map = event.map;
    }
  },

  updated() {
    const filteredGeoJson = { ...this.geoJson };

    if (!filteredGeoJson.features.length) {
      alert("No result found " + filteredGeoJson.features.length);

      return;
    }

    const coordinates = filteredGeoJson.features.map(feature => {
      return feature.geometry.coordinates;
    });

    // if only 1 coordinate found, add the default coordinates to fit mao to a bounding box
    if (coordinates.length === 1) {
      coordinates.unshift(this.coordinates);
    }

    this.map.fitBounds(coordinates, {
      padding: { top: 100, bottom: 250, left: 15, right: 5 }
    });
  }
};
</script>