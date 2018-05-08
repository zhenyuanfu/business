<template>
<div class="container">
  <h2>{{title}}</h2>
</div>
</template>
<script>
export default {
  data() {
    return {
      title: "Vue page322hahq"
    };
  },
  created() {
    document.title = "Futbol Süper Ligi";
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  h2 {
    font-size: 24px;
    color: red;
  }
}
</style>


