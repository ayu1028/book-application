Vue.component('book-item', {
  props: ['items'],
  template: `
  <a v-bind:href="'/update/' + items.id" class="image-box-large white-background">
  <p>{{ items.book.book_name }}</p>
  <img class="book-image-large" v-bind:src="items.book.book_path">
</a>
  `
})

var app = new Vue({
  el:'#bookshelf',
  data:{
    impressions: [],
    selected:'すべて'
  },
  mounted: function() {
    this.impressionsAll(this.selected);
  },
  methods: {
    impressionsAll: async function(genre) {
      const $genre = genre;
      const search = await axios.post('/users/search', {
        genre: $genre
      });
      this.impressions = search.data;
      this.selected = $genre;
    }
  }
});
