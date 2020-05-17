import Vue from "vue";

Vue.filter("dateFormatToYmd", function(date) {
  return date.replace(/(\d{2})\/(\d{2})\/(\d{2})/, "20$3-$2-$1");
});

Vue.filter("numberWithCommas", function(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});
