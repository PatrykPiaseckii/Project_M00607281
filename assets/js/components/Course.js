Vue.component('Course', {
  props: {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    provider: {
      type: Object,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    review: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Array,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
  },
  computed: {
    timeFormatted() {
      return new Date(this.time).toLocaleString()
    },
    lengthFormatted() {
      return this.length === 60 ? '1hr' : `${this.length}min`
    },
    reviewsCount() {
      return this.reviews.length
    },
    reviewFormatted() {
      return Math.round(this.review * 100) / 100
    },
    reviewLeftByAuthenticatedUser() {
      const review = this.reviews.find(({ user_id }) => user_id === this.$store.state.auth._id)

      return review ? review.review : null
    },
  },
  methods: {
    changed({ target: { value } }) {
      this.$emit('leftReview', Number(value))
    },
    remove() {
      this.$emit('remove', this._id)
    },
    update() {
      this.$router.push({ path: `/courses/${this._id}/update` })
    },
  },
  template: `
    <div class="course">
      {{ _id }}
      | {{ title }}
      | {{ provider.email }}
      | {{ topic }}
      | {{ price }}
      | {{ location }}
      | {{ timeFormatted }}
      | {{ lengthFormatted }}
      | review: {{ reviewFormatted }} ({{ reviewsCount }})

      <div v-if="$store.getters.isAuthenticated && provider.email !== $store.state.auth.email">
        <select :value="reviewLeftByAuthenticatedUser" @input="changed" v-if="!reviewLeftByAuthenticatedUser">
          <option value="">No review</option>
          <option :value="i" v-for="i in 5" :key="i">{{ i }}</option>
        </select>
        <span v-else>your review: {{ reviewLeftByAuthenticatedUser }}</span>
      </div>
      <div v-if="$store.getters.isAuthenticated && provider.email === $store.state.auth.email">
        <button @click="update">🖋</button>
        <button @click="remove">🗑</button>
      </div>
    </div>
  `,
})
