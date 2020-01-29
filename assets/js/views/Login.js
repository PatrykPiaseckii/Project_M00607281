const Login = Vue.component('Login', {
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
      const response = await fetch(`${window.app.api.url}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.form),
      })

      if (response.status !== 200) {
        const { errors } = await response.json()

        this.errors = errors

        return
      }

      const { _id, token, email, type } = await response.json()

      this.$store.dispatch('auth', {
        _id,
        token,
        email,
        type,
      })
      this.$store.commit('message', 'Welcome back!')
      this.$router.push({ path: '/' })
    },
  },
  template: `
    <div>
      <h1>
        Login
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  `,
})

window.app.views.Login = Login
