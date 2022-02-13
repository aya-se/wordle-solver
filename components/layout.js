import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Layout({ children, ...props }) {
  return (
    <div>
      <Header />
      <div {...props}>{children}</div>
      <Footer />
    </div>
  );
}
