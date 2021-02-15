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
                      　投稿日：{{ items.updatedAt }}
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
    selected:'すべて'
  },
  mounted: function() {
    this.impressionsAll(this.selected);
  },
  computed: {
    computedImpressions: function() {
      const originalData = this.impressions;
      for(let index = 0; index < originalData.length; index ++) {
        const date = new Date(originalData[index].updatedAt);
        const str = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
        originalData[index].updatedAt = str;
      }
      return originalData;
    }
  },
  methods: {
    impressionsAll: async function(genre) {
      const $genre = genre;
      const search = await axios.post('/search', {
        genre: $genre
      });
      this.impressions = search.data;
    }
  }
});

