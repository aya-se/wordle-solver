import Header from './Header';

export default function Layout({ children, ...props }) {
  return (
    <div>
      <Header />
      <div className="mx-3" {...props}>{children}</div>
    </div>
  );
}
