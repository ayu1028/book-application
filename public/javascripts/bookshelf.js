Vue.component('paginate', VuejsPaginate);
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
    selected:'すべて',
    parPage: 9,
    currentPage: 1
  },
  mounted: function() {
    this.impressionsAll(this.selected);
  },
  computed: {
    slicedImpressions: function() {
      const originalData = this.impressions;
      const current = this.currentPage * this.parPage;
      const start = current - this.parPage;
      const slicedData = originalData.slice(start, current);
      return slicedData;
    },
    getPageCount: function() {
      return Math.ceil(this.impressions.length / this.parPage);
    }
  },
  methods: {
    impressionsAll: async function(genre) {
      const $genre = genre;
      const search = await axios.post('/users/search', {
        genre: $genre
      });
      this.impressions = search.data;
      this.selected = $genre;
      this.currentPage = 1;
    },
    clickCallback: function(pageNum) {
      this.currentPage = Number(pageNum);
    }
  }
});
