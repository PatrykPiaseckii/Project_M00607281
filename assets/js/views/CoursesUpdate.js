const CoursesUpdate = Vue.component('CoursesUpdate', {
  data() {
    return {
      form: {
        title: '',
        topic: '',
        price: '',
        location: '',
        date: '',
        time: '',
        length: '',
      },
      errors: [],
    }
  },
  methods: {
    async submit() {
      const { id } = this.$route.params

      const response = await fetch(`${window.app.api.url}/api/courses/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.$store.state.auth.token}`,
        },
        body: JSON.stringify({
          title: this.form.title,
          topic: this.form.topic,
          price: parseFloat(this.form.price),
          location: this.form.location,
          time: `${this.form.date}T${this.form.time}`,
          length: this.form.length,
        }),
      })

      if (response.status !== 200) {
        const { errors } = await response.json()

        this.errors = errors

        return
      }

      this.$store.commit('message', 'Course updated successfully!')
      this.$router.push({ path: '/' })
    },
    async fetchCourse() {
      const { id } = this.$route.params

      const response = await fetch(`${window.app.api.url}/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.auth.token}`,
        },
      })
      const { title, topic, price, location, time, length } = await response.json()

      this.form = {
        title,
        topic,
        location,
        length,
        price: price.toFixed(2),
        date: time.split('T')[0],
        time: time.split('T')[1],
      }
    },
  },
  created() {
    if (!this.$store.getters.isProvider) {
      this.$router.push({ path: '/' })
      return
    }

    this.fetchCourse()
  },
  template: `
    <div>
      <h1>
        Update your course
      </h1>

      <div v-if="errors">
        <ul>
          <li v-for="error in errors" :key="error">
            {{ error }}
          </li>
        </ul>
      </div>

      <form @submit.prevent="submit">
        <div>
          <label for="title">
            Title
            <input type="text" placeholder="Awesome math course!" v-model="form.title" required />
          </label>
        </div>

        <div>
          <label for="topic">
            Topic
            <input type="text" placeholder="e.g. math, physics, computer science..." v-model="form.topic" required />
          </label>
        </div>

        <div>
          <label for="price">
            Price
            <input type="text" placeholder="e.g. 10.00" v-model="form.price" required pattern="\\d+\\.\\d\\d" />
          </label>
        </div>

        <div>
          <label for="location">
            Location
            <input type="text" placeholder="e.g. Manchester, UK" v-model="form.location" required />
          </label>
        </div>

        <div>
          <label for="time">
            Time
            <input type="date" v-model="form.date" required />
            <input type="time" v-model="form.time" required />
          </label>
        </div>

        <div>
          <label for="length">
            Length
            <input type="text" placeholder="Time in minutes (e.g. 60, 90)" v-model="form.length" required pattern="\\d+" />
          </label>
        </div>

        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  `,
})

window.app.views.CoursesUpdate = CoursesUpdate
