<template>
    <div class="container">
        <template>
            <input
                v-model="options.search"
                type="text"
                id="search"
                placeholder="Search for..."
                class="limit-40 next-post"
                @keypress="handle"
            />
            <!-- <div
                v-if="Object.keys(imageData).length === 0"
                class="limit-40 next-post point mar-top-20"
            >
                <label for="checkbox">Allow nsfw</label>
                <input
                    class="check"
                    type="checkbox"
                    id="checkbox"
                    v-model="options.extra.nsfw"
                />
            </div> -->
            <div
                v-if="Object.keys(imageData).length === 0"
                class="limit-40 next-post point mar-top-20"
                @click="getRandomMeme"
            >
                <p>Get a meme!</p>
            </div>
            <div class="card" v-if="Object.keys(imageData).length !== 0">
                <a :href="imageData.link" target="_BLANK">
                    <img
                        v-if="
                            imageData.link.endsWith('jpg') ||
                                imageData.link.endsWith('jpeg') ||
                                imageData.link.endsWith('png') ||
                                imageData.link.endsWith('gif')
                        "
                        :src="imageData.link"
                        alt=""
                        class="image"
                    />
                    <video
                        v-else-if="imageData.link.endsWith('mp4')"
                        class="image"
                        controls
                        autoplay
                        loop
                    >
                        <source :src="imageData.link" :type="imageData.type" />
                    </video>
                </a>
                <div class="right-card">
                    <div class="card-info">
                        <p>From /r/{{ imageData.section }}</p>
                        <p v-if="imageData.title !== null">
                            {{ imageData.title }}
                        </p>
                        <p v-if="imageData.datetime !== null">
                            {{ timestamp(imageData.datetime) }}
                        </p>
                        <p v-if="imageData.description !== null">
                            {{ imageData.description }}
                        </p>
                    </div>
                    <div class="next-post point" @click="getRandomMeme">
                        <p>Next meme</p>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'Random',
    data() {
        return {
            options: {
                search: undefined,
                extra: {
                    nsfw: false,
                    date: {
                        after: undefined,
                        before: undefined,
                    },
                },
            },
            imageData: {},
        };
    },
    methods: {
        timestamp: function(date) {
            return moment(date * 1000).format('dddd, MMMM Do YYYY, h:mm:ss a');
        },
        handle: function(e) {
            if (
                e.charCode === 13 &&
                e.code === 'Enter' &&
                e.isTrusted === true
            ) {
                this.getRandomMeme();
            }
        },
        onLoad: function() {
            console.log(
                '%cVUE IS AWESOME 💖⚡',
                'background-color: #34495E; color: #41B883; font-weight: bold;'
            );
            console.log(
                '%c¯\\_(ツ)_/¯',
                'background-color: #34495E; color: #41B883; font-weight: bold;'
            );
        },
        getRandomMeme: function() {
            const searchFor = this.options.search;

            if (searchFor === undefined) {
                return console.log('Please provide a subreddit');
            }

            const myHeaders = new Headers();
            myHeaders.append(
                'Authorization',
                `Client-ID ${process.env.VUE_APP_CLIENT_ID}`
            );

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
            };

            fetch(
                `https://api.imgur.com/3/gallery/r/${searchFor}/top`,
                requestOptions
            )
                .then(response => response.json())
                .then(res => {
                    console.log(res);
                    const randomPost = Math.floor(
                        Math.random() * res.data.length
                    );

                    if (res.data.length === 0) {
                        return console.log('Invalid subreddit');
                    }

                    if (
                        res.data[randomPost] === undefined ||
                        res.data[randomPost].nsfw === true ||
                        res.data[randomPost].width < 50 ||
                        res.data[randomPost].height < 50 ||
                        res.data[randomPost].score < 20
                    ) {
                        return this.getRandomMeme();
                    }

                    if (this.options) {
                        this.imageData = res.data[randomPost];
                    }
                })
                .catch(error => console.log('error', error));
        },
    },
    mounted() {
        this.onLoad();
    },
};
</script>

<style scoped>
.container {
    width: 80%;
    margin: 0 10%;
}
.card {
    width: 80%;
    margin: 20px 10% 0 10%;
    background-color: rgb(26, 71, 64);
    border: none;
    border-radius: 30px;
    box-shadow: 6px 6px rgb(22, 54, 49);
    display: flex;
    align-items: flex-start;
}

.card img,
video {
    padding: 10px;
    background-color: rgb(26, 54, 71);
    border: none;
    border-radius: 30px;
    box-shadow: 6px 6px rgb(22, 36, 54);
    margin: 30px 10px 30px 30px;
    flex: 1;
    min-width: 300px;
    max-width: 600px;
    min-height: 300px;
    max-height: 600px !important;
}

.right-card {
    flex: 1;
}

.card-info {
    padding: 10px 30px;
    background-color: rgb(26, 54, 71);
    border: none;
    border-radius: 30px;
    box-shadow: 6px 6px rgb(22, 36, 54);
    margin: 30px 30px 20px 10px;
}

.next-post {
    padding: 10px;
    background-color: rgb(26, 54, 71);
    border: none;
    color: white;
    border-radius: 30px;
    box-shadow: 6px 6px rgb(22, 36, 54);
    margin: 15px 30px 30px 10px;
}

.next-post p {
    margin: 0;
    padding: 0;
    color: white;
}

.point {
    cursor: pointer !important;
}

.limit-40 {
    min-width: 40%;
    max-width: 40%;
    width: 40% !important;
    margin: 0 30% !important;
}

.mar-top-20 {
    margin-top: 20px !important;
}

.link {
    color: #42b983;
    text-decoration: none;
}

input {
    padding: 0 20px;
}

input::placeholder {
    color: white;
}
</style>
