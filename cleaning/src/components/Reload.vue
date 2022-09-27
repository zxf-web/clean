<template>
    <div></div>
</template>
<script>
    export default {
        name:'reloadPage',
        mounted(){
            this.$router.go(-1);
        }
    }
</script>
<style></style>