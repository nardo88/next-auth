import {useState} from 'react'

export default function Login() {
    const [email, setEmail] = useState('Max3')
    const [pass, setPass] = useState('200320013')
    const [res, setRes] = useState(null)

    const send = async () => {
        const responce = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            body: JSON.stringify({password: pass, username: email}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .then(data => setRes(data))
    }
    return (
        <div className="wrapper">
            <div className="respon">
                {JSON.stringify(res)}
            </div>

            <div className="form__item">
                <input 
                    type="text" 
                    placeholder="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}

                />
            </div>
            <div className="form__item">
                <input 
                    type="text" 
                    placeholder="password" 
                    value={pass} 
                    onChange={(e) => setPass(e.target.value)}
                />
            </div>
            <button onClick={send}>Login</button>
        </div>
    )
}