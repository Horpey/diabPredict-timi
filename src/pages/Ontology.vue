<template>
  <div class="ont-page">
    <div class="container minheight">
      <h1>Ontology</h1>
      <div class="ont-tree">
        <tree
          :data="tree"
          node=""
          node-text="name"
          layoutType="horizontal"
          :zoomable="false"
        >
        </tree>
      </div>
    </div>
  </div>
</template>
<script>
import { tree } from 'vued3tree';
export default {
  name: 'ontology',
  components: { tree },
  data() {
    return {
      tree: {
        name: 'Diabetes',
        children: [
          {
            name: 'Definition',
            children: [
              {
                name:
                  'Diabetes mellitus, commonly known as diabetes, is a metabolic disease that causes high blood sugar.'
              }
            ]
          },
          {
            name: 'Symptoms',
            children: [
              {
                name: 'General Symptoms',
                children: [
                  {
                    name: 'increased hunger'
                  },
                  {
                    name: 'increased thirst'
                  },
                  {
                    name: 'weight loss'
                  },
                  {
                    name: 'frequent urination'
                  },
                  {
                    name: 'frequent urination'
                  },
                  {
                    name: 'frequent urination'
                  },
                  {
                    name: 'blurry vision'
                  },
                  {
                    name: 'extreme fatigue'
                  },
                  {
                    name: 'sores that don’t heal'
                  }
                ]
              },
              {
                name: 'Symptoms in men',
                children: [
                  {
                    name: 'decreased sex drive'
                  },
                  {
                    name: 'erectile dysfunction (ED)'
                  },
                  {
                    name: 'poor muscle strength'
                  }
                ]
              },
              {
                name: 'Symptoms in women',
                children: [
                  {
                    name: 'urinary tract infections'
                  },
                  {
                    name: 'yeast infections'
                  },
                  {
                    name: 'dry itchy skin.'
                  }
                ]
              }
            ]
          },
          {
            name: 'Types',
            children: [
              { name: 'Type 1 diabetes' },
              { name: 'Type 2 diabetes' },
              { name: 'Prediabetes' },
              { name: 'Gestational diabetes' }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    console.log(tree);
  }
};
</script>
<style lang="scss" scoped>
@import '../assets/scss/main.scss';
@import '../assets/scss/landing.scss';
</style>
