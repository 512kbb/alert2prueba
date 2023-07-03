const baseUrl = 'https://devtest.a2g.io/api/Auth'

const login = async ({ email, password }) => {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: `{"email":"${email}","password":"${password}"}`
        })
        .then(response => {
            if (response.status === 200) {
                return response.json()
            }
            else {
                throw new Error('Error en la petición')
            }
        })
        return response
}

export default { login }