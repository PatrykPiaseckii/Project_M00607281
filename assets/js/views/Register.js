const Register = Vue.component('Register', {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: [],
    }
  },
  methods: {
    async submit() {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.form),
      })

      if (response.status !== 201) {
        const { errors } = await response.json()

        this.errors = errors

        return
      }

      this.$store.commit('message', 'You have been registred successfully!')
      this.$router.push({ path: '/' })
    },
  },
  template: `
    <div>
      <h1>
        Register
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
          <label for="email">
            E-Mail
            <input type="email" placeholder="john@example.com" v-model="form.email" required />
          </label>
        </div>

        <div>
          <label for="password">
            Password
            <input type="password" placeholder="ilovecats" v-model="form.password" required />
          </label>
        </div>

        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  `,
})

window.app.views.Register = Register
