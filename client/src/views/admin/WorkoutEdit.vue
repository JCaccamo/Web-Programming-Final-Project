<script setup lang="ts">
    import session, { api, isLoading, setError } from "@/stores/session";
    import { ref, watch } from "vue";
    import { useRoute, useRouter } from "vue-router";

    import { getWorkout, addWorkout, updateWorkout, type Workout } from "@/stores/workouts";
    import { createDescription } from "@/features/gpt/gpt";

    const route = useRoute();
    const router = useRouter();

    const workout = ref({} as Workout);
    const isNew = ref(route.params.id == 'new')

    if(!isNew.value){
        getWorkout(route.params.id as string).then(x => {
            if(x) {
                workout.value = x            
            } else {
                isNew.value = true;
            }
        });       
    }

    const workoutType = ref(['Strength Training', 'Cardio']);
    const cardioType = ref(['Walk', 'Run']);
    api<string[]>('workouts/workoutType').then(x=> workoutType.value = x);
    api<string[]>('workouts/cardioType').then(x=> cardioType.value = x);

    async function getGptDescription() {
        const description = await createDescription(workout.value.workoutName);
        workout.value.description = description;
        return description;
    }

    async function save(){
        try {
            if(isNew.value) {
                const data = await addWorkout(workout.value);
                session.messages.push({ type: "success", text: `Successfully inserted ${data.workoutName}`})
            } else {
                const data = await updateWorkout(workout.value._id, workout.value);
                session.messages.push({ type: "success", text: `Successfully updated ${data.workoutName}`})
            }
            await router.push({ name: 'admin_workouts' });
        } catch (error) {
            //setError(error as string); being set in the api function
        }
    }

    async function cancel() {
        await router.push({ name: 'admin_workouts' });    
    }

    const isTenorSearchOpen = ref(false);
    const tenorSearch = ref('');
    const tenorResults = ref([] as any[]);

    watch(tenorSearch, async () => {
        if(tenorSearch.value.length > 2){
        const data = await
            fetch(`https://tenor.googleapis.com/v2/search?q=${tenorSearch.value}&key=${import.meta.env.VITE_TENOR_API_KEY}&limit=8`)
            .then(x=> x.json())
        console.log({ data });
        tenorResults.value = data.results;
        }
    });

</script>

<template>
    <div class="section">
        <div class="columns">
            <div class="column is-three-quarters">
                <form class="modal-card" @submit.prevent="save">
                    <header class="modal-card-head">
                        <p class="modal-card-title">
                            {{ isNew ? 'New' : 'Edit' }} Workout
                        </p>
                    </header>
                    <section class="modal-card-body">
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">Workout Name</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <p class="control is-expanded has-icons-left">
                                        <input class="input" type="text" placeholder="Name" v-model="workout.workoutName">
                                        <span class="icon is-small is-left">
                                            <i class="fas fa-user"></i>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">Workout Type</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <div class="select is-fullwidth">
                                            <select  v-model="workout.workoutType">
                                                <option :value="undefined">-- Please Select a Workout Type --</option>
                                                <option v-for="w in workoutType" :key="w">{{w}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">Cardio Type</label>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <div class="select is-fullwidth">
                                            <select  v-model="workout.type">
                                                <option :value="undefined">-- Please Select a Cardio Type --</option>
                                                <option v-for="w in cardioType" :key="w">{{w}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">Thumbnail</label>
                            </div>
                            <div class="field-body">
                                <div class="field  has-addons">
                                    <div class="control is-expanded">
                                        <input class="input" type="text" placeholder="Complete URL" v-model="workout.thumbnail">
                                    </div>
                                    <p class="control">
                                        <a class="button is-info" @click.prevent="(isTenorSearchOpen = !isTenorSearchOpen)">
                                            Find a Gif
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="box" v-show="isTenorSearchOpen">
                            <h3>Tenor Search</h3>
                            <input class="input" type="text" placeholder="Complete URL" v-model="tenorSearch" />
                            <div class="tenor-results">
                                <div    class="image tenor-gif" v-for="tenorGif in tenorResults" :key="tenorGif.id" 
                                        @click.prevent="workout.thumbnail = tenorGif.media_formats.mediumgif.url; isTenorSearchOpen = false" >
                                    <img :src="tenorGif.media_formats.tinygif.url" />
                                </div>                            
                            </div>
                        </div>
                        
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">Description</label>
                                <button class="button is-info is-small" @click.prevent="getGptDescription">Generate</button>
                            </div>
                            <div class="field-body">
                                <div class="field">
                                    <div class="control">
                                        <textarea class="textarea" placeholder="Full description of workout" v-model="workout.description"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </section>
                        <footer class="modal-card-foot">
                            <button class="button is-info">Save changes</button>
                            <button class="button" @click.prevent="cancel">Cancel</button>
                        </footer>
                    </form>
                </div>
            <div class="column card">
                <div class="card-content">
                    <h3 class="title">{{ workout.workoutName }}</h3>
                    <div class="workout-image">
                        <img :src="workout.thumbnail" :alt="workout.workoutName" />
                    </div>
                    <div class="workout-info">
                        <p>{{ workout.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .modal-card {
        width: 100%;
    }
    
    .tenor-results {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .tenor-gif {
        display: flex;
        align-items: center;
        border: 1px solid blueviolet;
        margin: 10px;
        padding: 5px;
        border-radius: 10px;
        max-width: 220px;
        cursor: pointer;
    }
    .tenor-gif:hover {
        border: 3px solid green;
    }
</style>
