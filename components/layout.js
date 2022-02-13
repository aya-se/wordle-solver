import Header from '../components/header';
import Footer from '../components/footer';

export default function Layout({ children, ...props }) {
  return (
    <div>
      <Header />
      <div {...props}>{children}</div>
      <Footer />
    </div>
  );
}
