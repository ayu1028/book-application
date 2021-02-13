 Vue.component('list-item', {
  props: ['items'],
  template: `
  <a href="#" class="white-background book-info-box">
              <div class="image-box">
                <img class="book-image" src="https://res.cloudinary.com/dtmue1o4b/image/upload/v1605691025/qkormwwrjv8anyrwzy1b.jpg">
              </div>
              <div class="info">
                <div class="book-name">
                  <p>{{ items.book_name }}</p>
                </div>
                <div class="imp-title">
                  <p>{{ items.title }}</p>
                  <p class="user-and-date">投稿者：Guest　投稿日：2021年2月7日</p>
                </div>
              </div>
            </a>
  `
});
var app = new Vue({
  el:'#app',
  data:{
    impressions: []
  },
  mounted: function() {
    this.impressions = 'ここに検索結果が表示されます'
  },
  methods: {
    async impressionsAll(genre) {
//      const $text = document.getElementById('js-text').value;
      const $genre = document.getElementById('js-genre').value;
      const search = await axios.post('/search', {
        genre: $genre
      });
      this.impressions = search.data;
    }
  }
})