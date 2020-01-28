const Home = Vue.component('Home', {
  data() {
    return {
      courses: [],
      searchTerm: '',
      filters: {
        topic: '',
        priceGreaterThan: '',
        priceLessThan: '',
        reviewGreaterThan: '',
        reviewLessThan: '',
      },
      sort: {
        by: '', // topic, price, review
        isDescending: true,
      },
    }
  },
  computed: {
    coursesFiltered() {
      return [...this.courses]
        .filter(({ title }) => (this.searchTerm ? title.toLowerCase().includes(this.searchTerm.toLowerCase()) : true))
        .filter(({ topic }) => (this.filters.topic ? topic === this.filters.topic : true))
        .filter(({ price }) => (this.filters.priceGreaterThan ? price > this.filters.priceGreaterThan : true))
        .filter(({ price }) => (this.filters.priceLessThan ? price < this.filters.priceLessThan : true))
        .filter(({ review }) => (this.filters.reviewGreaterThan ? review >= this.filters.reviewGreaterThan : true))
        .filter(({ review }) => (this.filters.reviewLessThan ? review <= this.filters.reviewLessThan : true))
        .sort((a, b) =>
          this.sort.by
            ? this.sort.isDescending
              ? a[this.sort.by] < b[this.sort.by]
              : a[this.sort.by] > b[this.sort.by]
            : 0
        )
    },
    availableTopics() {
      return this.courses
        .map(({ topic }) => topic)
        .reduce((arr, topic) => (!arr.includes(topic) ? [...arr, topic] : arr), [])
    },
    ownCourses() {
      return this.$store.getters.isProvider
        ? this.coursesFiltered.filter(({ email }) => this.$store.state.auth.email === email)
        : []
    },
  },
  methods: {
    async fetchCourses() {
      const response = await fetch('/api/courses')
      const data = await response.json()

      this.courses = data
    },
    setSort(by) {
      this.sort.by = by

      this.sort.isDescending = !this.sort.isDescending
    },
    async leftReview(courseId, review) {
      const response = await fetch(`/api/courses/${courseId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({ review }),
      })

      if (response.status !== 201) {
        this.$store.commit('message', 'There was an error when adding a review')
      } else {
        this.$store.commit('message', 'Review added successfully!')

        const course = this.courses.find(({ id }) => id === courseId)
        course.reviewLeftByAuthenticatedUser = review
        course.reviewsCount += 1
      }
    },
    async removeCourse(courseId) {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
      })

      if (response.status !== 200) {
        this.$store.commit('message', 'There was an error when removing a course')
      } else {
        this.$store.commit('message', 'Course removed successfully!')

        this.courses = this.courses.filter(({ id }) => id !== courseId)
      }
    },
  },
  created() {
    this.fetchCourses()
  },
  template: `
    <div>
      <div class="filters">
        <input type="text" v-model="searchTerm" placeholder="Search..." />
        <select v-model="filters.topic">
          <option value="" selected>No filter</option>
          <option v-for="topic in availableTopics" :key="topic" :value="topic">{{ topic }}</option>
        </select>

        price:
        <input type="text" placeholder="Price greater than" v-model="filters.priceGreaterThan" />
        <input type="text" placeholder="Price less than" v-model="filters.priceLessThan" />

        review:
        <input type="text" placeholder="Review greater than" v-model="filters.reviewGreaterThan" />
        <input type="text" placeholder="Review less than" v-model="filters.reviewLessThan" />

        sort by:
        <button @click="setSort('topic')">
          Topic
          {{ sort.by == 'topic' ? (sort.isDescending ? '↓' : '↑') : '' }}
        </button>
        <button @click="setSort('price')">
          Price
          {{ sort.by == 'price' ? (sort.isDescending ? '↓' : '↑') : '' }}
        </button>
        <button @click="setSort('review')">
          Review
          {{ sort.by == 'review' ? (sort.isDescending ? '↓' : '↑') : '' }}
        </button>
      </div>

      <div class="courses">
        <div v-if="$store.getters.isProvider">
          <h1>Your courses</h1>
          <Course
            v-for="course in ownCourses"
            :key="course.id"
            v-bind="course"
            @leftReview="review => leftReview(course.id, review)"
            @remove="removeCourse"
          />
        </div>
        <div>
          <h1>All courses</h1>
          <Course
            v-for="course in coursesFiltered"
            :key="course.id"
            v-bind="course"
            @leftReview="review => leftReview(course.id, review)"
          />
        </div>
      </div>
    </div>
  `,
})

window.app.views.Home = Home
