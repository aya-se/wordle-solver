import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, ...props }) {
  return (
    <div>
      <Header />
      <div {...props}>{children}</div>
      <Footer />
    </div>
  );
}
