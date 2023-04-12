import '../styles/globals.css'
import Layout from "./api/Layout/layout";
  
function App({ Component, pageProps }) {
  return (
    <Layout>
    <Component {...pageProps} />
    </Layout>
  )
}
export default App
