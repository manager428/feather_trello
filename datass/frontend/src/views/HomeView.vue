<template>
    <div class="home">
        <b-container class="py-5">
            <b-img src="https://trelloclone.bewave.io/img/blue-labs-plain.9892403f.svg" class="my-3 w-100 "
                alt="Responsive image" style="height: 200px;"></b-img>
            <h1 class="text-center font-weight-bold">
                <br />
                Vous présente un prototype de "Real Time Application" avec WebSockets
                <br />
                <br />
                <br />
            </h1>
            <div class="d-flex justify-content-between justify-sm-center flex-sm-row flex-column">
                <div class="d-flex justify-content-center align-items-center flex-column m-auto" style="width: 200px;">
                    <b-img src="https://trelloclone.bewave.io/img/logo.63a7d78d.svg" class="w-100"></b-img>
                    <h1>Vuetify</h1>
                </div>
                <h1 class="d-flex justify-content-center align-items-center">+</h1>
                <div class="d-flex justify-content-center align-items-center flex-column m-auto" style="width: 200px;">
                    <b-img src="https://trelloclone.bewave.io/img/feathersjs.2fc1b2de.svg" class="w-100"></b-img>
                    <h1>FeathersJS</h1>
                </div>
                <h1 class="d-flex justify-content-center align-items-center">+</h1>
                <div class="d-flex justify-content-center align-items-center m-auto" style="width: 200px;">
                    <b-img src="https://trelloclone.bewave.io/img/mongodb.2985235d.svg" class="w-100"></b-img>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>

export default {
  name: 'HomeView',
};
</script>

<style scoped>
h1 {
    font-size: 2rem;
}
</style>
