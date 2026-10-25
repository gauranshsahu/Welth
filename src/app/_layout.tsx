import "../../global.css";
const properties = [
  { id: '1', name: 'Rahul', email: 'rahul@gmail.com' },
  { id: '2', name: 'Aman', email: 'aman@gmail.com' },
  { id: '3', name: 'Priya', email: 'priya@gmail.com' },
  { id: '4', name: 'Neha', email: 'neha@gmail.com' },
];

export default function RootLayout() {
  return (
    <slot />
  );
}
