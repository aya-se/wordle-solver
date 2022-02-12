import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
    <Header/>
    <div className="container my-3">
      <Head>
        <title>Wordle Solver</title>
      </Head>
      <a href="https://www.nytimes.com/games/wordle/index.html">本日のWordle</a>
      <form>
          { [1,2,3,4,5].map((i) => 
            <div key={i} className="d-flex justify-content-center">
            {[1,2,3,4,5].map((j)=>
              <input key={i+"-"+j} id={i+"-"+j} type="text" className="form-control form-control-lg form-letter" size="1" maxLength="1"/>
            )}
            </div>
          )}
      </form>
    </div>
    <Footer/>
    </div>
  )
}
