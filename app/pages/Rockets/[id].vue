<template>
 
<div
  class="page-header position-relative"
  :style="{
    backgroundImage: `url('https://res.cloudinary.com/diljhwf3a/image/upload/v1755065785/heic0604a_sfmtyb.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '75vh'
  }"
>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-lg-7 text-center text-white">
       <h1 class="mb-3" style="display: inline-block;
       font-weight: 1000;  
    margin-top: 200px; 
    -webkit-text-stroke: 1px black; 
    color: white; 
    ">
    {{ singleRocket.name }}
</h1>

<p class="lead px-5" style="font-weight: 800;   -webkit-text-stroke: 0.8px black; 
    color: white; ">
    Company: {{ singleRocket.company }}
</p>

<p class="lead px-5" style="font-weight: 800;   -webkit-text-stroke: 0.8px black; 
    color: white; ">
    Country: {{ singleRocket.country }}
</p>
      </div>
    </div>
  </div>

  <v-card
  class="position-absolute start-50 translate-middle-x pa-10 w-75 "
  style="
    bottom: -300px;
    left: 13%;
    background-color: rgba(255,255,255,0.95);
    height: auto;
  "
>
  <v-text
    style="text-align: center; display: block; max-width: 600px; margin: 0 auto;"
  >
    {{ singleRocket.description }}
  </v-text>

   <v-text
   class="mt-5 text-start"
    style="text-align: center; display: block; max-width: 600px; margin: 0 auto;"
  >
    First Flight: {{  dateConvert(singleRocket.first_flight) }}
  </v-text>

  <v-text
   class="mt-2 text-start"
    style="text-align: center; display: block; max-width: 600px; margin: 0 auto;"
  >
    Height : {{ singleRocket.height.feet }} ft | {{ singleRocket.height.meters }} m
  </v-text>
  <v-text
   class="mt-2 text-start"
    style="text-align: center; display: block; max-width: 600px; margin: 0 auto;"
  >
    Diameter : {{ singleRocket.diameter.feet }} ft | {{ singleRocket.diameter.meters }} m
  </v-text>

   <v-text
   class="mt-2 text-start"
    style="text-align: center; display: block; max-width: 600px; margin: 0 auto;"
  >
    Mass : {{ singleRocket.mass.kg }} kg | {{ singleRocket.mass.lb }} lb
  </v-text>

   <v-text
   class="mt-2 text-start"
    style="text-align: center; display: block; max-width: 600px; margin: 0 auto;"
  >
    Number of stages : {{ singleRocket.stages }} 
  </v-text>
</v-card>
</div>

</template>

<script lang="ts" setup>
import {useSingleRockets} from '~/api/rockets'
import { dateConvert } from '~/shared/Date'

const route = useRoute()
const id = route.params.id as string
const singleRocket = useSingleRockets(id)
</script>
