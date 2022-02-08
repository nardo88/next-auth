
export default function Home({result}) {
  return (
    <div >
      {JSON.stringify(result)}
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  // получаем cookie 
  const cookie = ctx.req?.headers.cookie
  // передаем полученные cookie в заголовки
  const res = await fetch('http://localhost:3000/api/auth', {
    headers: {
      cookie: cookie
    }
  }).then(data => data.json())
  
  return{
    result: res
  }
}
