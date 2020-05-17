<template>
  <div id="sidebar">
    <b-sidebar id="filterable-sidebar" title="Filter" :visible="true" no-header>
      <div class="px-3 py-2">
        <b-form @submit.prevent="onSubmit">
          <b-form-group>
            <b-button type="submit" variant="primary">Search</b-button>
          </b-form-group>

          <b-form-group id="input-group-project-id" label="Project ID:" label-for="project-id">
            <b-form-input id="project-id" v-model="form.project_id"></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-address" label="Address:" label-for="address">
            <b-form-input id="address" v-model="form.address"></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-suburb" label="Suburb:" label-for="suburb">
            <b-form-input id="suburb" v-model="form.suburb"></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-state" label="State:" label-for="input-state">
            <b-form-select id="input-state" v-model="form.state" :options="states"></b-form-select>
          </b-form-group>

          <b-form-group label="Stage (Any):">
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="form.stage"
              :options="stages"
              name="flavour-1"
            ></b-form-checkbox-group>
          </b-form-group>

          <b-form-group id="input-group-completion-date" label-for="input-completion-date">
            <label for="completion-from">Completion Date From:</label>
            <b-form-datepicker
              id="completion-from"
              v-model="form.completion_date_from"
              class="mb-2"
              reset-button
              :max="form.completion_date_to"
            ></b-form-datepicker>

            <label for="completion-to">Completion Date To:</label>
            <b-form-datepicker
              id="completion-to"
              v-model="form.completion_date_to"
              class="mb-2"
              reset-button
              :min="form.completion_date_from"
            ></b-form-datepicker>
          </b-form-group>

          <label
            for="range-floor-area"
          >Floor Area : {{ form.floor_range[0] | numberWithCommas }} - {{ form.floor_range[1] | numberWithCommas }}</label>
          <a-slider
            range
            v-model="form.floor_range"
            :min="0"
            :max="999999"
            :tip-formatter="this.$options.filters.numberWithCommas"
          />

          <b-form-group>
            <b-button type="submit" variant="primary">Search</b-button>
          </b-form-group>
        </b-form>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import "./sidebar.css";
import { property } from "../../config";

export default {
  name: "sidebar",
  props: { geoJson: Object },

  data() {
    return {
      form: {
        project_id: "",
        address: "",
        suburb: "",
        state: "",
        stage: [],
        completion_date_from: "",
        completion_date_to: "",
        floor_range: [0, 999999]
      },

      // predefined lists but can come from an API backend
      states: property.states,
      stages: property.stages
    };
  },

  methods: {
    onSubmit() {
      this.filterData(this.form);
    },

    filterData(formData) {
      const filteredGeoJson = { ...this.geoJson };

      const filteredData = filteredGeoJson.features.filter(feature => {
        const project = feature.properties.project;

        const projectId = project["Project ID"].toLowerCase();
        const address = project["Address"].toLowerCase();
        const suburb = project["Suburb"].toLowerCase();
        const state = project["State"].toLowerCase();
        const stage = project["Stage"].toLowerCase();
        const floorArea = parseFloat(project["Floor Area"]);
        let completionDate = this.$options.filters.dateFormatToYmd(
          project["Completion Date"]
        );

        if (
          projectId.includes(formData.project_id.toLowerCase()) &&
          address.includes(formData.address.toLowerCase()) &&
          suburb.includes(formData.suburb.toLowerCase()) &&
          state.includes(formData.state.toLowerCase()) &&
          (formData.stage.length === 0 ||
            formData.stage.includes(stage.toLowerCase())) &&
          (!formData.completion_date_from ||
            completionDate >= formData.completion_date_from) &&
          (!formData.completion_date_to ||
            completionDate <= formData.completion_date_to) &&
          floorArea >= formData.floor_range[0] &&
          floorArea <= formData.floor_range[1]
        ) {
          return true;
        }

        return false;
      });

      filteredGeoJson.features = filteredData;

      // Send data to parent
      this.$emit("setGeoJsonData", filteredGeoJson);
    }
  }
};
</script>