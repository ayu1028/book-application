Vue.component('paginate', VuejsPaginate);
Vue.component('list-item', {
  props: ['items'],
  template: `
  <a v-bind:href="'/impression/' + items.id" class="white-background book-info-box">
                <div class="image-box">
                  <img class="book-image" v-bind:src="items.book.book_path">
                </div>
                <div class="info">
                  <div class="book-name">
                    <p>{{ items.book.book_name }}</p>
                    <p class="user-and-date">著者：{{ items.book.author }}</p>
                  </div>
                  <div class="imp-title">
                    <p>{{ items.title }}</p>
                    <p class="user-and-date">
                      投稿者：{{ items.user.user_name }}
                      　ジャンル：{{ items.genre }}
                      　投稿日：{{ items.createdAt }}
                    </p>
                  </div>
                </div>
              </a>
  `
});

var app = new Vue({
  el:'#app',
  data:{
    impressions: [],
    selected:'すべて',
    parPage: 5,
    currentPage: 1
  },
  mounted: function() {
    this.impressionsAll(this.selected);
  },
  computed: {
    computedImpressions: function() {
      const originalData = this.impressions;
      const current = this.currentPage * this.parPage;
      const start = current - this.parPage;
      const slicedData = originalData.slice(start, current);
      for(let index = 0; index < slicedData.length; index ++) {
        const date = new Date(slicedData[index].updatedAt);
        const str = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
        slicedData[index].createdAt = str;
      }
      return slicedData ;
    },
    getPageCount: function() {
      return Math.ceil(this.impressions.length / this.parPage);
    }
  },
  methods: {
    impressionsAll: async function(genre) {
      const $genre = genre;
      const search = await axios.post('/search', {
        genre: $genre
      });
      this.impressions = search.data;
      this.currentPage = 1;
    },
    clickCallback: function(pageNum) {
      this.currentPage = Number(pageNum);
    }
  }
});


