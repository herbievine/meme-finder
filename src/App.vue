<template>
    <div id="app">
        <template v-if="this.width < 1300">
            <div id="overlay">
                <div id="overlay-box">
                    <p>
                        This website was not designed to be on phones/tablets.
                        You may experience bugs between 1300px and 1600px.
                        Minimum width required: 1300px
                    </p>
                </div>
            </div>
        </template>

        <div id="nav">
            <router-link to="/search">Search</router-link>
            <router-link to="/random">Random</router-link>
            <a
                target="_BLANK"
                href="https://www.github.com/herbievine/meme-finder"
            >
                GitHub
            </a>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            width: undefined,
        };
    },
    methods: {
        checkWidth() {
            this.width = window.innerWidth;
            setTimeout(this.checkWidth, 1000);
        },
    },
    created() {
        this.checkWidth();
    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');

* {
    box-sizing: border-box;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
}

body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    background-color: #101010;
}

input {
    padding: 0 20px;
}

input:focus,
button:focus,
textarea:focus {
    outline-width: 0;
}

button {
    cursor: pointer;
    border: none;
}

:root {
    --vue-vlue: #2c3e50;
    --vue-green: #42b983;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: #101010;
    color: white;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: white;
    margin: 0 20px;
    text-decoration: none;
}

#nav a.router-link-exact-active {
    margin: 0 12.5px;
    padding: 5px;
    color: #101010;
    border: 1px solid white;
    border-radius: 5px;
    background-color: white;
}

#overlay {
    position: fixed;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 2;
}
#overlay-box {
    position: fixed;
    display: block;
    width: 70%;
    height: 80%;
    margin: 10% 15%;
    align-items: center;
    background-color: #ffffff;
    z-index: 4;
}
#overlay-box p {
    padding: 30px 40px;
    color: #333;
    text-align: justify;
    font-size: 20px;
    font-family: 'Open Sans', sans-serif;
}
</style>
