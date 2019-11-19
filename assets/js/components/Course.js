Vue.component('Course', {
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    email: {
      type: String,
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
    reviewsCount: {
      type: Number,
      required: true,
    },
    reviewLeftByAuthenticatedUser: {
      type: Number,
      required: false,
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
  },
  methods: {
    changed({ target: { value } }) {
      this.$emit('leftReview', Number(value))
    },
    remove() {
      this.$emit('remove', this.id)
    },
    update() {
      this.$router.push({ path: `/courses/${this.id}/update` })
    },
  },
  template: `
    <div>
      {{ this.id }}
      | {{ this.title }}
      | {{ this.author }}
      | {{ this.topic }}
      | {{ this.price }}
      | {{ this.location }}
      | {{ this.timeFormatted }}
      | {{ this.lengthFormatted }}
      | review: {{ this.review }} ({{ this.reviewsCount }})

      <div v-if="$store.getters.isAuthenticated && email !== $store.state.auth.email">
        <select :value="reviewLeftByAuthenticatedUser" @input="changed" v-if="!reviewLeftByAuthenticatedUser">
          <option value="">No review</option>
          <option :value="i" v-for="i in 5" :key="i">{{ i }}</option>
        </select>
        <span v-else>your review: {{ reviewLeftByAuthenticatedUser }}</span>
      </div>
      <div v-if="$store.getters.isAuthenticated && email === $store.state.auth.email">
        <button @click="update">🖋</button>
        <button @click="remove">🗑</button>
      </div>
    </div>
  `,
})
